# Status Report — Full Website Audit

**Date:** 2026-04-30 23:39
**Branch:** master (clean, pushed to origin)
**Go Tests:** PASS (race detector)
**Website Build:** PASS (16 pages, 14 OG images, 2.07s, 2.0MB)

---

## Session Summary (2 sessions, 7 commits)

| Commit    | Description                                                                           |
| --------- | ------------------------------------------------------------------------------------- |
| `30b252f` | feat(website): initial Astro + Starlight site, landing page, 11 docs, Firebase config |
| `971667e` | fix(website): favicon.svg, favicon.ico, robots.txt, hero badge accuracy               |
| `ac04790` | feat(website): mobile nav, copy button, comparison section, scroll animations         |
| `3f3e024` | feat(website): OG image generation (14 PNGs), changelog + contributing pages          |
| `56bd04f` | docs: website polish sprint status report                                             |
| `248c840` | feat(website): flake.nix, domain set to gogenfilter.lars.software                     |

---

## a) FULLY DONE

### Go Library (Pre-existing, No Regressions)

- 11 generator detectors (sqlc, templ, go-enum, protobuf, oapi-codegen, deepcopy-gen, wire, moq, mockgen, stringer, generic)
- Two-phase detection, functional options API, fs.FS abstraction, thread-safe metrics
- Branded errors, phantom types, SQLC config discovery, glob pattern matching
- `go test -race ./...` passes clean

### Website — Landing Page (`/`)

- Hero: "Skip the generated noise." with gradient accent, animated badge dot
- Code preview with syntax-highlighted Go example + copy-to-clipboard button
- Install command: `$ go get github.com/LarsArtmann/gogenfilter`
- Generator grid: 11 supported generators with filename patterns
- Feature grid: 6 features with SVG icons
- Two-phase detection explainer (P1: filename zero-I/O, P2: content scan)
- "Why gogenfilter?" comparison: Regex Grep vs gogenfilter vs Full AST Parse
- Use cases: Linters, Code Quality, CI/CD
- CTA section: "Start filtering in seconds"
- "Star on GitHub" badge
- Mobile hamburger navigation (toggle for <640px)
- IntersectionObserver fade-in animations on all sections
- Sticky nav with logo, Docs link, GitHub link
- Footer: Documentation, GitHub, pkg.go.dev links

### Website — Design

- Dark theme (stone-950 bg, cyan-400 accent)
- Typography: Space Grotesk + JetBrains Mono
- Custom vanilla CSS (no Tailwind — v4 incompatible with Astro 6)
- Responsive: mobile-first grid breakpoints

### Website — Documentation (13 MDX pages)

- Getting Started: Installation, Quick Start
- Guides: Filter Options, Pattern Matching, Metrics, SQLC Config, Custom Filesystems
- API Reference: Filter, Detection, Types, Errors
- Generators: Complete detection table
- Community: Changelog, Contributing
- Starlight sidebar with 4 sections, PageFind search, dark/light toggle

### Website — Infrastructure

- Astro v6.2.1 + Starlight v0.38.4
- 36 source files, 16 HTML output pages, 14 OG images
- Sitemap auto-generated
- Firebase Hosting config (firebase.json, .firebaserc)
- GitHub Actions CI/CD (.github/workflows/deploy-website.yml)
- flake.nix with devShell + apps (dev, build, preview, deploy)
- Domain: gogenfilter.lars.software
- favicon.svg + favicon.ico + robots.txt
- OG meta tags on landing page + auto-generated OG PNGs for all docs pages

---

## b) PARTIALLY DONE

### Firebase Deployment

- Config files exist (firebase.json, .firebaserc, flake.nix deploy app) ✅
- GitHub Actions workflow exists ✅
- Domain set in all configs ✅
- **NOT deployed** — requires: Firebase CLI login, project creation (`firebase projects:create gogenfilter-site`), `firebase deploy`, custom domain setup in Firebase console, CNAME in DNS, `FIREBASE_SERVICE_ACCOUNT` GitHub secret

### Starlight Logo

- SVG logo exists at public/logo.svg ✅
- Starlight logo config removed (Astro image optimization breaks on SVGs) ❌
- Starlight shows text-only "gogenfilter" in sidebar — no logo image

### OG Images

