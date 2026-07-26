# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

_Nothing yet._

## [v3.3.2] — 2026-07-26

### Added

- **RELEASING.md** — Full release runbook: quality gates, CHANGELOG sync, version bump, tag, push, verify, rollback procedure.
- **Color system ADR** (`docs/adr/001-color-system.md`) — Decision record for the warm-stone + 3-color accent system (cyan/amber/emerald), WCAG AA contrast decisions, and a step-by-step guide for adding new accent colors.
- **Gendocs integration test** (`cmd/gendocs/integration_test.go`) — End-to-end test running `go generate ./...`, verifying all 5 output files contain expected content, and checking idempotency via `git diff --exit-code`.
- **Gendocs unit tests** — Idempotency proofs (`TestReplaceSectionIsIdempotent`, `TestReplaceSectionInlineIsIdempotent`) and phantom-column regression guard (`TestGeneratedTablesHaveNoPhantomColumns`).
- **Markdown link checker** (`scripts/check-markdown-links.py`) — Validates all internal (relative) markdown links repo-wide; wired into CI as a quality gate.
- **`markdownRow` helper in gendocs** — Joins table cells with proper pipe escaping, structurally preventing the `||` phantom-column bug at the helper level.
- **`formatMarkdownTable` helper in gendocs** — Dynamic column-width calculation for all 4 markdown table outputs, replacing 3 hardcoded width constants (`mdxNameWidth`, `mdxFilenameWidth`, `detectionFuncWidth`).
- **`stripEmptyScriptHash()` in CSP fix script** — Removes the SHA-256 hash of an empty string from `script-src` (generated internally by Astro, present on all built pages).
- **Gendocs workflow section in CONTRIBUTING.md** — Documents the `detectors` table as single source of truth, how to run gendocs, the 5 output files, and the `websiteMetadata` requirement.
- **Nix flake app descriptions** — `meta.description` on all 10 flake apps, eliminating `nix flake check` warnings.
- **DOMAIN_LANGUAGE.md expanded** — Added v3.2 entities (`ScanResult`, `GeneratedFile`, `Exclusion`, `ExclusionPattern`, `ScanProject`, `DetectReasonFile`, `FilterWithContent`) and v3.3 entities (`DetectorDoc`, `AllDetectorDocs`, `AllFilterOptions`, `AllFilterReasons`, `AllGeneratorOptions`).
- **Archived stale planning docs** — Moved `docs/planning/2026-05-*` to `docs/status/archive/`; removed empty `docs/planning/` directory.

### Fixed

- **Broken OG image generation** — `param: "slug"` option wrongly removed from `OGImageRoute()` during astro-og-canvas 0.13 migration; restored (was causing `PrerenderDynamicEndpointPathCollide` build error, blocking all website builds).
- **3 website color-token bugs** — (1) `--color-accent-dim` light mode was `rgba(8,145,178,0.1)` (old accent) instead of `rgba(14,116,144,0.1)` (current accent `#0e7490`); (2) `--color-border` light mode was cool zinc (`rgba(228,228,231,...)`) on a warm-stone palette, changed to `rgba(231,229,228,...)`; (3) `--color-code-comment` dead token (0 references outside CSS) deleted.
- **Newsletter CSP violation** — Inline `onsubmit` handler moved to Astro `<script>` block (bundled as external module, covered by `script-src 'self'`).
- **Starlight meta description** — Updated from stale "Detect and filter auto-generated Go code files" to current "Stop linting code no human wrote" positioning.
- **`nix flake check` — 3 latent bugs** — (1) stale `vendorHash` after `go.sum` change; (2) non-hermetic test (`os.ReadFile("README.md")` fails in Nix sandbox, fixed with `//go:embed`); (3) `README.md` missing from `lib.fileset.unions` source set.
- **Stale md-go-validator `vendorHash`** — Updated in `flake.nix` to match current `go.sum`.
- **Gendocs README table alignment** — Tables were unaligned (cells not padded to column width); `formatMarkdownTable` dynamically calculates column widths from the widest cell in each column.
- **Dependents page GitHub API 401** — Added 401 to rate-limit handling branch (was only catching 403); unauthenticated builds now degrade gracefully.
- **`errorCodeMatches` refactor** — Three `Is()` methods in `errors.go` now share an `errorCodeMatches(code, target)` helper that matches via the `ErrorCoder` interface, replacing three concrete type assertions.
- **Committed gendocs build binary untracked** — The 3.5 MB compiled `gendocs` binary was accidentally committed to git; untracked and added to `.gitignore`.

