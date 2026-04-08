# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Added

- `FilterOption.Reason()` — derives the corresponding `FilterReason` from any `FilterOption` via type conversion
- `FilterOption.IsValid()` — reports whether a `FilterOption` is a recognized value
- `Filter.IsEnabled()` — reports whether the filter is enabled without accessing internal fields
- `FilterStats.FilteredBy(reason)` — accessor for per-reason counts without exposing the internal map
- `DetectReason(path, content, options)` — public zero-I/O API that accepts content as a parameter
- Comprehensive test coverage for `ShouldFilterWithIncludes`, `IsTemplGenerated` Render path, `HasSQLCContent` versions block, `GetStats` nil metrics branch, `?` wildcard in `MatchPattern`, and `FilterOption.Reason()`

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
