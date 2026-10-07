// M House static build: assembles _src/pages/*.html into root *.html using shared partials.
// Run: node build.cjs   (or: npm run build)
const fs = require('fs');
const ROOT = __dirname.replace(/\\/g, '/');
const read = p => fs.readFileSync(ROOT + '/' + p, 'utf8');

const SITE = 'https://mhouse.cy';
// index.html is the splash gate; its canonical points at the real home content.
const canonicalFor = file => file === 'index.html' ? SITE + '/home.html' : SITE + '/' + file;
// Pages kept out of the sitemap, and per-page priority (default 0.8).
const SITEMAP_EXCLUDE = new Set(['index.html']);
const SITEMAP_PRIORITY = { 'home.html': '1.0', 'contact.html': '0.7', 'privacy.html': '0.3', 'terms.html': '0.3' };

const layout = read('_src/layout.html');
const partials = {
  STYLES: read('_src/partials/styles.html'),
  NAV: read('_src/partials/nav.html'),
  FOOTER: read('_src/partials/footer.html'),
  SCRIPTS: read('_src/partials/scripts.html'),
};

const pagesDir = ROOT + '/_src/pages';
const built = [];
for (const file of fs.readdirSync(pagesDir).filter(f => f.endsWith('.html'))) {
  const raw = read('_src/pages/' + file);
  const fm = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  const meta = {};
  let body = raw;
  if (fm) {
    fm[1].split('\n').forEach(l => { const i = l.indexOf(':'); if (i > 0) meta[l.slice(0, i).trim()] = l.slice(i + 1).trim(); });
    body = fm[2];
  }
  let out = layout
    .split('{{TITLE}}').join(meta.title || 'M House')
    .split('{{DESC}}').join(meta.desc || '')
    .split('{{CANONICAL}}').join(canonicalFor(file))
    .split('{{STYLES}}').join(partials.STYLES)
    .split('{{BODY}}').join(body);
  for (const [k, v] of Object.entries(partials)) out = out.split('{{' + k + '}}').join(v);
  const leftover = out.match(/\{\{[A-Z_]+\}\}/g);
  if (leftover) throw new Error(file + ': unresolved placeholders ' + leftover.join(', '));
  fs.writeFileSync(ROOT + '/' + file, out);
  built.push(file + ' (' + (out.length / 1024).toFixed(0) + 'KB)');
}
console.log('Built:', built.join(', '));

// Sitemap, generated from the page list so it never drifts from what ships.
const today = new Date().toISOString().slice(0, 10);
const sitemapUrls = fs.readdirSync(pagesDir)
  .filter(f => f.endsWith('.html') && !SITEMAP_EXCLUDE.has(f))
  .sort((a, b) => (SITEMAP_PRIORITY[b] || '0.8').localeCompare(SITEMAP_PRIORITY[a] || '0.8') || a.localeCompare(b))
  .map(f => '  <url>\n    <loc>' + canonicalFor(f) + '</loc>\n    <lastmod>' + today +
    '</lastmod>\n    <priority>' + (SITEMAP_PRIORITY[f] || '0.8') + '</priority>\n  </url>')
  .join('\n');
const sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + sitemapUrls + '\n</urlset>\n';
fs.writeFileSync(ROOT + '/sitemap.xml', sitemap);
console.log('Sitemap:', (sitemapUrls.match(/<loc>/g) || []).length, 'URLs');
