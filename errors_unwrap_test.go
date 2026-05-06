package gogenfilter

import (
	"errors"
	"fmt"
	"os"
	"testing"
)

func TestProjectRootErrorUnwrap(t *testing.T) {
	t.Parallel()

	t.Run("returns cause", func(t *testing.T) {
		t.Parallel()

		err := testProjectRootErrorWithErr(t, CodeProjectRootInvalidPath, "/path", os.ErrInvalid)

		assertErrorsIs(t, err, os.ErrInvalid)
	})

	t.Run("returns nil for nil cause", func(t *testing.T) {
		t.Parallel()

		err := testProjectRootErrorNotFound(t)

		if err.Unwrap() != nil {
			t.Error("Expected nil unwrap for nil cause")
		}
	})
}

func TestProjectRootErrorUnwrapChainIntegration(t *testing.T) {
	t.Parallel()

	t.Run("unwraps through nested fmt.Errorf to sentinel", func(t *testing.T) {
		t.Parallel()

		inner := &ProjectRootError{
			Code:      CodeProjectRootInvalidPath,
			StartPath: "/path",
			Markers:   []string{"go.mod"},
			Err:       os.ErrPermission,
		}

		wrapped := fmt.Errorf("layer2: %w", fmt.Errorf("layer1: %w", inner))

		extracted, ok := errors.AsType[*ProjectRootError](wrapped)
		if !ok {
			t.Fatal("errors.AsType should find ProjectRootError through nested wrapping")
		}

		assertEqual(t, "ErrorCode", extracted.ErrorCode(), CodeProjectRootInvalidPath)
		assertEqual(t, "StartPath", extracted.StartPath, StartPath("/path"))
	})

	t.Run("errors.Is reaches sentinel through multiple wraps", func(t *testing.T) {
		t.Parallel()

		inner := &ProjectRootError{
			Code:      CodeProjectRootNotFound,
			StartPath: "/path",
			Markers:   []string{"go.mod"},
			Err:       nil,
		}

		wrapped := fmt.Errorf("outer: %w", inner)

		assertErrorsIs(t, wrapped, ErrProjectRootNotFound)
	})
}

func TestSQLCConfigErrorUnwrap(t *testing.T) {
	t.Parallel()

	err := newSQLCConfigErrorRead(ConfigPath(""), "reading sqlc config")

	assertErrorsIs(t, err, os.ErrPermission)
}

func TestSQLCConfigErrorUnwrapChainIntegration(t *testing.T) {
	t.Parallel()

	t.Run("unwraps collect error to inner parse error", testSQLCUnwrapCollectToInner)
	t.Run("errors.Is matches collect sentinel", testSQLCUnwrapCollectSentinel)
	t.Run(
		"errors.Is reaches inner parse sentinel through Unwrap chain",
		testSQLCUnwrapInnerSentinel,
	)
}

func testSQLCUnwrapCollectToInner(t *testing.T) {
	t.Parallel()

	_, collectErr := sqlcConfigUnwrapTestSetup()

	inner, ok := errors.AsType[*SQLCConfigError](collectErr.Unwrap())
	if !ok {
		t.Fatal("Unwrap() should expose inner SQLCConfigError")
	}

	assertEqual(t, "inner ErrorCode", inner.ErrorCode(), CodeSQLCConfigParse)
	assertEqual(t, "inner ConfigPath", inner.ConfigPath, ConfigPath("sqlc.yaml"))
}

func testSQLCUnwrapCollectSentinel(t *testing.T) {
	t.Parallel()

	_, collectErr := sqlcConfigUnwrapTestSetup()

	assertErrorsIs(t, collectErr, ErrSQLCConfigCollect)
}

func testSQLCUnwrapInnerSentinel(t *testing.T) {
	t.Parallel()

	_, collectErr := sqlcConfigUnwrapTestSetup()

	assertErrorsIs(t, collectErr, ErrSQLCConfigCollect)
	assertErrorsIs(t, collectErr, ErrSQLCConfigParse)
}
