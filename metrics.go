package gogenfilter

import (
	"fmt"
	"maps"
	"sort"
	"strings"
	"sync"
)

// MetricsMixin provides common fields for filter metrics.
// It is embedded in FilterStats to provide read-only access to metrics data.
//
// The filteredByReason field is intentionally unexported to enforce
// encapsulation: callers must use the FilteredBy() and TotalFiltered()
// methods rather than reading or mutating the map directly. This prevents
// external code from breaking the invariant that counts are non-negative
// and consistent with the total.
type MetricsMixin struct {
	TotalFilesChecked TotalFilesChecked
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

func (fs FilterStats) String() string {
	if fs.TotalFilesChecked == 0 {
		return "FilterStats(checked=0, filtered=0)"
	}

	reasons := make([]string, 0, len(fs.filteredByReason))
	for reason := range fs.filteredByReason {
		reasons = append(reasons, string(reason))
	}

	sort.Strings(reasons)

	parts := make([]string, 0, len(reasons))
	for _, r := range reasons {
		parts = append(parts, fmt.Sprintf("%s=%d", r, fs.filteredByReason[FilterReason(r)]))
	}

	return fmt.Sprintf("FilterStats(checked=%d, filtered=%d, {%s})",
		int(fs.TotalFilesChecked), fs.TotalFiltered(), strings.Join(parts, ", "))
}
