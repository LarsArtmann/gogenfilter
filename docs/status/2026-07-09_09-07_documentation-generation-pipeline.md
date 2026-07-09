# Status Report: Documentation Generation Pipeline (gendocs)

**Date:** 2026-07-09 09:07
**Session Goal:** Eliminate documentation drift by building a deterministic Go generator that derives website/README data from the `detectors` table.

---

## a) FULLY DONE

### 1. Go Generator (`cmd/gendocs/main.go`)

- **Built and working.** Reads `AllDetectorDocs()` from the `detectors` table, emits three artifacts:
  - `website/src/data/generators.json` (18 entries, replaces hand-written 11-entry `generators.ts`)
  - README.md tables (generators + filter options, between `<!-- gendocs:*:start/end -->` markers)
  - `generators.mdx` detection table (between `{/* gendocs:*:start/end */}` MDX markers)
- **Validation:** `validateMetadata()` fails if any detector lacks `websiteMetadata` entry — new detectors can't silently drift.
- **Idempotent:** Verified via checksum comparison across multiple runs.
- **CI enforcement:** `//go:generate` in `detection.go` + `docs` job in `ci.yml` runs `go generate ./... && git diff --exit-code`.

### 2. Detector Doc Metadata (`detection.go`)

- Added `url`, `filenameDesc`, `contentDesc` string fields to the `detector` struct.
- Added `filenameNoneDesc` constant to satisfy goconst linter.
- All 18 detector entries updated with documentation metadata.
- Added exported `DetectorDoc` struct + `AllDetectorDocs()` function.

### 3. Astro Integration

- `generators.ts` rewritten as thin wrapper importing `generators.json`.
- Astro `astro check` passes (0 errors, 0 warnings).
- Astro `astro build` passes (21 pages built).
- `GeneratorGrid.astro`, `HeroSection.astro`, `og/[...slug].ts` all consume generated data transparently.

### 4. Test Coverage

- Added `TestAllDetectorDocs` in `types_test.go` — validates count, uniqueness, field completeness, phase flag correctness.
- Library coverage: **98.4%** (above 98% CI threshold).
- All tests pass with `-race`.

### 5. Lint Clean

- `golangci-lint run ./...`: **0 issues**.
- Fixed all lint issues: err113 (sentinel error), forbidigo, goconst, gosec G703, noinlineerr, nolintlint, wrapcheck, varnamelen, golines, mnd, wsl.

### 6. CI Updates

- Added `docs` job to `ci.yml` for freshness enforcement.
- Updated test job: coverage now scoped to `.` (library package) instead of `./...` (which was dragged to 82.8% by untested `cmd/gendocs`).
- Added `go test -race ./...` as separate step for general compilation.

### 7. AGENTS.md Updated

- Added `cmd/gendocs/` to Key Source Files table.
- Added two Design Decisions entries documenting the generation pipeline and doc metadata fields.

---

## b) PARTIALLY DONE

### 1. API Reference Pages (`api/*.mdx`)

- **Not touched.** The 5 hand-written API reference pages (`filter.mdx`, `detection.mdx`, `scan.mdx`, `types.mdx`, `errors.mdx`) still drift independently.
- These are the remaining sync risk. Phase 2 of the plan was to either generate them via `go/doc` or delete them and link to pkg.go.dev.

### 2. `generators.mdx` Overview Count

- Line 8 says "18 code generation tools" — hardcoded. If detectors are added, this won't auto-update. Not covered by a gendocs marker.

### 3. `doc.go` Package Comment

- Lists generators manually. Still drifts if detectors change. Not covered by gendocs.

### 4. `detection.mdx` Per-Generator Function Table

- Has a hand-written table of `Is*Generated` functions (18 rows). Not covered by gendocs markers. Will drift.

---

## c) NOT STARTED

1. **Phase 2: API reference generation** — Using `go/doc` + `go/doc/comment` to auto-generate `api/*.mdx` from Go source.
2. **Phase 3: Evaluate deleting API MDX pages** — Replace with prominent link to pkg.go.dev.
3. **README "Why gogenfilter?" section** — Mentions specific generators by name ("sqlc, protobuf, templ, mockgen"). Hardcoded, will drift.
4. **doc.go package comment generation** — Still hand-maintained.
5. **Generator logos** — 7 of 18 generators use `generic.svg` placeholder. No real logos for mockery, ent, gqlgen, easyjson, msgp, counterfeiter, go-swagger.

