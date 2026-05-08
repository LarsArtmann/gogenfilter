# Brutal Self-Review & Comprehensive Execution Plan

**Date:** 2026-05-08 01:15
**Mode:** READ, UNDERSTAND, RESEARCH, REFLECT
**Branch:** `master` (clean)

---

## Self-Review Answers

### 1. What did you forget?

- **Filter() perf is actually fine** — benchmark shows 18.62 ns/op, not the 243ns from old reports. Previous reports were FUD from ginkgo+count=5 incompatibility. The regression was never real.
- **`errors.As` migration is DONE** — All 7 remaining uses are `errors.AsType`. Previous reports lied about this.
- **FEATURES.md still lists context methods as FULLY_FUNCTIONAL** — advertising lies we plan to delete.
- **FEATURES.md still lists phantom types as FULLY_FUNCTIONAL** — more lies.
- **`report/` and `reports/` directories** contain stale `coverage.out` artifacts committed to the repo.

### 2. What is stupid?

- **Phantom types** — `StartPath`, `ConfigPath`, `Operation`, `ErrorMessage` wrap `string` and add zero type safety. Public API accepts `string`, casts internally. The doc says "compile-time guarantees" — it's a lie.
- **Context methods** — `FilterContext`, `FilterDetailedContext`, `FilterPathsContext` check `ctx.Err()` before/after synchronous I/O. They promise cancellation they cannot deliver.
- **Error system overengineering** — `errorCodeDefs` table, `AllErrorCodes()`, `CodeHelp()`, `Helper` interface, `CodeEqual[T]` generic = ~100 lines of machinery that nobody uses externally. Help text should just be in `Error()` strings.
- **Over-exported detection helpers** — `MatchesSQLCFilename`, `HasSQLCContent`, `HasSQLCCodePatterns` are internal helpers exposed as public API.
- **88 exported symbols** for a library that should have ~30.
- **`coverage_test.go`** — tests unexported functions (`unmarshalSQLCConfig`, `parseV1AsV2`) and inflates coverage.

### 3. What could you have done better?

- Should have deleted phantom types and context methods alongside metrics — not left them as "TODO".
- Error system should have been simple from the start — sentinel errors + `ErrorCoder` is enough.
- `codeGeneratedPrefix` should live in `detection.go`, not `types.go`.
- `allSpecificOptions()` + `allDetectorOptions()` should be one function.

### 4. What could you still improve?

- **Delete phantom types** — replace with plain `string` in error structs.
- **Delete context methods** — they're lies.
- **Simplify error system** — remove errorCodeDefs, AllErrorCodes, CodeHelp, Helper, CodeEqual.
- **Unexport detection helpers** — they're internal.
- **Move codeGeneratedPrefix** to detection.go.
- **Merge allSpecificOptions + allDetectorOptions**.
- **Delete coverage_test.go** — move useful SQLC parse tests to sqlc_test.go.
- **Merge BDD test files** — two files for one test style.
- **Update FEATURES.md** — remove entries for things we're deleting.
- **Update website docs** — remove context methods, phantom types from API docs.
- **Clean up repo artifacts** — `report/`, `reports/` directories.

### 5. Did you lie?

Previous status reports claimed:

- "Filter() went from 77ns to 243ns" — **LIE**. Benchmark shows 18.62ns. The 243ns was from ginkgo incompatibility with `-count=5`.
- "2 `errors.As` calls remain" — **LIE**. All uses are already `errors.AsType`.

### 6. How can we be less stupid?

- Stop building lookup tables nobody queries.
- Stop wrapping strings in types that provide zero compile-time safety.
- Stop exporting internal helpers.
- Stop testing unexported functions.

### 7. Ghost systems?

- `CodeEqual[T]` generic — only used internally by `Is()` methods on error types. Nobody calls it externally. It's a ghost.
- `Helper` interface — only implemented by error types, never used by consumers.
- `AllErrorCodes()` — derived from errorCodeDefs but nobody iterates all error codes.

### 8. Scope creep?

- SQLC config discovery (FindSQLCConfigs, GetSQLOutputDirs, etc.) is a significant subsystem. It's useful but consider whether it belongs in a "filter generated code" library or should be its own package.

### 9. Did we remove something useful?

- Metrics removal was correct. Nobody used it.

### 10. Split brains?

