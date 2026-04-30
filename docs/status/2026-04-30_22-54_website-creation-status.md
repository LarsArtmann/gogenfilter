# Status Report — Website Creation

**Date:** 2026-04-30 22:54
**Session Goal:** Create a marketing/documentation website for gogenfilter using Astro + Starlight, deployed to Firebase Hosting.

---

## a) FULLY DONE

### Website Infrastructure
- **Astro v6.2.1 + Starlight v0.38.4** initialized in `website/`
- **28 source files** created (components, layouts, pages, styles, content, config)
- **14 HTML pages** generated in 1.88s build, 1.5MB total output
- **Zero JS** on landing page (Astro static output)
- **PageFind search** built into docs (14 HTML files indexed in 30ms)
- **Sitemap** auto-generated (`sitemap-index.xml`)

### Landing Page (`/`)
- Hero section: "Skip the generated noise." with gradient accent
- Interactive code preview showing `main.go` with syntax highlighting
- Install command: `$ go get github.com/LarsArtmann/gogenfilter`
- Generator grid: 11 supported generators with filename patterns
- Feature grid: 6 features with icons (Two-Phase Detection, Functional Options API, Glob Patterns, Metrics, SQLC Config, fs.FS Abstraction)
- Two-phase detection explainer with Phase 1 (filename, zero I/O) and Phase 2 (content) cards
- Use cases section: Linters, Code Quality, CI/CD
- CTA section with "Read the Docs" button
- Sticky nav with logo, Docs link, GitHub link
- Footer with Documentation, GitHub, pkg.go.dev links

### Design
- **Dark theme** (stone-950 background, cyan-400 accent)
- **Typography**: Space Grotesk (headings/body) + JetBrains Mono (code)
- **Custom CSS** (no Tailwind — removed due to Tailwind v4 + Astro 6 compatibility issues)
- **Responsive**: Mobile-first grid breakpoints (2→3→4 cols)
- **Animations**: Pulsing badge dot, hover transitions on cards/buttons

### Documentation (11 MDX pages)
- **Getting Started**: Installation, Quick Start (5 code examples)
- **Guides**: Filter Options (full option table), Pattern Matching (wildcards, rules, examples), Metrics (per-reason breakdown), SQLC Config Discovery, Custom Filesystems (MapFS, embed.FS)
- **API Reference**: Filter (constructor, options, methods), Detection (DetectReason, per-generator functions), Types (FilterOption, FilterReason, derived lists), Errors (branded errors, sentinels)
- **Generators**: Complete detection method table for all 11 tools

### Firebase Hosting
- `firebase.json`: dist/ public dir, clean URLs, trailing slash off, cache headers (immutable for assets, must-revalidate for HTML)
- `.firebaserc`: project default set to "gogenfilter"
- `.gitignore`: node_modules, dist, .firebase, .astro excluded

### CI/CD
- `.github/workflows/deploy-website.yml`: Triggers on push/PR when `website/**` changes
- Node 22, npm ci, build, Firebase deploy action
- Uses `FIREBASE_SERVICE_ACCOUNT` secret (needs to be added to repo)

### Go Library
- All tests pass with race detector (`go test -race ./...`)
- Build clean (`go build ./...`)
- No regressions — website is fully isolated in `website/` directory

### AGENTS.md
- Updated with Website section documenting the new website structure and commands

---

## b) PARTIALLY DONE

### Firebase Deployment
- **Config files created** (firebase.json, .firebaserc) ✅
- **GitHub Actions workflow created** ✅
- **NOT actually deployed yet** — requires:
  1. Firebase project creation at console.firebase.google.com
  2. `firebase login` and project setup
  3. `FIREBASE_SERVICE_ACCOUNT` secret added to GitHub repo
  4. Custom domain configuration (gogenfilter.dev or similar)

### Starlight Logo
- SVG logo created at `public/logo.svg` ✅
- Starlight logo config **removed** due to Astro image optimization error ❌
- Starlight currently shows text-only "gogenfilter" title (no logo image)

