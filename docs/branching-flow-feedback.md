# branching-flow Context Analysis Feedback — gogenfilter

**Date:** 2026-05-05
**Tool version:** branching-flow `context` subcommand
**Target project:** gogenfilter (Go library)
**Overall score given:** 86.8/100 (Fair)

---

## Executive Summary

The tool found 25 error paths (1 critical, 30 medium). After manual review:

| Category | Count | Verdict |
|---|---|---|
| Worth fixing | 4 | Genuinely missing useful context |
| Intentional / acceptable | 11 | Already has sufficient context via wrapped errors |
| Noise / wrong suggestion | 15 | Would degrade the error messages or is factually incorrect |

**Real quality score:** ~95/100. The 86.8 score is artificially low due to false positives from the tool not understanding error wrapping chains, branded error types, or which context variables are actually meaningful.

---

## False Positive Patterns (Tool Limitations)

These are systemic issues that, if fixed, would dramatically improve accuracy.

### 1. Does Not Trace Through Error Wrapping Chains

The tool flags `err` propagation as "losing context" even when the callee already wraps all relevant context into the error.

**Example — `filter.go:429`:**
```go
// Flagged as CRITICAL — "loses trace, filePath, patternMatched, reason"
result, err := f.shouldFilterDetailedByDetection(filePath)
if err != nil {
    return FilterResult{...}, err
}
```

But `shouldFilterDetailedByDetection` calls `detectReasonFSWithTrace` which calls:
```go
// detection.go:442-444 — already wraps filePath
return FilterResult{...}, fmt.Errorf("read file %q: %w", filePath, err)
```

The `filePath` is already in the error chain. The tool sees the propagation site in isolation and doesn't trace that the callee already provides the context. This accounts for many "medium" findings.

**Impact:** This is the #1 source of false positives. The tool should either:
- Trace error wrapping through the call graph, OR
- Reduce severity when the variable is already present in the callee's error construction

### 2. Does Not Understand Branded/Structured Error Types

The tool sees `sqlcFindError(path, err)` and flags it as losing `path`. But `sqlcFindError` creates a structured `SQLCConfigError` with `ConfigPath(path)`, `Operation("find")`, and `ErrorMessage(...)`. The `path` is emphatically NOT lost — it's stored in a typed field.

**Example — `sqlc.go:138`:**
```go
// Flagged: "Context variable 'path' not included in error"
return sqlcFindError(path, err)

// But sqlcFindError is:
func sqlcFindError(path string, err error) *SQLCConfigError {
    return newSQLCConfigError(
        CodeSQLCConfigFind,
        ConfigPath(path),        // <-- path IS here
        Operation("find"),
        ErrorMessage(fmt.Sprintf("finding sqlc configs in %q", path)),
        err,
    )
}
```

**Affected lines:** `sqlc.go:138, 160, 384, 395, 403` — all use branded error constructors.

**Fix:** The tool should recognize functions that construct errors and include their parameters. Even a simple heuristic like "if the function name ends in `Error` and takes the flagged variable as a parameter, assume it's included" would help.

### 3. Suggests Meaningless Context Variables

Several suggestions would produce nonsensical error messages:

| Variable | Type | Suggested output | Why it's wrong |
|---|---|---|---|
| `fsys` | `fs.FS` | `&fstest.MapFS{...}` | Internal implementation detail, not actionable |
| `opts` | `map[FilterOption]struct{}` | `map[{}]` | Empty struct map is noise |
| `target` | `any` (YAML decode target) | `&{Version:}` | Intermediate decode target |
| `errMsg` | `string` | Already IS the `ErrorMessage` phantom param | Double-inclusion |
| `trace` | `string` | `""` (empty at error site) | Not yet populated |
| `version` | `struct{Version string}` | Internal dispatch detail | Raw struct is noise |

**Affected lines:** `sqlc.go:227, 246, 257, 262, 363, 373, 395`, `detection.go:267, 326, 442`, `filter.go:365, 429`

