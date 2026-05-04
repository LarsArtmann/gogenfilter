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
// Unexported fields enforce encapsulation: callers must use the FilteredBy(),
// FilteredFiles(), and TotalFiltered() methods rather than reading or mutating
// data directly. This prevents external code from breaking invariants.
type MetricsMixin struct {
	TotalFilesChecked TotalFilesChecked
	filteredByReason  map[FilterReason]int
	filteredFiles     map[FilterReason][]string
}

// Metrics tracks filter statistics for analysis and debugging.
type Metrics struct {
	MetricsMixin

	mu               sync.RWMutex
	maxFilteredFiles int
}

// NewMetrics creates a new filter metrics tracker.
// maxFilteredFiles controls the maximum number of file paths stored per reason.
// A value of 0 means unlimited (default behavior).
func NewMetrics(maxFilteredFiles ...int) *Metrics {
	maxFiles := 0
	if len(maxFilteredFiles) > 0 {
		maxFiles = maxFilteredFiles[0]
	}

	return &Metrics{
		MetricsMixin: MetricsMixin{
			TotalFilesChecked: 0,
			filteredByReason:  make(map[FilterReason]int),
			filteredFiles:     make(map[FilterReason][]string),
		},
		mu:               sync.RWMutex{},
		maxFilteredFiles: maxFiles,
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

		if m.maxFilteredFiles == 0 || len(m.filteredFiles[reason]) < m.maxFilteredFiles {
			m.filteredFiles[reason] = append(m.filteredFiles[reason], filePath)
		}
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

func zeroFilterStats() FilterStats {
	return FilterStats{
		MetricsMixin: MetricsMixin{
			TotalFilesChecked: 0,
			filteredByReason:  nil,
			filteredFiles:     nil,
		},
	}
}

// GetStats returns the current filter statistics.
func (m *Metrics) GetStats() FilterStats {
	if m == nil {
		return zeroFilterStats()
	}

	m.mu.RLock()
	defer m.mu.RUnlock()

	filteredByReason := maps.Clone(m.filteredByReason)

	clonedFiles := make(map[FilterReason][]string, len(m.filteredFiles))
	for reason, files := range m.filteredFiles {
		cloned := make([]string, len(files))
		copy(cloned, files)
		clonedFiles[reason] = cloned
	}

	return FilterStats{
		MetricsMixin: MetricsMixin{
			TotalFilesChecked: m.TotalFilesChecked,
			filteredByReason:  filteredByReason,
			filteredFiles:     clonedFiles,
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

// FilteredFiles returns the file paths filtered for a specific reason.
// Returns nil if no files were filtered for that reason.
// The returned slice is a copy — safe to mutate without affecting subsequent calls.
func (fs FilterStats) FilteredFiles(reason FilterReason) []string {
	files := fs.filteredFiles[reason]
	if files == nil {
		return nil
	}

	cloned := make([]string, len(files))
	copy(cloned, files)

	return cloned
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
