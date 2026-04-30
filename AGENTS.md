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
- `.github/workflows/ci.yml`: GitHub Actions CI (test, build, vet, lint)

### Key Source Files

| File           | Purpose                                                                                                                                                                                                                 |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `filter.go`    | `Filter` type with functional options (`Enabled`, `Disabled`, `WithFilterOptions`, `WithFS`, `WithIncludePatterns`, `WithExcludePatterns`). `ShouldFilter` returns `(bool, error)`. `MustShouldFilter` panics on error. |
| `detection.go` | Core detection logic, `detectors` table (11 entries), `DetectReason`, `DetectReasonReader`, filename/content matchers                    |
| `types.go`     | `FilterOption` and `FilterReason` types, constants (12 options, 14 reasons), `AllFilterOptions()`, `AllFilterReasons()`                                                                                                 |
| `pattern.go`   | `**` glob pattern matching via `doublestar/v4`                                                                                                          |
| `sqlc.go`      | SQLC config discovery and parsing                                                                                                                                                                                       |
| `errors.go`    | Branded error types with sentinel errors                                                                                                                                                                                |
| `project.go`   | Project root discovery                                                                                                                                                                                                  |
| `metrics.go`   | Thread-safe detection metrics tracking                                                                                                                                                                                  |
| `phantom.go`   | Phantom type constructors                                                                                                                                                                                               |

## Development Guidelines

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

# Run via Justfile
just test
just lint
just ci
```

## CI

GitHub Actions runs on push/PR to master:

- Tests with race detector and coverage
- Build verification
- `go vet`
- golangci-lint

## Key API Patterns

```go
// Functional options configuration
f := gogenfilter.NewFilter(
    gogenfilter.Enabled(),
    gogenfilter.WithFilterOptions(gogenfilter.FilterAll),
)

// ShouldFilter returns (bool, error) — I/O errors propagate
filtered, err := f.ShouldFilter("file.go")

// MustShouldFilter panics on error — for tests/benchmarks
filtered := f.MustShouldFilter("file.go")

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
