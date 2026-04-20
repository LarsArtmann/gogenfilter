package gogenfilter

import (
	"errors"
	"fmt"
	"os"
	"testing"
)

func TestProjectRootErrorErrorsAs(t *testing.T) {
	t.Parallel()

	t.Run("extracts domain fields", func(t *testing.T) {
		t.Parallel()

		realErr := testProjectRootErrorWithCause(
			t,
			CodeProjectRootInvalidPath,
			"/deep/path",
			os.ErrPermission,
		)

		projErr := assertErrorsAs[*ProjectRootError](t, realErr)

		assertEqual(t, "StartPath", projErr.StartPath, "/deep/path")
		assertEqual(t, "Code", projErr.Code, CodeProjectRootInvalidPath)
	})

	t.Run("extracts ErrorCoder interface", func(t *testing.T) {
		t.Parallel()

		realErr := testProjectRootErrorNotFound(t)

		coder := assertErrorsAs[ErrorCoder](t, realErr)

		assertEqual(t, "ErrorCode", coder.ErrorCode(), CodeProjectRootNotFound)
	})

	t.Run("extracts Helper interface", func(t *testing.T) {
		t.Parallel()

		realErr := testProjectRootErrorNotFound(t)

		helper := assertErrorsAs[Helper](t, realErr)

		if helper.Help() == "" {
			t.Error("Help() returned empty string")
		}
	})
}

func TestProjectRootErrorSentinelMatching(t *testing.T) {
	t.Parallel()

	t.Run("matches sentinel by code", func(t *testing.T) {
		t.Parallel()

		realErr := testProjectRootErrorNotFound(t)

		assertErrorsIs(t, realErr, ErrProjectRootNotFound)

		if errors.Is(realErr, ErrProjectRootInvalidPath) {
			t.Error("errors.Is should not match different code")
		}
	})

	t.Run("does not match across types", func(t *testing.T) {
		t.Parallel()

		testCrossTypeMismatch(
			t, "ProjectRoot", CodeProjectRootNotFound,
			"ErrSQLCConfigRead", ErrSQLCConfigRead,
		)
	})
}

func TestProjectRootErrorAccessors(t *testing.T) {
	t.Parallel()

	t.Run("ErrorCode returns code", func(t *testing.T) {
		t.Parallel()

		err := &ProjectRootError{ //nolint:exhaustruct // testing specific field for accessor, others irrelevant
			Code: CodeProjectRootNotFound,
		}
		testErrorCodeReturnsCode(t, err, CodeProjectRootNotFound)
	})

	t.Run("Help returns guidance", func(t *testing.T) {
		t.Parallel()

		err := &ProjectRootError{ //nolint:exhaustruct // testing specific field, others irrelevant
			Code: CodeProjectRootNotFound,
		}
		help := err.Help()

		if help == "" {
			t.Error("Help() returned empty string")
		}

		if help != CodeHelp(CodeProjectRootNotFound) {
			t.Errorf("Help() = %q, want %q", help, CodeHelp(CodeProjectRootNotFound))
		}
	})
}

func TestSQLCConfigErrorErrorsAs(t *testing.T) {
	t.Parallel()

	t.Run("extracts domain fields", func(t *testing.T) {
		t.Parallel()

		realErr := newSQLCConfigError(
			CodeSQLCConfigRead,
			"/config/sqlc.yaml",
			"read",
			"reading sqlc config",
			os.ErrPermission,
		)

		sqlcErr := assertErrorsAs[*SQLCConfigError](t, realErr)

		assertEqual(t, "ConfigPath", sqlcErr.ConfigPath, "/config/sqlc.yaml")
		assertEqual(t, "Operation", sqlcErr.Operation, "read")
		assertEqual(t, "Message", sqlcErr.Message, "reading sqlc config")
		assertEqual(t, "Code", sqlcErr.Code, CodeSQLCConfigRead)
	})

	t.Run("extracts ErrorCoder interface", func(t *testing.T) {
		t.Parallel()

		realErr := newSQLCConfigError(
			CodeSQLCConfigParse,
			"",
			"parse",
			"parsing sqlc config",
			os.ErrInvalid,
		)

		coder := assertErrorsAs[ErrorCoder](t, realErr)

		assertEqual(t, "ErrorCode", coder.ErrorCode(), CodeSQLCConfigParse)
	})
}

