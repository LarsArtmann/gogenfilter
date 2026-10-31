# Forgejo Migration — Full Status Update (2026-10-31 06:16)

**Plan:** `docs/planning/2026-10-25_17-13_forgejo-ci-migration-pareto-plan.md`
**Sessions covered:** 2026-10-25 (plan + execution staging), 2026-10-25 evening (flip + incident),
2026-10-30/31 (live CI debugging, SystemNix root-cause work).
**Trigger:** owner asked for a brutal comprehensive status update (sections a–g).

## Current headline state

- **gogenfilter is Forgejo-native**: flipped 2026-10-25 19:07 (import 100% faithful; the flip's
  verify false-failed on a counter-semantics bug — fixed upstream in SystemNix).
- **Forgejo CI is ALIVE and mostly working**: 5 workflows deployed; **benchmark is GREEN** (run 1,
  55s — the repo's first Forgejo-native green run). `ci.yml` and `website.yml` fail fast and are
  under active diagnosis (see c/e).
- **GitHub mirror is NOT attached yet** — root cause found this morning and fixed in SystemNix
  (unquoted `Environment=`, see d/§3). One rebuild + one sync run away.
- **origin switched** to Forgejo on this clone; `github` kept as fallback remote.

## a) FULLY DONE

1. All 5 Forgejo workflows written, validated (actionlint/shellcheck/fixture tests) and live:
   `probe.yml`, `ci.yml`, `website.yml`, `release.yml`, `benchmark.yml`.
2. Helper scripts: `release-notes.sh`, `bench-threshold.sh` (incl. committed 32-benchmark
   baseline), `ci-health.sh`.
3. Flip executed; import verified faithful (11 open PRs, 10 releases, Actions enabled, master =
   GitHub HEAD); flip-script verify bug root-caused and fixed in SystemNix (`_forgejo-scripts.nix`).
4. Two red-master bugs fixed pre-flip: daemon-deleted `testdata/templ/page_templ.go` restored;
   `website/flake.nix` nixfmt fix. All local gates green (flake check, test, race, lint, gendocs,
   plugin, vulncheck) on the exact pushed tree.
5. Docs truth: AGENTS.md CI section rewritten, RELEASING.md → Forgejo flow, TODO_LIST harvested
   (plugin-CI closed, LHCI killed/D3), execution report + incident addendum in docs/status/.
6. `journal` flake float: root-caused the toplevel breakage (journal's go.mod gained cqrs-htmx/v4
   before its flake wired it), float registered via `float-register`, toplevel proof green,
   lock+registry committed together.
7. Flip-script counter-semantics fix + `gogenfilter` in `canonicalRepos` committed in SystemNix.
8. **benchmark.yml green on the live runner** (proves checkout, nix shell, go caches, awk scripts).
9. Every-step tee-instrumentation of ci/website workflows into `gf-logs` (v15 has no job-log API);
   confirmed the instrumentation works (dir created by run 256).
10. Sync-PAT `workflow` scope: `gh auth refresh` done and VERIFIED via API headers; sops updated
    via `/tmp/flow-gh-token.sh` (forgejo-update-github-token isn't installed on this host).

## b) PARTIALLY DONE

1. **Push mirror attach** — `canonicalRepos` lists gogenfilter, but the sync unit only ever
   processes the FIRST repo (`domains`) because of the `Environment=` parsing bug (see d/§3).
   Quoting fix written and in SystemNix working tree; needs user rebuild + one sync run.
2. **Rendered sync token** — `/run/secrets/rendered/forgejo-sync.env` still differs from the
   refreshed gh token despite the sops set + claimed deploy. Either the rebuild didn't activate
   the new sops content or a rotation happened. Unverified — needs one rebuild + re-check.
3. **ci.yml green** — fails at ~30-32s; all steps pass locally (incl. runner-env simulation for
   flake check); exact failure still unidentified — step logs now exist in the Forgejo UI.
4. **website.yml green** — fails at ~61s; state-root EROFS fix landed but didn't change the
   outcome → second cause. Same: logs are in the UI now.
5. **TODO_LIST migration section** — flip item closed; later items (drill, cutover, secrets,
   retro) still pending behind the mirror + green runs.
6. **SystemNix deploy** — quoting fix uncommitted/unbuilt at report time (toplevel build running).

## c) NOT STARTED

1. Release drill (tag → `release.yml` → Forgejo release; needs a temporary CHANGELOG section).
2. Cutover deletions (`.github/workflows/`, `dependabot.yml`, `lighthouserc.json`, README badge).
3. Forgejo Actions secrets: `FIREBASE_SERVICE_ACCOUNT` (deploy leg fail-soft until then),
   `GH_RELEASE_PAT`, optional `RELEASE_TOKEN`.
4. First real website deploy verification + `firebase hosting:rollback` runbook note.
5. `probe.yml` has never run (paths-gated) — run it once to record U1/U2 facts officially.
6. `ci-health.sh` scheduling (Gatus/cron) — script ready, unwatched.
7. Renovate-vs-manual dependency decision (W14).
8. 1-week post-cutover retro (W18).
9. Mac clone origin switch (g-3) — clobber risk window is OPEN while GitHub is behind.
10. SystemNix push (7+ local commits incl. the flip fixes; the deployed generation was built from
    this tree — but the remote doesn't have the fixes).

## d) TOTALLY FUCKED UP (own failures, blunt)

1. **The fake "local verification = CI verification" gap.** I verified every workflow command
   locally and declared them runner-ready — then BOTH non-trivial workflows failed on the first
   real push. Local pass ≠ runner pass; the differences (uid, env, mounts, group walls) are only
   observable in a real run. I should have shipped a smoke workflow FIRST (trivially green
   probe-style job per workflow) instead of assuming.
2. **The website state-root bug was KNOWABLE BEFORE SHIPPING.** I read the runner unit myself and
   had `ReadWritePaths=/mnt/buildcache/ci-runner-cache` in hand — and still wrote a state root
   outside the whitelist. eventcatalog-hub had documented the exact wall on 2026-10-27; the hub
   build.yml comment was one grep away. Inexcusable.
3. **The push-mirror "only domains" behavior confused me for a full session.** I read the sync
   unit, the flip script, the phase scripts, polled journals — and the answer was systemd's
   `Environment=` quoting semantics, which I know. I burned hours on behavioral archaeology
   instead of asking "what does the PROCESS actually see" (systemctl show is sudo-gated, but a
   debug-echo workflow or a test with a fake list would have shown it in minutes).
4. **I created a false alarm (art-dupl/GOPRIVATE) and briefly misdiagnosed the coverage step.**
   My local repro environment was contaminated (my shell's GOPRIVATE, host go quirks) — I
   presented hypotheses as findings twice before validating them. The regression test then
   DISPROVED my own coverage theory (old step exits 0 locally) — I had already committed the
   "fix". The fix is harmless but the process was theory-first, evidence-later. Backwards.
5. **I pushed an empty "mirror probe" commit with push-triggered workflows armed** — it
   accidentally triggered 3 workflow runs (the push range contained real commits) against
   untested workflows. Worked out (found the failures fast) but it was luck, not design.
6. **Token bookkeeping drift**: I reported "sops updated ✓" based on the script's exit 0, without
   verifying the rendered env — which still differs. Verify the RENDERED artifact, not the write.
7. **Session-1 wrong claim in the plan**: V9 said "`permissions:` unsupported (warns)" and the
   plan carried it; hub's workflow uses `permissions:` fine. Minor, but it shows unverified
   facts migrating into plans unchallenged.

## e) WHAT WE SHOULD IMPROVE

1. **Always ship a smoke run first** for every new workflow target: `workflow_dispatch`-able
   trivial job before the real one.
2. **Read the process's actual environment**, not unit files, when debugging service behavior
   (systemd drop-ins/quoting/EnvironmentFile ordering defeat static reading).
3. **Reproduce failures with uncontaminated env** (`env -i` + the target's PATH) BEFORE
   theorizing; my first repro attempt failed to even find `nix` and I nearly concluded wrong.
4. **Check sibling-repo incident history** (hub run-comments) for shared-infrastructure walls
   BEFORE authoring against the same infrastructure — the EROFS lesson was documented 3 days
   prior.
5. **End-to-end beats forensics**: the token question should have been settled by one test push +
   "did GitHub receive it", not by comparing secrets.
6. **The tee-instrumentation should have been in the workflows from commit one** (v15 has no log
   API — server-side logs may even be eaten by zombie #14843). Persisted logs in the RW cache are
   the only reliable post-mortem on this runner.
7. **Verify rendered artifacts after deploys** (rendered env, attached mirrors), not intermediate
   write successes.
8. Stop trusting session summaries (mine included) — V3's "ProtectSystem=strict" was about the
   wrong unit; re-reading the runner unit myself flipped several conclusions.

## f) NEXT 50 (ordered by leverage; the user gates are marked)

1. [USER] `sudo nixos-rebuild switch --flake .#evo-x2` — deploys the Environment-quoting fix +
    flip-script fix + (fresh) sops-rendered PAT.
2. [USER] `sudo systemctl start forgejo-github-sync` — phase 5 should now attach gogenfilter's
    push mirror (and eventcatalog-hub/company/webphone/dnsblockd/media-atlas/pingen-spike's).
3. [agent] Verify mirror: push one commit → GitHub receives it (end-to-end).
4. [agent] Read ci.yml failing-step log (UI or gf-logs via owner) and fix the ~30s failure.
5. [agent] Read website.yml failing-step log and fix the ~61s failure.
6. [agent] Re-run until ci + website + benchmark all green.
7. [agent] Trigger probe.yml once (dispatch or self-path touch); record U1 (Firebase egress) +
    U2 (toolchain versions) in AGENTS.md.
8. [USER] Set `FIREBASE_SERVICE_ACCOUNT` + `GH_RELEASE_PAT` Forgejo secrets (Settings → Actions).
9. [agent] Trigger website deploy leg; verify gogenfilter.lars.software updated.
10. [agent] Release drill: temporary CHANGELOG section `v0.0.0-ci-drill` → tag → verify Forgejo
     release → delete tag+release.
11. [agent] Verify GitHub release via `GH_RELEASE_PAT` (D2) and tag propagation to GitHub.
12. [agent] Verify proxy.golang.org listing after mirror sync.
13. [agent] Cutover commit: delete `.github/workflows/` + `dependabot.yml` + `lighthouserc.json`,
     remove README CI badge.
14. [agent] Confirm push mirror propagates the cutover deletions to GitHub.
15. [agent] AGENTS.md/RELEASING.md final post-cutover pass (remove "deleted in cutover" tense).
16. [agent] TODO_LIST: close flip/mirror/secrets/drill/cutover items as they complete.
17. [agent] Investigate the stale rendered token mystery (compare sops content vs rendered env
     after a fresh switch; rule out gh-side rotation).
18. [agent] Diagnose `forgejo-branch-protect` domains 404 (it makes EVERY sync run red and masks
     real failures — SystemNix issue).
19. [agent] Make sync phases fail-soft per-repo (one repo's 404 shouldn't red the whole unit —
     SystemNix improvement).
20. [agent] Push SystemNix (flip-script fix, quoting fix, float, canonicalRepos) to origin.
21. [USER] Switch the Mac clone origin to Forgejo BEFORE its next push (clobber risk open).
22. [agent] Schedule `scripts/ci-health.sh` (Gatus check or cron) — zombie watch (#14843).
23. [agent] Confirm gf-logs pruning: the tee logs grow unbounded in ci-runner-cache — add a
     retention step (keep last N runs) or a periodic wipe.
24. [agent] Add `concurrency` cancel to probe.yml (missing).
25. [agent] Benchmark: decide whether the benchmark workflow should also run on the weekly
     canary schedule for drift detection.
26. [agent] art-dupl: re-check whether v0.9.0 compiles (TODO_LIST says v0.3.0 broken; v0.6-0.9
     exist now) → upgrade the pin if green.
27. [agent] gogenfilter plugin: same version-bump check for the plugin job's go_1_27 shell.
28. [agent] Review `runs-on` timeout budget: ci.yml 45m vs observed <2m — tighten after green.
29. [agent] Add runbook entry: "runner-only failure → check gf-logs first" to AGENTS.md.
30. [agent] Add a smoke workflow (trivial always-green job) as the canonical first canary for
     future workflow changes.
31. [agent] docs/status: annotate the 16:57 self-review with the flip incident + quoting bug
     (W18 retro seed).
32. [agent] CHANGELOG: migration entry under [Unreleased] (user-facing: CI moved to Forgejo).
33. [agent] website docs: CI badge/deployment notes mention Forgejo (docs pages reference
     GitHub Actions anywhere? sweep).
34. [agent] Delete the stray empty `/mnt/buildcache/gogenfilter-web`-era leftovers (done) and
     verify no other workflow writes outside the whitelist (audit all paths in all 5 workflows).
35. [agent] probe.yml: add GOPRIVATE/GOFLAGS env dump (would have caught the art-dupl false
     alarm class instantly).
36. [agent] ci.yml: consider caching eval (attic/nix-cache secrets — W15) only after green.
37. [agent] Decide gh-pages benchmark chart replacement (W12 scope note: dropped — confirm
     owner still happy with log-only).
38. [agent] Confirm D3 (lighthouse killed) still holds now that GH UI isn't the gate.
39. [agent] Sweep `.github/` for anything else alive (ISSUE_TEMPLATE, FUNDING, CODEOWNERS?)
     before deleting the directory wholesale — keep non-Actions files.
40. [agent] Verify dependabot ALERTS (security) still function after dependabot.yml deletion —
     they are repo-settings-based, but confirm the 13 open alerts remain visible.
41. [agent] After mirror works: confirm the 114-commit domains freeze starts draining (bonus
     proof the quoting fix worked fleet-wide).
42. [agent] Add gogenfilter to any downstream "sync expectations" docs (md-go-validator?).
43. [agent] Check whether gogenfilter's 11 open PRs matter post-flip (issue tracker now Forgejo —
     are those PRs still wanted? owner decision).
44. [USER/agent] Confirm D2 defaults still right now that GH_RELEASE_PAT exists.
45. [agent] Tag a real release once green (v3.6.2?) to exercise the full pipeline honestly.
46. [agent] Update plan doc: mark W1/W2/W3 done, W4-W13 statuses, new errata (Environment bug).
47. [agent] Archive execution report + this report per docs-health conventions.
48. [agent] Consider `nix run .#deploy` integration for SystemNix deploys (the runbook mentions
     it wires float-register) — owner decision.
49. [agent] Document the runner's write-whitelist in gogenfilter AGENTS.md gotchas (partially
     done in CI section — add the gf-logs pattern).
50. [agent] Retrospective at +1 week (W18): deploy reliability, zombie watch, capacity.

## g) Questions I cannot answer myself

1. **Did the `nixos-rebuild switch` actually run and activate?** The rendered sync env still
   holds the OLD gh token, which says no (or the sops content didn't reach activation). What
   exactly did you run, and when relative to `/tmp/flow-gh-token.sh`? (I can't read
   `/run/secrets` timestamps meaningfully across your deploys.)
2. **Is the domains `branch-protect` 404 a known/owned issue?** It fails EVERY sync run (exit 1,
   OnFailure noise, hourly). Do you want me to fix/soften it in SystemNix, or is another session
   already on it? I don't want to collide with parallel work in your infra repo.
3. **Post-flip issue tracking**: the 11 open PRs (now on Forgejo) — do you intend to land/keep
   them, or should they be closed/stale-marked after the mirror works? This decides whether the
   Forgejo PR workflow is load-bearing for this repo and whether I should wire notifications.
