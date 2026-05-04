# SQLC Config Parsing: gogenfilter vs sqlc

**Date:** 2026-05-04

Comparison of gogenfilter's sqlc config parsing (`sqlc.go`) against sqlc's own config parsing (`github.com/sqlc-dev/sqlc/internal/config`). Documents intentional divergences and won't-fix tradeoffs.

## Why Not Use sqlc's Parser Directly?

sqlc's config types live in `internal/config` and `internal/codegen/golang/opts`. Go's module system **forbids external imports** of `internal/` packages. The minimal struct reimplementation in gogenfilter is the correct approach — it just needs to cover the full output dir surface.

## Known Potential Issues (Won't Fix)

### 1. YAML Library Divergence: `go-faster/yaml` vs `gopkg.in/yaml.v3`

sqlc uses `gopkg.in/yaml.v3` to parse `sqlc.{yaml,yml}`. gogenfilter uses `github.com/go-faster/yaml`. This is an intentional choice per the library policy (`/home/lars/projects/library-policy/library-policy.yaml`):

- **`gopkg.in/yaml.v2`** — Banned (critical severity). Repository archived April 1, 2025. Known CVE-2020-14343. `go-faster/yaml` is the mandated replacement.
- **`gopkg.in/yaml.v3`** — Banned (critical severity). Aging library with known CVEs. `go-faster/yaml` is the mandated replacement.
- **`go-yaml/yaml`** (the upstream of both v2/v3) — Banned (critical severity). Repository archived April 1, 2025. `go-faster/yaml` is the mandated replacement.
- **`github.com/go-faster/yaml`** — Recommended. 2-3x faster than `yaml.v3`, actively maintained, better memory efficiency.

**Potential risks of this divergence:**

| Risk | Severity | Detail |
|------|----------|--------|
| Behavioral edge cases | **Low** | Both libraries implement YAML 1.2 spec. For the simple key-value structures in `sqlc.yaml`, behavioral differences are extremely unlikely. |
| `yaml.Node` incompatibility | **None** | gogenfilter never uses `yaml.Node` — only flat struct unmarshaling. sqlc uses `yaml.Node` for plugin `options` fields which we don't need. |
| `KnownFields(true)` difference | **Low** | `go-faster/yaml` supports `KnownFields(true)` identically to `yaml.v3`. If we add strict parsing, this is a non-issue. |
| Custom `UnmarshalYAML` methods | **None** | sqlc defines custom `UnmarshalYAML` on `Paths` and `AnalyzerDatabase` types. gogenfilter's structs don't use these types, so this doesn't apply. |
| Future spec drift | **Low** | `go-faster/yaml` is a fork of `go-yaml/yaml` v3 with performance patches. Core YAML parsing logic is identical. |

**Mitigation:** The test suite uses `fstest.MapFS` with realistic sqlc configs covering both v1 and v2 formats. Any parsing divergence would be caught by tests.

### 2. No `KnownFields(true)` — Silent Ignorance of Typos

sqlc uses `dec.KnownFields(true)` in both `v1ParseConfig` and `v2ParseConfig`. This causes an error if the YAML contains unknown fields (e.g., a typo like `engien` instead of `engine`). gogenfilter does not use this.

**Impact:** A malformed `sqlc.yaml` with a typo in a critical field (e.g., `out:` misspelled) would silently parse with zero output dirs instead of returning an error. The filter would fail to detect generated files in that project.

**Why won't fix:** The typo would also break sqlc itself, so the user would discover it during code generation, not during filtering. Adding strict parsing would create a maintenance burden to keep our structs in sync with every sqlc config field addition.

### 3. No Environment Variable Substitution

sqlc calls `config.addEnvVars()` after parsing, which reads `SQLC_AUTH_TOKEN` from the environment. While this doesn't affect output dir detection, sqlc also supports `envsubst`-style variable substitution in config values via its cloud integration.

**Why won't fix:** Output dir paths in `sqlc.yaml` are not environment-variable-substituted by sqlc either. The `addEnvVars` function only handles `SQLC_AUTH_TOKEN` for cloud auth. No output dirs are affected.

### 4. Config Discovery Stops at Dot-directories and `vendor`

