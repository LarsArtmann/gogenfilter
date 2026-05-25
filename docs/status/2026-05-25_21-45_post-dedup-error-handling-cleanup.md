# Status Report — 2026-05-25 21:45

**Branch:** master | **Last commit:** f1331ee (test: add missing test files) | **Since last report:** 17 days

---

## a) FULLY DONE ✓

### Library Core (v3, stable)

- **11 generator detectors** in table-driven system (sqlc, templ, go-enum, protobuf, oapi-codegen, deepcopy-gen, wire, moq, mockgen, stringer, generic)
- **Two-phase detection**: filename-based (zero I/O) → content-based (reads file)
- **Functional options API**: `NewFilter(WithFilterOptions(FilterAll), ...)` — immutable after construction
- **`fs.FS` abstraction**: `WithFS()` for testability; tests use `fstest.MapFS`
- **Branded errors**: `[gogenfilter:<code>]` prefix, sentinel errors, `ErrorCoder` interface
- **`FilterResult` with trace**: `FilterDetailed()` returns trace info for debugging
- **Batch filtering**: `FilterPaths()` for multi-file processing
- **SQLC config discovery**: v1 and v2 config formats, Go/JSON/Codegen output dirs
- **`**`glob patterns**: include/exclude via`doublestar/v4`

### Test Suite (148 tests, 0 failures, 99.8% coverage)

- Table-driven tests across all packages
- ~120 BDD specs (ginkgo/gomega) in `bdd_test.go` + `bdd_extended_test.go`
- Fuzz tests, property tests, integration tests, concurrent tests
- Generic helpers in `helpers_test.go`: `assertFieldEqual[T]()`, `boolTestCase[T]`, `runBoolTableTest[T]()`
- Error type assertions use `errors.AsType[T]` (Go 1.26)

### Deduplication (this session)

- **Merged** `assertAllValid`/`assertAllInvalid` → `assertAllValidity[T](t, name, items, wantValid bool)` — eliminated test helper duplication
- **Refactored** `TestFilterResultString` from 3 sub-tests → table-driven test with `exact`/`contains` fields
- **Eliminated** `getFilenameBasedReason` and `getContentBasedReason` wrappers — inlined `*WithTrace` calls into `detectReasonFromMap`, fixing 2 error-handling violations (discarded trace strings flagged by `hierarchical-errors` step)

### CI/CD (4 workflows)

- **Go CI** (`ci.yml`): vet → test (race, coverage 98% threshold) → benchmarks → golangci-lint
- **Benchmark** (`benchmark.yml`): push-to-master only, `gh-pages` tracking
- **Website** (`website.yml`): Astro typecheck → build → doc validation → HTML validation → Firebase deploy
- **Lighthouse** (`lighthouse.yml`): LHCI v12, 3 URLs × 3 runs

### Website

- Astro v6 + Starlight docs, landing page at `/`
- Firebase Hosting with CI/CD
- Dark mode default, light mode toggle
- SEO: JSON-LD, OG tags, canonical URLs

### Architecture & Documentation

- `AGENTS.md`: comprehensive project knowledge (architecture, commands, CI, patterns, decisions)
- `DOMAIN_LANGUAGE.md`: domain terminology
- Architecture diagrams in `docs/architecture-understanding/`

---

## b) PARTIALLY DONE ⚠️

### Code Duplication (art-dupl)

- **Down to 2 clone groups** from 3 (fixed 1 this session):
  - `sqlc.go:244/279` — **known false positive** (version dispatch vs v1→v2 conversion share identical signatures but are fundamentally different functions; excluded via `--exclude-pattern 'sqlc.go'`)
  - `types_test.go:240-245/246-256` — structural similarity between test data entries in table-driven `TestFilterResultString` (same `FilterResult` fields, different values)

### Linter

- **1 pre-existing issue**: `goconst` flags `"sqlc"` string literal (4 occurrences) — this is a test data string matching the constant name `FilterSQLC`, not actual duplication worth fixing

---

## c) NOT STARTED

1. **Go module version bump** — no v3.1.0 or v4.0.0 tag planned; v3 is stable
2. **Website content refresh** — no new docs pages or tutorials written recently
3. **`gomodguard` → `gomodguard_v2` migration** — golangci-lint v2.12.0 deprecated v1; config still uses `gomodguard`
4. **Lighthouse CI setup** — `LHCI_GITHUB_APP_TOKEN` secret not configured; accessibility assertions fail on live site
5. **Firebase `PRIVATE_REPO_TOKEN`** — optional, works with `continue-on-error`, but md-go-validator skipped without it
6. **Performance regression tracking** — benchmark data pushed to `gh-pages` but no alerting or dashboard
7. **Website Lighthouse scores** — accessibility failures (`color-contrast`, `label-content-name-mismatch`) not addressed

---

## d) TOTALLY FUCKED UP 💥

**Nothing.** The codebase is in excellent shape:

