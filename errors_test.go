package gogenfilter

import (
	"errors"
	"fmt"
	"os"
	"strings"
	"testing"
)

func TestErrorCode(t *testing.T) {
	t.Parallel()

	t.Run("string representation", func(t *testing.T) {
		t.Parallel()

		cases := []struct {
			code     ErrorCode
			expected string
		}{
			{CodeProjectRootNotFound, "project_root_not_found"},
			{CodeProjectRootInvalidPath, "project_root_invalid_path"},
			{CodeSQLCConfigRead, "sqlc_config_read"},
			{CodeSQLCConfigParse, "sqlc_config_parse"},
			{CodeSQLCConfigWalk, "sqlc_config_walk"},
			{CodeSQLCConfigCollect, "sqlc_config_collect"},
			{CodeSQLCConfigFind, "sqlc_config_find"},
		}

		for _, tc := range cases {
			t.Run(tc.expected, func(t *testing.T) {
				t.Parallel()

				if tc.code.String() != tc.expected {
					t.Errorf(
						"ErrorCode(%q).String() = %q, want %q",
						tc.code,
						tc.code.String(),
						tc.expected,
					)
				}
			})
		}
	})

	t.Run("AllErrorCodes returns all codes", func(t *testing.T) {
		t.Parallel()

		codes := AllErrorCodes()

		if len(codes) != 7 {
			t.Errorf("AllErrorCodes() returned %d codes, want 7", len(codes))
		}
	})

	t.Run("CodeHelp returns help for each code", func(t *testing.T) {
		t.Parallel()

		for _, code := range AllErrorCodes() {
			help := CodeHelp(code)
			if help == "" {
				t.Errorf("CodeHelp(%q) returned empty string", code)
			}
		}
	})
}

func TestProjectRootErrorMessaging(t *testing.T) {
	t.Parallel()

	t.Run("branded error message with cause", func(t *testing.T) {
		t.Parallel()

		err := &ProjectRootError{
			Code:      CodeProjectRootInvalidPath,
			StartPath: "/some/path",
			Markers:   []string{"go.mod"},
			Cause:     fmt.Errorf("inner error: %w", os.ErrInvalid),
		}

		msg := err.Error()

		if !strings.HasPrefix(msg, "[gogenfilter:") {
			t.Errorf("Error() missing branded prefix: %q", msg)
		}

		if !strings.Contains(msg, "project_root_invalid_path") {
			t.Errorf("Error() missing error code: %q", msg)
		}

		if !strings.Contains(msg, "/some/path") {
			t.Errorf("Error() missing start path: %q", msg)
		}
	})

	t.Run("branded error message without cause", func(t *testing.T) {
		t.Parallel()

		err := &ProjectRootError{
			Code:      CodeProjectRootNotFound,
			StartPath: "/some/path",
			Markers:   []string{"go.mod", "go.sum"},
			Cause:     nil,
		}

		msg := err.Error()

		if !strings.HasPrefix(msg, "[gogenfilter:") {
			t.Errorf("Error() missing branded prefix: %q", msg)
		}

		if !strings.Contains(msg, "go.mod, go.sum") {
			t.Errorf("Error() missing markers: %q", msg)
		}
	})
}

func TestProjectRootErrorUnwrap(t *testing.T) {
	t.Parallel()

	t.Run("returns cause", func(t *testing.T) {
		t.Parallel()

		innerErr := fmt.Errorf("inner: %w", os.ErrInvalid)
		err := &ProjectRootError{
			Code:      CodeProjectRootInvalidPath,
			StartPath: "/path",
			Markers:   []string{"go.mod"},
			Cause:     innerErr,
		}

		if !errors.Is(err, os.ErrInvalid) {
			t.Error("errors.Is failed to unwrap to os.ErrInvalid")
		}
	})

	t.Run("returns nil for nil cause", func(t *testing.T) {
		t.Parallel()

		err := &ProjectRootError{
			Code:      CodeProjectRootNotFound,
			StartPath: "/path",
			Markers:   []string{"go.mod"},
			Cause:     nil,
		}

		if err.Unwrap() != nil {
			t.Error("Expected nil unwrap for nil cause")
		}
	})
}

func TestProjectRootErrorAccessors(t *testing.T) {
	t.Parallel()

	t.Run("ErrorCode returns code", func(t *testing.T) {
		t.Parallel()

		err := &ProjectRootError{ //nolint:exhaustruct // testing specific field, others irrelevant
			Code: CodeProjectRootNotFound,
		}
		if err.ErrorCode() != CodeProjectRootNotFound {
			t.Errorf("ErrorCode() = %q, want %q", err.ErrorCode(), CodeProjectRootNotFound)
		}
	})

	t.Run("Help returns guidance", func(t *testing.T) {
		t.Parallel()

		err := &ProjectRootError{ //nolint:exhaustruct // testing specific field, others irrelevant
			Code: CodeProjectRootNotFound,
		}
		help := err.Help()

		if help == "" {
			t.Error("Help() returned empty string")
		}

		if help != CodeHelp(CodeProjectRootNotFound) {
			t.Errorf("Help() = %q, want %q", help, CodeHelp(CodeProjectRootNotFound))
		}
	})
}