### Tailwind CSS
- Installed and attempted integration ✅
- **Removed** due to `@tailwindcss/vite` v4 + Astro 6 incompatibility ❌
- Replaced with custom CSS ✅
- Custom CSS works perfectly but is not utility-class based

---

## c) NOT STARTED

1. **Actual Firebase deployment** — never ran `firebase deploy`
2. **Custom domain setup** — gogenfilter.dev DNS/SSL configuration
3. **Preview deployments** — PR previews via Firebase Hosting channels (workflow supports it but untested)
4. **Open Graph images** — no social sharing images generated
5. **Analytics** — no Google Analytics, Plausible, or similar integrated
6. **Favicon** — only `logo.svg` exists, no `favicon.ico` or `favicon.png`
7. **Robots.txt** — not created (Astro may generate one via sitemap integration)
8. **RSS feed** — not configured (Starlight can do this)
9. **Versioned docs** — Starlight doesn't have native versioning, community plugin not installed
10. **Blog section** — no changelog/blog integration
11. **Interactive playground** — no Go code playground or live demo
12. **Performance testing** — no Lighthouse CI or WebPageTest
13. **Accessibility audit** — no axe-core or Lighthouse a11y testing
14. **Content proofreading** — docs written from README but not professionally reviewed
15. **i18n** — English only, no internationalization
16. **Dark/light theme on landing page** — landing page is dark-only (Starlight docs have theme toggle)
17. **SEO optimization** — basic meta tags only, no structured data, no JSON-LD
18. **Email/newsletter signup** — no mailing list integration
19. **GitHub stars badge** — not dynamically shown on landing page
20. **Code copy button** — no copy-to-clipboard on landing page code blocks (Starlight docs have it)
21. **Mobile navigation** — no hamburger menu on landing page for mobile
22. **Performance budgets** — no bundle size tracking

---

## d) TOTALLY FUCKED UP

1. **Tailwind v4 integration** — `@tailwindcss/vite` v4.2.4 + Astro 6.2.1 caused esbuild CSS parsing errors (`Expected "}" but found ":"`). Root cause: Tailwind v4's CSS scanner processes `.astro` files and chokes on HTML class attributes. Completely removed and replaced with vanilla CSS. This is a known ecosystem incompatibility as of April 2026.

2. **Starlight logo** — `logo: { src: '/logo.svg', replacesTitle: true }` causes `[ImageNotFound]` error because Astro's image optimization pipeline tries to process the SVG as an Astro-optimized image. Workaround: removed logo config entirely; Starlight falls back to text-only title.

3. **Astro v6 content collections breaking change** — `src/content/config.ts` (legacy) was rejected by Astro 6. Required migration to `src/content.config.ts` with `docsLoader()` and `docsSchema()` from `@astrojs/starlight/loaders` and `@astrojs/starlight/schema`. The error messages were misleading (`is not a function` when the real issue was wrong import paths).

4. **`<pre><code>` with inline `<span>` in Astro** — Raw `<span>` elements inside `<pre><code>` blocks cause esbuild parsing errors. Fixed by using `set:html={...}` template literal to inject HTML as a string rather than JSX-like children.

---

## e) WHAT WE SHOULD IMPROVE

### High Priority
1. **Actually deploy** — the website is fully built but sitting in `/dist/` only. Firebase deployment is 3 CLI commands away.
2. **Fix Starlight logo** — either use a PNG/JPG instead of SVG, or configure Astro's image handling to skip SVGs.
3. **Add favicon.ico** — currently only `logo.svg`, browsers expect `.ico`.
4. **Re-add Tailwind** — once `@astrojs/tailwind` is updated for Astro 6/Tailwind v4, or use Tailwind v3.
5. **Open Graph images** — generate social sharing previews for Twitter/Slack/Discord.
6. **Mobile nav** — landing page has no hamburger menu on mobile; nav links overflow.

