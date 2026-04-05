// Package errors provides custom error types and error handling utilities.
//
// This package defines application-specific error types that can be used
// throughout the codebase for consistent error handling and reporting.
package errors

// BaseError is the foundation for all custom errors in this project.
type BaseError struct {
	Message string
	Code    string
}

// Error implements the error interface.
func (e *BaseError) Error() string {
	return e.Message
}

// New creates a new BaseError with the given message and code.
func New(message, code string) *BaseError {
	return &BaseError{
		Message: message,
		Code:    code,
	}
}
