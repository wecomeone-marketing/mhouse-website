// M House static build: assembles _src/pages/*.html into root *.html using shared partials.
// Run: node build.cjs   (or: npm run build)
const fs = require('fs');
const ROOT = __dirname.replace(/\\/g, '/');
const read = p => fs.readFileSync(ROOT + '/' + p, 'utf8');

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
    .split('{{STYLES}}').join(partials.STYLES)
    .split('{{BODY}}').join(body);
  for (const [k, v] of Object.entries(partials)) out = out.split('{{' + k + '}}').join(v);
  const leftover = out.match(/\{\{[A-Z_]+\}\}/g);
  if (leftover) throw new Error(file + ': unresolved placeholders ' + leftover.join(', '));
  fs.writeFileSync(ROOT + '/' + file, out);
  built.push(file + ' (' + (out.length / 1024).toFixed(0) + 'KB)');
}
console.log('Built:', built.join(', '));
