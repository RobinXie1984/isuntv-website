import { Catalogue } from '../catalogue';
import { locales, type Locale } from '../../lib/catalogue';
import { notFound } from 'next/navigation';
export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale) || locale === 'zh-Hant') notFound();
  return <Catalogue locale={locale as Locale} />;
}
