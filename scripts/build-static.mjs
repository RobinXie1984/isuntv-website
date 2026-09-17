import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { join } from 'node:path';
import { build as bundle } from 'esbuild';

const registry = JSON.parse(readFileSync('lib/authorization-registry.json', 'utf8'));
if (registry.published || registry.records.length || registry.publicKeyPem) {
  throw new Error('Static release requires an unpublished empty registry. Enable a signed, current verification service before publishing records.');
}
const build = spawnSync('node_modules/.bin/vinext', ['build', '--prerender-concurrency', '2'], {
  stdio: 'inherit', env: { ...process.env, ISUN_STATIC_EXPORT: '1' },
});
if (build.status !== 0) process.exit(build.status ?? 1);

// Metadata route handlers are server endpoints in Vinext; emit their equivalent
// static files from the same source of truth after the HTML export.
const metadata = await bundle({
  entryPoints: ['scripts/export-static-metadata.ts'], bundle: true,
  platform: 'node', format: 'esm', write: false,
  define: { 'process.env.ISUN_STATIC_EXPORT': '"1"' },
  plugins: [{ name: 'metadata-only-navigation', setup(builder) {
    builder.onResolve({ filter: /^next\/navigation$/ }, () => ({ path: 'navigation', namespace: 'metadata' }));
    builder.onLoad({ filter: /.*/, namespace: 'metadata' }, () => ({ contents: 'export function notFound() { throw new Error("Invalid metadata reference"); }', loader: 'js' }));
  } }],
});
const metadataRun = spawnSync(process.execPath, ['--input-type=module'], {
  input: metadata.outputFiles[0].text, encoding: 'utf8', stdio: ['pipe', 'inherit', 'inherit'],
});
if (metadataRun.status !== 0) throw new Error('Static metadata generation failed');

const root = 'dist/client';
const profile=JSON.parse(readFileSync('lib/generated/site.json','utf8'));
const locales = ['', ...['zh-Hant','zh-Hans','en','fr','es','ja','hi','he'].filter(l=>l!==profile.defaultLocale)];
for (const locale of locales) {
  for (const route of ['', 'about', 'global', 'interviews', 'chairman', 'robin', 'licensing', 'verify', 'contact', 'privacy', 'programmes', 'search']) {
    const file = join(root, locale, route, 'index.html');
    if (!existsSync(file)) throw new Error(`Missing static route: ${file}`);
  }
}
for (const file of ['404.html', 'robots.txt', 'sitemap.xml', 'llms.txt']) {
  if (!existsSync(join(root, file))) throw new Error(`Missing public file: ${file}`);
}
let htmlCount = 0;
let bytes = 0;
function inspect(folder) {
  for (const item of readdirSync(folder, { withFileTypes: true })) {
    const file = join(folder, item.name);
    if (item.name.startsWith('._')) throw new Error(`AppleDouble artifact: ${file}`);
    if (item.isDirectory()) { inspect(file); continue; }
    const data = readFileSync(file);
    bytes += data.length;
    if (/\.(html|js|json|rsc|txt|xml|css)$/.test(item.name)) {
      const text = data.toString('utf8');
      if (/https?:\/\/(?:www\.)?isuntv\.com(?:[\/\"?#]|$)/i.test(text)) throw new Error(`Cross-domain URL: ${file}`);
      if (/-----BEGIN [A-Z ]*PRIVATE KEY-----/.test(text)) throw new Error(`Private key in artifact: ${file}`);
    }
    if (item.name.endsWith('.html')) htmlCount++;
  }
}
inspect(root);
writeFileSync(join(root, '.nojekyll'), '');
console.log(JSON.stringify({ staticExport: true, htmlCount, bytes, registry: 'unpublished-empty', form: 'dedicated-enquiry-worker-with-mailto-fallback' }));
