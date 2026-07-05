# Status Report: 2026-07-05 — Documentation Quality Overhaul

**Session Focus:** `doc.go` files, code examples, and API documentation accuracy across Go source, website, and README.

---

## a) FULLY DONE ✅

### Go Source Documentation

| #   | Fix                                                                                                     | Files                | Commit               |
| --- | ------------------------------------------------------------------------------------------------------- | -------------------- | -------------------- |
| 1   | Created `doc.go` — package doc moved from `types.go`                                                    | `doc.go`, `types.go` | `fe0cf3d`            |
| 2   | Fixed compile-breaking Quick Start example (`WithFilterOptions` returns `(FilterConfig, error)`)        | `doc.go`             | `d0fc9ea`            |
| 3   | Fixed compile-breaking `NewFilter` examples (3 examples, unchecked `err`)                               | `filter.go`          | `d0fc9ea`, `5a7057e` |
| 4   | Updated generator list (was missing 7: mockery, ent, gqlgen, easyjson, msgp, counterfeiter, go-swagger) | `doc.go`             | `d0fc9ea`            |
| 5   | Fixed `IsGenericGenerated` doc (said "go generate", actually any generator)                             | `detection.go`       | `d0fc9ea`            |
| 6   | Fixed `getFilenameBasedReasonWithTrace` doc (named wrong function)                                      | `detection.go`       | `d0fc9ea`            |
| 7   | Fixed `FilterConfig` type doc (misleading error description)                                            | `filter.go`          | `d0fc9ea`            |
| 8   | Fixed `NewFilter` doc ("returns false" → `(false, nil)`)                                                | `filter.go`          | `d0fc9ea`            |
| 9   | Added individual doc comments to all 21 `FilterReason` constants                                        | `types.go`           | `5d02762`            |
| 10  | Added individual doc comments to all 8 sentinel error variables                                         | `errors.go`          | `031884c`            |

### Website Documentation

| #   | Fix                                                                     | Files                | Commit    |
| --- | ----------------------------------------------------------------------- | -------------------- | --------- |
| 11  | Created Scan API reference page (9 previously undocumented symbols)     | `scan.mdx` (new)     | `d0fc9ea` |
| 12  | Fixed `SQLCConfigError.Operation` type (`string` → `SQLCOperation`)     | `errors.mdx`         | `d0fc9ea` |
| 13  | Fixed `IsGqlgenGenerated` description (content-only, no filename check) | `detection.mdx`      | `d0fc9ea` |
| 14  | Added `DetectReasonFile`/`DetectReasonFileFS`                           | `detection.mdx`      | `d0fc9ea` |
| 15  | Added `FilterWithContent`/`FilterDetailedWithContent`                   | `filter.mdx`         | `d0fc9ea` |
| 16  | Added `FilterResult` struct + `Is()` + `String()`                       | `types.mdx`          | `d0fc9ea` |
| 17  | Added `SQLCOperation` type + 5 constants                                | `errors.mdx`         | `d0fc9ea` |
| 18  | Added Scan to sidebar                                                   | `astro.config.mjs`   | `d0fc9ea` |
| 19  | Fixed `filter-options.mdx` usage example (discarded return values)      | `filter-options.mdx` | `5a7057e` |

### README

| #   | Fix                                                                              | Commit    |
| --- | -------------------------------------------------------------------------------- | --------- |
| 20  | Fixed mockgen description (`_mock.go` / `mock_` prefix → `_mock.go` suffix only) | `d0fc9ea` |
| 21  | Fixed gqlgen description (filename + content → content-only)                     | `d0fc9ea` |

### Configuration & Metadata

