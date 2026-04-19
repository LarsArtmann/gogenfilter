# Contributing to gogenfilter

Thank you for your interest in contributing! This guide covers everything you need to get started.

## Development Setup

**Requirements:** Go 1.26+

```bash
git clone https://github.com/LarsArtmann/gogenfilter.git
cd gogenfilter
go mod download
```

## Building

```bash
go build ./...
```

## Testing

```bash
# Run all tests (no cache)
go test -count=1 ./...

# Run with race detector
go test -race ./...

# Run a specific test
go test -run TestDetectReason -count=1 ./...
```

## Linting

```bash
golangci-lint run
```

Some linter warnings are expected false positives (e.g., `testpackage` on internal test files that need access to unexported symbols). These are annotated with `//nolint` comments where appropriate.

## CI

All pull requests must pass:

- `go build ./...` — compiles cleanly
- `go test -race -cover ./...` — tests pass with race detection
- `go vet ./...` — no vet warnings
- `golangci-lint run` — no new lint issues

## Code Style

- Follow standard Go conventions ([Effective Go](https://go.dev/doc/effective_go))
- Table-driven tests using `t.Parallel()` within `t.Run()`
- Functional options pattern for configuration (see `filter.go`)
- Derive lists from single-source tables (see `detectors`, `errorCodeDefs`)
- Use `fstest.MapFS` in tests — never real filesystem I/O

## Adding a New Generator Detector

1. Add a `FilterOption` and `FilterReason` constant in `types.go`
2. Add a detector entry to the `detectors` table in `detection.go`
3. Implement `matchFilename` and/or `checkContent` functions
4. Add a real generated file to `testdata/<generator>/` as an integration fixture
5. Update `integration_test.go` with the new fixture
6. Update the Supported Generators table in `README.md`

The derivation system automatically updates `AllFilterOptions()`, `AllFilterReasons()`, and `IsValid()` — no manual list maintenance needed.

## Pull Request Process

1. Create a feature branch from `master`
2. Make focused, self-contained commits
3. Ensure all CI checks pass
4. Include tests for any new functionality
5. Update documentation (`README.md`, `CHANGELOG.md`) if applicable

## Project Structure

```
├── detection.go       # Core detection logic and detector table
├── filter.go          # Filter type with builder pattern
├── types.go           # FilterOption, FilterReason constants and methods
├── errors.go          # Branded error types
├── metrics.go         # Thread-safe metrics tracking
├── pattern.go         # Custom ** glob pattern matching
├── sqlc.go            # SQLC config discovery and parsing
├── project.go         # Project root discovery
├── phantom.go         # Phantom types for API safety
├── bench_test.go      # Benchmarks
├── integration_test.go # Tests against real tool output
├── testdata/          # Fixture files from real generators
└── docs/              # Planning documents and status reports
```
