# Architecture Review — gogenfilter

**Date:** 2026-05-25 | **Version:** v3 | **Reviewer:** AI Architecture Partner

---

## 1. Executive Summary

gogenfilter is a well-architected, focused Go library for detecting and filtering auto-generated code files. The architecture follows Unix philosophy: **one thing, done well**. The table-driven detector system, two-phase detection optimization, and functional options API are textbook Go design patterns.

**Overall Grade: A-**

The architecture is clean, cohesive, and production-ready. The few improvement opportunities are incremental — no structural refactoring is needed. The project is **not a candidate for multi-module splitting** (see §7).

---

## 2. Current Architecture

### 2.1 Package Structure

Single Go module, single package (`gogenfilter`), one sub-package (`testhelpers`).

```
gogenfilter/                          # github.com/LarsArtmann/gogenfilter/v3
├── types.go          (158L)          # Domain types: FilterOption, FilterReason, FilterResult
├── detection.go      (460L)          # Core engine: detectors table, two-phase detection
├── filter.go         (335L)          # User-facing: Filter struct, functional options
├── errors.go         (176L)          # Branded errors: 3 types, 8 codes, 7 sentinels
├── pattern.go        (39L)           # Glob matching: thin wrapper over doublestar/v4
├── sqlc.go           (412L)          # SQLC config: discovery, parsing, output dir extraction
├── project.go        (52L)           # Project root: parent directory search
└── testhelpers/                      # Shared test constants (no test files)
```

### 2.2 Dependency Graph (Internal)

```
Consumer
  │
  ▼
filter.go  ◄── orchestrator, pattern-aware
  │         uses pattern.go for include/exclude
  │         delegates detection to detection.go
  │
  ├──► pattern.go     (standalone utility)
  │
  └──► detection.go   (detection engine)
         │  owns detectors[] table
         │  provides DetectReason, Is*Generated, All*()
         │
         └──► types.go  (FilterOption → FilterReason mapping via detectors[])

sqlc.go  ◄── independent infrastructure
  │       uses project.go for parent search
  │       uses errors.go for SQLCConfigError
  │
  ├──► project.go     (standalone utility)
  └──► errors.go      (standalone types)

errors.go  ◄── standalone, no incoming calls
types.go   ◄── referenced by detection.go (IsValid → All*())
```

### 2.3 Coupling Analysis

| From           | To             | Coupling Strength | Justification                                                             |
| -------------- | -------------- | ----------------- | ------------------------------------------------------------------------- |
| `filter.go`    | `detection.go` | **High**          | Core bridge: `detectReasonFS()`, `detectReasonFSWithTrace()`              |
| `filter.go`    | `pattern.go`   | **Medium**        | `matchesAnyPattern()` → `MatchPattern()`                                  |
| `filter.go`    | `errors.go`    | **Low**           | Only `FilterConfigError` via `WithFilterOptions`                          |
| `types.go`     | `detection.go` | **Medium**        | `IsValid()` → `AllFilterOptions()`, `Reason()` → `filterOptionToReason()` |
| `sqlc.go`      | `project.go`   | **Medium**        | `FindProjectRoot()` for parent search                                     |
| `sqlc.go`      | `errors.go`    | **Medium**        | `SQLCConfigError` type                                                    |
| `detection.go` | `types.go`     | **Low**           | Constants only (`FilterOption`, `FilterReason`)                           |
| `errors.go`    | _(none)_       | **None**          | Fully standalone                                                          |
| `pattern.go`   | _(none)_       | **None**          | Fully standalone (external dep only)                                      |
| `project.go`   | _(none)_       | **None**          | Fully standalone (stdlib only)                                            |

**Key insight:** `errors.go`, `pattern.go`, and `project.go` are **zero-coupled leaves** — they depend on nothing within the package. This is excellent module design.

---

## 3. Strengths

### 3.1 Table-Driven Detector System

