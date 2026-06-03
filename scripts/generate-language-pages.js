const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const SITE = 'https://brasseriechateaudurbuy.be';
const BRAND = 'Brasserie du Château de Durbuy';
const FICHE_URL = `${SITE}/fiche-officielle/`;
const PUBLIC_FEED_FILE = 'published-articles-2026-05-27.json';
const FEED_START = '<!-- generated-journal-feed:start -->';
const FEED_END = '<!-- generated-journal-feed:end -->';
const JSONLD_START = '<!-- generated-journal-jsonld:start -->';
const JSONLD_END = '<!-- generated-journal-jsonld:end -->';
const SIGNATURE = `Lars — ${BRAND}`;
const JOURNAL_IMAGE = `${SITE}/src/assets/hero-chateau-1280w.jpg`;

const LOCALES = {
  fr: {
    prefix: '',
    html: 'fr',
    hreflang: 'fr-BE',
    ogLocale: 'fr_BE',
    title: `${BRAND} | Microbrasserie à Durbuy`,
    description: `Site officiel de la ${BRAND}, brasserie et microbrasserie à Durbuy installée dans les anciennes écuries du Château de Durbuy.`,
    journalTitle: `Carnet du brasseur — ${BRAND}`,
    journalDescription: "Notes, observations et fragments d'une saison brassicole au domaine du Château de Durbuy.",
    journalChapter: '— Carnet du brasseur —',
    journalHeading: 'Le journal du domaine',
    journalLede: "Notes, observations et fragments d'une saison brassicole. Tenu au domaine.",
    backJournal: 'Retour au carnet',
    home: 'Accueil',
    related: 'Dans le carnet',
    dateLocale: 'fr-FR',
  },
  nl: {
    prefix: 'nl',
    html: 'nl',
    hreflang: 'nl-BE',
    ogLocale: 'nl_BE',
    title: `${BRAND} | Microbrouwerij in Durbuy`,
    description: `Officiële site van ${BRAND}, een brouwerij en microbrouwerij in Durbuy, gevestigd in de voormalige stallen van Château de Durbuy.`,
    journalTitle: `Notities van het landgoed — ${BRAND}`,
    journalDescription: 'Aantekeningen, waarnemingen en fragmenten uit een brouwseizoen op het domein van Château de Durbuy.',
    journalChapter: '— Notities van het landgoed —',
    journalHeading: 'Notities van het landgoed',
    journalLede: 'Aantekeningen, waarnemingen en fragmenten uit een brouwseizoen, bijgehouden op het landgoed.',
    backJournal: 'Terug naar de notities',
    home: 'Startpagina',
    related: 'In de notities',
    dateLocale: 'nl-BE',
  },
  en: {
    prefix: 'en',
    html: 'en',
    hreflang: 'en',
    ogLocale: 'en_GB',
    title: `${BRAND} | Microbrewery in Durbuy`,
    description: `Official site of ${BRAND}, a brewery and microbrewery in Durbuy, set in the former stables of the Château de Durbuy.`,
    journalTitle: `The Estate Journal — ${BRAND}`,
    journalDescription: 'Notes, observations, and fragments from a brewing season at the Château de Durbuy estate.',
    journalChapter: '— Estate Journal —',
    journalHeading: 'The Estate Journal',
    journalLede: 'Notes, observations, and fragments from a brewing season, kept at the estate.',
    backJournal: 'Back to the journal',
    home: 'Home',
    related: 'In the journal',
    dateLocale: 'en-GB',
  },
  de: {
    prefix: 'de',
    html: 'de',
    hreflang: 'de',
    ogLocale: 'de_DE',
    title: `${BRAND} | Mikrobrauerei in Durbuy`,
    description: `Offizielle Website der ${BRAND}, einer Brauerei und Mikrobrauerei in Durbuy, in den früheren Stallungen des Château de Durbuy.`,
    journalTitle: `Notizen vom Anwesen — ${BRAND}`,
    journalDescription: 'Notizen, Beobachtungen und Fragmente einer Brausaison auf dem Anwesen des Château de Durbuy.',
    journalChapter: '— Notizen vom Anwesen —',
    journalHeading: 'Notizen vom Anwesen',
    journalLede: 'Notizen, Beobachtungen und Fragmente einer Brausaison, geführt auf dem Anwesen.',
    backJournal: 'Zurück zu den Notizen',
    home: 'Startseite',
    related: 'In den Notizen',
    dateLocale: 'de-DE',
  },
};

