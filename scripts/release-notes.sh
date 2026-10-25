#!/usr/bin/env bash
# Extract one version section from CHANGELOG.md (Keep a Changelog 1.1.0 format).
#
# Usage: release-notes.sh <tag>            e.g. release-notes.sh v3.6.2
#        release-notes.sh <tag> --require  exit 1 if the section is missing
#                                          or empty (release pipeline uses this).
#
# Prints the section body (everything between the `## [<tag>]` header and the
# next `## ` header) without the header line itself. Refuses `[Unreleased]`
# content leaking in: an empty or missing section is an error under --require.
set -euo pipefail

usage() {
	echo "usage: $0 <tag> [--require]" >&2
	exit 2
}
[ $# -ge 1 ] && [ $# -le 2 ] || usage
tag="$1"
require=0
[ "${2:-}" = "--require" ] && require=1

changelog="${CHANGELOG:-CHANGELOG.md}"
[ -f "$changelog" ] || {
	echo "error: $changelog not found" >&2
	exit 2
}

awk -v tag="$tag" '
  $0 ~ ("^## \\[" tag "\\]") { found = 1; next }
  found && /^## /            { exit }
  found                      { print }
' "$changelog" >/tmp/gogenfilter-release-notes.$$ || true

body=$(sed -e '/^[[:space:]]*$/d' "/tmp/gogenfilter-release-notes.$$")
rm -f "/tmp/gogenfilter-release-notes.$$"

if [ -z "$body" ]; then
	if [ "$require" -eq 1 ]; then
		echo "error: no CHANGELOG section for [$tag] (or it is empty)." >&2
		echo "Move [Unreleased] entries into '## [$tag] — YYYY-MM-DD' in CHANGELOG.md (and changelog.mdx) first." >&2
		exit 1
	fi
	exit 0
fi

printf '%s\n' "$body"
