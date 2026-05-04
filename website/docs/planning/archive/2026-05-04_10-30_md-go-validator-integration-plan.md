# md-go-validator Integration Plan

**Date:** 2026-05-04  
**Analyzing:** `github.com/larsartmann/md-go-validator` → `gogenfilter/website` integration

---

## 1. What Did I Forget / What Could Be Better

### Reflections on Current State

**Project Understanding:**

- **md-go-validator**: A mature Go CLI tool + library that validates code blocks in Markdown/MDX files
  - Supports Go, TypeScript, Rust, Nix, HCL/Terraform, Templ
  - Uses pure Go with gotreesitter (no CGO)
  - CI-friendly with multiple output formats (JSON, YAML, CSV, table, quiet)
  - Has skip directives for intentionally incomplete code
  - Parallel processing for directories

- **gogenfilter-website**: Astro + Starlight documentation site
  - Has MDX documentation at `src/content/docs/docs/` (9 files)
  - Uses Nix flake for build/dev environment
  - Has CI with build-website job
  - Well-structured with centralized data layer

### What Could Be Better

1. **Type Models**: The md-go-validator has excellent type models in `pkg/types/`:
   - `CodeBlock`, `Result`, `Status`, `Report`
   - Could learn from this architecture for future data models

2. **Architecture Patterns**:
   - md-go-validator uses pluggable validators via Registry pattern
   - Clean separation of extractor → registry → validators
   - Could apply similar patterns to website data layer

3. **Testing Approach**:
   - md-go-validator has comprehensive tests with race detection
   - Coverage thresholds enforced in CI
   - Could add similar rigor to website testing

4. **Output Formatting**:
   - md-go-validator uses github.com/larsartmann/go-output library
   - Already integrated as replace directive
   - Consistent output formatting across tools

---

## 2. Comprehensive Multi-Step Execution Plan

### Integration Strategy: Three-Layer Approach

#### Layer 1: CI Integration (HIGHEST IMPACT/LOWEST EFFORT)

**Goal:** Validate all MDX code blocks in documentation during CI

**Steps:**

1. Add `go install github.com/larsartmann/md-go-validator@latest` to build-website job
2. Add `md-go-validator -f json src/content/docs/docs/` step
3. Configure to fail build on validation errors

**Impact:** Prevents broken code examples from being deployed  
**Effort:** ~15 minutes  
**Risk:** Low - additive only

---

#### Layer 2: Development Environment (MEDIUM IMPACT/MEDIUM EFFORT)

**Goal:** Allow local validation of documentation code blocks

**Steps:**

1. Add md-go-validator to flake.nix as a package input
2. Create `nix run .#validate-docs` app
3. Add npm script `validate:docs` that calls the tool

**Impact:** Developers can validate docs locally before pushing  
**Effort:** ~30 minutes  
**Risk:** Low - no breaking changes

---

#### Layer 3: Documentation & Discovery (MEDIUM IMPACT/LOW EFFORT)

**Goal:** Document md-go-validator as a complementary tool

**Steps:**

1. Create `src/content/docs/docs/related-tools.mdx` page
2. Add md-go-validator to "Related Tools" or "Ecosystem" section on landing
3. Cross-link between gogenfilter and md-go-validator documentation

**Impact:** Users discover both tools, establishes toolchain coherence  
**Effort:** ~45 minutes  
**Risk:** None - purely additive

---

## 3. Pareto Analysis (Sorted by Impact/Effort Ratio)

| Priority | Task                          | Impact                       | Effort | Ratio      |
| -------- | ----------------------------- | ---------------------------- | ------ | ---------- |
| 1        | Add md-go-validator CI step   | Prevents broken code in prod | 15min  | **HIGH**   |
| 2        | Create related-tools.mdx docs | User discovery + SEO         | 20min  | **HIGH**   |
| 3        | Add to flake.nix              | Local dev experience         | 30min  | **MEDIUM** |
| 4        | Add to landing page section   | Cross-promotion              | 25min  | **MEDIUM** |

