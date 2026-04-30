package gogenfilter

import (
	"errors"
	"os"
	"testing"
)

func BenchmarkNewProjectRootError(b *testing.B) {
	for b.Loop() {
		result := newBenchmarkProjectRootError()
		_ = result
	}
}

func BenchmarkNewSQLCConfigError(b *testing.B) {
	for b.Loop() {
		_ = newSQLCConfigErrorParse(ConfigPath("/path/to/sqlc.yaml"), "invalid YAML syntax")
	}
}

func BenchmarkProjectRootErrorError(b *testing.B) {
	err := newBenchmarkProjectRootError()

	for b.Loop() {
		_ = err.Error()
	}
}

func newBenchmarkProjectRootError() *ProjectRootError {
	return &ProjectRootError{
		Code:      CodeProjectRootNotFound,
		StartPath: "/some/path/to/project",
		Markers:   []string{"go.mod"},
		Cause:     os.ErrNotExist,
	}
}

func BenchmarkSQLCConfigErrorError(b *testing.B) {
	err := newSQLCConfigErrorParse(ConfigPath("/path/to/sqlc.yaml"), "invalid YAML syntax")

	for b.Loop() {
		_ = err.Error()
	}
}

func BenchmarkProjectRootErrorIs(b *testing.B) {
	err := &ProjectRootError{ //nolint:exhaustruct // benchmark only needs Code for Is() comparison
		Code:      CodeProjectRootNotFound,
		StartPath: "/some/path",
		Markers:   []string{"go.mod"},
	}

	for b.Loop() {
		_ = errors.Is(err, ErrProjectRootNotFound)
	}
}

func BenchmarkSQLCConfigErrorIs(b *testing.B) {
	err := newSQLCConfigErrorParse(ConfigPath("/path/to/sqlc.yaml"), "invalid YAML")

	for b.Loop() {
		_ = errors.Is(err, ErrSQLCConfigParse)
	}
}