const LANGUAGE_KEYS = Object.keys(LOCALES);
const TRANSLATED_KEYS = LANGUAGE_KEYS.filter((lang) => lang !== 'fr');

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function isoDate(value) {
  return String(value || '2026-05-27').slice(0, 10);
}

function localizedArticle(article, lang) {
  const translation = article.translations?.[lang] || {};
  return {
    ...article,
    title: translation.title || article.title,
    lede: translation.lede || article.lede,
    body: translation.body || article.body || [],
    tags: translation.tags || article.tags || [],
    language: lang,
  };
}

function homeUrl(lang) {
  const prefix = LOCALES[lang].prefix;
  return `${SITE}/${prefix ? `${prefix}/` : ''}`;
}

function journalUrl(lang) {
  const prefix = LOCALES[lang].prefix;
  return `${SITE}/${prefix ? `${prefix}/` : ''}journal/`;
}

function articleUrl(article, lang) {
  const prefix = LOCALES[lang].prefix;
  return `${SITE}/${prefix ? `${prefix}/` : ''}journal/${article.id}/`;
}

function alternateLinks(urlFactory) {
  return [
    ...LANGUAGE_KEYS.map((lang) => `  <link rel="alternate" hreflang="${LOCALES[lang].hreflang}" href="${urlFactory(lang)}" />`),
    `  <link rel="alternate" hreflang="x-default" href="${urlFactory('fr')}" />`,
  ].join('\n');
}

function replaceHeadBasics(html, locale, canonical, alternates) {
  return html
    .replace(/<html lang="[^"]+">/, `<html lang="${locale.html}">`)
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(locale.title)}</title>`)
    .replace(/<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${escapeHtml(locale.description)}" />`)
    .replace(/<link rel="canonical" href="[^"]+" \/>[\s\S]*?(?=  <link rel="icon")/, `<link rel="canonical" href="${canonical}" />\n${alternates}\n`)
    .replace(/<meta property="og:locale" content="[^"]+" \/>/, `<meta property="og:locale" content="${locale.ogLocale}" />`)
    .replace(/<meta property="og:title" content="[^"]+" \/>/, `<meta property="og:title" content="${escapeHtml(locale.title)}" />`)
    .replace(/<meta property="og:description" content="[^"]+" \/>/, `<meta property="og:description" content="${escapeHtml(locale.description)}" />`)
    .replace(/<meta property="og:url" content="[^"]+" \/>/, `<meta property="og:url" content="${canonical}" />`)
    .replace(/<meta name="twitter:title" content="[^"]+" \/>/, `<meta name="twitter:title" content="${escapeHtml(locale.title)}" />`)
    .replace(/<meta name="twitter:description" content="[^"]+" \/>/, `<meta name="twitter:description" content="${escapeHtml(locale.description)}" />`);
}

