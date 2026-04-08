package gogenfilter

import (
	"path/filepath"
	"testing"
)

func TestShouldSkipDirectory(t *testing.T) {
	t.Parallel()

	tests := []struct {
		name     string
		dirName  string
		wantSkip bool
	}{
		{name: "regular directory", dirName: "src", wantSkip: false},
		{name: "hidden directory", dirName: ".git", wantSkip: true},
		{name: "hidden directory with dot", dirName: ".cache", wantSkip: true},
		{name: "node_modules", dirName: "node_modules", wantSkip: true},
		{name: "vendor", dirName: "vendor", wantSkip: true},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()

			gotSkip := shouldSkipDirectory(tt.dirName)

			if gotSkip != tt.wantSkip {
				t.Errorf("shouldSkipDirectory(%q) = %v, want %v", tt.dirName, gotSkip, tt.wantSkip)
			}
		})
	}
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

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()

			configs := make(map[string]string)
			recordSQLCConfig(tt.filePath, configs)

			assertEqual(t, "len(configs)", len(configs), tt.wantLen)

			if tt.wantLen > 0 {
				dir := filepath.Dir(tt.filePath)

				if configs[tt.filePath] != dir {
					t.Errorf("config dir = %q, want %q", configs[tt.filePath], dir)
				}
			}
		})
	}
}

func TestParseSQLCConfig_Valid(t *testing.T) {
	t.Parallel()

	tmpDir := t.TempDir()
	configPath := filepath.Join(tmpDir, "sqlc.yaml")
	content := `version: "2"
sql:
  - schema: "schema.sql"
    engine: "postgresql"
    gen:
      go:
        package: "db"
        out: "internal/db"
`
	writeFile(t, configPath, content)

	config, err := parseSQLCConfig(configPath)
	if err != nil {
		t.Fatalf("parseSQLCConfig() error = %v", err)
	}

	if config.Version != "2" {
		t.Errorf("Version = %q, want %q", config.Version, "2")
	}

	if len(config.SQL) != 1 {
		t.Fatalf("len(SQL) = %d, want 1", len(config.SQL))
	}

	assertStringField(t, "Schema", config.SQL[0].Schema, "schema.sql")
	assertStringField(t, "Engine", config.SQL[0].Engine, "postgresql")
	assertStringField(t, "Package", config.SQL[0].Gen.Go.Package, "db")
	assertStringField(t, "Out", config.SQL[0].Gen.Go.Out, "internal/db")
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
