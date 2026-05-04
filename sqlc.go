package gogenfilter

import (
	"fmt"
	"io/fs"
	"os"
	"path/filepath"
	"strings"

	"github.com/go-faster/yaml"
)

// sqlcV1Config represents a sqlc.yaml v1 configuration file structure.
type sqlcV1Config struct {
	Version  string          `yaml:"version"`
	Packages []sqlcV1Package `yaml:"packages"`
}

// sqlcV1Package represents a single package in a v1 sqlc.yaml config.
type sqlcV1Package struct {
	Path string `yaml:"path"` // output directory in v1 format
}

// sqlcConfig represents a sqlc.yaml v2 configuration file structure.
type sqlcConfig struct {
	Version string       `yaml:"version"`
	SQL     []sqlcEngine `yaml:"sql"`
}

// sqlcEngine represents a single SQL engine configuration in sqlc.yaml.
type sqlcEngine struct {
	Schema  string         `yaml:"schema"`
	Engine  string         `yaml:"engine"`
	Gen     sqlcGenConfig  `yaml:"gen"`
	Codegen []sqlcCodegen `yaml:"codegen"`
}

// sqlcGenConfig represents the generation configuration in sqlc.yaml.
type sqlcGenConfig struct {
	Go   *sqlcGoConfig   `yaml:"go"`
	JSON *sqlcJSONConfig `yaml:"json"`
}

// sqlcGoConfig represents the Go-specific generation configuration.
type sqlcGoConfig struct {
	Package string `yaml:"package"`
	Out     string `yaml:"out"`
}

// sqlcJSONConfig represents the JSON generation configuration.
type sqlcJSONConfig struct {
	Out string `yaml:"out"`
}

// sqlcCodegen represents a plugin-based codegen entry in sqlc.yaml.
type sqlcCodegen struct {
	Out    string `yaml:"out"`
	Plugin string `yaml:"plugin"`
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

func sqlcFindError(path string, err error) *SQLCConfigError {
	return newSQLCConfigError(
		CodeSQLCConfigFind,
		ConfigPath(path),
		Operation("find"),
		ErrorMessage(fmt.Sprintf("finding sqlc configs in %q", path)),
		err,
	)
}

func sqlcWalkError(path string, err error) *SQLCConfigError {
	return newSQLCConfigError(
		CodeSQLCConfigWalk,
		ConfigPath(path),
		Operation("walk"),
		ErrorMessage(fmt.Sprintf("walking %q for sqlc configs", path)),
		err,
	)
}

func sqlcReadError(configPath string, err error) *SQLCConfigError {
	return newSQLCConfigError(
		CodeSQLCConfigRead,
		ConfigPath(configPath),
		Operation("read"),
		ErrorMessage("reading sqlc config"),
		err,
	)
}

func sqlcCollectError(configPath string, err error) *SQLCConfigError {
	return newSQLCConfigError(
		CodeSQLCConfigCollect,
		ConfigPath(configPath),
		Operation("collect-output-dirs"),
		ErrorMessage("processing sqlc config"),
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

		if walkDirForSQLCConfigs(filePath, d.Name(), configs) {
			return filepath.SkipDir
		}

		return nil
	})
	if err != nil {
		return sqlcWalkError(path, err)
	}

	return nil
}

// walkDirForSQLCConfigs records sqlc config files during directory walking.
// Returns true if the directory should be skipped.
func walkDirForSQLCConfigs(filePath, dirName string, configs map[string]string) bool {
	if shouldSkipDirectory(dirName) {
		return true
	}

	recordSQLCConfig(filePath, configs)

	return false
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

func unmarshalSQLCConfig(data []byte, configPath string) (*sqlcConfig, *SQLCConfigError) {
	var version struct {
		Version string `yaml:"version"`
	}

	if err := yaml.Unmarshal(data, &version); err != nil {
		return nil, newSQLCConfigError(
			CodeSQLCConfigParse,
			ConfigPath(configPath),
			Operation("parse"),
			ErrorMessage("detecting sqlc config version"),
			err,
		)
	}

	switch version.Version {
	case "1":
		return parseV1AsV2(data, configPath)
	case "2", "":
		var config sqlcConfig

		if err := yaml.Unmarshal(data, &config); err != nil {
			return nil, newSQLCConfigError(
				CodeSQLCConfigParse,
				ConfigPath(configPath),
				Operation("parse"),
				ErrorMessage("parsing sqlc config"),
				err,
			)
		}

		return &config, nil
	default:
		return nil, newSQLCConfigError(
			CodeSQLCConfigParse,
			ConfigPath(configPath),
			Operation("parse"),
			ErrorMessage(fmt.Sprintf("unsupported sqlc config version %q", version.Version)),
			nil,
		)
	}
}

// parseV1AsV2 parses a v1 config and converts it to v2 format.
// v1 uses packages[].path as output dirs; v2 uses sql[].gen.go.out.
func parseV1AsV2(data []byte, configPath string) (*sqlcConfig, *SQLCConfigError) {
	var v1 sqlcV1Config

	if err := yaml.Unmarshal(data, &v1); err != nil {
		return nil, newSQLCConfigError(
			CodeSQLCConfigParse,
			ConfigPath(configPath),
			Operation("parse"),
			ErrorMessage("parsing sqlc v1 config"),
			err,
		)
	}

	config := &sqlcConfig{Version: v1.Version}

	for _, pkg := range v1.Packages {
		if pkg.Path != "" {
			config.SQL = append(config.SQL, sqlcEngine{
				Gen: sqlcGenConfig{
					Go: &sqlcGoConfig{Out: pkg.Path},
				},
			})
		}
	}

	return config, nil
}

// extractOutputDirs extracts output directories from a sqlc config's SQL engines.
func extractOutputDirs(config *sqlcConfig, projectRoot string) []string {
	var outputDirs []string

	for _, sqlEngine := range config.SQL {
		// Go output: sql[].gen.go.out
		if sqlEngine.Gen.Go != nil && sqlEngine.Gen.Go.Out != "" {
			outDir := filepath.Join(projectRoot, sqlEngine.Gen.Go.Out)
			outDir = filepath.Clean(outDir)
			outputDirs = append(outputDirs, outDir)
		}

		// JSON output: sql[].gen.json.out
		if sqlEngine.Gen.JSON != nil && sqlEngine.Gen.JSON.Out != "" {
			outDir := filepath.Join(projectRoot, sqlEngine.Gen.JSON.Out)
			outDir = filepath.Clean(outDir)
			outputDirs = append(outputDirs, outDir)
		}

		// Plugin codegen: sql[].codegen[].out
		for _, cg := range sqlEngine.Codegen {
			if cg.Out != "" {
				outDir := filepath.Join(projectRoot, cg.Out)
				outDir = filepath.Clean(outDir)
				outputDirs = append(outputDirs, outDir)
			}
		}
	}

	return outputDirs
}

// GetSQLOutputDirs returns a list of output directories from sqlc configuration files.
func GetSQLOutputDirs(paths []string) ([]string, *SQLCConfigError) {
	configPaths, err := FindSQLCConfigs(paths)
	if err != nil {
		return nil, err
	}

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
			if err != nil {
				return fmt.Errorf("accessing %q: %w", filePath, err)
			}

			if walkDirForSQLCConfigs(filePath, d.Name(), configs) {
				return fs.SkipDir
			}

			return nil
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
func GetSQLOutputDirsFS(fsys fs.FS, paths []string) ([]string, *SQLCConfigError) {
	configPaths, err := FindSQLCConfigsFS(fsys, paths)
	if err != nil {
		return nil, err
	}

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
