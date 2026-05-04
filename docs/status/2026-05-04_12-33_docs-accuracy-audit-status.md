# Status Report — 2026-05-04 12:33

_Comprehensive documentation audit and website accuracy sprint_

---

## a) FULLY DONE

| #   | What                                                        | Evidence                                              |
| --- | ----------------------------------------------------------- | ----------------------------------------------------- |
| 1   | Removed `template: splash` from docs index                  | `index.mdx` now renders with sidebar                  |
| 2   | Removed stale `Enabled()` from `api/filter.mdx`             | Constructor example shows only `WithFilterOptions`    |
| 3   | Fixed `MustShouldFilter` → `MustFilter` in `api/filter.mdx` | Matches actual Go API                                 |
| 4   | Flattened `docs/docs/` → `docs/` nesting                    | Commit 8f83648, 19 files moved, sidebar slugs updated |
| 5   | Updated `astro.config.mjs` sidebar slugs                    | All 18 items use flat paths (no `docs/` prefix)       |
| 6   | Website builds successfully                                 | 19 pages, PageFind index, no errors                   |
| 7   | Go tests pass                                               | `go test ./...` green                                 |
| 8   | Renamed `assertErrorsAs` → `assertErrorType`                | Commit ce3ab1b                                        |
| 9   | Fixed mockgen URL to uber-go/mock                           | Commit c41bcb6                                        |
| 10  | Cleaned up stale clipboard patterns                         | Commit 99f5da0                                        |

---

## b) PARTIALLY DONE

| #   | What                                | Status                            | Remaining                                                        |
| --- | ----------------------------------- | --------------------------------- | ---------------------------------------------------------------- |
| 1   | Documentation accuracy audit        | Audit COMPLETE, fixes NOT STARTED | 9 issues found, 0 fixed                                          |
| 2   | URL migration `/docs/docs/*` → `/*` | Code done, redirects missing      | Old URLs will 404 for indexed pages                              |
| 3   | Missing exported symbols in docs    | 21 symbols identified, 0 added    | `FilterStats.FilteredFiles`, `*FS` variants, phantom types, etc. |

---

## c) NOT STARTED

