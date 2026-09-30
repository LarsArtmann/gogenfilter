# Status Report — Go 1.27 Migration Completion & Quality-Gate Recovery

**Generated:** 2026-09-30 06:04 CEST
**Session scope:** One session, started ~04:50 CEST from an unexplained 5-file working-tree diff (dead `//nolint:` removals + import reorder) and a broken `nix flake check`.
**Head at report time:** `32f4e76` (auto-commit daemon committed all session work; ~11 daemon commits this session, multiple commits unpushed — branch was `+1` vs `origin/master` at session start).
**Primary source:** TODO_LIST.md, AGENTS.md, flake.nix, `.github/workflows/{ci,benchmark}.yml`, art-dupl HTML report pasted by the user.

---

## a) FULLY DONE

Every item below is verifiably green in this session's final gate run (`nix flake check` → "all checks passed", exit 0).

| # | Item | Evidence | Scope |
|---|------|----------|-------|
| a1 | **Original 5-file diff assessed and completed correctly** — the uncommitted `//nolint:` removals were validated (build/vet/test/lint) and their leftover artifacts fixed (2 stray blank lines in `cmd/gendocs/integration_test.go` that caused `whitespace` + `wsl_v5` findings) | golangci-lint 0 issues; full suite `ok` | `cmd/gendocs/integration_test.go` |
| a2 | **Lint 17 → 0 issues** — root cause: `.golangci.yaml` enables renamed `*_v5` linters (`exhaustruct_v5`, `wsl_v5`) but production code still carried `//nolint:exhaustruct` (silently dead; nolintlint does not flag directives naming non-enabled linters). Renamed 4 production directives to `exhaustruct_v5`, removed unused `goconst` from the `websiteMetadata` nolint in `cmd/gendocs/main.go` | `nix run .#lint` → `0 issues` | `errors.go`, `filter.go`, `cmd/gendocs/main.go` |
| a3 | **Go 1.27 migration completed in flake.nix** — `goPkg = pkgs.go_1_27` and `buildGoModule` → `buildGo127Module` (empirically proven: `buildGoModule` in this nixpkgs is hard-aliased to `buildGo126Module` and silently ignores a `go =` parameter; builder logs said "running go 1.26.7" while go.mod requires 1.27) | `nix develop -c true` → "go version go1.27.1"; go-modules drv builds | `flake.nix` |
| a4 | **`plugin/` excluded from Nix src fileset** — the fileset included `plugin/*.go` but not `plugin/go.mod`, so the root Nix build compiled the separate plugin module against the root module and failed on `plugin-module-register` | `checks.build` green | `flake.nix` (`goFiles = lib.fileset.difference …`) |
| a5 | **treefmt check repaired for Go 1.27** — treefmt formatters (goimports) shell out to `go`; sandboxed toolchain auto-download is network-blocked. `checks.format` now gets `goPkg` in `nativeBuildInputs` + `GOTOOLCHAIN = "local"`; `treefmt.flakeCheck = false` removed the module's duplicate unpatched `checks.treefmt` (pre-existing redundant check) | `checks.format` green in `nix flake check` | `flake.nix` |
| a6 | **`mdgo` rebuilt locally with Go 1.27** — upstream md-go-validator flake has the same `go_1_26`-vs-go.mod-1.27 breakage; the flake now replicates its package via `buildGo127Module` from the pinned input source, `doCheck = false` (upstream's src fileset omits `testdata/`, so its in-store integration test fails by construction) | `nix develop -c true` builds full devShell incl. mdgo; `nix run .#validate-docs` → "Valid: 34, Errors: 0" | `flake.nix` (`mdgo`) |
| a7 | **Both `vendorHash`es updated** from got-hashes after the Go 1.27 bump (gogenfilter `pkg`, `mdgo` replica) — per the existing AGENTS.md convention | `nix flake check` exit 0 | `flake.nix` |
| a8 | **CI updated for Go 1.27** — `ci.yml` + `benchmark.yml`: `go-version` "1.26" → "1.27" (all 6 pins), `GOEXPERIMENT: jsonv2` env removed (json v2 is default in 1.27; verified `GOEXPERIMENT=jsonv2 go build` still works so no landmine either way), `GOTOOLCHAIN: local` added for determinism, golangci-lint action `v2.12.2` → `v2.14.0` (exact parity with nixpkgs — version skew on `*_v5` linters would kill CI) | Local: `go build/test` green with and without GOEXPERIMENT. ⚠️ CI itself untested until push — see (d5) | `.github/workflows/ci.yml`, `benchmark.yml` |
| a9 | **All quality gates green at session end** — `nix flake check` (sandboxed build+test+format), `nix run .#test`, `.#test-race`, `.#lint`, `.#validate-docs`, plugin tests (`GOWORK=off`), `go generate ./...` freshness | exit 0 on all; final run after every change | whole repo (x86_64-linux only — see d4) |
| a10 | **Memory updated at discovery time** — AGENTS.md: 5 new gotchas (buildGoModule alias trap, treefmt Go requirement, v5 nolint rename, mdgo workaround, golangci-lint version lockstep) + vendorHash entry corrected; TODO_LIST.md: Go 1.27 migration marked DONE with evidence, new md-go-validator upstream TODO added | file diffs (committed by daemon) | `AGENTS.md`, `TODO_LIST.md` |

## b) PARTIALLY DONE

| # | Item | Works now | Remaining | Blocker | Effort |
|---|------|-----------|-----------|---------|--------|
| b1 | **Go 1.27 migration** | go.mod, flake, CI pins, gates all green locally | CI has not executed the new workflow files (needs push); cross-platform (darwin) Nix checks not evaluated (`nix flake check` warned: omitted aarch64-darwin, aarch64-linux, x86_64-darwin); benchmark baselines will shift | push permission (see g1) | S |
| b2 | **Dead `//nolint:exhaustruct` cleanup** | 4 production directives renamed and effective; situation documented in AGENTS.md | ~46 dead directives in `_test.go` files left in place (inert: test files exclude the linter via config; renaming them would make nolintlint flag all 46 as unused) | policy decision (see g2 alternative framing) | S |
| b3 | **md-go-validator workaround** | mdgo builds+runs via local replica in flake.nix; validate-docs green | Upstream repo still broken (its flake pins `go_1_26` against go.mod ≥ 1.27; `package.nix` src omits `testdata/`); TODO_LIST item filed; revert-to-upstream step pending | external repo ownership (see g3) | M |
| b4 | **Benchmark baseline integrity** | benchmark.yml updated to Go 1.27 | First CI benchmark run on 1.27 will shift numbers; the 150% alert threshold may fire spuriously against gh-pages baselines recorded on 1.26; no reset/re-baseline procedure applied | needs push + first run | S |

## c) NOT STARTED

Grounded in this session's observations + pre-existing TODO_LIST (no new research performed, per instructions).

| # | Item | Why not started | Still wanted? |
|---|------|-----------------|---------------|
| c1 | **art-dupl findings from this session** — the user's pasted HTML report showed 3 actionable clone groups (`replaceSection` marker logic ×2 in `cmd/gendocs/main.go:476/499`, `FilterGeneric` conditional ×2 at main.go:289/353, `_templ.go`/`_enum.go` suffix checks ×2 in `detection.go:328/349`). I never analyzed or fixed them — I went straight to the git-status diff. | Explicitly deprioritized by me in favor of gate recovery; the "deduplicate!" hint went unaddressed | Yes — see (f17)–(f19) |
| c2 | **v4 plugin publication track** (tag v0.1.0, plugin CI job, real golangci-lint integration test, `RegisterDetector` API, v4 breaking-change plan) — all pre-existing TODO_LIST items | Out of session scope (gate recovery first) | Yes — HIGH per TODO_LIST |
| c3 | **Website visual verification** (never rendered a pixel), Lighthouse baselines, cross-browser checks, LHCI token | No browser/needs external setup; pre-existing | Yes |
| c4 | **Cross-project lessons** — "buildGoModule ignores `go =` param" and "repeated pipeline masking" qualify for `crush-config` `references/lessons.md` (committed there, not in-session writes) | Global install is read-only; cross-repo commit not requested this session | Yes |
| c5 | **CHANGELOG/README toolchain notes** — Go 1.27 switch is a developer-facing change; no changelog entry was written this session | Daemon committed code fixes; no release was cut | Yes — small |
| c6 | **`nix run .#vulncheck`** — the app exists; I never ran it on 1.27 this session | Not part of the mandatory gate trio | Yes — cheap |

## d) TOTALLY FUCKED UP

Radical honesty — including my own mistakes this session.

| # | What is broken | Severity | Root cause | Mitigation |
|---|----------------|----------|-----------|------------|
| d1 | **The repo sat with broken mandatory quality gates and nobody noticed.** `nix flake check` failed on the go-modules derivation (go.mod 1.27 vs pinned go 1.26) from the moment go.mod was bumped (commit `49ed3c5`, 04:56, before this session) until I fixed it. The Go 1.27 TODO_LIST item said "assess Nix pin before bumping" — the bump happened anyway, half-done. | High (blocks all Nix-based verification, masks regressions) | Toolchain bump executed without running the mandatory gates | Done this session; process fix in (e2) |
| d2 | **CI has been red-in-waiting since the same commit** — `ci.yml`/`benchmark.yml` pinned `go-version: "1.26"` against a go.mod requiring 1.27; every push to master would fail. Fixed locally now, but unverified by an actual run. | High (blocks CI) | Same half-done bump | (f6)/(f7) |
| d3 | **My pipeline-masking mistake (repeated a known failure mode).** My first gate run was `nix flake check 2>&1 | tail -5 && echo FLAKE_CHECK_OK` — it printed `FLAKE_CHECK_OK` on a FAILED check. "Pipeline masking" is literally listed as a known lesson in the project's global references, and I did it anyway. Caught it myself within the same step by reading output, but the pattern is embarrassing. | Medium (session-only; no lasting damage) | `&&` chained onto `tail`, not onto the check | Rule for myself: `cmd; echo EXIT=$?`, never `cmd \| tail && echo OK`. Lesson candidate for (c4). |
| d4 | **All verification is x86_64-linux only.** `nix flake check` explicitly warned it omitted aarch64-darwin, aarch64-linux, x86_64-darwin. Every "all gates green" claim in this session is single-platform. If the pinned nixpkgs lacks `go_1_27` for darwin, or `buildGo127Module` misbehaves there, I have not seen it. | Medium (Nix builds are dev-local; CI is GitHub-hosted linux) | No darwin builder available here | (f8) evaluation-only check; full build needs a darwin machine |
| d5 | **CI workflow edits are unverified by execution.** I cannot run GitHub Actions locally. The golangci-lint action version bump and `GOTOOLCHAIN: local` addition are reasoned but not executed. | Medium until next push | No remote run without push | (g1)/(f6) |
| d6 | **I misread evaluation staleness once** — `builtins.getFlake (toString ./.)` on a dirty git tree resolves the committed flake, so one round of "which go does the derivation use" was measured against HEAD, not my working tree. I caught it (switched to `.#` URL syntax) but the first conclusion was formed on stale data. | Low (session-only) | Nix flake-in-git semantics | Use `.#` from cwd for working-tree evaluation |
| d7 | **Sloppy edit batches** — one multiedit carried an edit intended for `errors.go` into the `filter.go` batch (failed harmlessly), and one `old_string` had a wrong trailing comma (`...,` vs `...`) costing a retry. Two wasted rounds out of ~25. | Low (session-only) | Rushed batching | Batch only same-file edits; exact-match discipline |
| d8 | **Pre-existing: `checks.format` and `checks.treefmt` were duplicate identical checks** (both evaluated the same drv) — pure noise in every check run since the treefmt module was adopted. Fixed this session via `treefmt.flakeCheck = false`. | Low (was waste, now resolved) | Copy-paste config evolution | Resolved (a5) |

## e) WHAT WE SHOULD IMPROVE

1. **Make the Nix gates a CI gate, not a local habit.** This whole incident class (flake drift breaking `nix flake check`) is invisible to CI today — CI is pure GitHub Actions. A `nix flake check` job (installer action) would have caught the half-done 1.27 bump within minutes of the bad commit. (f16)
2. **Never bump a toolchain pin without running the mandatory trio immediately.** The AGENTS.md rule exists; the go.mod bump violated it. BuildFlow/config-level enforcement (pre-commit or CI) beats memory. (f15)
3. **Pin `pkgs.golangci-lint` in flake.nix and keep the CI action version in lockstep mechanically.** Right now nixpkgs floats (2.14.0 today) and CI pins (2.14.0 by my hand). The next `nix flake update` can silently raise the local linter past CI's pin, reintroducing "unknown linter" or behavior drift. A tiny script comparing both versions in CI would turn drift into a red X. (f10)/(f38)
4. **Add `lint` (and optionally `vulncheck`) as actual flake `checks`.** Today `nix flake check` runs build+test+format but NOT lint — lint is only an app. A locally-passing `nix flake check` can coexist with red lint. I ran lint manually; the gate trio in AGENTS.md is convention, not enforcement. (f46)/(f47)
5. **Decide a policy for dead nolint directives.** 46 inert `//nolint:exhaustruct` lines in tests are misleading documentation. Either sweep them (accepting nolintlint won't help — it skips non-enabled linters) or rename them and drop the test exclusion for exhaustruct_v5 (stricter, noisier). Defaults currently make "dead suppression" the stable state. (b2)
6. **`toolchain go1.27.1` directive in go.mod.** Two toolchains were in play this session (system go 1.27.0, Nix go 1.27.1). A `toolchain` directive removes patch-level ambiguity for non-Nix environments while `GOTOOLCHAIN=local` keeps Nix/CI hermetic. (f34)
7. **The `cat`-via-exec in `cmd/gendocs/integration_test.go`** — `exec.CommandContext(ctx, "cat", check.path)` shells out to `cat` where `os.ReadFile` would do; noticed while fixing the blank lines there. Smaller surface, one less PATH dependency in tests. (f40)
8. **Benchmark re-baseline procedure on toolchain changes.** Toolchain bumps (1.26→1.27) shift benchmark numbers; the 150% alert will cry wolf. A documented "reset baseline after toolchain bump" step in RELEASING.md or the benchmark workflow closes the loop. (f37)
9. **Status-report format divergence** — this report is `.md` per explicit user instruction; the status-report skill's canonical format is styled HTML. If `.md` becomes the norm for this repo, the skill (or a project override) should say so, so future sessions stop flagging it. (meta)

## f) TOP 50 THINGS WE SHOULD GET DONE NEXT

Brainstorm ranked by impact, tagged for `docs-health` HARVEST (Impact / Effort: S<30min, M 30min–2h, L>2h / Category). Items 1–10 are the real queue; 11–50 are ROADMAP fuel.

| # | Task | Impact | Effort | Category |
|---|------|--------|--------|----------|
| 1 | Push branch to origin/master so CI executes the new Go 1.27 workflow files (blocked on user, see g1) | Critical | S | DevOps |
| 2 | Watch first post-push CI run end-to-end; fix any action/lint-version fallout | Critical | S | Bug |
| 3 | HARVEST this report's (f) list into TODO_LIST.md / ROADMAP.md (items 11–50 mostly ROADMAP) | High | S | Documentation |
| 4 | Publish plugin module `v0.1.0`: remove `replace` from `plugin/go.mod`, tag, verify `golangci-lint custom` builds (TODO_LIST) | High | S | Feature |
| 5 | Add plugin CI job: `cd plugin && GOWORK=off go test ./...` (TODO_LIST) | High | S | Feature |
| 6 | Add `nix flake check` job to GitHub CI (nix installer action) so flake drift fails CI, not local sessions | High | M | DevOps |
| 7 | Add `lint` as a real flake `checks.lint` (currently app-only; `nix flake check` doesn't lint) | High | S | Quality |
| 8 | `nix flake check --all-systems` evaluation for darwin/aarch64 attr errors (eval-only from linux) | High | S | Quality |
| 9 | Pin `pkgs.golangci-lint` version in flake.nix + CI comparison check (lockstep, kill float drift) | High | S | Quality |
| 10 | Fix `LarsArtmann/md-go-validator` upstream: `buildGoLatestModule` + `testdata/` in src fileset; then revert mdgo workaround (TODO_LIST) | Medium | M | Bug |
| 11 | Re-run `nix run .#coverage` on 1.27 to pre-verify the CI 98% threshold hasn't shifted | Medium | S | Quality |
| 12 | Run `nix run .#vulncheck` on 1.27 (app exists, unexercised this session) | Medium | S | Quality |
| 13 | Benchmark re-baseline after first 1.27 CI run (expect spurious 150% alerts vs 1.26 baselines) | Medium | S | DevOps |
| 14 | Add `toolchain go1.27.1` to go.mod (kill 1.27.0-vs-1.27.1 patch ambiguity outside Nix) | Medium | S | Quality |
| 15 | Enforce "gates before toolchain bump": BuildFlow pre-commit step running `nix flake check` on go.mod/flake.nix changes | Medium | M | Process |
| 16 | Fix art-dupl clone group #1: extract duplicated marker-replace logic in `cmd/gendocs/main.go:476/499` | Medium | S | Cleanup |
| 17 | Fix art-dupl clone group #2: dedupe `FilterGeneric` conditional `cmd/gendocs/main.go:289/353` | Low | S | Cleanup |
| 18 | Fix art-dupl clone group #3: extract shared filename-suffix check `detection.go:328/349` | Low | S | Cleanup |
| 19 | Sweep or rename the 46 dead `//nolint:exhaustruct` directives in `_test.go` (needs policy, see e5) | Low | S | Cleanup |
| 20 | Replace `exec cat` with `os.ReadFile` in `cmd/gendocs/integration_test.go` | Low | S | Cleanup |
| 21 | Remove dead `- exhaustruct` (old name) from `.golangci.yaml` test exclusions (line ~285; `exhaustruct_v5` already present) | Low | S | Cleanup |
| 22 | CHANGELOG entry for Go 1.27 toolchain switch (developer-facing change; also satisfies website CHANGELOG-sync check on next release) | Medium | S | Documentation |
| 23 | Record cross-project lessons in crush-config `references/lessons.md`: buildGoModule `go =` param trap; pipeline-masking repeat; getFlake dirty-tree staleness | Medium | S | Process |
| 24 | Real golangci-lint integration test for plugin: build custom binary, run against generated-files fixture (TODO_LIST) | Medium | M | Feature |
| 25 | Design `RegisterDetector(...)` custom-detector API (thread-safe, table-integrated, derived-list-safe) (TODO_LIST) | Medium | L | Feature |
| 26 | Plan v4 breaking changes inventory for `/v4` (TODO_LIST) | Medium | M | Feature |
| 27 | Add `.#plugin-test` nix app (one-command plugin test; also documents the GOWORK=off requirement) | Low | S | DevOps |
| 28 | Investigate building the plugin module as a nix check (two-tree src for the `replace ../` directive) | Medium | M | DevOps |
| 29 | Website: visual verification with screenshots (every page, both themes, mobile) — TODO_LIST HIGH | High | M | Quality |
| 30 | Website: Lighthouse baseline audit on post-redesign site (TODO_LIST) | Medium | M | Quality |
| 31 | Website: cross-browser verification (Chrome/Firefox/Safari; color tokens, CSP, OG images) | Medium | S | Quality |
| 32 | Website: configure `LHCI_GITHUB_APP_TOKEN`, then upgrade lighthouserc assertions warn→error | Low | S | DevOps |
| 33 | Website: remove 4 redundant pnpm overrides + regenerate lockfile (audited 2026-08-10, blocked on pnpm env) | Low | S | Cleanup |
| 34 | Ops: prune orphaned GCP service-account keys + max-2-active-keys policy (TODO_LIST; needs gcloud auth) | Low | S | DevOps |
| 35 | art-dupl upstream: fix v0.3.0 compile breakage or replace tool (TODO_LIST) | Low | M | Bug |
| 36 | art-dupl consumer: migrate `shouldIncludeFile` to `FilterDetailedAndContent` (TODO_LIST) | Low | S | Feature |
| 37 | Update RELEASING.md: toolchain requirement (Go 1.27), mdgo workaround note, benchmark re-baseline step | Low | S | Documentation |
| 38 | Verify README/website docs don't still claim GOEXPERIMENT/jsonv2 or Go 1.26 anywhere (suite's readme_test passed, but docs text may predate) | Low | S | Documentation |
| 39 | Verify `release.yml` (`go-version-file: go.mod`) resolves 1.27 correctly on next tag (eval/rehearse) | Medium | S | DevOps |
| 40 | Run gendocs freshness as part of local pre-finish routine (CI has it; local gates don't) — add to BuildFlow config if supported | Low | S | Process |
| 41 | Decide strict-dedup CI stage vs manual deep-scan runs of art-dupl `-t 2` (this session's `-t 2` scan showed 46 groups at 43-suppressed — threshold tuning question) | Low | S | Process |
| 42 | Confirm `docs/DOMAIN_LANGUAGE.md` existence/need (referenced by global AGENTS.md discovery checklist; never verified in this repo) | Low | S | Documentation |
| 43 | Grep website content for stale Go-version/GOEXPERIMENT references introduced before migration | Low | S | Documentation |
| 44 | Add a `checks.vulncheck` flake check (parity with f12) if runtime cost is acceptable | Low | S | Quality |
| 45 | Consider `checks.test-race` in flake (race currently only via app + CI) | Low | S | Quality |
| 46 | Commit-message quality: daemon's `chore: auto-commit N file(s)` blobs make bisect useless for sessions like this one; propose per-area commit hints to BuildFlow config (may not be configurable — investigate) | Low | M | Process |
| 47 | docs/status/ hygiene: 7 active reports; next docs-health pass should ANNOTATE resolved items from 2026-08-11 reports (theme toggle etc. — likely done) | Low | S | Documentation |
| 48 | Plugin: verify against the actual golangci-lint 2.14.0 in the nix devshell (build custom binary locally; de-risks f24 before writing CI fixtures) | Medium | M | Quality |
| 49 | `flake.nix`: move the mdgo replica behind a comment linking the upstream TODO_LIST item (partially done — comment exists; add TODO cross-ref) | Low | S | Documentation |
| 50 | Schedule the next `nix flake update` deliberately (lockfile drift caused this incident chain: nixpkgs bump renamed linters, flipped buildGoModule alias, and broke md-go-validator input — all at once) + record what to check after (lint version parity, vendorHashes, gates trio) | Medium | S | Process |

## g) QUESTIONS I CANNOT FIGURE OUT MYSELF

1. **Should I push the branch to origin/master now?** The branch carries every fix from this session (flake, CI workflows, lint, docs) but CI cannot validate the edited workflow files until they exist on the remote — and I will not push unasked. If release cadence or branch protection is holding master back deliberately, tell me where to land the work instead (feature branch name?).
2. **Was your `art-dupl --sort total-tokens -t 2 … && echo "deduplicate!"` run a work order?** I treated the pasted report as context and never touched the 3 flagged clone groups (main.go ×2, detection.go ×1). If "deduplicate!" meant "fix these now", say the word and items f16–f18 jump the queue.
3. **Is another session actively working in `md-go-validator` (or `art-dupl`) right now?** The md-go-validator fix (f10) and the cross-repo lessons commit (f23) require touching sibling repos I don't own. If they're idle, I can fix md-go-validator's flake locally and re-lock this repo's input; if they're mid-flight, I'll stay out.

---

*Report format note: written as `.md` per explicit user instruction; the status-report skill's canonical output is styled HTML (`docs/status/*.html`). This override is one-off and intentionally not propagated into the skill.*
*Per the harness contract (Crush: never commit unasked), this report is not manually committed — the auto-commit daemon picks it up.*