- 148/148 tests pass
- 99.8% coverage
- `go vet` clean
- Only 1 linter warning (pre-existing `goconst`)
- No build errors, no race conditions

---

## e) WHAT WE SHOULD IMPROVE

1. **Remaining `_` discard in `detectReasonFromMap`** — lines 269 and 276 still discard trace strings with `_, _`. The tool flagged the _wrapper pattern_ (now eliminated), but the discard itself remains. Consider whether `detectReasonFromMap` should also return a trace, or if a `//nolint:errcheck` comment is warranted for clarity.
2. **`gomodguard` deprecation** — upgrade to `gomodguard_v2` in `.golangci.yaml` to silence the warning and stay current.
3. **Website accessibility** — Lighthouse CI reports `color-contrast` and `label-content-name-mismatch` failures on the root page. These should be fixed before the next release.
4. **Lighthouse CI not fully operational** — `LHCI_GITHUB_APP_TOKEN` needs to be configured as a GitHub secret for status checks to work.
5. **Test data duplication** — the 2 remaining art-dupl clones are benign but could be addressed by extracting shared `FilterResult` constructors for test data.
6. **No `TODO_LIST.md`** — the project lacks a comprehensive TODO list tracking all known work items.
7. **`justfile` migration** — AGENTS.md notes `justfile` is deprecated in favor of `flake.nix`, but it may still exist.

---

## f) Top #25 Things We Should Get Done Next

### High Impact (do first)

1. Fix website accessibility issues (`color-contrast`, `label-content-name-mismatch`) for Lighthouse CI
2. Configure `LHCI_GITHUB_APP_TOKEN` GitHub secret to enable Lighthouse status checks
3. Upgrade `gomodguard` → `gomodguard_v2` in `.golangci.yaml`
4. Add `//nolint` or refactor `_` discard in `detectReasonFromMap` (lines 269, 276) — decide if trace should propagate
5. Fix pre-existing `goconst` warning (`"sqlc"` string in test data)

### Code Quality

6. Address remaining art-dupl clone: `types_test.go` test data structural similarity
7. Add `TODO_LIST.md` — comprehensive tracking of all open work
8. Review `flake.nix` — ensure `justfile` migration is complete, remove deprecated `justfile` if present
9. Run `golangci-lint run --new-from-rev=f1331ee` to catch any regressions introduced recently
10. Add integration test for `FilterDetailed` trace propagation through the full path

### Website & Docs

11. Write a "Getting Started" guide for the website
12. Add API reference page to website (generated from Go doc comments)
13. Update `FEATURES.md` in website with current feature set
14. Fix `/docs` redirect — Lighthouse reports redirect issues
15. Add changelog/release notes page to website

### DevEx & CI

16. Add `nix flake check` to CI pipeline (if not already present)
17. Set up benchmark alerting/dashboard (data exists on `gh-pages` but no visibility)
18. Add `art-dupl` to CI pipeline as a quality gate
19. Consider adding `pre-commit` hooks for `golangci-lint` and `go test`
20. Review `depguard` rules — ensure all dependencies are still needed and allowed

### Future Features (lower priority)

21. Add support for detecting `go:embed` generated files
22. Add support for detecting `stringer` v2 generated files
23. Consider adding a `FilterDetailedContext` method (with `context.Context`) for future async I/O
24. Add `FilterPathsDetailed` batch method (returns `[]FilterResult`)
25. Explore WASM compilation for browser-based filtering

---

## g) Top #1 Question I Cannot Figure Out Myself

**Should `detectReasonFromMap` propagate the trace string upstream?**

The `*WithTrace` functions return `(FilterReason, string)` for the trace-enabled path. `detectReasonFromMap` is the shared core used by `DetectReason()` (no-trace public API) and `detectReasonFSWithTrace()` (trace-enabled internal path). Currently, `detectReasonFromMap` discards the trace — but `detectReasonFSWithTrace` calls the `*WithTrace` functions directly, bypassing `detectReasonFromMap` entirely. This means `detectReasonFromMap` is now only used by `DetectReason()` and `DetectReasonReader()`, which are the no-trace public API.

The question: should we keep `detectReasonFromMap` at all, or should `DetectReason()` call the `*WithTrace` functions directly (like `detectReasonFSWithTrace` does) and discard the trace? This would eliminate one layer of indirection but create two discard sites instead of one. Or: should we unify everything through the trace path and have callers ignore it?

This is a design decision that depends on whether the no-trace API is considered the "primary" API or if everything should flow through the trace path.

---

## Metrics Summary

| Metric                  | Value                                   |
| ----------------------- | --------------------------------------- |
| Total Go lines          | 8,362                                   |
| Tests passing           | 148/148                                 |
| Tests failing           | 0                                       |
| Coverage                | 99.8%                                   |
| Linter issues           | 1 (pre-existing `goconst`)              |
| Clone groups (art-dupl) | 2 (1 known false positive, 1 test data) |
| CI workflows            | 4                                       |
| Generator detectors     | 11                                      |
| Public API functions    | ~20                                     |
