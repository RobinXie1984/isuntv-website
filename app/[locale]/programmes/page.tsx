import { defaultLocale } from '../../../lib/site-profile';
import { locales as staticLocales } from '../../../lib/catalogue';
import { Catalogue } from '../../catalogue';
import { checkedLocale, languageAlternates } from '../../../lib/metadata';
export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  return <Catalogue locale={checkedLocale((await params).locale)} />;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = checkedLocale((await params).locale);
  return { alternates: languageAlternates('programmes', locale) };
}

export function generateStaticParams() { return staticLocales.filter(locale => locale !== defaultLocale).map(locale => ({ locale })); }
