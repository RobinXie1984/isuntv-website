import { lookupAuthorization } from '../../../../lib/authorizations';
import registry from '../../../../lib/authorization-registry.json';
export const dynamic = 'force-dynamic';
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  if (!id || id.length > 100)
    return Response.json(
      { status: 'invalid-id' },
      { status: 400, headers: { 'Cache-Control': 'no-store' } },
    );
  const result = lookupAuthorization(id);
  return Response.json(
    {
      ...result,
      publicKeyPem: registry.publicKeyPem,
      checkedAt: new Date().toISOString(),
      verificationUrl: `https://isuntv.com/verify?id=${encodeURIComponent(id)}`,
    },
    {
      status:
        result.status === 'unpublished' || result.status === 'unavailable'
          ? 503
          : result.status === 'not-found'
            ? 404
            : 200,
      headers: { 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex' },
    },
  );
}
