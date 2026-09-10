import { env } from 'cloudflare:workers';
import { createHmac, randomUUID } from 'node:crypto';
type MailConfig = {
  RESEND_API_KEY?: string;
  CONTACT_FROM_EMAIL?: string;
  CONTACT_FORM_ENABLED?: string;
  GOOGLE_WORKSPACE_RELAY_URL?: string;
  GOOGLE_WORKSPACE_RELAY_SECRET?: string;
};
const allowedOrigins = new Set([
  'https://isuntv.com',
  'https://www.isuntv.com',
  'https://isuntv-rebuild-preview.robin10.chatgpt.site',
  'http://terminal.local:4173',
]);
const reply = (message: string, status: number) =>
  Response.json(
    { message },
    { status, headers: { 'Cache-Control': 'no-store' } },
  );
export async function POST(request: Request) {
  if (!allowedOrigins.has(request.headers.get('origin') ?? ''))
    return reply('Invalid origin', 403);
  if (!request.headers.get('content-type')?.startsWith('application/json'))
    return reply('JSON required', 415);
  if (Number(request.headers.get('content-length') ?? 0) > 16000)
    return reply('Request too large', 413);
  const reader = request.body?.getReader();
  if (!reader) return reply('Missing body', 400);
  let body = '',
    size = 0;
  const decoder = new TextDecoder();
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > 16000) {
      await reader.cancel();
      return reply('Request too large', 413);
    }
    body += decoder.decode(value, { stream: true });
  }
  body += decoder.decode();
  let input: Record<string, unknown>;
  try {
    input = JSON.parse(body);
    if (!input || Array.isArray(input) || typeof input !== 'object')
      return reply('Invalid request', 400);
  } catch {
    return reply('Invalid JSON', 400);
  }
  const str = (key: string) =>
    typeof input[key] === 'string' ? (input[key] as string).trim() : '';
  const name = str('name'),
    organization = str('organization'),
    email = str('email'),
    interest = str('interest'),
    message = str('message');
  if (
    str('website') ||
    str('consent') !== 'yes' ||
    !name ||
    name.length > 100 ||
    !organization ||
    organization.length > 150 ||
    email.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    message.length < 10 ||
    message.length > 4000 ||
    !['global', 'interviews', 'licensing', 'other'].includes(interest)
  )
    return reply('Invalid fields', 400);
  const config = env as unknown as MailConfig;
  // Enable only after provider setup, edge rate limiting and delivery verification.
  if (
    config.CONTACT_FORM_ENABLED !== 'true' ||
    !(config.GOOGLE_WORKSPACE_RELAY_URL && config.GOOGLE_WORKSPACE_RELAY_SECRET) &&
    !(config.RESEND_API_KEY && config.CONTACT_FROM_EMAIL)
  )
    return reply(
      'Email delivery is not configured. Contact partner@isuntv.com.',
      503,
    );
  try {
    if (config.GOOGLE_WORKSPACE_RELAY_URL && config.GOOGLE_WORKSPACE_RELAY_SECRET) {
      if (!/^https:\/\/script\.google\.com\/macros\/s\/[A-Za-z0-9_-]+\/exec$/.test(config.GOOGLE_WORKSPACE_RELAY_URL))
        return reply('Invalid mail configuration', 503);
      const hmac = (value: string) => createHmac('sha256', config.GOOGLE_WORKSPACE_RELAY_SECRET!).update(value).digest('hex');
      const payload = JSON.stringify({ name, organization, email, interest, message,
        timestamp: Date.now(), nonce: randomUUID(),
        visitor: hmac(request.headers.get('cf-connecting-ip') ?? 'unknown-visitor'),
      });
      const response = await fetch(config.GOOGLE_WORKSPACE_RELAY_URL, {
        method: 'POST', redirect: 'follow', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({payload, signature: hmac(payload)}),
        signal: AbortSignal.timeout(15000),
      });
      if (!response.ok) { console.warn('Enquiry relay HTTP status', response.status); return reply('Delivery failed', 502); }
      const result = await response.json() as { accepted?: boolean; id?: string; reason?: string };
      if (result.reason === 'rate-limit') return reply('Please try later or email partner@isuntv.com.', 429);
      if (result.accepted !== true || !result.id) { console.warn('Enquiry relay rejected', result.reason ?? 'validation-or-configuration'); return reply('Delivery was not confirmed', 502); }
      return reply('Accepted for delivery', 202);
    }
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${config.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: config.CONTACT_FROM_EMAIL,
        to: ['partner@isuntv.com'],
        reply_to: email,
        subject: `iSunTV business enquiry: ${interest}`,
        text: `Name: ${name}\nOrganization: ${organization}\nEmail: ${email}\nInterest: ${interest}\n\n${message}`,
      }),
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok)
      return reply('Delivery failed. Please email partner@isuntv.com.', 502);
    const result = (await response.json()) as { id?: string };
    if (!result.id) return reply('Delivery was not confirmed', 502);
    return reply('Accepted for delivery', 202);
  } catch (error) {
    console.warn('Enquiry delivery exception', error instanceof Error ? error.name : 'UnknownError');
    return reply('Delivery failed. Please email partner@isuntv.com.', 502);
  }
}
