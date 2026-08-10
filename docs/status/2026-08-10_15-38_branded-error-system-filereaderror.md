# Status Report: Branded Error System — FileReadError & NewFilter Wrap

**Date:** 2026-08-10 15:38
**Session Goal:** "Can we have better errors?" — triggered by erraudit output showing 5 ERROR + 1 WARNING violation
**Branch:** master (uncommitted)
**Commits this session:** None (all changes in working tree)

---

## a) FULLY DONE

### `FileReadError` branded type added (`errors.go`)

- New `FileReadError` struct: `Code`, `Path`, `Err` fields
- New `CodeFileRead` constant (`"file_read"`)
- New `ErrFileRead` sentinel error
- Implements `Error()`, `Unwrap()`, `Is()`, `ErrorCode()` — consistent with `ProjectRootError`, `FilterConfigError`, `SQLCConfigError`
- Branded `[gogenfilter:file_read]` prefix in all messages

### `readFile` is the single branding point (`detection.go`)

- `readFile` now returns `*FileReadError` on all failure paths (`fs.ReadFile` failure, `os.ReadFile` fallback failure)
- Removed the old `//nolint:wrapcheck` on `os.ReadFile` — no longer needed since we return a branded type, not the raw error
- Removed the `fmt.Errorf("read file from fs: %w", err)` — replaced by branded error

### All `readFile` callers simplified (4 call sites)

Every caller that previously did `fmt.Errorf("read file %q: %w", filePath, err)` now just returns `err` directly:
- `detection.go:493` — `detectReasonFileFS` (powers `DetectReasonFile` and `DetectReasonFileFS`)
- `detection.go:714` — `detectReasonFSWithTrace` (powers `detectReasonFS`)
- `filter.go:324` — `FilterDetailedAndContent`
- `filter.go:224` — `filter_content_return_test.go` (test helper, no change needed)

### `DetectReasonReader` branded (`detection.go`)

- `io.ReadAll` failure now returns `*FileReadError` instead of `fmt.Errorf("read content from %q: %w", ...)`

### `NewFilter` wraps joined errors (`filter.go`)

- `errors.Join(errs...)` is now wrapped in `&FilterConfigError{Code: CodeInvalidFilterOption, Err: errors.Join(...)}`
- Top-level error from `NewFilter` is always branded
- Individual inner errors remain discoverable via unwrap chain

### `FilterConfigError.Error()` handles empty `Option`

- New code path: when `Option` is empty (joined-errors case), shows `"invalid filter configuration"` instead of `invalid filter option ""`
- Three branches: `(Option, Err)`, `(Option, no-Err)`, `(no-Option, Err)`, `(no-Option, no-Err)`

### Tests (12 new test functions, 311 new lines in `errors_test.go`)

| Test | Covers |
|------|--------|
| `TestFileReadErrorMessaging` | Branded prefix, path in message, with/without cause |
| `TestFileReadErrorIs_Sentinel` | `errors.Is(err, ErrFileRead)` matches |
| `TestFileReadErrorIs_WrongSentinel` | `errors.Is` doesn't match wrong sentinel |
| `TestFileReadErrorIs_CrossType` | No cross-type matching with `ProjectRootError` |
| `TestFileReadError_Unwrap` | Inner `os.ErrPermission` discoverable |
| `TestFileReadError_ErrorCode` | `ErrorCode()` returns `CodeFileRead` |
| `TestFilterConfigErrorMessaging_EmptyOption` | Empty-Option message formatting (2 subtests) |
| `TestNewFilterBrandsJoinedErrors` | `NewFilter` returns branded `FilterConfigError` (2 subtests) |
| `TestDetectReasonFileFS_ReturnsBrandedFileReadError` | Integration: public API returns branded error |
| `TestFilterDetailedAndContent_ReturnsBrandedFileReadError` | Integration: Filter method returns branded error |
| `TestDetectReasonReader_ReturnsBrandedFileReadError` | Integration: Reader API returns branded error |
| `TestErrorCodeIncludesFileRead` | `CodeFileRead.String() == "file_read"` |
| `TestFileReadErrorFsPathError` | `readFile` directly returns branded error |

