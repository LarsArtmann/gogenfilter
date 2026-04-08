package gogenfilter

import "testing"

func TestMatchPattern(t *testing.T) {
	t.Parallel()

	for _, tt := range matchPatternTestCases() {
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()

			got := MatchPattern(tt.path, tt.pattern)

			if got != tt.expected {
				t.Errorf(
					"MatchPattern(%q, %q) = %v, want %v",
					tt.path,
					tt.pattern,
					got,
					tt.expected,
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
	}
}
