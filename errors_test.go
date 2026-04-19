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

//nolint:ireturn // Generic helper function that extracts typed errors from error chain
func assertErrorsAs[T any](t *testing.T, err error) T {
	t.Helper()

	var result T
	if !errors.As(err, &result) {
		t.Fatalf("errors.As failed to extract %T", result)
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

		for _, c := range allConsts {
			if _, ok := defCodes[c]; !ok {
				t.Errorf("const %q not found in errorCodeDefs", c)
			}
		}

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

		for _, c := range codes {
			if _, ok := defCodes[c]; !ok {
				t.Errorf("AllErrorCodes() returned %q but it's not in errorCodeDefs", c)
			}
		}

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

func testProjectRootErrorNotFound(t *testing.T) *ProjectRootError {
	t.Helper()

	return &ProjectRootError{
		Code:      CodeProjectRootNotFound,
		StartPath: StartPath("/path"),
		Markers:   []string{"go.mod"},
		Cause:     nil,
	}
}

func testProjectRootErrorWithCause(
	t *testing.T,
	code ErrorCode,
	path string,
	sentinel error,
) *ProjectRootError {
	t.Helper()

	innerErr := fmt.Errorf("inner: %w", sentinel)

	return &ProjectRootError{
		Code:      code,
		StartPath: StartPath(path),
		Markers:   []string{"go.mod"},
		Cause:     innerErr,
	}
}

func TestProjectRootErrorUnwrap(t *testing.T) {
	t.Parallel()

	t.Run("returns cause", func(t *testing.T) {
		t.Parallel()

		err := testProjectRootErrorWithCause(t, CodeProjectRootInvalidPath, "/path", os.ErrInvalid)

		assertErrorsIs(t, err, os.ErrInvalid)
	})

	t.Run("returns nil for nil cause", func(t *testing.T) {
		t.Parallel()

		err := testProjectRootErrorNotFound(t)

		if err.Unwrap() != nil {
			t.Error("Expected nil unwrap for nil cause")
		}
	})
}

func TestProjectRootErrorAccessors(t *testing.T) {
	t.Parallel()

	t.Run("ErrorCode returns code", func(t *testing.T) {
		t.Parallel()

		err := &ProjectRootError{ //nolint:exhaustruct // testing specific field for accessor, others irrelevant
			Code: CodeProjectRootNotFound,
		}
		testErrorCodeReturnsCode(t, err, CodeProjectRootNotFound)
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

		realErr := testProjectRootErrorWithCause(
			t,
			CodeProjectRootInvalidPath,
			"/deep/path",
			os.ErrPermission,
		)

		projErr := assertErrorsAs[*ProjectRootError](t, realErr)

		assertEqual(t, "StartPath", projErr.StartPath, "/deep/path")
		assertEqual(t, "Code", projErr.Code, CodeProjectRootInvalidPath)
	})

	t.Run("extracts ErrorCoder interface", func(t *testing.T) {
		t.Parallel()

		realErr := testProjectRootErrorNotFound(t)

		coder := assertErrorsAs[ErrorCoder](t, realErr)

		assertEqual(t, "ErrorCode", coder.ErrorCode(), CodeProjectRootNotFound)
	})

	t.Run("extracts Helper interface", func(t *testing.T) {
		t.Parallel()

		realErr := testProjectRootErrorNotFound(t)

		helper := assertErrorsAs[Helper](t, realErr)

		if helper.Help() == "" {
			t.Error("Help() returned empty string")
		}
	})
}

func TestProjectRootErrorSentinelMatching(t *testing.T) {
	t.Parallel()

	t.Run("matches sentinel by code", func(t *testing.T) {
		t.Parallel()

		realErr := testProjectRootErrorNotFound(t)

		assertErrorsIs(t, realErr, ErrProjectRootNotFound)

		if errors.Is(realErr, ErrProjectRootInvalidPath) {
			t.Error("errors.Is should not match different code")
		}
	})

	t.Run("does not match across types", func(t *testing.T) {
		t.Parallel()

		testCrossTypeMismatch(
			t, "ProjectRoot", CodeProjectRootNotFound,
			"ErrSQLCConfigRead", ErrSQLCConfigRead,
		)
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

func TestSQLCConfigErrorUnwrap(t *testing.T) {
	t.Parallel()

	err := newSQLCConfigErrorRead(ConfigPath(""), "reading sqlc config")

	assertErrorsIs(t, err, os.ErrPermission)
}

func TestSQLCConfigErrorAccessors(t *testing.T) {
	t.Parallel()

	t.Run("ErrorCode returns code", func(t *testing.T) {
		t.Parallel()

		err := &SQLCConfigError{ //nolint:exhaustruct // testing specific field for accessor, others irrelevant
			Code: CodeSQLCConfigParse,
		}
		testErrorCodeReturnsCode(t, err, CodeSQLCConfigParse)
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

		realErr := newSQLCConfigError(
			CodeSQLCConfigRead,
			"/config/sqlc.yaml",
			"read",
			"reading sqlc config",
			os.ErrPermission,
		)

		sqlcErr := assertErrorsAs[*SQLCConfigError](t, realErr)

		assertEqual(t, "ConfigPath", sqlcErr.ConfigPath, "/config/sqlc.yaml")
		assertEqual(t, "Operation", sqlcErr.Operation, "read")
		assertEqual(t, "Message", sqlcErr.Message, "reading sqlc config")
		assertEqual(t, "Code", sqlcErr.Code, CodeSQLCConfigRead)
	})

	t.Run("extracts ErrorCoder interface", func(t *testing.T) {
		t.Parallel()

		realErr := newSQLCConfigError(
			CodeSQLCConfigParse,
			"",
			"parse",
			"parsing sqlc config",
			os.ErrInvalid,
		)

		coder := assertErrorsAs[ErrorCoder](t, realErr)

		assertEqual(t, "ErrorCode", coder.ErrorCode(), CodeSQLCConfigParse)
	})
}

func TestSQLCConfigErrorSentinelMatching(t *testing.T) {
	t.Parallel()

	t.Run("matches sentinel by code", func(t *testing.T) {
		t.Parallel()

		realErr := newSQLCConfigError(
			CodeSQLCConfigWalk,
			"",
			"walk",
			"walking directory",
			os.ErrNotExist,
		)

		assertErrorsIs(t, realErr, ErrSQLCConfigWalk)

		if errors.Is(realErr, ErrSQLCConfigRead) {
			t.Error("errors.Is should not match different code")
		}
	})

	t.Run("does not match across types", func(t *testing.T) {
		t.Parallel()

		testCrossTypeMismatch(
			t, "SQLCConfig", CodeSQLCConfigRead,
			"ErrProjectRootNotFound", ErrProjectRootNotFound,
		)
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
			assertErrorHasBrandedPrefix(t, sentinel)
		}
	})
}

func TestErrorCodeImplementsFmtStringer(t *testing.T) {
	t.Parallel()

	var _ fmt.Stringer = ErrorCode("")

	assertEqual(t, "String()", CodeProjectRootNotFound.String(), "project_root_not_found")
}

func TestProjectRootErrorUnwrapChainIntegration(t *testing.T) {
	t.Parallel()

	t.Run("unwraps through nested fmt.Errorf to sentinel", func(t *testing.T) {
		t.Parallel()

		inner := &ProjectRootError{
			Code:      CodeProjectRootInvalidPath,
			StartPath: "/path",
			Markers:   []string{"go.mod"},
			Cause:     os.ErrPermission,
		}

		wrapped := fmt.Errorf("layer2: %w", fmt.Errorf("layer1: %w", inner))

		var extracted *ProjectRootError

		if !errors.As(wrapped, &extracted) {
			t.Fatal("errors.As should find ProjectRootError through nested wrapping")
		}

		assertEqual(t, "ErrorCode", extracted.ErrorCode(), CodeProjectRootInvalidPath)
		assertEqual(t, "StartPath", extracted.StartPath, StartPath("/path"))
	})

	t.Run("errors.Is reaches sentinel through multiple wraps", func(t *testing.T) {
		t.Parallel()

		inner := &ProjectRootError{
			Code:      CodeProjectRootNotFound,
			StartPath: "/path",
			Markers:   []string{"go.mod"},
			Cause:     nil,
		}

		wrapped := fmt.Errorf("outer: %w", inner)

		assertErrorsIs(t, wrapped, ErrProjectRootNotFound)
	})
}

func TestSQLCConfigErrorUnwrapChainIntegration(t *testing.T) {
	t.Parallel()

	t.Run("unwraps collect error to inner parse error", testSQLCUnwrapCollectToInner)
	t.Run("errors.Is matches collect sentinel", testSQLCUnwrapCollectSentinel)
	t.Run(
		"errors.Is reaches inner parse sentinel through Unwrap chain",
		testSQLCUnwrapInnerSentinel,
	)
}

func testSQLCUnwrapCollectToInner(t *testing.T) {
	t.Parallel()

	_, collectErr := sqlcConfigUnwrapTestSetup()

	var inner *SQLCConfigError
	if !errors.As(collectErr.Unwrap(), &inner) {
		t.Fatal("Unwrap() should expose inner SQLCConfigError")
	}

	assertEqual(t, "inner ErrorCode", inner.ErrorCode(), CodeSQLCConfigParse)
	assertEqual(t, "inner ConfigPath", inner.ConfigPath, ConfigPath("sqlc.yaml"))
}

func testSQLCUnwrapCollectSentinel(t *testing.T) {
	t.Parallel()

	_, collectErr := sqlcConfigUnwrapTestSetup()

	assertErrorsIs(t, collectErr, ErrSQLCConfigCollect)
}

func testSQLCUnwrapInnerSentinel(t *testing.T) {
	t.Parallel()

	_, collectErr := sqlcConfigUnwrapTestSetup()

	assertErrorsIs(t, collectErr, ErrSQLCConfigCollect)
	assertErrorsIs(t, collectErr, ErrSQLCConfigParse)
}

func BenchmarkNewProjectRootError(b *testing.B) {
	for b.Loop() {
		result := newBenchmarkProjectRootError()
		_ = result
	}
}

func BenchmarkNewSQLCConfigError(b *testing.B) {
	for b.Loop() {
		_ = newSQLCConfigErrorParse(ConfigPath("/path/to/sqlc.yaml"), "invalid YAML syntax")
	}
}

func BenchmarkProjectRootErrorError(b *testing.B) {
	err := newBenchmarkProjectRootError()

	for b.Loop() {
		_ = err.Error()
	}
}

func newBenchmarkProjectRootError() *ProjectRootError {
	return &ProjectRootError{
		Code:      CodeProjectRootNotFound,
		StartPath: "/some/path/to/project",
		Markers:   []string{"go.mod"},
		Cause:     os.ErrNotExist,
	}
}

func BenchmarkSQLCConfigErrorError(b *testing.B) {
	err := newSQLCConfigErrorParse(ConfigPath("/path/to/sqlc.yaml"), "invalid YAML syntax")

	for b.Loop() {
		_ = err.Error()
	}
}

func BenchmarkProjectRootErrorIs(b *testing.B) {
	err := &ProjectRootError{ //nolint:exhaustruct // benchmark only needs Code for Is() comparison
		Code:      CodeProjectRootNotFound,
		StartPath: "/some/path",
		Markers:   []string{"go.mod"},
	}

	for b.Loop() {
		_ = errors.Is(err, ErrProjectRootNotFound)
	}
}

func BenchmarkSQLCConfigErrorIs(b *testing.B) {
	err := newSQLCConfigErrorParse(ConfigPath("/path/to/sqlc.yaml"), "invalid YAML")

	for b.Loop() {
		_ = errors.Is(err, ErrSQLCConfigParse)
	}
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
