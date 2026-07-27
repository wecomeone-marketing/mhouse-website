// Convert the legal source text (_src/legal/*.txt) into built page sources
// (_src/pages/privacy.html, terms.html). Re-run after editing the .txt, then `node build.cjs`.
const fs = require('fs');
const ROOT = 'C:/Dev/mhouse-website/';

const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
function inline(s) {
  s = esc(s);
  // markdown links [text](url)
  s = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, function (m, t, u) {
    const ext = /^https?:/i.test(u);
    return '<a href="' + u + '"' + (ext ? ' target="_blank" rel="noopener"' : '') + '>' + t + '</a>';
  });
  return s;
}

function convert(body) {
  const lines = body.split('\n');
  const out = [];
  let inList = false;
  const closeList = () => { if (inList) { out.push('</ul>'); inList = false; } };
  for (const raw of lines) {
    const line = raw.trim();
    if (!line) { closeList(); continue; }
    if (/^\*\s+/.test(line)) {                       // bullet
      if (!inList) { out.push('<ul>'); inList = true; }
      out.push('<li>' + inline(line.replace(/^\*\s+/, '')) + '</li>');
      continue;
    }
    closeList();
    let m;
    // h3: "3.1 Title" (short, no trailing punctuation)
    if ((m = line.match(/^(\d+\.\d+)\s+(.+)$/)) && m[2].length <= 72 && !/[;,]$/.test(m[2])) {
      out.push('<h3>' + inline(m[1] + ' ' + m[2]) + '</h3>'); continue;
    }
    // h2: "1. Title" (short Title-case, no trailing punctuation)
    if ((m = line.match(/^(\d+)\.\s+(.+)$/)) && m[2].length <= 60 && /^[A-Z]/.test(m[2]) && !/[;,.]$/.test(m[2])) {
      out.push('<h2>' + inline(m[1] + '. ' + m[2]) + '</h2>'); continue;
    }
    // label: value  -> bold the label
    if ((m = line.match(/^([A-Z][A-Za-z /]{1,28}):\s+(.+)$/))) {
      out.push('<p><strong>' + inline(m[1]) + ':</strong> ' + inline(m[2]) + '</p>'); continue;
    }
    out.push('<p>' + inline(line) + '</p>');          // default paragraph
  }
  closeList();
  return out.join('\n      ');
}

function build(name, h1) {
  const raw = fs.readFileSync(ROOT + '_src/legal/' + name + '.txt', 'utf8').replace(/\r\n/g, '\n');
  const lines = raw.split('\n');
  const docTitle = lines[0].trim();
  const effective = (lines[1] || '').trim();          // "Effective date: ..."
  const body = lines.slice(2).join('\n');
  const html = convert(body);
  const desc = h1 === 'Privacy Policy'
    ? 'How M House (Onkel Properties Ltd) collects, uses and protects personal data.'
    : 'The terms governing use of the M House website, mhouse.cy.';
  const page = '---\n' +
    'title: M House, ' + h1 + '.\n' +
    'desc: ' + desc + '\n' +
    '---\n' +
    '<div class="site on" id="site">\n{{NAV}}\n\n' +
    '<header class="page-hero page-hero--legal">\n' +
    '  <div class="page-hero__inner">\n' +
    '    <p class="page-hero__eyebrow">Legal</p>\n' +
    '    <h1 class="page-hero__title">' + h1 + '</h1>\n' +
    '    <p class="page-hero__sub">' + esc(effective) + '</p>\n' +
    '  </div>\n</header>\n\n' +
    '<section class="page-section">\n  <div class="legal">\n      ' + html + '\n  </div>\n</section>\n\n' +
    '{{FOOTER}}\n</div>\n{{SCRIPTS}}\n';
  fs.writeFileSync(ROOT + '_src/pages/' + name + '.html', page);
  const h2 = (html.match(/<h2>/g) || []).length, h3 = (html.match(/<h3>/g) || []).length, li = (html.match(/<li>/g) || []).length;
  console.log('  ' + name + '.html: ' + h2 + ' sections, ' + h3 + ' subsections, ' + li + ' list items');
}

build('privacy', 'Privacy Policy');
build('terms', 'Terms of Use');
