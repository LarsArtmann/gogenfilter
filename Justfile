# Justfile for gogenfilter
# https://github.com/casey/just

# Default recipe - show all available recipes
default:
    @just --list

# Run all tests
test:
    GOTOOLCHAIN=local go test -count=1 ./...

# Run tests with race detector
test-race:
    GOTOOLCHAIN=local go test -count=1 -race ./...

# Run linter
lint:
    golangci-lint run

# Auto-fix lint issues
lint-fix:
    golangci-lint run --fix

# Run tests with coverage report
coverage:
    GOTOOLCHAIN=local go test -count=1 -coverprofile=cov.out ./...
    GOTOOLCHAIN=local go tool cover -func=cov.out

# Generate HTML coverage report
coverage-html:
    GOTOOLCHAIN=local go test -count=1 -coverprofile=cov.out ./...
    GOTOOLCHAIN=local go tool cover -html=cov.out -o coverage.html

# Run structure linter
structure-lint:
    go-structure-linter . -p

# Fix structure issues
structure-fix:
    go-structure-linter . --fix -p

# Format code
fmt:
    GOTOOLCHAIN=local go fmt ./...

# Tidy dependencies
tidy:
    GOTOOLCHAIN=local go mod tidy

# Build (for libraries, just verify it compiles)
build:
    GOTOOLCHAIN=local go build ./...

# Clean build artifacts
clean:
    rm -f cov.out coverage.html

# Full CI check: build + test + lint
ci: build test-race lint

# Check line counts of test files
linecounts:
    @wc -l *_test.go | sort -rn
