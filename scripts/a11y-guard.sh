#!/usr/bin/env bash
# a11y-guard.sh — in-repo gate for the three template-family a11y violation
# classes (canonical copy lives in vision-review-agent/scripts/
# family-a11y-guard.sh; sync, do not diverge — ADR 0001):
#   a) empty <th ...></th> / <th ... /> (axe empty-table-header)
#   b) scrollable pre/code without tabindex="0" (scrollable-region-focusable)
#   c) text-on-accent class without the --color-on-accent token (renders wrong)
#      bg-accent without the token is INFO only (convergence backlog).
# Exit 1 on FAIL findings; INFO does not fail.
set -u
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SRC="$ROOT/website/src"
if [ ! -d "$SRC" ]; then
	echo "a11y-guard: no website/src under $ROOT" >&2
	exit 2
fi

has_token=0
grep -q -- '--color-on-accent' "$SRC/styles/global.css" 2>/dev/null && has_token=1
fail=0
while IFS= read -r hit; do
	[ -z "$hit" ] && continue
	echo "FAIL $hit"
	fail=$((fail + 1))
done <<EOF
$(grep -rnE '<th[^>]*>\s*</th>|<th[^>]*/>' "$SRC" --include='*.astro' |
	sed "s|^$SRC/||; s|^|a) empty th: |")
$(grep -rnE '<(pre|code)[^>]*overflow-[xy]-auto' "$SRC" --include='*.astro' |
		grep -v 'tabindex="0"' |
		sed "s|^$SRC/||; s|^|b) scrollable w/o tabindex: |")
$(if [ "$has_token" = 0 ]; then
		grep -rln 'text-on-accent' "$SRC" --include='*.astro' |
			sed "s|^$SRC/||; s|^|c) text-on-accent class, token undefined: |"
	fi)
EOF
info=0
while IFS= read -r hit; do
	[ -z "$hit" ] && continue
	echo "INFO $hit"
	info=$((info + 1))
done <<EOF
$(if [ "$has_token" = 0 ]; then
	grep -rlnE 'bg-accent[^/]' "$SRC" --include='*.astro' |
		sed "s|^$SRC/||; s|^|c-info) bg-accent CTA, no token scheme: |"
fi)
EOF
echo "a11y-guard: $fail FAIL finding(s), $info info"
[ "$fail" = 0 ]