- 14 PNGs auto-generated for all docs pages ✅
- OG meta tags on landing page ✅
- OG images NOT yet referenced in Starlight docs head config (need `routeMiddleware`) ❌
- No actual OG image for the landing page itself (just meta tags without image URL) ❌

---

## c) NOT STARTED

1. **Actual Firebase deployment** — `firebase deploy` never run
2. **Custom domain DNS** — CNAME record for gogenfilter.lars.software
3. **FIREBASE_SERVICE_ACCOUNT secret** — GitHub Actions can't deploy without it
4. **Starlight logo fix** — use PNG instead of SVG, or configure Astro to skip image optimization
5. **OG image injection into Starlight head** — routeMiddleware to add og:image to each docs page
6. **OG image for landing page** — static image or generated PNG
7. **Re-integrate Tailwind CSS** — either v3 (compatible) or wait for v4 fix
8. **Analytics** — no Plausible, Umami, or Google Analytics
9. **Lighthouse audit** — no performance, accessibility, or SEO scoring
10. **Performance budgets** — no bundle size tracking
11. **Versioned docs** — no versioning support for multi-version API docs
12. **i18n** — English only
13. **Blog** — no changelog/release blog section
14. **Interactive Go playground** — no live code execution
15. **Email capture** — no newsletter signup
16. **GitHub stars dynamic badge** — static link, not pulling live star count
17. **Structured data (JSON-LD)** — no rich snippets for search engines
18. **RSS feed** — not configured in Starlight
19. **apple-touch-icon** — no iOS home screen icon (only favicon.ico)
20. **Accessibility audit** — no axe-core testing
21. **Social media previews** — never tested on Twitter/Facebook/Slack card validators
22. **CI build-only on PRs** — current workflow deploys on PRs too (wasteful without preview channels)
23. **Content proofreading** — docs written from README, never professionally reviewed
24. **404 page branding** — Starlight default 404, not custom branded
25. **Loading performance** — Google Fonts loaded via external URL (could self-host)

---

## d) TOTALLY FUCKED UP (Lessons Learned)

1. **Tailwind v4 + Astro 6** — `@tailwindcss/vite` v4's CSS scanner processes `.astro` files and crashes with `Expected "}" but found ":"`. Root cause: Tailwind v4 tries to parse HTML class attributes as CSS. Spent ~20min debugging. Should have checked compatibility matrix first. Removed entirely, replaced with vanilla CSS.

2. **`<pre><code>` inline `<span>` in Astro** — esbuild parses HTML children in Astro templates as potential expressions. Raw `<span class="kw">package</span>` inside `<pre>` causes parsing errors. Fix: use `set:html={...}` template literal to inject as raw HTML string. Should have known this from Astro docs.

3. **Starlight SVG logo** — `logo: { src: '/logo.svg' }` triggers Astro's image optimization pipeline which tries to process SVGs as raster images → `[ImageNotFound]` error. Should have used PNG from the start or tested logo config before committing.

4. **Astro v6 content collections breaking change** — `src/content/config.ts` rejected. Required `src/content.config.ts` with `docsLoader()` + `docsSchema()`. Import paths different from all blog posts (which show Astro v5 syntax). Misleading error: `is not a function` when the real issue was wrong import path.

5. **"Zero Dependencies" claim** — shipped inaccurate marketing copy. Library has 2 dependencies (doublestar, go-faster/yaml). Fixed to "MIT License" but should have verified `go.mod` before writing any copy.

6. **Missing favicon.svg** — Starlight references `/favicon.svg` by default but the file didn't exist (only `logo.svg`). Every docs page had a 404 for favicon. Created by copying logo.svg, but should have caught this in initial setup.

---

## e) WHAT WE SHOULD IMPROVE

### Critical (Blocks Launch)

1. **Deploy to Firebase** — 3 CLI commands, but needs your Firebase login + project creation
2. **DNS setup** — CNAME record for gogenfilter.lars.software
3. **GitHub Actions secret** — `FIREBASE_SERVICE_ACCOUNT` for CI/CD

### High Impact

4. **OG image injection into Starlight** — use routeMiddleware to add og:image to docs head
5. **Starlight logo** — create PNG version, configure properly
6. **Self-host fonts** — Google Fonts external request hurts performance + privacy
7. **Lighthouse audit** — establish baseline, fix low-hanging fruit

