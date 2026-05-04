package gogenfilter

import (
	"fmt"
	"io/fs"
	"os"
	"sort"
	"strings"
)

// FilterConfig is a functional option for configuring a Filter.
type FilterConfig func(*Filter)

// WithFilterOptions specifies which generated code types to filter.
// FilterAll expands to all specific detectors plus FilterGeneric.
// Panics if any option is not a valid FilterOption.
func WithFilterOptions(opts ...FilterOption) FilterConfig {
	for _, opt := range opts {
		if !opt.IsValid() {
			panic("gogenfilter: invalid FilterOption: " + opt.String())
		}
	}

	return func(filter *Filter) {
		expanded := optionsMap(opts...)
		for opt := range expanded {
			filter.options[opt] = struct{}{}
		}
	}
}

// WithFS sets a custom filesystem for the filter.
// Defaults to os.DirFS(".") if not provided.
func WithFS(fsys fs.FS) FilterConfig {
	return func(filter *Filter) {
		if fsys != nil {
			filter.fsys = fsys
		}
	}
}

// WithIncludePatterns restricts filtering scope to files matching at least one
// of the given patterns. Files that do NOT match any include pattern are
// immediately filtered (excluded from analysis) with reason ReasonOutsideScope.
//
// This "restrict scope" behavior means include patterns act as a whitelist for
// which files are worth inspecting — all other files are skipped.
// Use this to focus filtering on specific directories (e.g., "**/generated/*.go").
//
// Patterns use the ** glob syntax supported by MatchPattern.
// If no include patterns are set, all files are considered.
func WithIncludePatterns(patterns ...string) FilterConfig {
	return func(filter *Filter) {
		filter.includePatterns = append(filter.includePatterns, patterns...)
	}
}

// WithExcludePatterns adds exclude patterns. Files matching any exclude pattern
// are filtered regardless of generated-code detection.
func WithExcludePatterns(patterns ...string) FilterConfig {
	return func(filter *Filter) {
		filter.excludePatterns = append(filter.excludePatterns, patterns...)
	}
}

// Filter provides smart filtering of auto-generated Go code.
// A Filter is immutable after construction — all configuration is applied via NewFilter.
type Filter struct {
	options         map[FilterOption]struct{}
	includePatterns []string
	excludePatterns []string
	metrics         *Metrics
	fsys            fs.FS
}

// NewFilter creates a new filter configured with the given functional options.
// A filter with no options is disabled — ShouldFilter always returns false.
// A filter is enabled when it has filter options, include patterns, or exclude patterns.
//
// Examples:
//
//	NewFilter(WithFilterOptions(FilterAll))
//	NewFilter(WithFilterOptions(FilterSQLC, FilterTempl), WithExcludePatterns("**/db/*.go"))
//	NewFilter() // disabled
func NewFilter(configs ...FilterConfig) *Filter {
	filter := &Filter{
		options:         make(map[FilterOption]struct{}),
		includePatterns: make([]string, 0),
		excludePatterns: make([]string, 0),
		metrics:         nil,
		fsys:            os.DirFS("."),
	}

	for _, cfg := range configs {
		cfg(filter)
	}

	if filter.IsEnabled() {
		filter.metrics = NewMetrics()
	}

	return filter
}

// IsEnabled returns whether the filter is active.
// A filter is enabled when it has filter options, include patterns, or exclude patterns.
func (f *Filter) IsEnabled() bool {
	return len(f.options) > 0 || len(f.includePatterns) > 0 || len(f.excludePatterns) > 0
}

// FilterReasons returns the FilterReason values that this filter will detect.
// Each enabled FilterOption maps to its corresponding FilterReason.
func (f *Filter) FilterReasons() []FilterReason {
	reasons := make([]FilterReason, 0, len(f.options))

	for opt := range f.options {
		reasons = append(reasons, opt.Reason())
	}

	return reasons
}

// ShouldFilter determines if a file should be filtered out (excluded from analysis).
// Returns an error if the file could not be read for content-based detection.
func (f *Filter) ShouldFilter(filePath string) (bool, error) {
	if !f.IsEnabled() {
		return false, nil
	}

	if len(f.includePatterns) > 0 {
		return f.shouldFilterWithIncludes(filePath)
	}

	return f.shouldFilterWithExcludes(filePath)
}

// MustFilter is like ShouldFilter but panics on error.
// Use this in property tests and benchmarks where errors are unexpected.
func (f *Filter) MustFilter(filePath string) bool {
	filtered, err := f.ShouldFilter(filePath)
	if err != nil {
		panic("gogenfilter: MustFilter error: " + err.Error())
	}

	return filtered
}

// GetStats returns a snapshot of filter statistics.
func (f *Filter) GetStats() FilterStats {
	if f.metrics == nil {
		return zeroFilterStats()
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
	return anyMatch(filePath, patterns, MatchPattern)
}

func (f *Filter) shouldFilterWithIncludes(filePath string) (bool, error) {
	return f.shouldFilterByPattern(
		filePath,
		!f.matchesAnyPattern(filePath, f.includePatterns),
		ReasonOutsideScope,
	)
}

func (f *Filter) shouldFilterWithExcludes(filePath string) (bool, error) {
	return f.shouldFilterByPattern(
		filePath,
		f.matchesAnyPattern(filePath, f.excludePatterns),
		ReasonExcludePattern,
	)
}

func (f *Filter) shouldFilterByPattern(
	filePath string,
	patternMatched bool,
	reason FilterReason,
) (bool, error) {
	if patternMatched {
		f.recordFiltered(filePath, reason)

		return true, nil
	}

	filtered, err := f.shouldFilterByDetection(filePath)
	if err != nil {
		return false, err
	}

	if filtered {
		return true, nil
	}

	f.recordChecked(filePath)

	return false, nil
}

func (f *Filter) shouldFilterByDetection(filePath string) (bool, error) {
	reason, err := detectReasonFS(f.fsys, filePath, f.options)
	if err != nil {
		return false, err
	}

	if reason != ReasonNotFiltered {
		f.recordFiltered(filePath, reason)

		return true, nil
	}

	return false, nil
}

func (f *Filter) appendPatternPart(parts []string, label string, patterns []string) []string {
	if len(patterns) > 0 {
		return append(parts, fmt.Sprintf("%s=%v", label, patterns))
	}

	return parts
}

func (f *Filter) String() string {
	if !f.IsEnabled() {
		return "Filter(disabled)"
	}

	opts := make([]string, 0, len(f.options))
	for opt := range f.options {
		opts = append(opts, string(opt))
	}

	sort.Strings(opts)

	var parts []string

	if len(opts) > 0 {
		parts = []string{fmt.Sprintf("options=[%s]", strings.Join(opts, ","))}
	}

	parts = f.appendPatternPart(parts, "includes", f.includePatterns)
	parts = f.appendPatternPart(parts, "excludes", f.excludePatterns)

	if f.metrics != nil {
		stats := f.metrics.GetStats()
		parts = append(parts, "stats="+stats.String())
	}

	return fmt.Sprintf("Filter(%s)", strings.Join(parts, ", "))
}