The `detectors` slice is the architectural crown jewel:

```go
var detectors = []detector{
    {FilterSQLC, ReasonSQLC, matchesSQLCFilenamePattern, IsSQLCGenerated},
    {FilterTempl, ReasonTempl, matchesSuffixPattern("_templ.go"), IsTemplGenerated},
    // ... 11 entries total
}
```

Adding a new generator = adding one line. All derived lists (`AllFilterOptions`, `AllFilterReasons`, `AllGeneratorOptions`) update automatically. This eliminates an entire class of sync bugs.

### 3.2 Two-Phase Detection

```
Phase 1: filename match (zero I/O) → return early
Phase 2: content check (reads file) → only if phase 1 missed
```

This is a genuine optimization that avoids unnecessary file reads. For large codebases being scanned by linters, this matters.

### 3.3 Functional Options API

```go
f, err := NewFilter(
    WithFilterOptions(FilterAll),
    WithExcludePatterns("**/vendor/**"),
    WithFS(customFS),
)
```

Idiomatic Go. `Filter` is immutable after construction. Validation happens at construction time. Clean.

### 3.4 fs.FS Abstraction

`WithFS(fsys fs.FS)` enables testing with `fstest.MapFS` without touching the real filesystem. This is the right abstraction for a library that does I/O.

### 3.5 Error System

Three distinct error types with branded `[gogenfilter:<code>]` prefix, sentinel errors for `errors.Is`, `ErrorCoder` interface for programmatic access, and `Unwrap()` for error chains. Textbook Go error design.

### 3.6 Test Coverage

99.8% coverage with:

- Table-driven unit tests
- BDD tests (ginkgo, ~120 specs)
- Fuzz tests
- Property-based tests
- Benchmarks
- Integration tests
- Example tests (godoc)

---

## 4. Areas for Improvement

### 4.1 SQLC Module is Overweight [Severity: Low]

**Problem:** `sqlc.go` (412 lines) handles three distinct concerns:

1. Config file discovery (file walking, parent search)
2. Config parsing (YAML unmarshalling, v1→v2 conversion)
3. Output directory extraction

**Impact:** The SQLC-specific parsing logic (v1→v2 conversion, YAML struct hierarchy) adds complexity that's independent of the core detection engine.

**Recommendation:** This is acceptable for a library of this size. If SQLC parsing grows significantly, consider extracting to an `internal/sqlc` sub-package. **Current state is fine.**

### 4.2 No Extension Mechanism [Severity: Low]

**Problem:** Adding a new detector requires modifying the `detectors` table in `detection.go`. External consumers cannot add custom detectors without forking.

**Impact:** If a consumer needs to detect a proprietary code generator, they must fork or wrap.

**Recommendation:** Consider a `RegisterDetector` API in a future version:

```go
type DetectorEntry struct {
    Option       FilterOption
    Reason       FilterReason
    MatchFilename func(string) bool
    CheckContent  func(string, string) bool
}
func RegisterDetector(d DetectorEntry)
```

**Only do this when an actual consumer requests it.** Speculative generality is worse than the current simple design.

### 4.3 Detection Function Signature Inconsistency [Severity: Cosmetic]

**Problem:** `IsSQLCGenerated`, `IsTemplGenerated`, `IsProtobufGenerated` use the `filePath` parameter. Others (`IsMockgenGenerated`, `IsWireGenerated`, etc.) discard it (`_, content`). All have the same signature `(filePath, content string) bool`.

**Impact:** No functional impact — the signature is correct for the table-driven approach. But the exported API has a cosmetic inconsistency.

**Recommendation:** Accept as-is. The signature is driven by the `detector` struct's `checkContent` field, which needs a uniform type. Changing this would require a breaking API change with no functional benefit.

### 4.4 `types.go` ↔ `detection.go` Circular Awareness [Severity: Informational]

