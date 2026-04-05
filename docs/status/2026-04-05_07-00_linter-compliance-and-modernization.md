# Linter Compliance & Code Quality Overhaul

**Date**: 2026-04-05 07:00 → 07:12  
**Commits**: 4 (6c26a98, f0c660b, b4140e7, 4a9baab)  
**Files changed**: 12 (+911 / -200 lines)  
**Coverage**: 91.4%

---

## Executive Summary

Resolved all actionable `hierarchical-errors` violations (11 → 2 false positives), all `golangci-lint` issues (7 → 0), and modernized the codebase to use idiomatic Go 1.22+ patterns (`slices` package, `range` over int). The two remaining `hierarchical-errors` violations are false positives on `Unwrap() error` — this is a Go language contract (`errors.Unwrap()` type-asserts to `interface { Unwrap() error }`) and cannot be changed.

---

## What Was Done

### 1. hierarchical-errors: 11 → 2 (false positives)

| Category | Before | After | Notes |
|----------|--------|-------|-------|
| HIGH (generic return) | 9 | 2 | Unwrap() false positives |
| MEDIUM (ignored error) | 2 | 0 | Fixed |

**Fixes applied:**
- Changed `FindProjectRoot` return type from `error` to `*ProjectRootError` (`project.go:20`)
- Changed 6 functions in `sqlc.go` to return `*SQLCConfigError` instead of `error`
- Extracted `fileExists()` helper to eliminate ignored `os.Stat` errors (`project.go:9-16`)
- Replaced `handleDirectoryWalk` (returns `error`) with `shouldSkipDirectory` (returns `bool`)

**Remaining (WONTFIX):**
- `errors.go:20` — `ProjectRootError.Unwrap() error` — Go language contract
- `errors.go:39` — `SQLCConfigError.Unwrap() error` — Go language contract

### 2. golangci-lint: 7 → 0

| Issue | Fix |
|-------|-----|
| err113 (3x in tests) | Wrapped test errors with `errors.ErrUnsupported`, `os.ErrPermission`, `os.ErrNotExist` |
| funlen (2x) | Fixed by test restructuring in earlier commits |
| gci (1x) | Fixed import alignment in `sqlc.go` |
| modernize (1x) | `slices.Contains` in `matchesSQLCFilenamePattern` |

### 3. Modernization: Manual Loops → `slices` Package

Replaced all manual `for` loop containment checks with idiomatic `slices.Contains` / `slices.ContainsFunc`:

| Function | File | Change |
|----------|------|--------|
| `matchesSQLCFilenamePattern` | `detection.go:82` | `for` → `slices.Contains` |
| `matchesAnySuffix` | `detection.go:98` | `for` → `slices.ContainsFunc` |
| `matchesAnyContains` | `detection.go:113` | `for` → `slices.ContainsFunc` |
| `HasSQLCCodePatterns` | `detection.go:147` | `for` → `slices.ContainsFunc` |
| `matchesAnyPattern` | `filter.go:103` | `for` → `slices.ContainsFunc` |
| `matchSegments` | `pattern.go:62` | `for i := 0` → `for i := range` |

### 4. Pre-existing Changes (from prior session)

- **`detection.go`**: Inlined `hasGeneratedMarker` and `isGeneratedBy`, simplified detector functions
- **`pattern.go`**: Complete rewrite with proper `**` (globstar) support via recursive `matchSegments`
- **`metrics.go`**: `TotalFiltered` now iterates all reasons correctly
- **`types.go`**: Removed unused `stringer` interface and compile-time assertions
- **`pkg/errors/`**: Deleted — superseded by root-level `errors.go`
- **`sqlc_test.go`**: Renamed `TestHandleDirectoryWalk` → `TestShouldSkipDirectory`

---

## Architecture Decisions

### Error Types: Concrete Returns Over `error` Interface

Public functions now return `*ProjectRootError` and `*SQLCConfigError` instead of the generic `error` interface. Benefits:
- Callers can type-assert and access structured fields (`ConfigPath`, `Operation`, `Markers`)
- Satisfies `hierarchical-errors` linter requirements
- `errors.Is`/`errors.As` still work via the `Unwrap()` chain

