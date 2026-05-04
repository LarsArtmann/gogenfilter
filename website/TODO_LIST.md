# TODO List — gogenfilter Website

**Generated:** 2026-05-04
**Updated:** 2026-05-04 09:02
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
- [x] src/data/sections.ts
- [x] src/styles/global.css
- [x] src/content.config.ts
- [x] package.json
- [x] astro.config.mjs
- [x] firebase.json
- [x] flake.nix

---

## 🔴 HIGH Priority

| #   | Task                                                                                        | Source           | Effort | Status |
| --- | ------------------------------------------------------------------------------------------- | ---------------- | ------ | ------- |
| 1   | Extract `Section.astro` component from index.astro                                           | full-code-review | 10min  | ✅ DONE |
| 2   | Extract `Card.astro` component from index.astro                                              | full-code-review | 15min  | ✅ DONE |
| 3   | Break index.astro into section components (HeroSection, ComparisonSection, UseCasesSection)   | full-code-review | 30min  | ✅ DONE |
| 4   | Add mobile nav close-on-click behavior                                                     | code-review      | 5min   | ✅ DONE |
| 5   | Add mobile nav close button (X icon)                                                       | code-review      | 10min  | ✅ DONE |

## 🟡 MEDIUM Priority

| #   | Task                                                     | Source                  | Effort | Status      |
| --- | -------------------------------------------------------- | ----------------------- | ------ | ----------- |
| 6   | Create `Icon.astro` component to centralize SVGs         | deepening-opportunities | 30min  | ✅ DONE     |
| 7   | Type `icons` record keys to `Feature['icon']` union     | code-review             | 5min   | ✅ DONE     |
| 8   | Extract ComparisonSection data into data/ file            | deepening-opportunities | 10min  | ✅ DONE     |
| 9   | Extract UseCasesSection data into data/ file             | deepening-opportunities | 10min  | ✅ DONE     |
| 10  | Mobile nav background should use Tailwind token            | code-review             | 5min   | ✅ DONE     |
| 11  | Run Lighthouse audit and fix issues                      | previous status doc     | 60min  | 🔲 PENDING  |
| 12  | Verify OG image generation renders correctly             | previous status doc     | 10min  | ✅ DONE     |
| 13  | Add HTML validation step to CI                           | code-review             | 15min  | ✅ DONE     |
| 14  | Browser visual QA (desktop + mobile)                     | previous status doc     | 30min  | 🔲 PENDING  |
| 15  | Self-host Google Fonts (already done via Astro provider) | previous status doc     | —      | ✅ DONE     |

## 🟢 LOW Priority

| #   | Task                                                | Source              | Effort | Status      |
| --- | --------------------------------------------------- | ------------------- | ------ | ----------- |
| 16  | Add light mode support                              | previous status doc | 60min  | ✅ DONE     |
| 17  | Add custom 404 page in Starlight                    | previous status doc | 15min  | ✅ DONE     |
| 18  | Add analytics (Plausible)                           | previous status doc | 30min  | ✅ DONE     |
| 19  | Source real brand logos (sqlc, protobuf, k8s, etc.)| previous status doc | 30min  | 🔲 PENDING  |
| 20  | Add structured data (JSON-LD) for SEO              | previous status doc | 20min  | ✅ DONE     |
| 21  | Add canonical URL meta tags                         | previous status doc | 5min   | ✅ DONE     |
| 22  | Add GitHub Actions CI for build verification         | previous status doc | 20min  | ✅ DONE     |

---

## ✅ Completed (2026-05-04 — Session 2)

