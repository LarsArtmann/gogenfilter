package gogenfilter

import (
	"fmt"
	"log/slog"
	"os"
	"path/filepath"
	"strings"

	"github.com/go-faster/yaml"
)

// SQLCConfig represents a sqlc.yaml configuration file structure.
type SQLCConfig struct {
	Version string       `yaml:"version"`
	SQL     []SQLCEngine `yaml:"sql"`
}

// SQLCEngine represents a single SQL engine configuration in sqlc.yaml.
type SQLCEngine struct {
	Schema string        `yaml:"schema"`
	Engine string        `yaml:"engine"`
	Gen    SQLCGenConfig `yaml:"gen"`
}

// SQLCGenConfig represents the generation configuration in sqlc.yaml.
type SQLCGenConfig struct {
	Go SQLCGoConfig `yaml:"go"`
}

// SQLCGoConfig represents the Go-specific generation configuration.
type SQLCGoConfig struct {
	Package string `yaml:"package"`
	Out     string `yaml:"out"`
}

// FindSQLCConfigs searches for sqlc.yaml or sqlc.yml files in the given paths.
// Searches both the provided paths and their parent directories (up to 3 levels up).
// Returns a map of config file path to project root directory.
func FindSQLCConfigs(paths []string) (map[string]string, error) {
	configs := make(map[string]string)

	for _, path := range paths {
		err := findSQLCConfigsInPath(path, configs)
		if err != nil {
			return nil, &SQLCConfigError{
				ConfigPath: "",
				Operation:  "find",
				Cause:      fmt.Errorf("searching path %q: %w", path, err),
			}
		}
	}

	return configs, nil
}

// findSQLCConfigsInPath searches for sqlc configs in a single path.
func findSQLCConfigsInPath(path string, configs map[string]string) error {
	err := walkPathForSQLCConfigs(path, configs)
	if err != nil {
		return fmt.Errorf("finding sqlc configs: %w", err)
	}

	findSQLCConfigsInParent(path, configs)

	return nil
}

// walkPathForSQLCConfigs walks a path to find sqlc config files.
func walkPathForSQLCConfigs(path string, configs map[string]string) error {
	err := filepath.Walk(path, func(filePath string, info os.FileInfo, err error) error {
		if err != nil {
			return fmt.Errorf("accessing %q: %w", filePath, err)
		}

		if info.IsDir() {
			return handleDirectoryWalk(info.Name())
		}

		recordSQLCConfig(filePath, configs)

		return nil
	})
	if err != nil {
		return fmt.Errorf("walking %q for sqlc configs: %w", path, err)
	}

	return nil
}

// handleDirectoryWalk determines whether to skip a directory during walk.
func handleDirectoryWalk(name string) error {
	if strings.HasPrefix(name, ".") || name == "node_modules" || name == "vendor" {
		return filepath.SkipDir
	}

	return nil
}

// recordSQLCConfig records a sqlc config file if it matches.
func recordSQLCConfig(filePath string, configs map[string]string) {
	filename := filepath.Base(filePath)
	if filename == "sqlc.yaml" || filename == "sqlc.yml" {
		configs[filePath] = filepath.Dir(filePath)
	}
}

// findSQLCConfigsInParent searches parent directories for sqlc config.
func findSQLCConfigsInParent(path string, configs map[string]string) {
	parentPath, err := FindProjectRoot(path, []string{"sqlc.yaml", "sqlc.yml"})
	if err != nil || parentPath == "" {
		return
	}

	tryAddSQLCConfig(parentPath, "sqlc.yaml", configs)
	tryAddSQLCConfig(parentPath, "sqlc.yml", configs)
}

// tryAddSQLCConfig adds a config to the map if the file exists.
func tryAddSQLCConfig(parentPath, filename string, configs map[string]string) {
	configPath := filepath.Join(parentPath, filename)
	if _, err := os.Stat(configPath); err == nil {
		configs[configPath] = parentPath
	}
}

// ParseSQLCConfig reads and parses a sqlc.yaml file.
func ParseSQLCConfig(configPath string) (*SQLCConfig, error) {
	data, err := os.ReadFile(configPath) //nolint:gosec // configPath is from controlled source
	if err != nil {
		return nil, &SQLCConfigError{
			ConfigPath: configPath,
			Operation:  "read",
			Cause:      fmt.Errorf("reading sqlc config %q: %w", configPath, err),
		}
	}

	var config SQLCConfig
	if err := yaml.Unmarshal(data, &config); err != nil {
		return nil, &SQLCConfigError{
			ConfigPath: configPath,
			Operation:  "parse",
			Cause:      fmt.Errorf("parsing sqlc config: %w", err),
		}
	}

	return &config, nil
}

// GetSQLOutputDirs returns a list of output directories from sqlc configuration files.
// Uses slog for any warnings about multiple or unparseable configs.
func GetSQLOutputDirs(paths []string) ([]string, error) {
	configPaths, err := FindSQLCConfigs(paths)
	if err != nil {
		return nil, err
	}

	if len(configPaths) > 1 {
		slog.Warn("multiple sqlc config files found", "count", len(configPaths))
	}

	var outputDirs []string

	for configPath, projectRoot := range configPaths {
		config, err := ParseSQLCConfig(configPath)
		if err != nil {
			return nil, &SQLCConfigError{
				ConfigPath: configPath,
				Operation:  "collect-output-dirs",
				Cause:      err,
			}
		}

		for _, sqlEngine := range config.SQL {
			if sqlEngine.Gen.Go.Out != "" {
				outDir := filepath.Join(projectRoot, sqlEngine.Gen.Go.Out)
				outDir = filepath.Clean(outDir)
				outputDirs = append(outputDirs, outDir)
			}
		}
	}

	return outputDirs, nil
}
