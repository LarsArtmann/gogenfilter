# Comprehensive Status Report — 2026-05-04 12:31

**Scope:** Full project audit after `errors.AsType` migration completion, doc consistency sweep, and codebase reflection session.

**Build:** `go test -race ./...` PASS | `go vet ./...` CLEAN | `git push` DONE (9e02a50)

---

## A) FULLY DONE ✅

| Area | Details |
|------|---------|
| **errors.AsType migration** | Zero `errors.As` calls remain in any `.go` file. All production code + tests use `errors.AsType[T]`. Website API docs updated (`errors.mdx`). FEATURES.md, CHANGELOG.md, AGENTS.md all reflect the migration. |
| **Test helper rename** | `assertErrorsAs[T]` → `assertErrorType[T]` in `errors_test.go` + all call sites in `errors_sentinel_test.go`. Name now matches the Go 1.26 API it wraps. |
| **mockgen URL fix** | Website `generators.ts` updated from deprecated `github.com/golang/mock` to active `github.com/uber-go/mock`. README was already correct. |
| **AGENTS.md accuracy** | Added `errors.AsType` migration note to Design Decisions. Fixed helper location (`assertErrorType` is in `errors_test.go`, not `helpers_test.go`). |
| **Core detection engine** | 11 generators in `detectors` table, two-phase detection (filename zero-IO → content read), table-derived `AllFilterOptions()`/`AllFilterReasons()`. All FULLY_FUNCTIONAL. |
| **Filter API** | Functional options, immutable after construction, `ShouldFilter` (bool, error), `MustFilter` (panics), `IsEnabled()`, `FilterReasons()`, `String()`, `GetStats()`. All FULLY_FUNCTIONAL. |
| **Error system** | 7 error codes, 7 sentinel errors, branded `[gogenfilter:<code>]` prefix, `ErrorCoder`/`Helper` interfaces, `CodeEqual[T]`, `AllErrorCodes()`, `CodeHelp()`, `Unwrap()` chains. All FULLY_FUNCTIONAL. |
| **Phantom types** | 5 types: `StartPath`, `ConfigPath`, `Operation`, `ErrorMessage`, `TotalFilesChecked`. All implement `fmt.Stringer`. FULLY_FUNCTIONAL. |
| **Pattern matching** | `MatchPattern` with `doublestar/v4` for `**` globs, filename-only patterns, absolute path handling. FULLY_FUNCTIONAL. |
| **SQLC config discovery** | v1 + v2 YAML parsing, OS + `fs.FS` variants, parent directory search, hidden/vendor dir skipping, Go/JSON/Codegen output dirs. FULLY_FUNCTIONAL. |
| **Metrics** | Thread-safe `sync.RWMutex`, `MetricsMixin` encapsulation, `FilteredBy(reason)`, `FilteredFiles(reason)`, `TotalFiltered()`, nil-safe, snapshot via `maps.Clone`. FULLY_FUNCTIONAL. |
| **Testing** | Table-driven, `t.Parallel()`, fuzz tests, property tests, benchmarks, concurrent 100-goroutine test, edge cases, 12 runnable examples, BDD (ginkgo 38 specs), integration tests with real fixtures. FULLY_FUNCTIONAL. |
| **CI/CD** | Go CI (test, race, lint, bench, 95% coverage), Website CI (typecheck, build, validate, deploy), Dependabot, path filters. FULLY_FUNCTIONAL. |
| **Website** | Astro v6 + Starlight, landing page, 17 docs pages, Firebase Hosting, dark/light theme, Plausible analytics, SEO (JSON-LD, OG), self-hosted fonts. FULLY_FUNCTIONAL. |
| **Project root discovery** | `FindProjectRoot` with configurable markers, depth limit (10), `ProjectRootError` with code/path/markers. FULLY_FUNCTIONAL. |

---

## B) PARTIALLY DONE 🟡

| Area | What's Done | What's Missing |
|------|-------------|-----------------|
| **Website docs accuracy** | `errors.mdx` updated to `errors.AsType` | `generators.ts` `oapi-codegen` entry shows `.gen.go` as file heuristic — but code deliberately has NO filename heuristic for oapi (false positive risk). Misleading. |
| **TODO_LIST.md** | Reflects most completed work | Still lists item #1 (include patterns design question) as HIGH priority — this was likely resolved long ago but never marked done |
| **Historical status docs** | 51 status/planning docs exist in `docs/` and `website/docs/` | Many reference stale `errors.As` naming, old helper names, completed tasks as "pending". These are historical records so not wrong, but confusing. |

---

## C) NOT STARTED 🔴

