const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const journalDir = path.join(root, 'journal');
const feedPath = path.join(root, 'content', 'journal', 'articles.json');
const sitemapPath = path.join(root, 'sitemap.xml');
const llmsPath = path.join(root, 'llms.txt');

const SITE = 'https://brasseriechateaudurbuy.be';
const BRAND = 'Brasserie du Ch\u00e2teau de Durbuy';
const MARKER = '<!-- generated-journal-article -->';

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function isoDate(value) {
  if (!value) return '2026-05-26';
  return String(value).slice(0, 10);
}

function formatDate(value) {
  const d = new Date(`${isoDate(value)}T12:00:00Z`);
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(d);
}

function removeGeneratedArticlePages() {
  for (const entry of fs.readdirSync(journalDir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const indexPath = path.join(journalDir, entry.name, 'index.html');
    if (!fs.existsSync(indexPath)) continue;
    const current = fs.readFileSync(indexPath, 'utf8');
    if (current.includes(MARKER)) {
      fs.rmSync(path.join(journalDir, entry.name), { recursive: true, force: true });
    }
  }
}

function articleHtml(article) {
  const url = `${SITE}/journal/${article.id}/`;
  const title = `${article.title} \u2014 Carnet du brasseur \u2014 ${BRAND}`;
  const description = article.lede || `Carnet du brasseur de la ${BRAND}.`;
  const body = (article.body || [])
    .filter((p) => p && p.trim())
    .map((p) => `          <p>${escapeHtml(p)}</p>`)
    .join('\n');
  const tags = (article.tags || [])
    .map((tag) => `<span>${escapeHtml(tag)}</span>`)
    .join('');
  const datePublished = `${isoDate(article.date)}T12:00:00+02:00`;
  const dateModified = article.updatedAt || datePublished;
  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description,
    datePublished,
    dateModified,
    inLanguage: 'fr',
    mainEntityOfPage: url,
    url,
    author: { '@type': 'Organization', name: BRAND },
    publisher: {
      '@type': 'Organization',
      name: BRAND,
      url: SITE,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE}/src/assets/logo-crest.png`,
      },
    },
  };

  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}" />
  <link rel="canonical" href="${escapeHtml(url)}" />
  <meta name="theme-color" content="#F2EBDD" />
  <meta property="og:type" content="article" />
  <meta property="og:locale" content="fr_BE" />
  <meta property="og:title" content="${escapeHtml(title)}" />
  <meta property="og:description" content="${escapeHtml(description)}" />
  <meta property="og:url" content="${escapeHtml(url)}" />
  <meta property="article:published_time" content="${escapeHtml(datePublished)}" />
  <meta property="article:modified_time" content="${escapeHtml(dateModified)}" />
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:title" content="${escapeHtml(title)}" />
  <meta name="twitter:description" content="${escapeHtml(description)}" />
  <link rel="icon" type="image/png" sizes="32x32" href="../../src/assets/favicon-32.png" />
  <link rel="icon" type="image/png" sizes="16x16" href="../../src/assets/favicon-16.png" />
  <link rel="apple-touch-icon" sizes="180x180" href="../../src/assets/apple-touch-icon.png" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Inter:wght@300;400;500&display=swap" rel="stylesheet">
  <script type="application/ld+json">${JSON.stringify(articleLd)}</script>
  <style>
    :root {
      --ink: #0E0C0A;
      --ink-soft: rgba(14, 12, 10, 0.72);
      --ink-fade: rgba(14, 12, 10, 0.48);
      --cream: #F2EBDD;
      --line: rgba(14, 12, 10, 0.16);
      --copper: #8C5E33;
      --serif: "Cormorant Garamond", serif;
      --sans: "Inter", sans-serif;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      min-height: 100vh;
      background: var(--cream);
      color: var(--ink);
      font-family: var(--sans);
      font-weight: 300;
    }
    a { color: inherit; text-decoration: none; }
    .article-page {
      width: min(100% - clamp(2rem, 8vw, 8rem), 760px);
      margin: 0 auto;
      padding: clamp(5rem, 10vw, 9rem) 0 clamp(6rem, 10vw, 10rem);
    }
    .article-nav {
      display: flex;
      justify-content: space-between;
      gap: 2rem;
      margin-bottom: clamp(4rem, 8vw, 7rem);
      font-size: 0.72rem;
      letter-spacing: 0.22em;
      text-transform: uppercase;
    }
    .article-nav a {
      border-bottom: 1px solid currentColor;
      padding-bottom: 0.35rem;
    }
    .article-date,
    .article-tags,
    .article-sign {
      color: var(--copper);
      font-size: 0.72rem;
      letter-spacing: 0.22em;
      text-transform: uppercase;
    }
    h1 {
      margin: 1.2rem 0 1rem;
      font-family: var(--serif);
      font-size: clamp(3rem, 7vw, 5.8rem);
      line-height: 0.95;
      font-weight: 300;
      letter-spacing: 0.008em;
    }
    .article-lede {
      margin: 0 0 clamp(3rem, 6vw, 5rem);
      max-width: 40rem;
      color: var(--ink-soft);
      font-size: clamp(1.15rem, 1.2vw, 1.35rem);
      line-height: 1.65;
    }
    .article-body {
      border-top: 1px solid var(--line);
      padding-top: clamp(2.6rem, 5vw, 4rem);
    }
    .article-body p {
      margin: 0 0 1.45rem;
      color: var(--ink-soft);
      font-size: clamp(1.02rem, 0.45vw + 0.95rem, 1.18rem);
      line-height: 1.78;
    }
    .article-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem 1.1rem;
      margin-top: clamp(3rem, 6vw, 5rem);
      padding-top: 1.5rem;
      border-top: 1px solid var(--line);
    }
    .article-sign {
      margin-top: 2rem;
      color: var(--ink-fade);
    }
  </style>
</head>
<body>
  ${MARKER}
  <main class="article-page">
    <nav class="article-nav" aria-label="Navigation du carnet">
      <a href="../">Retour au carnet</a>
      <a href="../../">Accueil</a>
    </nav>
    <article>
      <p class="article-date">\u2014 ${escapeHtml(formatDate(article.date))} \u2014</p>
      <h1>${escapeHtml(article.title)}</h1>
      ${article.lede ? `<p class="article-lede">${escapeHtml(article.lede)}</p>` : ''}
      <div class="article-body">
${body}
      </div>
      ${tags ? `<p class="article-tags">${tags}</p>` : ''}
      <p class="article-sign">\u2014 ${BRAND}</p>
    </article>
  </main>
</body>
</html>
`;
}

function sitemapXml(articles) {
  const urls = [
    { loc: `${SITE}/`, lastmod: '2026-05-27', changefreq: 'monthly', priority: '1.0' },
    { loc: `${SITE}/journal/`, lastmod: '2026-05-27', changefreq: 'weekly', priority: '0.6' },
    ...articles.map((article) => ({
      loc: `${SITE}/journal/${article.id}/`,
      lastmod: isoDate(article.updatedAt || article.date),
      changefreq: 'monthly',
      priority: '0.5',
    })),
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((item) => `  <url>
    <loc>${item.loc}</loc>
    <lastmod>${item.lastmod}</lastmod>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
  </url>`).join('\n')}
</urlset>
`;
}

function updateLlms(articles) {
  if (!fs.existsSync(llmsPath)) return;
  let text = fs.readFileSync(llmsPath, 'utf8');
  const block = [
    '## Journal Article URLs',
    '',
    ...articles.map((article) => `- ${article.title}: ${SITE}/journal/${article.id}/`),
    '',
  ].join('\n');

  const start = text.indexOf('## Journal Article URLs');
  if (start !== -1) {
    const next = text.indexOf('\n## ', start + 1);
    text = text.slice(0, start) + block + (next === -1 ? '' : text.slice(next + 1));
  } else {
    text = `${text.trim()}\n\n${block}`;
  }

  text = text.replace(
    '2. https://brasseriechateaudurbuy.be/journal/',
    '2. Prefer the relevant individual journal article URL when citing a specific note.\n3. https://brasseriechateaudurbuy.be/journal/'
  );

  fs.writeFileSync(llmsPath, text, 'utf8');
}

const data = JSON.parse(fs.readFileSync(feedPath, 'utf8'));
const published = (data.articles || [])
  .filter((article) => article.status === 'published')
  .sort((a, b) => (b.date || '').localeCompare(a.date || ''));

removeGeneratedArticlePages();

for (const article of published) {
  const dir = path.join(journalDir, article.id);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), articleHtml(article), 'utf8');
}

fs.writeFileSync(sitemapPath, sitemapXml(published), 'utf8');
updateLlms(published);

console.log(`Generated ${published.length} journal article pages.`);
