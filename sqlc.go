package gogenfilter

import (
	"fmt"
	"log/slog"
	"os"
	"path/filepath"
	"strings"

	"github.com/go-faster/yaml"
)

// sqlcConfig represents a sqlc.yaml configuration file structure.
type sqlcConfig struct {
	Version string       `yaml:"version"`
	SQL     []sqlcEngine `yaml:"sql"`
}

// sqlcEngine represents a single SQL engine configuration in sqlc.yaml.
type sqlcEngine struct {
	Schema string        `yaml:"schema"`
	Engine string        `yaml:"engine"`
	Gen    sqlcGenConfig `yaml:"gen"`
}

// sqlcGenConfig represents the generation configuration in sqlc.yaml.
type sqlcGenConfig struct {
	Go sqlcGoConfig `yaml:"go"`
}

// sqlcGoConfig represents the Go-specific generation configuration.
type sqlcGoConfig struct {
	Package string `yaml:"package"`
	Out     string `yaml:"out"`
}

// newSQLCConfigError creates a new SQLCConfigError with consistent formatting.
// Use the specialized functions below for specific operations to satisfy err113.
func newSQLCConfigError(operation, message string, err error) *SQLCConfigError {
	return &SQLCConfigError{
		ConfigPath: "",
		Operation:  operation,
		Cause:      fmt.Errorf("%s: %w", message, err),
	}
}

func sqlcFindConfigError(path string, err error) *SQLCConfigError {
	return newSQLCConfigError("find", fmt.Sprintf("searching path %q", path), err)
}

func sqlcFindInPathError(path string, err error) *SQLCConfigError {
	return newSQLCConfigError("find", fmt.Sprintf("finding sqlc configs in %q", path), err)
}

func sqlcWalkError(path string, err error) *SQLCConfigError {
	return newSQLCConfigError("walk", fmt.Sprintf("walking %q for sqlc configs", path), err)
}

// FindSQLCConfigs searches for sqlc.yaml or sqlc.yml files in the given paths.
// Searches both the provided paths and their parent directories (up to 3 levels up).
// Returns a map of config file path to project root directory.
func FindSQLCConfigs(paths []string) (map[string]string, *SQLCConfigError) {
	configs := make(map[string]string)

	for _, path := range paths {
		err := findSQLCConfigsInPath(path, configs)
		if err != nil {
			return nil, sqlcFindConfigError(path, err)
		}
	}

	return configs, nil
}

// findSQLCConfigsInPath searches for sqlc configs in a single path.
func findSQLCConfigsInPath(path string, configs map[string]string) *SQLCConfigError {
	err := walkPathForSQLCConfigs(path, configs)
	if err != nil {
		return sqlcFindInPathError(path, err)
	}

	findSQLCConfigsInParent(path, configs)

	return nil
}

// walkPathForSQLCConfigs walks a path to find sqlc config files.
func walkPathForSQLCConfigs(path string, configs map[string]string) *SQLCConfigError {
	err := filepath.WalkDir(path, func(filePath string, d os.DirEntry, err error) error {
		if err != nil {
			return fmt.Errorf("accessing %q: %w", filePath, err)
		}

		if d.IsDir() && shouldSkipDirectory(d.Name()) {
			return filepath.SkipDir
		}

		recordSQLCConfig(filePath, configs)

		return nil
	})
	if err != nil {
		return sqlcWalkError(path, err)
	}

	return nil
}

// shouldSkipDirectory returns true if a directory should be skipped during walk.
func shouldSkipDirectory(name string) bool {
	return strings.HasPrefix(name, ".") || name == "node_modules" || name == "vendor"
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
	if fileExists(configPath) {
		configs[configPath] = parentPath
	}
}

// parseSQLCConfig reads and parses a sqlc.yaml file.
func parseSQLCConfig(configPath string) (*sqlcConfig, *SQLCConfigError) {
	data, err := os.ReadFile(configPath) //nolint:gosec // configPath is from controlled source
	if err != nil {
		return nil, newSQLCConfigError(
			"read",
			fmt.Sprintf("reading sqlc config %q", configPath),
			err,
		)
	}

	var config sqlcConfig
	if err := yaml.Unmarshal(data, &config); err != nil {
		return nil, newSQLCConfigError("parse", "parsing sqlc config", err)
	}

	return &config, nil
}

// GetSQLOutputDirs returns a list of output directories from sqlc configuration files.
// Uses slog for any warnings about multiple or unparseable configs.
func GetSQLOutputDirs(paths []string) ([]string, *SQLCConfigError) {
	configPaths, err := FindSQLCConfigs(paths)
	if err != nil {
		return nil, err
	}

	if len(configPaths) > 1 {
		slog.Warn("multiple sqlc config files found", "count", len(configPaths))
	}

	var outputDirs []string

	for configPath, projectRoot := range configPaths {
		config, err := parseSQLCConfig(configPath)
		if err != nil {
			return nil, newSQLCConfigError(
				"collect-output-dirs",
				fmt.Sprintf("processing %q", configPath),
				err,
			)
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
