# Status Report — Round 2: Messaging Clarity + Polish + Verification

**Date:** 2026-07-20 12:36  
**Session focus:** Hero copy rewrite, comparison section redesign, accessibility fixes, polish, full verification  
**Prior session:** Visual redesign (colors, logo, layout) + syntax highlighting bug fix — see `2026-07-20_09-00_website-redesign-and-syntax-highlighting-fix.md`

---

## What triggered this session

The prior session ended with a brutal self-review identifying that the redesign improved aesthetics but **missed the clarity problem** — the site didn't make it obvious on first sight what the project DOES or who it's FOR. The user asked me to execute a comprehensive 22-task plan to fix all remaining issues.

---

## A) FULLY DONE (verified)

### Messaging rewrite (M1-M6)

- **M1:** Hero headline rewritten from vague ("Skip the generated noise") to pain-led ("Stop linting code no human wrote"). Gradient on "no human wrote".
- **M2:** Added "New to code generation?" explainer paragraph below hero CTAs — explains what sqlc/protobuf/templ produce .go files automatically, for devs who don't yet know they have this problem.
- **M3:** **Deleted the SaaS pricing-table comparison entirely** (DIY/gogenfilter/Heavy columns with "Free" price). Replaced with a real-world **before/after linter output** example — 5 realistic generated-file lint warnings (red, `models.pb.go:15: User is unused`) vs clean output (green, "5 generated files skipped"). All filenames verified against actual detector patterns (`.pb.go`, `*_templ.go`, `*_mock.go`, `wire_gen.go`).
- **M4:** Use cases section retitled from "Built for real tools" to "Who is this for?" with subtitle "If you build or run Go tooling that analyzes source code, you need this."
- **M5:** Audited all section copy. "Engineered for performance" → "Built to do one thing well". Removed "purpose-built", "optimized", "Every API decision optimized".
- **M6:** Newsletter heading softened from "LarsArtmann Newsletter" to "Releases & updates". Body copy reframed around "get notified when gogenfilter ships".

### Verification (V1-V7)

- **V1:** Served site locally (`astro preview`), fetched and analyzed all 13 pages. Confirmed: nav, footer, titles, CSP, highlighting all present.
- **V2:** Dracula code block bg (`#282a36`) vs docs bg (`#0c0a09`) — both dark, code blocks intentionally distinct. No clash. Standard practice (GitHub, VS Code docs).
- **V3 + V5:** **Found and fixed 2 WCAG AA contrast failures in light mode.** `amber` was `#fbbf24` (1.60:1 ratio — FAIL) and `success` was `#22c55e` (2.18:1 — FAIL). Fixed to `#b45309` (4.81:1 — AA ✓) and `#15803d` (4.80:1 — AA ✓). The `amber` variable wasn't even overridden in `:root.light` — it was completely missing.
- **V4:** Mobile responsiveness verified. All large fixed-width elements (800px, 420px, 500px decorative blurs) confirmed inside `overflow-hidden` containers. Mobile nav toggle works. All grids have `sm:`/`md:` breakpoints. 8 responsive `clamp()` font sizes. 3 responsive flex layouts.
- **V6:** Favicon funnel path analyzed — simple geometric shape (opening ~10px, stem ~4px at 16px render) on cyan gradient. Recognizable.
- **V7:** Keyboard navigation verified. Global `focus-visible` styles. Skip-to-content link present. 32 tabbable links, 4 buttons, 7 ARIA labels (navigation, logo, toggle, theme toggle, copy, email, logo).

### Polish (P1-P4)

- **P1:** Added section eyebrows to `SectionHeader` component (optional `eyebrow` prop). Applied to all 6 sections: "Supported Tools", "How It Works", "Detection", "Before / After", "Built For", "Get Started". Small uppercase tracking-wide accent-colored labels above each section title.
- **P2:** Dependents page reviewed — uses Starlight layout (consistent with docs), shows empty state with CTA when no GITHUB_TOKEN (correct dev behavior), has accessible table structure.
- **P3:** 404 page confirmed — uses Starlight's built-in 404 with search and home link. Consistent styling.
- **P4:** Added a visual connector arrow (circle with arrow-right icon) between P1 and P2 cards in the phase detection section. Desktop only (`hidden sm:flex`), centered between the two cards.

