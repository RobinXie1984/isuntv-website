import { programmes } from '../../../../lib/catalogue';
import { programmeMetadata, checkedLocale } from '../../../../lib/metadata';
import { Programme } from '../../../programme';
import { type Locale, locales } from '../../../../lib/catalogue';
import { notFound } from 'next/navigation';
export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string; locale?: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const p = await params;
  const locale = p.locale;
  if (!locales.includes(locale as Locale)) notFound();
  return (
    <Programme
      locale={locale as Locale}
      slug={p.slug}
      pageRaw={(process.env.ISUN_STATIC_EXPORT === '1' ? undefined : (await searchParams).page)}
    />
  );
}

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string; locale?: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const p = await params;
  return programmeMetadata(checkedLocale(p.locale), p.slug, (process.env.ISUN_STATIC_EXPORT === '1' ? undefined : (await searchParams).page));
}

export function generateStaticParams() { return programmes.map(p => ({ slug: p.slug })); }