func TestProjectRootErrorErrorsAs(t *testing.T) {
	t.Parallel()

	t.Run("extracts domain fields", func(t *testing.T) {
		t.Parallel()

		innerErr := fmt.Errorf("inner: %w", os.ErrPermission)
		realErr := &ProjectRootError{
			Code:      CodeProjectRootInvalidPath,
			StartPath: "/deep/path",
			Markers:   []string{"go.mod"},
			Cause:     innerErr,
		}

		var projErr *ProjectRootError
		if !errors.As(realErr, &projErr) {
			t.Fatal("errors.As failed to extract ProjectRootError")
		}

		assertEqual(t, "StartPath", projErr.StartPath, "/deep/path")
		assertEqual(t, "Code", projErr.Code, CodeProjectRootInvalidPath)
	})

	t.Run("extracts ErrorCoder interface", func(t *testing.T) {
		t.Parallel()

		realErr := &ProjectRootError{
			Code:      CodeProjectRootNotFound,
			StartPath: "/path",
			Markers:   []string{"go.mod"},
			Cause:     nil,
		}

		var coder ErrorCoder
		if !errors.As(realErr, &coder) {
			t.Fatal("errors.As failed to extract ErrorCoder")
		}

		assertEqual(t, "ErrorCode", coder.ErrorCode(), CodeProjectRootNotFound)
	})

	t.Run("extracts Helper interface", func(t *testing.T) {
		t.Parallel()

		realErr := &ProjectRootError{
			Code:      CodeProjectRootNotFound,
			StartPath: "/path",
			Markers:   []string{"go.mod"},
			Cause:     nil,
		}

		var helper Helper
		if !errors.As(realErr, &helper) {
			t.Fatal("errors.As failed to extract Helper")
		}

		if helper.Help() == "" {
			t.Error("Help() returned empty string")
		}
	})
}

func TestProjectRootErrorSentinelMatching(t *testing.T) {
	t.Parallel()

	t.Run("matches sentinel by code", func(t *testing.T) {
		t.Parallel()

		realErr := &ProjectRootError{
			Code:      CodeProjectRootNotFound,
			StartPath: "/path",
			Markers:   []string{"go.mod"},
			Cause:     nil,
		}

		if !errors.Is(realErr, ErrProjectRootNotFound) {
			t.Error("errors.Is failed to match ErrProjectRootNotFound")
		}

		if errors.Is(realErr, ErrProjectRootInvalidPath) {
			t.Error("errors.Is should not match different code")
		}
	})

	t.Run("does not match across types", func(t *testing.T) {
		t.Parallel()

		err := &ProjectRootError{ //nolint:exhaustruct // testing cross-type rejection, fields irrelevant
			Code: CodeProjectRootNotFound,
		}
		if errors.Is(err, ErrSQLCConfigRead) {
			t.Error("errors.Is should not match across different error types")
		}
	})
}

func TestSQLCConfigErrorMessaging(t *testing.T) {
	t.Parallel()

	t.Run("branded error message with config path", func(t *testing.T) {
		t.Parallel()

		err := &SQLCConfigError{
			Code:       CodeSQLCConfigRead,
			ConfigPath: "/path/to/sqlc.yaml",
			Operation:  "read",
			Cause:      fmt.Errorf("permission denied: %w", os.ErrPermission),
		}

		msg := err.Error()

		if !strings.HasPrefix(msg, "[gogenfilter:") {
			t.Errorf("Error() missing branded prefix: %q", msg)
		}

		if !strings.Contains(msg, "sqlc_config_read") {
			t.Errorf("Error() missing error code: %q", msg)
		}

		if !strings.Contains(msg, "/path/to/sqlc.yaml") {
			t.Errorf("Error() missing config path: %q", msg)
		}
	})

	t.Run("branded error message without config path", func(t *testing.T) {
		t.Parallel()

		err := &SQLCConfigError{
			Code:       CodeSQLCConfigFind,
			ConfigPath: "",
			Operation:  "find",
			Cause:      fmt.Errorf("not found: %w", os.ErrNotExist),
		}

		msg := err.Error()

		if !strings.HasPrefix(msg, "[gogenfilter:") {
			t.Errorf("Error() missing branded prefix: %q", msg)
		}

		if !strings.Contains(msg, "sqlc_config_find") {
			t.Errorf("Error() missing error code: %q", msg)
		}
	})
}

func TestSQLCConfigErrorUnwrap(t *testing.T) {
	t.Parallel()

	innerErr := fmt.Errorf("inner: %w", os.ErrPermission)
	err := &SQLCConfigError{
		Code:       CodeSQLCConfigRead,
		ConfigPath: "",
		Operation:  "read",
		Cause:      innerErr,
	}

	if !errors.Is(err, os.ErrPermission) {
		t.Error("errors.Is failed to unwrap to os.ErrPermission")
	}
}