### Changed

- **Gendocs: all 4 table generators refactored** to use `formatMarkdownTable` (README generators table, README filter options table, detection.mdx per-generator table, generators.mdx detection table).
- **GITHUB_TOKEN wired into website CI** — `npm run build` step passes `GITHUB_TOKEN` for authenticated GitHub API calls on the dependents page (30 req/min vs 10 unauthenticated).
- **Lighthouse CI assertions** — Correctness checks (errors-in-console, redirects, inspector-issues, viewport, image-aspect-ratio) upgraded from `warn` to `error`.
- **AGENTS.md policies revised** — Removed "keep only 3 most recent reports" rule in favor of relevance/age-based pruning guidance; added 6 new Gotchas (Nix quality gates, sandbox testing, vendorHash maintenance, theme split-brain, astro-og-canvas param, BuildFlow auto-commit behavior).
- **Markdown link checker wired into CI** — New "Check internal markdown links" step in `.github/workflows/ci.yml`.

## [v3.3.1] — 2026-07-24

### Added

- **README table consistency test** (`readme_test.go`) — Validates that all markdown tables in README.md have consistent column counts. Regression guard for the gendocs `||` phantom-column corruption that produced broken tables.
- **Nix flake configuration** — Reproducible development environments via `flake.nix` with flake-parts architecture and treefmt-nix for formatting.

### Fixed

- **README.md generator and filter-options tables** — Rendered with phantom empty columns caused by a `||` formatting bug in gendocs (`cmd/gendocs/main.go`). Tables now render correctly.
- **3 integration tests** — Failed after `testdata/templ/page_templ.go` was accidentally deleted; fixture restored from git history.
- **Benchmark CI workflow** — Failed because `GOEXPERIMENT=jsonv2` was missing (required by `cmd/gendocs`, which imports `encoding/json/v2`).
- **Firebase deploy in Website CI** — Failed due to bash quote mangling when passing the service account JSON via `echo "${{ secrets.X }}"`. Switched to the `env:` + `printf '%s'` pattern.

### Changed

- **Inlined `isGeneratedBy` helper** — The unexported `isGeneratedBy(content, generator)` function was inlined at all 5 call sites in `detection.go`, removing an unnecessary indirection layer.
- **Simplified slice construction in `scan.go`** — `dirBasedExclusions` and `ExclusionPaths` switched from pre-allocated indexed assignment to idiomatic `append` pattern.
- **Removed unused `filenameNone` constant** in `cmd/gendocs/main.go` (dead code flagged by static analysis).
- **Website visual design overhaul** — Three-color accent system (cyan/amber/emerald), funnel logo mark, dracula syntax highlighting theme, expanded call-to-action sections, and WCAG AA color contrast pass across all surfaces.

## [v3.3.0] — 2026-07-09

### Added

- **`AllDetectorDocs()` function** — Returns structured documentation metadata for all detectors, derived from the `detectors` table. Used by gendocs to generate documentation artifacts.
- **`DetectorDoc` struct** — Exported struct with `Option`, `Reason`, `URL`, `FilenameDetection`, `ContentDetection`, `IsFuncName`, `HasFilenamePhase`, `HasContentPhase` fields.
- **`isFuncName` field on `detector` struct** — Records the exported `Is*Generated` function name for each detector, consumed by gendocs for the detection.mdx function table.
- **`doc.go`** — Dedicated package documentation file (standard Go convention), moved from `types.go`.
- **Individual doc comments on all 21 `FilterReason` constants** and **all 8 sentinel error variables**.
- **Documentation generation pipeline (`cmd/gendocs`)** — A Go binary that reads the `detectors` table from `detection.go` and generates `generators.json`, README tables, `generators.mdx` detection table + tool count, `detection.mdx` per-generator function table, and `doc.go` generator list. Run via `go generate ./...`. CI enforces freshness with `git diff --exit-code`.
- **CI docs freshness job** — Fails when generated docs are stale. Runs `go generate ./...` and checks `git diff --exit-code` on all generated files.
- **`websiteMetadata` validation** — gendocs fails at build time if a detector lacks website presentation data, making drift impossible when adding new generators.
- **Website Scan API reference page** — Documents 9 previously undocumented exported symbols.
- **Website API docs for `DetectReasonFile`/`DetectReasonFileFS`**, `FilterWithContent`/`FilterDetailedWithContent`, `FilterResult`, `SQLCOperation`.
- **Missing `doc.go` in 3 testdata directories** (handwritten, wire, templ).

