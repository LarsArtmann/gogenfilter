# Forgejo Migration — Execution Report (2026-10-25, ~18:30–19:30)

**Plan:** `docs/planning/2026-10-25_17-13_forgejo-ci-migration-pareto-plan.md`
**Session scope:** execute everything executable from the workstation. The single
user-gated step remaining is the flip (sudo). Everything else is staged so the
post-flip work is verification, not authoring.

## Done and verified

| Item | Status | Evidence |
|------|--------|----------|
| `.forgejo/workflows/probe.yml` (W1) | written; runs on push after flip | actionlint clean; dispatches egress/version probes (U1/U2) |
| `.forgejo/workflows/ci.yml` (W3) | written; all gates consolidated in one job | see verification below |
| `.forgejo/workflows/website.yml` (W5) | written; single job build+deploy (D1 default) | deploy fails soft without `FIREBASE_SERVICE_ACCOUNT`; build state on `/mnt/buildcache/gogenfilter-web` (NOEXEC workspace hazard) |
| `.forgejo/workflows/release.yml` (W8) | written; Forgejo release + optional GitHub release (D2 default) | `scripts/release-notes.sh` fixture-tested (found/missing/empty sections) |
| `.forgejo/workflows/benchmark.yml` (W12) | written; no GitHub-API coupling | `scripts/bench-threshold.sh` fixture-tested: ok/alert/fail/bootstrap/new/removed paths |
| `scripts/ci-health.sh` (W16) | written; dual-endpoint (v15 has no `/actions/tasks`) | verified graceful exit-2 pre-flip (Actions unit disabled on mirrors); true-shape test pending first runs |
| `testdata/bench-baseline.txt` | committed (32 benchmarks) | threshold self-test vs itself: 100% ok |
| **Master was RED — fixed** | `testdata/templ/page_templ.go` restored (deleted by an auto-commit on 2026-10-05, unnoticed for 20 days while GitHub Actions was billing-dead) | `nix run .#test-race` green after restore; gotcha recorded in AGENTS.md |
| **flake check was RED — fixed** | `website/flake.nix` double blank line (nixfmt) | `nix flake check`: all checks passed |
| AGENTS.md CI section | rewritten: Forgejo-primary truth, runner facts, runner hazards | — |
| RELEASING.md | rewritten for the Forgejo flow (effective at flip) | — |
| TODO_LIST.md | harvested: plugin-CI closed, LHCI killed (D3), version header v3.5.0→v3.6.1, migration follow-ups added | — |

### Local verification matrix (F21 — exact CI commands, this machine = runner host)

- `nix flake check` — **all checks passed**
- `nix run .#test` / `.#test-race` — **green** (race works under nix; gcc available)
- `nix run .#lint` — **0 issues**
- `nix run .#gendocs && git diff --exit-code` — **fresh**
- plugin tests via `nix shell nixpkgs#go_1_27 nixpkgs#gcc -c 'cd plugin && GOWORK=off go test ./...'` — **green**
- actionlint on all 5 workflows — clean (self-hosted `native` label warnings expected)
- shellcheck on all 3 scripts — clean

### U-facts resolved (probe pre-answers from the runner unit file)

- U2: runner PATH = nix 2.34.9, **go 1.26.8 (module needs 1.27 → all Go rides the flake / `nixpkgs#go_1_27`)**, node 24.21.0, jq 1.8.2, python3 3.14.7, curl, wget, gcc 16.2. No `bc` (coverage gate rewritten with awk). Probe run still confirms at runtime.
- Runner has NO ProtectSystem (unlike the flip/sync units) — /tmp writable; the real hazards are the NOEXEC workspace and inode-capped tmpfs (both encoded in website.yml).
- nixpkgs: `pnpm_11` = 11.27.0 (locked to the repo's pnpm@11 major; generic `pnpm` is v12 — avoided), `firebase-tools` 15.34.0, `golangci-lint` 2.15.0.

## Decisions applied (plan §6 defaults)

- **D1** (Firebase from LAN): full deploy path written; fails soft until the secret exists.
- **D2** (release home): Forgejo release always; GitHub release when `GH_RELEASE_PAT` set.
- **D3** (Lighthouse): killed — deletions happen in the cutover commit, not before.

## Remaining (all gated on the flip — needs sudo on evo-x2)

```sh
sudo systemctl start forgejo-flip-check@gogenfilter   # dry-run; read the plan output
sudo systemctl start forgejo-flip@gogenfilter         # the flip (deletes the disposable pull mirror, re-migrates from GitHub incl. releases, attaches the push mirror)
```

After the flip (agent-executable, next session or same): switch origin → push master →
watch `ci`/`website`/`probe` first runs → secrets (`FIREBASE_SERVICE_ACCOUNT`,
`GH_RELEASE_PAT`) → release drill → cutover deletions. Details: TODO_LIST
"Forgejo CI Migration" section.

**Mac clone warning:** after the flip, any push from a clone still pointing at GitHub
will fight the new push mirror — switch its origin first.

## Fidelity notes

- The drill tag (`v0.0.0-ci-drill`) intentionally has no CHANGELOG section, so
  `release-notes.sh --require` fails the pipeline — that IS the gate working. The drill
  should add a temporary CHANGELOG section to exercise the success path end-to-end.
- `forgejo.canonicalRepos` left untouched: no host sets it yet (S-1599, gated) and the
  flip script attaches the push mirror itself.

## Incident addendum (2026-10-25 19:07–19:30): flip false-failure, import fully successful

The user ran the flip; it died after 2m57s with `post-flip verify failed: GitHub had 11 open
issues but forgejo imported 0`. Investigation:

- **Import was 100% faithful**: Forgejo API shows `mirror=false`, `has_actions=true`,
  `release_counter=10` (all releases), `open_pr_counter=11`, `open_issues_count=0`, master HEAD
  `64d1a68` (= GitHub HEAD at flip time). GitHub had 11 open **PRs** and 0 real issues
  (`pulls?state=open` = 11; issues minus PRs = 0).
- **Root cause**: GitHub's `open_issues_count` counts issues AND PRs; Forgejo splits them
  (`open_issues_count` + `open_pr_counter`). The flip script compared GitHub's combined counter
  against Forgejo's issues-only counter → guaranteed false failure for any PR-only repo.
- **Consequence**: the script exited before the push-mirror attach — the repo is native with NO
  push mirror yet.
- **Fixes (SystemNix, committed + toplevel build verified)**:
  1. `_forgejo-scripts.nix` — verify now compares `open_issues_count + open_pr_counter` vs
     GitHub's `open_issues_count`, and the failure message reports both sides.
  2. `configuration.nix` — `gogenfilter` added to `canonicalRepos`, so the sync unit's phase 5
     attaches the push mirror idempotently (the designed recovery path; the flip script itself now
     refuses non-mirrors by design).
- **New hazard surfaced**: the sync PAT lacks the `workflow` scope (domains already 114 commits
  frozen as of 2026-10-25) — needed for gogenfilter until the cutover deletes `.github/workflows/`.
  Recovery sequence recorded in TODO_LIST (gh auth refresh → update-github-token → rebuild →
  start sync).
