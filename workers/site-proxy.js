const GITHUB_RAW_BASE =
  'https://raw.githubusercontent.com/larskristel-max/brasserie-chateau-durbuy-2026/gh-pages';
const CANONICAL_HOST = 'brasseriechateaudurbuy.be';
const ORIGIN_HEADER = 'github-raw-gh-pages';

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
