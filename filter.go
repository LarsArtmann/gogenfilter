package gogenfilter

import (
	"fmt"
	"io/fs"
	"os"
	"sort"
	"strings"
)

// Filter provides smart filtering of auto-generated Go code.
type Filter struct {
	options         map[FilterOption]bool
	enabled         bool
	includePatterns []string
	excludePatterns []string
	metrics         *Metrics
	fsys            fs.FS
}

// NewFilter creates a new filter with specified options.
func NewFilter(enabled bool, options []FilterOption) *Filter {
	filter := &Filter{
		enabled:         enabled,
		options:         make(map[FilterOption]bool),
		includePatterns: make([]string, 0),
		excludePatterns: make([]string, 0),
		metrics:         nil,
		fsys:            os.DirFS("."),
	}

	for _, opt := range options {
		if opt == FilterAll {
			for _, specific := range allSpecificOptions {
				filter.options[specific] = true
			}

			filter.options[FilterGeneric] = true
		} else {
			filter.options[opt] = true
		}
	}

	if enabled {
		filter.metrics = NewMetrics()
	}

	return filter
}

// WithFS sets a custom filesystem for the filter.
// Defaults to os.DirFS(".") if not called.
// Pass nil to keep the current filesystem.
func (f *Filter) WithFS(fsys fs.FS) *Filter {
	if fsys != nil {
		f.fsys = fsys
	}

	return f
}

// WithIncludePatterns adds custom include patterns to the filter.
func (f *Filter) WithIncludePatterns(patterns []string) *Filter {
	return f.withPatterns(&f.includePatterns, patterns)
}

// WithExcludePatterns adds custom exclude patterns to the filter.
func (f *Filter) WithExcludePatterns(patterns []string) *Filter {
	return f.withPatterns(&f.excludePatterns, patterns)
}

func (f *Filter) withPatterns(target *[]string, patterns []string) *Filter {
	*target = append(*target, patterns...)

	return f
}

// IsEnabled returns whether the filter is active.
func (f *Filter) IsEnabled() bool {
	return f.enabled
}

// ShouldFilter determines if a file should be filtered out (excluded from analysis).
func (f *Filter) ShouldFilter(filePath string) bool {
	if !f.enabled {
		f.recordChecked(filePath)

		return false
	}

	if len(f.includePatterns) > 0 {
		return f.shouldFilterWithIncludes(filePath)
	}

	return f.shouldFilterWithExcludes(filePath)
}

// GetStats returns a snapshot of filter statistics.
func (f *Filter) GetStats() FilterStats {
	if f.metrics == nil {
		return FilterStats{
			MetricsMixin: MetricsMixin{
				TotalFilesChecked: 0,
				filteredByReason:  nil,
			},
		}
	}

	return f.metrics.GetStats()
}

func (f *Filter) recordChecked(filePath string) {
	if f.metrics != nil {
		f.metrics.RecordChecked(filePath)
	}
}

func (f *Filter) recordFiltered(filePath string, reason FilterReason) {
	if f.metrics != nil {
		f.metrics.RecordFiltered(filePath, reason)
	}
}

func (f *Filter) matchesAnyPattern(filePath string, patterns []string) bool {
	return matchAnyWith(filePath, patterns, MatchPattern)
}

func (f *Filter) shouldFilterWithIncludes(filePath string) bool {
	if !f.matchesAnyPattern(filePath, f.includePatterns) {
		f.recordFiltered(filePath, ReasonIncludePattern)

		return true
	}

	if reason := detectReason(f.fsys, filePath, f.options); reason != ReasonNotFiltered {
		f.recordFiltered(filePath, reason)

		return true
	}

	f.recordChecked(filePath)

	return false
}

func (f *Filter) shouldFilterWithExcludes(filePath string) bool {
	if f.matchesAnyPattern(filePath, f.excludePatterns) {
		f.recordFiltered(filePath, ReasonExcludePattern)

		return true
	}

	if reason := detectReason(f.fsys, filePath, f.options); reason != ReasonNotFiltered {
		f.recordFiltered(filePath, reason)

		return true
	}

	f.recordChecked(filePath)

	return false
}

func (f *Filter) appendPatternPart(parts []string, label string, patterns []string) []string {
	if len(patterns) > 0 {
		return append(parts, fmt.Sprintf("%s=%v", label, patterns))
	}

	return parts
}

func (f *Filter) String() string {
	if !f.enabled {
		return "Filter(disabled)"
	}

	opts := make([]string, 0, len(f.options))
	for opt := range f.options {
		opts = append(opts, string(opt))
	}

	sort.Strings(opts)

	parts := []string{fmt.Sprintf("options=[%s]", strings.Join(opts, ","))}

	parts = f.appendPatternPart(parts, "includes", f.includePatterns)
	parts = f.appendPatternPart(parts, "excludes", f.excludePatterns)

	if f.metrics != nil {
		stats := f.metrics.GetStats()
		parts = append(parts, "stats="+stats.String())
	}

	return fmt.Sprintf("Filter(%s)", strings.Join(parts, ", "))
}
