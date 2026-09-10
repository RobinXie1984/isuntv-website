import { identityGraph, jsonLd } from '../lib/brand-identity';
export function IdentityGraph() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLd(identityGraph) }}
    />
  );
}
