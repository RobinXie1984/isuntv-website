import { BrandContent } from '../../brand-content';
import { brandMetadata } from '../../../lib/brand-pages';
export const metadata = brandMetadata('about');
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const q = await searchParams;
  return (
    <BrandContent
      path="about"
      id={typeof q.id === 'string' ? q.id.slice(0, 100) : ''}
    />
  );
}
