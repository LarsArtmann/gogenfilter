# Comprehensive Status Report — 2026-05-04 12:34

**Scope:** Full project — Go library, CI/CD, website, architecture, benchmarks integration

---

## A. FULLY DONE ✅

| Item | Detail |
|------|--------|
| Historical benchmark integration | `benchmark.yml` workflow created, `gh-pages` branch pushed, CI redundant step removed, docs updated |
| Benchmark workflow CI success | `benchmark-action/github-action-benchmark@v1` — all 3 master runs succeeded |
| Go tests | All pass, 97.4% coverage, race detector clean |
| Linter | 0 issues (golangci-lint v2) |
| Benchmarks | All 23 benchmarks pass, all hot paths sub-microsecond |
| BDD tests | 38/38 ginkgo specs passing |
| Test suite | 6,956 lines source, 5,247 lines tests (0.75:1 ratio) |
| Website build | Astro build succeeds, 20 pages generated |
| Firebase deployment | Live at `gogenfilter.lars.software` |
| GitHub Pages | Active at `larsartmann.github.io/gogenfilter/`, HTTPS enforced |
| Benchmark dashboard | Live at `larsartmann.github.io/gogenfilter/dev/bench/` with data from 3 runs |
| 11 generators | All detected: sqlc, templ, go-enum, protobuf, oapi-codegen, deepcopy-gen, wire, moq, mockgen, stringer, generic |
| Branded errors | 7 error codes, sentinel errors, `ErrorCoder`/`Helper` interfaces, `CodeEqual[T]` |
| Phantom types | 5 types: `StartPath`, `ConfigPath`, `Operation`, `ErrorMessage`, `TotalFilesChecked` |
| Pattern matching | doublestar/v4 with `*`, `**`, `?` support |
| SQLC config discovery | v1 and v2 format parsing, OS and fs.FS variants |
| Metrics | Thread-safe with RWMutex, nil-safe, `FilteredFiles()` + `FilteredBy()` |
| Planning docs | Benchmark integration plan at `docs/planning/2026-05-04_historical-benchmarks-integration.md` |
| Research docs | SQLC parsing comparison at `docs/research/2026-05-04_sqlc-config-parsing-comparison.md` |

---

## B. PARTIALLY DONE ⚠️

| Item | What's Done | What's Missing |
|------|------------|----------------|
| AGENTS.md update | CI section still mentions "benchmarks" in ci.yml description | Remove benchmark mention from ci.yml description, add benchmark.yml workflow docs |
| Website benchmarks page | Has static numbers + dashboard link | Static numbers are stale snapshot, should note they're from a specific commit |
| CI path filters | ci.yml doesn't trigger on `.github/workflows/benchmark.yml` changes | Intentional — benchmark workflow is independent, but ci.yml path list could include it for symmetry |
| Dependabot branches | 4 stale dependabot branches exist (actions/checkout-6, download-artifact-8, setup-node-6, upload-artifact-7, golangci-lint-action-9) | Need to review and merge/close |

---

## C. NOT STARTED ❌

| Item | Source | Effort |
|------|--------|--------|
| Resolve include patterns design question | TODO_LIST #1 (HIGH) | 30min |
| Performance profile with pprof | TODO_LIST #2 (MEDIUM) | 30min |
| Codecov/coverage tracking | TODO_LIST #3 (MEDIUM) | 15min |
| `//go:generate` for detector table | TODO_LIST #4 (MEDIUM) | 45min |
| `RegisterDetector()` API | TODO_LIST #5 (MEDIUM) | 60min |
| `WalkAndFilter()` bulk API | TODO_LIST #6 (MEDIUM) | 30min |
| Lighthouse audit | TODO_LIST #10 (WEBSITE) | 60min |
| Custom 404 page | TODO_LIST #11 (WEBSITE) | 30min |
| Unify FilterOption + FilterReason | Architecture review (this session) | 2-3h |
| Fix MustFilter panic losing error type | Architecture review | 15min |
| Extract magic strings in detection.go | Architecture review | 30min |
| Make MetricsMixin fields unexported | Architecture review | 30min |
| Add ErrorCode.IsValid() | Architecture review | 10min |
| Fix fileExists swallowing non-NotExist errors | Architecture review | 10min |
| Fix MatchPattern swallowing malformed pattern errors | Architecture review | 15min |
| Use isGeneratedBy consistently in detection.go | Architecture review | 10min |
| Remove ErrorMessage phantom type | Architecture review | 15min |
| Replace TotalFilesChecked phantom type with named int | Architecture review | 10min |
| Convert Operation phantom type to typed enum | Architecture review | 20min |
| Fix double-clone in FilteredFiles() | Architecture review | 10min |
| Use atomic.Int64 for TotalFilesChecked counter | Architecture review | 15min |

