import { publicOrigin } from '../lib/site-profile';
import { writeFileSync } from 'node:fs';
import sitemap from '../app/sitemap';
const escape = (value: string) => value.replace(/[<>&"']/g, c => ({'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;',"'":'&apos;'}[c]!));
const entries = sitemap();
const xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n' + entries.map(entry => {
  const links = Object.entries(entry.alternates?.languages ?? {}).map(([lang, url]) => `<xhtml:link rel="alternate" hreflang="${escape(lang)}" href="${escape(String(url))}"/>`).join('');
  return `<url><loc>${escape(entry.url)}</loc>${links}</url>`;
}).join('\n') + '\n</urlset>\n';
writeFileSync('dist/client/sitemap.xml', xml);
writeFileSync('dist/client/robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${publicOrigin}/sitemap.xml\n`);
