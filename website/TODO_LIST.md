# TODO List — gogenfilter Website

**Generated:** 2026-05-04
**Updated:** 2026-05-04 08:42
**Files Processed:** All source files, FEATURES.md, previous status docs, architecture docs
**Verified Against:** Actual source code + build output

---

## Files Read

- [x] src/pages/index.astro
- [x] src/components/Header.astro
- [x] src/components/Footer.astro
- [x] src/components/Logo.astro
- [x] src/components/GeneratorGrid.astro
- [x] src/components/FeatureGrid.astro
- [x] src/components/CodeBlock.astro
- [x] src/layouts/LandingLayout.astro
- [x] src/pages/og/[...slug].ts
- [x] src/data/config.ts
- [x] src/data/generators.ts
- [x] src/data/features.ts
- [x] src/data/types.ts
- [x] src/styles/global.css
- [x] src/content.config.ts
- [x] package.json
- [x] astro.config.mjs
- [x] firebase.json
- [x] flake.nix

---

## 🔴 HIGH Priority

| #  | Task                                                     | Source                  | Effort | Status   |
|----|----------------------------------------------------------|-------------------------|--------|----------|
| 1  | Extract `Section.astro` component from index.astro       | full-code-review        | 10min  | ✅ DONE  |
| 2  | Extract `Card.astro` component from index.astro          | full-code-review        | 15min  | ✅ DONE  |
| 3  | Break index.astro into section components (HeroSection, ComparisonSection, UseCasesSection) | full-code-review | 30min | ✅ DONE |
| 4  | Add mobile nav close-on-click behavior                   | code-review             | 5min   | ✅ DONE  |
| 5  | Add mobile nav close button (X icon)                     | code-review             | 10min  | ✅ DONE  |

## 🟡 MEDIUM Priority

| #  | Task                                                     | Source                  | Effort | Status   |
|----|----------------------------------------------------------|-------------------------|--------|----------|
| 6  | Create `Icon.astro` component to centralize SVGs         | deepening-opportunities | 30min  | TODO     |
| 7  | Type `icons` record keys to Feature['icon'] union        | code-review             | 5min   | TODO     |
| 8  | Extract ComparisonSection data into data/ file           | deepening-opportunities | 10min  | ✅ DONE  |
| 9  | Extract UseCasesSection data into data/ file             | deepening-opportunities | 10min  | ✅ DONE  |
| 10 | Mobile nav background should use Tailwind token          | code-review             | 5min   | ✅ DONE  |
| 11 | Run Lighthouse audit and fix issues                      | previous status doc     | 60min  | TODO     |
| 12 | Verify OG image generation renders correctly             | previous status doc     | 10min  | TODO     |
| 13 | Add HTML validation step to CI                           | code-review             | 15min  | TODO     |
| 14 | Browser visual QA (desktop + mobile)                     | previous status doc     | 30min  | TODO     |
| 15 | Self-host Google Fonts (already done via Astro provider) | previous status doc     | —      | ✅ DONE  |

## 🟢 LOW Priority

| #  | Task                                                     | Source                  | Effort | Status   |
|----|----------------------------------------------------------|-------------------------|--------|----------|
| 16 | Add light mode support                                   | previous status doc     | 60min  | TODO     |
| 17 | Add custom 404 page in Starlight                         | previous status doc     | 15min  | TODO     |
| 18 | Add analytics (Plausible/Umami)                          | previous status doc     | 30min  | TODO     |
| 19 | Source real brand logos (sqlc, protobuf, k8s, etc.)      | previous status doc     | 30min  | TODO     |
| 20 | Add structured data (JSON-LD) for SEO                    | previous status doc     | 20min  | TODO     |
| 21 | Add canonical URL meta tags                              | previous status doc     | 5min   | TODO     |
| 22 | Add GitHub Actions CI for build verification             | previous status doc     | 20min  | TODO     |

## ✅ Completed (2026-05-04)

