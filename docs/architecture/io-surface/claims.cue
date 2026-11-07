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
