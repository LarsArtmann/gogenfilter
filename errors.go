package gogenfilter

import (
	"fmt"
	"strings"
)

// errorPrefixFmt is the branded prefix format for all gogenfilter errors.
const errorPrefixFmt = "[gogenfilter:%s] "

// ErrorCode identifies a specific error condition in the gogenfilter library.
// Codes use snake_case naming and can be used for programmatic error handling.
type ErrorCode string

// String returns the error code as a string.
func (c ErrorCode) String() string { return string(c) }

// SQLCOperation describes the operation being performed when a sqlc config error occurred.
type SQLCOperation string

// String returns the operation as a string.
func (o SQLCOperation) String() string { return string(o) }

// SQLC operations identify what step failed during sqlc config processing.
const (
	OpSQLCFind    SQLCOperation = "find"                // finding sqlc config files
	OpSQLCWalk    SQLCOperation = "walk"                // walking directories for configs
	OpSQLCRead    SQLCOperation = "read"                // reading a config file
	OpSQLCCollect SQLCOperation = "collect-output-dirs" // processing config output dirs
	OpSQLCParse   SQLCOperation = "parse"               // parsing YAML content
)

// Error codes identify specific error conditions for programmatic handling.
const (
	CodeProjectRootNotFound    ErrorCode = "project_root_not_found"    // project root not found from start path
	CodeProjectRootInvalidPath ErrorCode = "project_root_invalid_path" // start path could not be resolved
	CodeInvalidFilterOption    ErrorCode = "invalid_filter_option"     // filter option is not valid
	CodeSQLCConfigRead         ErrorCode = "sqlc_config_read"          // sqlc config file could not be read
	CodeSQLCConfigParse        ErrorCode = "sqlc_config_parse"         // sqlc config file has invalid YAML
	CodeSQLCConfigWalk         ErrorCode = "sqlc_config_walk"          // directory walk for sqlc configs failed
	CodeSQLCConfigCollect      ErrorCode = "sqlc_config_collect"       // collecting output dirs from sqlc configs failed
	CodeSQLCConfigFind         ErrorCode = "sqlc_config_find"          // finding sqlc config files failed
)

// ErrorCoder is implemented by all gogenfilter errors for programmatic code access.
type ErrorCoder interface {
	ErrorCode() ErrorCode
}

// Sentinel errors for use with errors.Is.
// These have zero-value domain fields; matching is by ErrorCode only.
//
//nolint:exhaustruct
var (
	// ErrProjectRootNotFound is returned when no project root marker file is found.
	ErrProjectRootNotFound = &ProjectRootError{Code: CodeProjectRootNotFound}

	// ErrProjectRootInvalidPath is returned when the start path cannot be resolved.
	ErrProjectRootInvalidPath = &ProjectRootError{Code: CodeProjectRootInvalidPath}

	// ErrInvalidFilterOption is returned when an unrecognized FilterOption is passed.
	ErrInvalidFilterOption = &FilterConfigError{Code: CodeInvalidFilterOption}

	// ErrSQLCConfigRead is returned when a sqlc config file cannot be read.
	ErrSQLCConfigRead = &SQLCConfigError{Code: CodeSQLCConfigRead}

	// ErrSQLCConfigParse is returned when sqlc config YAML is invalid.
	ErrSQLCConfigParse = &SQLCConfigError{Code: CodeSQLCConfigParse}

	// ErrSQLCConfigWalk is returned when walking directories for sqlc configs fails.
	ErrSQLCConfigWalk = &SQLCConfigError{Code: CodeSQLCConfigWalk}

	// ErrSQLCConfigCollect is returned when collecting output dirs from sqlc configs fails.
	ErrSQLCConfigCollect = &SQLCConfigError{Code: CodeSQLCConfigCollect}

	// ErrSQLCConfigFind is returned when finding sqlc config files fails.
	ErrSQLCConfigFind = &SQLCConfigError{Code: CodeSQLCConfigFind}
)

