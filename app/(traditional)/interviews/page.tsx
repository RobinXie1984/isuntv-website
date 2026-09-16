import { BrandContent } from '../../brand-content';
import { brandMetadata } from '../../../lib/brand-pages';
export const metadata = brandMetadata('interviews');
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const q = process.env.ISUN_STATIC_EXPORT === '1' ? {} as Awaited<typeof searchParams> : await searchParams;
  return (
    <BrandContent
      path="interviews"
      id={typeof q.id === 'string' ? q.id.slice(0, 100) : ''}
    />
  );
}
