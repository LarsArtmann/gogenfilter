# gogenfilter

_A Go library for detecting and filtering auto-generated code files._

## Overview

This project provides detection and filtering capabilities for auto-generated Go code files from tools like sqlc, templ, go-enum, protobuf, oapi-codegen, deepcopy-gen, wire, moq, mockgen, and stringer. It's designed as a library for use by linters and static analysis tools.

## Architecture

- **Two-phase detection**: filename-based (zero I/O) then content-based (reads file)
- **Table-driven detector system**: `[]detector` slice with `option`, `reason`, `matchFilename`, and `checkContent` fields
- **Functional options API**: `NewFilter(Enabled(), WithFilterOptions(FilterAll), ...)` — Filter is immutable after construction
- **Phantom types** (`StartPath`, `ConfigPath`, `Operation`, `ErrorMessage`, `TotalFilesChecked`) for type safety at API boundaries
- **Branded errors**: `[gogenfilter:<code>]` prefix, sentinel errors for `errors.Is`, `ErrorCoder`/`Helper` interfaces, `CodeEqual[T]` generic
- **`fs.FS` abstraction**: `WithFS()` option for testability; tests use `fstest.MapFS`
- **Derived lists**: `AllFilterOptions()`, `AllFilterReasons()`, and `allSpecificOptions()` are all derived from the `detectors` table — adding a new detector automatically updates everything

## Project Structure

- Root-level `.go` files: Core library implementation (standard Go library convention)
- Test files: `*_test.go` alongside source files
- `docs/`: Planning documents and status reports
- `.github/workflows/ci.yml`: Go CI — tests, lint, vet, benchmarks (path-filtered: `*.go`, `go.mod`, `go.sum`, `.golangci.*`)
- `.github/workflows/website.yml`: Website CI/CD — build, validate docs, deploy to Firebase (path-filtered: `website/**`)

### Key Source Files

| File           | Purpose                                                                                                                                                                                                           |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `filter.go`    | `Filter` type with functional options (`Enabled`, `Disabled`, `WithFilterOptions`, `WithFS`, `WithIncludePatterns`, `WithExcludePatterns`). `ShouldFilter` returns `(bool, error)`. `MustFilter` panics on error. |
| `detection.go` | Core detection logic, `detectors` table (11 entries), `DetectReason`, `DetectReasonReader`, filename/content matchers                                                                                             |
| `types.go`     | `FilterOption` and `FilterReason` types, constants (12 options, 14 reasons), `AllFilterOptions()`, `AllFilterReasons()`                                                                                           |
| `pattern.go`   | `**` glob pattern matching via `doublestar/v4`                                                                                                                                                                    |
| `sqlc.go`      | SQLC config discovery and parsing (v2 format only; v1 parses but returns zero output dirs)                                                                                                                        |
| `errors.go`    | Branded error types with sentinel errors                                                                                                                                                                          |
| `project.go`   | Project root discovery                                                                                                                                                                                            |
| `metrics.go`   | Thread-safe detection metrics tracking with `FilteredFiles()` and `FilteredBy()` accessors                                                                                                                        |
| `phantom.go`   | Phantom type constructors                                                                                                                                                                                         |

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

## Development Guidelines

### Design Decisions

- **oapi-codegen has no filename heuristic** — `*.gen.go` is not specific to oapi-codegen (used by many generators). Adding it as phase-1 detection would cause false positives. Content-based detection is correct.
- **`ReasonIncludePattern` name stays** — semantically "include pattern" describes the mechanism (file excluded because it didn't match an include pattern). Renaming to `ReasonNotInScope` would be a breaking API change for cosmetic improvement.
- **SQLC v1 config not supported** — `sqlcConfig` struct only maps v2 `sql:` array. V1 configs parse successfully but return zero output dirs. This is documented and tested.
- **`Error()` uses `fmt.Sprintf`** — 228ns on cold path (error formatting). `strings.Builder` optimization is not worth the complexity.

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
```

## CI

Two separate GitHub Actions workflows, both triggered on push/PR to master with path filters:

**Go CI** (`.github/workflows/ci.yml`):
- Tests with race detector and coverage (95% threshold)
- Build verification
- `go vet`
- golangci-lint
- Benchmarks

**Website** (`.github/workflows/website.yml`):
- Build Astro site
- Validate documentation code blocks (md-go-validator)
- HTML validation
- Deploy to Firebase Hosting (master push only)

## Key API Patterns

```go
// Functional options configuration
f := gogenfilter.NewFilter(
    gogenfilter.Enabled(),
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