**Decision:** Focus on #1 (CI integration) as it provides immediate value with minimal effort and no breaking changes.

---

## 4. Existing Code That Fits Requirements

### From md-go-validator:

- **Type patterns**: `pkg/types/*.go` - excellent examples of domain modeling
- **Registry pattern**: `pkg/languages/` - pluggable architecture
- **Skip directives**: Already supports `<!-- skip-validate -->` comments
- **Output formatting**: JSON output perfect for CI integration

### From website:

- **CI pattern**: Already have `build-website` job - just add step
- **Nix pattern**: `flake.nix` already has dev/build apps - add validate app
- **Documentation pattern**: `src/content/docs/docs/*.mdx` follows Starlight conventions
- **Data layer**: `src/data/*.ts` centralized data - extend for tools

---

## 5. Architecture Improvements While Getting Work Done

### Type Model Inspiration from md-go-validator

Current website types in `src/data/types.ts` are minimal. Could enhance with:

```typescript
// Inspired by md-go-validator's structured approach
interface Tool {
  id: string;
  name: string;
  description: string;
  languages: Language[];
  installCommand: string;
  githubUrl: string;
  status: "stable" | "beta" | "experimental";
}

interface ValidationResult {
  file: string;
  status: "valid" | "error" | "skipped";
  line?: number;
  message?: string;
}
```

But for this integration, keep it simple: add md-go-validator as first entry in a `tools` or `relatedTools` data file.

### Established Libraries That Help

From md-go-validator:

1. **gotreesitter** - Pure Go tree-sitter (if parsing MDX content in Go)
2. **go-output** - Structured output (already used in md-go-validator)

For website:

1. **html-validate** - Already using for HTML validation
2. **astro-check** - Already using for Type checking

---

## 6. Concrete Implementation Steps

### Step 1: CI Integration (IMMEDIATE - HIGHEST VALUE)

Modify `.github/workflows/ci.yml` in gogenfilter repo (parent directory):

```yaml
build-website:
  # ... existing steps ...
  - run: npm run build

  # NEW: Validate documentation code blocks
  - name: Install md-go-validator
    run: go install github.com/larsartmann/md-go-validator@latest

  - name: Validate documentation code blocks
    working-directory: website
    run: md-go-validator -f json -o validation-results.json src/content/docs/docs/

  - name: Upload validation results
    if: always()
    uses: actions/upload-artifact@v4
    with:
      name: doc-validation-results
      path: website/validation-results.json

  - name: HTML Validation
    # ... existing ...
```

### Step 2: Documentation Page

Create `src/content/docs/docs/related-tools.mdx`:

- Document md-go-validator as complementary tool
- Show example: using both gogenfilter + md-go-validator in CI
- Explain synergy: gogenfilter filters generated files, md-go-validator validates docs

### Step 3: Flake.nix Enhancement

Add to website/flake.nix:

```nix
# In inputs, add md-go-validator as flake input
md-go-validator.url = "github:larsartmann/md-go-validator";

# In apps, add:
validate-docs = {
  type = "app";
  program = "${pkgs.writeShellScriptBin "validate-docs" ''
    ${inputs.md-go-validator.packages.${system}.default}/bin/md-go-validator -f table src/content/docs/docs/
  ''}/bin/validate-docs";
};
```

---

## 7. Risk Assessment

| Risk                              | Mitigation                                     |
| --------------------------------- | ---------------------------------------------- |
| CI step fails due to invalid code | Fix code before merging; step runs after build |
| Flake input breaks                | Pin to specific version/commit                 |
| Documentation goes stale          | Add CI badge showing latest version            |
| Scope creep                       | Keep first PR focused on CI integration only   |

---

## Decision: Execute Layer 1 First (CI Integration)

**Rationale:**

1. Immediate value: Prevents broken code examples
2. Zero breaking changes: Additive only
3. Foundation for Layers 2-3: Once CI works, local dev and docs follow
4. Production ready: Uses released version (@latest)

---

Next action: Read current CI file, implement Layer 1.
