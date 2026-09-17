import { defaultLocale } from '../../lib/site-profile';
import '../brand.css';
import { IdentityGraph } from '../../components/identity-graph';
import type { Metadata } from 'next';
import { languageAlternates } from '../../lib/metadata';
import NotFound from '../not-found';
import { copy, locales, type Locale } from '../../lib/catalogue';
import '../globals.css';
export function generateStaticParams() {
  return locales.filter((l) => l !== defaultLocale).map((locale) => ({ locale }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  // The route's page rejects invalid locales. Its 404 fallback still needs a
  // renderable layout; throwing again here crashes the static 404 renderer.
  if (!locales.includes(locale as Locale) || locale === defaultLocale)
    return { title: 'Page not found | iSunTV', robots: { index: false, follow: true } };
  const t = copy[locale as Locale];
  return {
    title: `${t.title} | ${t.series}`,
    description: t.intro,
    robots: { index: true, follow: true },
    icons: { icon: '/isuntv-logo.png' },
    alternates: languageAlternates('', locale as Locale),
  };
}
export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale) || locale === defaultLocale)
    return <html lang={defaultLocale}><body><NotFound /></body></html>;
  return (
    <html lang={locale} dir={locale === 'he' ? 'rtl' : 'ltr'}>
      <head>
      </head>
      <body>
        <IdentityGraph />
        {children}
      </body>
    </html>
  );
}
