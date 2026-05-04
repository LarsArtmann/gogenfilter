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

	cfg1 := FilterConfig(func(f *Filter) error {
		return errors.New(
			"config error 1",
		) //nolint:err113 // test helper for multi-error aggregation
	})
	cfg2 := FilterConfig(func(f *Filter) error {
		return errors.New(
			"config error 2",
		) //nolint:err113 // test helper for multi-error aggregation
	})

	_, err := NewFilter(cfg1, cfg2)
	if err == nil {
		t.Fatal("NewFilter should return error when multiple configs fail")
	}

	errMsg := err.Error()

	if !contains(errMsg, "config error 1") {
		t.Errorf("multi-error should mention first error, got: %s", errMsg)
	}

	if !contains(errMsg, "config error 2") {
		t.Errorf("multi-error should mention second error, got: %s", errMsg)
	}
}

func TestNewFilter_EnabledMetricsInit(t *testing.T) {
	t.Parallel()

	cfg, err := WithFilterOptions(FilterSQLC)
	if err != nil {
		t.Fatalf("WithFilterOptions error: %v", err)
	}

	filter, newErr := NewFilter(cfg)
	if newErr != nil {
		t.Fatalf("NewFilter error: %v", newErr)
	}

	stats := filter.GetStats()
	if int(stats.TotalFilesChecked) != 0 {
		t.Error("new filter should have zero checked files")
	}
}

func contains(s, substr string) bool {
	return len(s) >= len(substr) && (s == substr || len(substr) == 0 ||
		(len(s) > 0 && len(substr) > 0 && findSubstring(s, substr)))
}

func findSubstring(s, substr string) bool {
	for i := 0; i <= len(s)-len(substr); i++ {
		if s[i:i+len(substr)] == substr {
			return true
		}
	}

	return false
}

func TestMatchPattern_MalformedPattern(t *testing.T) {
	t.Parallel()

	result := MatchPattern("src/file.go", "[")
	if result {
		t.Error("malformed pattern [ should not match")
	}
}

func TestMatchPattern_MalformedPatternWithSlash(t *testing.T) {
	t.Parallel()

	result := MatchPattern("src/file.go", "src/[")
	if result {
		t.Error("malformed pattern with slash should not match")
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

	data := []byte("version: \"2\"\nsql: [invalid\n")

	_, err := unmarshalSQLCConfig(data, "sqlc.yaml")
	if err == nil {
		t.Fatal("unmarshalSQLCConfig should return error for invalid v2 YAML")
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

	if !contains(err.Error(), "unsupported") {
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
	assertStringField(t, "Out", config.SQL[0].Gen.Go.Out, "gen/models")
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

	fsys := fstest.MapFS{
		"sqlc.yaml": {
			Data: []byte(`version: "2"
sql:
  - schema: "schema/"
    engine: "postgresql"
    gen:
      go:
        package: "db"
        out: "gen/db"
`),
		},
	}

	dirs, err := GetSQLOutputDirsFS(fsys, []string{"."})
	if err != nil {
		t.Fatalf("GetSQLOutputDirsFS error: %v", err)
	}

	assertLen(t, "output dirs", len(dirs), 1)
}

func TestGetSQLOutputDirsFS_ConfigReadError(t *testing.T) {
	t.Parallel()

	fsys := fstest.MapFS{
		"project/sqlc.yaml": {
			Data: []byte("version: \"2\"\nsql:\n  - [invalid\n"),
		},
	}

	_, err := GetSQLOutputDirsFS(fsys, []string{"project"})
	if err == nil {
		t.Fatal("GetSQLOutputDirsFS should return error for invalid YAML")
	}

	assertErrorsIs(t, err, ErrSQLCConfigCollect)
}

func TestFindProjectRoot_BreakCondition(t *testing.T) {
	t.Parallel()

	_, err := FindProjectRoot(
		StartPath("/"),
		[]string{"this_marker_definitely_does_not_exist.anywhere"},
	)
	if err == nil {
		t.Fatal("FindProjectRoot should fail when reaching filesystem root")
	}

	assertEqual(t, "ErrorCode", err.ErrorCode(), CodeProjectRootNotFound)
}

func TestFindProjectRoot_InvalidPath(t *testing.T) {
	t.Parallel()

	veryLongSegment := make([]byte, 4096)
	for i := range veryLongSegment {
		veryLongSegment[i] = 'a'
	}

	longPath := "/" + string(veryLongSegment)
	var longPathSb344 strings.Builder
	for range 100 {
		longPathSb344.WriteString("/" + string(veryLongSegment))
	}
	longPath += longPathSb344.String()

	_, err := FindProjectRoot(StartPath(longPath), []string{"go.mod"})
	if err == nil {
		t.Fatal("FindProjectRoot should fail for excessively long path")
	}
}

func TestProjectRootError_Unwrap(t *testing.T) {
	t.Parallel()

	innerErr := fmt.Errorf("inner: %w", os.ErrPermission)
	err := &ProjectRootError{
		Code:      CodeProjectRootInvalidPath,
		StartPath: "/bad/path",
		Markers:   []string{"go.mod"},
		Cause:     innerErr,
	}

	if !errors.Is(err, os.ErrPermission) {
		t.Error("Unwrap should expose inner error")
	}
}

func TestFilterConfigError_Unwrap(t *testing.T) {
	t.Parallel()

	err := &FilterConfigError{
		Code:   CodeInvalidFilterOption,
		Option: FilterSQLC,
		Cause:  os.ErrPermission,
	}

	if !errors.Is(err, os.ErrPermission) {
		t.Error("Unwrap should expose inner error")
	}
}

func TestSQLCConfigError_Unwrap(t *testing.T) {
	t.Parallel()

	err := &SQLCConfigError{
		Code:       CodeSQLCConfigParse,
		ConfigPath: ConfigPath("sqlc.yaml"),
		Operation:  Operation("parse"),
		Message:    ErrorMessage("bad yaml"),
		Cause:      os.ErrPermission,
	}

	if !errors.Is(err, os.ErrPermission) {
		t.Error("Unwrap should expose inner error")
	}
}
