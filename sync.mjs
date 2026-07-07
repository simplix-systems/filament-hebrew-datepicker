// Refreshes the vendored picker (resources/picker/) from the sibling
// `hebrew-datepicker` package's built output. Run this after rebuilding the
// core (`pnpm build` in ../hebrew-datepicker). It is also chained before the
// asset build, so `npm run build` always picks up the latest core.
//
// In a standalone copy of this plugin (no sibling package) it simply warns and
// leaves the already-vendored files in place — so the build still works.
import { copyFileSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const src = resolve(root, '../hebrew-datepicker/dist');
const dst = resolve(root, 'resources/picker');
mkdirSync(dst, { recursive: true });

const pairs = [
  ['core/index.js', 'core.js'],
  ['hebrew-datepicker.css', 'hebrew-datepicker.css'],
];

let copied = 0;
for (const [from, to] of pairs) {
  const f = resolve(src, from);
  if (existsSync(f)) {
    copyFileSync(f, resolve(dst, to));
    copied++;
    console.log('✓ synced', to);
  } else {
    console.warn('· skip (not found):', f);
  }
}
if (!copied) {
  console.warn('Nothing synced — build the hebrew-datepicker package first (pnpm build).');
  console.warn('Using the already-vendored resources/picker/* files.');
}