---

## D. TOTALLY FUCKED UP 💥

| Item | Detail |
|------|--------|
| `MustFilter` panic loses error type | `panic("gogenfilter: MustFilter error: " + err.Error())` at `filter.go:142` — callers using `recover()` cannot `errors.Is`/`errors.As` the original error. Should wrap with a typed panic value. |
| `TotalFilesChecked` exported field race condition | `MetricsMixin.TotalFilesChecked` (exported `int`) is read without lock at `metrics.go:18`, but written under `m.mu.Lock()` at `metrics.go:52`. This is a data race in concurrent usage. |
| `MatchPattern` silently returns false on malformed patterns | Both `filepath.Match` and `doublestar.Match` can error on bad patterns. Returning `false` hides config bugs from users. |
| `fileExists` swallows permission errors | Returns `false` for ANY os error, not just `IsNotExist`. `FindProjectRoot` silently skips unreadable directories. |
| `findSQLCConfigsInParent` discards `ProjectRootError` | Silently returns on ANY error from `FindProjectRoot`, including permission errors that should propagate. |
| `IsGoEnumGenerated` doesn't use `isGeneratedBy` | Inline `strings.Contains` at `detection.go:167` instead of the existing `isGeneratedBy(content, "go-enum")` helper at line 171. Inconsistent with other detectors. |
| `IsOapiGenerated` doesn't use `isGeneratedBy` | Same issue — inline `strings.Contains(content, "oapi-codegen")` at `detection.go:191`. Weaker check than other detectors. |
| SQLC error double-wrapping | `FindSQLCConfigs` wraps the error from `findSQLCConfigsInPath`, which already wraps in `sqlcFindError`. Two layers of the same error wrapper. |

---

## E. WHAT WE SHOULD IMPROVE

### Architecture

1. **Unify `FilterOption` + `FilterReason`** — They are the same underlying string with identical values for all 12 generator pairs. The `Reason()` method is just a cast. A single `DetectorID` type with sentinel values for non-generator outcomes would eliminate the dual-const-block sync burden and reduce the `detector` struct from 4 fields to 3.

2. **Encapsulate `MetricsMixin`** — Currently a half-exported struct (1 exported field, 2 unexported fields). The exported `TotalFilesChecked` has a race condition. Should be fully unexported with methods, using `atomic.Int64` for the counter.

3. **Convert `Operation` phantom type to typed enum** — It has a small fixed set of values (`"read"`, `"parse"`, `"walk"`, `"collect"`, `"find"`, `"collect-output-dirs"`). Typed constants would prevent typos and make the API self-documenting.

4. **Remove `ErrorMessage` phantom type** — Wrapping free-form strings provides no meaningful type safety. Every call site just wraps an ad-hoc literal. Replace with direct `string` parameters.

5. **Add validation to phantom type constructors** — `StartPath("")` and `ConfigPath("")` are currently valid. Adding `NewStartPath()` / `NewConfigPath()` constructors with validation would provide real safety.

### Error Handling

6. **Fix `MustFilter` to preserve error type** — Should panic with a struct wrapping the original error, not a string. Enables `recover()` callers to use `errors.Is`/`errors.As`.

7. **Fix `MatchPattern` to propagate errors** — Currently returns `false` on malformed patterns. Should return `(bool, error)` or at minimum log a warning.

8. **Fix `fileExists` to only swallow `IsNotExist`** — Permission errors, symlink errors, etc. should propagate to `FindProjectRoot`.

9. **Fix `findSQLCConfigsInParent` to distinguish "not found" from "error"** — Currently treats both the same way.

10. **Fix SQLC error double-wrapping** — `findSQLCConfigsInPath` already wraps in `sqlcFindError`; `FindSQLCConfigs` wraps again.

### Code Quality

11. **Extract magic strings in `detection.go`** — At least 15 inline string literals for content patterns, filename suffixes, and method signatures. Should be package-level constants for testability and documentation.

12. **Use `isGeneratedBy` consistently** — `IsGoEnumGenerated` and `IsOapiGenerated` bypass the helper, creating inconsistent detection strength.

13. **Extract `joinClean` helper in `sqlc.go`** — The `filepath.Join(projectRoot, ...) + filepath.Clean(...)` pattern is copy-pasted 3 times.

14. **Reduce SQLC find/parse duplication** — `FindSQLCConfigs` vs `FindSQLCConfigsFS`, and `GetSQLOutputDirs` vs `GetSQLOutputDirsFS` have near-identical logic differing only in the filesystem interface.

### Testing