### Fixed

- **Compile-breaking code examples** — Package doc and `NewFilter` examples showed `WithFilterOptions` passed inline to `NewFilter`, but `WithFilterOptions` returns `(FilterConfig, error)`. All examples now show the correct two-step pattern.
- **`IsGenericGenerated` doc** — Said "go generate", actually catches any generator using the standard "Code generated by" comment.
- **`getFilenameBasedReasonWithTrace` doc** — Named wrong function (copy-paste error).
- **`FilterConfig` type doc** — Clarified closure semantics; was misleading about error handling.
- **README mockgen description** — Claimed `_mock.go` / `mock_` prefix; actually `_mock.go` suffix only (`mock_` belongs to mockery).
- **README gqlgen description** — Claimed filename detection; actually content-only (filename matcher is `nil`).
- **Website `SQLCConfigError.Operation` type** — Documented as `string`, actually `SQLCOperation` since v3.1.0.
- **Website `IsGqlgenGenerated` description** — Claimed filename + content; actually content-only.

### Changed

- **`generators.ts`** — Rewritten from 50-line hand-maintained array to thin wrapper importing generated `generators.json`.
- **README.md** — Generator and filter options tables now generated between gendocs marker comments.
- **`generators.mdx`** — Detection table and tool count now generated between gendocs marker comments.
- **`detection.mdx`** — Per-generator function table now generated between gendocs marker comments.
- **`doc.go`** — Generator list now generated between gendocs marker comments.
- **CONTRIBUTING.md** — Updated "Adding a New Generator Detector" section with gendocs workflow steps.
- **CI path filters** — Added `website/**` and `doc.go` to push/PR triggers so docs freshness runs on any relevant change.
- **`.golangci.yaml` Go version** aligned to `1.26.4` (was `1.26.3`).
- **AGENTS.md Key Source Files table** updated with `doc.go`, `scan.go`, correct detector/constant counts.

## [v3.2.0] — 2026-06-11

### Added

- **`DetectReasonFile` / `DetectReasonFileFS`** — Two-phase detection (filename + content) in one call. Eliminates the need for callers to manually orchestrate filename checks and file reading. `DetectReasonFile` uses `os.DirFS(".")`, `DetectReasonFileFS` accepts a custom `fs.FS`.
- **`FilterWithContent` / `FilterDetailedWithContent`** — Filter methods that accept pre-read file content, avoiding double I/O for analyzers that already have the content (e.g., from AST parsing).
- **`ScanProject`** — Walks `fs.FS`, detects all generated files, and returns a `ScanResult` with per-generator file lists, exclusion patterns, and statistics. Eliminates ~200 lines of reimplemented scanner in consumer projects.
- **`ExclusionPattern()` on `FilterReason`** — Returns a regex pattern for generators with consistent filename conventions (templ, protobuf, go-enum, wire, moq, mockgen, stringer, mockery, easyjson, counterfeiter). Returns `false` for generators with configurable output directories.
- **7 new detector entries** (18 total, up from 11):
  - **mockery** — `mock_` prefix + `Code generated by mockery` content (exclusive ownership of `mock_` prefix)
  - **ent** — `Code generated by ent` / `Code generated by entc` content
  - **gqlgen** — Content-only detection (`Code generated by github.com/99designs/gqlgen`; no filename heuristic — `generated.go` too generic)
  - **easyjson** — `_easyjson.go` suffix + `Code generated by easyjson` content
  - **msgp** — Content-only detection (`Code generated by github.com/tinylib/msgp`; no filename heuristic — `_gen.go` too generic)
  - **counterfeiter** — `fake_` prefix + `Code generated by counterfeiter` content
  - **go-swagger** — `Code generated by go-swagger` content
