// Builds the Filament plugin assets into resources/dist/:
//   - hebrew-date-picker.js   (bundled ESM Alpine component, core inlined)
//   - hebrew-date-picker.css  (base picker styles + the Filament theme)
//
// The Alpine component imports the core as `hebrew-datepicker`. This build
// resolves that import in this order, so the plugin is self-contained however
// it's used:
//   1. node_modules/hebrew-datepicker   → the published npm package (CI / release)
//   2. ../hebrew-datepicker/src         → the sibling source (local monorepo dev)
//   3. resources/picker/*               → the vendored built copy (last resort)
// Whichever is chosen, the core is BUNDLED into resources/dist, so the shipped
// asset has no runtime dependency on npm or the sibling folder.
import { build } from 'esbuild';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const dist = resolve(root, 'resources/dist');
mkdirSync(dist, { recursive: true });

const PKG = '@simplix-systems/hebrew-date-picker';
const npmPkg = resolve(root, 'node_modules', PKG);
const siblingCore = resolve(root, '../hebrew-datepicker/src/core/index.ts');
const siblingCss = resolve(root, '../hebrew-datepicker/src/styles/hebrew-datepicker.css');

let source, alias, baseCssPath;
if (existsSync(npmPkg)) {
  source = `npm package (node_modules/${PKG})`;
  alias = undefined; // esbuild resolves the bare import from node_modules
  baseCssPath = resolve(npmPkg, 'dist/hebrew-datepicker.css');
} else if (existsSync(siblingCore)) {
  source = 'sibling source (../hebrew-datepicker/src)';
  alias = { [PKG]: siblingCore };
  baseCssPath = siblingCss;
} else {
  source = 'vendored build (resources/picker)';
  alias = { [PKG]: resolve(root, 'resources/picker/core.js') };
  baseCssPath = resolve(root, 'resources/picker/hebrew-datepicker.css');
}
console.log('· core from:', source);

// 1) Bundle the Alpine component (ESM, core inlined).
await build({
  entryPoints: [resolve(root, 'resources/js/hebrew-date-picker.js')],
  outfile: resolve(dist, 'hebrew-date-picker.js'),
  bundle: true,
  format: 'esm',
  minify: true,
  sourcemap: false,
  target: ['es2019'],
  ...(alias ? { alias } : {}),
});

// 2) Combine the base stylesheet with the Filament theme.
const themeCssPath = resolve(root, 'resources/css/theme.css');
const css =
  '/* hebrew-datepicker base */\n' + readFileSync(baseCssPath, 'utf8') +
  '\n\n/* Filament theme */\n' + readFileSync(themeCssPath, 'utf8');
writeFileSync(resolve(dist, 'hebrew-date-picker.css'), css);

console.log('✓ built resources/dist/hebrew-date-picker.{js,css}');
