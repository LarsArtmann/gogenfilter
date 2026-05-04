# Status Report: Tailwind v4 Migration + Architecture Polish

**Date:** 2026-05-04 08:11 CEST
**Scope:** website/ (Astro + Starlight landing page & docs)

---

## Executive Summary

Migrated the entire website from 782 lines of hand-written CSS to Tailwind CSS v4.2.4. The site now uses a clean `@theme` config (42 lines), self-hosted fonts, typed data layer, shared components, and proper scroll animations. **14 commits pushed.** One critical regression discovered during this audit.

---

## a) FULLY DONE

| # | Item | Evidence |
|---|------|----------|
| 1 | **Tailwind v4.2.4 installed** | `@tailwindcss/vite` + `tailwindcss` in package.json |
| 2 | **Vite plugin configured** | `astro.config.mjs:95-97` — `plugins: [tailwindcss()]` |
| 3 | **Design system tokens** | `global.css` — `@theme` with 12 colors, 2 fonts, 1 animation |
| 4 | **Runtime CSS custom properties** | Switched `@theme inline` → `@theme` so tokens available on `:root` |
| 5 | **All 7 components migrated** | Header, Footer, GeneratorGrid, FeatureGrid, CodeBlock, Logo, index.astro |
| 6 | **Dead CSS removed** | 775 lines deleted. global.css: 782 → 42 lines |
| 7 | **Typed data layer** | `src/data/types.ts` + `generators.ts` + `features.ts` with interfaces |
| 8 | **Shared Logo component** | `Logo.astro` — used by Header + Footer |
| 9 | **Fonts self-hosted** | Astro `fontProviders.google()` + `fontProviders.fontsource()` |
| 10 | **Google CDN removed** | No `fonts.googleapis.com` references in build output |
| 11 | **Header mobile nav fixed** | Scoped CSS instead of `max-sm:` hacks + `!important` |
| 12 | **CodeBlock uses design tokens** | `border-border`, `bg-bg-code` instead of generic `stone-*` |
| 13 | **Scroll animation architecture** | `data-animate` attr + `[data-animate]:not(.animate-fade-in)` in global.css |
| 14 | **Build passes** | 17 pages built in 2.21s, clean output |
| 15 | **Generator logos** | 11 SVG logos in `public/logos/` |
| 16 | **Starlight docs restructured** | Content under `src/content/docs/docs/` with correct slug config |

---

## b) PARTIALLY DONE

| # | Item | Status | Gap |
|---|------|--------|-----|
| 1 | **Scroll animations** | Architecture is right, but **JS query selector is broken** — see section d) | Query uses `.fade-in` but elements have `data-animate` |

---

## c) NOT STARTED

| # | Item | Priority | Notes |
|---|------|----------|-------|
| 1 | Starlight docs theme customization with design tokens | Medium | Now possible since tokens are runtime CSS vars |
| 2 | `CodeBlock.astro` syntax highlighting | Low | Currently plain `<code>` — no Shiki/Prism integration |
| 3 | Lighthouse audit | Medium | Never run, could reveal perf issues |
| 4 | Firebase deploy of new build | High | New build not deployed yet |
| 5 | `.github/workflows/deploy-website.yml` | High | File was deleted (in unstaged changes) |
| 6 | `package-lock.json` update | Low | Unstaged — reflects new Tailwind deps |
| 7 | `@astrojs/check` + `typescript` in deps | Low | Added but unused for CI |
| 8 | Hero code block accessibility | Low | `set:html` with inline syntax highlighting — no semantic markup |
| 9 | Responsive design QA | Medium | Never tested on actual devices |
| 10 | SEO verification | Medium | Meta tags exist but never validated |
| 11 | Dark/light mode toggle | Low | Site is dark-only, could add toggle using `@theme` tokens |

---

## d) TOTALLY FUCKED UP

### BUG 1: Scroll Animations Completely Broken (CRITICAL)

