# Self-Critique & Execution Plan — gogenfilter Website

**Date:** 2026-05-04 09:43 CEST  
**Mode:** Reflect → Plan → Execute

---

## Part 1: What Did I Forget? (Self-Critique)

### 1. Logo Authenticity — Critical Mistake

**What I did:** Created 9 custom SVG logos pretending they were "real" logos for:

- sqlc, templ, protobuf — These **DO** have official branding
- mockgen, go-enum, oapi-codegen, wire — Need verification
- generic — Correctly custom

**What I forgot:**

- I assumed "no logo found" meant "doesn't exist" — this is WRONG
- sqlc has DISTINCTIVE branding (orange gradient is from their actual site)
- Protocol Buffers has an OFFICIAL Google logo
- templ has a GitHub repo that may have assets

**Impact:** Users who know these tools will see FAKE logos. This destroys credibility.

### 2. Icon.astro — Architectural Question

**What I did:** Centralized 12 inline SVGs into a component  
**What I forgot:** There's an opportunity to use `lucide-astro` or similar icon library

**Question:** Should we maintain custom SVG paths or use battle-tested icon libs?

### 3. Type Safety — Missed Opportunities

**What I did:** Created `FeatureIcon`, `UseCaseIcon`, `UIIcon`, `IconName` unions  
**What I forgot:** The `icons` record in `features.ts` still uses string keys instead of the union type

**Gap:** `featureIcons: Record<FeatureIcon, string>` vs `icons: Record<string, string>`

### 4. Responsive Images — No Optimization

**What I did:** Created SVG logos at 48×48 viewBox  
**What I forgot:** Using `<img>` tags for SVGs prevents CSS styling, requires `currentColor` overrides

**Question:** Should we inline generator logos like we do with Icon.astro?

### 5. Documentation Sync

**What I did:** Created excellent documentation  
**What I forgot:** TODO_LIST.md items #19-21 are marked as "DONE" but logo work is incomplete

---

## Part 2: Research Phase — What Actually Exists

### Official Logos Available:

| Tool                    | Official Logo? | Source                       |
| ----------------------- | -------------- | ---------------------------- |
| Go/Stringer             | ✅ YES         | go.dev brand kit             |
| Kubernetes/deepcopy-gen | ✅ YES         | cncf/artwork repo            |
| Protocol Buffers        | ✅ YES         | Google brand assets          |
| sqlc                    | 🤔 VERIFY      | sqlc.dev or GitHub           |
| templ                   | 🤔 VERIFY      | GitHub repo assets           |
| moq                     | ✅ YES         | matryer/moq repo (PNG found) |

### Icon Libraries Available:

| Library                           | Pros                                  | Cons               |
| --------------------------------- | ------------------------------------- | ------------------ |
| `lucide-astro`                    | Tree-shaking, accessible, 1000+ icons | Adds dependency    |
| Current inline                    | Zero deps, fully custom, tiny         | Maintenance burden |
| Hybrid (selected lucide + custom) | Best of both                          | Slightly complex   |

---

## Part 3: Pareto Prioritized Execution Plan

### Tier 1: Critical Fixes (5 min each, 80% impact)

| #   | Task                                      | Impact | Effort | Why                                  |
| --- | ----------------------------------------- | ------ | ------ | ------------------------------------ |
| 1   | **Research actual sqlc logo**             | HIGH   | 10min  | Wrong branding = credibility loss    |
| 2   | **Research actual protobuf logo**         | HIGH   | 10min  | Google has official brand guidelines |
| 3   | **Research actual templ logo**            | HIGH   | 10min  | Repo may have assets                 |
| 4   | **Fix hardcoded `'11'` in LandingLayout** | HIGH   | 2min   | Already identified as BUG            |
| 5   | **Type `features.ts` icons record**       | MEDIUM | 5min   | Inconsistent with Icon.astro         |

### Tier 2: Quality Improvements (15 min each, 15% impact)

| #   | Task                                                       | Impact | Effort |
| --- | ---------------------------------------------------------- | ------ | ------ |
| 6   | Add `lucide-astro` for generic icons (arrow, github, menu) | MEDIUM | 15min  |
| 7   | Keep custom icons only for brand-specific needs            | LOW    | —      |
| 8   | Verify Icon.astro Props uses strict union                  | LOW    | 5min   |
| 9   | Add Icon component to Storybook/HMR testing                | LOW    | 20min  |
| 10  | Lighthouse audit for performance                           | MEDIUM | 30min  |

### Tier 3: Nice-to-Have (60 min each, 5% impact)

| #   | Task                                      | Impact | Effort |
| --- | ----------------------------------------- | ------ | ------ |
| 11  | Inline generator logos instead of `<img>` | LOW    | 30min  |
| 12  | Add SVG sprite map for all icons          | LOW    | 45min  |
| 13  | Theme-aware OG images                     | LOW    | 60min  |

---

## Part 4: Research Tasks (Do First)

### 4.1 Verify Official Brand Assets

```bash
# sqlc — check their GitHub repo
https://github.com/sqlc-dev/sqlc
Look for: logo.*, icon.*, assets/, .github/, docs/

# protobuf — Google brand guidelines
https://developers.google.com/protocol-buffers
Look for: logo downloads, brand kit

# templ — GitHub repo
https://github.com/a-h/templ
Look for: logo.*, docs assets, README images
```

### 4.2 Icon Library Decision Matrix

**Current state:** 12 icons, ~2KB inline SVG code  
**With lucide-astro:** Tree-shaken, accessible, maintained

**Recommendation:** Keep custom icons for brand-specific (generator icons, stroke-based), use lucide for generic UI (arrows, menu, close, star, sun, moon).

---

## Part 5: Architecture Improvements

### Type System Hardening

```typescript
// Before (in features.ts): icons: Record<string, string>
// After: icons: Record<FeatureIcon, { path: string; viewBox?: string }>

// Add metadata to icons:
interface IconDef {
  path: string;
  viewBox: string;
  category: "feature" | "ui" | "useCase";
}
```

### Component Architecture

Current flow:

```
Icon.astro → allIcons[name].replace() → <svg>
```

Proposed flow with validation:

```
Icon.astro → validate name against union → lookup in typed map → render
```

Error handling: Runtime `"Unknown icon: ${name}"` for bad icon names.

---

## Part 6: Questions I Cannot Answer

1. **Does sqlc/templ/protobuf actually have downloadable brand assets in SVG?**
   - Requires manual check of each repo
   - Brand guidelines may restrict usage

2. **Should we use lucide-astro or keep inline?**
   - Trade-off: dependency vs. maintenance
   - Decision needed before Tier 2 tasks

3. **Is the Icon.astro unused-prop issue actually resolved?**
   - Need to verify runtime behavior with bad icon names

---

## Next Step: Execute Tier 1

**Do now:**

1. Research sqlc/templ/protobuf logos
2. Fix hardcoded '11'
3. Type the icons record
4. Update TODO_LIST.md status

**Then ask user:** Icon library decision (lucide vs inline)?
