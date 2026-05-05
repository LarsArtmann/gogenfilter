# Composition & Branded Types Review — gogenfilter

**Date:** 2026-05-05
**Focus:** Go composition patterns, branded types, `errors.AsType` (Go 1.26) adoption

---

## Composition

The codebase uses composition well overall:

- **`Filter`** composes `fs.FS`, `Metrics`, patterns — no inheritance
- **Functional options pattern** (`FilterConfig` closures) — idiomatic Go composition
- **Table-driven `detector` struct** with function fields — clean composition over inheritance
- **`ErrorCoder` / `Helper` interfaces** — behavioral composition, any error type can implement them

### One smell: `MetricsMixin`

`metrics.go:17-21` — `MetricsMixin` is embedded in both `Metrics` (mutable, has mutex) and `FilterStats` (immutable snapshot). This is embedding-as-inheritance: `Metrics` "is a" `MetricsMixin` and `FilterStats` "is a" `MetricsMixin`.

The mixin has unexported fields (`filteredByReason`, `filteredFiles`) which enforces encapsulation, so it works — but it's the classical "is-a" pattern, not composition. A cleaner approach would be for `FilterStats` to hold a standalone value type with public methods, and `Metrics` to produce snapshots without sharing the embedded type.

**Verdict:** Low priority — it works and the unexported fields protect invariants. Not worth a refactor unless the metrics system grows significantly.

---

## Branded Types

### What's done well

- **Phantom types** (`StartPath`, `ConfigPath`, `Operation`, `ErrorMessage`, `TotalFilesChecked`) — prevent mixing semantically different strings/ints at compile time
- **`ErrorCode` branded string** with `[gogenfilter:<code>]` prefix — consistent, parseable
- **`CodeEqual[T]` generic** — type-safe comparison across error types
- **Table-derived enums** — `AllFilterOptions()`, `AllGeneratorOptions()`, `AllFilterReasons()`, `AllErrorCodes()` all derived from their respective source tables

### What could improve with `errors.AsType` (Go 1.26)

#### 1. Manual `Is()` methods are standard but could coexist more clearly with `AsType`

All three error types have identical `Is()` implementations:

```go
func (e *ProjectRootError) Is(target error) bool {
    t, ok := target.(*ProjectRootError)
    if !ok {
        return false
    }
    return CodeEqual(e, t)
}
```

This pattern — type-assert, then compare codes — is the Go 1.13–1.25 idiom for sentinel matching via `errors.Is`. The Go 1.26+ idiom is `errors.AsType` extraction. Both coexist fine:

- **`errors.Is(err, ErrProjectRootNotFound)`** — "is this a project-root-not-found error?" (sentinel matching)
- **`errors.AsType[*ProjectRootError](err)`** — "give me the concrete error so I can inspect fields" (type extraction)

**Verdict:** Keep `Is()` for backward compatibility and `errors.Is` support. No change needed.

#### 2. Two test files still use `errors.As` instead of `errors.AsType`

Despite AGENTS.md claiming _"All code and tests use `errors.AsType[T]` exclusively. No `errors.As` calls remain"_:

| File             | Line | Current                   |
| ---------------- | ---- | ------------------------- |
| `bdd_test.go`    | 134  | `errors.As(err, &cfgErr)` |
| `filter_test.go` | 217  | `errors.As(err, &cfgErr)` |

These should be migrated to `errors.AsType[*FilterConfigError](err)` for consistency.

#### 3. `CodeEqual[T]` is valid but narrowly used

```go
func CodeEqual[T interface{ ErrorCode() ErrorCode }](e, target T) bool {
    return e.ErrorCode() == target.ErrorCode()
}
```

In practice, `CodeEqual` is only called from the three `Is()` methods. With `errors.AsType`, callers extract the concrete type and can compare `.Code` directly. `CodeEqual` is still useful for generic code, but its public API value is marginal.

**Verdict:** Keep — it's correct, used internally, and removing it would be a breaking change. But worth noting it's primarily an internal utility exposed publicly.

---

## Findings

| Area                     | Status                          | Action                                         |
| ------------------------ | ------------------------------- | ---------------------------------------------- |
| Composition overall      | Good                            | No changes needed                              |
| `MetricsMixin` embedding | Mild inheritance-as-composition | Acceptable, low priority                       |
| Phantom types            | Excellent                       | No changes needed                              |
| `Is()` / sentinels       | Valid                           | Keep for `errors.Is` compatibility             |
| `errors.As` in tests     | **2 remaining**                 | Migrate to `errors.AsType`                     |
| AGENTS.md claim          | **Inaccurate**                  | Says "no `errors.As` calls remain" but 2 exist |
| `CodeEqual[T]`           | Valid                           | Keep, primarily internal utility               |
