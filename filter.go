package gogenfilter

import "slices"

// Filter provides smart filtering of auto-generated Go code.
type Filter struct {
	options         map[FilterOption]bool
	enabled         bool
	includePatterns []string
	excludePatterns []string
	metrics         *Metrics
}

// NewFilter creates a new filter with specified options.
func NewFilter(enabled bool, options []FilterOption) *Filter {
	f := &Filter{
		enabled:         enabled,
		options:         make(map[FilterOption]bool),
		includePatterns: make([]string, 0),
		excludePatterns: make([]string, 0),
		metrics:         nil,
	}

	for _, opt := range options {
		if opt == FilterAll {
			for _, specific := range allSpecificOptions() {
				f.options[specific] = true
			}

			f.options[FilterGeneric] = true
		} else {
			f.options[opt] = true
		}
	}

	if enabled {
		f.metrics = NewMetrics()
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

// GetMetrics returns the filter metrics tracker. Returns nil if metrics are disabled.
func (f *Filter) GetMetrics() *Metrics {
	return f.metrics
}

// GetStats returns a snapshot of filter statistics.
func (f *Filter) GetStats() FilterStats {
	if f.metrics == nil {
		return FilterStats{
			MetricsMixin: MetricsMixin{
				TotalFilesChecked: 0,
				FilteredByReason:  nil,
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
	return slices.ContainsFunc(patterns, func(pattern string) bool {
		return MatchPattern(filePath, pattern)
	})
}

func (f *Filter) shouldFilterWithIncludes(filePath string) bool {
	if f.matchesAnyPattern(filePath, f.includePatterns) {
		f.recordChecked(filePath)

		return false
	}

	f.recordFiltered(filePath, ReasonIncludePattern)

	return true
}

func (f *Filter) shouldFilterWithExcludes(filePath string) bool {
	if f.matchesAnyPattern(filePath, f.excludePatterns) {
		f.recordFiltered(filePath, ReasonExcludePattern)

		return true
	}

	if reason := detectGeneratedReason(filePath, f.options); reason != ReasonNotFiltered {
		f.recordFiltered(filePath, reason)

		return true
	}

	f.recordChecked(filePath)

	return false
}
