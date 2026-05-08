package gogenfilter

import (
	"errors"
	"fmt"
	"os"
	"path/filepath"
	"strings"
	"testing"
	"testing/fstest"
)

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

func TestNewFilter_MultiErrorAggregation(t *testing.T) {
	t.Parallel()

	cfg1 := failingFilterConfig("config error 1")
	cfg2 := failingFilterConfig("config error 2")

	_, err := NewFilter(cfg1, cfg2)
	if err == nil {
		t.Fatal("NewFilter should return error when multiple configs fail")
	}

	errMsg := err.Error()

	if !strings.Contains(errMsg, "config error 1") {
		t.Errorf("multi-error should mention first error, got: %s", errMsg)
	}

	if !strings.Contains(errMsg, "config error 2") {
		t.Errorf("multi-error should mention second error, got: %s", errMsg)
	}
}



func TestMatchPattern_MalformedPattern(t *testing.T) {
	t.Parallel()

	tests := []struct {
		name    string
		path    string
		pattern string
	}{
		{"no slash", "src/file.go", "["},
		{"with slash", "src/file.go", "src/["},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()

			result := MatchPattern(tt.path, tt.pattern)
			if result {
				t.Error("malformed pattern should not match")
			}
		})
	}
}

func TestMatchPattern_AbsolutePathWithStarSlash(t *testing.T) {
	t.Parallel()

	result := MatchPattern("/home/user/project/file.go", "*.go")
	if !result {
		t.Error("absolute path with *.go pattern should match via base name fallback")
	}
}

func TestUnmarshalSQLCConfig_V2ParseError(t *testing.T) {
	t.Parallel()

	data := []byte("version: \"2\"\nsql: not_a_list\n")

	_, err := unmarshalSQLCConfig(data, "sqlc.yaml")
	if err == nil {
		t.Fatal("unmarshalSQLCConfig should return error for invalid v2 config")
	}

	assertEqual(t, "ErrorCode", err.ErrorCode(), CodeSQLCConfigParse)
}

func TestUnmarshalSQLCConfig_UnsupportedVersion(t *testing.T) {
	t.Parallel()

	data := []byte("version: \"3\"\n")

	_, err := unmarshalSQLCConfig(data, "sqlc.yaml")
	if err == nil {
		t.Fatal("unmarshalSQLCConfig should return error for unsupported version")
	}

	assertEqual(t, "ErrorCode", err.ErrorCode(), CodeSQLCConfigParse)

	if !strings.Contains(err.Error(), "unsupported") {
		t.Errorf("error should mention unsupported version, got: %s", err.Error())
	}
}

func TestParseV1AsV2_ParseError(t *testing.T) {
	t.Parallel()

	data := []byte("version: \"1\"\npackages: [invalid\n")

	_, err := parseV1AsV2(data, "sqlc.yaml")
	if err == nil {
		t.Fatal("parseV1AsV2 should return error for invalid v1 YAML")
	}

	assertEqual(t, "ErrorCode", err.ErrorCode(), CodeSQLCConfigParse)
}

func TestParseV1AsV2_EmptyPackagePath(t *testing.T) {
	t.Parallel()

	data := []byte(`version: "1"
packages:
  - name: "db"
    path: ""
    engine: "postgresql"
  - name: "models"
    path: "gen/models"
    engine: "mysql"
`)

	config, err := parseV1AsV2(data, "sqlc.yaml")
	if err != nil {
		t.Fatalf("parseV1AsV2 error: %v", err)
	}

	assertLen(t, "SQL entries", len(config.SQL), 1)
	assertSQLGoOut(t, config, "gen/models")
}

func TestGetSQLOutputDirs_FindError(t *testing.T) {
	t.Parallel()

	_, err := GetSQLOutputDirs([]string{"/nonexistent/path/that/does/not/exist"})
	if err == nil {
		t.Fatal("GetSQLOutputDirs should return error for nonexistent path")
	}

	assertEqual(t, "ErrorCode", err.ErrorCode(), CodeSQLCConfigFind)
}