**Problem:** `types.go` defines `FilterOption.IsValid()` which calls `detection.go`'s `AllFilterOptions()`. And `detection.go` references `types.go` constants. This is a soft circular dependency at the file level (not package level — Go resolves this fine since they're in the same package).

**Impact:** None at the package level. But it means `types.go` isn't truly standalone — it needs `detection.go` to compile.

**Recommendation:** Accept as-is. This coupling is intentional and well-managed.

---

## 5. Scalability Assessment

### 5.1 Adding a New Generator (Today)

Steps to add "my-generator":

1. Add `FilterMyGenerator FilterOption = "my-generator"` to `types.go`
2. Add `ReasonMyGenerator FilterReason = "my-generator"` to `types.go`
3. Add `matchesMyGeneratorFilename` and `IsMyGeneratorGenerated` to `detection.go`
4. Add one line to `detectors` table in `detection.go`
5. Add tests

**Effort:** ~30 minutes. **Risk of forgetting something:** Low (derived lists auto-update).

### 5.2 Scaling the Detector Count

At 11 detectors, the linear scan in `getFilenameBasedReason` / `getContentBasedReason` is negligible. Even at 100+ detectors, the scan is over function pointers with early returns — O(n) but with tiny constant factor.

If detector count ever exceeds ~50, consider:

- Indexing filename patterns by suffix for O(1) lookup
- Content detection as a map lookup for the "Code generated by X" pattern

**Not needed today.**

---

## 6. Service Orientation & Composability

### 6.1 Current Composability

The library is already highly composable:

- **fs.FS** — Works with any filesystem (OS, memory, embedded, etc.)
- **Functional options** — Mix and match any combination of filters, patterns, filesystems
- **Two API levels** — `Filter` for high-level use, `DetectReason` for low-level embedding
- **No global state** — All state is in `Filter` instances

### 6.2 Composition Patterns

```go
// Pipeline: filter → lint → report
filter, _ := NewFilter(WithFilterOptions(FilterAll))
for _, path := range files {
    if filtered, _ := filter.Filter(path); filtered {
        continue
    }
    lint(path)  // consumer's own logic
}
```

The library stays out of the way. It answers one question ("is this generated?") and gets out of the consumer's pipeline. This is correct service orientation for a library.

---

## 7. Modularization Assessment

**Verdict: Do NOT modularize.**

| Signal                                     | Weight   | Assessment                                         |
| ------------------------------------------ | -------- | -------------------------------------------------- |
| Small project (7 files, 1632 source lines) | **High** | Single focused library                             |
| Single domain                              | **High** | Generated code detection — one concept             |
| Library with external consumers            | Medium   | Published to GOPROXY as v3                         |
| All code changes together                  | **High** | Detectors table couples types + detection + filter |
| Single developer                           | Medium   | Manageable coupling                                |

**Score: 3 High + 2 Medium** → Strong signal to keep as monolith.

Multi-module splitting would:

- Fragment the API consumers import (`gogenfilter.Filter` → `gogenfilter.Filter` + `gogenfilter/detection.DetectReason` + ...)
- Add go.mod overhead with no versioning benefit
- Break the table-driven system that lives in one file
- Create import path migration pain for existing consumers

**The single-package design is a feature, not a flaw.**

---

## 8. Recommendations Summary

| #   | Recommendation                                           | Priority | Effort | Impact |
| --- | -------------------------------------------------------- | -------- | ------ | ------ |
| 1   | Keep single-package design                               | —        | —      | —      |
| 2   | Add `RegisterDetector` only when requested               | Future   | Low    | Medium |
| 3   | Extract SQLC parsing to `internal/sqlc` only if it grows | Watch    | Medium | Low    |
| 4   | Accept detection function signature inconsistency        | —        | —      | —      |
| 5   | Consider content-detection optimization if 50+ detectors | Future   | Low    | Low    |

**The architecture is already close to optimal for a focused Go library of this size.**
