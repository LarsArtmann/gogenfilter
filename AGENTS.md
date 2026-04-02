# gogenfilter

_A Go library for detecting and filtering auto-generated code files._

## Overview

This project provides detection and filtering capabilities for auto-generated Go code files from tools like sqlc, templ, and go-enum. It's designed as a library for use by linters and static analysis tools.

## Project Structure

- Root-level `.go` files: Core library implementation (this is intentional for a library project)
- `pkg/errors/`: Shared error utilities
- Test files: `*_test.go` alongside source files

## Development Guidelines

### Testing

- Use table-driven tests where possible
- Use `t.Parallel()` within `t.Run()` for proper test isolation
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

# Run structure linter
go-structure-linter . --fix -p
```

## Dependencies

- `github.com/go-faster/yaml` - YAML parsing for SQLC config

## License

MIT
