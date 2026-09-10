import { BrandHome } from '../brand-home';
import { brandMetadata } from '../../lib/brand-pages';
export const metadata = brandMetadata('');
export default function Home() {
  return <BrandHome />;
}
