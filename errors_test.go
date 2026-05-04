package gogenfilter

import (
	"errors"
	"fmt"
	"os"
	"strings"
	"testing"
)

func assertBrandedErrorMessage(t *testing.T, msg, errorCode, path, message string) {
	t.Helper()

	if !strings.HasPrefix(msg, "[gogenfilter:") {
		t.Errorf("Error() missing branded prefix: %q", msg)
	}

	if !strings.Contains(msg, errorCode) {
		t.Errorf("Error() missing error code: %q", msg)
	}

	if path != "" && !strings.Contains(msg, path) {
		t.Errorf("Error() missing path: %q", msg)
	}

	if message != "" && !strings.Contains(msg, message) {
		t.Errorf("Error() missing message: %q", msg)
	}
}

func assertAllInMap[K comparable](t *testing.T, name string, items []K, lookup map[K]struct{}) {
	t.Helper()

	for _, item := range items {
		if _, ok := lookup[item]; !ok {
			t.Errorf("%v not found in %s", item, name)
		}
	}
}

//nolint:ireturn // Generic helper function that extracts typed errors from error chain
func assertErrorType[T error](t *testing.T, err error) T {
	t.Helper()

	result, ok := errors.AsType[T](err)
	if !ok {
		t.Fatalf("errors.AsType failed to extract %T", result)
	}

	return result
}

func testErrorCodeReturnsCode[T ErrorCoder](t *testing.T, err T, expectedCode ErrorCode) {
	t.Helper()

	if err.ErrorCode() != expectedCode {
		t.Errorf("ErrorCode() = %q, want %q", err.ErrorCode(), expectedCode)
	}
}

func sqlcConfigUnwrapTestSetup() (*SQLCConfigError, *SQLCConfigError) {
	innerErr := newSQLCConfigError(
		CodeSQLCConfigParse,
		ConfigPath("sqlc.yaml"),
		Operation("parse"),
		ErrorMessage("invalid YAML"),
		os.ErrInvalid,
	)

	collectErr := newSQLCConfigError(
		CodeSQLCConfigCollect,
		ConfigPath(""),
		Operation("collect"),
		ErrorMessage("collecting output dirs"),
		innerErr,
	)

	return innerErr, collectErr
}

func newSQLCConfigErrorParse(configPath ConfigPath, msg string) *SQLCConfigError {
	return newSQLCConfigError(
		CodeSQLCConfigParse,
		configPath,
		Operation("parse"),
		ErrorMessage(msg),
		os.ErrInvalid,
	)
}

func newSQLCConfigErrorRead(configPath ConfigPath, msg string) *SQLCConfigError {
	return newSQLCConfigError(
		CodeSQLCConfigRead,
		configPath,
		Operation("read"),
		ErrorMessage(msg),
		os.ErrPermission,
	)
}

func testCrossTypeMismatch(
	t *testing.T,
	errType string,
	code ErrorCode,
	sentinelName string,
	sentinel error,
) {
	t.Helper()

	var err error

	switch errType {
	case "ProjectRoot":
		err = &ProjectRootError{ //nolint:exhaustruct // testing Is() across types, Code is the only field that matters
			Code: code,
		}
	case "SQLCConfig":
		err = &SQLCConfigError{ //nolint:exhaustruct // testing Is() across types, Code is the only field that matters
			Code: code,
		}
	default:
		t.Fatalf("unknown error type: %s", errType)
	}

	if errors.Is(err, sentinel) {
		t.Errorf(
			"errors.Is should not match across different error types: %s vs %s",
			errType, sentinelName,
		)
	}
}

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

		for _, testCase := range cases {
			t.Run(testCase.expected, func(t *testing.T) {
				t.Parallel()

				if testCase.code.String() != testCase.expected {
					t.Errorf(
						"ErrorCode(%q).String() = %q, want %q",
						testCase.code,
						testCase.code.String(),
						testCase.expected,
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

	t.Run("errorCodeDefs covers every const", func(t *testing.T) {
		t.Parallel()

		allConsts := []ErrorCode{
			CodeProjectRootNotFound,
			CodeProjectRootInvalidPath,
			CodeSQLCConfigRead,
			CodeSQLCConfigParse,
			CodeSQLCConfigWalk,
			CodeSQLCConfigCollect,
			CodeSQLCConfigFind,
		}

		defCodes := make(map[ErrorCode]struct{}, len(errorCodeDefs))
		for _, def := range errorCodeDefs {
			defCodes[def.Code] = struct{}{}
		}

		assertAllInMap(t, "errorCodeDefs", allConsts, defCodes)

		if len(defCodes) != len(allConsts) {
			t.Errorf("errorCodeDefs has %d entries but there are %d const error codes",
				len(defCodes), len(allConsts))
		}
	})

	t.Run("errorCodeDefs has no duplicates", func(t *testing.T) {
		t.Parallel()

		seen := make(map[ErrorCode]int, len(errorCodeDefs))
		for _, def := range errorCodeDefs {
			seen[def.Code]++
		}

		for code, count := range seen {
			if count > 1 {
				t.Errorf("errorCodeDefs has duplicate entry for %q (count: %d)", code, count)
			}
		}
	})

	t.Run("errorCodeDefs has non-empty help text", func(t *testing.T) {
		t.Parallel()

		for _, def := range errorCodeDefs {
			if strings.TrimSpace(def.Help) == "" {
				t.Errorf("errorCodeDefs entry for %q has empty help text", def.Code)
			}
		}
	})

	t.Run("AllErrorCodes matches errorCodeDefs exactly", func(t *testing.T) {
		t.Parallel()

		codes := AllErrorCodes()

		defCodes := make(map[ErrorCode]struct{}, len(errorCodeDefs))
		for _, def := range errorCodeDefs {
			defCodes[def.Code] = struct{}{}
		}

		assertAllInMap(t, "errorCodeDefs", codes, defCodes)

		if len(codes) != len(defCodes) {
			t.Errorf("AllErrorCodes() returned %d codes, errorCodeDefs has %d",
				len(codes), len(defCodes))
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

		assertBrandedErrorMessage(t, msg, "project_root_invalid_path", "/some/path", "")
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

		assertErrorHasBrandedPrefix(t, err)

		if !strings.Contains(msg, "go.mod, go.sum") {
			t.Errorf("Error() missing markers: %q", msg)
		}
	})
}

func TestSQLCConfigErrorMessaging(t *testing.T) {
	t.Parallel()

	t.Run("branded error message with config path", func(t *testing.T) {
		t.Parallel()

		err := newSQLCConfigErrorRead(ConfigPath("/path/to/sqlc.yaml"), "reading sqlc config")

		msg := err.Error()

		assertBrandedErrorMessage(
			t,
			msg,
			"sqlc_config_read",
			"/path/to/sqlc.yaml",
			"reading sqlc config",
		)
	})

	t.Run("branded error message without config path", func(t *testing.T) {
		t.Parallel()

		err := newSQLCConfigError(
			CodeSQLCConfigFind,
			ConfigPath(""),
			Operation("find"),
			ErrorMessage("finding sqlc configs"),
			os.ErrNotExist,
		)

		msg := err.Error()

		assertBrandedErrorMessage(t, msg, "sqlc_config_find", "", "finding sqlc configs")
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