- **7 new `Is*Generated` functions** — `IsMockeryGenerated`, `IsEntGenerated`, `IsGqlgenGenerated`, `IsEasyjsonGenerated`, `IsMsgpGenerated`, `IsCounterfeiterGenerated`, `IsGoSwaggerGenerated`
- **7 new `FilterOption` constants** (19 total) and **7 new `FilterReason` constants** (21 total)
- **`FilterResult.Is(reason FilterReason) bool`** — Ergonomic reason check: `result.Is(ReasonSQLC)` instead of `result.Filtered && result.Reason == ReasonSQLC`.
- **`String()` on `GeneratedFile`, `Exclusion`, `ScanResult`** — Debug/logging ergonomics for scan results.
- **`ExclusionPaths(exclusions []Exclusion) []string`** — Extracts just the regex pattern strings from a list of `Exclusion` values, for direct use with golangci-lint's `exclusions.paths`.
- **New source files**: `scan.go` with `ScanProject`, `ExclusionPattern`, exclusion pattern derivation
- **New test files**: `detect_file_test.go`, `filter_content_test.go`, `scan_test.go`
- **New testdata files**: `testdata/mockery/`, `testdata/ent/`, `testdata/gqlgen/`, `testdata/easyjson/`, `testdata/msgp/`, `testdata/counterfeiter/`, `testdata/go-swagger/`
- **New examples**: `ExampleDetectReasonFileFS`, `ExampleFilter_FilterWithContent`, `ExampleFilter_FilterDetailedWithContent`, `ExampleScanProject`, `ExampleFilterReason_ExclusionPattern`
- **New benchmarks**: `BenchmarkDetectReasonFileFS`

### Changed

- **Detector table expanded from 11 to 18 entries** — All derived functions (`AllFilterOptions`, `AllFilterReasons`, `AllGeneratorOptions`) automatically reflect the new detectors.
- **`generatorExclusionReasons` map uses constants** — String literals replaced with `string(FilterTempl)`, `string(FilterSQLC)`, etc. for consistency with the rest of the codebase.
- **`ExclusionPattern()` allocation-free** — Map literal moved to package-level `exclusionPatterns` var, avoiding map allocation on every call.
- **`detectReasonFromMap` empty content guard** — Skips content-based detection when `content == ""`, avoiding wasted iterations when the caller has no content.

### Fixed

- **Absolute paths in content-based detection** — `fs.ReadFile` with `os.DirFS(".")` silently rejects absolute paths ("invalid argument"), causing all content-based detectors to fail. Added `readFile` helper that falls back to `os.ReadFile` for absolute paths.
- **`ScanProject` ignored custom filesystems** — Internal `Filter` was not constructed with `WithFS()`, so custom `fs.FS` implementations were silently bypassed in favor of `os.DirFS(".")`.
- **mockgen/mockery prefix overlap** — Both `matchesMockgenFilename` and `matchesMockeryFilename` matched `mock_*` files; mockgen was ordered first, making mockery's filename matcher dead code. Now mockgen only matches `_mock.go` suffix; mockery exclusively owns `mock_` prefix.
- **msgp `ExclusionPattern` false positives** — `ExclusionPattern()` emitted `_gen.go$` for msgp, which would exclude `wire_gen.go`, `color_gen.go`, etc. Removed msgp from the exclusion pattern map (it has no filename heuristic by design).

## [v3.1.0] — 2026-06-04

### Added

- **`SQLCOperation` typed constants** — `SQLCConfigError.Operation` is now `SQLCOperation` instead of `string`, providing compile-time type safety for sqlc error handling. Five exported constants: `OpSQLCFind`, `OpSQLCWalk`, `OpSQLCRead`, `OpSQLCCollect`, `OpSQLCParse`.
- **`ExampleWithExcludePatterns_vendorAndTestdata`** — runnable example demonstrating vendor/testdata exclusion patterns.

### Changed

