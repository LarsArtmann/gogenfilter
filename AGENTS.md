# gogenfilter

_A Go library for detecting and filtering auto-generated code files._

## Overview

This project provides detection and filtering capabilities for auto-generated Go code files from tools like sqlc, templ, and go-enum. It's designed as a library for use by linters and static analysis tools.

## Architecture

- **Two-phase detection**: filename-based (zero I/O) then content-based (reads file)
- **Table-driven detector system**: `[]detector` slice with `matchFilename` and `checkContent` function fields
- **Phantom types** (`StartPath`, `ConfigPath`, `Operation`, `ErrorMessage`, `TotalFilesChecked`) for type safety at API boundaries
- **Branded errors**: `[gogenfilter:<code>]` prefix, sentinel errors for `errors.Is`, `ErrorCoder`/`Helper` interfaces, `CodeEqual[T]` generic
- **`fs.FS` abstraction**: `Filter.WithFS()` for testability; tests use `fstest.MapFS`

## Project Structure

- Root-level `.go` files: Core library implementation (standard Go library convention)
- Test files: `*_test.go` alongside source files
- `docs/`: Planning documents and status reports

### Key Source Files

| File           | Purpose                                                                                     |
| -------------- | ------------------------------------------------------------------------------------------- |
| `detection.go` | Core detection logic and detector table                                                     |
| `filter.go`    | `Filter` type with builder pattern (`WithFS`, `WithIncludePatterns`, `WithExcludePatterns`) |
| `pattern.go`   | Custom `**` glob pattern matching                                                           |
| `sqlc.go`      | SQLC config discovery and parsing                                                           |
| `errors.go`    | Branded error types with sentinel errors                                                    |
| `types.go`     | Phantom types and shared type definitions                                                   |
| `project.go`   | Project root discovery                                                                      |
| `metrics.go`   | Detection metrics tracking                                                                  |
| `phantom.go`   | Phantom type constructors                                                                   |

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

# Run linter
golangci-lint run

# Run via Justfile
just test
just lint
just ci
```

## Dependencies

- `github.com/go-faster/yaml` - YAML parsing for SQLC config

## License

MIT
