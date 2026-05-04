# Status Report — 2026-05-04 08:12

**Comprehensive Frontend Design & Project Status Audit**

---

## Executive Summary

The gogenfilter website is **functionally complete and deploys successfully** (17 pages, 2.23s build, Firebase + GitHub Actions CI/CD). The Go library itself is **feature-complete at ~95%+ test coverage** and effectively ready for v0.1.0 tagging.

However, the website has **one ship-blocking bug** (scroll animations permanently hiding sections), and the overall aesthetic falls into the "generic AI-generated dev tool" category — Space Grotesk + cyan-on-dark-stone is the most overused combination in modern web dev. The site works, but it won't be remembered.

---

## a) FULLY DONE ✅

### Go Library (Root Project)

- **Core detection engine**: Two-phase detection (filename → content), 11 generators + generic fallback — all `FULLY_FUNCTIONAL`
- **Filter API**: Functional options, immutable construction, `ShouldFilter`, `GetStats` — complete
- **Pattern matching**: Include/exclude with `**` glob via doublestar — complete
- **SQLC config discovery**: Parse sqlc.yaml/sqlc.json for output directories — complete
- **Error system**: Branded errors, sentinel errors, `ErrorCoder` interface — complete
- **Metrics**: Thread-safe stats tracking with per-reason breakdown — complete
- **Type safety**: Phantom types for compile-time guarantees — complete
- **`fs.FS` abstraction**: Pluggable filesystem, `fstest.MapFS` testing — complete
- **Test suite**: Table-driven tests, BDD (ginkgo), integration, fuzz, benchmarks, property tests — comprehensive
- **CI/CD**: GitHub Actions with test + lint + coverage threshold — complete
- **Documentation**: FEATURES.md (14 categories, all functional), TODO_LIST.md (28 completed items), AGENTS.md (comprehensive agent reference)

### Website — Infrastructure

- **Astro v6 + Starlight docs**: 15 MDX documentation pages — all written and building
- **Tailwind CSS v4**: Design token system with CSS custom properties
- **Firebase Hosting**: Configured with cache headers, clean URLs, named target
- **GitHub Actions**: CI pipeline with build-website + deploy-website jobs consolidated into main ci.yml
- **OG image generation**: Build-time canvas-based OG images for all doc pages
- **Sitemap**: Auto-generated via `@astrojs/sitemap`
- **Pagefind search**: Auto-indexed (17 HTML files, 24ms build)
- **Nix flake**: Dev/build/preview/deploy apps for all platforms
- **Font self-hosting**: Astro font provider (no Google CDN dependency)

### Website — Landing Page Sections

- **Hero**: Headline + gradient text + code block with copy button
- **Generator grid**: 11 generators with SVG logos, linked cards
- **Feature grid**: 6 features with SVG icons
- **Two-phase detection diagram**: P1/P2 cards with visual hierarchy
- **Comparison table**: Regex Grep vs gogenfilter vs Full AST Parse
- **Use cases**: Linters / Code Quality / CI-CD
- **CTA**: "Read the Docs" closing section
- **Header**: Fixed nav with logo, mobile hamburger, Docs + GitHub links
- **Footer**: Logo + license + links (Docs, GitHub, pkg.go.dev)

### Website — Documentation Pages (15 MDX files)

- **Getting Started**: Installation ✅, Quick Start ✅
- **Guides**: Filter Options ✅, Pattern Matching ✅, Metrics ✅, SQLC Config ✅, Custom Filesystem ✅
- **API Reference**: Filter ✅, Detection ✅, Types ✅, Errors ✅
- **Reference**: Generators ✅, Changelog ✅, Contributing ✅

---

## b) PARTIALLY DONE ⚠️

### Scroll Animations — BROKEN (ship-blocking)

- `global.css:39` hides `[data-animate]` elements (`opacity: 0; transform: translateY(20px)`)
- `index.astro:216` IntersectionObserver queries `.fade-in` — **zero elements match**
- **Result**: All sections below the hero are **permanently invisible** unless user scrolls past them AND the observer triggers on `[data-animate]` — but it never does because it's looking for the wrong selector
- The CSS animation class `.animate-fade-in` IS defined in `@theme` and would work, but the JS never adds it
- **Fix needed**: Change `document.querySelectorAll('.fade-in')` → `document.querySelectorAll('[data-animate]')`

