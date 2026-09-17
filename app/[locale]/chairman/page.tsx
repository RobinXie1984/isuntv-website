import { defaultLocale } from '../../../lib/site-profile';
import { locales as staticLocales } from '../../../lib/catalogue';
import { checkedLocale } from '../../../lib/metadata';
import { BrandContent } from '../../brand-content';
import { brandMetadata } from '../../../lib/brand-pages';
export async function generateMetadata({params}: {params: Promise<{locale: string}>}) { return brandMetadata('chairman', checkedLocale((await params).locale)); }
export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ id?: string }>;
}) {
  const locale = checkedLocale((await params).locale);
  const q = process.env.ISUN_STATIC_EXPORT === '1' ? {} as Awaited<typeof searchParams> : await searchParams;
  return (
    <BrandContent
      path="chairman"
      locale={locale}
      id={typeof q.id === 'string' ? q.id.slice(0, 100) : ''}
    />
  );
}

export function generateStaticParams() { return staticLocales.filter(locale => locale !== defaultLocale).map(locale => ({ locale })); }
