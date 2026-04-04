// Package errors provides structured error types for the gogenfilter library.
package errors

import "fmt"

// BaseError is a fundamental error type with message, code, and optional cause.
type BaseError struct {
	Message string
	Code    string
	Cause   error
}

func (e *BaseError) Error() string {
	if e.Cause != nil {
		return fmt.Sprintf("%s: %v", e.Message, e.Cause)
	}

	return e.Message
}

func (e *BaseError) Unwrap() error {
	return e.Cause
}

// New creates a new BaseError with the given message and code.
func New(message, code string) *BaseError {
	return &BaseError{
		Message: message,
		Code:    code,
	}
}

// Wrap creates a new BaseError wrapping an existing error with a message and code.
func Wrap(cause error, message, code string) *BaseError {
	return &BaseError{
		Message: message,
		Code:    code,
		Cause:   cause,
	}
}

// ProjectRootError is returned when the project root cannot be found.
type ProjectRootError struct {
	StartPath string
	Markers   []string
	Cause     error
}

func (e *ProjectRootError) Error() string {
	if e.Cause != nil {
		return fmt.Sprintf("project root not found from %q: %v", e.StartPath, e.Cause)
	}

	return fmt.Sprintf("project root not found from %q (searched for %v)", e.StartPath, e.Markers)
}

func (e *ProjectRootError) Unwrap() error {
	return e.Cause
}

// SQLCConfigError is returned when a sqlc configuration file cannot be processed.
type SQLCConfigError struct {
	ConfigPath string
	Operation  string
	Cause      error
}

func (e *SQLCConfigError) Error() string {
	if e.ConfigPath != "" {
		return fmt.Sprintf("sqlc config %s %q: %v", e.Operation, e.ConfigPath, e.Cause)
	}

	return fmt.Sprintf("sqlc config %s: %v", e.Operation, e.Cause)
}

func (e *SQLCConfigError) Unwrap() error {
	return e.Cause
}
