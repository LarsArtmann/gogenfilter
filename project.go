package gogenfilter

import (
	"fmt"
	"os"
	"path/filepath"

	"github.com/LarsArtmann/gogenfilter/pkg/errors"
)

// FindProjectRoot searches parent directories for project marker files.
// Returns empty string if no marker is found after searching up to maxProjectRootDepth levels.
func FindProjectRoot(startPath string, markers []string) (string, error) {
	absPath, err := filepath.Abs(startPath)
	if err != nil {
		return "", &errors.ProjectRootError{
			StartPath: startPath,
			Markers:   markers,
			Cause:     fmt.Errorf("getting absolute path for %q: %w", startPath, err),
		}
	}

	current := absPath

	for range maxProjectRootDepth {
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

	return "", &errors.ProjectRootError{
		StartPath: startPath,
		Markers:   markers,
	}
}
