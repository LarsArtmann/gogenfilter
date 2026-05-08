package gogenfilter

import (
	"errors"
	"path/filepath"
	"strings"
	"testing"
	"testing/fstest"
)

func TestShouldSkipDirectory(t *testing.T) {
	t.Parallel()

	tests := []boolTestCase[string]{
		{name: "root dot", input: ".", expected: false},
		{name: "empty name", input: "", expected: false},
		{name: "regular directory", input: "src", expected: false},
		{name: "hidden directory", input: ".git", expected: true},
		{name: "hidden directory with dot", input: ".cache", expected: true},
		{name: "node_modules", input: "node_modules", expected: true},
		{name: "vendor", input: "vendor", expected: true},
	}

	runBoolTableTest(t, tests, shouldSkipDirectory, "shouldSkipDirectory")
}

func TestRecordSQLCConfig(t *testing.T) {
	t.Parallel()

	tests := []struct {
		name     string
		filePath string
		wantLen  int
	}{
		{name: "sqlc.yaml file", filePath: "/project/sqlc.yaml", wantLen: 1},
		{name: "sqlc.yml file", filePath: "/project/config/sqlc.yml", wantLen: 1},
		{name: "other yaml file", filePath: "/project/config.yaml", wantLen: 0},
		{name: "go file", filePath: "/project/main.go", wantLen: 0},
	}

	for _, testCase := range tests {
		t.Run(testCase.name, func(t *testing.T) {
			t.Parallel()

			configs := make(map[string]string)
			recordSQLCConfig(testCase.filePath, configs)

			assertEqual(t, "len(configs)", len(configs), testCase.wantLen)

			if testCase.wantLen > 0 {
				dir := filepath.Dir(testCase.filePath)

				if configs[testCase.filePath] != dir {
					t.Errorf("config dir = %q, want %q", configs[testCase.filePath], dir)
				}
			}
		})
	}
}

func TestParseSQLCConfig_Valid(t *testing.T) {
	t.Parallel()

	content := `version: "2"
sql:
  - schema: "schema.sql"
    engine: "postgresql"
    gen:
      go:
        package: "db"
        out: "internal/db"
`
	config := parseSQLCConfigFromYAML(t, content)

	if config.Version != "2" {
		t.Errorf("Version = %q, want %q", config.Version, "2")
	}

	assertLen(t, "SQL entries", len(config.SQL), 1)

	assertStringField(t, "Schema", config.SQL[0].Schema, "schema.sql")
	assertStringField(t, "Engine", config.SQL[0].Engine, "postgresql")
	assertStringField(t, "Package", config.SQL[0].Gen.Go.Package, "db")
	assertSQLGoOut(t, config, "internal/db")
}

func TestParseSQLCConfig_NonExistent(t *testing.T) {
	t.Parallel()

	_, err := parseSQLCConfig("/nonexistent/sqlc.yaml")
	if err == nil {
		t.Error("parseSQLCConfig() expected error for non-existent file")
	}
}

func TestParseSQLCConfig_InvalidYAML(t *testing.T) {
	t.Parallel()

	tmpDir := t.TempDir()
	configPath := filepath.Join(tmpDir, "sqlc.yaml")

	content := `version: "2"
sql:
  - [invalid yaml structure
`
	writeFile(t, configPath, content)

	_, err := parseSQLCConfig(configPath)
	if err == nil {
		t.Error("parseSQLCConfig() expected error for invalid yaml")
	}
}

func TestFindSQLCConfigs_FindsInDirectory(t *testing.T) {
	t.Parallel()

	tmpDir := t.TempDir()
	writeSQLCConfigFile(t, tmpDir, "sqlc.yaml")

	configs, err := FindSQLCConfigs([]string{tmpDir})
	if err != nil {
		t.Fatalf("FindSQLCConfigs() error = %v", err)
	}

	assertEqual(t, "len(configs)", len(configs), 1)
}

func TestFindSQLCConfigs_FindsBothYamlAndYml(t *testing.T) {
	t.Parallel()

	tmpDir := t.TempDir()
	writeSQLCConfigFile(t, tmpDir, "sqlc.yaml")
	writeSQLCConfigFile(t, tmpDir, "sqlc.yml")

	configs, err := FindSQLCConfigs([]string{tmpDir})
	if err != nil {
		t.Fatalf("FindSQLCConfigs() error = %v", err)
	}

	assertEqual(t, "len(configs)", len(configs), 2)
}

func TestFindSQLCConfigs_FindsInNestedDirectory(t *testing.T) {
	t.Parallel()

	tmpDir := t.TempDir()
	nestedDir := filepath.Join(tmpDir, "internal", "db")
	mkdirAll(t, nestedDir)

	writeSQLCConfigFile(t, nestedDir, "sqlc.yaml")

	configs, err := FindSQLCConfigs([]string{tmpDir})
	if err != nil {
		t.Fatalf("FindSQLCConfigs() error = %v", err)
	}

	assertEqual(t, "len(configs)", len(configs), 1)
}

