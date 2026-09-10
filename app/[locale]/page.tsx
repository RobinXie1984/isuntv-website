import { languageAlternates, checkedLocale } from '../../lib/metadata';
import { BrandHome } from '../brand-home';
import { brandMetadata } from '../../lib/brand-pages';
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
  return locale === 'en' ? (
    <BrandHome locale="en" />
  ) : (
    <Catalogue locale={locale as Locale} />
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  return (await params).locale === 'en'
    ? brandMetadata('', 'en')
    : {
        alternates: languageAlternates(
          'programmes',
          checkedLocale((await params).locale),
        ),
      };
}
