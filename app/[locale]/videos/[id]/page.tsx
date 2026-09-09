import { videoMetadata, checkedLocale } from '../../../../lib/metadata';
import { Video } from '../../../video';
import { type Locale, locales } from '../../../../lib/catalogue';
import { notFound } from 'next/navigation';
export default async function Page({
  params,
}: {
  params: Promise<{ id: string; locale?: string }>;
}) {
  const p = await params;
  const locale = p.locale;
  if (!locales.includes(locale as Locale)) notFound();
  return <Video locale={locale as Locale} id={p.id} />;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string; locale?: string }>;
}) {
  const p = await params;
  return videoMetadata(checkedLocale(p.locale), p.id);
}
