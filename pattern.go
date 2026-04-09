package gogenfilter

import (
	"path/filepath"
	"strings"
)

// MatchPattern checks if a path matches a pattern.
// Supports * (matches non-separator characters) and ** (matches any path segments).
// Patterns without path separators match against the filename only.
func MatchPattern(path, pattern string) bool {
	if !strings.ContainsAny(pattern, "/\\") {
		matched, err := filepath.Match(pattern, filepath.Base(path))
		if err != nil {
			return false
		}

		return matched
	}

	return matchPathPattern(filepath.ToSlash(path), normalizePattern(pattern))
}

// normalizePattern converts a pattern to use forward slashes consistently.
func normalizePattern(pattern string) string {
	return strings.ReplaceAll(pattern, "\\", "/")
}

// matchPathPattern matches a slash-normalized path against a pattern with path segments.
func matchPathPattern(path, pattern string) bool {
	expanded := expandDoublestar(pattern)

	return matchSegments(strings.Split(path, "/"), strings.Split(expanded, "/"))
}

// expandDoublestar replaces "**" with a sentinel that matches multiple segments.
// "**/foo" matches "foo" at any depth, "foo/**" matches anything under "foo".
func expandDoublestar(pattern string) string {
	return strings.ReplaceAll(pattern, "**", "\x00")
}

// matchSegments performs recursive segment matching.
func matchSegments(pathParts, patternParts []string) bool {
	for {
		if len(patternParts) == 0 {
			return len(pathParts) == 0
		}

		if len(pathParts) == 0 {
			return false
		}

		isDoublestar := patternParts[0] == "\x00"

		if isDoublestar {
			patternParts = patternParts[1:]

			if len(patternParts) == 0 {
				return true
			}

			for i := range pathParts {
				if matchSegments(pathParts[i:], patternParts) {
					return true
				}
			}

			return false
		}

		matched, err := filepath.Match(patternParts[0], pathParts[0])
		if err != nil || !matched {
			return false
		}

		pathParts = pathParts[1:]
		patternParts = patternParts[1:]
	}
}
