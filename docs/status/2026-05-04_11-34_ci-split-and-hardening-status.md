# gogenfilter — Comprehensive Status Report

**Date:** 2026-05-04 11:34
**Author:** Crush (AI Assistant) via Lars Artmann
**Scope:** Full project status after CI/CD split and hardening sprint

---

## Executive Summary

Project is in **excellent shape**. Core library is production-ready with 95.5% test coverage, comprehensive error handling, and a clean API. The CI/CD infrastructure has been significantly hardened in this session. The website is functional with automated deployment. A few uncommitted refactorings are in-flight.

---

## a) FULLY DONE ✅

### Library Core (Production-Ready)

- **11 code generators** detected: sqlc, templ, go-enum, protobuf, oapi-codegen, deepcopy-gen, wire, moq, mockgen, stringer + generic `*.gen.go` fallback
- **Two-phase detection**: filename-based (zero I/O) → content-based (reads file)
- **Table-driven detector system**: single `[]detector` slice, all derived lists auto-update
- **Functional options API**: `NewFilter(WithFilterOptions(FilterAll), ...)` — immutable after construction
- **Branded errors**: 7 error codes, sentinel errors, `errors.Is` support, `ErrorCoder`/`Helper` interfaces, `CodeEqual[T]` generic
- **Phantom types**: 5 types (`StartPath`, `ConfigPath`, `Operation`, `ErrorMessage`, `TotalFilesChecked`)
- **`fs.FS` abstraction**: testable via `WithFS()`, tests use `fstest.MapFS`
- **Metrics**: thread-safe `FilterStats` with `FilteredFiles()` and `FilteredBy()` accessors
- **Pattern matching**: `**` glob via `doublestar/v4`

### SQLC Config Parsing (v1 + v2)

- V2: extracts `sql[].gen.go.out`, `sql[].gen.json.out`, `sql[].codegen[].out`
- V1: converts `packages[].path` to v2 format automatically
- Unknown versions: explicit error (not silent)
- Config discovery walks directory trees, skips hidden/vendor/node_modules

### Test Infrastructure

- **95.5% coverage** (CI enforces ≥95%)
- **23 test files**, 6,814 total lines Go code (1,610 source + 5,259 test → 3.3:1 ratio)
- Table-driven tests, `t.Parallel()` isolation
- BDD suite (ginkgo/gomega) with 38 specs
- Fuzz tests, property tests, benchmark suite
- Generic test helpers in `helpers_test.go`
- Integration tests with real testdata fixtures (14 subdirectories)

### CI/CD (This Session's Work) ✅

- **Split into 2 workflows**: `ci.yml` (Go) + `website.yml` (website)
- **Path-based triggers**: Go CI on `*.go`/`go.mod`/`go.sum`/`testdata/**`; Website on `website/**`
- **Concurrency groups**: cancel-in-progress on both workflows
- **Step ordering**: `go vet` before tests (faster failure)
- **`npm ci`**: deterministic installs (not `npm install`)
- **`astro check`**: typecheck enforced before build
- **HTML validation enforced**: removed `|| true` suppression
- **Least-privilege permissions**: `id-token:write` and `checks:write` only on deploy job
- **Dependabot**: weekly updates for Go modules, npm, GitHub Actions
- **`.node-version`**: local dev consistency with CI

### Website

- Astro v6 + Starlight docs + marketing landing page
- Firebase Hosting deployment (live channel)
- Type-safe icon system, dark/light theme, SEO, Plausible analytics
- md-go-validator for documentation code block validation

### Documentation

- AGENTS.md: comprehensive project memory
- FEATURES.md: all features inventoried with status
- TODO_LIST.md: prioritized with 65+ completed items
- CHANGELOG.md: maintained
- docs/status/: 26 historical reports
- docs/research/: SQLC config comparison, Go benchmarks research
- docs/planning/: architecture audit, benchmarks integration

---

## b) PARTIALLY DONE 🔶

### sqlc.go Uncommitted Refactoring

