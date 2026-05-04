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

			filter1 := NewFilter()
			filter2 := NewFilter()

			f1, _ := filter1.Filter(filePath)
			f2, _ := filter2.Filter(filePath)

			return f1 == f2
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

			r, _ := NewFilter().Filter(filePath)

			return !r
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

			filter := NewFilter(WithIncludePatterns(includePattern))

			if !MatchPattern(filePath, includePattern) {
				return true
			}

			r, _ := filter.Filter(filePath)

			return !r
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

			filter := NewFilter(WithExcludePatterns(excludePattern))
			shouldFilter := MatchPattern(filePath, excludePattern)
			isFiltered, _ := filter.Filter(filePath)

			return shouldFilter == isFiltered
		}

		err := quick.Check(propertyFn, nil)
		if err != nil {
			t.Errorf("Exclude pattern property failed: %v", err)
		}
	})
}
