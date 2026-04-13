# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Added

- **Error system** — centralized, branded, user-friendly error architecture:
  - `ErrorCode` string type with `String()` via generic `stringFrom[T ~string]` helper
  - 7 error code constants: `CodeProjectRootNotFound`, `CodeProjectRootInvalidPath`, `CodeSQLCConfigRead`, `CodeSQLCConfigParse`, `CodeSQLCConfigWalk`, `CodeSQLCConfigCollect`, `CodeSQLCConfigFind`
  - `AllErrorCodes()` function returning all defined error codes
  - `CodeHelp(code)` function returning user-friendly guidance for each error code
  - Branded `[gogenfilter:<code>]` prefix in every `Error()` message for library identification
  - 7 sentinel errors for use with `errors.Is`: `ErrProjectRootNotFound`, `ErrProjectRootInvalidPath`, `ErrSQLCConfigRead`, `ErrSQLCConfigParse`, `ErrSQLCConfigWalk`, `ErrSQLCConfigCollect`, `ErrSQLCConfigFind`
  - `ErrorCoder` interface for programmatic error code access
  - `Helper` interface for user-friendly guidance
  - `Causable` interface for errors that wrap an underlying cause
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
- `stringFrom[T ~string]` — generic helper consolidating `String()` methods for all string-based types
- `Validatable` interface for types with `IsValid()`
- `newSQLCConfigError(code, ConfigPath, Operation, ErrorMessage, error)` constructor with phantom types
- `sqlcConfigError(...)` bridge function converting raw strings to phantom types for internal callers
- `sqlcFindError` and `sqlcWalkError` helper constructors
- `unmarshalSQLCConfig` extracted from `parseSQLCConfig`/`parseSQLCConfigFS` for shared YAML parsing
- `walkDirForSQLCConfigs` extracted walk callback shared between OS and FS variants
- `warnMultipleSQLCConfigs` extracted from `GetSQLOutputDirs` and `GetSQLOutputDirsFS`
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
- `matchesAnySuffix`/`matchesAnyContains` consolidated into generic `matchAnyWith`
- `filepath.Walk` replaced with `filepath.WalkDir` for better performance
- `fileExists` simplified from 7 lines to `return err == nil`
- `go.mod` toolchain downgraded from `1.26.1` to `1.26.0` for local compatibility

### Fixed

- `matchesMockgenFilename` false positive: `"mock_"` now uses prefix check instead of `Contains`, preventing matches like `remove_mock_data.go`

### Removed

- Redundant `reason` field from `detector` struct — now derived via `FilterOption.Reason()`
- `Reasons()` method from `FilterStats` — unused and untested