**File:** `src/pages/index.astro:216`
**Impact:** All 6 scroll-animated sections (Generators, Features, Phase Detection, Comparison, Use Cases, CTA) are **invisible on page load and never animate in**.

```javascript
// BROKEN — queries .fade-in but elements use data-animate attribute
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
```

The `data-animate` attribute + `[data-animate]:not(.animate-fade-in)` CSS makes sections start invisible. The IntersectionObserver adds `animate-fade-in` class which triggers the animation. **But the observer never observes any elements** because it queries `.fade-in` instead of `[data-animate]`.

**Additionally**, lines 219-229 contain dead inline `<style>` with `.fade-in` / `.fade-in.visible` CSS that no element uses — leftover from the migration.

**Fix required:**
1. Line 216: `.fade-in` → `[data-animate]`
2. Lines 219-229: Delete the dead `<style>` block

### BUG 2: `package-lock.json` + workflow changes unstaged

The `package-lock.json`, `package.json` (with new deps), and `.github/workflows/` changes are unstaged. The `deploy-website.yml` was deleted. This means CI may break.

---

## e) WHAT WE SHOULD IMPROVE

### Architecture
1. **Extract inline code highlighting to a proper component** — Hero code block uses `set:html` with hand-crafted `<span>` tags. Should use Shiki or a CodeBlock with proper tokenization.
2. **SVG icon system** — Inline SVGs repeated across components (lightning, chart, folder etc.). Should use an icon component or sprite sheet.
3. **Data-driven sections** — Phase Detection, Comparison, and Use Cases sections in `index.astro` have hardcoded data that should go to `src/data/` like generators/features.
4. **`index.astro` is 229 lines** — Too big. Should extract hero, code preview, phase cards, comparison, and CTA into separate components.

### Performance
5. **No image optimization** — Logo SVGs are unoptimized (could be smaller).
6. **No caching headers** — Firebase config doesn't set cache headers for `_astro/` assets.
7. **Font subsetting** — Only `latin` subset loaded; verify this covers all site content.

### Developer Experience
8. **No TypeScript checking in CI** — `@astrojs/check` is a dependency but not wired to CI.
9. **No linting** — No ESLint/Prettier configured for Astro files.
10. **`nix flake check` doesn't validate the website** — Only checks Go code.

### Content
11. **Docs content is stale** — Some API docs may not reflect latest Go API changes.
12. **No search relevance tuning** — Pagefind works but relevance is default.

---

## f) Top 25 Things to Do Next

Sorted by **impact × urgency / effort**:

| # | Task | Impact | Effort | Category |
|---|------|--------|--------|----------|
| 1 | **FIX: Scroll animations broken** | CRITICAL | 2 min | Bug |
| 2 | **Stage package-lock.json + package.json** | High | 1 min | Hygiene |
| 3 | **Restore or fix deploy-website.yml** | High | 10 min | CI/CD |
| 4 | **Deploy to Firebase** | High | 2 min | Shipping |
| 5 | Run Lighthouse audit | High | 5 min | Perf |
| 6 | Responsive QA on mobile | High | 15 min | QA |
| 7 | Extract HeroSection component from index.astro | Medium | 10 min | Architecture |
| 8 | Extract ComparisonSection component | Medium | 10 min | Architecture |
| 9 | Extract PhaseSection component | Medium | 10 min | Architecture |
| 10 | Move hardcoded section data to src/data/ | Medium | 15 min | Architecture |
| 11 | Add Shiki syntax highlighting to code preview | Medium | 20 min | DX |
| 12 | Create SVG icon component (replace inline SVGs) | Medium | 20 min | DX |
| 13 | Starlight docs theme customization with tokens | Medium | 30 min | Design |
| 14 | Add `astro check` to CI | Medium | 10 min | CI/CD |
| 15 | Optimize SVG logos (svgo) | Low | 10 min | Perf |
| 16 | Firebase caching headers for _astro/ | Medium | 5 min | Perf |
| 17 | Add canonical URL to landing page | Medium | 2 min | SEO |
| 18 | Structured data (JSON-LD) for SoftwareApplication | Medium | 15 min | SEO |
| 19 | Open Graph image for landing page | Medium | 15 min | Social |
| 20 | Accessibility audit (keyboard nav, screen reader) | Medium | 30 min | A11y |
| 21 | Verify font subsetting covers site content | Low | 5 min | Perf |
| 22 | Add prefers-reduced-motion support for animations | Low | 5 min | A11y |
| 23 | Update API docs to match latest Go API | Medium | 30 min | Content |
| 24 | Dark/light mode toggle using @theme tokens | Low | 30 min | Feature |
| 25 | Add 404 page with brand styling | Low | 15 min | Polish |

