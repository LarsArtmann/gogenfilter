# ADR-002: Adopt go-error-family for error handling

Date: 2026-07-25

## Context

gogenfilter currently uses a bespoke error system (`errors.go`, ~200 lines) that
hand-rolls typed errors, error codes, branded prefixes, sentinel matching, and
the `Error()/Unwrap()/Is()` boilerplate per type. Three near-identical error
structs (`ProjectRootError`, `FilterConfigError`, `SQLCConfigError`) each repeat
the same 4-method shape.

This is a textbook reinvention of what `github.com/larsartmann/go-error-family`
provides: branded error codes, behavioral families (Rejection, Transient, etc.),
sentinel matching via `errors.Is`, and consistent `Error()/Unwrap()` semantics.

## Decision

**Migrate to go-error-family.** The bespoke system is competent but duplicates
an existing, published, well-tested library. The three typed error structs can
be replaced with `errorfamily.NewRejection` / `NewTransient` constructors using
meaningful codes, eliminating ~150 lines of boilerplate.

## Migration plan

1. Add `github.com/larsartmann/go-error-family` to `go.mod`
2. Map each bespoke error to a family:
   - `ProjectRootError` → Rejection (bad input: path not found)
   - `FilterConfigError` → Rejection (bad input: config invalid)
   - `SQLCConfigError` → Rejection (bad input: SQLC config parse failure)
3. Replace sentinel definitions with `errorfamily.NewRejection(code, msg)`
4. Update all `errors.Is` callers (codes match via errorfamily's code+family matching)
5. Delete `errors.go` bespoke implementation
6. Update tests

## Why not keep bespoke?

The code quality is good, but "good bespoke that duplicates a published library"
is exactly the extraction-without-adoption anti-pattern this ecosystem is
eliminating. Keeping it signals that reinvention is acceptable.

## Status

Accepted. Migration deferred to a focused session (P3 priority).
