const GITHUB_RAW_BASE =
  'https://raw.githubusercontent.com/larskristel-max/brasserie-chateau-durbuy-2026/gh-pages';
const CANONICAL_HOST = 'brasseriechateaudurbuy.be';
const ORIGIN_HEADER = 'github-raw-gh-pages';
const LEGACY_REDIRECTS = {
  '/nl/journal/lancement-gamme-chateau-durbuy-2026-07-30/':
    '/nl/journal/lancering-bieren-chateau-durbuy-2026-07-30/',
  '/en/journal/lancement-gamme-chateau-durbuy-2026-07-30/':
    '/en/journal/chateau-beers-launched-2026-07-30/',
  '/de/journal/lancement-gamme-chateau-durbuy-2026-07-30/':
    '/de/journal/biere-des-schlosses-lanciert-2026-07-30/',
  '/journal/niet-alles-past-op-een-waarschuwing-2026-07-02/':
    '/journal/tout-ne-tient-pas-dans-un-avertissement-2026-07-02/',
  '/nl/journal/tout-ne-tient-pas-dans-un-avertissement-2026-07-02/':
    '/nl/journal/niet-alles-past-op-een-waarschuwing-2026-07-02/',
  '/en/journal/niet-alles-past-op-een-waarschuwing-2026-07-02/':
    '/en/journal/not-everything-fits-on-a-warning-2026-07-02/',
  '/en/journal/tout-ne-tient-pas-dans-un-avertissement-2026-07-02/':
    '/en/journal/not-everything-fits-on-a-warning-2026-07-02/',
  '/de/journal/niet-alles-past-op-een-waarschuwing-2026-07-02/':
    '/de/journal/nicht-alles-passt-in-einen-warnhinweis-2026-07-02/',
  '/de/journal/tout-ne-tient-pas-dans-un-avertissement-2026-07-02/':
    '/de/journal/nicht-alles-passt-in-einen-warnhinweis-2026-07-02/',
  '/nl/journal/le-houblon-et-nous-2026-06-03/': '/nl/journal/hop-en-wij-2026-06-03/',
  '/en/journal/le-houblon-et-nous-2026-06-03/': '/en/journal/hops-and-us-2026-06-03/',
  '/de/journal/le-houblon-et-nous-2026-06-03/':
    '/de/journal/der-hopfen-und-wir-2026-06-03/',
  '/nl/journal/quand-le-grain-manque-2026-05-26/':
    '/nl/journal/wanneer-graan-schaars-wordt-2026-05-26/',
  '/en/journal/quand-le-grain-manque-2026-05-26/':
    '/en/journal/when-grain-is-scarce-2026-05-26/',
  '/de/journal/quand-le-grain-manque-2026-05-26/':
    '/de/journal/wenn-das-getreide-knapp-wird-2026-05-26/',
  '/nl/journal/avant-letiquette-finale-2026-05-20/':
    '/nl/journal/nog-voor-het-definitieve-etiket-2026-05-20/',
  '/en/journal/avant-letiquette-finale-2026-05-20/':
    '/en/journal/before-the-label-is-final-2026-05-20/',
  '/de/journal/avant-letiquette-finale-2026-05-20/':
    '/de/journal/bevor-das-etikett-endgueltig-ist-2026-05-20/',
  '/nl/journal/une-biere-dici-2026-05-17/': '/nl/journal/een-bier-van-hier-2026-05-17/',
  '/en/journal/une-biere-dici-2026-05-17/': '/en/journal/a-beer-from-here-2026-05-17/',
  '/de/journal/une-biere-dici-2026-05-17/': '/de/journal/ein-bier-von-hier-2026-05-17/',
  '/nl/journal/les-anciennes-ecuries-2026-05-18/':
    '/nl/journal/de-voormalige-stallen-2026-05-18/',
  '/en/journal/les-anciennes-ecuries-2026-05-18/':
    '/en/journal/the-former-stables-2026-05-18/',
  '/de/journal/les-anciennes-ecuries-2026-05-18/':
    '/de/journal/die-frueheren-stallungen-2026-05-18/',
  '/nl/journal/marckloff-et-nous-2026-05-19/': '/nl/journal/marckloff-en-wij-2026-05-19/',
  '/en/journal/marckloff-et-nous-2026-05-19/': '/en/journal/marckloff-and-us-2026-05-19/',
  '/de/journal/marckloff-et-nous-2026-05-19/': '/de/journal/marckloff-und-wir-2026-05-19/',
};

