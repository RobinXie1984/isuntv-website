import { verify } from 'node:crypto';
import registry from './authorization-registry.json';
import { entityIds } from './brand-identity';
export type Authorization = {
  id: string;
  licensee: string;
  scope: string;
  territory: string;
  validFrom: string;
  validUntil: string;
  approvedBy: string;
  approvalReference: string;
  boardApprovalReference: string;
  managementApprovalReference: string;
  updatedAt: string;
  status: 'issued' | 'revoked';
  revokedAt: string | null;
  signature: string;
};
export function authorizationPayload(r: Authorization) {
  return JSON.stringify({
    id: r.id,
    licensee: r.licensee,
    scope: r.scope,
    territory: r.territory,
    validFrom: r.validFrom,
    validUntil: r.validUntil,
    approvedBy: r.approvedBy,
    approvalReference: r.approvalReference,
    boardApprovalReference: r.boardApprovalReference,
    managementApprovalReference: r.managementApprovalReference,
    updatedAt: r.updatedAt,
    status: r.status,
    revokedAt: r.revokedAt,
  });
}
export function authorizationStatus(
  r: Authorization,
  publicKey: string,
  now = Date.now(),
) {
  try {
    if (
      !r.id ||
      !r.licensee ||
      !r.scope ||
      !r.territory ||
      !r.approvalReference ||
      !r.boardApprovalReference ||
      !r.managementApprovalReference ||
      r.approvedBy !== entityIds.isuntv
    )
      return 'unavailable';
    if (
      !verify(
        null,
        Buffer.from(authorizationPayload(r)),
        publicKey,
        Buffer.from(r.signature, 'base64'),
      )
    )
      return 'unavailable';
    const start = Date.parse(r.validFrom),
      end = Date.parse(r.validUntil),
      updated = Date.parse(r.updatedAt);
    if (
      ![start, end, updated].every(Number.isFinite) ||
      end <= start ||
      updated > now
    )
      return 'unavailable';
    if (r.status === 'revoked')
      return r.revokedAt &&
        Number.isFinite(Date.parse(r.revokedAt)) &&
        Date.parse(r.revokedAt) <= now
        ? 'revoked'
        : 'unavailable';
    if (r.status !== 'issued' || r.revokedAt !== null) return 'unavailable';
    if (now < start) return 'pending';
    return now >= end ? 'expired' : 'active';
  } catch {
    return 'unavailable';
  }
}
export function lookupAuthorization(id: string) {
  if (!registry.published || !registry.publicKeyPem)
    return { status: 'unpublished' as const, record: null };
  const records = registry.records as Authorization[];
  const matches = records.filter((r) => r.id === id);
  if (!matches.length) return { status: 'not-found' as const, record: null };
  if (matches.length !== 1)
    return { status: 'unavailable' as const, record: null };
  const status = authorizationStatus(matches[0], registry.publicKeyPem);
  return { status, record: status === 'unavailable' ? null : matches[0] };
}
