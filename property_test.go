package gogenfilter

import (
	"testing"
	"testing/quick"
)

func TestFilterIdempotentProperty(t *testing.T) {
	t.Parallel()

	t.Run("property test", func(t *testing.T) {
		t.Parallel()

		f := func(filePath string) bool {
			if filePath == "" || len(filePath) < 1 {
				return true
			}

			filter1 := NewFilter(true, nil)
			filter2 := NewFilter(true, nil)

			return filter1.ShouldFilter(filePath) == filter2.ShouldFilter(filePath)
		}

		err := quick.Check(f, nil)
		if err != nil {
			t.Errorf("Idempotent property failed: %v", err)
		}
	})
}

func TestDisabledFilterProperty(t *testing.T) {
	t.Parallel()

	t.Run("property test", func(t *testing.T) {
		t.Parallel()

		f := func(filePath string) bool {
			if filePath == "" {
				return true
			}

			return !NewFilter(false, nil).ShouldFilter(filePath)
		}

		err := quick.Check(f, nil)
		if err != nil {
			t.Errorf("Disabled filter property failed: %v", err)
		}
	})
}

func TestIncludePatternProperty(t *testing.T) {
	t.Parallel()

	t.Run("property test", func(t *testing.T) {
		t.Parallel()

		f := func(includePattern, filePath string) bool {
			if includePattern == "" || filePath == "" {
				return true
			}

			filter := NewFilter(true, nil)
			filter.WithIncludePatterns([]string{includePattern})

			if !MatchPattern(filePath, includePattern) {
				return true
			}

			return !filter.ShouldFilter(filePath)
		}

		err := quick.Check(f, nil)
		if err != nil {
			t.Errorf("Include pattern property failed: %v", err)
		}
	})
}

func TestExcludePatternProperty(t *testing.T) {
	t.Parallel()

	t.Run("property test", func(t *testing.T) {
		t.Parallel()

		f := func(excludePattern, filePath string) bool {
			if excludePattern == "" || filePath == "" {
				return true
			}

			filter := NewFilter(true, nil)
			filter.WithExcludePatterns([]string{excludePattern})
			shouldFilter := MatchPattern(filePath, excludePattern)
			isFiltered := filter.ShouldFilter(filePath)

			return shouldFilter == isFiltered
		}

		err := quick.Check(f, nil)
		if err != nil {
			t.Errorf("Exclude pattern property failed: %v", err)
		}
	})
}
