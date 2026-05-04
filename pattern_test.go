package gogenfilter

import "testing"

func TestMatchPattern(t *testing.T) {
	t.Parallel()

	for _, testCase := range matchPatternTestCases() {
		t.Run(testCase.name, func(t *testing.T) {
			t.Parallel()

			got := MatchPattern(testCase.path, testCase.pattern)

			if got != testCase.expected {
				t.Errorf(
					"MatchPattern(%q, %q) = %v, want %v",
					testCase.path,
					testCase.pattern,
					got,
					testCase.expected,
				)
			}
		})
	}
}

func matchPatternTestCases() []matchPatternTestCase {
	return []matchPatternTestCase{
		{name: "exact match", path: "file.go", pattern: "file.go", expected: true},
		{name: "wildcard match", path: "test.go", pattern: "*.go", expected: true},
		{name: "wildcard no match", path: "test.txt", pattern: "*.go", expected: false},
		{name: "directory pattern", path: "vendor/file.go", pattern: "vendor/*", expected: true},
		{
			name:     "complex pattern",
			path:     "generated/sqlc/models.go",
			pattern:  "generated/sqlc/*.go",
			expected: true,
		},
		{
			name:     "single star does not match subdirectories",
			path:     "generated/sqlc/sub/models.go",
			pattern:  "generated/sqlc/*.go",
			expected: false,
		},
		{
			name:     "double star matches any depth",
			path:     "generated/sqlc/sub/models.go",
			pattern:  "generated/**/*.go",
			expected: true,
		},
		{
			name:     "double star prefix matches at root",
			path:     "any/nested/path/file.go",
			pattern:  "**/file.go",
			expected: true,
		},
		{
			name:     "double star suffix matches everything under",
			path:     "vendor/deep/nested/pkg/file.go",
			pattern:  "vendor/**",
			expected: true,
		},
		{
			name:     "no match wrong directory",
			path:     "other/file.go",
			pattern:  "vendor/*.go",
			expected: false,
		},
		{name: "question mark single char match", path: "a.go", pattern: "?.go", expected: true},
		{
			name:     "question mark no match multi char",
			path:     "ab.go",
			pattern:  "?.go",
			expected: false,
		},
		{name: "question mark in path", path: "dir/a.go", pattern: "dir/?.go", expected: true},
		{name: "question mark no match empty", path: ".go", pattern: "?.go", expected: false},
		{name: "empty pattern", path: "file.go", pattern: "", expected: false},
		{name: "empty path", path: "", pattern: "*.go", expected: false},
		{name: "empty both", path: "", pattern: "", expected: false},
		{name: "double star alone", path: "a/b/c.go", pattern: "**", expected: true},
		{
			name:     "double star middle",
			path:     "src/pkg/util/helper.go",
			pattern:  "src/**/helper.go",
			expected: true,
		},
		{
			name:     "double star middle no match",
			path:     "src/pkg/util/helper.go",
			pattern:  "src/**/other.go",
			expected: false,
		},
		{
			name:     "single star matches filename only",
			path:     "a/b/c.go",
			pattern:  "*.go",
			expected: true,
		},
		{
			name:     "single star no separator",
			path:     "dir/file.go",
			pattern:  "*file.go",
			expected: true,
		},
		{
			name:     "absolute path with relative pattern",
			path:     "/tmp/project/pkg1/file.go",
			pattern:  "pkg1/*",
			expected: true,
		},
		{
			name:     "consecutive double stars",
			path:     "a/b/c/d.go",
			pattern:  "a/**/**/d.go",
			expected: true,
		},
	}
}

func TestMatchPatternInvalidPattern(t *testing.T) {
	t.Parallel()

	mustNotMatchPattern(t, "file.go", "[", "invalid pattern")
}

func TestMatchPatternDoublestarNoMatch(t *testing.T) {
	t.Parallel()

	mustNotMatchPattern(t, "a/b/c", "x/**/y", "doublestar pattern with no matching segments")
}

func TestMatchPatternPathShorterThanPattern(t *testing.T) {
	t.Parallel()

	mustNotMatchPattern(t, "a/b", "a/b/c", "path shorter than pattern")
}

func TestMatchPatternCrossPlatform(t *testing.T) {
	t.Parallel()

	tests := []matchPatternTestCase{
		{name: "forward slash path and pattern",
			path: "vendor/file.go", pattern: "vendor/*", expected: true},
		{name: "forward slash double star pattern",
			path: "generated/sqlc/models.go", pattern: "generated/**/*.go", expected: true},
		{name: "forward slash deep path",
			path: "a/b/c.go", pattern: "a/**", expected: true},
		{name: "backslash in pattern detected as separator",
			path: "any", pattern: "vendor\\*", expected: false},
	}

	for _, testCase := range tests {
		t.Run(testCase.name, func(t *testing.T) {
			t.Parallel()

			got := MatchPattern(testCase.path, testCase.pattern)

			if got != testCase.expected {
				t.Errorf(
					"MatchPattern(%q, %q) = %v, want %v",
					testCase.path,
					testCase.pattern,
					got,
					testCase.expected,
				)
			}
		})
	}
}

func mustNotMatchPattern(t *testing.T, path, pattern, msg string) {
	t.Helper()

	got := MatchPattern(path, pattern)
	if got {
		t.Errorf("expected %s to return false", msg)
	}
}