// ProjectRootError is returned when the project root cannot be found.
type ProjectRootError struct {
	Code      ErrorCode // classifies the failure (e.g., CodeProjectRootNotFound)
	StartPath string    // directory where the search started
	Markers   []string  // root marker files searched for (e.g., go.mod)
	Err       error     // underlying error, if any
}

func (e *ProjectRootError) Error() string {
	if e.Err != nil {
		return fmt.Sprintf(
			errorPrefixFmt+"project root not found from %q: %v",
			e.Code,
			e.StartPath,
			e.Err,
		)
	}

	return fmt.Sprintf(errorPrefixFmt+"project root not found from %q (searched for: %s)",
		e.Code, e.StartPath, strings.Join(e.Markers, ", "))
}

func (e *ProjectRootError) Unwrap() error { return e.Err }

// Is supports errors.Is by comparing error codes with sentinel errors.
func (e *ProjectRootError) Is(target error) bool {
	t, ok := target.(*ProjectRootError)
	if !ok {
		return false
	}

	return e.Code == t.Code
}

// ErrorCode returns the error code for programmatic matching.
func (e *ProjectRootError) ErrorCode() ErrorCode { return e.Code }

// FilterConfigError is returned when a filter configuration is invalid.
type FilterConfigError struct {
	Code   ErrorCode    // classifies the failure (e.g., CodeInvalidFilterOption)
	Option FilterOption // the option that caused the error
	Err    error        // underlying error, if any
}

func (e *FilterConfigError) Error() string {
	if e.Err != nil {
		return fmt.Sprintf(
			errorPrefixFmt+"invalid filter option %q: %v",
			e.Code,
			e.Option,
			e.Err,
		)
	}

	return fmt.Sprintf(errorPrefixFmt+"invalid filter option %q", e.Code, e.Option)
}

func (e *FilterConfigError) Unwrap() error { return e.Err }

// Is supports errors.Is by comparing error codes with sentinel errors.
func (e *FilterConfigError) Is(target error) bool {
	t, ok := target.(*FilterConfigError)
	if !ok {
		return false
	}

	return e.Code == t.Code
}

// ErrorCode returns the error code for programmatic matching.
func (e *FilterConfigError) ErrorCode() ErrorCode { return e.Code }

// SQLCConfigError is returned when a sqlc configuration file cannot be processed.
type SQLCConfigError struct {
	Code       ErrorCode     // classifies the failure (e.g., CodeSQLCConfigParse)
	ConfigPath string        // path to the config file being processed
	Operation  SQLCOperation // what was happening when the error occurred
	Message    string        // human-readable description of the problem
	Err        error         // underlying error, if any
}

func (e *SQLCConfigError) Error() string {
	if e.ConfigPath != "" {
		if e.Err != nil {
			return fmt.Sprintf(
				errorPrefixFmt+"sqlc config %s %q: %s: %v",
				e.Code,
				e.Operation,
				e.ConfigPath,
				e.Message,
				e.Err,
			)
		}

		return fmt.Sprintf(
			errorPrefixFmt+"sqlc config %s %q: %s",
			e.Code,
			e.Operation,
			e.ConfigPath,
			e.Message,
		)
	}

	if e.Err != nil {
		return fmt.Sprintf(
			errorPrefixFmt+"sqlc config %s: %s: %v",
			e.Code,
			e.Operation,
			e.Message,
			e.Err,
		)
	}

	return fmt.Sprintf(errorPrefixFmt+"sqlc config %s: %s", e.Code, e.Operation, e.Message)
}

func (e *SQLCConfigError) Unwrap() error { return e.Err }

// Is supports errors.Is by comparing error codes with sentinel errors.
func (e *SQLCConfigError) Is(target error) bool {
	t, ok := target.(*SQLCConfigError)
	if !ok {
		return false
	}

	return e.Code == t.Code
}

// ErrorCode returns the error code for programmatic matching.
func (e *SQLCConfigError) ErrorCode() ErrorCode { return e.Code }
