import type { MetadataRoute } from 'next';
// Preview remains crawlable so crawlers can read noindex. Change only at approved cutover.
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: '*', allow: '/' } };
}
