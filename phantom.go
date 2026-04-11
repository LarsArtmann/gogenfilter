package gogenfilter

// Phantom types for type safety
// These types wrap primitive types to provide compile-time guarantees
// about the semantic meaning of values.

// Path-related types

// StartPath represents a directory path used as a starting point for traversal.
// It ensures path values are not confused with other string types.
type StartPath string

// ConfigPath represents a path to a configuration file.
// It distinguishes config file paths from other path types.
type ConfigPath string

// Content-related types

// Label represents a filter pattern label used to identify pattern categories.
// It ensures label values are distinguishable from other string types.
type Label string

// Operation represents an operation name (e.g., "read", "parse", "walk").
// It provides type safety for operation identifiers.
type Operation string

// ErrorMessage represents error message content.
// It distinguishes error messages from other string values.
type ErrorMessage string

// Count-related types

// TotalFilesChecked represents a count of files that have been checked.
// It provides type safety for metrics counting.
type TotalFilesChecked int