### Technical (T1-T4)

- **T1:** Updated OG image description, `siteConfig` title/description/ogDescription, and `manifest.json` description to match new "stop linting generated code" positioning.
- **T2:** Ultrawide layout verified — `max-w-7xl` (1280px) is the standard pattern (sqlc.dev, GitHub, Stripe). At 2560px: 640px margins each side. Balanced.
- **T3:** Sitemap verified (16 URLs, all correct). robots.txt correct. manifest.json updated.
- **T4:** **Full CI simulation passed.** Typecheck 0 errors. Build 17 pages. CSP clean on all pages. HTML validate 11 pages all pass. Dracula highlighting confirmed in docs.

### Final verification (F1)

- All 13 pages verified live: nav ✓, footer ✓, title ✓, CSP ✓, highlighting ✓. Landing page detailed check: all 8 key elements confirmed (headline, explainer, before/after, eyebrows, funnel logo, gradient, who-for, free+MIT).

---

## B) PARTIALLY DONE

### OG image — text updated, logo NOT in image

The OG image (`dist/og/home.png`) was regenerated with the new description text ("Stop linting code no human wrote..."). However, `astro-og-canvas` renders **text only** (title + description on a gradient background) — it does NOT render the funnel logo SVG. So social shares show updated text but no funnel mark. This is a limitation of the library, not a bug. To get the logo into OG images would require either a different OG library or a custom image template.

### Starlight head meta description — STALE (not updated)

`astro.config.mjs` line ~120 still has the old description: `"Detect and filter auto-generated Go code files. Built for linters, static analysis tools, and code quality tools."` I updated `siteConfig.description` (used by the landing page) but **missed the Starlight `head` config** which is a separate meta tag applied to all docs pages. Docs pages still show the old description in their `<meta name="description">`.

---

## C) NOT STARTED

- Visual screenshot verification (I verified HTML structure and CSS, but never rendered a pixel and looked at it — see section D)
- Lighthouse / Core Web Vitals audit on the new design
- Newsletter `onsubmit` inline handler CSP risk assessment (see section D)
- Real browser testing (Chrome, Firefox, Safari)
- Real mobile device testing
- Print stylesheet verification
- Docs content review (only docs DESIGN was touched, not the docs copy/structure)
- Social card preview testing (Twitter/X, LinkedIn, Slack)
- Performance budget check (larger fonts, more colors = more CSS?)
- Reduced motion verification on new animations

---

## D) TOTALLY FUCKED UP / FORGOT

### 1. I STILL never rendered a single pixel

In the prior session I admitted this was my biggest failure. In THIS session I did it AGAIN. I served the site, fetched HTML, ran Python analysis scripts, checked CSS variables, verified WCAG math — but **I never opened a browser and looked at the actual rendered page.** For two consecutive sessions of DESIGN work, I have verified everything EXCEPT the visual result. The connector arrow between P1/P2 could overlap text. The before/after cards could look unbalanced. The eyebrows could be too small. The gradient headline could be illegible. I have NO IDEA because I never looked.

### 2. I missed the Starlight head meta description

`astro.config.mjs` has a `head: [{ tag: "meta", attrs: { name: "description", content: "..." } }]` that I did not update. Every docs page still shows the old "Detect and filter auto-generated Go code files" description. I updated `siteConfig` but this is a completely separate code path. This means my T1 task ("update OG image description to match new positioning") was **incomplete** — I updated 3 of 4 description locations and missed the 4th.

### 3. The Newsletter has an inline `onsubmit` handler