- **Breaking: `SQLCConfigError.Operation` field type** — `string` → `SQLCOperation`. Callers constructing `SQLCConfigError` directly must use `SQLCOperation` constants instead of raw strings.
- **Detection markers extracted to named constants** — All content detection strings (`sqlcGenerateComment`, `templComponent`, `goEnumComment`, `mockgenGeneratorName`, etc.) and filename suffixes (`protobufFilenameSuffixes`, `sqlcCodePatternMarkers`) are now named constants/vars instead of inline literals.
- **`errorPrefixFmt` constant** — Branded error prefix `"[gogenfilter:%s] "` extracted from repeated inline format strings.
- **`filteredResult`/`notFilteredResult` removed** — Helper functions replaced with inline `FilterResult` struct literals in `detectReasonFSWithTrace`.
- **Go 1.26.3** — `go.mod` updated.

### Fixed

- **Double-wrapped `sqlcFindError`** — `FindSQLCConfigs` returned `sqlcFindError(path, err)` which itself wrapped `err`, causing the same error to appear twice in the unwrap chain.

## [v3.0.2] — 2026-05-25

### Changed

- **Trace/non-trace detection unified** — `*WithTrace` variants are now canonical implementations; non-trace versions are thin wrappers that discard the trace string. Eliminates the biggest source of code duplication in the detection engine.
- **`coverage_test.go` dissolved** — Tests moved to their natural test files (`errors_test.go`, `filter_test.go`, `pattern_test.go`, `sqlc_test.go`, `project_test.go`).
- **Test string literals centralized** — Repeated test constants extracted to `testhelpers/constants.go` and named constants in `testdata_test.go`.
- **`FilterResult` construction DRYed up** — `filteredResult()` and `notFilteredResult()` helpers eliminate repetitive struct literal construction.
- **Error system simplified** — Removed `errorCodeDefs` table, `AllErrorCodes()`, `CodeHelp()`, `Helper` interface, `CodeEqual[T]` generic. Kept `ErrorCode` type, `ErrorCoder` interface, sentinel errors, branded prefix.
- **Phantom types removed** — `StartPath`, `ConfigPath`, `Operation`, `ErrorMessage` replaced with plain `string` fields on error structs.
- **Detection helpers unexported** — `MatchesSQLCFilename`, `HasSQLCContent`, `HasSQLCCodePatterns` → unexported. Users should use `DetectReason()` or `Filter`.
- **`codeGeneratedPrefix` moved to `detection.go`** — Only used there, not in `types.go`.
- **`matchAnyContentPattern` renamed** → `matchesAnyContentPattern` for consistency with naming conventions.
- **`Filter.String()` improved** — Better debug output showing options, include, and exclude patterns.
- **`parseV1AsV2` cleaned up** — Removed zero-value noise from struct construction.
- **`validatable` interface removed** — Dead code in production.
- **Plausible analytics removed** from website — Tightened Content Security Policy.
- **Flake configuration improved** — Better nix build setup.
- **Release workflow added** — Tag-based GitHub release with automated tests, lint, and release notes.

### Fixed

- **Website CI: checkout `path` parameter placement** — `path:` was outside `with:` block for `md-go-validator` checkout
- **Website CI: private repo access** — added `token: ${{ secrets.PRIVATE_REPO_TOKEN || github.token }}` fallback
- **Benchmark CI: missing `gh-pages` branch** — created orphan `gh-pages` branch for benchmark data
- **Lighthouse CI: budgets+assertions conflict** — removed `budgetPath` input from workflow
- **Node.js 20 deprecation** — updated `actions/setup-go@v5` → `@v6` across all workflows

## [v3.0.1] — 2026-05-04

### Added

- **`FilterResult` struct** — structured result type with `Filtered bool`, `Reason FilterReason`, `Path string`, `Trace string` fields.
- **`FilterDetailed(filePath) (FilterResult, error)`** — like `Filter()` but returns a `FilterResult` with trace information.
- **`FilterPathsDetailed(paths) ([]FilterResult, error)`** — batch variant of `FilterDetailed`.
- **`AllGeneratorOptions()`** — returns all detector `FilterOption` values (excluding meta-option `FilterAll`).
- **`FilterResult.String()`** — human-readable representation of filter results.
- **`Filter.FilterReasons()`** — returns the `FilterReason` values that this filter will detect.
- **`Filter.String()`** — human-readable debug representation of filter state.