- `TestErrorCode` updated to include `CodeFileRead` in the table
- BDD spec `bdd_test.go:331` updated to expect branded message

### Quality gates — ALL PASSED

| Gate | Result |
|------|--------|
| `go vet ./...` | Clean |
| `go test ./... -count=1 -race` | 222 tests pass (170 BDD + 52 standard) |
| `golangci-lint run` | 0 issues |
| `nix run .#lint` | 0 issues |
| `nix run .#test` | Pass |
| `nix flake check` | All checks passed |
| Coverage | 98.0% (was 98.3% — the new error paths in `readFile` absolute-path fallback are partially covered) |

### AGENTS.md updated

- 3 new design-decision bullets documenting `FileReadError`, `NewFilter` branding, and the `samber/oops` false assumption

---

## b) PARTIALLY DONE

### scan.go errors still unbranded

`ScanProject` returns 5 unbranded `fmt.Errorf` calls from public API:
- `scan.go:99` — `fmt.Errorf("configure default options: %w", err)`
- `scan.go:109` — `fmt.Errorf("create filter: %w", err)`
- `scan.go:114` — `fmt.Errorf("collect Go files: %w", err)`
- `scan.go:165` — `fmt.Errorf("walking %s: %w", path, err)`
- `scan.go:183` — `fmt.Errorf("walk filesystem: %w", err)`

These were NOT flagged by erraudit (it focused on filter/project/sqlc), but they're the same class of issue — `ScanProject` is a public API returning unbranded errors.

### The 2 erraudit "false positive" findings in sqlc.go

- `sqlc.go:173` — `fmt.Errorf("accessing %q: %w", filePath, err)` inside `walkPathForSQLCConfigs`
- `sqlc.go:522` — `fmt.Errorf("accessing %q: %w", filePath, err)` inside `FindSQLCConfigsFS`

These are passed to `sqlcWalkError(path, err)` which wraps them in `SQLCConfigError`. They're technically inside branded wrappers, BUT the intermediate `fmt.Errorf` adds an unnecessary wrapping layer — the walk error could pass the raw error to `sqlcWalkError` and let the branded type add the path context.

### project.go:24 — `fmt.Errorf` inside `ProjectRootError.Err`

`fmt.Errorf("getting absolute path for %q: %w", startPath, err)` is assigned to `ProjectRootError.Err`. This creates a double-message: the branded error prints the `fmt.Errorf` message via `%v`, which itself wraps the original error. Could just pass `err` directly.

---

## c) NOT STARTED

### doc.go not updated

`doc.go` is the package documentation file. It may list error types or reference error handling patterns. Not checked, not updated. If it enumerates error codes or types, `FileReadError` is missing.

### Website error documentation not updated

If the website has any page documenting error codes or types (e.g., `api/detection.mdx`, `api/errors.mdx` — though AGENTS.md says API pages were deleted in favor of pkg.go.dev), `file_read` code is not mentioned. The gendocs pipeline doesn't generate error docs (it generates detector docs), so this may be a non-issue.

### erraudit not re-run to verify improvement

Did not run `erraudit` again after changes to see how many violations dropped from the original 6. The tool may not be installed in the Nix devShell — it was run manually by the user.

### `erraudit` not added to CI/Nix lint pipeline

If `erraudit` is a valuable tool for this project, it should be wired into the Nix lint app or CI workflow. Not investigated.

---

## d) TOTALLY FUCKED UP

Nothing critically broken. All tests pass, all gates pass. But there are real gaps in thoroughness (see below).

---

## e) WHAT WE SHOULD IMPROVE

### Process mistakes this session

1. **Didn't re-run erraudit** — Made changes to satisfy erraudit findings but never verified the tool reports fewer violations. Should have run it before and after.

