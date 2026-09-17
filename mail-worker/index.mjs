// Independent iSun1 endpoint. Secrets stay in Cloudflare encrypted bindings.
const origins = new Set(['https://isun1.com', 'https://www.isun1.com']);
const encoder = new TextEncoder();
const recent = new Map();
const RELAY_URL = 'https://script.google.com/macros/s/AKfycbweZ9Gk2-ifSerj0C7QqlmkX3RMUbUUKmBaZd6sRanQ_D6-rQjXwLF_YsRuzz77DI2FiQ/exec';
export default {
  async fetch(request, env) {
    const origin = request.headers.get('origin') || '';
    const headers = {'Cache-Control':'no-store', 'Content-Type':'application/json', 'X-Content-Type-Options':'nosniff', 'X-Robots-Tag':'noindex', 'Vary':'Origin'};
    if (origins.has(origin)) Object.assign(headers, {'Access-Control-Allow-Origin':origin, 'Access-Control-Allow-Methods':'POST, OPTIONS', 'Access-Control-Allow-Headers':'Content-Type', 'Access-Control-Max-Age':'600'});
    const reply = (status, message, extra = {}) => new Response(JSON.stringify({message,...extra}), {status,headers});
    const path = new URL(request.url).pathname;
    if (path === '/health' && ['GET','HEAD'].includes(request.method)) return reply(200, 'iSun1 enquiry service');
    if (path !== '/contact') return reply(404, 'Not found');
    if (!origins.has(origin)) return reply(403, 'Invalid origin');
    if (request.method === 'OPTIONS') return new Response(null, {status:204,headers});
    if (request.method !== 'POST') return reply(405, 'POST required');
    if (!request.headers.get('content-type')?.startsWith('application/json')) return reply(415, 'JSON required');
    if (Number(request.headers.get('content-length') || 0) > 16000) return reply(413, 'Request too large');
    if (!env.RELAY_SECRET || env.ENABLED !== 'true') return reply(503, 'Online enquiries are temporarily unavailable');
    try {
      const reader = request.body?.getReader();
      if (!reader) return reply(400, 'Missing body');
      let size = 0, text = ''; const decoder = new TextDecoder();
      while (true) {
        const {done,value} = await reader.read(); if (done) break;
        size += value.byteLength;
        if (size > 16000) {await reader.cancel(); return reply(413, 'Request too large');}
        text += decoder.decode(value, {stream:true});
      }
      text += decoder.decode();
      let input;
      try {input=JSON.parse(text);} catch {return reply(400, 'Invalid JSON');}
      if (!input || Array.isArray(input) || typeof input !== 'object') return reply(400, 'Invalid request');
      const str = key => typeof input[key] === 'string' ? input[key].trim() : '';
      const name=str('name'), organization=str('organization'), email=str('email'), interest=str('interest'), message=str('message');
      if (str('website') || str('consent') !== 'yes' || !name || name.length>100 || !organization || organization.length>150 || email.length>254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || message.length<10 || message.length>4000 || !['global','interviews','licensing','other'].includes(interest)) return reply(400, 'Invalid fields');
      const key=await crypto.subtle.importKey('raw',encoder.encode(env.RELAY_SECRET),{name:'HMAC',hash:'SHA-256'},false,['sign']);
      const hmac=async value=>Array.from(new Uint8Array(await crypto.subtle.sign('HMAC',key,encoder.encode(value))), b=>b.toString(16).padStart(2,'0')).join('');
      const visitor=await hmac(request.headers.get('cf-connecting-ip') || 'unknown-visitor');
      const now=Date.now();
      // Per-isolate burst guard is supplementary; the signed relay enforces global limits.
      if (recent.size>2000) for (const [id,time] of recent) if (now-time>10000) recent.delete(id);
      if (now-(recent.get(visitor)||0)<10000) return reply(429, 'Please wait before submitting again');
      recent.set(visitor,now);
      const payload=JSON.stringify({name,organization,email,interest,message,timestamp:now,nonce:crypto.randomUUID(),visitor});
      const response=await fetch(RELAY_URL,{method:'POST',redirect:'follow',headers:{'Content-Type':'application/json'},body:JSON.stringify({payload,signature:await hmac(payload)}),signal:AbortSignal.timeout(15000)});
      if (!response.ok) return reply(502, 'Delivery could not be confirmed');
      const result=await response.json();
      if (result.reason==='rate-limit') return reply(429, 'Please try later or email admin@tideisun.com');
      if (result.accepted!==true || !/^[a-f0-9-]{36}$/.test(result.id||'')) return reply(502, 'Delivery could not be confirmed');
      return reply(202, 'Accepted for delivery', {id:result.id});
    } catch {return reply(502, 'Delivery could not be confirmed');}
  }
};
