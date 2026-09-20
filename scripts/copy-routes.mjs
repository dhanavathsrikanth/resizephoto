// Post-build: emit real static files for SPA routes so Workers serves them
// directly (HTTP 200) instead of relying on _redirects rewrites or SPA fallback.
// Runs automatically after `npm run build` (including Cloudflare builds).
import { cpSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const src = join(dist, 'index.html');

if (!existsSync(src)) {
  console.error('[copy-routes] dist/index.html missing, skipping');
  process.exit(0);
}

for (const route of ['gate', 'privacy', 'terms', 'disclaimer', 'cookies']) {
  const dir = join(dist, route);
  mkdirSync(dir, { recursive: true });
  cpSync(src, join(dir, 'index.html'));
}

console.log('[copy-routes] route copies written: gate, privacy, terms, disclaimer, cookies');