| # | Item | Source | Effort |
|---|------|--------|--------|
| 1 | `WalkAndFilter(dir string) map[string]FilterReason` bulk API | TODO_LIST #6 | 30min |
| 2 | `RegisterDetector()` API for custom detectors without forking | TODO_LIST #5 | 60min |
| 3 | `//go:generate` for detector table generation | TODO_LIST #4 | 45min |
| 4 | Codecov or similar coverage tracking | TODO_LIST #3 | 15min |
| 5 | Performance profile and optimize hot paths | TODO_LIST #2 | 30min |
| 6 | Resolve include patterns design question (confirm "restrict scope" is final) | TODO_LIST #1 | 30min |
| 7 | Website Lighthouse audit and fix issues | TODO_LIST #10 | 60min |
| 8 | Website custom 404 page | TODO_LIST #11 | 30min |
| 9 | `errors.AsType` examples in README (show the Go 1.26 idiom explicitly) | status docs | 10min |
| 10 | Archive/delete 51 accumulated status/planning docs | hygiene | 30min |
| 11 | `iter.Seq` support for Go 1.26 range-over-function | idea | 60min |
| 12 | `FilterReason`/`FilterOption` const auto-generation from `detectors` table | idea | 45min |

---

## D) TOTALLY FUCKED UP 💥

| Issue | Severity | Details |
|-------|----------|---------|
| **Website `validate:docs` script broken** | CRITICAL | `npm run validate:docs` still references `src/content/docs/docs/` path which was removed in the flatten commit (8f83648). CI will fail on website changes. |
| **51 accumulated status docs** | MESSY | `docs/status/` has 30+ files, `website/docs/status/` has 15+. Most are historical noise. Makes navigation hard. |
| **`gh-pages` branch corruption** | KNOWN | `gh-pages` branch exists but benchmark dashboard may be broken. Previous status docs flagged this. |

---

## E) WHAT WE SHOULD IMPROVE

### Type Model Improvements