| #   | Fix                                                                                | Files                           | Commit    |
| --- | ---------------------------------------------------------------------------------- | ------------------------------- | --------- |
| 22  | Aligned `.golangci.yaml` Go version with `go.mod` (`1.26.3` → `1.26.4`)            | `.golangci.yaml`                | `aedc0f0` |
| 23  | Updated AGENTS.md Key Source Files table (added `doc.go`, `scan.go`, fixed counts) | `AGENTS.md`                     | `106c8df` |
| 24  | Added v3.2.1 changelog entry (synced root + website)                               | `CHANGELOG.md`, `changelog.mdx` | `7f7ac92` |

### Testdata

| #   | Fix                                                     | Commit    |
| --- | ------------------------------------------------------- | --------- |
| 25  | Added missing `doc.go` to handwritten, wire, templ dirs | `4243879` |

### Verification

| Check            | Result                                                    |
| ---------------- | --------------------------------------------------------- |
| `go vet ./...`   | ✅ Pass                                                   |
| `go build ./...` | ✅ Pass                                                   |
| `go test ./...`  | ✅ Pass (98.3% coverage)                                  |
| `go doc -all .`  | ✅ Clean — all constants, errors, types have doc comments |
| `astro check`    | ✅ 0 errors, 0 warnings, 0 hints                          |
| `astro build`    | ✅ 21 pages built, scan page confirmed at `/api/scan/`    |

---

## b) PARTIALLY DONE 🟡

| Item                        | Status                   | What Remains                                                                                             |
| --------------------------- | ------------------------ | -------------------------------------------------------------------------------------------------------- |
| testdata `doc.go` coverage  | 17/18 dirs have `doc.go` | `sqlc/` skipped — intentionally mixed packages (`db` + `sqlc`), adding `doc.go` creates package conflict |
| Lighthouse CI accessibility | Known failures           | `color-contrast`, `label-content-name-mismatch` on root page — pre-existing, not touched this session    |

---

## c) NOT STARTED ⬜

These are improvements identified during the audit but outside this session's scope (documentation quality):

1. **`golangci-lint` `gomodguard_v2` migration** — config referenced in AGENTS.md but not verified
2. **Lighthouse CI accessibility fixes** — `color-contrast` on landing page elements
3. **Dependabot alerts** — 4 npm ecosystem alerts (website transitive deps), 0 Go production deps
4. **Website `errors.mdx` pseudocode** — `maybeReturnProjectRootError()` in example is not a real function
5. **Empty `testdata/templ/` directory** — `doc.go` added but dir is otherwise empty (detection tests use inline content)

---

## d) TOTALLY FUCKED UP 💥

Nothing. No regressions, no broken builds, no data loss. All changes verified with `go vet`, `go build`, `go test`, `astro check`, and `astro build`.

---

## e) WHAT WE SHOULD IMPROVE

### Process Improvements

1. **Single source of truth for API examples** — Code examples in doc comments, README, and website can diverge. Consider generating website examples from `go doc` output or testable examples.
2. **CI check for doc/API consistency** — A test that verifies website API pages reference actual exported symbols (similar to the existing `/v3` import path check).
3. **Version sync automation** — `.golangci.yaml` Go version should derive from `go.mod` automatically.

### Code Quality

4. **`FilterConfig` closures never error** — The `func(*Filter) error` signature implies errors are possible, but no closure ever returns non-nil. Consider whether the type could be simplified, or document this explicitly (done this session).
5. **testdata typecheck warnings** — 17 LSP warnings from intentional test fixtures (incomplete types). These are by design but create noise.

---

## f) Top 25 Things to Do Next (sorted by impact/effort)