| #   | Task                                                                              | Evidence                                   |
| --- | --------------------------------------------------------------------------------- | ------------------------------------------ |
| 62  | Type `icons` record keys to `Feature['icon']` union                                | `FeatureIcon` const/as const + type alias  |
| 63  | Type `icons` Record to `Record<FeatureIcon, string>`                              | features.ts updated                        |
| 64  | Type `UseCase.icon` to `UseCaseIcon` union                                        | types.ts `useCaseIconKeys` + type alias   |
| 65  | Add `aria-expanded="false"` initial state to nav toggle                           | Header.astro button                        |
| 66  | Add `aria-controls="nav-links"` to nav toggle                                     | Header.astro button                        |
| 67  | Add `focus-visible` styles for a11y                                              | global.css                                 |
| 68  | Add `focus:not(:focus-visible)` reset                                             | global.css                                 |
| 69  | Add `prefers-reduced-motion` to IntersectionObserver                              | index.astro script                         |
| 70  | Add canonical `<link rel="canonical">` meta tag                                   | LandingLayout.astro                        |
| 71  | Add JSON-LD structured data (SoftwareApplication schema)                          | LandingLayout.astro                        |
| 72  | Create `Icon.astro` centralized SVG component (12 icons)                          | Icon.astro with FeatureIcon + UIIcon paths |
| 73  | Refactor FeatureGrid.astro to use `Icon.astro`                                   | Removed inline icons + set:html            |
| 74  | Refactor UseCasesSection.astro to use `Icon.astro`                                | Uses `<Icon name={useCase.icon}>`         |
| 75  | Refactor PhaseSection.astro to use `Icon.astro`                                  | Uses `<Icon name={phase.noteIcon}>`       |
| 76  | Refactor GeneratorGrid.astro to use `Icon.astro`                                 | Arrow icon uses Icon component            |
| 77  | Refactor CTASection.astro to use `Icon.astro`                                    | Arrow icon uses Icon component            |
| 78  | Refactor Header.astro to use `Icon.astro` (menu, close, github)                | Replaced inline SVGs with Icon component  |
| 79  | Add sun/moon icons to Icon.astro for theme toggle                                | Theme toggle implementation               |
| 80  | Add light mode CSS variables in global.css                                       | `.light` class on `:root`                |
| 81  | Add theme toggle button to Header.astro                                          | Sun/moon icon button with localStorage    |
| 82  | Add theme initialization script (prefers-color-scheme + localStorage)            | Header.astro inline script                |
| 83  | Add `color-scheme: dark` and `color-scheme: light` on `:root`                   | global.css                                |
| 84  | Add Plausible analytics script to LandingLayout.astro                            | `defer data-domain` script tag           |
| 85  | Add `.htmlvalidate.json` config for CI                                           | Config with relaxed rules for Starlight   |
| 86  | Add HTML validation step to CI workflow                                          | ci.yml `build-website` job               |
| 87  | Add `html-validate` dev dependency                                               | package.json                              |
| 88  | Fix HeroSection.astro siteConfig usage in `<script>` tag                        | Hardcoded URL in client script            |
| 89  | Add `is:inline` to JSON-LD script to fix Astro warning                          | LandingLayout.astro                      |
| 90  | Add `is:inline` to Plausible script to fix Astro warning                        | LandingLayout.astro                      |
| 91  | Remove unused `className` prop from Icon.astro Props                             | Icon.astro destructuring                 |
| 92  | Remove unused `featureIconKeys` import from Icon.astro                            | Icon.astro imports                       |
| 93  | Remove conflicting `src/pages/404.astro` (Starlight conflict)                   | Starlight built-in 404 used              |
| 94  | Build passes with 0 errors, 0 warnings, 0 hints                                | `astro check` + `npm run build` clean    |
| 95  | HTML validation passes (landing + 404 pages)                                    | html-validate 0 errors                   |
| 96  | OG image generation verified working                                             | Build generates all 15 og/*.png files    |

## ✅ Completed (2026-05-04 — Session 1)

| #   | Task                                                                              | Evidence                                   |
| --- | --------------------------------------------------------------------------------- | ------------------------------------------ |
| 23  | Fix Logo component `class` prop type error                                        | Logo.astro now accepts class prop          |
| 24  | Remove unused `lang` prop from CodeBlock                                          | CodeBlock.astro cleaned                    |
| 25  | Create `siteConfig` in data/config.ts                                             | Single source of truth for URLs, desc, etc |
| 26  | Derive generator count from generators.length                                     | generatorCount export in generators.ts     |
| 27  | Replace hardcoded GitHub URL (4 occurrences)                                      | All files use siteConfig.github            |
| 28  | Replace hardcoded generator count "11" (5 occurrences)                            | All files use generatorCount               |
| 29  | Replace hardcoded LarsArtmann URL                                                 | All files use siteConfig.author.url        |
| 30  | Fix OG description duplication (3 near-identical copies)                          | LandingLayout uses single ogDesc variable  |
| 31  | Fix copy button visibility (missing .code-preview class)                          | Added code-preview class to parent div     |
| 32  | Fix IntersectionObserver selector                                                 | Now observes [data-animate] not .fade-in   |
| 33  | Replace emoji icons with inline SVGs                                              | Use cases section uses proper SVGs         |
| 34  | Add aria-hidden to decorative SVGs                                                 | GeneratorGrid arrow icons                  |
| 35  | Add aria-label to Logo SVG                                                        | Logo.astro role="img" aria-label           |
| 36  | Add loading="lazy" to generator logos                                             | GeneratorGrid images                       |
| 37  | Add title tooltips to generator card links                                        | GeneratorGrid links                        |
| 38  | Differentiate non-clickable generic card                                           | border-dashed + no hover glow              |
| 39  | Build passes with 0 errors, 0 warnings                                            | astro check: clean                         |
| 40  | Features audit completed                                                           | FEATURES.md created                        |
| 41  | Architecture review completed                                                      | docs/status/ written                       |
| 42  | Architecture diagrams created                                                      | current + ideal D2 → SVG                   |
| 43  | Full code review completed                                                        | docs/planning/ written                     |
| 44  | Remove dead .generator-* CSS and unused keyframes                                 | global.css reduced from 780 to 51 lines    |
| 45  | Move fade-in animation to global.css                                              | data-animate attribute pattern             |
| 46  | Replace max-sm Tailwind hacks with scoped CSS                                     | Header.astro mobile nav                    |
| 47  | Extract shared Logo SVG component                                                 | Logo.astro deduplicates Header/Footer      |
| 48  | Add typed data layer (types.ts, generators.ts, features.ts)                       | All data in src/data/                     |
| 49  | Switch @theme inline to @theme                                                    | Runtime CSS custom properties              |
| 50  | Self-host fonts via Astro font provider                                           | Space Grotesk + JetBrains Mono             |
| 51  | Extract HeroSection, PhaseSection, ComparisonSection, UseCasesSection, CTASection  | 5 new components                          |
| 52  | Create data/sections.ts with all section data                                     | phases, comparisons, useCases              |
| 53  | Add PhaseCard, ComparisonItem, UseCase types                                      | types.ts extended                         |
| 54  | Refactor index.astro with extracted sections                                      | 229 lines → 64 lines (72% reduction)      |
| 55  | Refactor FeatureGrid.astro to use Card.astro                                      | Cleaner markup, shared component          |
| 56  | Add accent-light theme token                                                      | --color-accent-light: #a5f3fc             |
| 57  | Fix hardcoded #a5f3fc with accent-light                                          | index.astro gradient                      |
| 58  | Add prefers-reduced-motion support                                                 | global.css media query                    |
| 59  | Remove dead .fade-in CSS from index.astro                                         | Inline style block deleted                |
| 60  | Improve Header mobile nav (close btn, close-on-click, CSS vars)                    | Full mobile UX polish                     |
| 61  | Commit comprehensive status report                                                 | docs/status/2026-05-04_08-42_...md       |

---

## Session Summary (2026-05-04)

| Metric                         | Value                                           |
| ------------------------------ | ----------------------------------------------- |
| Total items completed (session 2) | 35 (items #62-96)                            |
| New components created         | 1 (Icon.astro)                                  |
| New data type exports          | 3 (`FeatureIcon`, `useCaseIconKeys`, `UseCaseIcon`) |
| Icons centralized              | 12 (lightning, sliders, glob, chart, folder, database, cog, refresh, bolt, check, arrow-external, arrow-right, github, menu, close, sun, moon) |
| Theme variables added          | 14 (light mode palette)                        |
| New CI steps                   | 1 (HTML validation in build-website job)       |
| Type check                     | 0 errors, 0 warnings, 0 hints                  |
| HTML validation                | 0 errors (landing page + 404)                  |
| Build                          | 17 pages, clean                                |

---

## Remaining Items (PENDING — require manual/live environment)

| # | Task | Reason |
|---|------|--------|
| A | Run Lighthouse audit | Requires live browser + network |
| B | Browser visual QA (desktop + mobile) | Requires live browser + network |
| C | Source real brand logos | Requires access to actual logo files |

## Astro Best Practices — New Findings (2026-05-04)

From `docs/research/2026-05-04_astro-best-practices.md`:

| # | Task | Impact | Effort | Status |
|---|------|--------|--------|--------|
| D | Enable `prefetch` in astro.config.mjs | Perceived perf | 5min | PENDING |
| E | Add `data-astro-prefetch` to key nav links | Perceived perf | 5min | PENDING |
| F | Add View Transitions (ClientRouter) | Navigation speed | 15min | PENDING |
| G | Move logos from `public/` to `src/assets/` | Image opt | 30min | PENDING |
| H | Configure Shiki dual light/dark themes | Code quality | 10min | PENDING |
| I | Add `og:image` meta to landing page | Social sharing | 5min | PENDING |
| J | Add security headers in firebase.json | Security | 5min | PENDING |
| K | Tighten Icon.astro Props to union type | Type safety | 10min | PENDING |
| L | Enhance robots.txt with Sitemap reference | SEO | 1min | PENDING |