func TestSQLCConfigErrorSentinelMatching(t *testing.T) {
	t.Parallel()

	t.Run("matches sentinel by code", func(t *testing.T) {
		t.Parallel()

		realErr := newSQLCConfigError(
			CodeSQLCConfigWalk,
			"",
			"walk",
			"walking directory",
			os.ErrNotExist,
		)

		assertErrorsIs(t, realErr, ErrSQLCConfigWalk)

		if errors.Is(realErr, ErrSQLCConfigRead) {
			t.Error("errors.Is should not match different code")
		}
	})

	t.Run("does not match across types", func(t *testing.T) {
		t.Parallel()

		testCrossTypeMismatch(
			t, "SQLCConfig", CodeSQLCConfigRead,
			"ErrProjectRootNotFound", ErrProjectRootNotFound,
		)
	})
}

func TestSQLCConfigErrorAccessors(t *testing.T) {
	t.Parallel()

	t.Run("ErrorCode returns code", func(t *testing.T) {
		t.Parallel()

		err := &SQLCConfigError{ //nolint:exhaustruct // testing specific field for accessor, others irrelevant
			Code: CodeSQLCConfigParse,
		}
		testErrorCodeReturnsCode(t, err, CodeSQLCConfigParse)
	})

	t.Run("Help returns guidance", func(t *testing.T) {
		t.Parallel()

		err := &SQLCConfigError{ //nolint:exhaustruct // testing specific field, others irrelevant
			Code: CodeSQLCConfigParse,
		}
		help := err.Help()

		if help == "" {
			t.Error("Help() returned empty string")
		}
	})
}

func TestSentinelErrors(t *testing.T) {
	t.Parallel()

	t.Run("all sentinels match themselves", func(t *testing.T) {
		t.Parallel()

		sentinels := []struct {
			name     string
			sentinel error
		}{
			{"ErrProjectRootNotFound", ErrProjectRootNotFound},
			{"ErrProjectRootInvalidPath", ErrProjectRootInvalidPath},
			{"ErrSQLCConfigRead", ErrSQLCConfigRead},
			{"ErrSQLCConfigParse", ErrSQLCConfigParse},
			{"ErrSQLCConfigWalk", ErrSQLCConfigWalk},
			{"ErrSQLCConfigCollect", ErrSQLCConfigCollect},
			{"ErrSQLCConfigFind", ErrSQLCConfigFind},
		}

		for _, s := range sentinels {
			t.Run(s.name, func(t *testing.T) {
				t.Parallel()

				if s.sentinel.Error() == "" {
					t.Errorf("%s Error() returned empty string", s.name)
				}
			})
		}
	})

	t.Run("sentinels have branded messages", func(t *testing.T) {
		t.Parallel()

		sentinels := []error{
			ErrProjectRootNotFound,
			ErrProjectRootInvalidPath,
			ErrSQLCConfigRead,
			ErrSQLCConfigParse,
			ErrSQLCConfigWalk,
			ErrSQLCConfigCollect,
			ErrSQLCConfigFind,
		}

		for _, sentinel := range sentinels {
			assertErrorHasBrandedPrefix(t, sentinel)
		}
	})
}

func TestErrorCodeImplementsFmtStringer(t *testing.T) {
	t.Parallel()

	var _ fmt.Stringer = ErrorCode("")

	assertEqual(t, "String()", CodeProjectRootNotFound.String(), "project_root_not_found")
}