**Fix:** The tool should filter out:
- Variables whose type is `fs.FS`, `io.Reader`, `any`, or empty-string variables
- Variables already passed to the error-constructing function as a parameter
- Variables that are internal implementation details (not caller-actionable)

### 4. Flags Variables That Are Already In The Error Message

**Example — `sqlc.go:262`:**
```go
// Flagged: "Context variable 'version' not included in error"
return nil, newSQLCConfigError(
    ...
    ErrorMessage(fmt.Sprintf("unsupported sqlc config version %q", version.Version)),
    //                                         ^^^^^^^^^^^^^^^^ version IS here
    nil,
)
```

The `version.Version` string is literally in the error message. The tool sees the struct variable `version` and doesn't realize its data is already incorporated.

**Fix:** Simple string matching — if the variable name appears in a `fmt.Sprintf` or string concatenation in the same error expression, don't flag it.

### 5. Does Not Recognize Walk Callback Context

**Example — `sqlc.go:150`:**
```go
// Flagged: "Context variable 'path' lost in immediate generic error"
filepath.WalkDir(path, func(filePath string, d os.DirEntry, err error) error {
    if err != nil {
        return fmt.Errorf("accessing %q: %w", filePath, err)
        // filePath is the SPECIFIC file that errored — more precise than path
    }
})
```

The tool suggests adding `path` (the walk root), but `filePath` (the specific file) is more useful. Including both would be redundant in most cases — the walk root is obvious from the file path hierarchy.

---

## Genuine Findings Worth Fixing

### 4 context-check error messages missing `filePath`

**Lines:** `filter.go:226, 238, 273, 283`

```go
// Current:
return ..., fmt.Errorf("context check: %w", err)

// Better:
return ..., fmt.Errorf("context check for %q: %w", filePath, err)
```

During batch processing with `FilterPathsContext`, knowing which file was being processed when context was cancelled is genuinely useful. These are real findings.

### 2 bare `err` returns could add call-site context (low priority)

**Lines:** `filter.go:365, 429`

The callee already wraps `filePath`, so these aren't "losing" context. But adding a wrapping layer for call-site identification is a defensible practice for library code:

```go
return false, fmt.Errorf("detect generated code for %q: %w", filePath, err)
```

Low priority because the inner error already contains the file path.

---

## Scoring Feedback

The quality score of 86.8/100 feels too low for this codebase. The main drivers:

1. **The critical finding (40/100) is a false positive** — `filePath` is already in the error chain via the callee. This single false finding pulls the score down significantly.

2. **Medium findings are scored 90/100 each** but there are 30 of them (many from the same root cause counted multiple times). The aggregate drag is disproportionate.

3. **No credit for the branded error system.** The `SQLCConfigError` with phantom types (`ConfigPath`, `Operation`, `ErrorMessage`) is actually a strength — it provides structured, type-safe error context that's better than ad-hoc `fmt.Errorf` wrapping. The tool penalizes it because it doesn't understand the pattern.

**Suggestion:** Consider:
- Deduplicating findings that stem from the same root cause
- Weighting by whether the context variable is actually recoverable from the error chain
- Giving credit for structured error types

---

## Summary of Improvement Suggestions for branching-flow

| Priority | Improvement | Impact |
|---|---|---|
| High | Trace error wrapping through call graph (even 1 level) | Eliminates ~40% of false positives |
| High | Recognize error-constructor functions (names ending in `Error`, returning error types) | Eliminates ~25% of false positives |
| Medium | Filter out meaningless variable types (`fs.FS`, `any`, `io.Reader`, empty strings) | Eliminates ~20% of noise |
| Medium | Check if variable is already used in `fmt.Sprintf` in the same expression | Eliminates ~10% of false positives |
| Low | Deduplicate findings from same root cause | Improves scoring accuracy |
| Low | Give credit for structured/branded error types | Fairer scoring |
