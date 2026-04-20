# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Added

- `DetectReasonReader(filePath string, r io.Reader, opts ...FilterOption) (FilterReason, error)` — detection from an `io.Reader`, useful when the caller already has file content in a stream
- Integration test fixtures (`testdata/`) from 11 real code generators plus 2 handwritten negatives, loaded via `//go:embed`
- `errorCodeDefs` single-source-of-truth table — `AllErrorCodes()` and `CodeHelp()` now derive from one table
- Error code derivation tests — verify `errorCodeDefs` covers every const, has no duplicates, and matches `AllErrorCodes()` exactly
- `map[FilterOption]struct{}` replaces `map[FilterOption]bool` — values were never `false`
- `fmt.Stringer` implementation on all 5 phantom types (`StartPath`, `ConfigPath`, `Operation`, `ErrorMessage`, `TotalFilesChecked`)
- Runnable examples for `ShouldFilter`, `WithFS`, `WithIncludePatterns`, `GetStats`/`FilteredBy`/`TotalFiltered`, `MustShouldFilter`, and `DetectReasonReader`
- Phantom type `String()` method tests — 5 types × 3 cases each

### Changed

- **`IsValid()` methods derived from tables** — `FilterOption.IsValid()` and `FilterReason.IsValid()` now iterate `AllFilterOptions()`/`AllFilterReasons()` instead of manual switches, eliminating split-brain bugs when adding new detectors
- **SQLC patterns consolidated** — `sqlcFilePatterns`/`sqlcCodePatterns` inlined into their consuming functions (`matchesSQLCFilenamePattern`, `HasSQLCContent`, `HasSQLCCodePatterns`)
- **SQLC filename patterns cached** — `sqlcFilenamePatterns` moved to package-level var to avoid re-allocation on every call
- **`WithFilterOptions` reuses `optionsMap`** — `FilterAll` expansion no longer duplicated between `filter.go` and `detection.go`
- **Benchmarks use `fstest.MapFS`** — eliminates filesystem I/O noise for reliable perf numbers
- **`slog` dependency removed** — library no longer produces log output; `warnMultipleSQLCConfigs` removed entirely
- **`FilterOption.Reason()` invariant documented** — godoc now explains the shared string-value coupling and maintenance obligation when adding new detectors
- **Include patterns semantics documented** — godoc and README clarify the "restrict scope" whitelist behavior
- **`needsContentCheck` guard documented** — comment explains I/O optimization and correctness purpose
- **Phantom types used directly** — eliminated 8+ explicit `string()` casts across `errors.go` and `project.go` via `fmt.Stringer`
- **`sqlcConfigError` bridge removed** — all internal callers now use `newSQLCConfigError` with typed phantom values
- **`Validatable` interface unexported** — renamed to `validatable`; only used as internal generic constraint

### Fixed

- **Data race in `Metrics.filteredFiles`** — field unexported; was accessible without mutex protection
- **Leaky `fs.FS` abstraction** — `detectReasonFS` no longer falls back to `os.ReadFile` when the provided filesystem doesn't contain the file
- **README metrics example** — `TotalFilesChecked == 3` (was incorrectly `1`)

### Removed

- `os.ReadFile` fallback in `detectReasonFS` — custom `fs.FS` implementations now behave correctly
- `warnMultipleSQLCConfigs` function and all `slog` usage
- `sqlcConfigError()` bridge function — replaced by direct phantom-typed calls to `newSQLCConfigError`

---

## [Pre-release] — Session 1-4

### Added

- **Error system** — centralized, branded, user-friendly error architecture:
  - `ErrorCode` string type with `String()` via direct `string(c)` conversion
  - 7 error code constants: `CodeProjectRootNotFound`, `CodeProjectRootInvalidPath`, `CodeSQLCConfigRead`, `CodeSQLCConfigParse`, `CodeSQLCConfigWalk`, `CodeSQLCConfigCollect`, `CodeSQLCConfigFind`
  - `AllErrorCodes()` function returning all defined error codes
  - `CodeHelp(code)` function returning user-friendly guidance for each error code
  - Branded `[gogenfilter:<code>]` prefix in every `Error()` message for library identification
  - 7 sentinel errors for use with `errors.Is`: `ErrProjectRootNotFound`, `ErrProjectRootInvalidPath`, `ErrSQLCConfigRead`, `ErrSQLCConfigParse`, `ErrSQLCConfigWalk`, `ErrSQLCConfigCollect`, `ErrSQLCConfigFind`
  - `ErrorCoder` interface for programmatic error code access
  - `Helper` interface for user-friendly guidance
  - `Causable` interface for errors that wrap an underlying cause *(later removed as unused)*
  - `CodeEqual[T]` generic function consolidating `Is()` comparison logic
  - `ProjectRootError` struct with `Code`, `StartPath`, `Markers`, `Cause` fields
  - `SQLCConfigError` struct with `Code`, `ConfigPath`, `Operation`, `Message`, `Cause` fields
  - Both error types implement `Error()`, `Unwrap()`, `Is()`, `ErrorCode()`, `Help()`