- **Status**: `sqlc.go` has unstaged changes — extracted `unmarshalSQLCYAML()` helper to reduce duplication in YAML parsing error handling
- **Impact**: Clean code improvement, 3 identical error-wrapping blocks collapsed into one helper
- **Tests**: Pass with the changes
- **Action needed**: Commit this refactoring

### FEATURES.md — Nix Flake

- Marked `PARTIALLY_FUNCTIONAL` — `website/flake.nix` exists but root project has no nix integration
- Not blocking, low priority

---

## c) NOT STARTED ⬜

### From TODO_LIST.md — Medium Priority

1. **Performance profiling** (30min) — Identify hot paths beyond benchmarks
2. **Codecov integration** (15min) — Historical coverage tracking (currently computed and thrown away)
3. **`//go:generate` detection** (45min) — Detect files that are outputs of `go generate` commands
4. **`RegisterDetector()` plugin API** (60min) — Allow users to register custom detectors
5. **`WalkAndFilter()` bulk API** (30min) — Walk a directory tree and filter all files

### From TODO_LIST.md — Website

6. **Lighthouse audit** (60min) — Performance, accessibility, SEO scores
7. **Custom 404 page** (30min) — Starlight default 404 is generic

### Infrastructure Gaps

8. **No release automation** — Manual tag + push process
9. **No coverage history** — Coverage computed in CI but not tracked over time
10. **No Go module proxy validation** — `go mod verify` runs but no bus-factor check

---

## d) TOTALLY FUCKED UP 💥

### Nothing Is Broken

- All tests pass (95.5% coverage)
- Linter: 0 issues
- Both CI workflows: valid YAML, logically correct
- Website builds and deploys successfully
- API is stable, no known breaking changes in flight

### Regret From This Session

- **HTML validation `|| true`**: I noted it as a problem in my first self-review, then forgot to fix it. Fixed on second pass. Should have caught it immediately.
- **`testdata/**` path filter\*\*: Should have been obvious from the start — tests read fixtures. Caught on self-review.

---

## e) WHAT WE SHOULD IMPROVE

### Architecture

- **Detector plugin system**: Currently a closed `[]detector` table. Users with custom generators (e.g., proprietary protobuf plugins) cannot add detectors without forking.
- **Bulk filtering API**: `WalkAndFilter()` would eliminate the common pattern of walking a tree and calling `ShouldFilter()` per file.
- **Error wrapping**: The `unmarshalSQLCYAML` refactoring (uncommitted) is a step in the right direction — find more repetitive error-wrapping patterns.

### Testing

- **Coverage history**: Use codecov/coveralls to track coverage trends over time. The 95% threshold is good but we're blind to drift.
- **Fuzz corpus**: Fuzz tests exist but no corpus is persisted. Fuzz findings are lost between runs.

### CI/CD

- **Release automation**: Tag-triggered releases with goreleaser or similar. Currently manual.
- **Matrix testing**: Only ubuntu-latest. Consider macOS for `filepath` edge cases (though we have no OS-specific code today).
- **Benchmark regression**: Benchmarks run in CI but results aren't compared. Could use `benchstat` or `gobenchdata` to catch regressions.

### Dependencies

- **`md-go-validator@latest`**: Non-deterministic CI step. Acceptable because it's owner-controlled, but worth noting.
- **golangci-lint v2.11.4**: Pinned in CI. Should be updated when new versions release (dependabot handles this).

---

## f) Top 25 Things We Should Get Done Next

Sorted by impact × ease (Pareto principle):

### HIGH IMPACT, LOW EFFORT (Do Immediately)

| #   | Task                                     | Est.  | Why                                 |
| --- | ---------------------------------------- | ----- | ----------------------------------- |
| 1   | Commit `unmarshalSQLCYAML` refactoring   | 2min  | Uncommitted, tests pass, clean code |
| 2   | Add codecov/coveralls integration        | 15min | Historical coverage tracking, free  |
| 3   | Resolve include patterns design question | 30min | Only HIGH priority TODO             |
| 4   | Custom 404 page for website              | 30min | Low effort, professional polish     |
| 5   | Add `.gitattributes` for Go linguist     | 5min  | Proper GitHub language detection    |