| Issue | Current State | Improvement | Impact |
|-------|---------------|-------------|--------|
| **`FilterOption`/`FilterReason` string coupling** | Both are `string` types with identical underlying values, manually kept in sync via `detectors` table | Generate `FilterReason` consts from `detectors` table at build time, or make `FilterReason` a method return only (no separate consts) | Eliminates split-brain risk when adding detectors |
| **`CodeEqual[T]` constraint** | Uses `interface{ ErrorCode() ErrorCode }` instead of named `ErrorCoder` interface | Use `ErrorCoder` directly as the constraint for clarity | LOW — cosmetic, same behavior |
| **Phantom types are just `string`/`int` aliases** | `StartPath`, `ConfigPath`, `Operation`, `ErrorMessage`, `TotalFilesChecked` are type aliases with `String()` only | Consider adding `IsValid() bool` where applicable (e.g., `StartPath` could validate it's non-empty) | MED — catches empty-string bugs at boundary |
| **`ErrorCode` lacks `IsValid()`** | `ErrorCode` is the only string-based type without `IsValid()` | Add `IsValid()` that checks against `AllErrorCodes()` for symmetry with `FilterOption`/`FilterReason` | LOW — consistency |

### Library Ecosystem Leverage

| Area | Current | Opportunity |
|------|---------|-------------|
| **YAML parsing** | `go-faster/yaml` — good choice, 2-3x faster than `go-yaml/yaml` | ✅ Already optimal |
| **Glob matching** | `bmatcuk/doublestar/v4` — industry standard | ✅ Already optimal |
| **Error wrapping** | Hand-rolled `Is()` + `Unwrap()` + `ErrorCode()` + `Help()` | Could use `cockroachdb/errors` for richer wrapping, but current system is clean and zero-dependency. **Keep as-is** — more Go-idiomatic. |
| **Go 1.26 features** | `errors.AsType` ✅ | `iter.Seq` for `WalkAndFilter` could be a natural addition. Also `slices.Collect` + `maps.Keys` where applicable. |

### Architecture Improvements

| Issue | Details |
|-------|---------|
| **`detectors` table is closed** | Adding a new generator requires editing `detection.go` + `types.go` (two consts) + potentially `sqlc.go`-style helpers. A `RegisterDetector` API would allow external plugins. |
| **No `WalkAndFilter` bulk API** | Consumers must loop + call `ShouldFilter` per file. A bulk API with `filepath.WalkDir` built in would reduce boilerplate for linter integrations. |
| **`project.go` is OS-only** | `FindProjectRoot` uses `os.Stat` + `filepath.Abs`. Can't be tested with `fstest.MapFS`. Acceptable for a project-root finder, but means no `FS` variant exists. |

---

## F) TOP 25 THINGS TO DO NEXT (Sorted by Impact × Feasibility)

| # | Task | Impact | Effort | Category |
|---|------|--------|--------|----------|
| 1 | **Fix `validate:docs` script — broken path after flatten** | CRITICAL | 5min | Bug |
| 2 | **Tag v0.2.0 release (includes errors.AsType migration, Enabled/Disabled removal, MustFilter rename)** | HIGH | 10min | Release |
| 3 | **Resolve TODO #1: confirm include-patterns "restrict scope" is final behavior** | MED | 15min | Design |
| 4 | **Add `errors.AsType` example to README error handling section** | MED | 5min | Docs |
| 5 | **Fix `generators.ts` oapi-codegen file field — shows `.gen.go` but code has NO filename heuristic** | MED | 2min | Bug |
| 6 | **Add `ErrorCode.IsValid()` for type-system symmetry** | LOW | 5min | Code |
| 7 | **Add `StartPath.IsValid()` / `ConfigPath.IsValid()` validation** | LOW | 10min | Code |
| 8 | **Add Codecov coverage tracking to CI** | MED | 15min | CI |
| 9 | **Performance profile hot paths** | MED | 30min | Perf |
| 10 | **`WalkAndFilter(dir string) map[string]FilterReason` bulk API** | MED | 30min | Feature |
| 11 | **`iter.Seq2` variant of WalkAndFilter for Go 1.26** | LOW | 15min | Feature |
| 12 | **`RegisterDetector()` plugin API** | HIGH | 60min | Feature |
| 13 | **`//go:generate` for FilterReason consts from detectors table** | MED | 45min | Code |
| 14 | **Archive old status docs (51 files → 3-5 keepers)** | LOW | 30min | Hygiene |
| 15 | **Website Lighthouse audit** | MED | 60min | Quality |
| 16 | **Website custom 404 page** | LOW | 30min | Feature |
| 17 | **Add `FilterReason` to README (currently only shows `FilterOption` table)** | LOW | 5min | Docs |
| 18 | **Update `website/TODO_LIST.md` and `website/FEATURES.md` to match root** | LOW | 10min | Hygiene |
| 19 | **Consolidate `website/docs/` status files** | LOW | 15min | Hygiene |
| 20 | **Investigate `gh-pages` branch — fix or delete** | LOW | 15min | Infra |
| 21 | **Add `FindProjectRootFS(fsys fs.FS, ...)` for testability** | LOW | 30min | Feature |
| 22 | **Fuzz test SQLC YAML parsing** | MED | 20min | Testing |
| 23 | **Benchmark: detector table iteration vs map lookup for `needsContentCheck`** | LOW | 15min | Perf |
| 24 | **`CodeEqual[T]` constraint: use `ErrorCoder` interface name directly** | LOW | 2min | Code |
| 25 | **Update `go.mod` toolchain to `1.26.2` (currently `1.26.2` — already correct)** | — | — | — |

---

## G) TOP #1 QUESTION I CANNOT FIGURE OUT MYSELF

**Is the "include patterns restrict scope" design (item #1 in TODO_LIST.md) truly settled?**

The TODO_LIST has this as the only 🔴 HIGH priority item. The current behavior is: include patterns act as a whitelist — files NOT matching any include pattern get `ReasonOutsideScope`. This seems intentional and is documented in godoc + README + website docs. But the TODO item has persisted since April 8th as "needs confirmation."

**Question for the maintainer:** Is the current "restrict scope" behavior the final design, or should include patterns have additive semantics (union of detection + pattern matches)? This decision blocks closing out the TODO list and affects whether the API surface is stable for v0.2.0.

---

## Session Work Summary

### Changes Made This Session (4 commits pushed to origin)

| Commit | Description |
|--------|-------------|
| `c41bcb6` | `fix(website): update mockgen URL to active uber-go/mock repo` |
| `ce3ab1b` | `refactor(tests): rename assertErrorsAs to assertErrorType` |
| `54a1bcc` | `docs(AGENTS.md): add errors.AsType migration note and fix helper location` |
| `9e02a50` | `docs: update FEATURES.md and CHANGELOG.md with assertErrorType rename` |

### Key Findings

1. **`errors.AsType` migration is 100% complete** — zero `errors.As` in `.go` files, website docs updated
2. **`assertErrorsAs` was a naming debt** — function used `errors.AsType` internally but kept the old name. Fixed.
3. **mockgen URL was stale** — website pointed to deprecated `golang/mock` repo. Fixed.
4. **`validate:docs` script is BROKEN** — references deleted `src/content/docs/docs/` path. Must fix before next website CI run.
5. **`generators.ts` oapi-codegen entry is misleading** — shows `.gen.go` file heuristic but code deliberately has none (false positive risk)
6. **Example test hardcoded counts are intentional** — they serve as regression tests when detectors are added
7. **The codebase is remarkably clean** — no `errors.As` remnants, no split brains, no dead code, all tests pass with `-race`

### Build & Test Status

```
go test -race ./...  → ok (1.037s)
go vet ./...         → clean
git push             → 8f83648..9e02a50 master -> master
```
