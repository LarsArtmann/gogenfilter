# gogenfilter

_A Go library for detecting and filtering auto-generated code files._

## Overview

This project provides detection and filtering capabilities for auto-generated Go code files from tools like sqlc, templ, go-enum, protobuf, oapi-codegen, deepcopy-gen, wire, moq, mockgen, and stringer. It's designed as a library for use by linters and static analysis tools.

## Architecture

- **Two-phase detection**: filename-based (zero I/O) then content-based (reads file)
- **Table-driven detector system**: `[]detector` slice with `option`, `reason`, `matchFilename`, and `checkContent` fields
- **Functional options API**: `NewFilter(WithFilterOptions(FilterAll), ...)` — Filter is immutable after construction, enabled when options/patterns are provided
- **Phantom types** (`StartPath`, `ConfigPath`, `Operation`, `ErrorMessage`, `TotalFilesChecked`) for type safety at API boundaries
- **Branded errors**: `[gogenfilter:<code>]` prefix, sentinel errors for `errors.Is`, `ErrorCoder`/`Helper` interfaces, `CodeEqual[T]` generic
- **`fs.FS` abstraction**: `WithFS()` option for testability; tests use `fstest.MapFS`
- **Derived lists**: `AllFilterOptions()`, `AllFilterReasons()`, and `allSpecificOptions()` are all derived from the `detectors` table — adding a new detector automatically updates everything

## Project Structure

- Root-level `.go` files: Core library implementation (standard Go library convention)
- Test files: `*_test.go` alongside source files
- `docs/`: Planning documents and status reports
- `.github/workflows/ci.yml`: Go CI — test, vet, lint, benchmarks (path-filtered: `*.go`, `go.mod`, `go.sum`, `testdata/**`, `.golangci.*`)
- `.github/workflows/website.yml`: Website CI/CD — typecheck, build, validate docs, deploy to Firebase (path-filtered: `website/**`)
- `.github/dependabot.yml`: Weekly automated dependency updates (Go modules, npm, GitHub Actions)

### Key Source Files

| File           | Purpose                                                                                                                                                                                                                           |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `filter.go`    | `Filter` type with functional options (`WithFilterOptions`, `WithFS`, `WithIncludePatterns`, `WithExcludePatterns`). `ShouldFilter` returns `(bool, error)`. `MustFilter` panics on error. Enabled when options/patterns are set. |
| `detection.go` | Core detection logic, `detectors` table (11 entries), `DetectReason`, `DetectReasonReader`, filename/content matchers                                                                                                             |
| `types.go`     | `FilterOption` and `FilterReason` types, constants (12 options, 14 reasons), `AllFilterOptions()`, `AllFilterReasons()`                                                                                                           |
| `pattern.go`   | `**` glob pattern matching via `doublestar/v4`                                                                                                                                                                                    |
| `sqlc.go`      | SQLC config discovery and parsing (v1 and v2 formats, Go/JSON/Codegen output dirs)                                                                                                                                                |
| `errors.go`    | Branded error types with sentinel errors                                                                                                                                                                                          |
| `project.go`   | Project root discovery                                                                                                                                                                                                            |
| `metrics.go`   | Thread-safe detection metrics tracking with `FilteredFiles()` and `FilteredBy()` accessors                                                                                                                                        |
| `phantom.go`   | Phantom type constructors                                                                                                                                                                                                         |

### Website

- `website/` — Astro v6 + Starlight marketing/docs site
- Landing page at `/` with hero, features, code examples
- Starlight docs at `/docs/` with PageFind search
- Firebase Hosting deployment (firebase.json, .firebaserc)
- CI/CD: `.github/workflows/website.yml`
- Build: `cd website && npm run build`
- Dev: `cd website && npm run dev`
- Type check: `cd website && npx astro check`
- HTML validation: `cd website && npx html-validate 'dist/**/*.html'`

#### Website Patterns

- **`Icon.astro`** — Centralized SVG icon component. Import from `../components/Icon.astro`. Props: `name` (string), `size` (number, default 20). Available icons: Feature icons (lightning, sliders, glob, chart, folder, database), UseCase icons (cog, chart, refresh, bolt, check), UI icons (arrow-external, arrow-right, github, menu, close, sun, moon).
- **Theme system** — Dark mode default. Light mode via `.light` class on `<html>`. Toggle persists to `localStorage`. Initialize with `prefers-color-scheme` as fallback. CSS variables in `src/styles/global.css` under `:root.light`.
- **Type-safe icon keys** — `FeatureIcon` and `UseCaseIcon` exported from `src/data/types.ts` as `as const` + `typeof ...[number]` unions.
- **Analytics** — Plausible injected in `LandingLayout.astro` head with `is:inline defer`.
- **SEO** — Canonical URL, JSON-LD SoftwareApplication schema, OG meta tags all in `LandingLayout.astro`.
- **Code deduplication** — jscpd v4.0.9 via `scripts/dedup.sh` wrapper (needed because jscpd v4 `formats-exts` is broken for `.astro` files). Script copies `.astro` → `.html` in temp dir, runs jscpd with `--min-lines 2 --min-tokens 20`, remaps paths back. Run: `cd website && npm run dedup`.