### HIGH IMPACT, MEDIUM EFFORT (Do This Week)

| #   | Task                                | Est. | Why                                     |
| --- | ----------------------------------- | ---- | --------------------------------------- |
| 6   | Release automation (goreleaser)     | 2h   | Tag → release, changelog, cross-compile |
| 7   | `RegisterDetector()` plugin API     | 1h   | Extensibility without forking           |
| 8   | `WalkAndFilter()` bulk API          | 30m  | Common use case, eliminates boilerplate |
| 9   | Benchmark regression tracking in CI | 1h   | Catch perf regressions automatically    |
| 10  | Lighthouse audit + fixes            | 1h   | Performance baseline for website        |

### MEDIUM IMPACT, LOW EFFORT (Quick Wins)

| #   | Task                                       | Est.  | Why                                |
| --- | ------------------------------------------ | ----- | ---------------------------------- |
| 11  | Persist fuzz corpus                        | 15min | Don't lose fuzz findings           |
| 12  | Add `//go:generate` detection              | 45min | Another generator category covered |
| 13  | GitHub topic tags on repo                  | 5min  | Discoverability                    |
| 14  | Add CONTRIBUTING.md reference to AGENTS.md | 5min  | Onboarding consistency             |
| 15  | Verify dependabot works after first Monday | 5min  | Confirm config is correct          |

### MEDIUM IMPACT, MEDIUM EFFORT (Plan Ahead)

| #   | Task                                            | Est.  | Why                              |
| --- | ----------------------------------------------- | ----- | -------------------------------- |
| 16  | Performance profiling (pprof)                   | 30m   | Find hot paths, optimize         |
| 17  | Add Go module retract policy                    | 15min | Security best practice           |
| 18  | Website search analytics (PageFind)             | 30m   | Understand what users search for |
| 19  | Add example integrations (golangci-lint plugin) | 2h    | Show real-world usage            |
| 20  | macOS matrix in CI                              | 30m   | Cross-platform confidence        |

### LOWER IMPACT (Backlog)

| #   | Task                                   | Est. | Why                            |
| --- | -------------------------------------- | ---- | ------------------------------ |
| 21  | Move website flake.nix to root         | 1h   | Unified nix dev environment    |
| 22  | Add OpenAPI/JSON schema for config     | 2h   | Tooling support                |
| 23  | Structured logging integration         | 1h   | Debug visibility for consumers |
| 24  | Add version API (`Version()` constant) | 5min | Programmatic version check     |
| 25  | Comprehensive README examples refresh  | 1h   | First impression matters       |

---

## g) Top #1 Question I Cannot Answer Myself

**Should we version the API as v1.0.0 (stable) or remain in pre-release?**

The library is production-ready by every metric: 95.5% coverage, comprehensive error handling, clean API, no known bugs. But the TODO list has medium-priority items (`RegisterDetector()`, `WalkAndFilter()`) that would be breaking API additions if done after a v1.0.0 tag.

The question is: **Is the current API surface complete enough to commit to stability, or do we need the plugin/bulk APIs first?**

This is a product/maintainer decision, not a technical one.

---

## Metrics Dashboard

| Metric                | Value                   |
| --------------------- | ----------------------- |
| Go version            | 1.26.2                  |
| Source lines          | 1,610 (9 files)         |
| Test lines            | 5,259 (23 files)        |
| Test:source ratio     | 3.3:1                   |
| Coverage              | 95.5%                   |
| Generators supported  | 11 + generic            |
| Error codes           | 7                       |
| Phantom types         | 5                       |
| Linter issues         | 0                       |
| Test failures         | 0                       |
| Open HIGH TODOs       | 1                       |
| Open MEDIUM TODOs     | 5                       |
| Completed TODOs       | 65+                     |
| CI workflows          | 2 (Go + Website)        |
| Dependabot ecosystems | 3 (gomod, npm, actions) |

---

_Report generated by Crush (GLM-5.1) — 2026-05-04_
