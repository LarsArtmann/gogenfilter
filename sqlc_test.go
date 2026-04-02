package gogenfilter

import (
	"os"
	"path/filepath"
	"testing"
)

func assertStringField(t *testing.T, fieldName, actual, expected string) {
	t.Helper()
	if actual != expected {
		t.Errorf("%s = %q, want %q", fieldName, actual, expected)
	}
}

func TestHandleDirectoryWalk(t *testing.T) {
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
			err := handleDirectoryWalk(tt.dirName)
			gotSkip := err != nil
			if gotSkip != tt.wantSkip {
				t.Errorf("handleDirectoryWalk(%q) = %v, want skip=%v", tt.dirName, err, tt.wantSkip)
			}
		})
	}
}

func TestRecordSQLCConfig(t *testing.T) {
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
			if len(configs) != tt.wantLen {
				t.Errorf(
					"recordSQLCConfig(%q) added %d configs, want %d",
					tt.filePath,
					len(configs),
					tt.wantLen,
				)
			}
			if tt.wantLen > 0 {
				dir := filepath.Dir(tt.filePath)
				if configs[tt.filePath] != dir {
					t.Errorf("config dir = %q, want %q", configs[tt.filePath], dir)
				}
			}
		})
	}
}

func TestParseSQLCConfig(t *testing.T) {
	t.Run("valid config", func(t *testing.T) {
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
		if err := os.WriteFile(configPath, []byte(content), 0o644); err != nil {
			t.Fatal(err)
		}

		config, err := ParseSQLCConfig(configPath)
		if err != nil {
			t.Fatalf("ParseSQLCConfig() error = %v", err)
		}
		if config.Version != "2" {
			t.Errorf("Version = %q, want %q", config.Version, "2")
		}
		if len(config.SQL) != 1 {
			t.Fatalf("len(SQL) = %d, want 1", len(config.SQL))
		}
		assertStringField(t, "Schema", config.SQL[0].Schema, "schema.sql")
		assertStringField(t, "Engine", config.SQL[0].Engine, "postgresql")
		if config.SQL[0].Gen.Go.Package != "db" {
			t.Errorf("Package = %q, want %q", config.SQL[0].Gen.Go.Package, "db")
		}
		if config.SQL[0].Gen.Go.Out != "internal/db" {
			t.Errorf("Out = %q, want %q", config.SQL[0].Gen.Go.Out, "internal/db")
		}
	})

	t.Run("non-existent file", func(t *testing.T) {
		t.Parallel()
		_, err := ParseSQLCConfig("/nonexistent/sqlc.yaml")
		if err == nil {
			t.Error("ParseSQLCConfig() expected error for non-existent file")
		}
	})

	t.Run("invalid yaml", func(t *testing.T) {
		t.Parallel()
		tmpDir := t.TempDir()
		configPath := filepath.Join(tmpDir, "sqlc.yaml")
		content := `version: "2"
sql:
  - [invalid yaml structure
`
		if err := os.WriteFile(configPath, []byte(content), 0o644); err != nil {
			t.Fatal(err)
		}

		_, err := ParseSQLCConfig(configPath)
		if err == nil {
			t.Error("ParseSQLCConfig() expected error for invalid yaml")
		}
	})
}

func writeSQLCConfigFile(t *testing.T, dir, filename string) {
	t.Helper()
	if err := os.WriteFile(
		filepath.Join(dir, filename),
		[]byte("version: \"2\""),
		0o644,
	); err != nil {
		t.Fatal(err)
	}
}

func testSQLCConfigInSkippedDir(t *testing.T, tmpDir, dir string) {
	t.Helper()
	if err := os.MkdirAll(dir, 0o755); err != nil {
		t.Fatal(err)
	}
	writeSQLCConfigFile(t, dir, "sqlc.yaml")

	configs, err := FindSQLCConfigs([]string{tmpDir})
	if err != nil {
		t.Fatalf("FindSQLCConfigs() error = %v", err)
	}
	if len(configs) != 0 {
		t.Errorf("len(configs) = %d, want 0", len(configs))
	}
}