gogenfilter skips hidden directories (`.*`), `node_modules`, and `vendor` during config discovery (`shouldSkipDirectory`). sqlc itself doesn't have this constraint — it reads the config from the working directory or explicit path.

**Impact:** If a project stores its `sqlc.yaml` inside a hidden directory (e.g., `.sqlc/sqlc.yaml`), gogenfilter won't discover it.

**Why won't fix:** Skipping hidden directories is standard practice for file walkers. Projects using non-standard config locations can pass explicit paths.

### 5. Dual Config File Tolerance

`recordSQLCConfig` records any file named `sqlc.yaml` or `sqlc.yml` found during the walk. If both exist in the same directory, both are recorded and both are parsed. sqlc itself would error on ambiguous config.

**Impact:** gogenfilter would merge output dirs from both, which is overly permissive (more files filtered) rather than overly restrictive.

**Why won't fix:** Having both `sqlc.yaml` and `sqlc.yml` in the same directory is a user error that sqlc itself rejects. Over-filtering is safer than under-filtering.

### 6. No `sqlc_tools.yaml` Support

sqlc also supports `sqlc.tools.yaml` as a config file for procedural code generation. gogenfilter only looks for `sqlc.yaml` and `sqlc.yml`.

**Why won't fix:** `sqlc_tools.yaml` is for tool-level configuration, not for Go code generation output dirs. The output paths are still defined in the main `sqlc.yaml`.

## Struct Comparison

### gogenfilter (`sqlc.go`)

```go
type sqlcConfig struct {
    Version string       `yaml:"version"`
    SQL     []sqlcEngine `yaml:"sql"`
}
type sqlcEngine struct {
    Schema string        `yaml:"schema"`
    Engine string        `yaml:"engine"`
    Gen    sqlcGenConfig `yaml:"gen"`
}
type sqlcGenConfig struct {
    Go sqlcGoConfig `yaml:"go"`
}
type sqlcGoConfig struct {
    Package string `yaml:"package"`
    Out     string `yaml:"out"`
}
```

### sqlc (`internal/config/config.go`)

```go
type Config struct {
    Version string               `yaml:"version"`
    Cloud   Cloud                `yaml:"cloud"`
    Servers []Server             `yaml:"servers"`
    SQL     []SQL                `yaml:"sql"`
    // ... Overrides, Plugins, Rules, Options
}
type SQL struct {
    Engine  Engine    `yaml:"engine"`
    Schema  Paths     `yaml:"schema"`
    Queries Paths     `yaml:"queries"`
    Gen     SQLGen    `yaml:"gen"`
    Codegen []Codegen `yaml:"codegen"`    // ← plugin-based output
    // ... Analyzer, Rules, etc.
}
type SQLGen struct {
    Go   *golang.Options `yaml:"go"`
    JSON *SQLJSON        `yaml:"json"`     // ← JSON output
}
type Codegen struct {
    Out     string    `yaml:"out"`        // ← plugin output dir
    Plugin  string    `yaml:"plugin"`
    Options yaml.Node `yaml:"options"`
}
type SQLJSON struct {
    Out      string `yaml:"out"`          // ← JSON output dir
    // ... Indent, Filename
}
```

## Source References

- gogenfilter: `sqlc.go` — `sqlcConfig`, `extractOutputDirs`, `parseSQLCConfig`
- sqlc config types: `github.com/sqlc-dev/sqlc/internal/config/config.go` — `Config`, `SQL`, `SQLGen`, `Codegen`, `SQLJSON`
- sqlc v1 parsing: `github.com/sqlc-dev/sqlc/internal/config/v_one.go` — `V1GenerateSettings`, `v1PackageSettings.Path`, `Translate()`
- sqlc v2 parsing: `github.com/sqlc-dev/sqlc/internal/config/v_two.go` — `v2ParseConfig`
- sqlc version dispatch: `github.com/sqlc-dev/sqlc/internal/config/config.go` — `ParseConfig`
- sqlc env vars: `github.com/sqlc-dev/sqlc/internal/config/env.go` — `addEnvVars`
- Library policy: `/home/lars/projects/library-policy/library-policy.yaml` — `goyaml_v2`, `goyaml_v3`, `go_yaml` entries
