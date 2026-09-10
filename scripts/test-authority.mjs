import ts from 'typescript';
import { readFileSync, writeFileSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { resolve, dirname } from 'node:path';
import { generateKeyPairSync, sign } from 'node:crypto';
import assert from 'node:assert/strict';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const temp = mkdtempSync(resolve(tmpdir(), 'isuntv-test-'));
for (const file of ['brand-identity', 'authorizations']) {
  let source = readFileSync(`${root}/lib/${file}.ts`, 'utf8');
  source = source
    .replace(
      "import registry from './authorization-registry.json';",
      `const registry=${readFileSync(`${root}/lib/authorization-registry.json`, 'utf8')};`,
    )
    .replace("'./brand-identity'", "'./brand-identity.mjs'");
  writeFileSync(
    `${temp}/${file}.mjs`,
    ts.transpileModule(source, {
      compilerOptions: {
        target: ts.ScriptTarget.ES2022,
        module: ts.ModuleKind.ESNext,
      },
    }).outputText,
  );
}
const { identityGraph, entityIds, jsonLd } = await import(
  pathToFileURL(`${temp}/brand-identity.mjs`).href
);
const { authorizationStatus, authorizationPayload, lookupAuthorization } =
  await import(pathToFileURL(`${temp}/authorizations.mjs`).href);
assert.equal(
  identityGraph['@graph'].filter((n) => n['@type'] === 'Person').length,
  1,
);
assert.equal(JSON.parse(jsonLd({ name: '</script>' })).name, '</script>');
assert(!jsonLd({ name: '</script>' }).includes('<'));
assert.equal(lookupAuthorization('FAKE-TEST-ONLY').status, 'unpublished');
const { publicKey, privateKey } = generateKeyPairSync('ed25519');
const publicPem = publicKey.export({ type: 'spki', format: 'pem' });
const now = Date.parse('2026-09-10T12:00:00Z');
const record = {
  id: 'TEST-ONLY',
  licensee: 'Test fixture — not a license',
  scope: 'Fixture',
  territory: 'Fixture',
  validFrom: '2026-01-01T00:00:00Z',
  validUntil: '2027-01-01T00:00:00Z',
  approvedBy: entityIds.isuntv,
  approvalReference: 'TEST-ONLY',
  boardApprovalReference: 'TEST-BOARD-ONLY',
  managementApprovalReference: 'TEST-MANAGEMENT-ONLY',
  updatedAt: '2026-09-01T00:00:00Z',
  status: 'issued',
  revokedAt: null,
  signature: '',
};
const signed = (r) => ({
  ...r,
  signature: sign(
    null,
    Buffer.from(authorizationPayload(r)),
    privateKey,
  ).toString('base64'),
});
assert.equal(authorizationStatus(signed(record), publicPem, now), 'active');
assert.equal(
  authorizationStatus({ ...signed(record), scope: 'Tampered' }, publicPem, now),
  'unavailable',
);
assert.equal(
  authorizationStatus(
    signed({ ...record, approvedBy: 'unauthorized' }),
    publicPem,
    now,
  ),
  'unavailable',
);
assert.equal(
  authorizationStatus(
    signed(record),
    publicPem,
    Date.parse('2027-01-01T00:00:00Z'),
  ),
  'expired',
);
assert.equal(
  authorizationStatus(
    signed({ ...record, validFrom: '2026-10-01T00:00:00Z' }),
    publicPem,
    now,
  ),
  'pending',
);
assert.equal(
  authorizationStatus(
    signed({ ...record, status: 'revoked', revokedAt: '2026-09-09T00:00:00Z' }),
    publicPem,
    now,
  ),
  'revoked',
);
assert.equal(
  authorizationStatus(
    signed({ ...record, validUntil: 'invalid' }),
    publicPem,
    now,
  ),
  'unavailable',
);
assert.equal(authorizationStatus(signed({ ...record, boardApprovalReference: '' }), publicPem, now), 'unavailable');
assert.equal(authorizationStatus(signed({ ...record, managementApprovalReference: '' }), publicPem, now), 'unavailable');
assert.equal(authorizationStatus(signed({ ...record, approvedBy: entityIds.robin }), publicPem, now), 'unavailable');
console.log(
  'Identity alias, script escaping, unpublished registry, tamper, approval, expiry, future-date and revocation checks passed.',
);

const contactSource = readFileSync(
  `${root}/app/api/contact/route.ts`,
  'utf8',
).replace(
  /import \{ env \} from ['"]cloudflare:workers['"];?/,
  'const env = {}; export { env };',
);
writeFileSync(
  `${temp}/contact.mjs`,
  ts.transpileModule(contactSource, {
    compilerOptions: {
      target: ts.ScriptTarget.ES2022,
      module: ts.ModuleKind.ESNext,
    },
  }).outputText,
);
const contact = await import(pathToFileURL(`${temp}/contact.mjs`).href);
const fields = {
  name: 'Test only',
  organization: 'Test fixture',
  email: 'qa@example.com',
  interest: 'licensing',
  message: 'Test only — no email is sent.',
  consent: 'yes',
  website: '',
};
const req = (data = fields, origin = 'https://isuntv.com') =>
  new Request('https://isuntv.com/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Origin: origin },
    body: JSON.stringify(data),
  });
assert.equal(
  (await contact.POST(req(fields, 'https://untrusted.example'))).status,
  403,
);
assert.equal(
  (await contact.POST(req({ ...fields, email: 'invalid' }))).status,
  400,
);
assert.equal(
  (await contact.POST(req({ ...fields, message: 'x'.repeat(17000) }))).status,
  413,
);
assert.equal((await contact.POST(req())).status, 503);
Object.assign(contact.env, {
  CONTACT_FORM_ENABLED: 'true',
  RESEND_API_KEY: 'test-fixture-not-a-secret',
  CONTACT_FROM_EMAIL: 'fixture@example.com',
});
const originalFetch = globalThis.fetch;
try {
  globalThis.fetch = async () => new Response('{}', { status: 500 });
  assert.equal((await contact.POST(req())).status, 502);
  globalThis.fetch = async () => new Response('{}', { status: 200 });
  assert.equal((await contact.POST(req())).status, 502);
  globalThis.fetch = async (url, options) => {
    assert.equal(url, 'https://api.resend.com/emails');
    const payload = JSON.parse(options.body);
    assert.deepEqual(payload.to, ['partner@isuntv.com']);
    assert.equal(payload.reply_to, 'qa@example.com');
    assert.equal(payload.from, 'fixture@example.com');
    return Response.json({ id: 'fixture-provider-acceptance' });
  };
  assert.equal((await contact.POST(req())).status, 202);
  console.log(
    'Contact origin, validation, size limits, disabled configuration, provider rejection and acceptance checks passed with mocked delivery; no email sent.',
  );
} finally {
  globalThis.fetch = originalFetch;
  rmSync(temp, { recursive: true, force: true });
}