### Medium Impact

8. **Tailwind v3** — re-add with compatible version for faster iteration
9. **Analytics** — Plausible or Umami for traffic tracking
10. **JSON-LD** — structured data for search rich snippets
11. **RSS feed** — Starlight supports this natively, one config line
12. **apple-touch-icon** — iOS home screen icon
13. **Content review** — have someone proofread all 13 doc pages

### Nice to Have

14. **Versioned docs** — track API changes across releases
15. **i18n** — translate for non-English audiences
16. **Blog** — publish changelogs as blog posts
17. **Go playground** — embed interactive Go examples
18. **GitHub stars API** — dynamic badge pulling live count
19. **Email capture** — newsletter for library updates

---

## f) Top #25 Things to Do Next

| #   | Task                                                      | Impact   | Effort | Blocks On                |
| --- | --------------------------------------------------------- | -------- | ------ | ------------------------ |
| 1   | Deploy to Firebase (login, create project, deploy)        | CRITICAL | 10min  | You: firebase login      |
| 2   | Add FIREBASE_SERVICE_ACCOUNT GitHub secret                | CRITICAL | 5min   | You: GCP service account |
| 3   | Configure DNS CNAME for gogenfilter.lars.software         | CRITICAL | 10min  | You: DNS access          |
| 4   | Add custom domain in Firebase Hosting console             | CRITICAL | 5min   | After #1                 |
| 5   | Fix Starlight logo (generate PNG, add config)             | HIGH     | 20min  | None                     |
| 6   | Wire OG images into Starlight docs head (routeMiddleware) | HIGH     | 20min  | None                     |
| 7   | Add static OG image for landing page                      | HIGH     | 15min  | None                     |
| 8   | Self-host Google Fonts (download + local serve)           | MEDIUM   | 30min  | None                     |
| 9   | Run Lighthouse audit + fix issues                         | MEDIUM   | 30min  | None                     |
| 10  | Add apple-touch-icon.png (180x180)                        | MEDIUM   | 5min   | None                     |
| 11  | Enable Starlight RSS feed                                 | MEDIUM   | 5min   | None                     |
| 12  | Add JSON-LD structured data                               | MEDIUM   | 20min  | None                     |
| 13  | Re-add Tailwind CSS v3 (compatible with Astro 6)          | MEDIUM   | 1hr    | None                     |
| 14  | Add Plausible analytics                                   | MEDIUM   | 15min  | You: Plausible account   |
| 15  | Proofread all 13 documentation pages                      | MEDIUM   | 1hr    | None                     |
| 16  | Separate CI workflow: build-only on PRs, deploy on master | LOW      | 15min  | None                     |
| 17  | Create custom 404 page matching landing page design       | LOW      | 20min  | None                     |
| 18  | Add dynamic GitHub stars count via API                    | LOW      | 15min  | None                     |
| 19  | Add versioned docs support                                | LOW      | 2hr    | None                     |
| 20  | Add i18n (German, Japanese?)                              | LOW      | 4hr    | None                     |
| 21  | Add blog section for release notes                        | LOW      | 1hr    | None                     |
| 22  | Add interactive Go playground examples                    | LOW      | 3hr    | None                     |
| 23  | Add email/newsletter capture                              | LOW      | 1hr    | You: email service       |
| 24  | Performance budgets in CI                                 | LOW      | 30min  | None                     |
| 25  | Accessibility audit with axe-core                         | LOW      | 1hr    | None                     |

---

## g) Top #1 Question

**Do you have a Google/Firebase account already, and do you want me to walk you through the deployment steps, or will you handle the Firebase project creation + DNS yourself?**

This blocks items #1-4 above (the entire deployment). The flake.nix `deploy` app and GitHub Actions workflow are ready — they just need a real Firebase project to point at.

---

## Build Verification

| Check                         | Status                               |
| ----------------------------- | ------------------------------------ |
| `go test -race ./...`         | PASS                                 |
| `cd website && npm run build` | PASS (16 pages, 14 OG images, 2.07s) |
| `nix flake check` (website/)  | PASS                                 |
| `git status`                  | CLEAN (pushed to origin/master)      |
| Website source files          | 36                                   |
| Total commits this session    | 7                                    |