### Changed

- **Breaking: `FilterOption.Reason()` now returns `(FilterReason, bool)`** — previously returned `FilterReason` and panicked on `FilterAll`. Now returns `("", false)` for meta-options.
- **Breaking: `Cause` field renamed to `Err` on all error types** — follows Go stdlib convention.
- **`errors.AsType[T]` migration** — source code and tests use Go 1.26 `errors.AsType[T]` exclusively.
- **Module path** — added `/v3` suffix for Go module convention compliance.

### Removed

- **Breaking: context methods removed** — `FilterContext`, `FilterDetailedContext`, `FilterPathsContext` deleted. They promised cancellation over synchronous I/O.
- **Breaking: metrics system removed** — `Metrics`, `MetricsMixin`, `FilterStats`, `NewMetrics`, `GetStats`, `FilteredBy`, `FilteredFiles`, `TotalFiltered`, `WithMetricsCap`, `RecordChecked`, `RecordFiltered`.
- **Breaking: phantom types removed** — `StartPath`, `ConfigPath`, `Operation`, `ErrorMessage` deleted.
- **Breaking: error system over-engineering removed** — `errorCodeDefs` table, `AllErrorCodes()`, `CodeHelp()`, `Helper` interface, `CodeEqual[T]` generic, `Causable` interface deleted.
- **Breaking: detection helpers unexported** — `MatchesSQLCFilename`, `HasSQLCContent`, `HasSQLCCodePatterns`.
- **`Enabled()` and `Disabled()` options** — filter is enabled when it has options, include patterns, or exclude patterns.

## [v3.0.0] — 2026-05-04

### Added

- `FilterPaths(paths []string) ([]bool, error)` — batch filtering of multiple paths; returns partial results on error
- `FilterContext(ctx context.Context, filePath string) (bool, error)` — context-aware filtering with cancellation support
- `FilterPathsContext(ctx context.Context, paths []string) ([]bool, error)` — batch filtering with context cancellation between paths
- `FilterConfigError` type — returned when invalid filter options are provided; implements `ErrorCoder`, `Helper`, and `Unwrap` interfaces
- `ErrInvalidFilterOption` sentinel error — for `errors.Is()` matching
- `CodeInvalidFilterOption` error code — for programmatic error handling

- **Breaking: `WithFilterOptions` returns `(FilterConfig, error)`** — previously panicked on invalid options; now returns `*FilterConfigError` with `errors.Is()` support
- **Breaking: `NewFilter` returns `(*Filter, error)`** — previously returned `*Filter` only; now uses `errors.Join()` to aggregate config errors
- **Breaking: `FilterConfig` returns `error`** — config functions now return error to support validation; `WithFS`, `WithIncludePatterns`, `WithExcludePatterns` return `nil` error
- **Breaking: `Enabled()` and `Disabled()` removed** — a filter is now enabled when it has filter options, include patterns, or exclude patterns; `NewFilter()` with no arguments is disabled. This eliminates silent misconfiguration where forgetting `Enabled()` caused the filter to silently pass everything through.
- `IsEnabled()` now derives state from configuration — returns `true` when `len(f.options) > 0 || len(f.includePatterns) > 0 || len(f.excludePatterns) > 0`
- `enabled bool` field removed from `Filter` struct — state is implicit, not stored

### Removed

- `Enabled()` option — no longer needed; pass options to enable
- `Disabled()` option — no longer needed; call `NewFilter()` with no args

### Fixed

