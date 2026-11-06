// Static export writes prefetch data as  route/__next.route/__PAGE__.txt
// but the client requests                  route/__next.route.__PAGE__.txt
// Copy each nested file to its flat name so link prefetching works on static hosts like GitHub Pages.
// Usage: node scripts/flatten-segments.mjs [outDir]
import { copyFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const root = process.argv[2] ?? "out";
let copied = 0;

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (!statSync(full).isDirectory()) continue;
    if (name.startsWith("__next.")) flatten(dir, full, name);
    else walk(full);
  }
}

// Copy every file under segDir to <parent>/<seg>.<sub>.<path>.txt
function flatten(parent, dir, prefix) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) flatten(parent, full, `${prefix}.${name}`);
    else {
      copyFileSync(full, join(parent, `${prefix}.${name}`));
      copied++;
    }
  }
}

walk(root);
console.log(`flatten-segments: wrote ${copied} prefetch files`);