## Development Guidelines

### Design Decisions

- **oapi-codegen has no filename heuristic** — `*.gen.go` is not specific to oapi-codegen (used by many generators). Adding it as phase-1 detection would cause false positives. Content-based detection is correct.
- **`ReasonOutsideScope` (was `ReasonIncludePattern`)** — renamed in v0; describes the outcome (file is outside include scope) rather than the mechanism. `ReasonIncludePattern` was misleading: the file was filtered because it did NOT match, not because it matched.
- **SQLC v1 config supported** — `sqlcV1Config` struct maps v1 `packages[].path` to output dirs. Version dispatch in `unmarshalSQLCConfig` routes v1 to `parseV1AsV2` which converts to v2 format. Unsupported versions return a parse error.
- **`Error()` uses `fmt.Sprintf`** — 228ns on cold path (error formatting). `strings.Builder` optimization is not worth the complexity.
- **art-dupl known false positive** — `unmarshalSQLCConfig` and `parseV1AsV2` in `sqlc.go` share identical signatures `([]byte, string) → (*sqlcConfig, *SQLCConfigError)` but are fundamentally different functions (version dispatch vs v1→v2 conversion). Art-dupl's structural matching flags them; fixing it would require mangling the API (different return types or internal helper extraction), which is worse than the false positive.

### Testing

- Use table-driven tests where possible
- Use `t.Parallel()` within `t.Run()` for proper test isolation
- Generic helper functions in `helpers_test.go`: `assertErrorsAs[T]()`, `assertFieldEqual[T]()`, `boolTestCase[T]`, `runBoolTableTest[T]()`
- Run tests with: `go test ./...`

### Linting

- Uses golangci-lint v2 with comprehensive configuration
- Run: `golangci-lint run`

### Code Organization

This is a library project, so the main package resides at the root level. This follows standard Go conventions for library packages.

## Commands

```bash
# Run tests
go test ./...

# Run tests with race detector
go test -race ./...

# Run linter
golangci-lint run

# Detect code duplication (excludes testdata/moq - generated mock code)
art-dupl --semantic --sort total-tokens -t 15 --exclude-pattern 'testdata/moq/**'

# Website: detect code duplication (jscpd via wrapper script)
cd website && npm run dedup
```

## CI

Two separate GitHub Actions workflows, both triggered on push/PR to master with path filters:

**Go CI** (`.github/workflows/ci.yml`):

- Path filters: `*.go`, `go.mod`, `go.sum`, `testdata/**`, `.golangci.*`
- Concurrency group cancels in-progress runs
- `go vet` → tests with race detector and coverage (95% threshold) → benchmarks
- golangci-lint (separate job, parallel)

**Website** (`.github/workflows/website.yml`):

- Path filters: `website/**`
- Concurrency group cancels in-progress runs
- `npm ci` → `astro check` (typecheck) → build → doc validation → HTML validation (enforced, not suppressed)
- Deploy to Firebase Hosting (master push only, least-privilege permissions)
- Node version pinned via `website/.node-version` (used by volta/fnm/nvm)
- `md-go-validator@latest` — intentionally unpinned (internal tool, owner-controlled)

## Key API Patterns

```go
// Functional options configuration
f := gogenfilter.NewFilter(
    gogenfilter.WithFilterOptions(gogenfilter.FilterAll),
)

// ShouldFilter returns (bool, error) — I/O errors propagate
filtered, err := f.ShouldFilter("file.go")

// MustFilter panics on error — for tests/benchmarks
filtered := f.MustFilter("file.go")

// Variadic DetectReason (no I/O)
reason := gogenfilter.DetectReason("file.go", content,
    gogenfilter.FilterSQLC, gogenfilter.FilterGeneric,
)
```

## Dependencies

- `github.com/bmatcuk/doublestar/v4` - `**` glob pattern matching
- `github.com/go-faster/yaml` - YAML parsing for SQLC config

## License

MIT