---

## g) Top #1 Question I Cannot Answer Myself

**Should the `deploy-website.yml` GitHub Actions workflow be restored, or was it intentionally deleted in favor of a different deployment approach (e.g., manual `nix run .#deploy` or Firebase CLI)?**

The file shows as deleted in unstaged changes (`modified: ../.github/workflows/ci.yml`, `deleted: ../.github/workflows/deploy-website.yml`). I cannot determine if this was intentional or accidental. The `flake.nix` has a `deploy` app that runs `npm run build && firebase deploy --only hosting`, which could be the replacement — but I don't know the intent.

---

## File Inventory (Current State)

```
src/
├── components/
│   ├── CodeBlock.astro      (18 lines)
│   ├── FeatureGrid.astro    (20 lines)
│   ├── Footer.astro         (17 lines)
│   ├── GeneratorGrid.astro  (37 lines)
│   ├── Header.astro         (60 lines)
│   └── Logo.astro           (13 lines)
├── content.config.ts        (10 lines)
├── content/docs/docs/       (12 .mdx files + index.mdx)
├── data/
│   ├── features.ts          (43 lines)
│   ├── generators.ts        (15 lines)
│   └── types.ts             (12 lines)
├── layouts/
│   └── LandingLayout.astro  (37 lines)
├── pages/
│   ├── index.astro          (229 lines)
│   └── og/[...slug].ts      (17 lines)
└── styles/
    └── global.css            (42 lines)

Total source: 570 lines (was 1,350+ pre-migration)
Dependencies: astro 6.2.1, tailwindcss 4.2.4, @tailwindcss/vite 4.2.4
Build: 17 pages, 2.21s, fonts self-hosted (5 files)
```

---

## Commit Log (This Session)

```
2ca65e9 perf(fonts): self-host fonts via Astro font provider, remove Google CDN
4d3c031 refactor(css): expose design tokens as runtime CSS custom properties
bd5d043 refactor: extract typed data layer for generators and features
9a97bce refactor: extract shared Logo component, deduplicate Header/Footer SVG
e3000db feat(website): add Logo.astro component with branded SVG icon
d00dcf9 fix(Header): replace max-sm Tailwind hacks with clean scoped CSS for mobile nav
3f6962a refactor(animations): move fade-in to global.css with Tailwind animate utility
ec982c3 refactor(landing): migrate scroll animations to data-attribute selectors
f625e03 docs(status): add comprehensive status report for generator logos + linked cards
46c517a docs: restructure Starlight docs under /docs/ subdirectory
b7ada99 feat(landing): redesign generator grid with logos and full-card links
87b3007 feat(landing): add SVG logos for all 11 supported code generators
d22d3a2 refactor(CodeBlock): use design system tokens instead of generic stone colors
1cf08c9 refactor(css): remove dead generator CSS and unused keyframes from global.css
e55a429 feat(website): add Tailwind CSS v4 with Vite plugin integration
```

**Net delta:** -993 lines removed, +732 lines added. Total reduction: 261 lines.
`global.css` alone: 782 → 42 lines (94.6% reduction).
