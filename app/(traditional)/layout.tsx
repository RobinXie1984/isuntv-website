import { copy } from '../../lib/catalogue';
import { defaultLocale } from '../../lib/site-profile';
import '../brand.css';
import { IdentityGraph } from '../../components/identity-graph';
import type { Metadata } from 'next';
import { languageAlternates } from '../../lib/metadata';
import '../globals.css';
export const metadata: Metadata = {
  title: `${copy[defaultLocale].title} | ${copy[defaultLocale].series}`,
  description: copy[defaultLocale].intro,
  robots: { index: true, follow: true },
  icons: { icon: [{ url: '/brand/favicon-32.png', sizes: '32x32', type: 'image/png' }, { url: '/brand/icon-192.png', sizes: '192x192', type: 'image/png' }], shortcut: '/brand/favicon-32.png', apple: [{ url: '/brand/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }] },
  alternates: languageAlternates('', defaultLocale),
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={defaultLocale}>
      <head>
      </head>
      <body>
        <IdentityGraph />
        {children}
      </body>
    </html>
  );
}