### Docs Index Page (`docs/index.mdx`)

- Currently a bare stub: "Welcome to the gogenfilter docs" + "Use the sidebar"
- Needs hero features, quick-start link, overview of sections

### `errors.mdx` Documentation

- Missing complete list of sentinel errors and error codes
- `Helper` interface mentioned but not fully explained

### `pattern-matching.mdx` Documentation

- Lines 45–47 have broken markdown escaping (`\*_` instead of `` `**` ``)
- Will render incorrectly

### CI/CD Workflow Changes (uncommitted)

- `ci.yml` has been reworked: matrix removed, deploy-website consolidated into ci.yml
- `deploy-website.yml` deleted (merged into ci.yml)
- `package.json` updated: added `@astrojs/check` and `typescript` dependencies
- These changes are **unstaged and uncommitted**

### Nix Flake

- Listed as `PARTIALLY_FUNCTIONAL` in FEATURES.md due to uncommitted changes

---

## c) NOT STARTED 🚫

### Website — Design & Aesthetic

- **Font replacement**: Space Grotesk is the #1 most overused dev tool font — no alternative explored
- **Color palette rethink**: Cyan-on-dark-stone is the default Vercel aesthetic — zero differentiation
- **Signature design moment**: No interactive demo, no memorable visual element
- **Micro-interactions**: No staggered reveals, no hover transforms on cards, no typing effect in code block

### Website — Missing Features

- **Custom 404 page**: Not implemented
- **Analytics**: Not implemented
- **Lighthouse audit**: Not run
- **Emoji replacement**: "Built for real tools" section uses emoji (⚙️📊🛠️) instead of SVG icons
- **Dark/light theme toggle**: Single dark theme only
- **Docs index redesign**: Still a stub

### Go Library — Not Started (from TODO_LIST.md)

- Tag v0.1.0 release
- Codecov integration
- Performance profiling with benchstat
- `//go:generate` for auto-generating detector boilerplate
- `RegisterDetector()` public API
- `WalkAndFilter()` bulk filesystem walker
- `strings.Builder` optimization
- Windows path testing

---

## d) TOTALLY FUCKED UP 💥

### 1. Scroll Animations Are Completely Broken

**File**: `src/pages/index.astro:216` + `src/styles/global.css:39`

The IntersectionObserver queries `.fade-in` but the HTML uses `data-animate` attributes. All `[data-animate]` sections start hidden (`opacity: 0`) and are **never revealed**. This means:

- "11 generators. One filter." section — invisible
- "Engineered for performance." section — invisible
- "Two-phase detection." section — invisible
- "Why gogenfilter?" section — invisible
- "Built for real tools." section — invisible
- "Start filtering in seconds." section — invisible

**This is ship-blocking.** The entire landing page below the hero is invisible on first load. Users must scroll through invisible content to reach the footer. The browser WILL render the space but show nothing.

### 2. Unused CSS Classes (Minor)

`index.astro:220-228` defines `.fade-in` and `.fade-in.visible` in scoped `<style>` that are never used — the `[data-animate]` approach in global.css replaced them but the old CSS wasn't cleaned up.

---

## e) WHAT WE SHOULD IMPROVE 🎯

### Priority 1: Ship-Blocking

1. **Fix scroll animation bug** — change selector from `.fade-in` to `[data-animate]`
2. **Clean up dead CSS** — remove unused `.fade-in` / `.fade-in.visible` from scoped styles

### Priority 2: Aesthetic Identity

