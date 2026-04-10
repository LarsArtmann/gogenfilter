package gogenfilter

import (
	"errors"
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

func TestFindProjectRootDepthExhausted(t *testing.T) {
	t.Parallel()

	tmpDir := t.TempDir()

	deepDir := tmpDir
	for range maxProjectRootDepth + 2 {
		deepDir = filepath.Join(deepDir, "sub")
	}

	mkdirAll(t, deepDir)

	_, err := FindProjectRoot(deepDir, []string{"go.mod"})
	if err == nil {
		t.Error("Expected error when depth exhausted")
	}
}

func TestFindProjectRootErrorCode(t *testing.T) {
	t.Parallel()

	t.Run("not found returns correct code and matches sentinel", func(t *testing.T) {
		t.Parallel()

		tmpDir := t.TempDir()

		_, err := FindProjectRoot(tmpDir, []string{"nonexistent.marker"})
		if err == nil {
			t.Fatal("Expected error when no marker found")
		}

		assertEqual(t, "ErrorCode", err.ErrorCode(), CodeProjectRootNotFound)

		if !errors.Is(err, ErrProjectRootNotFound) {
			t.Error("errors.Is should match ErrProjectRootNotFound")
		}

		help := err.Help()
		if help == "" {
			t.Error("Help() should return non-empty guidance")
		}
	})
}
