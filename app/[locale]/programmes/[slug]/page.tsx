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
      pageRaw={(await searchParams).page}
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
  return programmeMetadata(checkedLocale(p.locale), p.slug, (await searchParams).page);
}
