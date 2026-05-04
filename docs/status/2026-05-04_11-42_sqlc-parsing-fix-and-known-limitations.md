# Comprehensive Status Report — 2026-05-04 11:42

## Summary

Major session: SQLC config parsing coverage gaps identified, fixed, and documented. Website updated with Known Limitations page and improved SQLC config guide.

---

## A) FULLY DONE ✅

### SQLC Config Parsing Overhaul (`sqlc.go`)

1. **V1 config support** — `sqlcV1Config`/`sqlcV1Package` structs added. `unmarshalSQLCConfig` now dispatches by version: v1 → `parseV1AsV2`, v2 → direct parse, unknown → error. Previously: v1 silently produced zero output dirs (false negatives for all v1 projects).

2. **Plugin codegen output dirs** — `sqlcCodegen` struct with `Out`/`Plugin` fields added to `sqlcEngine`. `extractOutputDirs` now collects `sql[].codegen[].out`.

3. **JSON output dirs** — `sqlcJSONConfig` struct added. `sqlcGenConfig.Go` changed from value to `*sqlcGoConfig` (nil-safe). `extractOutputDirs` now collects `sql[].gen.json.out`.

4. **Version validation** — Unsupported versions (e.g., `"3"`) now return `CodeSQLCConfigParse` error instead of silently accepting.

5. **Tests** — 8 new tests: V1 parsing/output, V2 codegen, V2 JSON, combined extraction (3 dirs from one config), multiple V1 packages, unsupported version, nil-Go handling. All existing tests updated. Race detector clean.

### Research Documentation

6. **`docs/research/2026-05-04_sqlc-config-parsing-comparison.md`** — Full comparison of gogenfilter vs sqlc's own config parser. Documents: won't-fix items (YAML library divergence, KnownFields, env vars, dot-directory skipping, dual config tolerance, no sqlc_tools.yaml), struct comparisons, source references.

### Website

7. **Known Limitations page** — `website/src/content/docs/docs/limitations.mdx` — 6 SQLC-specific + 3 general detection limitations, documented with rationale for each.

8. **Sidebar** — Added "Known Limitations" entry between "Supported Generators" and "Community" in `astro.config.mjs`.

9. **SQLC Config Guide** — `website/src/content/docs/docs/guides/sqlc-config.mdx` rewritten: documents V1/V2 format support, Codegen/JSON output table, implementation details, links to Known Limitations.

### AGENTS.md

10. Updated `sqlc.go` description and design decisions to reflect V1 support.

### Quality Gates

- `go test -race -count=1 ./...` — PASS
- `go vet ./...` — CLEAN
- `golangci-lint run` — 0 issues
- `npm run build` (website) — 20 pages built, CLEAN

---

## B) PARTIALLY DONE 🔶

Nothing partially done — all work items were completed.

---

## C) NOT STARTED ⬜

### From the Research Doc (bugs now fixed, documentation items remain)

- Nothing remaining from the SQLC config parsing gaps.

### General Project Items (pre-existing)

1. **Go version** — `go.mod` says `1.26.2` but `go.mod` format is `go 1.26.2` which may not be valid. Should verify.
2. **Website HTML validation** — `npx html-validate 'dist/**/*.html'` not run this session.
3. **Website type check** — `npx astro check` not run this session.
4. **Test coverage threshold** — CI requires 95%. Not verified locally this session.
5. **Benchmarks** — Not run this session.

---

## D) TOTALLY FUCKED UP 💥

Nothing fucked up. All changes compile, pass tests, pass lint, and the website builds cleanly.

---

## E) WHAT WE SHOULD IMPROVE

1. **`parseV1AsV2` exhaustruct noise** — The linter required explicit zero-value fields (`Schema: "", Engine: "", Codegen: nil, JSON: nil, Package: ""`). This makes the code verbose. Consider adding `//nolint:exhaustruct` with a comment explaining why zero values are intentional for v1→v2 conversion.

2. **Research doc could link to website** — `docs/research/2026-05-04_sqlc-config-parsing-comparison.md` should cross-link to the public Known Limitations page.

