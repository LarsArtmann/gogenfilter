#!/usr/bin/env bash
set -euo pipefail

WORKDIR=$(mktemp -d)
trap 'rm -rf "$WORKDIR"' EXIT

find src -name "*.astro" | while read -r f; do
  dir=$(dirname "$f")
  base=$(basename "$f" .astro)
  mkdir -p "$WORKDIR/$dir"
  cp "$f" "$WORKDIR/$dir/${base}.html"
done

find src \( -name "*.ts" -o -name "*.css" \) | while read -r f; do
  dir=$(dirname "$f")
  base=$(basename "$f")
  mkdir -p "$WORKDIR/$dir"
  cp "$f" "$WORKDIR/$dir/$base"
done

npx jscpd "$WORKDIR/src/" \
  --min-lines 3 \
  --min-tokens 40 \
  --reporters consoleFull \
  --ignore "**/node_modules/**,**/dist/**,**/.astro/**" \
  --absolute \
  "$@" \
  2>&1 | sed "s|$(echo "$WORKDIR/src/" | sed 's/[\/&]/\\&/g')|src/|g; s|\.html|.astro|g"
