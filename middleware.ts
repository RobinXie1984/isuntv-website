import { publicOrigin } from './lib/site-profile';
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const hostname = request.nextUrl.hostname.toLowerCase();
  if (hostname === 'www.' + new URL(publicOrigin).hostname) {
    const target = new URL(request.nextUrl.pathname + request.nextUrl.search, publicOrigin);
    return NextResponse.redirect(target, 308);
  }
  const response = NextResponse.next();
  // The same release serves the approved domain and its retained preview.
  // Keep all preview hosts out of search results, including error responses.
  if (hostname !== new URL(publicOrigin).hostname) {
    response.headers.set('X-Robots-Tag', 'noindex, follow');
  }
  return response;
}