- **Silent misconfiguration** — previously, `NewFilter(WithFilterOptions(FilterAll))` (without `Enabled()`) compiled fine but silently did nothing; now passing options automatically enables the filter
- `FilterConfigError` type — returned when invalid filter options are provided; implements `ErrorCoder`, `Helper`, and `Unwrap` interfaces
- `ErrInvalidFilterOption` sentinel error — for `errors.Is()` matching
- `CodeInvalidFilterOption` error code — for programmatic error handling
- `FilterStats.FilteredFiles(reason FilterReason) []string` — returns file paths filtered for a given reason (defensive copy, safe to mutate)
- SQLC config v1 format test coverage — verifies v1 config parses but returns zero output dirs
- Cross-platform path matching tests — forward slash and backslash detection patterns
- `DetectReasonReader(filePath string, r io.Reader, opts ...FilterOption) (FilterReason, error)` — detection from an `io.Reader`, useful when the caller already has file content in a stream
- Integration test fixtures (`testdata/`) from 11 real code generators plus 2 handwritten negatives, loaded via `//go:embed`
- `errorCodeDefs` single-source-of-truth table — `AllErrorCodes()` and `CodeHelp()` now derive from one table
- Error code derivation tests — verify `errorCodeDefs` covers every const, has no duplicates, and matches `AllErrorCodes()` exactly
- `map[FilterOption]struct{}` replaces `map[FilterOption]bool` — values were never `false`
- `fmt.Stringer` implementation on all 5 phantom types (`StartPath`, `ConfigPath`, `Operation`, `ErrorMessage`, `TotalFilesChecked`)
- Runnable examples for `Filter`, `WithFS`, `WithIncludePatterns`, `GetStats`/`FilteredBy`/`TotalFiltered`, and `DetectReasonReader`
- Error handling examples (`errors.Is`, `ErrorCode()`, `Help()`, `CodeHelp`, `AllErrorCodes`, `FindProjectRoot`)
- Phantom type `String()` method tests — 5 types × 3 cases each
- `BenchmarkCodeHelp` — 4.9ns/op, zero allocations (map lookup)
- `Filter` method — replaces `ShouldFilter` with cleaner name; `MustFilter` removed
- CI bench step (`go test -bench=. -benchmem`)

### Changed

- **`ShouldFilter` renamed to `Filter`** — the method `ShouldFilter(filePath string) (bool, error)` is now `Filter(filePath string) (bool, error)`. The `MustFilter` panic-on-error variant has been removed; callers should handle errors explicitly.
- **`MustShouldFilter` renamed to `MustFilter`** — the double-modal name was unnecessarily verbose; the new name follows the standard Go `Must` prefix convention
- **`IsValid()` methods derived from tables** — `FilterOption.IsValid()` and `FilterReason.IsValid()` now iterate `AllFilterOptions()`/`AllFilterReasons()` instead of manual switches, eliminating split-brain bugs when adding new detectors
- **SQLC patterns consolidated** — `sqlcFilePatterns`/`sqlcCodePatterns` inlined into their consuming functions (`matchesSQLCFilenamePattern`, `HasSQLCContent`, `HasSQLCCodePatterns`)
- **SQLC filename patterns cached** — `sqlcFilenamePatterns` moved to package-level var to avoid re-allocation on every call
- **`WithFilterOptions` reuses `optionsMap`** — `FilterAll` expansion no longer duplicated between `filter.go` and `detection.go`
- **`filteredFiles` moved to `MetricsMixin`** — file path tracking now included in `GetStats()` snapshots via `FilteredFiles()` accessor
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
  - `Causable` interface for errors that wrap an underlying cause _(later removed as unused)_
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
- Comprehensive `errors_test.go` with generic test helpers (`assertErrorType[T]`, `assertBrandedErrorMessage`, `testErrorCodeReturnsCode`, `assertErrorsIs`, `testCrossTypeMismatch`)
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

---

[Unreleased]: https://github.com/LarsArtmann/gogenfilter/compare/v3.3.2...HEAD
[v3.3.2]: https://github.com/LarsArtmann/gogenfilter/compare/v3.3.1...v3.3.2
[v3.3.1]: https://github.com/LarsArtmann/gogenfilter/compare/v3.3.0...v3.3.1
[v3.3.0]: https://github.com/LarsArtmann/gogenfilter/compare/v3.2.0...v3.3.0
[v3.2.0]: https://github.com/LarsArtmann/gogenfilter/compare/v3.1.0...v3.2.0
[v3.1.0]: https://github.com/LarsArtmann/gogenfilter/compare/v3.0.2...v3.1.0
[v3.0.2]: https://github.com/LarsArtmann/gogenfilter/compare/v3.0.1...v3.0.2
[v3.0.1]: https://github.com/LarsArtmann/gogenfilter/compare/v3.0.0...v3.0.1
[v3.0.0]: https://github.com/LarsArtmann/gogenfilter/releases/tag/v3.0.0
