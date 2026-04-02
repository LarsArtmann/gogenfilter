package gogenfilter

import (
	"os"
	"path/filepath"
	"testing"
)

func TestHandleDirectoryWalk(t *testing.T) {
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
			err := handleDirectoryWalk(tt.dirName)
			gotSkip := err != nil
			if gotSkip != tt.wantSkip {
				t.Errorf("handleDirectoryWalk(%q) = %v, want skip=%v", tt.dirName, err, tt.wantSkip)
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
	t.Parallel()

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
		if config.SQL[0].Schema != "schema.sql" {
			t.Errorf("Schema = %q, want %q", config.SQL[0].Schema, "schema.sql")
		}
		if config.SQL[0].Engine != "postgresql" {
			t.Errorf("Engine = %q, want %q", config.SQL[0].Engine, "postgresql")
		}
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

func TestFindSQLCConfigs(t *testing.T) {
	t.Parallel()

	t.Run("finds config in directory", func(t *testing.T) {
		t.Parallel()
		tmpDir := t.TempDir()
		if err := os.WriteFile(
			filepath.Join(tmpDir, "sqlc.yaml"),
			[]byte("version: \"2\""),
			0o644,
		); err != nil {
			t.Fatal(err)
		}

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
		if err := os.WriteFile(
			filepath.Join(tmpDir, "sqlc.yaml"),
			[]byte("version: \"2\""),
			0o644,
		); err != nil {
			t.Fatal(err)
		}
		if err := os.WriteFile(
			filepath.Join(tmpDir, "sqlc.yml"),
			[]byte("version: \"2\""),
			0o644,
		); err != nil {
			t.Fatal(err)
		}

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
		if err := os.WriteFile(
			filepath.Join(nestedDir, "sqlc.yaml"),
			[]byte("version: \"2\""),
			0o644,
		); err != nil {
			t.Fatal(err)
		}

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
		hiddenDir := filepath.Join(tmpDir, ".git")
		if err := os.MkdirAll(hiddenDir, 0o755); err != nil {
			t.Fatal(err)
		}
		if err := os.WriteFile(
			filepath.Join(hiddenDir, "sqlc.yaml"),
			[]byte("version: \"2\""),
			0o644,
		); err != nil {
			t.Fatal(err)
		}

		configs, err := FindSQLCConfigs([]string{tmpDir})
		if err != nil {
			t.Fatalf("FindSQLCConfigs() error = %v", err)
		}
		if len(configs) != 0 {
			t.Errorf("len(configs) = %d, want 0 (should skip .git)", len(configs))
		}
	})

	t.Run("skips vendor directory", func(t *testing.T) {
		t.Parallel()
		tmpDir := t.TempDir()
		vendorDir := filepath.Join(tmpDir, "vendor")
		if err := os.MkdirAll(vendorDir, 0o755); err != nil {
			t.Fatal(err)
		}
		if err := os.WriteFile(
			filepath.Join(vendorDir, "sqlc.yaml"),
			[]byte("version: \"2\""),
			0o644,
		); err != nil {
			t.Fatal(err)
		}

		configs, err := FindSQLCConfigs([]string{tmpDir})
		if err != nil {
			t.Fatalf("FindSQLCConfigs() error = %v", err)
		}
		if len(configs) != 0 {
			t.Errorf("len(configs) = %d, want 0 (should skip vendor)", len(configs))
		}
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

func TestGetSQLOutputDirs(t *testing.T) {
	t.Parallel()

	t.Run("extracts output directories", func(t *testing.T) {
		t.Parallel()
		tmpDir := t.TempDir()
		content := `version: "2"
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
`
		if err := os.WriteFile(
			filepath.Join(tmpDir, "sqlc.yaml"),
			[]byte(content),
			0o644,
		); err != nil {
			t.Fatal(err)
		}

		dirs, err := GetSQLOutputDirs([]string{tmpDir})
		if err != nil {
			t.Fatalf("GetSQLOutputDirs() error = %v", err)
		}
		if len(dirs) != 2 {
			t.Errorf("len(dirs) = %d, want 2", len(dirs))
		}
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
		t.Parallel()
		tmpDir := t.TempDir()
		content := `version: "2"
sql:
  - schema: "schema.sql"
    engine: "postgresql"
    gen:
      go:
        package: "db"
`
		if err := os.WriteFile(
			filepath.Join(tmpDir, "sqlc.yaml"),
			[]byte(content),
			0o644,
		); err != nil {
			t.Fatal(err)
		}

		dirs, err := GetSQLOutputDirs([]string{tmpDir})
		if err != nil {
			t.Fatalf("GetSQLOutputDirs() error = %v", err)
		}
		if len(dirs) != 0 {
			t.Errorf("len(dirs) = %d, want 0", len(dirs))
		}
	})
}

func TestTryAddSQLCConfig(t *testing.T) {
	t.Parallel()

	t.Run("adds existing config", func(t *testing.T) {
		t.Parallel()
		tmpDir := t.TempDir()
		if err := os.WriteFile(
			filepath.Join(tmpDir, "sqlc.yaml"),
			[]byte("version: \"2\""),
			0o644,
		); err != nil {
			t.Fatal(err)
		}

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
