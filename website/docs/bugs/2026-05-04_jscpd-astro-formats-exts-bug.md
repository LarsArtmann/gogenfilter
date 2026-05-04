# Bug Report: jscpd `formats-exts` does not detect `.astro` files

**Date:** 2026-05-04
**Tool:** jscpd v4.0.9
**Reporter:** Lars Artmann (via Crush agent)
**Status:** Unreported upstream

---

## Bug Description

The `formats-exts` configuration option in jscpd v4.0.9 does not properly detect `.astro` files, even when explicitly specified. Astro files (`.astro`) contain a frontmatter block (`---...---`) followed by HTML/JSX-like template syntax. These files are not recognized as valid source files by jscpd's built-in detectors.

### Expected Behavior

Running `jscpd "src/**/*.astro"` should detect and analyze Astro files for code duplication.

### Actual Behavior

jscpd ignores `.astro` files entirely, even when passed directly as paths:

```
$ npx jscpd "src/**/*.astro" --reporters console
Clones: 0
```

No clones are detected because jscpd does not recognize `.astro` as a valid format.

### Workaround in Use

The project uses a shell script (`scripts/dedup.sh`) that copies `.astro` files to temporary `.html` files (preserving directory structure) before running jscpd. jscpd has built-in HTML detection, so it successfully analyzes the copied files:

```bash
find src -name "*.astro" | while read -r f; do
  dir=$(dirname "$f")
  base=$(basename "$f" .astro)
  mkdir -p "$WORKDIR/$dir"
  cp "$f" "$WORKDIR/$dir/${base}.html"
done
npx jscpd "$WORKDIR/src/" ...
```

### Root Cause

jscpd's `formats-exts` configuration uses a set of known file extensions per format. The Astro format is not in jscpd's default list. Even when trying to configure `formats-exts` manually:

```json
{
  "formats-exts": {
    "astro": "astro"
  }
}
```

This does not work because jscpd's internal format detection requires the format name (e.g., `html`, `typescript`) to be a known format, not a custom one.

### Proposed Fix

Option A: Add Astro to jscpd's recognized formats natively (requires upstream change).

Option B: Improve `formats-exts` to accept custom file extensions and parse them with a configurable base format (e.g., treat `.astro` as HTML).

Option C: Add a `--language` / `--format` override that forces files with specific extensions to be parsed as a given language (e.g., `--ext-lang astro=html`).

---

## Impact

- **Severity:** Low (workaround exists)
- **User Impact:** Users cannot run jscpd directly on Astro projects; must use a copy-to-html wrapper script.
- **Detection Gap:** Code duplication in Astro components cannot be detected without the workaround.

## Environment

```
node: v22.x
npm: 10.x
jscpd: 4.0.9
astro: 6.2.1
@astrojs/starlight: 0.38.4
```
