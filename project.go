package gogenfilter

import (
	"fmt"
	"os"
	"path/filepath"
)

// FindProjectRoot searches parent directories for project marker files.
// Returns empty string if no marker is found after searching up to 10 levels.
func FindProjectRoot(startPath string, markers []string) (string, error) {
	absPath, err := filepath.Abs(startPath)
	if err != nil {
		return "", fmt.Errorf("getting absolute path for %q: %w", startPath, err)
	}

	current := absPath
	maxDepth := 10

	for range maxDepth {
		for _, marker := range markers {
			markerPath := filepath.Join(current, marker)
			if _, err := os.Stat(markerPath); err == nil {
				return current, nil
			}
		}

		parent := filepath.Dir(current)
		if parent == current || parent == "" {
			break
		}

		current = parent
	}

	return "", fmt.Errorf("project root not found from %q (searched for %v)", startPath, markers)
}