function adjustAssetPaths(html, prefix) {
  return html
    .replace(/src\/assets\//g, `${prefix}src/assets/`)
    .replaceAll(`${SITE}/${prefix}src/assets/`, `${SITE}/src/assets/`);
}

function formatDate(value, lang) {
  return new Intl.DateTimeFormat(LOCALES[lang].dateLocale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${isoDate(value)}T12:00:00Z`));
}

function articleCardHtml(article, lang) {
  const item = localizedArticle(article, lang);
  const body = item.body
    .filter((paragraph) => paragraph && paragraph.trim())
    .map((paragraph) => `            <p>${escapeHtml(paragraph)}</p>`)
    .join('\n');
  const tags = item.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join('');
  return `        <article class="journal-article" lang="${lang}">
          <p class="article-date">— ${escapeHtml(formatDate(item.date, lang))} —</p>
          <h2 class="article-title"><a href="./${encodeURIComponent(item.id)}/">${escapeHtml(item.title)}</a></h2>
          ${item.lede ? `<p class="article-lede">${escapeHtml(item.lede)}</p>` : ''}
          <div class="article-body">
${body}
          </div>
          ${tags ? `<p class="article-tags">${tags}</p>` : ''}
          <p class="article-sign">${SIGNATURE}</p>
        </article>`;
}

function journalStructuredData(articles, lang) {
  const locale = LOCALES[lang];
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Blog',
        '@id': `${journalUrl(lang)}#blog`,
        name: locale.journalTitle,
        description: locale.journalDescription,
        url: journalUrl(lang),
        image: JOURNAL_IMAGE,
        inLanguage: locale.hreflang,
        publisher: {
          '@type': 'Organization',
          '@id': `${SITE}/#brasserie`,
          name: BRAND,
          url: SITE,
          logo: { '@type': 'ImageObject', url: `${SITE}/src/assets/logo-crest.png` },
        },
        about: { '@type': 'Brewery', '@id': `${SITE}/#brasserie`, name: BRAND },
        blogPost: articles.map((article) => {
          const item = localizedArticle(article, lang);
          return {
            '@type': 'BlogPosting',
            '@id': `${articleUrl(article, lang)}#article`,
            headline: item.title,
            url: articleUrl(article, lang),
            image: JOURNAL_IMAGE,
            datePublished: `${isoDate(article.date)}T12:00:00+02:00`,
            author: { '@type': 'Person', name: 'Lars Kristel' },
          };
        }),
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${journalUrl(lang)}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: locale.home, item: homeUrl(lang) },
          { '@type': 'ListItem', position: 2, name: locale.journalHeading, item: journalUrl(lang) },
        ],
      },
    ],
  };
}

function articleStructuredData(article, lang) {
  const locale = LOCALES[lang];
  const item = localizedArticle(article, lang);
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@id': `${articleUrl(article, lang)}#article`,
        headline: item.title,
        description: item.lede,
        datePublished: `${isoDate(article.date)}T12:00:00+02:00`,
        dateModified: article.updatedAt || `${isoDate(article.date)}T12:00:00+02:00`,
        inLanguage: locale.hreflang,
        mainEntityOfPage: { '@type': 'WebPage', '@id': articleUrl(article, lang) },
        isPartOf: { '@type': 'Blog', '@id': `${journalUrl(lang)}#blog`, name: locale.journalHeading },
        url: articleUrl(article, lang),
        image: JOURNAL_IMAGE,
        author: {
          '@type': 'Person',
          name: 'Lars Kristel',
          affiliation: { '@type': 'Organization', '@id': `${SITE}/#brasserie`, name: BRAND },
        },
        publisher: {
          '@type': 'Organization',
          '@id': `${SITE}/#brasserie`,
          name: BRAND,
          url: `${SITE}/`,
          logo: { '@type': 'ImageObject', url: `${SITE}/src/assets/logo-crest.png` },
        },
        about: { '@type': 'Brewery', '@id': `${SITE}/#brasserie`, name: BRAND },
        keywords: item.tags,
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${articleUrl(article, lang)}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: locale.home, item: homeUrl(lang) },
          { '@type': 'ListItem', position: 2, name: locale.journalHeading, item: journalUrl(lang) },
          { '@type': 'ListItem', position: 3, name: item.title, item: articleUrl(article, lang) },
        ],
      },
    ],
  };
}

function generateHomePages() {
  const source = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  for (const lang of TRANSLATED_KEYS) {
    const locale = LOCALES[lang];
    let html = replaceHeadBasics(source, locale, homeUrl(lang), alternateLinks(homeUrl));
    html = adjustAssetPaths(html, '../');
    fs.mkdirSync(path.join(root, lang), { recursive: true });
    fs.writeFileSync(path.join(root, lang, 'index.html'), html, 'utf8');
  }
}