func TestGetSQLOutputDirs_ParseError(t *testing.T) {
	t.Parallel()

	tmpDir := t.TempDir()
	configPath := filepath.Join(tmpDir, "sqlc.yaml")

	writeFile(t, configPath, "version: \"3\"\n")

	_, err := GetSQLOutputDirs([]string{tmpDir})
	if err == nil {
		t.Fatal("GetSQLOutputDirs should return error for unsupported version")
	}

	assertEqual(t, "ErrorCode", err.ErrorCode(), CodeSQLCConfigCollect)
}

func TestFindSQLCConfigsFS_WalkError(t *testing.T) {
	t.Parallel()

	fsys := fstest.MapFS{}

	_, err := FindSQLCConfigsFS(fsys, []string{"nonexistent_dir"})
	if err == nil {
		t.Fatal("FindSQLCConfigsFS should return error for nonexistent dir")
	}

	assertEqual(t, "ErrorCode", err.ErrorCode(), CodeSQLCConfigWalk)
}

func TestGetSQLOutputDirsFS_ParseError(t *testing.T) {
	t.Parallel()

	fsys := fstest.MapFS{
		"sqlc.yaml": {
			Data: []byte("version: \"3\"\n"),
		},
	}

	_, err := GetSQLOutputDirsFS(fsys, []string{"."})
	if err == nil {
		t.Fatal("GetSQLOutputDirsFS should return error for unsupported version")
	}

	assertEqual(t, "ErrorCode", err.ErrorCode(), CodeSQLCConfigCollect)
}

func TestGetSQLOutputDirsFS_FindError(t *testing.T) {
	t.Parallel()

	fsys := fstest.MapFS{}

	_, err := GetSQLOutputDirsFS(fsys, []string{"nonexistent_dir"})
	if err == nil {
		t.Fatal("GetSQLOutputDirsFS should return error for nonexistent dir")
	}

	assertEqual(t, "ErrorCode", err.ErrorCode(), CodeSQLCConfigWalk)
}

func TestGetSQLOutputDirsFS_Success(t *testing.T) {
	t.Parallel()

	fsys := createFSWithFile(t, "sqlc.yaml", `version: "2"
sql:
  - schema: "schema/"
    engine: "postgresql"
    gen:
      go:
        package: "db"
        out: "gen/db"
`)

	dirs, err := GetSQLOutputDirsFS(fsys, []string{"."})
	if err != nil {
		t.Fatalf("GetSQLOutputDirsFS error: %v", err)
	}

	assertLen(t, "output dirs", len(dirs), 1)
}

func TestGetSQLOutputDirsFS_ConfigReadError(t *testing.T) {
	t.Parallel()

	fsys := createFSWithPath(t, "project/sqlc.yaml", "version: \"2\"\nsql:\n  - [invalid\n")

	_, err := GetSQLOutputDirsFS(fsys, []string{"project"})
	if err == nil {
		t.Fatal("GetSQLOutputDirsFS should return error for invalid YAML")
	}

	assertErrorsIs(t, err, ErrSQLCConfigCollect)
}

func TestFindProjectRoot_BreakCondition(t *testing.T) {
	t.Parallel()

	_, err := FindProjectRoot(
		"/",
		[]string{"this_marker_definitely_does_not_exist.anywhere"},
	)
	if err == nil {
		t.Fatal("FindProjectRoot should fail when reaching filesystem root")
	}

	assertEqual(t, "ErrorCode", err.ErrorCode(), CodeProjectRootNotFound)
}

func TestProjectRootError_Unwrap(t *testing.T) {
	t.Parallel()

	innerErr := fmt.Errorf("inner: %w", os.ErrPermission)
	err := &ProjectRootError{
		Code:      CodeProjectRootInvalidPath,
		StartPath: "/bad/path",
		Markers:   []string{"go.mod"},
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
		ConfigPath: "sqlc.yaml",
		Operation:  "parse",
		Message:    "bad yaml",
		Err:        os.ErrPermission,
	}

	assertUnwrapSentinel(t, err)
}