### Medium Priority
7. **Analytics** — add Plausible or Vercel Analytics for traffic tracking.
8. **Performance audit** — run Lighthouse, optimize fonts, add preloads.
9. **GitHub Actions CI for website** — add a build-only job on PRs (don't deploy previews).
10. **RSS feed** — Starlight supports this out of the box.
11. **Content review** — have someone proofread all 11 doc pages.
12. **Structured data** — add JSON-LD for library/software application.

### Nice to Have
13. **Interactive Go playground** — embed a Go playground for live examples.
14. **Versioned docs** — track API changes across gogenfilter versions.
15. **i18n** — translate docs for non-English audiences.
16. **Blog** — publish changelog entries as blog posts.
17. **GitHub stars badge** — dynamically show on landing page.
18. **Email capture** — newsletter for library updates.

---

## f) Top #25 Things to Do Next

| # | Task | Priority | Effort | Impact |
|---|------|----------|--------|--------|
| 1 | Deploy to Firebase (create project, login, deploy) | CRITICAL | 15min | High |
| 2 | Add `FIREBASE_SERVICE_ACCOUNT` GitHub secret | CRITICAL | 5min | High |
| 3 | Configure custom domain (gogenfilter.dev) | HIGH | 30min | High |
| 4 | Fix Starlight logo (use PNG or configure SVG handling) | HIGH | 30min | Medium |
| 5 | Add favicon.ico + apple-touch-icon | HIGH | 15min | Medium |
| 6 | Add Open Graph / social sharing images | HIGH | 1hr | High |
| 7 | Add mobile hamburger nav to landing page | HIGH | 1hr | Medium |
| 8 | Re-integrate Tailwind CSS (v3 or wait for v4 fix) | MEDIUM | 2hr | Medium |
| 9 | Add robots.txt via Astro integration | MEDIUM | 10min | Low |
| 10 | Add Plausible/Umami analytics | MEDIUM | 30min | Medium |
| 11 | Run Lighthouse audit and fix issues | MEDIUM | 1hr | Medium |
| 12 | Add copy-to-clipboard on landing page code block | MEDIUM | 30min | Low |
| 13 | Add "GitHub Stars" badge to landing page | MEDIUM | 15min | Medium |
| 14 | Generate sitemap for Google Search Console | MEDIUM | 5min | Medium |
| 15 | Proofread all 11 documentation pages | MEDIUM | 2hr | Medium |
| 16 | Add RSS feed via Starlight config | LOW | 15min | Low |
| 17 | Add JSON-LD structured data | LOW | 30min | Low |
| 18 | Create GitHub issue/PR templates | LOW | 30min | Low |
| 19 | Add "Contributing" page to docs (from CONTRIBUTING.md) | LOW | 30min | Low |
| 20 | Add changelog page (from CHANGELOG.md) | LOW | 30min | Low |
| 21 | Set up Lighthouse CI in GitHub Actions | LOW | 1hr | Low |
| 22 | Add versioned docs support | LOW | 2hr | Low |
| 23 | Add interactive Go code examples | LOW | 4hr | Medium |
| 24 | Internationalization (i18n) | LOW | 4hr | Low |
| 25 | Add dark/light toggle to landing page (match Starlight docs) | LOW | 1hr | Low |

---

## g) Top #1 Question I Cannot Figure Out Myself

**What is the Firebase project ID and does a Firebase project already exist for gogenfilter?**

The `.firebaserc` currently says `"default": "gogenfilter"` but:
- Has a Firebase project been created at console.firebase.google.com?
- Is there an existing Google Cloud project tied to this?
- What Google account should own the project?
- Do you want a custom domain (e.g., `gogenfilter.dev`, `gogenfilter.larsartmann.com`, or `gogenfilter.pages.dev`)?
- Should this use Firebase Spark (free) or Blaze (pay-as-you-go)?

This blocks actual deployment (#1-3 in the todo list above). Everything else I can figure out from the codebase and docs.

---

## Build Verification

| Check | Status |
|-------|--------|
| `go test -race ./...` | PASS |
| `go build ./...` | PASS |
| `cd website && npm run build` | PASS (14 pages, 1.88s) |
| No regressions to Go library | CONFIRMED |
