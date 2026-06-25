# Go Modularization Assessment — gogenfilter

**Date:** 2026-05-25 | **Phase:** 1 (Detection)

## Verdict: Do NOT Modularize

This project is **not a candidate** for multi-module splitting. The assessment below follows the go-modularize skill's scoring framework.

---

## Phase 1 — Current State Detection

### 1.1 Module Landscape

| Module                                              | Path             | Go Version | External Deps                              | State                |
| --------------------------------------------------- | ---------------- | ---------- | ------------------------------------------ | -------------------- |
| `github.com/LarsArtmann/gogenfilter/v3`             | `./`             | 1.26.2     | doublestar, go-faster/yaml, ginkgo, gomega | Clean, single module |
| `github.com/LarsArtmann/gogenfilter/v3/testhelpers` | `./testhelpers/` | (shared)   | None                                       | Clean, no go.mod     |

**Status:** Monolith (single go.mod, all packages in one tree). No go.work present.

### 1.2 Package Dependency Graph

```
gogenfilter/           ← main package (7 files, 1632 source lines)
  └── imports: doublestar/v4, go-faster/yaml (prod); ginkgo, gomega (test)
  └── internal coupling: filter.go → detection.go → types.go (by design)

testhelpers/           ← shared test constants
  └── imports: nothing
  └── no test files, no go.mod
```

No circular dependencies. No replace directives. No god-packages.

---

## When NOT to Modularize — Scoring

| Signal                                         | Weight | Assessment                               |
| ---------------------------------------------- | ------ | ---------------------------------------- |
| **Small project** (7 files, 1632 source lines) | High   | YES — focused library                    |
| **Single domain** (generated code detection)   | High   | YES — one concept                        |
| **All code changes together**                  | High   | YES — detectors table couples everything |
| **Library with external consumers**            | Medium | YES — published to GOPROXY as v3         |
| **Single developer**                           | Medium | Likely                                   |
| **Prototype**                                  | High   | NO — production-ready v3                 |
| **Independent versioning need**                | High   | NO — one library, one version            |

**Score: 3+ High signals** → **Stop. Do not modularize.**

---

## Why Not

### 1. Single-Entity Library

gogenfilter is a single-purpose library. It does one thing (detect generated code) and does it well. The table-driven `detectors` system is the core data structure, and it lives in one file (`detection.go`) referencing types from `types.go`. Splitting these into separate modules would break the tight coupling that is **intentional by design**.

### 2. API Fragmentation

Today, consumers write:

```go
// skip-validate
import "github.com/LarsArtmann/gogenfilter/v3"

f, _ := gogenfilter.NewFilter(gogenfilter.WithFilterOptions(gogenfilter.FilterAll))
```

After splitting, they'd need:

```go
import (
    gogenfilter "github.com/LarsArtmann/gogenfilter/v3"
    "github.com/LarsArtmann/gogenfilter/v3/detection"  // for DetectReason?
    "github.com/LarsArtmann/gogenfilter/v3/types"      // for FilterOption?
)
```

This adds import complexity with zero benefit. The current flat API surface is a strength.

### 3. Breaking Change Risk

The library is at v3 with external consumers. Module path changes would break imports. Even with `replace` directives or GOPROXY redirects, the migration pain outweighs any theoretical benefit.

### 4. No Build-Time Isolation

All 7 source files form a single package. There are no `internal/` packages to protect, no independent compilation units to isolate, and no test-only dependencies leaking into production. The `ginkgo`/`gomega` deps are already correctly scoped to `_test.go` files.

### 5. Overhead Without Value

Multi-module adds:

- Multiple `go.mod` files to maintain
- `go.work` or `replace` directives to manage
- CI complexity (build/test per module)
- Versioning coordination between modules
- Import path management for consumers

For 7 source files in a single package, this overhead is unjustified.

---

## Conclusion

The single-package, single-module design is **correct** for this project. The library follows the Unix philosophy: it does one thing well, composes via a clean API, and stays out of the consumer's way.

No further modularization phases (2-7) are warranted.