15. **Add `ErrorCode.IsValid()`** — `FilterOption` and `FilterReason` have it; `ErrorCode` doesn't. Inconsistent.

16. **Add tests for malformed pattern handling** — `MatchPattern` silently returns `false` on bad patterns, but there are no tests for this behavior.

### CI/CD

17. **Add Codecov or similar coverage tracking** — Coverage is 97.4% but not tracked historically.

18. **Review and close dependabot PRs** — 5 stale dependabot branches exist.

19. **Update AGENTS.md** — CI section still references benchmark step in ci.yml (now removed), doesn't mention benchmark.yml workflow.

---

## F. Top 25 Things We Should Get Done Next

Sorted by **impact ÷ effort** (Pareto ranking):

| # | Task | Impact | Effort | Category |
|---|------|--------|--------|----------|
| 1 | Fix `MustFilter` panic to preserve error type | High | 15min | Bug |
| 2 | Fix `TotalFilesChecked` race condition (unexport field + getter) | High | 15min | Bug |
| 3 | Fix `MatchPattern` to return `(bool, error)` | High | 20min | Bug |
| 4 | Fix `fileExists` to only swallow `IsNotExist` | Medium | 10min | Bug |
| 5 | Use `isGeneratedBy` consistently in detection.go | Medium | 10min | Code quality |
| 6 | Add `ErrorCode.IsValid()` | Low | 10min | API consistency |
| 7 | Extract magic strings as constants in detection.go | Medium | 30min | Code quality |
| 8 | Fix SQLC error double-wrapping | Low | 10min | Bug |
| 9 | Update AGENTS.md with benchmark.yml docs | Medium | 5min | Docs |
| 10 | Extract `joinClean` helper in sqlc.go | Low | 10min | Code quality |
| 11 | Remove `ErrorMessage` phantom type (replace with string) | Low | 15min | Architecture |
| 12 | Replace `TotalFilesChecked` phantom type with named int | Low | 10min | Architecture |
| 13 | Convert `Operation` to typed enum constants | Medium | 20min | Architecture |
| 14 | Use `atomic.Int64` for `TotalFilesChecked` counter | Medium | 15min | Performance |
| 15 | Fix double-clone in `FilteredFiles()` | Low | 10min | Performance |
| 16 | Fix `findSQLCConfigsInParent` to propagate errors | Medium | 15min | Error handling |
| 17 | Add validation to phantom type constructors | Low | 20min | Type safety |
| 18 | Unify `FilterOption` + `FilterReason` into `DetectorID` | High | 2-3h | Architecture |
| 19 | Resolve include patterns design question | High | 30min | API design |
| 20 | Add Codecov coverage tracking | Medium | 15min | CI/CD |
| 21 | Review and close dependabot PRs | Low | 10min | Maintenance |
| 22 | Performance profile with pprof | Medium | 30min | Performance |
| 23 | `//go:generate` for detector table generation | Medium | 45min | Architecture |
| 24 | `RegisterDetector()` API for custom detectors | Medium | 60min | Feature |
| 25 | `WalkAndFilter()` bulk API | Medium | 30min | Feature |

---

## G. Top Question I Cannot Answer Myself

**Should `MatchPattern` return `(bool, error)` or should it stay `(bool)` and log warnings?**

Changing the signature is a **breaking API change** — every caller must handle the new error return. Currently `MatchPattern` is used internally by `ShouldFilter` and directly by users via the exported API. If we add an error return:

- Internal callers (`ShouldFilter`) can propagate the error (correct behavior)
- External callers who use `MatchPattern` directly will break
- Alternative: keep `(bool)` signature, log a warning via `slog` on malformed patterns, and document the behavior

This is a **business decision**: is the API stability promise (pre-v1.0.0 but still used by consumers) worth more than correct error propagation? I cannot decide this without understanding the downstream consumers.

---

## Project Health Summary

| Metric | Value | Status |
|--------|-------|--------|
| Test coverage | 97.4% | ✅ |
| Race detector | Clean | ✅ |
| Linter | 0 issues | ✅ |
| Benchmarks | 23 passing | ✅ |
| BDD specs | 38/38 | ✅ |
| Website build | 20 pages | ✅ |
| Source lines | 6,956 | — |
| Test lines | 5,247 | — |
| Test:source ratio | 0.75:1 | ✅ |
| Benchmark dashboard | Live, 3 data points | ✅ |
| GitHub Pages | Active, HTTPS | ✅ |
| Firebase | Live | ✅ |
| Data races (known) | 1 (`TotalFilesChecked`) | 💥 |
| Silent error swallowing | 3 instances | 💥 |
| API consistency gaps | 2 instances | ⚠️ |
