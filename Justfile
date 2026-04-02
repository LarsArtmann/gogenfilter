# Justfile for gogenfilter
# https://github.com/casey/just

# Default recipe - show all available recipes
default:
    @just --list

# Run all tests
test:
    go test ./... -v

# Run tests with race detector
test-race:
    go test -race ./... -v

# Run tests with coverage
test-coverage:
    go test ./... -coverprofile=coverage.out -covermode=atomic
    go tool cover -html=coverage.out -o coverage.html

# Run tests with coverage threshold (fails if below 70%)
test-coverage-threshold:
    go test ./... -coverprofile=coverage.out -covermode=atomic
    @coverage=$(go tool cover -func=coverage.out | grep total | awk '{print $3}' | tr -d '%'); \
    if (( $(echo "$coverage < 70" | bc -l) )); then \
        echo "Coverage is $coverage%, below threshold of 70%"; \
        exit 1; \
    else \
        echo "Coverage is $coverage%, meets threshold of 70%"; \
    fi

# Run linter
lint:
    golangci-lint run

# Run structure linter
structure-lint:
    go-structure-linter . -p

# Fix structure issues
structure-fix:
    go-structure-linter . --fix -p

# Format code
fmt:
    go fmt ./...

# Tidy dependencies
tidy:
    go mod tidy

# Run all checks (tests, lint, structure)
check: test lint structure-lint

# Build (for libraries, just verify it compiles)
build:
    go build ./...

# Clean build artifacts
clean:
    rm -f coverage.out coverage.html
