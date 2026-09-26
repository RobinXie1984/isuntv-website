export async function forwardContact(request, fetcher = fetch) {
  const origin = request.headers.get('origin');
  if (!['https://isunmedia.com', 'https://www.isunmedia.com'].includes(origin))
    return new Response('Invalid origin', {status:403,headers:{'Cache-Control':'no-store'}});
  if (request.method !== 'POST') return new Response('Method not allowed',{status:405,headers:{Allow:'POST','Cache-Control':'no-store'}});
  const headers = new Headers(request.headers);
  headers.delete('cookie'); headers.delete('authorization'); headers.delete('host');
  headers.set('origin','https://isuntv.com');
  return fetcher(new Request('https://isuntv.com/api/contact', {method:'POST',headers,body:request.body,redirect:'manual',duplex:'half'}));
}
