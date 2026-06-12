# Roadmap

**Updated:** 2026-06-11
**Current version:** v3.1.0

## v3 — Complete & Stable

v3 is production-ready. The core library is feature-complete with 99.8% coverage, 160 tests, comprehensive CI/CD, and a full documentation website.

### What's Done

- 11 code generator detectors (sqlc, templ, go-enum, protobuf, oapi-codegen, deepcopy-gen, wire, moq, mockgen, stringer, generic fallback)
- Two-phase detection (filename → content) with trace support
- Functional options API with include/exclude glob patterns
- SQLC config discovery and output directory extraction
- Branded error system with sentinel errors
- Comprehensive testing (table-driven, fuzz, property, benchmark, BDD, concurrent)
- Website: Astro v6 + Starlight with landing page, 17 doc pages, dependents page
- CI/CD: Go CI, Website CI, Benchmarks, Release, Lighthouse (partially configured)

### v3 Maintenance

Ongoing maintenance tasks:

- Resolve npm Dependabot alerts (website transitive deps)
- Configure or remove Lighthouse CI
- Fix Lighthouse accessibility failures on root page
- Website performance audit and baseline establishment

## Open Strategic Questions

### v3 Maintenance Mode vs v4

The fundamental question: **is gogenfilter "done" or does it have a next chapter?**

**Option A: v3 Maintenance Mode**

- Ship security patches and bug fixes only
- Accept new generator detectors via PRs
- Focus energy elsewhere
- Pro: Sustainable, honest about project scope
- Con: Missed opportunity if community adoption grows

**Option B: v4 with Expanded Scope**

- **golangci-lint plugin** — Auto-exclude detected generated files from linting; fills a real ecosystem gap
- **More generator detectors** — mockery, ent, gqlgen, easyjson, msgp, counterfeiter, go-swagger
- **Custom detector registration API** — `RegisterDetector(...)` for proprietary/internal generators
- Pro: Addresses real ecosystem gaps, grows the library's surface area meaningfully
- Con: Scope creep risk, requires sustained commitment

**Decision needed:** This is the #1 blocker for strategic planning. See `TODO_LIST.md` for the tracked action item.

## v4 Candidates (ranked)

1. **golangci-lint plugin** — Auto-exclude detected generated files from linting. No good solution exists in the ecosystem today.
2. **More generator detectors** — mockery, ent, gqlgen, easyjson, msgp, counterfeiter, go-swagger. Each has clear filename/content markers.
3. **Custom detector registration** — `RegisterDetector(...)` API for proprietary/internal generators.

## Evaluated and Deprioritized

- **Pre-commit hook integration** — A hook that says "this file is generated" at commit time is not actionable. Generated files are routinely committed (protobuf, sqlc, wire). What would the hook _do_? Reject the commit? That's wrong. Warn the user? They already know. Pre-commit hooks for generated code should run the generator and diff-check outputs, not merely detect markers. You're not missing anything — it's a poor fit.
- **WASM build** — No clear use case for browser-based generated file detection.

## Backlog (unprioritized)

- **Community feedback** — GitHub Discussions or Discord for real-world usage data
- **Supply chain hardening** — Sigstore signing, SLSA provenance, SBOM generation
- **CODE_OF_CONDUCT.md** — Standard community health file, link from website nav

---

> This roadmap captures long-term direction and raw ideas. For actionable tasks, see [TODO_LIST.md](TODO_LIST.md).