3. **Replace Space Grotesk** — the most overused dev font. Consider: Bricolage Grotesque, General Sans, Satoshi, Geist, Onest, Syne, Instrument Sans, or something unexpected
4. **Rethink color palette** — move away from generic cyan (#22d3ee). Go's identity is warm (the gopher is blue/orange). Consider: warm amber/orange, teal-emerald, or a distinctive accent tied to "filtering"
5. **Create one signature moment** — interactive filtering demo in the hero, staggered logo cascade, diagonal section break, particle filter animation, SOMETHING memorable
6. **Replace emoji with SVG icons** in the "Built for real tools" section

### Priority 3: Design Refinement

7. **Add staggered reveals** — use `animation-delay` on generator grid cards for visual rhythm
8. **Break section monotony** — alternating layouts, overlapping elements, asymmetric grids
9. **Add hover micro-interactions** — transforms on cards, glow effects on the code block
10. **Improve card visual hierarchy** — not all cards should look identical; vary size, emphasis, visual weight

### Priority 4: Content & Polish

11. **Redesign docs index page** — add hero content, feature highlights, quick-start link
12. **Fix pattern-matching.mdx** markdown escaping
13. **Complete errors.mdx** — add sentinel error list and Helper interface docs
14. **Run Lighthouse audit** and fix issues
15. **Add custom 404 page**

### Priority 5: Go Library

16. **Tag v0.1.0** — the single highest-impact action for the entire project
17. **Add Codecov integration** — coverage visibility in PRs
18. **Resolve include patterns design question** (from TODO_LIST.md)

---

## f) Top #25 Things We Should Get Done Next

| #   | Item                                                              | Priority    | Est. Effort | Category  |
| --- | ----------------------------------------------------------------- | ----------- | ----------- | --------- |
| 1   | Fix scroll animation selector bug (`.fade-in` → `[data-animate]`) | 🔴 Critical | 5 min       | Bug fix   |
| 2   | Clean up dead `.fade-in` CSS in index.astro scoped styles         | 🔴 High     | 2 min       | Cleanup   |
| 3   | Commit uncommitted CI/CD and dependency changes                   | 🔴 High     | 5 min       | Git       |
| 4   | Tag gogenfilter v0.1.0 release                                    | 🔴 High     | 5 min       | Release   |
| 5   | Replace Space Grotesk with distinctive font                       | 🟡 Medium   | 30 min      | Design    |
| 6   | Rethink color palette (move away from generic cyan)               | 🟡 Medium   | 1 hour      | Design    |
| 7   | Create one signature design moment on landing page                | 🟡 Medium   | 2 hours     | Design    |
| 8   | Replace emoji with SVG icons in "Built for real tools" section    | 🟡 Medium   | 15 min      | Design    |
| 9   | Add staggered reveal animations on generator grid                 | 🟡 Medium   | 30 min      | Animation |
| 10  | Break section layout monotony (alternating/asymmetric layouts)    | 🟡 Medium   | 1 hour      | Design    |
| 11  | Add hover micro-interactions on cards and code block              | 🟡 Medium   | 30 min      | Design    |
| 12  | Redesign docs index page (not a stub anymore)                     | 🟡 Medium   | 1 hour      | Content   |
| 13  | Fix pattern-matching.mdx markdown escaping (`\*_`)                | 🟡 Medium   | 5 min       | Docs      |
| 14  | Complete errors.mdx (sentinel error list, Helper interface)       | 🟡 Medium   | 30 min      | Docs      |
| 15  | Run Lighthouse audit and fix top issues                           | 🟡 Medium   | 1 hour      | Quality   |
| 16  | Add custom 404 page                                               | 🟢 Low      | 30 min      | Feature   |
| 17  | Add Codecov integration to CI                                     | 🟢 Low      | 15 min      | CI/CD     |
| 18  | Add analytics (plausible/umami)                                   | 🟢 Low      | 30 min      | Feature   |
| 19  | Resolve include patterns design question (TODO_LIST)              | 🟢 Low      | 30 min      | API       |
| 20  | Add `//go:generate` for detector boilerplate                      | 🟢 Low      | 2 hours     | Go        |
| 21  | Performance profiling with benchstat                              | 🟢 Low      | 1 hour      | Go        |
| 22  | Add dark/light theme toggle                                       | 🟢 Low      | 2 hours     | Feature   |
| 23  | Add typing/flicker effect on hero code block                      | 🟢 Low      | 1 hour      | Design    |
| 24  | Add `WalkAndFilter()` bulk filesystem walker API                  | 🟢 Low      | 2 hours     | Go        |
| 25  | API stability documentation / versioning policy                   | 🟢 Low      | 1 hour      | Docs      |

---

## g) Top #1 Question I Cannot Figure Out Myself 🤔

**What is the intended visual identity and "vibe" for gogenfilter?**

The current design is technically competent but aesthetically generic — it looks like every other Go dev tool landing page. Before investing significant effort in redesign, I need to understand the desired direction:

- **Brutalist/utilitarian** — raw, functional, "this is a tool not a product" energy (like many Go ecosystem sites)
- **Editorial/refined** — sophisticated typography, generous whitespace, magazine-quality layout
- **Playful/characterful** — the Go gopher vibe, warm colors, approachable, slightly quirky
- **Dark/technical** — lean into the "static analysis" identity with sharp geometric patterns, subtle grid overlays, matrix-like visual cues
- **Something else entirely?**

The font and color choices will follow from this decision. Without a clear direction, any aesthetic changes risk being another iteration of "generic but different."

---

## Uncommitted Changes (at time of report)

| File                                      | Change                                                                       | Status             |
| ----------------------------------------- | ---------------------------------------------------------------------------- | ------------------ |
| `../.github/workflows/ci.yml`             | Consolidated deploy-website into CI, removed matrix, added checks permission | Modified, unstaged |
| `../.github/workflows/deploy-website.yml` | Deleted (merged into ci.yml)                                                 | Deleted, unstaged  |
| `package.json`                            | Added `@astrojs/check` and `typescript` dependencies                         | Modified, unstaged |
| `package-lock.json`                       | Lockfile updated for new deps                                                | Modified, unstaged |

---

## Build Status

- **`npm run build`**: ✅ Passes (17 pages, 2.23s, sitemap + pagefind generated)
- **Go library tests**: ✅ All passing (per AGENTS.md)
- **Firebase config**: ✅ Valid
- **Nix flake**: ✅ Working

---

## File Inventory

### Website Source Files (18 files)

| File                                 | Purpose                                     | Lines |
| ------------------------------------ | ------------------------------------------- | ----- |
| `astro.config.mjs`                   | Astro + Starlight + Tailwind + fonts config | 98    |
| `firebase.json`                      | Firebase Hosting config                     | ~20   |
| `flake.nix`                          | Nix dev/build/deploy                        | ~80   |
| `tsconfig.json`                      | TypeScript strict config                    | ~5    |
| `src/layouts/LandingLayout.astro`    | HTML shell + meta tags                      | 37    |
| `src/pages/index.astro`              | Landing page (hero + 6 sections)            | 229   |
| `src/pages/og/[...slug].ts`          | OG image generation                         | ~30   |
| `src/styles/global.css`              | Tailwind + design tokens + animations       | 42    |
| `src/components/Header.astro`        | Fixed nav + mobile menu                     | 60    |
| `src/components/Footer.astro`        | Footer with links                           | 17    |
| `src/components/Logo.astro`          | Branded SVG icon                            | 13    |
| `src/components/CodeBlock.astro`     | Reusable code block                         | 18    |
| `src/components/GeneratorGrid.astro` | 11 generator cards                          | 37    |
| `src/components/FeatureGrid.astro`   | 6 feature cards                             | 20    |
| `src/data/generators.ts`             | Generator data (11 entries)                 | 15    |
| `src/data/features.ts`               | Feature data + SVG icons                    | 43    |
| `src/data/types.ts`                  | TypeScript interfaces                       | 12    |
| `src/content.config.ts`              | Starlight content config                    | ~10   |

### Documentation Pages (15 MDX files)

Getting Started (2), Guides (5), API Reference (4), Reference (4)

### Static Assets

`public/`: favicon.ico, favicon.svg, logo.svg, robots.txt, logos/ (11 SVGs)

---

_Report generated: 2026-05-04 08:12 CEST_
