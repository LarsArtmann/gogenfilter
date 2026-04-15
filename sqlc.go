package gogenfilter

import (
	"fmt"
	"io/fs"
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
func newSQLCConfigError(
	code ErrorCode,
	configPath ConfigPath,
	operation Operation,
	message ErrorMessage,
	err error,
) *SQLCConfigError {
	return &SQLCConfigError{
		Code:       code,
		ConfigPath: configPath,
		Operation:  operation,
		Message:    message,
		Cause:      err,
	}
}

func sqlcConfigError(
	code ErrorCode,
	operation string,
	message string,
	path string,
	err error,
) *SQLCConfigError {
	return newSQLCConfigError(
		code,
		ConfigPath(path),
		Operation(operation),
		ErrorMessage(message),
		err,
	)
}

func sqlcFindError(path string, err error) *SQLCConfigError {
	return sqlcConfigError(
		CodeSQLCConfigFind,
		"find",
		fmt.Sprintf("finding sqlc configs in %q", path),
		path,
		err,
	)
}

func sqlcWalkError(path string, err error) *SQLCConfigError {
	return sqlcConfigError(
		CodeSQLCConfigWalk,
		"walk",
		fmt.Sprintf("walking %q for sqlc configs", path),
		path,
		err,
	)
}

func sqlcReadError(configPath string, err error) *SQLCConfigError {
	return sqlcConfigError(
		CodeSQLCConfigRead,
		"read",
		"reading sqlc config",
		configPath,
		err,
	)
}

func sqlcCollectError(configPath string, err error) *SQLCConfigError {
	return sqlcConfigError(
		CodeSQLCConfigCollect,
		"collect-output-dirs",
		"processing sqlc config",
		configPath,
		err,
	)
}

// FindSQLCConfigs searches for sqlc.yaml or sqlc.yml files in the given paths.
// Searches both the provided paths and their parent directories (up to 3 levels up).
// Returns a map of config file path to project root directory.
func FindSQLCConfigs(paths []string) (map[string]string, *SQLCConfigError) {
	configs := make(map[string]string)

	for _, path := range paths {
		err := findSQLCConfigsInPath(path, configs)
		if err != nil {
			return nil, sqlcFindError(path, err)
		}
	}

	return configs, nil
}

// findSQLCConfigsInPath searches for sqlc configs in a single path.
func findSQLCConfigsInPath(path string, configs map[string]string) *SQLCConfigError {
	err := walkPathForSQLCConfigs(path, configs)
	if err != nil {
		return sqlcFindError(path, err)
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

// walkDirForSQLCConfigs is a helper that records sqlc config files during directory walking.
// Returns true if the directory should be skipped.
func walkDirForSQLCConfigs(
	filePath, dirName string,
	err error,
	configs map[string]string,
) (bool, error) {
	if err != nil {
		return false, fmt.Errorf("accessing %q: %w", filePath, err)
	}

	if shouldSkipDirectory(dirName) {
		return true, nil
	}

	recordSQLCConfig(filePath, configs)

	return false, nil
}

// shouldSkipDirectory returns true if a directory should be skipped during walk.
func shouldSkipDirectory(name string) bool {
	if name == "." {
		return false
	}

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
	parentPath, err := FindProjectRoot(StartPath(path), []string{"sqlc.yaml", "sqlc.yml"})
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
		return nil, sqlcReadError(configPath, err)
	}

	return unmarshalSQLCConfig(data, configPath)
}

// warnMultipleSQLCConfigs logs a warning if multiple sqlc config files were found.
func warnMultipleSQLCConfigs(configPaths map[string]string) {
	if len(configPaths) > 1 {
		slog.Warn("multiple sqlc config files found", "count", len(configPaths))
	}
}

func unmarshalSQLCConfig(data []byte, configPath string) (*sqlcConfig, *SQLCConfigError) {
	var config sqlcConfig

	err := yaml.Unmarshal(data, &config)
	if err != nil {
		return nil, newSQLCConfigError(
			CodeSQLCConfigParse,
			ConfigPath(configPath),
			Operation("parse"),
			ErrorMessage("parsing sqlc config"),
			err,
		)
	}

	return &config, nil
}

// extractOutputDirs extracts output directories from a sqlc config's SQL engines.
func extractOutputDirs(config *sqlcConfig, projectRoot string) []string {
	var outputDirs []string

	for _, sqlEngine := range config.SQL {
		if sqlEngine.Gen.Go.Out != "" {
			outDir := filepath.Join(projectRoot, sqlEngine.Gen.Go.Out)
			outDir = filepath.Clean(outDir)
			outputDirs = append(outputDirs, outDir)
		}
	}

	return outputDirs
}

// GetSQLOutputDirs returns a list of output directories from sqlc configuration files.
// Uses slog for any warnings about multiple or unparseable configs.
func GetSQLOutputDirs(paths []string) ([]string, *SQLCConfigError) {
	configPaths, err := FindSQLCConfigs(paths)
	if err != nil {
		return nil, err
	}

	warnMultipleSQLCConfigs(configPaths)

	var outputDirs []string

	for configPath, projectRoot := range configPaths {
		config, err := parseSQLCConfig(configPath)
		if err != nil {
			return nil, sqlcCollectError(configPath, err)
		}

		outputDirs = append(outputDirs, extractOutputDirs(config, projectRoot)...)
	}

	return outputDirs, nil
}

// FindSQLCConfigsFS searches for sqlc.yaml or sqlc.yml files using the provided filesystem.
// Paths must be valid within fsys (relative to the FS root).
// Unlike FindSQLCConfigs, this does not search parent directories.
func FindSQLCConfigsFS(fsys fs.FS, paths []string) (map[string]string, *SQLCConfigError) {
	configs := make(map[string]string)

	for _, path := range paths {
		err := fs.WalkDir(fsys, path, func(filePath string, d fs.DirEntry, err error) error {
			skip, walkErr := walkDirForSQLCConfigs(filePath, d.Name(), err, configs)
			if skip {
				return fs.SkipDir
			}

			return walkErr
		})
		if err != nil {
			return nil, sqlcWalkError(path, err)
		}
	}

	return configs, nil
}

// parseSQLCConfigFS reads and parses a sqlc.yaml file from the given filesystem.
func parseSQLCConfigFS(fsys fs.FS, configPath string) (*sqlcConfig, *SQLCConfigError) {
	data, err := fs.ReadFile(fsys, configPath)
	if err != nil {
		return nil, sqlcReadError(configPath, err)
	}

	return unmarshalSQLCConfig(data, configPath)
}

// GetSQLOutputDirsFS returns output directories from sqlc configs using the provided filesystem.
// Paths must be valid within fsys (relative to the FS root).
// Uses slog for any warnings about multiple or unparseable configs.
func GetSQLOutputDirsFS(fsys fs.FS, paths []string) ([]string, *SQLCConfigError) {
	configPaths, err := FindSQLCConfigsFS(fsys, paths)
	if err != nil {
		return nil, err
	}

	warnMultipleSQLCConfigs(configPaths)

	var outputDirs []string

	for configPath, projectRoot := range configPaths {
		config, cfgErr := parseSQLCConfigFS(fsys, configPath)
		if cfgErr != nil {
			return nil, sqlcCollectError(configPath, cfgErr)
		}

		outputDirs = append(outputDirs, extractOutputDirs(config, projectRoot)...)
	}

	return outputDirs, nil
}
