import { defaultLocale } from '../../../lib/site-profile';
import { SearchPage } from '../../search';
import { checkedLocale, languageAlternates } from '../../../lib/metadata';
import { searchCopy } from '../../../lib/search-copy';
type Props = {
  params: Promise<{ locale?: string }>;
  searchParams: Promise<{ q?: string | string[]; page?: string | string[] }>;
};
export default async function Page({ params, searchParams }: Props) {
  const p = await params;
  const q = process.env.ISUN_STATIC_EXPORT === '1' ? {} as Awaited<typeof searchParams> : await searchParams;
  const locale = p.locale ? checkedLocale(p.locale) : defaultLocale;
  return <SearchPage locale={locale} query={q.q} pageRaw={q.page} />;
}
export async function generateMetadata({ params }: Props) {
  const p = await params;
  const locale = p.locale ? checkedLocale(p.locale) : defaultLocale;
  return {
    title: `${searchCopy[locale].title} | iSunTV`,
    robots: { index: false, follow: true },
    alternates: languageAlternates('search/', locale),
  };
}
