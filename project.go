package gogenfilter

import (
	"fmt"
	"os"
	"path/filepath"
)

func fileExists(path string) bool {
	stat, err := os.Stat(path)
	if err != nil {
		return false
	}

	return stat != nil
}

// FindProjectRoot searches parent directories for project marker files.
// Returns empty string if no marker is found after searching up to maxProjectRootDepth levels.
func FindProjectRoot(startPath string, markers []string) (string, *ProjectRootError) {
	absPath, err := filepath.Abs(startPath)
	if err != nil {
		return "", &ProjectRootError{
			StartPath: startPath,
			Markers:   markers,
			Cause:     fmt.Errorf("getting absolute path for %q: %w", startPath, err),
		}
	}

	current := absPath

	for range maxProjectRootDepth {
		for _, marker := range markers {
			markerPath := filepath.Join(current, marker)
			if fileExists(markerPath) {
				return current, nil
			}
		}

		parent := filepath.Dir(current)
		if parent == current || parent == "" {
			break
		}

		current = parent
	}

	return "", &ProjectRootError{
		StartPath: startPath,
		Markers:   markers,
		Cause:     nil,
	}
}