func TestFindSQLCConfigs_SkipsDirectories(t *testing.T) {
	t.Parallel()

	tests := []struct {
		name string
		dir  string
	}{
		{"Git", ".git"},
		{"Vendor", "vendor"},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()

			tmpDir := t.TempDir()
			testSQLCConfigInSkippedDir(t, tmpDir, filepath.Join(tmpDir, tt.dir))
		})
	}
}

func TestFindSQLCConfigs_EmptyPaths(t *testing.T) {
	t.Parallel()

	configs, err := FindSQLCConfigs([]string{})
	if err != nil {
		t.Fatalf("FindSQLCConfigs() error = %v", err)
	}

	assertEqual(t, "len(configs)", len(configs), 0)
}

func TestFindSQLCConfigs_NonExistentPath(t *testing.T) {
	t.Parallel()

	configs, err := FindSQLCConfigs([]string{"/nonexistent/path"})
	if err == nil {
		t.Error("FindSQLCConfigs() expected error for non-existent path, got nil")
	}

	assertEqual(t, "len(configs)", len(configs), 0)
}

func TestGetSQLOutputDirs(t *testing.T) {
	t.Parallel()

	tests := []struct {
		name     string
		yaml     string
		wantDirs int
	}{
		{
			name: "extracts output directories",
			yaml: `version: "2"
sql:
  - schema: "schema.sql"
    engine: "postgresql"
    gen:
      go:
        package: "db"
        out: "internal/db"
  - schema: "schema2.sql"
    engine: "mysql"
    gen:
      go:
        package: "models"
        out: "pkg/models"
`,
			wantDirs: 2,
		},
		{
			name: "handles empty out field",
			yaml: `version: "2"
sql:
  - schema: "schema.sql"
    engine: "postgresql"
    gen:
      go:
        package: "db"
`,
			wantDirs: 0,
		},
		{
			name: "v2 codegen and json",
			yaml: `version: "2"
sql:
  - schema: "schema/"
    engine: "postgresql"
    gen:
      go:
        package: "db"
        out: "gen/db"
      json:
        out: "gen/json"
    codegen:
      - plugin: "go-structs"
        out: "gen/structs"
`,
			wantDirs: 3,
		},
		{
			name: "v1 multiple packages",
			yaml: `version: "1"
packages:
  - name: "db"
    path: "gen/db"
    engine: "postgresql"
  - name: "models"
    path: "gen/models"
    engine: "mysql"
`,
			wantDirs: 2,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()

			testSQLOutputDirs(t, tt.yaml, tt.wantDirs)
		})
	}

	t.Run("no config files", func(t *testing.T) {
		t.Parallel()

		tmpDir := t.TempDir()

		dirs, err := GetSQLOutputDirs([]string{tmpDir})
		if err != nil {
			t.Fatalf("GetSQLOutputDirs() error = %v", err)
		}

		assertEqual(t, "len(dirs)", len(dirs), 0)
	})
}

func TestGetSQLOutputDirsMultipleConfigsWarning(t *testing.T) {
	t.Parallel()

	tmpDir := t.TempDir()
	dir1 := filepath.Join(tmpDir, "svc1")
	dir2 := filepath.Join(tmpDir, "svc2")

	mkdirAll(t, dir1)
	mkdirAll(t, dir2)
	writeSQLCConfigFile(t, dir1, "sqlc.yaml")
	writeSQLCConfigFile(t, dir2, "sqlc.yaml")

	dirs, err := GetSQLOutputDirs([]string{tmpDir})
	if err != nil {
		t.Fatalf("GetSQLOutputDirs() error = %v", err)
	}

	assertEqual(t, "len(dirs)", len(dirs), 0)
}

func TestParseSQLCConfig_NonExistent_ErrorCode(t *testing.T) {
	t.Parallel()

	_, err := parseSQLCConfig("/nonexistent/sqlc.yaml")
	if err == nil {
		t.Fatal("parseSQLCConfig() expected error for non-existent file")
	}

	assertEqual(t, "ErrorCode", err.ErrorCode(), CodeSQLCConfigRead)

	assertErrorsIs(t, err, ErrSQLCConfigRead)

	assertErrorHasBrandedPrefix(t, err)
}

func TestParseSQLCConfig_InvalidYAML_ErrorCode(t *testing.T) {
	t.Parallel()

	tmpDir := t.TempDir()
	configPath := filepath.Join(tmpDir, "sqlc.yaml")
	writeFile(t, configPath, "version: \"2\"\nsql:\n  - [invalid yaml structure\n")

	_, err := parseSQLCConfig(configPath)
	if err == nil {
		t.Fatal("parseSQLCConfig() expected error for invalid YAML")
	}

	assertEqual(t, "ErrorCode", err.ErrorCode(), CodeSQLCConfigParse)

	assertErrorsIs(t, err, ErrSQLCConfigParse)

	assertErrorHasBrandedPrefix(t, err)
}

func TestFindSQLCConfigs_NonExistentPath_ErrorCode(t *testing.T) {
	t.Parallel()

	_, err := FindSQLCConfigs([]string{"/nonexistent/path"})
	if err == nil {
		t.Fatal("FindSQLCConfigs() expected error for non-existent path")
	}

	assertErrorHasBrandedPrefix(t, err)

	assertErrorsIs(t, err, ErrSQLCConfigFind)

	assertErrorHasBrandedPrefix(t, err)
}

