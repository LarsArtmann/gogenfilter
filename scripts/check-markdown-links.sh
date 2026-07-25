#!/usr/bin/env bash
# Checks internal markdown links (relative paths, not URLs) across the repo.
# Exits 1 if any broken links are found.
#
# Usage: scripts/check-markdown-links.sh
set -euo pipefail

cd "$(git rev-parse --show-toplevel)"

# Regex for markdown links: [text](path) where path is not http/mailto
# Captures relative paths starting with . or /, or paths without a scheme
LINK_RE='\[([^\]]+)\]\(([^)]+)\)'

broken=0
total=0

# Find all markdown files
while IFS= read -r file; do
    dir=$(dirname "$file")

    # Extract all links, filter to internal (non-URL) links
    while IFS= read -r link; do
        # Skip empty, URL, email, and anchor-only links
        case "$link" in
            ""|"#"*|"http://"*"|"https://"*"|"mailto:"*) continue ;;
        esac

        total=$((total + 1))

        # Strip anchor fragment
        path="${link%%#*}"

        # Skip if empty after stripping anchor
        [ -z "$path" ] && continue

        # Resolve relative to the markdown file's directory
        target="$dir/$path"

        if [ ! -e "$target" ]; then
            echo "BROKEN: $file -> $link (resolved: $target)"
            broken=$((broken + 1))
        fi
    done < <(
        grep -ohP "$LINK_RE" "$file" 2>/dev/null \
            | sed -n 's/.*(\([^)]*\)).*/\1/p' \
            || true
    )
done < <(find . -name '*.md' -not -path './website/node_modules/*' -not -path './website/dist/*' -not -path './.git/*')

echo ""
echo "Checked $total internal links, $broken broken"

if [ "$broken" -gt 0 ]; then
    exit 1
fi
