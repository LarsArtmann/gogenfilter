package gogenfilter

import (
	"testing"
	"testing/quick"
)

func TestFilterIdempotentProperty(t *testing.T) {
	t.Parallel()

	t.Run("property test", func(t *testing.T) {
		t.Parallel()

		propertyFn := func(filePath string) bool {
			if filePath == "" || len(filePath) < 1 {
				return true
			}

			filter1 := NewFilter(Enabled())
			filter2 := NewFilter(Enabled())

			return filter1.MustFilter(filePath) == filter2.MustFilter(filePath)
		}

		err := quick.Check(propertyFn, nil)
		if err != nil {
			t.Errorf("Idempotent property failed: %v", err)
		}
	})
}

func TestDisabledFilterProperty(t *testing.T) {
	t.Parallel()

	t.Run("property test", func(t *testing.T) {
		t.Parallel()

		propertyFn := func(filePath string) bool {
			if filePath == "" {
				return true
			}

			return !NewFilter(Disabled()).MustFilter(filePath)
		}

		err := quick.Check(propertyFn, nil)
		if err != nil {
			t.Errorf("Disabled filter property failed: %v", err)
		}
	})
}

func TestIncludePatternProperty(t *testing.T) {
	t.Parallel()

	t.Run("property test", func(t *testing.T) {
		t.Parallel()

		propertyFn := func(includePattern, filePath string) bool {
			if includePattern == "" || filePath == "" {
				return true
			}

			filter := NewFilter(Enabled(), WithIncludePatterns(includePattern))

			if !MatchPattern(filePath, includePattern) {
				return true
			}

			return !filter.MustFilter(filePath)
		}

		err := quick.Check(propertyFn, nil)
		if err != nil {
			t.Errorf("Include pattern property failed: %v", err)
		}
	})
}

func TestExcludePatternProperty(t *testing.T) {
	t.Parallel()

	t.Run("property test", func(t *testing.T) {
		t.Parallel()

		propertyFn := func(excludePattern, filePath string) bool {
			if excludePattern == "" || filePath == "" {
				return true
			}

			filter := NewFilter(Enabled(), WithExcludePatterns(excludePattern))
			shouldFilter := MatchPattern(filePath, excludePattern)
			isFiltered := filter.MustFilter(filePath)

			return shouldFilter == isFiltered
		}

		err := quick.Check(propertyFn, nil)
		if err != nil {
			t.Errorf("Exclude pattern property failed: %v", err)
		}
	})
}