3. **Test helper `assertLen`** — Was extracted to `helpers_test.go` as part of a prior deduplication. Some tests still use manual `if len(x) != y { t.Fatalf(...) }` pattern. Should audit for consistency.

4. **Version detection reads YAML twice** — `unmarshalSQLCConfig` first unmarshals a version-only struct, then unmarshals the full config. Could use `yaml.Node` or `io.TeeReader` pattern like sqlc does. Performance impact is negligible for config files but it's not DRY.

---

## F) TOP 25 THINGS TO DO NEXT

### High Impact (Pareto top 20%)

1. **Tag v0.2.0 release** — V1 support, codegen, and JSON output dirs are significant new functionality. Worth a minor version bump.
2. **Run full CI locally** — `go test -race -count=1 ./...`, `golangci-lint run`, `go vet`, benchmarks, coverage check (95% threshold).
3. **Update CHANGELOG** — Add v0.2.0 section with V1 support, Codegen/JSON output, Known Limitations page.
4. **Push to origin** — 2 commits ahead of origin. Push `master`.

### Documentation & Website

5. **Run `npx astro check`** — Type check the website Astro files.
6. **Run `npx html-validate 'dist/**/\*.html'`\*\* — Validate generated HTML.
7. **Cross-link research doc → website** — Add URL reference in `docs/research/` to `/docs/limitations`.
8. **Audit website docs for consistency** — Ensure all pages reference current API (no stale `Enabled()`/`Disabled()` references).
9. **Add integration test fixtures** — Real-world `sqlc.yaml` v1 configs in `testdata/` for integration testing.

### Code Quality

10. **Refactor version detection to single-pass** — Use `io.TeeReader` + `yaml.Node` pattern to avoid double unmarshal.
11. **Add `//nolint:exhaustruct` with explanation** in `parseV1AsV2` — zero-value fields are intentional.
12. **Audit remaining `if len(x) != y` patterns** in test files — replace with `assertLen`.
13. **Add fuzz test for `unmarshalSQLCConfig`** — Ensure no panics on arbitrary YAML input.
14. **Add benchmark for V1 parsing** — Compare V1 vs V2 parse performance.

### Detection Coverage

15. **Audit all 11 detectors against latest generator versions** — Ensure content markers are current (sqlc, templ, go-enum, etc.).
16. **Add integration tests for each generator** — Test with real generated file samples in `testdata/`.
17. **Review `matchesSQLCFilenamePattern`** — sqlc may generate additional filename patterns in newer versions.

### Architecture

18. **Consider `sqlc_tools.yaml` discovery** — Documented as won't-fix but worth revisiting if user demand exists.
19. **Extract config parsing to interface** — `ConfigParser` interface would allow supporting other config formats (e.g., `sqlc.json`) without modifying core.
20. **Add `FindSQLCConfigsFS` parent directory search** — Currently only `FindSQLCConfigs` searches parents; FS variant doesn't.

### Infrastructure

21. **Verify `go 1.26.2` in go.mod** — Confirm this is a valid Go version format.
22. **Run benchmarks and compare against baseline** — Ensure V1/V2 dispatch doesn't regress V2 performance.
23. **Add `golangci-lint` to pre-commit hook** — Prevent lint issues from reaching CI.
24. **Update `FEATURES.md`** — If it exists, add V1/Codegen/JSON support.
25. **Update `TODO_LIST.md`** — If it exists, mark SQLC parsing gaps as done.

---

## G) TOP #1 QUESTION I CANNOT FIGURE OUT MYSELF

**Should this be tagged as v0.2.0 or v0.1.1?**

The V1 support + Codegen/JSON output dirs + version validation are new functionality (not patches), which suggests minor version bump (0.2.0). But there are no API-breaking changes — all public signatures remain the same, and existing V2-only users see identical behavior. A patch version (0.1.1) might be more appropriate per semver. This is a product/maintainer decision I cannot make autonomously.

---

## Git State

- **Branch:** `master`
- **Ahead of origin:** 2 commits
- **Unstaged changes:** 11 modified files, 2 untracked files
- **Tests:** PASS (race detector clean)
- **Lint:** CLEAN (0 issues)
- **Website:** Builds cleanly (20 pages)
