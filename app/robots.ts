import type { MetadataRoute } from 'next';
import { publicOrigin } from '../lib/site-config.json';
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: '*', allow: '/' }, sitemap: `${publicOrigin}/sitemap.xml` };
}