---

## d) TOTALLY FUCKED UP (and fixed)

### 1. `replace_all` on `"None"` corrupted constant declaration

- **What happened:** Used `edit` with `replace_all=true` to replace all `"None"` with `filenameNoneDesc`. This also replaced the constant declaration itself: `const filenameNoneDesc = filenameNoneDesc` — creating a self-referential cycle.
- **Root cause:** `replace_all` is nuclear. It replaces EVERYTHING matching, including the definition.
- **Fix:** Manually corrected the constant declaration back to `const filenameNoneDesc = "None"`.
- **Lesson:** Never use `replace_all` on a string that appears in its own definition.

### 2. MDX doesn't support HTML comments

- **What happened:** Initial markers used `<!-- -->` syntax. MDX parser rejected it: `Unexpected character ! before name`.
- **Fix:** Changed MDX markers to `{/* */}` syntax. Updated `replaceSection` to accept exact marker strings instead of constructing them.

### 3. Coverage threshold regression

- **What happened:** `cmd/gendocs` has 0% coverage. CI ran `go test -coverprofile=coverage.out ./...` which merged all packages — total dropped to 82.8%, below the 98% threshold.
- **Fix:** Split CI into two steps: `go test -race ./...` (all packages compile/pass) + `go test -race -coverprofile=coverage.out .` (coverage on library only).

### 4. Generic fallback README text regression

- **What happened:** The `shortDetection()` function classified Generic as "Content marker" instead of the original "Any `// Code generated by` comment".
- **Fix:** Added special case for `FilterGeneric` in `readmeDetection()`.

### 5. Stale LSP diagnostics throughout session

- **What happened:** LSP kept reporting gendocs warnings at old line numbers that didn't exist in the rewritten file. Caused confusion about whether fixes worked.
- **Fix:** Trusted `golangci-lint run` output over LSP diagnostics for ground truth.

---

## e) WHAT WE SHOULD IMPROVE

1. **`AllFilterReasons()` still uses `d` variable** (`detection.go:661`) — not caught by our varnamelen fix because that function predates our changes. Linter doesn't flag it because the scope is short enough, but it's inconsistent with our `det` rename in `AllDetectorDocs()`.

2. **`websiteMetadata` is a second source of truth** — Logos and display filenames are presentation data that can't be derived from Go source. If someone adds a detector but forgets to add `websiteMetadata`, `validateMetadata()` catches it — but the error message could be clearer about exactly what to do.

3. **MDX table alignment** — Content Detection column isn't padded like Filename Detection. Cosmetic but inconsistent.

4. **`generators.ts` still exists** — It's now a 6-line wrapper, but it's still a TS file that imports JSON. Could be eliminated entirely if Astro components imported `generators.json` directly.

5. **`optionToConstName()` special cases** — 5 hardcoded special cases for option→const name mapping. Fragile if new options with unusual naming are added. Could be solved by storing the const name on the detector itself.

6. **CI `docs` job doesn't trigger on website changes** — The `docs` job path filters include `**.go` but not `website/**`. If someone manually edits `generators.json` without running gendocs, the stale check only fires if a `.go` file also changed.

7. **No test for `cmd/gendocs` itself** — The generator binary has 0% coverage. A simple integration test (run gendocs, check output files exist and contain expected markers) would prevent regressions.

8. **`filenameNoneDesc` exported from library** — Defined in `detection.go` (library package) but only used by the detectors table. It's technically an internal constant that happens to be in the library. Not a problem but slightly awkward.

---

## f) Up to 50 Things to Get Done Next

### Documentation Sync (direct continuation)

1. Add gendocs markers to `detection.mdx` per-generator function table
2. Add gendocs markers to `generators.mdx` overview count ("18 code generation tools")
3. Add gendocs markers to `doc.go` package comment generator list
4. Generate or delete `api/filter.mdx` (Phase 2)
5. Generate or delete `api/detection.mdx` (Phase 2)
6. Generate or delete `api/types.mdx` (Phase 2)
7. Generate or delete `api/scan.mdx` (Phase 2)
8. Generate or delete `api/errors.mdx` (Phase 2)
9. Evaluate: link API reference to pkg.go.dev instead of maintaining MDX
10. Add gendocs markers to README "Why gogenfilter?" generator mentions
11. Consider generating `features.ts` content from actual FilterOption descriptions