- `codeGeneratedPrefix` defined in `types.go` but only used in `detection.go`.
- `allSpecificOptions()` and `allDetectorOptions()` are nearly identical — differ only by one `if` condition.
- Error help text lives in `errorCodeDefs` table but error messages live in `Error()` methods — two places for one concern.

### 11. How are we doing on tests?

- 97.9% coverage — inflated by `coverage_test.go` testing unexported internals.
- 7,109 test lines for 1,855 source lines (3.8:1 ratio).
- Test duplication: same scenarios in BDD + regular tests + coverage tests.
- Target: ~5,000 test lines, honest coverage ~95%.

---

## Execution Plan

Sorted by impact × effort (Pareto order). Each task ≤ 12 min.

### Phase 1: Quick Wins (51% impact, 4% effort)

| #   | Task                                                                  | Impact | Effort | File(s)                           |
| --- | --------------------------------------------------------------------- | ------ | ------ | --------------------------------- |
| 1   | Delete `FilterContext`, `FilterDetailedContext`, `FilterPathsContext` | High   | 8min   | filter.go                         |
| 2   | Delete context method tests                                           | Medium | 5min   | filter_test.go                    |
| 3   | Delete context method BDD entries                                     | Medium | 5min   | bdd_test.go                       |
| 4   | Delete context method examples                                        | Low    | 3min   | example_test.go                   |
| 5   | Delete `phantom.go` + `phantom_test.go` entirely                      | High   | 5min   | phantom.go, phantom_test.go       |
| 6   | Replace phantom types with `string` in error structs                  | High   | 8min   | errors.go, project.go, sqlc.go    |
| 7   | Update error struct tests (remove phantom type refs)                  | Medium | 5min   | errors_test.go, coverage_test.go  |
| 8   | Update BDD tests (remove phantom type refs)                           | Medium | 5min   | bdd_test.go, bdd_extended_test.go |
| 9   | Unexport `MatchesSQLCFilename` → `matchesSQLCFilename`                | Medium | 3min   | detection.go, sqlc_test.go        |
| 10  | Unexport `HasSQLCContent` → `hasSQLCContent`                          | Medium | 3min   | detection.go                      |
| 11  | Unexport `HasSQLCCodePatterns` → `hasSQLCCodePatterns`                | Medium | 3min   | detection.go                      |

### Phase 2: Error System Simplification (20% impact, 10% effort)

| #   | Task                                                    | Impact | Effort | File(s)                         |
| --- | ------------------------------------------------------- | ------ | ------ | ------------------------------- |
| 12  | Remove `errorCodeDefs`, `AllErrorCodes()`, `CodeHelp()` | High   | 8min   | errors.go                       |
| 13  | Remove `Helper` interface                               | Medium | 3min   | errors.go                       |
| 14  | Remove `CodeEqual[T]` generic                           | Medium | 3min   | errors.go                       |
| 15  | Replace `CodeEqual` calls with direct `==` on `.Code`   | Medium | 5min   | errors.go                       |
| 16  | Remove `AllErrorCodes` tests and `CodeHelp` tests       | Medium | 5min   | errors_test.go, example_test.go |
| 17  | Move help text into `Error()` strings directly          | Medium | 5min   | errors.go                       |

### Phase 3: Code Organization (10% impact, 5% effort)

| #   | Task                                              | Impact | Effort | File(s)                |
| --- | ------------------------------------------------- | ------ | ------ | ---------------------- |
| 18  | Move `codeGeneratedPrefix` to `detection.go`      | Low    | 3min   | types.go, detection.go |
| 19  | Merge `allSpecificOptions` + `allDetectorOptions` | Low    | 5min   | detection.go, types.go |

### Phase 4: Test Cleanup (15% impact, 15% effort)

| #   | Task                                                      | Impact | Effort | File(s)           |
| --- | --------------------------------------------------------- | ------ | ------ | ----------------- |
| 20  | Delete `coverage_test.go` entirely                        | High   | 3min   | coverage_test.go  |
| 21  | Move SQLC parse tests to `sqlc_test.go` from coverage     | Medium | 5min   | sqlc_test.go      |
| 22  | Remove tests of unexported detection internals            | Medium | 8min   | detection_test.go |
| 23  | Merge `bdd_extended_test.go` into `bdd_test.go`           | Medium | 10min  | bdd_test.go       |
| 24  | Update `example_test.go` — remove context method examples | Low    | 3min   | example_test.go   |
| 25  | Remove phantom type and CodeHelp/AllErrorCodes examples   | Low    | 3min   | example_test.go   |

