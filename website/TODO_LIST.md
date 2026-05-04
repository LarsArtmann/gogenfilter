# TODO List — gogenfilter Website

**Generated:** 2026-05-04
**Updated:** 2026-05-04
**Files Processed:** All source files, FEATURES.md, previous status docs, architecture docs
**Verified Against:** Actual source code + build output

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
| 1  | Extract `Section.astro` component from index.astro       | full-code-review        | 10min  | TODO     |
| 2  | Extract `Card.astro` component from index.astro          | full-code-review        | 15min  | TODO     |
| 3  | Break index.astro into section components (HeroSection, ComparisonSection, UseCasesSection) | full-code-review | 30min | TODO |
| 4  | Add mobile nav close-on-click behavior                   | code-review             | 5min   | TODO     |
| 5  | Add mobile nav close button (X icon)                     | code-review             | 10min  | TODO     |

## 🟡 MEDIUM Priority

| #  | Task                                                     | Source                  | Effort | Status   |
|----|----------------------------------------------------------|-------------------------|--------|----------|
| 6  | Create `Icon.astro` component to centralize SVGs         | deepening-opportunities | 30min  | TODO     |
| 7  | Type `icons` record keys to Feature['icon'] union        | code-review             | 5min   | TODO     |
| 8  | Extract ComparisonSection data into data/ file           | deepening-opportunities | 10min  | TODO     |
| 9  | Extract UseCasesSection data into data/ file             | deepening-opportunities | 10min  | TODO     |
| 10 | Mobile nav background should use Tailwind token          | code-review             | 5min   | TODO     |
| 11 | Run Lighthouse audit and fix issues                      | previous status doc     | 60min  | TODO     |
| 12 | Verify OG image generation renders correctly             | previous status doc     | 10min  | TODO     |
| 13 | Add HTML validation step to CI                           | code-review             | 15min  | TODO     |
| 14 | Browser visual QA (desktop + mobile)                     | previous status doc     | 30min  | TODO     |
| 15 | Self-host Google Fonts (already done via Astro provider) | previous status doc     | —      | DONE     |

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
| 34 | Add aria-hidden to decorative SVGs                       | GeneratorGrid arrow icons                  |
| 35 | Add aria-label to Logo SVG                               | Logo.astro role="img" aria-label           |
| 36 | Add loading="lazy" to generator logos                    | GeneratorGrid images                       |
| 37 | Add title tooltips to generator card links               | GeneratorGrid links                        |
| 38 | Differentiate non-clickable generic card                 | border-dashed + no hover glow              |
| 39 | Build passes with 0 errors, 0 warnings                  | astro check: clean                         |
| 40 | Features audit completed                                 | FEATURES.md created                        |
| 41 | Architecture review completed                            | docs/status/ written                       |
| 42 | Architecture diagrams created                            | current + ideal D2 → SVG                   |
| 43 | Full code review completed                               | docs/planning/ written                     |
