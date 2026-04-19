package gogenfilter

import (
	"fmt"
	"strings"
)

// ErrorCode identifies a specific error condition in the gogenfilter library.
// Codes use snake_case naming and can be used for programmatic error handling.
type ErrorCode string

func (c ErrorCode) String() string { return string(c) }

// Error codes identify specific error conditions for programmatic handling.
const (
	CodeProjectRootNotFound    ErrorCode = "project_root_not_found"    // project root not found from start path
	CodeProjectRootInvalidPath ErrorCode = "project_root_invalid_path" // start path could not be resolved
	CodeSQLCConfigRead         ErrorCode = "sqlc_config_read"          // sqlc config file could not be read
	CodeSQLCConfigParse        ErrorCode = "sqlc_config_parse"         // sqlc config file has invalid YAML
	CodeSQLCConfigWalk         ErrorCode = "sqlc_config_walk"          // directory walk for sqlc configs failed
	CodeSQLCConfigCollect      ErrorCode = "sqlc_config_collect"       // collecting output dirs from sqlc configs failed
	CodeSQLCConfigFind         ErrorCode = "sqlc_config_find"          // finding sqlc config files failed
)

// errorCodeDef pairs an error code with its user-facing help text.
// All error codes are defined here — AllErrorCodes() and CodeHelp() derive from this table.
type errorCodeDef struct {
	Code ErrorCode
	Help string
}

// errorCodeDefs is the single source of truth for all error codes.
// Adding a new entry here automatically updates AllErrorCodes() and CodeHelp().
//
//nolint:gochecknoglobals // immutable lookup table, never mutated
var errorCodeDefs = []errorCodeDef{
	{CodeProjectRootNotFound, //nolint:golines // help text is more readable on one line
		"Ensure the directory is within a Go project containing a go.mod file or other project marker file."},
	{CodeProjectRootInvalidPath, "Verify the start path exists and is a valid directory."},
	{
		CodeSQLCConfigRead,
		"Check that the sqlc config file exists and has appropriate read permissions.",
	},
	{CodeSQLCConfigParse, //nolint:golines // help text is more readable on one line
		"Verify the sqlc.yaml file has valid YAML syntax. Refer to https://docs.sqlc.dev for the expected format."},
	{CodeSQLCConfigWalk, "Ensure the search path exists and is accessible for directory traversal."},
	{CodeSQLCConfigCollect, "Verify that all sqlc config files are valid and accessible."},
	{
		CodeSQLCConfigFind,
		"Ensure the search path contains a sqlc.yaml or sqlc.yml configuration file.",
	},
}

// AllErrorCodes returns all defined error codes.
// Derived from errorCodeDefs — adding a new def automatically updates this list.
func AllErrorCodes() []ErrorCode {
	codes := make([]ErrorCode, len(errorCodeDefs))
	for i, def := range errorCodeDefs {
		codes[i] = def.Code
	}

	return codes
}

// helpText builds the help lookup map from errorCodeDefs.
//
//nolint:gochecknoglobals // immutable lookup table, derived from errorCodeDefs
var helpText = func() map[ErrorCode]string {
	m := make(map[ErrorCode]string, len(errorCodeDefs))
	for _, def := range errorCodeDefs {
		m[def.Code] = def.Help
	}

	return m
}()

// CodeHelp returns the user-friendly help text for the given error code.
func CodeHelp(code ErrorCode) string {
	return helpText[code]
}

// ErrorCoder is implemented by all gogenfilter errors for programmatic code access.
type ErrorCoder interface {
	ErrorCode() ErrorCode
}

// Helper is implemented by errors that provide user-friendly guidance.
type Helper interface {
	Help() string
}

// Sentinel errors for use with errors.Is.
// These have zero-value domain fields; matching is by ErrorCode only.
//
//nolint:exhaustruct
var (
	ErrProjectRootNotFound    = &ProjectRootError{Code: CodeProjectRootNotFound}
	ErrProjectRootInvalidPath = &ProjectRootError{Code: CodeProjectRootInvalidPath}
	ErrSQLCConfigRead         = &SQLCConfigError{Code: CodeSQLCConfigRead}
	ErrSQLCConfigParse        = &SQLCConfigError{Code: CodeSQLCConfigParse}
	ErrSQLCConfigWalk         = &SQLCConfigError{Code: CodeSQLCConfigWalk}
	ErrSQLCConfigCollect      = &SQLCConfigError{Code: CodeSQLCConfigCollect}
	ErrSQLCConfigFind         = &SQLCConfigError{Code: CodeSQLCConfigFind}
)

// ProjectRootError is returned when the project root cannot be found.
type ProjectRootError struct {
	Code      ErrorCode
	StartPath StartPath
	Markers   []string
	Cause     error
}

func (e *ProjectRootError) Error() string {
	if e.Cause != nil {
		return fmt.Sprintf(
			"[gogenfilter:%s] project root not found from %q: %v",
			e.Code,
			e.StartPath,
			e.Cause,
		)
	}

	return fmt.Sprintf("[gogenfilter:%s] project root not found from %q (searched for: %s)",
		e.Code, e.StartPath, strings.Join(e.Markers, ", "))
}

func (e *ProjectRootError) Unwrap() error { return e.Cause }

// CodeEqual compares two error codes for equality.
func CodeEqual[T interface{ ErrorCode() ErrorCode }](e, target T) bool {
	return e.ErrorCode() == target.ErrorCode()
}

// Is supports errors.Is by comparing error codes with sentinel errors.
func (e *ProjectRootError) Is(target error) bool {
	t, ok := target.(*ProjectRootError)
	if !ok {
		return false
	}

	return CodeEqual(e, t)
}

// ErrorCode returns the error code for programmatic matching.
func (e *ProjectRootError) ErrorCode() ErrorCode { return e.Code }

// Help returns user-friendly guidance for resolving the error.
func (e *ProjectRootError) Help() string { return CodeHelp(e.Code) }

// SQLCConfigError is returned when a sqlc configuration file cannot be processed.
type SQLCConfigError struct {
	Code       ErrorCode
	ConfigPath ConfigPath
	Operation  Operation
	Message    ErrorMessage
	Cause      error
}

func (e *SQLCConfigError) Error() string {
	if e.ConfigPath != "" {
		if e.Cause != nil {
			return fmt.Sprintf(
				"[gogenfilter:%s] sqlc config %s %q: %s: %v",
				e.Code,
				e.Operation,
				e.ConfigPath,
				e.Message,
				e.Cause,
			)
		}

		return fmt.Sprintf(
			"[gogenfilter:%s] sqlc config %s %q: %s",
			e.Code,
			e.Operation,
			e.ConfigPath,
			e.Message,
		)
	}

	if e.Cause != nil {
		return fmt.Sprintf(
			"[gogenfilter:%s] sqlc config %s: %s: %v",
			e.Code,
			e.Operation,
			e.Message,
			e.Cause,
		)
	}

	return fmt.Sprintf("[gogenfilter:%s] sqlc config %s: %s", e.Code, e.Operation, e.Message)
}

func (e *SQLCConfigError) Unwrap() error { return e.Cause }

// Is supports errors.Is by comparing error codes with sentinel errors.
func (e *SQLCConfigError) Is(target error) bool {
	t, ok := target.(*SQLCConfigError)
	if !ok {
		return false
	}

	return CodeEqual(e, t)
}

// ErrorCode returns the error code for programmatic matching.
func (e *SQLCConfigError) ErrorCode() ErrorCode { return e.Code }

// Help returns user-friendly guidance for resolving the error.
func (e *SQLCConfigError) Help() string { return CodeHelp(e.Code) }