### Phase 5: Documentation Sync (5% impact, 10% effort)

| #   | Task                                              | Impact | Effort | File(s)           |
| --- | ------------------------------------------------- | ------ | ------ | ----------------- |
| 26  | Update `FEATURES.md` — remove deleted features    | High   | 5min   | FEATURES.md       |
| 27  | Update `AGENTS.md` — reflect simplified API       | Medium | 8min   | AGENTS.md         |
| 28  | Remove stale `reports/` and `report/` directories | Low    | 2min   | reports/, report/ |

### Phase 6: Verification (essential)

| #   | Task                                    | Impact | Effort | File(s) |
| --- | --------------------------------------- | ------ | ------ | ------- |
| 29  | Run full test suite + linter + vet      | High   | 3min   | —       |
| 30  | Run benchmarks — verify no regression   | Medium | 3min   | —       |
| 31  | Verify `go doc` shows clean API surface | Medium | 2min   | —       |

---

## D2 Execution Graph

```d2
direction: right

title: gogenfilter Overhaul — Execution Flow

phase1: Phase 1 — Quick Wins {
  shape: group
  style.fill: "#e8f5e9"

  delete_ctx: Delete Context Methods {
    tasks: [
      "Delete FilterContext/FilterDetailedContext/FilterPathsContext",
      "Delete context tests in filter_test.go",
      "Delete context BDD entries in bdd_test.go",
      "Delete context examples in example_test.go"
    ]
  }

  delete_phantom: Delete Phantom Types {
    tasks: [
      "Delete phantom.go + phantom_test.go",
      "Replace phantom types with plain string",
      "Update error struct tests",
      "Update BDD tests"
    ]
  }

  unexport: Unexport Detection Helpers {
    tasks: [
      "MatchesSQLCFilename → matchesSQLCFilename",
      "HasSQLCContent → hasSQLCContent",
      "HasSQLCCodePatterns → hasSQLCCodePatterns"
    ]
  }
}

phase2: Phase 2 — Error Simplification {
  shape: group
  style.fill: "#e3f2fd"

  simplify: Simplify Error System {
    tasks: [
      "Remove errorCodeDefs + AllErrorCodes + CodeHelp",
      "Remove Helper interface",
      "Remove CodeEqual[T] generic",
      "Move help text into Error() strings"
    ]
  }
}

phase3: Phase 3 — Organization {
  shape: group
  style.fill: "#fff3e0"

  organize: Code Organization {
    tasks: [
      "Move codeGeneratedPrefix to detection.go",
      "Merge allSpecificOptions + allDetectorOptions"
    ]
  }
}

phase4: Phase 4 — Test Cleanup {
  shape: group
  style.fill: "#fce4ec"

  cleanup: Test Cleanup {
    tasks: [
      "Delete coverage_test.go",
      "Move SQLC parse tests to sqlc_test.go",
      "Remove tests of unexported internals",
      "Merge bdd_extended into bdd_test.go",
      "Update example_test.go"
    ]
  }
}

phase5: Phase 5 — Documentation {
  shape: group
  style.fill: "#f3e5f5"

  docs: Documentation Sync {
    tasks: [
      "Update FEATURES.md",
      "Update AGENTS.md",
      "Remove stale reports/ directory"
    ]
  }
}

phase6: Phase 6 — Verification {
  shape: group
  style.fill: "#fffde7"

  verify: Verification {
    tasks: [
      "go test ./... + go vet + golangci-lint",
      "Run benchmarks",
      "Verify go doc surface"
    ]
  }
}

phase1 -> phase2: "API surface cleaned"
phase2 -> phase3: "Errors simplified"
phase3 -> phase4: "Code organized"
phase4 -> phase5: "Tests clean"
phase5 -> phase6: "Docs synced"
```

---

## Metrics

| Metric         | Before (now) | Target |
| -------------- | ------------ | ------ |
| Source lines   | 1,855        | ~1,650 |
| Test lines     | 7,109        | ~5,500 |
| Test:Source    | 3.8:1        | 3.3:1  |
| Exports        | 88           | ~55    |
| Coverage       | 97.9%        | ~95%   |
| Filter() ns/op | 18.62        | ≤ 19   |
| Files (source) | 8            | 7      |
| Files (test)   | 24           | 21     |