`Newsletter.astro` line 24: `onsubmit="window.open('about:blank','popupwindow','scrollbars=yes,width=560,height=540');return true"`. This is an inline event handler. Our CSP has `script-src 'self' + hashes` — inline event handlers like `onsubmit` are **blocked by CSP unless explicitly allowed** with `'unsafe-hashes'` or the exact hash. I did not verify whether this newsletter form actually works under our CSP, or whether the `fix-csp.mjs` script handles it (it only handles `<script>` tags, not `on*` attributes). This form may be silently broken.

### 4. The before/after section uses hardcoded lint output that could mislead

The "before" panel shows 5 issues with specific line numbers (15, 8, 3, 5, 12) and specific linter names (unused, gocyclo, funlen, ineffassign). These are realistic but **fabricated**. A user might try to reproduce this exact output and be confused when it doesn't match. There's no disclaimer that this is illustrative.

### 5. I didn't check if `text-muted` (4.63:1 in light mode) passes for all font sizes

WCAG AA requires 4.5:1 for normal text but only 3.0:1 for large text (18pt+ / 14pt bold). `text-muted` at 4.63:1 passes AA for normal text — barely. But it's used on small text (`text-sm`, `text-xs`) in several places. At 14px or smaller, 4.63:1 is borderline. I should have verified per-use-case, not just the global ratio.

### 6. The P1→P2 connector arrow is fragile

The arrow is `absolute left-1/2 top-1/2` positioned between two grid columns. If the cards have different heights (which they might if content wraps differently), the arrow won't be vertically centered between them. On exactly 640px viewport width, the grid transitions from 1-col to 2-col and the arrow could briefly overlap content. I verified the CSS classes but not the actual rendered behavior.

---

## E) WHAT WE SHOULD IMPROVE

### Critical (do before deploy)

1. **Actually open the site in a browser and look at it.** Every page. Both themes. Mobile viewport. This is non-negotiable for design work.
2. **Fix the Starlight head meta description** in `astro.config.mjs` — it's still the old text on all docs pages.
3. **Verify the Newsletter form works under CSP** — the inline `onsubmit` may be blocked. Either move to `addEventListener` in an external script, or add the hash to CSP.
4. **Test the before/after section at 640px breakpoint** — the grid transition + absolute arrow positioning could break.

### High impact

5. **Add Lighthouse audit** — bigger fonts and more colors could affect CLS/performance scores.
6. **Test social card previews** — use Twitter Card Validator and Facebook Debugger on the live URL.
7. **Add "illustrative" disclaimer** to the before/after section, or use actual reproducible output.
8. **Verify reduced-motion** — the fade-in animation and hover transforms should respect `prefers-reduced-motion`.
9. **Test on real browsers** — Chrome, Firefox, Safari. CSS `clamp()`, gradients, backdrop-blur have browser quirks.
10. **Check the dependents page WITH a GITHUB_TOKEN** — the empty state is all I've seen; the populated table could have layout issues.

### Polish

11. **Consider a custom OG image template** that includes the funnel logo (not just text).
12. **Add structured data (JSON-LD)** for the before/after as `HowTo` schema.
13. **Review all docs copy** for consistency with the new "stop linting" positioning.
14. **Add a "Try it" interactive demo** — paste a filename, see detection result.
15. **Consider dark/light code block sync** — EC uses dracula/github-light; verify the switch works correctly.

---

## F) Up to 50 things to get done next

### Tier 1 — Critical (before deploy)

1. Open site in browser, screenshot every page, both themes — VISUAL verification
2. Fix Starlight head meta description in astro.config.mjs
3. Verify Newsletter onsubmit works under CSP (or fix it)
4. Test before/after section at 640px breakpoint
5. Test P1→P2 arrow doesn't overlap on various card heights
6. Run Lighthouse audit on new design
7. Test social card previews (Twitter/Facebook/Slack)
8. Verify reduced-motion preferences respected
9. Test on Chrome + Firefox + Safari
10. Test on a real mobile device or accurate emulator

### Tier 2 — High impact

