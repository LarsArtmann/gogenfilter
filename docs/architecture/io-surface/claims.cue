// claims.cue — human judgment. Tooling never overwrites this file.
//
// Both files contribute to the same `sites` value (CUE unification), so an entry
// here only needs the claim fields:
//
//	sites: "internal/server.AllowlistManager.Save": claims: {
//		resource:   "temp_allowlist_path JSON"
//		trigger:    "every grant/revoke/expiry sweep/shutdown"
//		discipline: ["atomic-write"]
//		rationale:  "why this posture is right, in prose"
//	}
//
// A decided exception is data, not a comment:
//
//	sites: "internal/dns.timedCacheWrite": claims: {
//		exception: "no-fsync"
//		rationale: "the cache is re-fetched unconditionally after a crash, so a torn file is never parsed"
//	}
package io_surface

// v1.2 claims port (io-surface superb plan T20, 2026-11-07). All five sites
// are the build-time docs generator: nothing here runs in production, so
// criticality stays normal everywhere. The four reads feed section
// replacement in generated MDX/Go docs; the single write commits the
// regenerated files. Proposed by the io-surface session — owner reviews
// before treating these as decided posture.

sites: "cmd/gendocs.generateReadme": claims: {
	resource:   "README.md (template input)"
	trigger:    "go generate (docs build)"
	discipline: []
	rationale:  "codegen input read; a missing file is a loud generator error, not a runtime risk"
}

sites: "cmd/gendocs.generateGeneratorsMDX": claims: {
	resource:   "generators.mdx (template input)"
	trigger:    "go generate (docs build)"
	discipline: []
	rationale:  "same generator-input class as generateReadme"
}

sites: "cmd/gendocs.generateDetectionMDX": claims: {
	resource:   "detection.mdx (template input)"
	trigger:    "go generate (docs build)"
	discipline: []
	rationale:  "same generator-input class as generateReadme"
}

sites: "cmd/gendocs.generateDocGo": claims: {
	resource:   "doc.go (template input)"
	trigger:    "go generate (docs build)"
	discipline: []
	rationale:  "same generator-input class as generateReadme"
}

sites: "cmd/gendocs.writeFile": claims: {
	resource:   "generated docs output (README/MDX/doc.go)"
	trigger:    "go generate (docs build)"
	discipline: []
	rationale:  "output is fully re-derivable by re-running go generate, so a torn write self-heals; durability left default pending owner call on atomic-write adoption"
}
