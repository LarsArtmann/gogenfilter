package gogenfilter

// Phantom types for type safety
// These types wrap primitive types to provide compile-time guarantees
// about the semantic meaning of values.

// Path-related types

// StartPath represents a directory path used as a starting point for traversal.
// It ensures path values are not confused with other string types.
type StartPath string

func (p StartPath) String() string { return string(p) }

// ConfigPath represents a path to a configuration file.
// It distinguishes config file paths from other path types.
type ConfigPath string

func (p ConfigPath) String() string { return string(p) }

// Content-related types

// Operation represents an operation name (e.g., "read", "parse", "walk").
// It provides type safety for operation identifiers.
type Operation string

func (o Operation) String() string { return string(o) }

// ErrorMessage represents error message content.
// It distinguishes error messages from other string values.
type ErrorMessage string

func (m ErrorMessage) String() string { return string(m) }