function generateJournalPages(articles) {
  const source = fs.readFileSync(path.join(root, 'journal', 'index.html'), 'utf8');
  for (const lang of TRANSLATED_KEYS) {
    const locale = LOCALES[lang];
    let html = replaceHeadBasics(source, {
      ...locale,
      title: locale.journalTitle,
      description: locale.journalDescription,
    }, journalUrl(lang), alternateLinks(journalUrl));

    const feed = `${FEED_START}\n${articles.map((article) => articleCardHtml(article, lang)).join('\n')}\n${FEED_END}`;
    html = html.replace(new RegExp(`${FEED_START}[\\s\\S]*?${FEED_END}`), feed);
    html = html.replace(new RegExp(`${JSONLD_START}[\\s\\S]*?${JSONLD_END}`), `${JSONLD_START}\n  <script type="application/ld+json">${JSON.stringify(journalStructuredData(articles, lang))}</script>\n  ${JSONLD_END}`);
    html = html.replace(/data-i18n="journal\.chapter">[\s\S]*?<\/p>/, `data-i18n="journal.chapter">${escapeHtml(locale.journalChapter)}</p>`);
    html = html.replace(/data-i18n="journal\.title">[\s\S]*?<\/h1>/, `data-i18n="journal.title">${escapeHtml(locale.journalHeading)}</h1>`);
    html = html.replace(/data-i18n="journal\.lede">[\s\S]*?<\/p>/, `data-i18n="journal.lede">${escapeHtml(locale.journalLede)}</p>`);
    html = html.replace(/href="\/journal\/"/g, `href="/${lang}/journal/"`);
    html = adjustAssetPaths(html, '../../');

    const outDir = path.join(root, lang, 'journal');
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, 'index.html'), html, 'utf8');
    fs.writeFileSync(path.join(outDir, PUBLIC_FEED_FILE), `${JSON.stringify({ articles }, null, 2)}\n`, 'utf8');
  }
}

function updateFrenchJournalHreflang() {
  const sourcePath = path.join(root, 'journal', 'index.html');
  let html = fs.readFileSync(sourcePath, 'utf8');
  html = html.replace(
    /<link rel="canonical" href="[^"]+" \/>[\s\S]*?(?=  <meta name="theme-color")/,
    `<link rel="canonical" href="${journalUrl('fr')}" />\n${alternateLinks(journalUrl)}\n`
  );
  fs.writeFileSync(sourcePath, html, 'utf8');
}

function generateArticlePages(articles) {
  for (const article of articles) {
    const sourcePath = path.join(root, 'journal', article.id, 'index.html');
    if (!fs.existsSync(sourcePath)) continue;
    const source = fs.readFileSync(sourcePath, 'utf8');
    for (const lang of TRANSLATED_KEYS) {
      const locale = LOCALES[lang];
      const item = localizedArticle(article, lang);
      const title = `${item.title} — ${locale.journalHeading} — ${BRAND}`;
      let html = source
        .replace(/<html lang="[^"]+">/, `<html lang="${locale.html}">`)
        .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(title)}</title>`)
        .replace(/<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${escapeHtml(item.lede || locale.journalDescription)}" />`)
        .replace(/<link rel="canonical" href="[^"]+" \/>/, `<link rel="canonical" href="${articleUrl(article, lang)}" />\n${alternateLinks((code) => articleUrl(article, code))}`)
        .replace(/<meta property="og:locale" content="[^"]+" \/>/, `<meta property="og:locale" content="${locale.ogLocale}" />`)
        .replace(/<meta property="og:title" content="[^"]+" \/>/, `<meta property="og:title" content="${escapeHtml(title)}" />`)
        .replace(/<meta property="og:description" content="[^"]+" \/>/, `<meta property="og:description" content="${escapeHtml(item.lede || locale.journalDescription)}" />`)
        .replace(/<meta property="og:url" content="[^"]+" \/>/, `<meta property="og:url" content="${articleUrl(article, lang)}" />`)
        .replace(/<meta name="twitter:title" content="[^"]+" \/>/, `<meta name="twitter:title" content="${escapeHtml(title)}" />`)
        .replace(/<meta name="twitter:description" content="[^"]+" \/>/, `<meta name="twitter:description" content="${escapeHtml(item.lede || locale.journalDescription)}" />`)
        .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, `<script type="application/ld+json">${JSON.stringify(articleStructuredData(article, lang))}</script>`)
        .replace(/<a href="..\/">[\s\S]*?<\/a>/, `<a href="../">${escapeHtml(locale.backJournal)}</a>`)
        .replace(/<a href="..\/..\/">[\s\S]*?<\/a>/, `<a href="../../">${escapeHtml(locale.home)}</a>`)
        .replace(/<p class="article-date">[\s\S]*?<\/p>/, `<p class="article-date">— ${escapeHtml(formatDate(article.date, lang))} —</p>`)
        .replace(/<h1>[\s\S]*?<\/h1>/, `<h1>${escapeHtml(item.title)}</h1>`)
        .replace(/<p class="article-lede">[\s\S]*?<\/p>/, item.lede ? `<p class="article-lede">${escapeHtml(item.lede)}</p>` : '')
        .replace(/<div class="article-body">[\s\S]*?<\/div>/, `<div class="article-body">\n${item.body.map((paragraph) => `          <p>${escapeHtml(paragraph)}</p>`).join('\n')}\n      </div>`)
        .replace(/<p class="article-tags">[\s\S]*?<\/p>/, item.tags.length ? `<p class="article-tags">${item.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join('')}</p>` : '')
        .replace(/<p>Dans le carnet<\/p>/, `<p>${escapeHtml(locale.related)}</p>`);

      for (const related of articles.filter((candidate) => candidate.id !== article.id).slice(0, 3)) {
        const localizedRelated = localizedArticle(related, lang);
        html = html.replace(new RegExp(`(<a href="\\.\\./${related.id}/">)[\\s\\S]*?(</a>)`), `$1${escapeHtml(localizedRelated.title)}$2`);
      }
      html = adjustAssetPaths(html, '../../../');

      const outDir = path.join(root, lang, 'journal', article.id);
      fs.mkdirSync(outDir, { recursive: true });
      fs.writeFileSync(path.join(outDir, 'index.html'), html, 'utf8');
    }
  }
}