### `filepath.SkipDir` Direct Comparison

`filepath.Walk` uses `err == filepath.SkipDir` (pointer equality), not `errors.Is()`. This means:
- Cannot wrap `SkipDir` in a custom error type
- Solution: `shouldSkipDirectory` returns `bool`, caller returns `filepath.SkipDir` directly

### Pattern Matching: Custom vs Library

Evaluated `bmatcuk/doublestar` and decided against it:
- Our `pattern.go` is 79 lines, handles exactly what we need (`*` and `**`)
- No external dependency
- Well-tested with property tests and table-driven cases
- The library adds complexity around platform separators we don't need

---

## Current Linter Status

| Tool | Issues | Status |
|------|--------|--------|
| `golangci-lint run` | 0 | ✅ Clean |
| `hierarchical-errors ./...` | 2 (false positives) | ✅ Best possible |
| `go test ./...` | All pass (91.4% coverage) | ✅ |
| `go vet ./...` | 0 | ✅ |

---

## branching-flow Results (from previous run)

4 issues found across 8 sub-linters:

| Linter | Severity | Issue | Actionable? |
|--------|----------|-------|-------------|
| CONTEXT | 2 MEDIUM | `sqlc.go:61,73` lose context var `path` | Low — wrapping already preserves `path` in message |
| PHANTOM | 16 | Primitive `string` params/fields | Low — would require phantom types package |
| PANIC | low | Map access in `metrics.go`, `sqlc.go` | No — maps initialized in constructors |
| MIXINS | 1 | `contentCheck`/`filenameCheck` share fields | Low — different function signatures make merge awkward |

---

## Reflections & Improvement Opportunities

### What Could Have Been Better
1. **Empty `pkg/` directory** — Left behind after deleting `pkg/errors/errors.go`. Cleaned up this session.
2. **Incomplete modernization** — Only fixed `matchesSQLCFilenamePattern` initially. Should have done all manual loops at once.
3. **Wrong nolint directive** — `//nolint:goerr113` should be `//nolint:err113`. Fixed by wrapping with stdlib sentinel errors instead.

### Architecture Improvements to Consider
1. **Phantom types for `string`** — `ConfigPath`, `StartPath`, `Operation` are all bare `string`. Consider newtypes if this library grows.
2. **`contentCheck`/`filenameCheck` unification** — Both share `option`/`reason` fields. Could extract a common `checkBase` but different function signatures make this low-value.
3. **Error codes** — Add string error codes to `ProjectRootError`/`SQLCConfigError` for programmatic matching by callers.
4. **`shouldSkipDirectory` completeness** — Currently skips `.`, `node_modules`, `vendor`. Could add `.git`, `__pycache__`, `.venv`, `dist`, `build`.

### Type Model Improvements
- `FilterOption` and `FilterReason` are parallel string constants (`"sqlc"` / `"sqlc"`). Could derive `FilterReason` from `FilterOption` via a method or map to reduce drift risk.
- `contentChecks()` and `filenameChecks()` return fresh slices on every call. Could be package-level vars if performance matters (currently doesn't).

---

## Next Steps (Priority Order)

| # | Task | Priority | Effort |
|---|------|----------|--------|
| 1 | Update README.md with new error return types | High | Low |
| 2 | Update CHANGELOG.md with refactoring summary | Medium | Low |
| 3 | Add `**` glob edge case tests (empty segments, `**/**`) | Medium | Low |
| 4 | Add fuzz test for `MatchPattern` | Medium | Medium |
| 5 | Expand `shouldSkipDirectory` (.git, __pycache__, .venv) | Medium | Low |
| 6 | Derive `FilterReason` from `FilterOption` to prevent drift | Low | Medium |
| 7 | Add Example tests for godoc | Low | Low |
| 8 | Evaluate test coverage: 91.4% → 95%+ | Medium | Medium |
| 9 | Add CI pipeline config | Medium | Medium |
| 10 | Consider phantom types for string params | Low | Medium |
