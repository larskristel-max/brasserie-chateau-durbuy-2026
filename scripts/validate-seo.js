const fs = require('fs');
const path = require('path');

const SITE = 'https://brasseriechateaudurbuy.be';
const rootArg = process.argv.indexOf('--root');
const root = rootArg >= 0 && process.argv[rootArg + 1]
  ? path.resolve(process.argv[rootArg + 1])
  : path.resolve(__dirname, '..');

const errors = [];
const warnings = [];

function reportError(file, message) {
  errors.push(`${path.relative(root, file) || file}: ${message}`);
}

function normalizeText(value) {
  return String(value || '')
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;|&#160;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function localFileForUrl(url) {
  const parsed = new URL(url);
  if (parsed.origin !== SITE) return null;
  const pathname = decodeURIComponent(parsed.pathname);
  if (pathname === '/') return path.join(root, 'index.html');
  return path.join(root, pathname.replace(/^\//, ''), pathname.endsWith('/') ? 'index.html' : '');
}

function expectedLocaleForUrl(url) {
  const pathname = new URL(url).pathname;
  if (pathname === '/nl/' || pathname.startsWith('/nl/')) {
    return { html: 'nl', openGraph: 'nl_BE' };
  }
  if (pathname === '/en/' || pathname.startsWith('/en/')) {
    return { html: 'en', openGraph: 'en_GB' };
  }
  if (pathname === '/de/' || pathname.startsWith('/de/')) {
    return { html: 'de', openGraph: 'de_DE' };
  }
  return { html: 'fr', openGraph: 'fr_BE' };
}

function extractJsonLd(html, file) {
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">\s*([\s\S]*?)\s*<\/script>/g)];
  return blocks.flatMap((match, index) => {
    try {
      return [JSON.parse(match[1])];
    } catch (error) {
      reportError(file, `JSON-LD block ${index + 1} is invalid: ${error.message}`);
      return [];
    }
  });
}

function validateFaq(html, jsonLd, file) {
  const faq = jsonLd.find((item) => item['@type'] === 'FAQPage');
  if (!faq) return;

  const visibleQuestions = [...html.matchAll(/<summary[^>]*data-i18n="faq\.q\d+"[^>]*>([\s\S]*?)<\/summary>/g)]
    .map((match) => normalizeText(match[1]));
  const visibleAnswers = [...html.matchAll(/<p[^>]*data-i18n="faq\.a\d+"[^>]*>([\s\S]*?)<\/p>/g)]
    .map((match) => normalizeText(match[1]));
  const structuredQuestions = (faq.mainEntity || []).map((item) => normalizeText(item.name));
  const structuredAnswers = (faq.mainEntity || []).map((item) => normalizeText(item.acceptedAnswer?.text));

  if (visibleQuestions.length !== structuredQuestions.length) {
    reportError(file, `visible FAQ has ${visibleQuestions.length} questions but structured FAQ has ${structuredQuestions.length}`);
    return;
  }

  visibleQuestions.forEach((question, index) => {
    if (question !== structuredQuestions[index]) {
      reportError(file, `FAQ question ${index + 1} does not match visible localized text`);
    }
    if (visibleAnswers[index] !== structuredAnswers[index]) {
      reportError(file, `FAQ answer ${index + 1} does not match visible localized text`);
    }
  });
}

function validatePage(url, sitemapUrls) {
  const file = localFileForUrl(url);
  if (!file || !fs.existsSync(file)) {
    reportError(file || root, `sitemap URL has no local file: ${url}`);
    return;
  }

  if (path.extname(file) && path.extname(file) !== '.html') return;
  const html = fs.readFileSync(file, 'utf8');
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"\s*\/>/)?.[1];
  if (!canonical) reportError(file, 'missing canonical URL');
  else if (canonical !== url) reportError(file, `canonical is ${canonical}, expected ${url}`);

  const expectedLocale = expectedLocaleForUrl(url);
  const htmlLang = html.match(/<html\s[^>]*lang="([^"]+)"/)?.[1];
  if (!htmlLang) reportError(file, 'missing html lang attribute');
  else if (htmlLang !== expectedLocale.html) {
    reportError(file, `html lang is ${htmlLang}, expected ${expectedLocale.html}`);
  }

  const hasOpenGraphMetadata = /<meta property="og:type" content="[^"]+"\s*\/>/.test(html);
  if (hasOpenGraphMetadata) {
    const openGraphUrl = html.match(/<meta property="og:url" content="([^"]+)"\s*\/>/)?.[1];
    const openGraphLocale = html.match(/<meta property="og:locale" content="([^"]+)"\s*\/>/)?.[1];
    if (!openGraphUrl) reportError(file, 'Open Graph metadata is missing og:url');
    else if (openGraphUrl !== canonical) {
      reportError(file, `og:url is ${openGraphUrl}, expected canonical ${canonical}`);
    }
    if (!openGraphLocale) reportError(file, 'Open Graph metadata is missing og:locale');
    else if (openGraphLocale !== expectedLocale.openGraph) {
      reportError(file, `og:locale is ${openGraphLocale}, expected ${expectedLocale.openGraph}`);
    }
  }

  const jsonLd = extractJsonLd(html, file);
  validateFaq(html, jsonLd, file);

  const alternates = [...html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"\s*\/>/g)]
    .map((match) => ({ lang: match[1], href: match[2] }));
  for (const alternate of alternates) {
    if (!sitemapUrls.has(alternate.href)) {
      reportError(file, `hreflang ${alternate.lang} target is absent from sitemap: ${alternate.href}`);
      continue;
    }
    const targetFile = localFileForUrl(alternate.href);
    if (!targetFile || !fs.existsSync(targetFile)) continue;
    const targetHtml = fs.readFileSync(targetFile, 'utf8');
    if (!targetHtml.includes(`href="${url}"`)) {
      reportError(file, `hreflang target does not link back to ${url}`);
    }
  }
}

