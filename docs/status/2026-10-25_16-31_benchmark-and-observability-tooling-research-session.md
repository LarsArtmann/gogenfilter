# Status Report — Benchmark & Observability Tooling Research Session

- **Date:** 2026-10-25 16:31 CET
- **Scope:** This session only. Advisory/research Q&A; **zero code or config changes were made anywhere**. Report written to gogenfilter because it is the only project inspected this session (CWD `/home/lars/projects` is not a repo).
- **Session deliverables:** (1) CodSpeed adoption evaluation, (2) Apache/performance-tool landscape, (3) gogenfilter benchmark tooling identification, (4) SkyWalking vs SigNoz comparison.
- **Open thread:** benchmark-CI strategy for a possible Forgejo future, plus the already-documented Go 1.27 baseline landmine.

## Executive Summary

CodSpeed was evaluated and effectively ruled out for Lars's constraints (closed-source SaaS dashboard, no self-host, GitHub/GitLab-only forge support — Forgejo is a dead end). gogenfilter's existing benchmark tracking (`benchmark-action/github-action-benchmark@v1` → gh-pages) was identified precisely, including its GitHub-API coupling, which matters if the repo ever moves to Forgejo. Bencher surfaced twice as the natural self-hostable replacement. The APM question (SkyWalking vs SigNoz) got a directional recommendation (SigNoz) that is **memory-based and unverified** — the weakest deliverable of the four. The strongest self-critique: evidence rigor was inconsistent across answers, and a directly relevant known landmine from gogenfilter's own status docs (Go 1.27 baseline shift → spurious 150% alerts) was read during the session but never connected to the benchmarking recommendations.

## a) FULLY DONE