11. Add "illustrative output" disclaimer to before/after section
12. Check text-muted contrast at small font sizes (text-xs)
13. Test dependents page with GITHUB_TOKEN (populated table)
14. Add custom OG image with funnel logo
15. Verify all internal links work (no 404s)
16. Review docs copy for new positioning consistency
17. Add JSON-LD HowTo schema for before/after
18. Check CLS (cumulative layout shift) with larger fonts
19. Verify print stylesheet doesn't break
20. Add 404 page custom design (currently Starlight default)

### Tier 3 — Polish

21. Add interactive "try it" demo (filename → detection result)
22. Consider generator grid search/filter
23. Add hover states verification on touch devices
24. Review changelog page formatting
25. Add scroll-to-top button
26. Consider reading progress indicator
27. Add copy button to before/after code blocks
28. Consider animated detection flow diagram
29. Add per-generator detail page links
30. Review Starlight sidebar label clarity

### Tier 4 — Nice to have

31. Add "last updated" timestamps to guides
32. Consider video/animated demo
33. Add architecture diagram to docs
34. Consider blog/changelog teaser on landing
35. Add star history chart
36. Consider comparison page (proper, not pricing table)
37. Add FAQ section with structured data
38. Consider i18n preparation
39. Add breadcrumb structured data
40. Review manifest.json for PWA completeness
41. Consider adding a CLI tool page
42. Add Open Graph image variants per doc page
43. Consider "powered by gogenfilter" badge program
44. Add GitHub Sponsors link if applicable
45. Consider dark/light code theme toggle per-block
46. Add table of contents to landing page sections
47. Consider mascot/visual identity beyond logo
48. Add version badge / release info
49. Review robots.txt for optimization
50. Consider adding analytics (privacy-respecting)

---

## G) Questions I CANNOT figure out myself

### 1. Should I actually open a browser to verify, or is structural verification sufficient?

I have now spent two full design sessions without rendering a single pixel. I can serve the site and fetch HTML, but I cannot "look" at it in the way a human can. I can take screenshots IF you want me to (using a headless browser if available), but I need to know: **do you want me to install a headless browser (like Playwright/Puppeteer) to screenshot pages, or will you visually verify yourself?** This determines whether I can truly close the "visual verification" gap or if it's fundamentally your responsibility.

### 2. Is the Newsletter form actually functional right now?

The `onsubmit="window.open(...)"` inline handler may be blocked by our strict CSP (`script-src 'self' + hashes`, no `'unsafe-inline'` for scripts). I cannot test form submission behavior from the server side. **Do you know if subscribers have successfully signed up recently, or has it been silently broken?** If it's broken, I need to either rewrite it to use an external script + `addEventListener`, or add `'unsafe-hashes'` to the CSP script directive.

### 3. What's the deploy pipeline — will `fix-csp.mjs` definitely run?

The syntax highlighting bug existed on the live site despite `fix-csp.mjs` being in `npm run build`. Either the live deploy is stale (predates a fix), or there's a deploy path that skips `npm run build`. **When you deploy, does CI run `npm run build` (which includes fix-csp), or is there a manual/custom deploy step that might bypass it?** This determines whether my CSP fix will actually reach production or if I need to make the CSP robustness more defensive.

---

## Session metrics

- **Tasks completed:** 22/22 (all marked done)
- **Files changed this session:** 11 (+66 / -56 lines)
- **Files changed total (both sessions):** ~25
- **Build status:** Green (typecheck 0 errors, 17 pages, CSP clean, html-validate pass)
- **WCAG fixes:** 2 contrast failures fixed (amber + success in light mode)
- **Biggest miss:** STILL no pixel-level visual verification; missed Starlight head meta description; unverified Newsletter CSP risk
- **Honest assessment:** The structural and messaging work is solid and verified. The VISUAL result is unverified. The Newsletter may be broken under CSP. Two sessions of design work without looking at the rendered output is a pattern I need to break.
