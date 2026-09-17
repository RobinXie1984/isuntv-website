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
  icons: { icon: '/isuntv-logo.png' },
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
