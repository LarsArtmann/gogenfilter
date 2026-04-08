package gogenfilter

import (
	"errors"
	"fmt"
	"path/filepath"
	"testing"
)

func TestFindProjectRoot(t *testing.T) {
	t.Parallel()

	t.Run("finds marker in current directory", func(t *testing.T) {
		t.Parallel()

		tmpDir := t.TempDir()

		writeFile(t, filepath.Join(tmpDir, "go.mod"), "module test\n")

		root, err := FindProjectRoot(tmpDir, []string{"go.mod"})
		if err != nil {
			t.Fatalf("FindProjectRoot() error: %v", err)
		}

		if root != tmpDir {
			t.Errorf("Expected %q, got %q", tmpDir, root)
		}
	})

	t.Run("finds marker in parent directory", func(t *testing.T) {
		t.Parallel()

		tmpDir := t.TempDir()

		childDir := filepath.Join(tmpDir, "subdir", "deep")
		mkdirAll(t, childDir)

		writeFile(t, filepath.Join(tmpDir, "go.mod"), "module test\n")

		root, err := FindProjectRoot(childDir, []string{"go.mod"})
		if err != nil {
			t.Fatalf("FindProjectRoot() error: %v", err)
		}

		if root != tmpDir {
			t.Errorf("Expected %q, got %q", tmpDir, root)
		}
	})

	t.Run("returns error when no marker found", func(t *testing.T) {
		t.Parallel()

		tmpDir := t.TempDir()

		_, err := FindProjectRoot(tmpDir, []string{"nonexistent.marker"})
		if err == nil {
			t.Error("Expected error when no marker found")
		}
	})
}

func TestProjectRootError(t *testing.T) {
	t.Parallel()

	t.Run("unwraps cause", func(t *testing.T) {
		t.Parallel()

		err := &ProjectRootError{
			StartPath: "/some/path",
			Markers:   []string{"go.mod"},
			Cause:     fmt.Errorf("inner error: %w", errors.ErrUnsupported),
		}

		if err.Error() == "" {
			t.Error("Expected non-empty error message")
		}

		if err.Unwrap() == nil {
			t.Error("Expected non-nil unwrap")
		}
	})

	t.Run("nil cause", func(t *testing.T) {
		t.Parallel()

		err := &ProjectRootError{
			StartPath: "/some/path",
			Markers:   []string{"go.mod"},
			Cause:     nil,
		}

		if err.Error() == "" {
			t.Error("Expected non-empty error message")
		}

		if err.Unwrap() != nil {
			t.Error("Expected nil unwrap for nil cause")
		}
	})
}
