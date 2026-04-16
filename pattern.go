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

	normalizedPath := filepath.ToSlash(path)
	normalizedPattern := normalizePattern(pattern)

	// For absolute paths with relative patterns, prepend **/ to match at any depth.
	// This ensures patterns like "pkg1/*" match "/tmp/project/pkg1/file.go".
	if strings.HasPrefix(normalizedPath, "/") &&
		!strings.HasPrefix(normalizedPattern, "/") &&
		!strings.HasPrefix(normalizedPattern, "**") {
		normalizedPattern = "**/" + normalizedPattern
	}

	return matchPathPattern(normalizedPath, normalizedPattern)
}

// normalizePattern converts a pattern to use forward slashes consistently.
func normalizePattern(pattern string) string {
	return strings.ReplaceAll(pattern, "\\", "/")
}

// matchPathPattern matches a slash-normalized path against a pattern with path segments.
func matchPathPattern(path, pattern string) bool {
	expanded := expandDoublestar(pattern)
	pathParts := strings.Split(path, "/")

	// Remove leading empty segment from absolute paths (e.g. "/a/b" → ["", "a", "b"]).
	if len(pathParts) > 0 && pathParts[0] == "" {
		pathParts = pathParts[1:]
	}

	return matchSegments(pathParts, strings.Split(expanded, "/"))
}

// doublestarSentinel is a placeholder for "**" in pattern matching.
// Using NUL character ensures it cannot collide with real path segments.
const doublestarSentinel = "\x00"

// expandDoublestar replaces "**" with a sentinel that matches multiple segments.
// "**/foo" matches "foo" at any depth, "foo/**" matches anything under "foo".
func expandDoublestar(pattern string) string {
	return strings.ReplaceAll(pattern, "**", doublestarSentinel)
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

		isDoublestar := patternParts[0] == doublestarSentinel

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