- **Phantom types** — type-safe wrappers at API boundaries:
  - `StartPath` for project root search starting point
  - `ConfigPath` for sqlc config file paths
  - `Operation` for error operation descriptions
  - `ErrorMessage` for error message text
  - `TotalFilesChecked` for metrics counter
- Each phantom and string-based type implements `String()` directly via `string()` conversion
- `validatable` interface for internal types with `IsValid()` (unexported)
- `newSQLCConfigError(code, ConfigPath, Operation, ErrorMessage, error)` constructor with phantom types — all internal callers now use phantom types directly
- `sqlcFindError` and `sqlcWalkError` helper constructors
- `unmarshalSQLCConfig` extracted from `parseSQLCConfig`/`parseSQLCConfigFS` for shared YAML parsing
- `walkDirForSQLCConfigs` extracted walk callback shared between OS and FS variants
- `isGeneratedBy` and `matchAnyContentPattern` extracted from detection logic
- Comprehensive `errors_test.go` with generic test helpers (`assertErrorsAs[T]`, `assertBrandedErrorMessage`, `testErrorCodeReturnsCode`, `assertErrorsIs`, `testCrossTypeMismatch`)
- `sqlc_test.go` error code verification tests
- `TestFindProjectRootErrorCode` in `project_test.go`
- `FilterOption.Reason()` — derives the corresponding `FilterReason` from any `FilterOption` via type conversion
- `FilterOption.IsValid()` — reports whether a `FilterOption` is a recognized value
- `Filter.IsEnabled()` — reports whether the filter is enabled without accessing internal fields
- `FilterStats.FilteredBy(reason)` — accessor for per-reason counts without exposing the internal map
- `DetectReason(path, content, options)` — public zero-I/O API that accepts content as a parameter
- Comprehensive test coverage for `ShouldFilterWithIncludes`, `IsTemplGenerated` Render path, `HasSQLCContent` versions block, `GetStats` nil metrics branch, `?` wildcard in `MatchPattern`, and `FilterOption.Reason()`
- `fmt.Stringer` compile-time compliance test for `ErrorCode`
- Unwrap chain integration tests verifying `errors.Is` traverses nested error layers for both `ProjectRootError` and `SQLCConfigError`
- Benchmarks for error construction, `Error()` formatting, and `errors.Is` matching

### Changed

- **Breaking**: `DetectGenerated` replaced by `DetectReason` (public, zero-I/O) and `detectReason` (internal, disk I/O)
- **Breaking**: `Metrics.Record()` unexported to `record()` — not part of public API
- **Breaking**: `GetMetrics()` removed from `Filter` — use `GetStats()` instead
- **Breaking**: `FilteredByReason` map unexported to `filteredByReason` — use `FilteredBy(reason)` accessor
- **Breaking**: `ParseSQLCConfig` unexported to `parseSQLCConfig` along with `SQLCConfig`/`SQLCVersion` types
- `detector` struct unified from separate `contentCheck`/`filenameCheck` types into single type with optional fields
- Table lookup functions converted to package-level `var` for zero-allocation lookup
- `matchesAnySuffix`/`matchesAnyContains` consolidated into `anyMatch`
- `filepath.Walk` replaced with `filepath.WalkDir` for better performance
- `fileExists` simplified from 7 lines to `return err == nil`
- `go.mod` toolchain downgraded from `1.26.1` to `1.26.0` for local compatibility

### Fixed

- `matchesMockgenFilename` false positive: `"mock_"` now uses prefix check instead of `Contains`, preventing matches like `remove_mock_data.go`

### Removed

- `Reasons()` method from `FilterStats` — unused and untested
