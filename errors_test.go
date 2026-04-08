package gogenfilter

import (
	"fmt"
	"os"
	"testing"
)

func TestSQLCConfigError(t *testing.T) {
	t.Parallel()

	t.Run("error with config path", func(t *testing.T) {
		t.Parallel()

		err := &SQLCConfigError{
			ConfigPath: "/path/to/sqlc.yaml",
			Operation:  "read",
			Cause:      fmt.Errorf("permission denied: %w", os.ErrPermission),
		}

		if err.Error() == "" {
			t.Error("Expected non-empty error message")
		}

		if err.Unwrap() == nil {
			t.Error("Expected non-nil unwrap")
		}
	})

	t.Run("error without config path", func(t *testing.T) {
		t.Parallel()

		err := &SQLCConfigError{
			ConfigPath: "",
			Operation:  "find",
			Cause:      fmt.Errorf("not found: %w", os.ErrNotExist),
		}

		if err.Error() == "" {
			t.Error("Expected non-empty error message")
		}
	})
}

func TestTryAddSQLCConfig(t *testing.T) {
	t.Run("adds existing config", func(t *testing.T) {
		t.Parallel()

		tmpDir := t.TempDir()
		writeSQLCConfigFile(t, tmpDir, "sqlc.yaml")

		configs := make(map[string]string)
		tryAddSQLCConfig(tmpDir, "sqlc.yaml", configs)

		assertEqual(t, "len(configs)", len(configs), 1)
	})

	t.Run("skips non-existent config", func(t *testing.T) {
		t.Parallel()

		tmpDir := t.TempDir()
		configs := make(map[string]string)
		tryAddSQLCConfig(tmpDir, "sqlc.yaml", configs)

		assertEqual(t, "len(configs)", len(configs), 0)
	})
}