func TestSQLCConfigErrorAccessors(t *testing.T) {
	t.Parallel()

	t.Run("ErrorCode returns code", func(t *testing.T) {
		t.Parallel()

		err := &SQLCConfigError{ //nolint:exhaustruct // testing specific field, others irrelevant
			Code: CodeSQLCConfigParse,
		}
		if err.ErrorCode() != CodeSQLCConfigParse {
			t.Errorf("ErrorCode() = %q, want %q", err.ErrorCode(), CodeSQLCConfigParse)
		}
	})

	t.Run("Help returns guidance", func(t *testing.T) {
		t.Parallel()

		err := &SQLCConfigError{ //nolint:exhaustruct // testing specific field, others irrelevant
			Code: CodeSQLCConfigParse,
		}
		help := err.Help()

		if help == "" {
			t.Error("Help() returned empty string")
		}
	})
}

func TestSQLCConfigErrorErrorsAs(t *testing.T) {
	t.Parallel()

	t.Run("extracts domain fields", func(t *testing.T) {
		t.Parallel()

		realErr := &SQLCConfigError{
			Code:       CodeSQLCConfigRead,
			ConfigPath: "/config/sqlc.yaml",
			Operation:  "read",
			Cause:      os.ErrPermission,
		}

		var sqlcErr *SQLCConfigError
		if !errors.As(realErr, &sqlcErr) {
			t.Fatal("errors.As failed to extract SQLCConfigError")
		}

		assertEqual(t, "ConfigPath", sqlcErr.ConfigPath, "/config/sqlc.yaml")
		assertEqual(t, "Operation", sqlcErr.Operation, "read")
		assertEqual(t, "Code", sqlcErr.Code, CodeSQLCConfigRead)
	})

	t.Run("extracts ErrorCoder interface", func(t *testing.T) {
		t.Parallel()

		realErr := &SQLCConfigError{
			Code:       CodeSQLCConfigParse,
			ConfigPath: "",
			Operation:  "parse",
			Cause:      os.ErrInvalid,
		}

		var coder ErrorCoder
		if !errors.As(realErr, &coder) {
			t.Fatal("errors.As failed to extract ErrorCoder")
		}

		assertEqual(t, "ErrorCode", coder.ErrorCode(), CodeSQLCConfigParse)
	})
}

func TestSQLCConfigErrorSentinelMatching(t *testing.T) {
	t.Parallel()

	t.Run("matches sentinel by code", func(t *testing.T) {
		t.Parallel()

		realErr := &SQLCConfigError{
			Code:       CodeSQLCConfigWalk,
			ConfigPath: "",
			Operation:  "walk",
			Cause:      os.ErrNotExist,
		}

		if !errors.Is(realErr, ErrSQLCConfigWalk) {
			t.Error("errors.Is failed to match ErrSQLCConfigWalk")
		}

		if errors.Is(realErr, ErrSQLCConfigRead) {
			t.Error("errors.Is should not match different code")
		}
	})

	t.Run("does not match across types", func(t *testing.T) {
		t.Parallel()

		err := &SQLCConfigError{ //nolint:exhaustruct // testing cross-type rejection, fields irrelevant
			Code: CodeSQLCConfigRead,
		}
		if errors.Is(err, ErrProjectRootNotFound) {
			t.Error("errors.Is should not match across different error types")
		}
	})
}

func TestSentinelErrors(t *testing.T) {
	t.Parallel()

	t.Run("all sentinels match themselves", func(t *testing.T) {
		t.Parallel()

		sentinels := []struct {
			name     string
			sentinel error
		}{
			{"ErrProjectRootNotFound", ErrProjectRootNotFound},
			{"ErrProjectRootInvalidPath", ErrProjectRootInvalidPath},
			{"ErrSQLCConfigRead", ErrSQLCConfigRead},
			{"ErrSQLCConfigParse", ErrSQLCConfigParse},
			{"ErrSQLCConfigWalk", ErrSQLCConfigWalk},
			{"ErrSQLCConfigCollect", ErrSQLCConfigCollect},
			{"ErrSQLCConfigFind", ErrSQLCConfigFind},
		}

		for _, s := range sentinels {
			t.Run(s.name, func(t *testing.T) {
				t.Parallel()

				if s.sentinel.Error() == "" {
					t.Errorf("%s Error() returned empty string", s.name)
				}
			})
		}
	})

	t.Run("sentinels have branded messages", func(t *testing.T) {
		t.Parallel()

		sentinels := []error{
			ErrProjectRootNotFound,
			ErrProjectRootInvalidPath,
			ErrSQLCConfigRead,
			ErrSQLCConfigParse,
			ErrSQLCConfigWalk,
			ErrSQLCConfigCollect,
			ErrSQLCConfigFind,
		}

		for _, sentinel := range sentinels {
			msg := sentinel.Error()
			if !strings.HasPrefix(msg, "[gogenfilter:") {
				t.Errorf("sentinel %q missing branded prefix: %q", msg, msg)
			}
		}
	})
}

func TestTryAddSQLCConfig(t *testing.T) {
	t.Parallel()

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