2. **Didn't scan ALL public API error returns** — Only fixed the 6 findings erraudit reported. There are 5 more unbranded `fmt.Errorf` returns in `scan.go` that erraudit didn't flag but are the same problem. A systematic grep for `fmt.Errorf` in non-test `.go` files would have caught these.

3. **Didn't use the existing `testCrossTypeMismatch` helper** — `errors_test.go:90` has a `testCrossTypeMismatch` function designed for exactly the cross-type Is() test I wrote. I duplicated the logic in `TestFileReadErrorIs_CrossType` instead of extending the helper or using it.

4. **`FileReadError` doesn't distinguish read source** — `SQLCConfigError` has an `Operation` field. `FileReadError` could similarly distinguish `fs.ReadFile` vs `os.ReadFile` vs `io.ReadAll` failures. Decided YAGNI, but worth noting.

5. **Coverage dropped 0.3%** — From 98.3% to 98.0%. The new `readFile` absolute-path fallback branch (`os.ReadFile` failure path) is harder to test without a real filesystem. Should add a test with an absolute path to a nonexistent file.

6. **Didn't check `errors_unwrap_test.go`** — There may be unwrap-chain tests that should be extended for `FileReadError`.

### Architectural observations

7. **Error system is inconsistent** — `FileReadError` has no `Operation` field, but `SQLCConfigError` does. `FilterConfigError` has `Option`, `ProjectRootError` has `StartPath` + `Markers`. Each error type has different domain fields. This is actually fine (different domains = different fields), but the `Error()` formatting patterns differ significantly between types.

8. **`scan.go` needs a `ScanError` type** — `ScanProject` wraps multiple different failure modes (config, filter creation, file collection, walking) in generic `fmt.Errorf`. A `ScanError` branded type with a `Phase` field would be consistent with the rest of the error system.

9. **`readFile` is in `detection.go` but is a general I/O utility** — It might belong in a dedicated `io.go` or `fsutil.go` file. Not a problem now, but worth noting if the file grows.

---

## f) Up to 50 things we should get done next

### Error system completion (high priority)

1. Brand `ScanProject` errors — create `ScanError` type or reuse existing types
2. Brand `collectGoFiles` walk errors in `scan.go:165,183`
3. Eliminate intermediate `fmt.Errorf` in `sqlc.go:173,522` — pass raw error to `sqlcWalkError`
4. Simplify `project.go:24` — pass `err` directly to `ProjectRootError.Err` instead of wrapping in `fmt.Errorf`
5. Add `Operation` field to `FileReadError` (read/fs_read/abs_read/stream_read)
6. Re-run `erraudit` to verify violation count dropped
7. Add `erraudit` to Nix devShell or CI lint pipeline
8. Add `FileReadError` to `testCrossTypeMismatch` helper instead of standalone test
9. Extend `errors_unwrap_test.go` with `FileReadError` unwrap-chain tests
10. Add test for `readFile` absolute-path fallback (coverage gap)

### Error system polish (medium priority)

11. Add `ScanError` type with `Phase` field (configure/create_filter/collect_files/walk)
12. Consider `SentinelError()` method on error types for programmatic sentinel access
13. Document error hierarchy in `doc.go` (error types, codes, sentinel pattern)
14. Add error code constants to `AllErrorCodes()` if it exists (AGENTS.md says it was removed — verify)
15. Consider `errors.As` examples in package docs for each error type
16. Add `CodeFileRead` to any error code validation/enumeration tests
17. Consider whether `FilterConfigError` should have a `Configs []string` field instead of `Option` for multi-error cases
18. Add integration test: `Filter.Filter()` (not just `FilterDetailed`) returns branded error on read failure
19. Add integration test: `Filter.FilterPaths()` propagates branded error correctly
20. Add integration test: `Filter.FilterPathsDetailed()` propagates branded error correctly

### Documentation (medium priority)

21. Update `doc.go` if it references error types/codes
22. Add error handling section to website getting-started guide
23. Update `errors.go` file-level comment to list all error types
24. Add `CHANGELOG.md` entry for `FileReadError` addition
25. Update AGENTS.md "Key Source Files" table for `errors.go` to mention `FileReadError`
26. Consider adding error flow diagram to docs (which APIs return which error types)