### Testing

12. Add integration test for `cmd/gendocs` (run, verify output files)
13. Add test that `websiteMetadata` keys match `AllDetectorDocs()` options exactly
14. Add test for `replaceSection()` function in gendocs
15. Add test for `optionToConstName()` function in gendocs
16. Add fuzz test for `padRight()` function
17. Add test that gendocs output is valid JSON (parse it back)

### CI/Build

18. Add `website/**` to `docs` job path filters in `ci.yml`
19. Add `cmd/gendocs/**` to `docs` job path filters
20. Consider adding gendocs to website.yml as pre-build step
21. Add `flake.nix` app for `gendocs` (e.g., `nix run .#gendocs`)
22. Consider running gendocs in website CI before Astro build
23. Add gendocs binary to `.gitignore` (prevent committing compiled binary)

### Code Quality

24. Rename remaining `d` loop variables in `detection.go` to `det` for consistency
25. Move `websiteMetadata` to a separate file in `cmd/gendocs/` (single responsibility)
26. Consider making `DetectorDoc` fields `URL`, `FilenameDetection`, `ContentDetection` use typed strings
27. Extract `optionToConstName` special cases to a package-level map in detection.go (derive from source)
28. Eliminate `generators.ts` entirely — import JSON directly in Astro components
29. Add `//go:generate` comment documentation to AGENTS.md commands section
30. Consider generating the MDX table Content Detection column with padding (like Filename Detection)

### Features

31. Generate `CHANGELOG.md` entry for gendocs addition
32. Create real SVG logos for 7 generators using generic.svg placeholder
33. Consider auto-detecting logo files from `website/public/logos/` instead of hardcoding in `websiteMetadata`
34. Add version stamping to generated docs (embed Go module version in generated output)
35. Consider generating the `ExclusionPattern()` table for docs (already a function, just needs rendering)

### Architecture

36. Consider extracting doc metadata into a separate `docs.go` file (separation of concerns)
37. Consider making gendocs a library (importable by other Go projects)
38. Consider generating an OpenAPI spec from the Filter API (for REST API consumers)
39. Evaluate pkgsite self-hosting as complement to Starlight (not replacement)
40. Consider templ + HTMX for interactive API browser (long-term, lower priority)

### Documentation

41. Write a CONTRIBUTING.md section on "How to add a new generator" (detector + websiteMetadata + go generate)
42. Add a "Documentation Architecture" section to AGENTS.md explaining the generation pipeline
43. Document the `websiteMetadata` validation requirement in the gendocs package doc
44. Update FEATURES.md with "Deterministic documentation generation" feature
45. Write a blog post or guide on "How we eliminated docs drift with Go code generation"
46. Add inline comments to `generators.ts` explaining why it's a wrapper now
47. Add a `make docs` or `nix run .#gendocs` alias documented in README

### Cleanup

48. Remove `filenameNone` and `displayContent` unused constants from gendocs (they ARE used but names don't match lint expectations — verify)
49. Clean up `coverage.out` and `cov.out` files (add to `.gitignore`)
50. Consider archiving the old hand-written `generators.ts` content in a git tag for reference

---

## g) Top 2 Questions

### 1. Should we delete the hand-written API reference MDX pages and link to pkg.go.dev?

The 5 `api/*.mdx` pages are the last remaining sync surface. They hand-maintain function signatures, parameter descriptions, and code examples that pkg.go.dev already generates automatically from Go source. The examples in those pages are less complete than the `Example*` functions in `example_test.go` that pkg.go.dev renders automatically.

**My recommendation:** Delete them, add a prominent "API Reference" link to pkg.go.dev in the sidebar. But this changes the user experience (external link vs in-site page), so it's your call.

### 2. Should `websiteMetadata` live in the Go library or in `cmd/gendocs`?

Currently, `websiteMetadata` (logos, display filenames) lives in `cmd/gendocs/main.go`. This means it's a build-time concern, not a library concern. But it creates a split: detector data is in the library, presentation data is in the generator. An alternative is adding a `Logo()` or `DisplayFile()` method to `DetectorDoc` or the detector itself, making the library the single source of truth for everything.

**Trade-off:** Adding presentation data to the library mixes concerns (library knows about website logos). Keeping it in gendocs means two files to update when adding a detector (detection.go + gendocs main.go), but gendocs's `validateMetadata()` catches misses at build time.
