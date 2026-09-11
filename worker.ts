import handler from 'vinext/server/fetch-handler';

declare const __ISUN_RELEASE__: string;
// Only anonymous, query-free HTML information pages. Forms, verification, APIs,
// search, RSC navigation and previews always use their existing live handler.
const publicPage = /^\/(?:zh-Hans\/|en\/|ja\/|he\/)?(?:about|global|interviews|chairman|robin|licensing|privacy)?$/;
const localeHome = /^\/(?:zh-Hans|en|ja|he)$/;
export function canCache(request: Request) {
  const url = new URL(request.url);
  return url.hostname === 'isuntv.com' && request.method === 'GET' && !url.search &&
    (publicPage.test(url.pathname) || localeHome.test(url.pathname)) &&
    !request.headers.has('cookie') && !request.headers.has('authorization') &&
    !Array.from(request.headers.keys()).some(name => name === 'rsc' || name.startsWith('next-') || name.startsWith('x-vinext-')) &&
    !request.headers.has('range') &&
    (request.headers.get('accept') ?? '').includes('text/html');
}
export default {
  async fetch(request, env, ctx) {
    if (!canCache(request)) return handler.fetch(request, env, ctx);
    const cacheUrl = new URL(request.url);
    cacheUrl.searchParams.set('__isuntv_release', __ISUN_RELEASE__);
    const key = new Request(cacheUrl, { method: 'GET' });
    let cache: Cache | undefined;
    try {
      cache = await caches.open('isuntv-public-html');
      const hit = await cache.match(key);
      if (hit) {
        const response = new Response(hit.body, hit);
        response.headers.set('X-iSunTV-Cache', 'HIT');
        // The hosted Cache API can return a different browser TTL; reapply our policy.
        response.headers.set('Cache-Control', 'public, max-age=0, s-maxage=300, must-revalidate');
        return response;
      }
    } catch { /* Cache availability must never prevent serving the page. */ }
    if (!cache) return handler.fetch(request, env, ctx);
    const result = await handler.fetch(request, env, ctx);
    if (result.status !== 200 || result.headers.has('set-cookie') ||
      !result.headers.get('content-type')?.includes('text/html')) return result;
    const response = new Response(result.body, result);
    response.headers.set('Cache-Control', 'public, max-age=0, s-maxage=300, must-revalidate');
    response.headers.set('X-iSunTV-Cache', 'MISS');
    // Keep all framework Vary headers. A source-derived key prevents stale releases.
    ctx.waitUntil(cache.put(key, response.clone()).catch(() => undefined));
    return response;
  },
} satisfies ExportedHandler;
