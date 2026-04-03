package gogenfilter

import (
	"maps"
	"sync"
)

// MetricsMixin provides common fields for filter metrics.
type MetricsMixin struct {
	TotalFilesChecked int
	FilteredByReason  map[FilterReason]int
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
			FilteredByReason: make(map[FilterReason]int),
		},
		FilteredFiles: make(map[FilterReason][]string),
	}
}

// Record records that a file was filtered for a given reason.
func (m *Metrics) Record(filePath string, reason FilterReason) {
	if m == nil {
		return
	}

	m.mu.Lock()
	defer m.mu.Unlock()

	m.TotalFilesChecked++

	if reason != ReasonNotFiltered {
		m.FilteredByReason[reason]++
		m.FilteredFiles[reason] = append(m.FilteredFiles[reason], filePath)
	}
}

// RecordChecked records that a file was checked but not filtered.
func (m *Metrics) RecordChecked(filePath string) {
	m.Record(filePath, ReasonNotFiltered)
}

// RecordFiltered records that a file was filtered for a given reason.
func (m *Metrics) RecordFiltered(filePath string, reason FilterReason) {
	m.Record(filePath, reason)
}

// GetStats returns the current filter statistics.
func (m *Metrics) GetStats() FilterStats {
	if m == nil {
		return FilterStats{}
	}

	m.mu.RLock()
	defer m.mu.RUnlock()

	filteredByReason := maps.Clone(m.FilteredByReason)

	return FilterStats{
		MetricsMixin: MetricsMixin{
			TotalFilesChecked: m.TotalFilesChecked,
			FilteredByReason:  filteredByReason,
		},
	}
}

// FilterStats represents a snapshot of filter statistics.
type FilterStats struct {
	MetricsMixin
}

// TotalFiltered returns the total number of filtered files.
func (fs FilterStats) TotalFiltered() int {
	total := 0

	for reason, count := range fs.FilteredByReason {
		if reason != ReasonNotFiltered {
			total += count
		}
	}

	return total
}