func TestParseSQLCConfigFS_NonExistent_ErrorCode(t *testing.T) {
	t.Parallel()

	fsys := createFSWithFile(t, "sqlc.yaml", "version: \"2\"")

	_, err := parseSQLCConfigFS(fsys, "nonexistent/sqlc.yaml")
	if err == nil {
		t.Fatal("parseSQLCConfigFS() expected error for non-existent file")
	}

	assertEqual(t, "ErrorCode", err.ErrorCode(), CodeSQLCConfigRead)

	assertErrorsIs(t, err, ErrSQLCConfigRead)
}

func TestGetSQLOutputDirsFS_InvalidYAML_ErrorCode(t *testing.T) {
	t.Parallel()

	fsys := createFSWithFile(t, "sqlc.yaml", "version: \"2\"\nsql:\n  - [invalid\n")

	_, err := GetSQLOutputDirsFS(fsys, []string{"."})
	if err == nil {
		t.Fatal("GetSQLOutputDirsFS() expected error for invalid YAML")
	}

	assertEqual(t, "ErrorCode", err.ErrorCode(), CodeSQLCConfigCollect)

	assertErrorsIs(t, err, ErrSQLCConfigCollect)

	inner, ok := errors.AsType[*SQLCConfigError](err.Unwrap())
	if !ok {
		t.Fatal("unwrap should expose inner SQLCConfigError")
	}

	assertEqual(t, "inner ErrorCode", inner.ErrorCode(), CodeSQLCConfigParse)
}

func TestParseSQLCConfig_V1Format(t *testing.T) {
	t.Parallel()

	content := `version: "1"
packages:
  - name: "db"
    path: "internal/db"
    queries: "./sql/query/"
    schema: "./sql/schema/"
    engine: "postgresql"
`
	config := parseSQLCConfigFromYAML(t, content)

	assertStringField(t, "Version", config.Version, "1")

	assertLen(t, "SQL entries", len(config.SQL), 1)

	if config.SQL[0].Gen.Go == nil {
		t.Fatal("v1 SQL entry should have non-nil Go config")
	}

	assertSQLGoOut(t, config, "internal/db")
}

func TestGetSQLOutputDirs_V1Format_ReturnsOutputDirs(t *testing.T) {
	t.Parallel()

	v1YAML := `version: "1"
packages:
  - name: "db"
    path: "internal/db"
    queries: "./sql/query/"
    schema: "./sql/schema/"
    engine: "postgresql"
`
	testSQLOutputDirs(t, v1YAML, 1)
}

func TestParseSQLCConfig_V2CodegenOutput(t *testing.T) {
	t.Parallel()

	content := `version: "2"
sql:
  - schema: "schema/"
    engine: "postgresql"
    gen:
      go:
        package: "db"
        out: "gen/db"
    codegen:
      - plugin: "go-structs"
        out: "gen/structs"
      - plugin: "go-embed"
        out: "gen/embed"
`
	config := parseSQLCConfigFromYAML(t, content)

	assertLen(t, "SQL entries", len(config.SQL), 1)
	assertCodegenLen(t, config, 2)

	assertCodegenEntry(t, config, 0, "gen/structs", "go-structs")
	assertStringField(t, "Codegen[1].Out", config.SQL[0].Codegen[1].Out, "gen/embed")
}

func TestParseSQLCConfig_V2JSONOutput(t *testing.T) {
	t.Parallel()

	content := `version: "2"
sql:
  - schema: "schema/"
    engine: "postgresql"
    gen:
      go:
        package: "db"
        out: "gen/db"
      json:
        out: "gen/json"
`
	config := parseSQLCConfigFromYAML(t, content)

	if config.SQL[0].Gen.JSON == nil {
		t.Fatal("Gen.JSON should not be nil")
	}

	assertStringField(t, "Gen.JSON.Out", config.SQL[0].Gen.JSON.Out, "gen/json")
}

func TestParseSQLCConfig_UnsupportedVersion(t *testing.T) {
	t.Parallel()

	tmpDir := t.TempDir()
	configPath := filepath.Join(tmpDir, "sqlc.yaml")
	writeFile(t, configPath, "version: \"3\"\n")

	_, err := parseSQLCConfig(configPath)
	if err == nil {
		t.Fatal("expected error for unsupported version")
	}

	assertEqual(t, "ErrorCode", err.ErrorCode(), CodeSQLCConfigParse)
}

func TestParseSQLCConfig_V2GoNil(t *testing.T) {
	t.Parallel()

	content := `version: "2"
sql:
  - schema: "schema/"
    engine: "postgresql"
    codegen:
      - plugin: "custom"
        out: "gen/custom"
`
	config := parseSQLCConfigFromYAML(t, content)

	if config.SQL[0].Gen.Go != nil {
		t.Error("Gen.Go should be nil when not specified")
	}

	assertCodegenLen(t, config, 1)
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
