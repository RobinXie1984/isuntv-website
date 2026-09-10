export const dynamic = 'force-dynamic';
export const revalidate = 0;
import { BrandContent } from '../../brand-content';
import { brandMetadata } from '../../../lib/brand-pages';
export const metadata = brandMetadata('verify');
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const q = await searchParams;
  return (
    <BrandContent
      path="verify"
      id={typeof q.id === 'string' ? q.id.slice(0, 100) : ''}
    />
  );
}
