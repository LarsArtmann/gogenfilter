package gogenfilter

import (
	"path/filepath"
	"strings"
)

// MatchPattern checks if a path matches a pattern (supports * and ** wildcards).
func MatchPattern(path, pattern string) bool {
	if strings.Contains(pattern, string(filepath.Separator)) || strings.Contains(pattern, "/") {
		prefix := strings.Split(pattern, "*")[0]

		if !strings.HasSuffix(prefix, string(filepath.Separator)) &&
			!strings.HasSuffix(prefix, "/") {
			prefix += "/"
		}

		return strings.Contains(path, prefix)
	}

	filename := filepath.Base(path)

	matched, err := filepath.Match(pattern, filename)
	if err != nil {
		return false
	}

	return matched
}