| # | Item | Evidence / basis |
|---|------|------------------|
| 1 | **CodSpeed self-hosting verdict: not self-hostable.** Dashboard (app.codspeed.io) is closed-source SaaS; no on-prem offering advertised. CLI is open source and even has `--upload-url` / `CODSPEED_UPLOAD_URL` + profile plumbing "for on-premises installations", but no server software is public. No local-only compare/trend mode. | Live research: repo, docs (codspeed.io/docs), CLI source (`src/cli/shared.rs`, `src/config.rs`) |
| 2 | **CodSpeed × Forgejo verdict: unsupported.** Supported repository providers: GitHub + GitLab only. OIDC auth impossible outside supported CI; static `CODSPEED_TOKEN` is minted from a repo connected via GitHub/GitLab. Alternative recommended: **Bencher**. | Docs (integrations/providers, github-actions config), CLI source |
| 3 | **Apache performance projects overview.** Two readings covered: ASF tools (JMeter, ab, SkyWalking; perf-focused infra: Arrow, Spark, Flink, Kafka, Ignite) and OSS CodSpeed alternatives (Bencher, Conbench, asv, pytest-benchmark, criterion/divan, benchstat, Google Benchmark, hyperfine). Noted ASF has nothing in CodSpeed's micro-benchmark-CI niche (JMH/Caliper are OpenJDK/Google). | General knowledge, unverified this session |
| 4 | **gogenfilter benchmark tooling identified.** `benchmark-action/github-action-benchmark@52576c92` (# v1, SHA-pinned): `tool: "go"`, parses `go test -bench=. -benchmem`, auto-pushes to `gh-pages` (`dev/bench/`), alert 150% / fail 300%, `comment-on-alert` + `summary-always`, `fail-on-alert: false`, master push + path filters. | Read directly from `.github/workflows/benchmark.yml:37-54` |
| 5 | **SkyWalking vs SigNoz comparison delivered.** Full dimension table (license, backend, storage, ingestion, instrumentation, breadth, ops burden, track record) + recommendation: **SigNoz** for a Go/OTel-first/self-hosted stack; AGPL-3.0 non-issue for internal use; OTel-native = no lock-in. | Memory-based, **not verified this session** — see (d) |

## b) PARTIALLY DONE

1. **Forgejo compatibility of `github-action-benchmark`** — flagged that the action depends on the GitHub API (commit statuses, PR comments, gh-pages commits) and that Forgejo/act_runner compatibility is untested. Stopped at the flag: no enumeration of the action's actual API surface from its source, no scratch-repo test.
2. **CodSpeed upload behavior under Forgejo** — the verdict ("dead end") was stated as fact, but the load-bearing claim — that uploads for repos not registered through GitHub/GitLab are rejected — is **inference from docs, not a tested fact**.
3. **APM recommendation** — directional only. No deployment, no hands-on trial, no re-verification of licenses, defaults (BanyanDB), or feature claims (session replay, PromQL support).

## c) NOT STARTED

- Bencher trial (deployment, wiring to gogenfilter bench output) — recommended, not started.
- Any actual CodSpeed adoption steps (contacting support@codspeed.io for unlisted-provider policy).
- Forgejo compatibility test of the benchmark action (or any of the 5 gogenfilter workflows).
- benchstat-based vendor-neutral comparison job in CI.
- Benchmark baseline reset after Go 1.27 (known landmine, see (d)/f).
- SigNoz/SkyWalking deployment or OTel instrumentation of any service.
- Memory/AGENTS.md updates — correctly skipped: nothing was decided this session, and gogenfilter's AGENTS.md already documents benchmark.yml behavior.

## d) TOTALLY FUCKED UP!

**Nothing destructive** — no mutations anywhere. Honest failures:

1. **Inconsistent evidence bar (quality split brain).** Answer 1 (CodSpeed) got live, source-level research; answer 4 (SkyWalking vs SigNoz) got pure memory with specific confident claims (AGPL-3.0, BanyanDB as default storage, ~20k★, session replay availability) that may be stale. Two rigor levels in one session.
2. **Missed cross-connection to gogenfilter's own known landmine.** `docs/status/2026-09-30_...` (items b4, 8, 13, 37) documents that the Go 1.27 toolchain bump will shift benchmark numbers and the 150% alert threshold will cry wolf against 1.26-era gh-pages baselines — with no re-baseline procedure defined. I read this during the repo grep and **failed to connect it** when recommending benchmark tooling: baseline-reset handling is a first-class selection criterion for CodSpeed/Bencher/github-action-benchmark. Only caught during this self-review.
3. **Flags instead of facts.** "Would need testing against Forgejo's API compatibility" — the action's source is public and readable; enumerating its API calls was cheap and I stopped at the caveat.
4. **Wasted first fetch** of the GitHub repo page (returned site chrome); recovered via agentic_fetch.
5. **Ambiguity gamble.** "Apache performance projects" was ambiguous; I answered both readings instead of asking. Lucky, not disciplined.

## e) WHAT WE SHOULD IMPROVE

1. **Uniform verification policy:** any memory-based product claim (license, default, stars, feature) gets verified or explicitly labeled unverified in the answer itself.
2. **Mine the repo's own status docs before answering adjacent questions** — the repo usually already knows its pain points; connect them.
3. **Convert caveats into artifacts:** "needs testing" → smallest verifiable step (read action source, list endpoints, run scratch repo).
4. **Label inference vs fact** explicitly when research answers risk being quoted later as ground truth.

## f) Things to get done next

Grouped by track; ordered by impact within group. Realistic count: 24 (not padded to 50 with unrelated filler, per session scope).

**Decisions (block tracks below)**
1. Formalize CodSpeed verdict: drop, or contact support@codspeed.io re: unlisted providers (5 min, closes the thread).
2. Decide gogenfilter's forge future: GitHub-primary, Forgejo mirror, or full move. *(Q1 below)*
3. Decide APM intent: hands-on trial vs platform-only evaluation. *(Q2/Q3 below)*

**Benchmarking track**
4. Trial **Bencher** self-hosted (docker-compose) pointed at gogenfilter's `go test -bench` output.
5. Enumerate `github-action-benchmark`'s GitHub API surface from its source (statuses, comments, git-data/gh-pages commits).
6. Cross-check those endpoints against Forgejo/act_runner GitHub-API compatibility docs.
7. Scratch Forgejo repo: run the benchmark action end-to-end (pages-branch push + PR comment) — proves/disproves compatibility in one shot.
8. Add a **benchstat** comparison job to CI as vendor-neutral fallback (baseline committed in-repo).
9. **Re-baseline gh-pages benchmark data after Go 1.27** — known landmine (prior report b4): first CI run on 1.27 will trigger spurious 150% alerts vs 1.26 baselines.
10. Document the benchmark re-baseline-on-toolchain-bump procedure in RELEASING.md (prior items 8/37, still open).
11. One-pager: Bencher vs Conbench vs github-action-benchmark for self-host + Forgejo fit.
12. Policy decision: should `fail-on-alert` ever become `true` (today 300% fail threshold exists but `fail-on-alert: false` neuters it)?
13. Define what "performance regression" means for gogenfilter — current 150/300% thresholds look like guesses, not SLOs.

**Forgejo track (only if migration is real)**
14. Audit all 5 workflows (ci, benchmark, website, release, lighthouse) for GitHub-API/action dependencies.
15. Map GitHub-only actions → Forgejo-compatible replacements (checkout, setup-go, firebase deploy, lighthouse).
16. GITHUB_TOKEN → Forgejo token semantics for each workflow.
17. Decide the gh-pages story on Forgejo (built-in pages vs branch serving) — benchmark charts depend on it.

**Observability track**
18. Verify SigNoz facts before any adoption: license, session replay, PromQL maturity, resource floor.
19. SigNoz homelab trial: ClickHouse + signoz-otel-collector via docker-compose.
20. Nixify the trial (flake/service module) only if it survives a week of use.
21. Pick first instrumented Go service (go-aichat consumer: InboxClean / KeyHolderAI).
22. Define the OTel wiring pattern for Go services once, reuse across repos.
23. Keep SkyWalking fallback criteria: only if a Java fleet or Istio ever enters the picture.

**Housekeeping noticed in passing**
24. gogenfilter root contains `coverage-lib.out`, `cov.out` (and `gendocs` binary) in the working tree — confirm intentional/untracked status and .gitignore coverage.

## g) Questions (cannot be figured out from here)

1. **Is gogenfilter actually moving to Forgejo (mirror or full move), or was that exploratory?** This decides whether the whole Forgejo-compat track (f/14-17) is real work or dead.
2. **Should trials be hands-on (Bencher/SigNoz actually deployed), and if yes — on which host?** I cannot know your deployment targets or capacity.
3. **Which service is the first APM candidate (InboxClean, KeyHolderAI, monitor365, ...), or is this platform evaluation only?** Determines whether the observability track starts with wiring or with infra.

---
*Format note: written as `.md` at the repo's `docs/status/` convention per explicit user instruction (HTML dashboard is this skill's canonical default otherwise). No manual commit — the auto-commit daemon picks the file up. Section (f) is pending `docs-health` HARVEST into TODO_LIST.md/ROADMAP.md until instructed.*