func TestFindSQLCConfigs(t *testing.T) {
	t.Run("finds config in directory", func(t *testing.T) {
		t.Parallel()
		tmpDir := t.TempDir()
		writeSQLCConfigFile(t, tmpDir, "sqlc.yaml")

		configs, err := FindSQLCConfigs([]string{tmpDir})
		if err != nil {
			t.Fatalf("FindSQLCConfigs() error = %v", err)
		}
		if len(configs) != 1 {
			t.Errorf("len(configs) = %d, want 1", len(configs))
		}
	})

	t.Run("finds both yaml and yml", func(t *testing.T) {
		t.Parallel()
		tmpDir := t.TempDir()
		writeSQLCConfigFile(t, tmpDir, "sqlc.yaml")
		writeSQLCConfigFile(t, tmpDir, "sqlc.yml")

		configs, err := FindSQLCConfigs([]string{tmpDir})
		if err != nil {
			t.Fatalf("FindSQLCConfigs() error = %v", err)
		}
		if len(configs) != 2 {
			t.Errorf("len(configs) = %d, want 2", len(configs))
		}
	})

	t.Run("finds config in nested directory", func(t *testing.T) {
		t.Parallel()
		tmpDir := t.TempDir()
		nestedDir := filepath.Join(tmpDir, "internal", "db")
		if err := os.MkdirAll(nestedDir, 0o755); err != nil {
			t.Fatal(err)
		}
		writeSQLCConfigFile(t, nestedDir, "sqlc.yaml")

		configs, err := FindSQLCConfigs([]string{tmpDir})
		if err != nil {
			t.Fatalf("FindSQLCConfigs() error = %v", err)
		}
		if len(configs) != 1 {
			t.Errorf("len(configs) = %d, want 1", len(configs))
		}
	})

	t.Run("skips hidden directories", func(t *testing.T) {
		t.Parallel()
		tmpDir := t.TempDir()
		dir := filepath.Join(tmpDir, ".git")
		testSQLCConfigInSkippedDir(t, tmpDir, dir)
	})

	t.Run("skips vendor directory", func(t *testing.T) {
		t.Parallel()
		tmpDir := t.TempDir()
		dir := filepath.Join(tmpDir, "vendor")
		testSQLCConfigInSkippedDir(t, tmpDir, dir)
	})

	t.Run("empty paths", func(t *testing.T) {
		t.Parallel()
		configs, err := FindSQLCConfigs([]string{})
		if err != nil {
			t.Fatalf("FindSQLCConfigs() error = %v", err)
		}
		if len(configs) != 0 {
			t.Errorf("len(configs) = %d, want 0", len(configs))
		}
	})

	t.Run("non-existent path", func(t *testing.T) {
		t.Parallel()
		configs, err := FindSQLCConfigs([]string{"/nonexistent/path"})
		if err == nil {
			t.Error("FindSQLCConfigs() expected error for non-existent path, got nil")
		}
		if len(configs) != 0 {
			t.Errorf("len(configs) = %d, want 0", len(configs))
		}
	})
}

func testSQLOutputDirs(t *testing.T, yamlContent string, wantDirs int) {
	t.Helper()
	t.Parallel()
	tmpDir := t.TempDir()
	if err := os.WriteFile(
		filepath.Join(tmpDir, "sqlc.yaml"),
		[]byte(yamlContent),
		0o644,
	); err != nil {
		t.Fatal(err)
	}

	dirs, err := GetSQLOutputDirs([]string{tmpDir})
	if err != nil {
		t.Fatalf("GetSQLOutputDirs() error = %v", err)
	}
	if len(dirs) != wantDirs {
		t.Errorf("len(dirs) = %d, want %d", len(dirs), wantDirs)
	}
}

func TestGetSQLOutputDirs(t *testing.T) {
	t.Run("extracts output directories", func(t *testing.T) {
		testSQLOutputDirs(t, `version: "2"
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
`, 2)
	})

	t.Run("no config files", func(t *testing.T) {
		t.Parallel()
		tmpDir := t.TempDir()
		dirs, err := GetSQLOutputDirs([]string{tmpDir})
		if err != nil {
			t.Fatalf("GetSQLOutputDirs() error = %v", err)
		}
		if len(dirs) != 0 {
			t.Errorf("len(dirs) = %d, want 0", len(dirs))
		}
	})

	t.Run("handles empty out field", func(t *testing.T) {
		testSQLOutputDirs(t, `version: "2"
sql:
  - schema: "schema.sql"
    engine: "postgresql"
    gen:
      go:
        package: "db"
`, 0)
	})
}

func TestTryAddSQLCConfig(t *testing.T) {
	t.Run("adds existing config", func(t *testing.T) {
		t.Parallel()
		tmpDir := t.TempDir()
		writeSQLCConfigFile(t, tmpDir, "sqlc.yaml")

		configs := make(map[string]string)
		tryAddSQLCConfig(tmpDir, "sqlc.yaml", configs)
		if len(configs) != 1 {
			t.Errorf("len(configs) = %d, want 1", len(configs))
		}
	})

	t.Run("skips non-existent config", func(t *testing.T) {
		t.Parallel()
		tmpDir := t.TempDir()
		configs := make(map[string]string)
		tryAddSQLCConfig(tmpDir, "sqlc.yaml", configs)
		if len(configs) != 0 {
			t.Errorf("len(configs) = %d, want 0", len(configs))
		}
	})
}
