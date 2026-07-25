#!/usr/bin/env python3
"""Check internal markdown links (relative paths, not URLs) across the repo.

Exits 1 if any broken links are found. Ignores:
- External URLs (http, https, mailto, ftp)
- Anchor-only links (#section)
- GitHub generated URLs in README badges

Usage: scripts/check-markdown-links.py
"""

from __future__ import annotations

import os
import re
import sys
from pathlib import Path

# Match [text](url) — captures the URL part
LINK_RE = re.compile(r"\[(?:[^\]]+)\]\(([^)]+)\)")

# File extensions to check
MARKDOWN_EXTS = {".md", ".mdx"}

# Directories to skip
SKIP_DIRS = {
    "node_modules",
    "dist",
    ".git",
    "vendor",
    "__pycache__",
}


def should_skip(path: Path, root: Path) -> bool:
    """Check if a path is in a skip directory."""
    try:
        rel = path.relative_to(root)
    except ValueError:
        return True
    return any(part in SKIP_DIRS for part in rel.parts)


def strip_code_blocks(content: str) -> str:
    """Remove fenced code blocks and inline code from markdown content."""
    # Remove fenced code blocks (```...``` or ~~~...~~~)
    content = re.sub(r"```[\s\S]*?```", "", content)
    content = re.sub(r"~~~[\s\S]*?~~~", "", content)
    # Remove inline code (`...`) — but not links inside code
    content = re.sub(r"`[^`]+`", "", content)
    return content


def check_links(root: Path) -> tuple[int, int]:
    """Check all markdown files. Returns (total_checked, broken_count)."""
    broken: list[str] = []
    total = 0

    for dirpath, dirnames, filenames in os.walk(root):
        # Prune skip directories
        dirnames[:] = [d for d in dirnames if d not in SKIP_DIRS]

        for fname in filenames:
            ext = Path(fname).suffix
            if ext not in MARKDOWN_EXTS:
                continue

            filepath = Path(dirpath) / fname
            content = filepath.read_text(encoding="utf-8", errors="replace")
            content = strip_code_blocks(content)
            file_dir = filepath.parent

            for match in LINK_RE.finditer(content):
                link = match.group(1).strip()

                # Strip title part: [text](url "title")
                link = link.split('"')[0].strip()

                # Skip external URLs, anchors, and empty links
                if (
                    not link
                    or link.startswith("#")
                    or link.startswith("http://")
                    or link.startswith("https://")
                    or link.startswith("mailto:")
                    or link.startswith("ftp://")
                ):
                    continue

                # Skip absolute paths (website URL paths like /guides/foo/)
                # These are handled by Astro at build time, not file-system links
                if link.startswith("/") and not link.startswith("//"):
                    continue

                total += 1

                # Strip anchor fragment
                path_part = link.split("#")[0]
                if not path_part:
                    continue

                # Resolve relative to the markdown file
                target = (file_dir / path_part).resolve()

                if not target.exists():
                    rel_file = filepath.relative_to(root)
                    broken.append(f"BROKEN: {rel_file} -> {link} (resolved: {target})")

    for msg in broken:
        print(msg)

    print(f"\nChecked {total} internal links, {len(broken)} broken")
    return total, len(broken)


def main() -> int:
    root = Path(__file__).resolve().parent.parent
    _, broken = check_links(root)
    return 1 if broken > 0 else 0


if __name__ == "__main__":
    sys.exit(main())
