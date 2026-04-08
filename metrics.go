package gogenfilter

import (
	"maps"
	"sync"
)

// MetricsMixin provides common fields for filter metrics.
type MetricsMixin struct {
	TotalFilesChecked int
	filteredByReason  map[FilterReason]int
}

// Metrics tracks filter statistics for analysis and debugging.
type Metrics struct {
	MetricsMixin

	mu sync.RWMutex

	FilteredFiles map[FilterReason][]string
}

// NewMetrics creates a new filter metrics tracker.
func NewMetrics() *Metrics {
	return &Metrics{
		MetricsMixin: MetricsMixin{
			TotalFilesChecked: 0,
			filteredByReason:  make(map[FilterReason]int),
		},
		mu:            sync.RWMutex{},
		FilteredFiles: make(map[FilterReason][]string),
	}
}

// record records that a file was processed by the filter.
// If reason is not ReasonNotFiltered, the file is also counted as filtered.
func (m *Metrics) record(filePath string, reason FilterReason) {
	if m == nil {
		return
	}

	m.mu.Lock()
	defer m.mu.Unlock()

	m.TotalFilesChecked++

	if reason != ReasonNotFiltered {
		m.filteredByReason[reason]++
		m.FilteredFiles[reason] = append(m.FilteredFiles[reason], filePath)
	}
}

// RecordChecked records that a file was checked but not filtered.
func (m *Metrics) RecordChecked(filePath string) {
	m.record(filePath, ReasonNotFiltered)
}

// RecordFiltered records that a file was filtered for a given reason.
func (m *Metrics) RecordFiltered(filePath string, reason FilterReason) {
	m.record(filePath, reason)
}

// GetStats returns the current filter statistics.
func (m *Metrics) GetStats() FilterStats {
	if m == nil {
		return FilterStats{
			MetricsMixin: MetricsMixin{
				TotalFilesChecked: 0,
				filteredByReason:  nil,
			},
		}
	}

	m.mu.RLock()
	defer m.mu.RUnlock()

	filteredByReason := maps.Clone(m.filteredByReason)

	return FilterStats{
		MetricsMixin: MetricsMixin{
			TotalFilesChecked: m.TotalFilesChecked,
			filteredByReason:  filteredByReason,
		},
	}
}

// FilterStats represents a snapshot of filter statistics.
type FilterStats struct {
	MetricsMixin
}

// TotalFiltered returns the total number of filtered files across all reasons.
func (fs FilterStats) TotalFiltered() int {
	total := 0

	for _, count := range fs.filteredByReason {
		total += count
	}

	return total
}

// FilteredBy returns the count of files filtered for a specific reason.
// Returns 0 if no files were filtered for that reason.
func (fs FilterStats) FilteredBy(reason FilterReason) int {
	return fs.filteredByReason[reason]
}
