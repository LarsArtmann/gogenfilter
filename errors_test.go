package gogenfilter

import (
	"errors"
	"fmt"
	"io/fs"
	"os"
	"strings"
	"testing"
	"testing/fstest"
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
		"sqlc.yaml",
		"parse",
		"invalid YAML",
		os.ErrInvalid,
	)

	collectErr := newSQLCConfigError(
		CodeSQLCConfigCollect,
		"",
		"collect",
		"collecting output dirs",
		innerErr,
	)

	return innerErr, collectErr
}

func newSQLCConfigErrorParse(configPath, msg string) *SQLCConfigError {
	return newSQLCConfigError(
		CodeSQLCConfigParse,
		configPath,
		"parse",
		msg,
		os.ErrInvalid,
	)
}

func newSQLCConfigErrorRead(configPath, msg string) *SQLCConfigError {
	return newSQLCConfigError(
		CodeSQLCConfigRead,
		configPath,
		"read",
		msg,
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
			{CodeInvalidFilterOption, "invalid_filter_option"},
			{CodeFileRead, "file_read"},
			{CodeSQLCConfigRead, "sqlc_config_read"},
			{CodeSQLCConfigParse, "sqlc_config_parse"},
			{CodeSQLCConfigWalk, "sqlc_config_walk"},
			{CodeSQLCConfigCollect, "sqlc_config_collect"},
			{CodeSQLCConfigFind, "sqlc_config_find"},
			{CodeScanConfig, "scan_config"},
			{CodeScanWalk, "scan_walk"},
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
}

func TestProjectRootErrorMessaging(t *testing.T) {
	t.Parallel()

	t.Run("branded error message with cause", func(t *testing.T) {
		t.Parallel()

		err := &ProjectRootError{
			Code:      CodeProjectRootInvalidPath,
			StartPath: testSomePath,
			Markers:   []string{testMarkerGoMod},
			Err:       fmt.Errorf("inner error: %w", os.ErrInvalid),
		}

		msg := err.Error()

		assertBrandedErrorMessage(t, msg, "project_root_invalid_path", "/some/path", "")
	})

	t.Run("branded error message without cause", func(t *testing.T) {
		t.Parallel()

		err := &ProjectRootError{
			Code:      CodeProjectRootNotFound,
			StartPath: testSomePath,
			Markers:   []string{testMarkerGoMod, "go.sum"},
			Err:       nil,
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

		err := newSQLCConfigErrorRead("/path/to/sqlc.yaml", "reading sqlc config")

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
			"",
			"find",
			"finding sqlc configs",
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

func TestFilterConfigErrorIs_CrossType(t *testing.T) {
	t.Parallel()

	err := &FilterConfigError{ //nolint:exhaustruct // cross-type Is() test, only Code matters
		Code: CodeInvalidFilterOption,
	}

	target := &ProjectRootError{ //nolint:exhaustruct // cross-type Is() test, only Code matters
		Code: CodeProjectRootNotFound,
	}

	if errors.Is(err, target) {
		t.Error(
			"errors.Is should not match across different error types (FilterConfigError vs ProjectRootError)",
		)
	}
}

func TestFilterConfigErrorIs_NilTarget(t *testing.T) {
	t.Parallel()

	err := &FilterConfigError{ //nolint:exhaustruct // nil target test
		Code: CodeInvalidFilterOption,
	}

	if errors.Is(err, nil) {
		t.Error("errors.Is should not match nil target")
	}
}

func TestFilterConfigErrorIs_Sentinel(t *testing.T) {
	t.Parallel()

	err := &FilterConfigError{ //nolint:exhaustruct // sentinel matching test
		Code: CodeInvalidFilterOption,
	}

	if !errors.Is(err, ErrInvalidFilterOption) {
		t.Error("errors.Is should match sentinel with same code")
	}
}

func TestFilterConfigErrorIs_WrongSentinel(t *testing.T) {
	t.Parallel()

	err := &FilterConfigError{ //nolint:exhaustruct // wrong sentinel test
		Code: CodeInvalidFilterOption,
	}

	if errors.Is(err, ErrSQLCConfigRead) {
		t.Error("errors.Is should not match sentinel with different type")
	}
}

func TestProjectRootError_Unwrap(t *testing.T) {
	t.Parallel()

	innerErr := fmt.Errorf("inner: %w", os.ErrPermission)
	err := &ProjectRootError{
		Code:      CodeProjectRootInvalidPath,
		StartPath: "/bad/path",
		Markers:   []string{testMarkerGoMod},
		Err:       innerErr,
	}

	assertUnwrapSentinel(t, err)
}

func TestFilterConfigError_Unwrap(t *testing.T) {
	t.Parallel()

	err := &FilterConfigError{
		Code:   CodeInvalidFilterOption,
		Option: FilterSQLC,
		Err:    os.ErrPermission,
	}

	assertUnwrapSentinel(t, err)
}

func TestSQLCConfigError_Unwrap(t *testing.T) {
	t.Parallel()

	err := &SQLCConfigError{
		Code:       CodeSQLCConfigParse,
		ConfigPath: testFileSQLCConfig,
		Operation:  OpSQLCParse,
		Message:    "bad yaml",
		Err:        os.ErrPermission,
	}

	assertUnwrapSentinel(t, err)
}

func TestFileReadErrorMessaging(t *testing.T) {
	t.Parallel()

	t.Run("branded error message with cause", func(t *testing.T) {
		t.Parallel()

		err := &FileReadError{
			Code: CodeFileRead,
			Path: dbModelsGo,
			Err:  os.ErrNotExist,
		}

		msg := err.Error()

		assertBrandedErrorMessage(t, msg, "file_read", dbModelsGo, "")
	})

	t.Run("branded error message without cause", func(t *testing.T) {
		t.Parallel()

		err := &FileReadError{ //nolint:exhaustruct
			Code: CodeFileRead,
			Path: mainGo,
		}

		msg := err.Error()

		assertBrandedErrorMessage(t, msg, "file_read", mainGo, "")
	})
}

func TestFileReadErrorIs_Sentinel(t *testing.T) {
	t.Parallel()

	err := &FileReadError{ //nolint:exhaustruct
		Code: CodeFileRead,
		Path: dbModelsGo,
	}

	if !errors.Is(err, ErrFileRead) {
		t.Error("errors.Is should match sentinel with same code")
	}
}

func TestFileReadErrorIs_WrongSentinel(t *testing.T) {
	t.Parallel()

	err := &FileReadError{ //nolint:exhaustruct
		Code: CodeFileRead,
		Path: dbModelsGo,
	}

	if errors.Is(err, ErrInvalidFilterOption) {
		t.Error("errors.Is should not match sentinel with different type")
	}
}

func TestFileReadErrorIs_CrossType(t *testing.T) {
	t.Parallel()

	err := &FileReadError{ //nolint:exhaustruct
		Code: CodeFileRead,
		Path: dbModelsGo,
	}

	target := &ProjectRootError{ //nolint:exhaustruct
		Code: CodeProjectRootNotFound,
	}

	if errors.Is(err, target) {
		t.Error("errors.Is should not match across different error types")
	}
}

func TestFileReadError_Unwrap(t *testing.T) {
	t.Parallel()

	err := &FileReadError{
		Code: CodeFileRead,
		Path: dbModelsGo,
		Err:  os.ErrPermission,
	}

	assertUnwrapSentinel(t, err)
}

func TestFileReadError_ErrorCode(t *testing.T) {
	t.Parallel()

	err := &FileReadError{ //nolint:exhaustruct
		Code: CodeFileRead,
		Path: dbModelsGo,
	}

	testErrorCodeReturnsCode(t, err, CodeFileRead)
}

func TestFilterConfigErrorMessaging_EmptyOption(t *testing.T) {
	t.Parallel()

	t.Run("with cause and no option", func(t *testing.T) {
		t.Parallel()

		err := &FilterConfigError{ //nolint:exhaustruct
			Code: CodeInvalidFilterOption,
			Err:  errors.New("multiple config errors"), //nolint:err113
		}

		msg := err.Error()

		assertBrandedErrorMessage(
			t,
			msg,
			"invalid_filter_option",
			"",
			"invalid filter configuration",
		)
	})

	t.Run("without cause or option", func(t *testing.T) {
		t.Parallel()

		err := &FilterConfigError{ //nolint:exhaustruct
			Code: CodeInvalidFilterOption,
		}

		msg := err.Error()

		assertBrandedErrorMessage(
			t,
			msg,
			"invalid_filter_option",
			"",
			"invalid filter configuration",
		)
	})
}

func TestNewFilterBrandsJoinedErrors(t *testing.T) {
	t.Parallel()

	t.Run("multiple failing configs return branded FilterConfigError", func(t *testing.T) {
		t.Parallel()

		errCfg1 := func(_ *Filter) error {
			return &FilterConfigError{ //nolint:exhaustruct
				Code: CodeInvalidFilterOption, Option: FilterOption("bad1"),
			}
		}
		errCfg2 := func(_ *Filter) error {
			return &FilterConfigError{ //nolint:exhaustruct
				Code: CodeInvalidFilterOption, Option: FilterOption("bad2"),
			}
		}

		_, err := NewFilter(errCfg1, errCfg2)
		if err == nil {
			t.Fatal("expected error for failing configs")
		}

		assertErrorHasBrandedPrefix(t, err)

		if !errors.Is(err, ErrInvalidFilterOption) {
			t.Error("errors.Is should match ErrInvalidFilterOption through branded wrapper")
		}

		configErr := assertErrorType[*FilterConfigError](t, err)

		testErrorCodeReturnsCode(t, configErr, CodeInvalidFilterOption)
	})

	t.Run("single failing config returns branded FilterConfigError", func(t *testing.T) {
		t.Parallel()

		errCfg := func(_ *Filter) error {
			return &FilterConfigError{ //nolint:exhaustruct
				Code: CodeInvalidFilterOption, Option: FilterOption("terrible"),
			}
		}

		_, err := NewFilter(errCfg)
		if err == nil {
			t.Fatal("expected error for failing config")
		}

		configErr := assertErrorType[*FilterConfigError](t, err)

		testErrorCodeReturnsCode(t, configErr, CodeInvalidFilterOption)
	})
}

func TestDetectReasonFileFS_ReturnsBrandedFileReadError(t *testing.T) {
	t.Parallel()

	fsys := fstest.MapFS{}

	reason, err := DetectReasonFileFS(fsys, "nonexistent.go", FilterAll)

	if reason != ReasonNotFiltered {
		t.Errorf("reason = %q, want %q", reason, ReasonNotFiltered)
	}

	if err == nil {
		t.Fatal("expected error for non-existent file")
	}

	readErr := assertErrorType[*FileReadError](t, err)

	testErrorCodeReturnsCode(t, readErr, CodeFileRead)

	if readErr.Path != "nonexistent.go" {
		t.Errorf("Path = %q, want %q", readErr.Path, "nonexistent.go")
	}

	if !errors.Is(err, ErrFileRead) {
		t.Error("errors.Is should match ErrFileRead sentinel")
	}

	assertErrorHasBrandedPrefix(t, err)
}

func TestFilterDetailedAndContent_ReturnsBrandedFileReadError(t *testing.T) {
	t.Parallel()

	fsys := fstest.MapFS{}

	opts, _ := WithFilterOptions(FilterSQLC)

	filter, filterErr := NewFilter(opts, WithFS(fsys))
	if filterErr != nil {
		t.Fatalf("NewFilter failed: %v", filterErr)
	}

	_, _, err := filter.FilterDetailedAndContent("nonexistent.go")
	if err == nil {
		t.Fatal("expected error for non-existent file")
	}

	readErr := assertErrorType[*FileReadError](t, err)

	testErrorCodeReturnsCode(t, readErr, CodeFileRead)

	if readErr.Path != "nonexistent.go" {
		t.Errorf("Path = %q, want %q", readErr.Path, "nonexistent.go")
	}

	if !errors.Is(err, ErrFileRead) {
		t.Error("errors.Is should match ErrFileRead sentinel")
	}

	assertErrorHasBrandedPrefix(t, err)
}

func TestDetectReasonReader_ReturnsBrandedFileReadError(t *testing.T) {
	t.Parallel()

	reader := &failingReader{err: os.ErrPermission}

	_, err := DetectReasonReader("stream.go", reader, FilterSQLC)
	if err == nil {
		t.Fatal("expected error from failing reader")
	}

	readErr := assertErrorType[*FileReadError](t, err)

	testErrorCodeReturnsCode(t, readErr, CodeFileRead)

	if readErr.Path != "stream.go" {
		t.Errorf("Path = %q, want %q", readErr.Path, "stream.go")
	}

	if !errors.Is(err, os.ErrPermission) {
		t.Error("Unwrap should expose inner os.ErrPermission")
	}

	assertErrorHasBrandedPrefix(t, err)
}

type failingReader struct{ err error }

func (r *failingReader) Read(_ []byte) (int, error) { return 0, r.err }

func TestErrorCodeIncludesFileRead(t *testing.T) {
	t.Parallel()

	if CodeFileRead.String() != "file_read" {
		t.Errorf("CodeFileRead.String() = %q, want %q", CodeFileRead.String(), "file_read")
	}
}

func TestFileReadErrorFsPathError(t *testing.T) {
	t.Parallel()

	fsys := fstest.MapFS{}

	_, err := readFile(fsys, "missing.go")
	if err == nil {
		t.Fatal("expected error from readFile with missing file")
	}

	readErr := assertErrorType[*FileReadError](t, err)

	testErrorCodeReturnsCode(t, readErr, CodeFileRead)

	if !strings.Contains(readErr.Error(), "missing.go") {
		t.Errorf("Error() should contain path: %q", readErr.Error())
	}
}

func TestScanErrorMessaging(t *testing.T) {
	t.Parallel()

	t.Run("branded error message with phase and cause", func(t *testing.T) {
		t.Parallel()

		err := &ScanError{
			Code:  CodeScanWalk,
			Phase: "collect",
			Err:   os.ErrPermission,
		}

		msg := err.Error()

		assertBrandedErrorMessage(t, msg, "scan_walk", "", "")
	})

	t.Run("branded error message with phase without cause", func(t *testing.T) {
		t.Parallel()

		err := &ScanError{ //nolint:exhaustruct
			Code:  CodeScanConfig,
			Phase: "configure",
		}

		msg := err.Error()

		assertBrandedErrorMessage(t, msg, "scan_config", "", "")
	})

	t.Run("branded error message without phase or cause", func(t *testing.T) {
		t.Parallel()

		err := &ScanError{ //nolint:exhaustruct
			Code: CodeScanWalk,
		}

		msg := err.Error()

		assertBrandedErrorMessage(t, msg, "scan_walk", "", "")
	})
}

func TestScanErrorIs_Sentinel(t *testing.T) {
	t.Parallel()

	err := &ScanError{ //nolint:exhaustruct
		Code:  CodeScanWalk,
		Phase: "walk",
	}

	if !errors.Is(err, ErrScanWalk) {
		t.Error("errors.Is should match sentinel with same code")
	}
}

func TestScanErrorIs_WrongSentinel(t *testing.T) {
	t.Parallel()

	err := &ScanError{ //nolint:exhaustruct
		Code: CodeScanWalk,
	}

	if errors.Is(err, ErrScanConfig) {
		t.Error("errors.Is should not match sentinel with different code")
	}
}

func TestScanErrorIs_CrossType(t *testing.T) {
	t.Parallel()

	err := &ScanError{ //nolint:exhaustruct
		Code: CodeScanWalk,
	}

	target := &FileReadError{ //nolint:exhaustruct
		Code: CodeFileRead,
	}

	if errors.Is(err, target) {
		t.Error("errors.Is should not match across different error types")
	}
}

func TestScanError_Unwrap(t *testing.T) {
	t.Parallel()

	err := &ScanError{
		Code:  CodeScanWalk,
		Phase: "walk",
		Err:   os.ErrPermission,
	}

	assertUnwrapSentinel(t, err)
}

func TestScanError_ErrorCode(t *testing.T) {
	t.Parallel()

	err := &ScanError{ //nolint:exhaustruct
		Code:  CodeScanConfig,
		Phase: "configure",
	}

	testErrorCodeReturnsCode(t, err, CodeScanConfig)
}

func TestScanProject_ReturnsBrandedScanError(t *testing.T) {
	t.Parallel()

	fsys := &errorFS{}

	_, err := ScanProject(fsys)
	if err == nil {
		t.Fatal("expected error from ScanProject with failing filesystem")
	}

	scanErr := assertErrorType[*ScanError](t, err)

	testErrorCodeReturnsCode(t, scanErr, CodeScanWalk)

	if !errors.Is(err, ErrScanWalk) {
		t.Error("errors.Is should match ErrScanWalk sentinel")
	}

	assertErrorHasBrandedPrefix(t, err)
}

// errorFS is a test fs.FS that always returns an error.
type errorFS struct{}

func (errorFS) Open(_ string) (fs.File, error) {
	return nil, fs.ErrNotExist
}