| #  | Task                                                     | Evidence                                   |
|----|----------------------------------------------------------|--------------------------------------------|
| 23 | Fix Logo component `class` prop type error               | Logo.astro now accepts class prop          |
| 24 | Remove unused `lang` prop from CodeBlock                 | CodeBlock.astro cleaned                    |
| 25 | Create `siteConfig` in data/config.ts                    | Single source of truth for URLs, desc, etc |
| 26 | Derive generator count from generators.length            | generatorCount export in generators.ts     |
| 27 | Replace hardcoded GitHub URL (4 occurrences)             | All files use siteConfig.github            |
| 28 | Replace hardcoded generator count "11" (5 occurrences)   | All files use generatorCount               |
| 29 | Replace hardcoded LarsArtmann URL                        | All files use siteConfig.author.url        |
| 30 | Fix OG description duplication (3 near-identical copies) | LandingLayout uses single ogDesc variable  |
| 31 | Fix copy button visibility (missing .code-preview class) | Added code-preview class to parent div     |
| 32 | Fix IntersectionObserver selector                        | Now observes [data-animate] not .fade-in   |
| 33 | Replace emoji icons with inline SVGs                     | Use cases section uses proper SVGs         |
| 34 | Add aria-hidden to decorative SVGs                        | GeneratorGrid arrow icons                  |
| 35 | Add aria-label to Logo SVG                               | Logo.astro role="img" aria-label           |
| 36 | Add loading="lazy" to generator logos                    | GeneratorGrid images                       |
| 37 | Add title tooltips to generator card links               | GeneratorGrid links                        |
| 38 | Differentiate non-clickable generic card                 | border-dashed + no hover glow              |
| 39 | Build passes with 0 errors, 0 warnings                   | astro check: clean                         |
| 40 | Features audit completed                                 | FEATURES.md created                        |
| 41 | Architecture review completed                            | docs/status/ written                       |
| 42 | Architecture diagrams created                            | current + ideal D2 → SVG                   |
| 43 | Full code review completed                               | docs/planning/ written                     |
| 44 | Remove dead .generator-* CSS and unused keyframes        | global.css reduced from 780 to 51 lines    |
| 45 | Move fade-in animation to global.css                    | data-animate attribute pattern            |
| 46 | Replace max-sm Tailwind hacks with scoped CSS           | Header.astro mobile nav                    |
| 47 | Extract shared Logo SVG component                       | Logo.astro deduplicates Header/Footer      |
| 48 | Add typed data layer (types.ts, generators.ts, features.ts) | All data in src/data/ |
| 49 | Switch @theme inline to @theme                          | Runtime CSS custom properties              |
| 50 | Self-host fonts via Astro font provider                 | Space Grotesk + JetBrains Mono           |
| 51 | Extract HeroSection, PhaseSection, ComparisonSection, UseCasesSection, CTASection | 5 new components |
| 52 | Create data/sections.ts with all section data            | phases, comparisons, useCases            |
| 53 | Add PhaseCard, ComparisonItem, UseCase types             | types.ts extended                        |
| 54 | Refactor index.astro with extracted sections             | 229 lines → 64 lines (72% reduction)     |
| 55 | Refactor FeatureGrid.astro to use Card.astro            | Cleaner markup, shared component         |
| 56 | Add accent-light theme token                            | --color-accent-light: #a5f3fc             |
| 57 | Fix hardcoded #a5f3fc with accent-light                 | index.astro gradient                      |
| 58 | Add prefers-reduced-motion support                      | global.css media query                   |
| 59 | Remove dead .fade-in CSS from index.astro               | Inline style block deleted               |
| 60 | Improve Header mobile nav (close btn, close-on-click, CSS vars) | Full mobile UX polish           |
| 61 | Commit comprehensive status report                      | docs/status/2026-05-04_08-42_...md        |

---

## Session Summary (2026-05-04)

| Metric | Value |
|--------|-------|
| Total commits this session | 21 (since `e4b0160`) |
| New components created | 7 (Section, Card, HeroSection, PhaseSection, ComparisonSection, UseCasesSection, CTASection) |
| New data files | 1 (sections.ts) |
| Lines removed from index.astro | 165 (229 → 64) |
| Lines removed from global.css | 729 (780 → 51) |
| Type check errors | 0 |
| Build warnings | 0 |
| Git pushes | 3 |

## Top #25 Next Steps

1. Type `icons` record keys to `Feature['icon']` union (5min) — Type safety
2. Add `aria-expanded` initial state to nav toggle (2min) — A11y
3. Refactor `index.astro` to use `<Section>` component (10min) — DRY
4. Refactor GeneratorGrid to use `<Card href={...}>` (10min) — DRY
5. Increase IntersectionObserver threshold to 0.15 (1min) — UX
6. Add `focus-visible` styles (5min) — A11y
7. Add `alt` text to linked generator cards (2min) — A11y
8. CodeBlock copy button graceful fallback (10min) — Robustness
9. Add `prefers-reduced-motion` to IntersectionObserver (5min) — A11y
10. Extract phase patterns as `PatternChip` component (15min) — DRY
11. Verify `siteUrl` in `astro.config.mjs` (2min) — Sitemap
12. Add SVG favicon (10min) — Polish
13. Lighthouse audit + fix PWA issues (60min) — Quality
14. Browser visual QA (desktop + mobile) (30min) — Quality
15. Add canonical URL meta tags (5min) — SEO
16. Add JSON-LD structured data (20min) — SEO
17. HTML validation in CI (15min) — Quality gate
18. OG image generation visual verification (10min) — Quality
19. Light mode support (60min) — Feature
20. Custom 404 page in Starlight (15min) — UX
21. Add Plausible/Umami analytics (30min) — Insight
22. Source real brand logos (30min) — Visual quality
23. Icon.astro centralized component (30min) — Architecture
24. GitHub Actions CI for build verification (20min) — CI/CD
25. Commit planning docs (done this session)