function updateFrenchArticleHreflang(articles) {
  for (const article of articles) {
    const sourcePath = path.join(root, 'journal', article.id, 'index.html');
    if (!fs.existsSync(sourcePath)) continue;
    let html = fs.readFileSync(sourcePath, 'utf8');
    if (!html.includes('hreflang="nl-BE"')) {
      html = html.replace(/<link rel="canonical" href="[^"]+" \/>/, `<link rel="canonical" href="${articleUrl(article, 'fr')}" />\n${alternateLinks((lang) => articleUrl(article, lang))}`);
      fs.writeFileSync(sourcePath, html, 'utf8');
    }
  }
}

function updateSitemap(articles) {
  const urls = [
    ...LANGUAGE_KEYS.map((lang) => ({ loc: homeUrl(lang), priority: lang === 'fr' ? '1.0' : '0.8', changefreq: 'monthly' })),
    { loc: FICHE_URL, priority: '0.8', changefreq: 'monthly', lastmod: '2026-06-03' },
    ...LANGUAGE_KEYS.map((lang) => ({ loc: journalUrl(lang), priority: lang === 'fr' ? '0.6' : '0.5', changefreq: 'weekly' })),
    ...LANGUAGE_KEYS.flatMap((lang) => articles.map((article) => ({
      loc: articleUrl(article, lang),
      priority: lang === 'fr' ? '0.5' : '0.4',
      changefreq: 'monthly',
      lastmod: isoDate(article.updatedAt || article.date),
    }))),
  ];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((item) => `  <url>\n    <loc>${item.loc}</loc>\n    <lastmod>${item.lastmod || '2026-05-27'}</lastmod>\n    <changefreq>${item.changefreq}</changefreq>\n    <priority>${item.priority}</priority>\n  </url>`).join('\n')}\n</urlset>\n`;
  fs.writeFileSync(path.join(root, 'sitemap.xml'), xml, 'utf8');
}

const data = JSON.parse(fs.readFileSync(path.join(root, 'content', 'journal', 'articles.json'), 'utf8'));
const articles = (data.articles || [])
  .filter((article) => article.status === 'published')
  .sort((a, b) => (b.date || '').localeCompare(a.date || ''));

generateHomePages();
updateFrenchJournalHreflang();
generateJournalPages(articles);
generateArticlePages(articles);
updateFrenchArticleHreflang(articles);
updateSitemap(articles);

console.log(`Generated language pages for ${TRANSLATED_KEYS.join(', ')}.`);