### Testing improvements (medium priority)

27. Add property-based test: every branded error type's `Is()` only matches its own sentinel
28. Add test: `errors.Join` of multiple branded errors — all individually discoverable
29. Add fuzz test: `FileReadError.Error()` never panics on any input combination
30. Add benchmark: branded error creation vs raw `fmt.Errorf` (performance impact)
31. Add test: `FileReadError` JSON/marshal behavior (if errors are ever serialized)
32. Update BDD suite count in AGENTS.md (says ~120, actual is 170)

### Previous session debt (from context)

33. Commit the 960 lines of P1 tests from previous session (still uncommitted)
34. Commit the branded error changes from this session
35. Run `go generate ./...` and verify freshness (`git diff --exit-code`)
36. Annotate previous status report (`2026-08-10_14-19_lint-cleanup-and-documentation.md`) — mark P1 items 5-15 as done
37. Decide version: v3.5.0 (new feature: FileReadError) vs v3.4.1 (bugfix: branded errors)
38. Update `RELEASING.md` if release process changed

### Code quality (lower priority)

39. Consider extracting error formatting helpers (`formatBrandedMessage`) to reduce `Error()` boilerplate
40. Audit all `//nolint` directives — several may be stale after error system changes
41. Run `govulncheck` to verify no new vulnerabilities introduced
42. Consider OpenTelemetry integration for error reporting (AGENTS.md principle: "Observability built-in")
43. Add structured error attributes for observability (path, operation, code as structured fields)

### Architecture (lower priority)

44. Consider whether error types should implement `GRPCStatus()` for gRPC integration
45. Consider whether error types should implement `HTTPStatus()` for HTTP API integration
46. Evaluate `cockroachdb/errors` as alternative to custom branded system (how-to-golang recommends it)
47. Consider error code registry/enum for validation
48. Add `SentinelFor(CodeFileRead)` helper or similar for programmatic sentinel lookup
49. Consider whether `readFile` should be exported for consumers who need branded file reads
50. Evaluate removing `filepath.Abs` fallback in `readFile` — force callers to use `fs.FS` consistently

---

## g) Questions

### 1. Should I brand the remaining `scan.go` errors now?

`ScanProject` has 5 unbranded `fmt.Errorf` returns. Should I create a `ScanError` branded type (with a `Phase` field like `"configure"`, `"walk"`, `"collect"`), or reuse `FilterConfigError` for the config-related ones and a generic branded wrapper for the walk errors?

### 2. Is `erraudit` a tool we should adopt permanently?

The tool assumes `samber/oops` enforcement, which this project doesn't use. Should I: (a) configure `erraudit` to understand the custom branded error system, (b) add `erraudit` to CI with appropriate flags, or (c) treat it as a one-time audit and not wire it in?

### 3. Should we commit the error changes and the previous P1 test work together or separately?

The working tree has two logical change sets: (1) 960 lines of P1 config-aware SQLC tests from the previous session, and (2) branded error system changes from this session. Should these be one commit, two commits, or should I hold the error changes until the P1 tests are committed first?

---

## Metrics Summary

| Metric | Before | After |
|--------|--------|-------|
| Branded error types | 3 (ProjectRoot, FilterConfig, SQLCConfig) | 4 (+ FileReadError) |
| Error codes | 8 | 9 (+ `file_read`) |
| Sentinel errors | 8 | 9 (+ `ErrFileRead`) |
| Unbranded `fmt.Errorf` in public API (non-test) | ~12 | ~7 (5 in scan.go + 2 in sqlc.go) |
| erraudit violations | 6 (5 ERROR + 1 WARNING) | Not verified (didn't re-run) |
| Test count | ~210 | 222 |
| Coverage | 98.3% | 98.0% |
| Lines changed | — | +386 / -23 across 6 files |
| Quality gates | — | All passed (go vet, test -race, golangci-lint, nix flake check) |