function validateProductFeed() {
  const feedFile = path.join(root, 'data', 'beers.json');
  if (!fs.existsSync(feedFile)) {
    reportError(feedFile, 'missing public beer data feed');
    return;
  }

  let feed;
  try {
    feed = JSON.parse(fs.readFileSync(feedFile, 'utf8'));
  } catch (error) {
    reportError(feedFile, `invalid JSON: ${error.message}`);
    return;
  }

  if (!Array.isArray(feed.products) || feed.products.length !== 4) {
    reportError(feedFile, 'expected the four current public beer products');
  }

  const discoveryUrl = `${SITE}/data/beers.json`;
  const llmsFile = path.join(root, 'llms.txt');
  if (!fs.existsSync(llmsFile) || !fs.readFileSync(llmsFile, 'utf8').includes(discoveryUrl)) {
    reportError(llmsFile, 'does not advertise the public beer data feed');
  }

  const ficheFile = path.join(root, 'fiche-officielle', 'index.html');
  if (!fs.existsSync(ficheFile) || !fs.readFileSync(ficheFile, 'utf8').includes(discoveryUrl)) {
    reportError(ficheFile, 'does not link to the public beer data feed');
  }

  const workflowFile = path.join(root, '.github', 'workflows', 'deploy.yml');
  if (!fs.existsSync(workflowFile) || !/cp -R data dist\//.test(fs.readFileSync(workflowFile, 'utf8'))) {
    reportError(workflowFile, 'does not copy the beer data feed into the deployed site');
  }
}

const sitemapFile = path.join(root, 'sitemap.xml');
if (!fs.existsSync(sitemapFile)) {
  reportError(sitemapFile, 'missing sitemap.xml');
} else {
  const sitemap = fs.readFileSync(sitemapFile, 'utf8');
  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  const sitemapUrls = new Set(urls);
  if (urls.length !== sitemapUrls.size) {
    reportError(sitemapFile, 'contains duplicate URLs');
  }
  urls.forEach((url) => validatePage(url, sitemapUrls));
}

validateProductFeed();

if (warnings.length) {
  console.log(`SEO validation warnings (${warnings.length}):`);
  warnings.forEach((warning) => console.log(`- ${warning}`));
}

if (errors.length) {
  console.error(`SEO validation failed (${errors.length}):`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log('SEO validation passed: sitemap files, canonicals, route languages, Open Graph URLs/locales, reciprocal hreflang, localized JSON-LD, visible FAQ alignment and product-feed discovery are consistent.');
