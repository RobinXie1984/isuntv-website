import '../brand.css';
import { IdentityGraph } from '../../components/identity-graph';
import type { Metadata } from 'next';
import { languageAlternates } from '../../lib/metadata';
import { notFound } from 'next/navigation';
import { copy, locales, type Locale } from '../../lib/catalogue';
import '../globals.css';
export function generateStaticParams() {
  return locales.filter((l) => l !== 'zh-Hant').map((locale) => ({ locale }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!locales.includes(locale as Locale) || locale === 'zh-Hant') notFound();
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
  if (!locales.includes(locale as Locale) || locale === 'zh-Hant') notFound();
  return (
    <html lang={locale} dir={locale === 'he' ? 'rtl' : 'ltr'}>
      <head>
        <link rel="preconnect" href="https://i.ytimg.com" />
      </head>
      <body>
        <IdentityGraph />
        {children}
      </body>
    </html>
  );
}
