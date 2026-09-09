import type { Metadata } from 'next';
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
    robots: { index: false, follow: false },
    icons: { icon: '/isuntv-logo.png' },
    alternates: {
      languages: {
        'zh-Hant': '/',
        'zh-Hans': '/zh-Hans/',
        en: '/en/',
        ja: '/ja/',
      },
    },
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
    <html lang={locale}>
      <body>{children}</body>
    </html>
  );
}
