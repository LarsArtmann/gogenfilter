import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const DIST = "dist";

const STYLE_HASH_RE = / style-src 'self' 'unsafe-inline'(?: 'sha256-[^']+')+/g;

async function findHtmlFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await findHtmlFiles(full)));
    } else if (entry.name.endsWith(".html")) {
      files.push(full);
    }
  }
  return files;
}

async function main() {
  const files = await findHtmlFiles(DIST);
  let patched = 0;

  for (const file of files) {
    const html = await readFile(file, "utf-8");
    const fixed = html.replace(STYLE_HASH_RE, " style-src 'self' 'unsafe-inline'");
    if (fixed !== html) {
      await writeFile(file, fixed);
      patched++;
    }
  }

  console.log(`CSP fix: patched ${patched}/${files.length} HTML files (stripped style hashes)`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