| #   | What                                                                                 | Priority | Impact                            |
| --- | ------------------------------------------------------------------------------------ | -------- | --------------------------------- |
| 1   | Fix `changelog.mdx`: claims `FilteredByReason` is exported (it's unexported)         | HIGH     | Misleading API claim              |
| 2   | Fix `pattern-matching.mdx`: 3 lines of corrupted `**` glob syntax                    | HIGH     | Unreadable documentation          |
| 3   | Fix `benchmarks.mdx`: references non-exported `DetectGenerated`                      | MEDIUM   | Confusing — users can't call this |
| 4   | Fix `benchmarks.mdx`: misaligned summary table (5-col header, 4-col data)            | MEDIUM   | Formatting bug                    |
| 5   | Fix `benchmarks.mdx`: stale Go 1.24 env vs project's Go 1.26                         | LOW      | Misleading env info               |
| 6   | Add `FilteredFiles(reason)` to `metrics.mdx` and `types.mdx`                         | MEDIUM   | Undocumented public API           |
| 7   | Add `FindSQLCConfigsFS` / `GetSQLOutputDirsFS` to `sqlc-config.mdx`                  | MEDIUM   | Undocumented public API           |
| 8   | Add parent directory search behavior to `sqlc-config.mdx`                            | LOW      | Missing behavioral docs           |
| 9   | Fix `filter-options.mdx`: missing `_moq_test.go` suffix for FilterMoq                | LOW      | Incomplete detection docs         |
| 10  | Add Firebase redirects for old `/docs/docs/*` URLs                                   | HIGH     | SEO/link rot prevention           |
| 11  | Remove misleading doublestar import from `installation.mdx`                          | LOW      | Misleading dependency suggestion  |
| 12  | Fix `errors.mdx`: `errors.AsType` example uses concrete type                         | LOW      | Poor example                      |
| 13  | Add `MatchPattern` to `api/detection.mdx`                                            | MEDIUM   | Undocumented public API           |
| 14  | Add `FindProjectRoot` to API reference                                               | LOW      | Undocumented public API           |
| 15  | Document phantom types (`StartPath`, `ConfigPath`, etc.)                             | LOW      | 5 exported types undocumented     |
| 16  | Fix `types.mdx` "derived from detectors table" — missing "plus additional entries"   | LOW      | Slightly inaccurate               |
| 17  | Document `FilterStats.String()` method                                               | LOW      | Undocumented public method        |
| 18  | Document `ErrorCode` type definition (`type ErrorCode string`)                       | LOW      | Type used but never defined       |
| 19  | Fix `benchmarks.mdx` "Is\*Generated combine filename+content" — 7 only check content | MEDIUM   | Incorrect description             |
| 20  | Re-run benchmarks on Go 1.26 and update numbers                                      | LOW      | Stale data                        |

---

## d) TOTALLY FUCKED UP

| #   | What                                                         | Why It's Bad                                                                                                                                                                            |
| --- | ------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | **Live site still serves OLD content**                       | 2 commits ahead of origin, not pushed. Live site still shows `Enabled()`, broken sidebar, old URLs                                                                                      |
| 2   | **Old `/docs/docs/*` URLs are indexed**                      | No redirects configured — all external links and search engine results will 404 after deploy                                                                                            |
| 3   | **`pattern-matching.mdx` has corrupted glob syntax**         | Lines 43-45 render as `\*_/mocks/_.go` instead of `**/mocks/*.go` — completely unreadable                                                                                               |
| 4   | **Changelog claims public field that's actually unexported** | `"Exported FilterStats.FilteredByReason field for direct map access"` — this is false, the field is `filteredByReason` (unexported). Users will try to access it and get compile errors |

---

## e) WHAT WE SHOULD IMPROVE

### Architecture / Type Model

1. **`MetricsMixin` is an odd exported type** — It's embedded in both `Metrics` and `FilterStats` but is an implementation detail. Consider unexporting it; users only interact with `FilterStats` from `GetStats()`.

2. **Phantom types (`StartPath`, `ConfigPath`, `Operation`, `ErrorMessage`) are exported but only used as constructor arguments for error types.** They add type safety at API boundaries but create documentation burden. Consider whether documenting them adds user value or just noise.

3. **`detectReasonFS` vs `DetectReason` asymmetry** — The `Filter.ShouldFilter` path uses `detectReasonFS` (reads from `fs.FS`) while `DetectReason` requires content. There's no exported "detect from filesystem" standalone function. Users who want detection without the `Filter` type must read files themselves. Consider exporting `DetectReasonFS`.

### Documentation Architecture

4. **No API reference auto-generation** — All docs are handwritten. This is why 21 exported symbols are missing. Consider `go doc` / `godoc` / `tfdocgen` for auto-generating API reference pages, with handwritten guides for concepts.

5. **Benchmarks are hardcoded snapshots** — The numbers become stale instantly. Consider rendering benchmarks from CI artifacts or at minimum adding a "last updated" date.

6. **Changelog is diverged** — `CHANGELOG.md` exists at repo root AND `changelog.mdx` in website. They are manually kept in sync, which fails (as evidenced by the `FilteredByReason` error). Single-source this.

### Website

7. **No Firebase redirects for old URL structure** — Will cause 404s for all previously-indexed pages.

8. **`installation.mdx` suggests importing `doublestar/v4`** — Users don't need this; `MatchPattern` wraps it. Misleading.

---

## f) TOP 25 THINGS TO DO NEXT (Pareto-sorted: impact / effort)

| Rank | Task                                                                             | Impact   | Effort | Category     |
| ---- | -------------------------------------------------------------------------------- | -------- | ------ | ------------ |
| 1    | **PUSH to origin** — live site is 2 commits behind                               | CRITICAL | 0 min  | Deploy       |
| 2    | **Add Firebase redirects** for `/docs/docs/*` → `/*`                             | HIGH     | 15 min | Website      |
| 3    | **Fix `pattern-matching.mdx`** corrupted glob syntax (3 lines)                   | HIGH     | 5 min  | Docs         |
| 4    | **Fix `changelog.mdx`** false `FilteredByReason` export claim                    | HIGH     | 5 min  | Docs         |
| 5    | **Fix `benchmarks.mdx`** `DetectGenerated` → explain it's Phase 1 internal       | MEDIUM   | 10 min | Docs         |
| 6    | **Fix `benchmarks.mdx`** misaligned summary table                                | MEDIUM   | 5 min  | Docs         |
| 7    | **Add `FilteredFiles()`** to metrics.mdx and types.mdx                           | MEDIUM   | 10 min | Docs         |
| 8    | **Add `FindSQLCConfigsFS` / `GetSQLOutputDirsFS`** to sqlc-config.mdx            | MEDIUM   | 10 min | Docs         |
| 9    | **Add `MatchPattern`** to api/detection.mdx                                      | MEDIUM   | 5 min  | Docs         |
| 10   | **Fix `benchmarks.mdx`** "Is\*Generated combine filename+content"                | MEDIUM   | 5 min  | Docs         |
| 11   | **Remove doublestar import** from installation.mdx                               | MEDIUM   | 2 min  | Docs         |
| 12   | **Fix `errors.mdx`** `errors.AsType` example with concrete type                  | MEDIUM   | 5 min  | Docs         |
| 13   | **Update `benchmarks.mdx`** Go 1.24 → 1.26                                       | LOW      | 5 min  | Docs         |
| 14   | **Fix `filter-options.mdx`** add `_moq_test.go` for FilterMoq                    | LOW      | 2 min  | Docs         |
| 15   | **Add parent dir search** behavior to sqlc-config.mdx                            | LOW      | 5 min  | Docs         |
| 16   | **Single-source changelog** — make website pull from CHANGELOG.md                | LOW      | 30 min | Architecture |
| 17   | **Document phantom types** in api/types.mdx                                      | LOW      | 10 min | Docs         |
| 18   | **Document `FindProjectRoot`** in API reference                                  | LOW      | 10 min | Docs         |
| 19   | **Document `ErrorCode` type definition** in errors.mdx                           | LOW      | 2 min  | Docs         |
| 20   | **Document `FilterStats.String()`** in metrics.mdx                               | LOW      | 2 min  | Docs         |
| 21   | **Fix `types.mdx`** "derived from detectors" → "derived from detectors + extras" | LOW      | 2 min  | Docs         |
| 22   | **Consider unexporting `MetricsMixin`** — implementation detail                  | LOW      | 15 min | Architecture |
| 23   | **Consider exporting `DetectReasonFS`** — standalone FS detection                | LOW      | 30 min | Architecture |
| 24   | **Auto-generate API reference** from Go source                                   | LOW      | 60 min | Architecture |
| 25   | **Re-run benchmarks** on Go 1.26 and update numbers                              | LOW      | 10 min | Data         |

---

## g) TOP #1 QUESTION I CANNOT FIGURE OUT MYSELF

**Should `MetricsMixin` be unexported (`metricsMixin`)?**

It's exported and embedded in both `Metrics` and `FilterStats`, but users only ever get a `FilterStats` from `Filter.GetStats()`. The `Metrics` type is for internal use only (created by `NewMetrics`, used by `Filter`). Making `MetricsMixin` unexported would simplify the public API surface (removing 5 exported symbols) but is a breaking change if anyone references it. I cannot determine if any external consumers depend on `MetricsMixin` or `Metrics` directly.

---

_Generated: 2026-05-04 12:33_