| #   | Task                                                                       | Impact | Effort | Type         |
| --- | -------------------------------------------------------------------------- | ------ | ------ | ------------ |
| 1   | Fix Lighthouse CI accessibility (`color-contrast`)                         | High   | Medium | Quality      |
| 2   | Add CI test: verify website API docs match exported Go symbols             | High   | Medium | Process      |
| 3   | Derive `.golangci.yaml` Go version from `go.mod`                           | Medium | Tiny   | Process      |
| 4   | Replace pseudocode in `errors.mdx` with real function                      | Low    | Tiny   | Docs         |
| 5   | Investigate `testdata/templ/` — empty or add real fixture                  | Low    | Tiny   | Cleanup      |
| 6   | Add `go vet -all` or `revive` check for missing doc comments in CI         | Medium | Small  | Process      |
| 7   | Consider `doc.go` convention enforcement in linting                        | Low    | Small  | Process      |
| 8   | Fix Dependabot alerts (npm overrides)                                      | Medium | Small  | Security     |
| 9   | Add integration test that runs `ScanProject` on the repo itself            | Medium | Small  | Testing      |
| 10  | Generate API reference from `go doc -all` output                           | Medium | Large  | Process      |
| 11  | Add `CHANGELOG.md` → `changelog.mdx` sync check to CI                      | Medium | Small  | Process      |
| 12  | Document `FilterConfig` "closures never error" design decision in ADR      | Low    | Small  | Docs         |
| 13  | Resolve `testdata/deepcopy` typecheck (missing `ConfigMap` type)           | Low    | Tiny   | Cleanup      |
| 14  | Resolve `testdata/gqlgen` typecheck (missing `queryResolver`)              | Low    | Tiny   | Cleanup      |
| 15  | Add `FilterPathsDetailed` to website `filter.mdx`                          | Low    | Tiny   | Docs         |
| 16  | Audit `generators.mdx` against detector table for completeness             | Medium | Small  | Docs         |
| 17  | Add benchmark results to website from `gh-pages` branch                    | Medium | Medium | Docs         |
| 18  | Consider `errors.AsType` examples in website error docs                    | Low    | Small  | Docs         |
| 19  | Review `quick-start.mdx` for accuracy against current API                  | Medium | Small  | Docs         |
| 20  | Add `ExclusionPattern` to types.mdx `FilterReason` methods section         | Low    | Tiny   | Docs         |
| 21  | Investigate jscpd OOM in BuildFlow pre-commit hook                         | Medium | Medium | Process      |
| 22  | Consider versioned docs (e.g., `/v3/` prefix) for future major versions    | Low    | Large  | Strategy     |
| 23  | Add `CONTRIBUTING.md` note about updating docs when adding detectors       | Low    | Tiny   | Process      |
| 24  | Review if `FilterReason` and `FilterOption` should be merged into one type | Low    | Large  | Architecture |
| 25  | Consider generating README generator table from detector table             | Medium | Medium | Process      |

---

## g) Top #1 Question

**How should we keep the README generator table, website docs, and Go doc comments in sync when the detector table changes?**

Right now, adding a new detector to `detection.go` requires manually updating: (1) `doc.go` generator list, (2) `types.go` constants, (3) README generator table, (4) website `generators.mdx`, (5) website `detection.mdx` table, (6) website `filter-options.mdx` table, (7) website `types.mdx` constant lists. That's 7 files for one code change.

The detector table already drives `AllFilterOptions()`, `AllGeneratorOptions()`, and `AllFilterReasons()` automatically. Should we extend this pattern to generate the documentation tables too? Or add a CI test that fails when the tables diverge from the code?

---

## Commit History (This Session)

```
7f7ac92 docs: add v3.2.1 changelog entry for documentation fixes
106c8df docs: update AGENTS.md Key Source Files table
031884c docs: add individual doc comments to all sentinel error variables
5f16eb0 style: fix markdown table alignment in website docs
5a7057e fix: show proper error handling in WithFilterOptions code examples
aedc0f0 chore: align golangci.yaml Go version with go.mod (1.26.4)
4243879 docs: add missing doc.go files to testdata directories
5d02762 docs: add individual doc comments to all FilterReason constants
fe0cf3d refactor: move package documentation to dedicated doc.go
d0fc9ea fix: correct documentation errors across Go source, website, and README
```

**Total: 10 commits, 18 files changed, 349 insertions, 88 deletions across Go source, website, README, and config.**