export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (url.protocol !== 'https:' || url.hostname === `www.${CANONICAL_HOST}`) {
      url.protocol = 'https:';
      url.hostname = CANONICAL_HOST;
      return Response.redirect(url.toString(), 301);
    }

    if (!['GET', 'HEAD'].includes(request.method)) {
      return new Response('Method not allowed', {
        status: 405,
        headers: {
          allow: 'GET, HEAD',
        },
      });
    }

    const legacyTarget = legacyRedirectTarget(url.pathname);
    if (legacyTarget) {
      url.pathname = legacyTarget;
      return Response.redirect(url.toString(), 301);
    }

    if (shouldRedirectToDirectory(url.pathname)) {
      url.pathname = `${url.pathname}/`;
      return Response.redirect(url.toString(), 301);
    }

    const assetPath = assetPathFromUrl(url);
    if (!assetPath) return new Response('Not found', { status: 404 });

    const upstreamUrl = `${GITHUB_RAW_BASE}/${assetPath}`;
    const upstream = await fetch(upstreamUrl, {
      headers: {
        'User-Agent': 'brasserie-chateau-durbuy-site-proxy',
      },
      cf: {
        cacheEverything: true,
        cacheTtl: 300,
      },
    });

    const headers = new Headers();
    headers.set('cache-control', 'public, max-age=120, s-maxage=300');
    headers.set('x-brasserie-origin', ORIGIN_HEADER);
    headers.set('access-control-allow-origin', '*');
    headers.set('x-content-type-options', 'nosniff');
    headers.set('content-type', contentTypeForPath(assetPath));
    if (assetPath === 'admin/index.html' || assetPath.startsWith('admin/')) {
      headers.set('cache-control', 'no-store');
      headers.set('x-robots-tag', 'noindex, nofollow, noarchive');
    }

    const body = request.method === 'HEAD' ? null : upstream.body;

    return new Response(body, {
      status: upstream.status,
      statusText: upstream.statusText,
      headers,
    });
  },
};

function legacyRedirectTarget(pathname) {
  const normalized = pathname.endsWith('/') ? pathname : `${pathname}/`;
  return LEGACY_REDIRECTS[normalized] || null;
}

function shouldRedirectToDirectory(pathname) {
  if (pathname === '/' || pathname.endsWith('/')) return false;
  const lastSegment = pathname.split('/').pop() || '';
  return !lastSegment.includes('.');
}

function assetPathFromUrl(url) {
  let pathname;
  try {
    pathname = decodeURIComponent(url.pathname);
  } catch {
    return null;
  }

  if (pathname.includes('\0')) return null;

  let cleaned = pathname.replace(/^\/+/, '');
  if (!cleaned || cleaned.endsWith('/')) cleaned += 'index.html';

  const segments = cleaned.split('/');
  if (segments.some((segment) => segment === '..')) return null;

  return segments.map(encodeURIComponent).join('/');
}

function contentTypeForPath(path) {
  const extension = path.split('.').pop()?.toLowerCase();
  const types = {
    css: 'text/css; charset=utf-8',
    gif: 'image/gif',
    html: 'text/html; charset=utf-8',
    ico: 'image/x-icon',
    jpeg: 'image/jpeg',
    jpg: 'image/jpeg',
    js: 'text/javascript; charset=utf-8',
    json: 'application/json; charset=utf-8',
    map: 'application/json; charset=utf-8',
    png: 'image/png',
    svg: 'image/svg+xml',
    txt: 'text/plain; charset=utf-8',
    webp: 'image/webp',
    xml: 'application/xml; charset=utf-8',
  };

  return types[extension] || 'application/octet-stream';
}
