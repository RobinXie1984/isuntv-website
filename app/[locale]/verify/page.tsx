export const dynamic = 'force-dynamic';
export const revalidate = 0;
import { notFound } from 'next/navigation';
import { BrandContent } from '../../brand-content';
import { brandMetadata } from '../../../lib/brand-pages';
export const metadata = brandMetadata('verify', 'en');
export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ id?: string }>;
}) {
  if ((await params).locale !== 'en') notFound();
  const q = await searchParams;
  return (
    <BrandContent
      path="verify"
      locale="en"
      id={typeof q.id === 'string' ? q.id.slice(0, 100) : ''}
    />
  );
}
