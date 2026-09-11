import { checkedLocale } from '../../../lib/metadata';
import { BrandContent } from '../../brand-content';
import { brandMetadata } from '../../../lib/brand-pages';
export async function generateMetadata({params}: {params: Promise<{locale: string}>}) { return brandMetadata('interviews', checkedLocale((await params).locale)); }
export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ id?: string }>;
}) {
  const locale = checkedLocale((await params).locale);
  const q = await searchParams;
  return (
    <BrandContent
      path="interviews"
      locale={locale}
      id={typeof q.id === 'string' ? q.id.slice(0, 100) : ''}
    />
  );
}
