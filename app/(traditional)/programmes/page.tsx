import { defaultLocale } from '../../../lib/site-profile';
import { Catalogue } from '../../catalogue';
import { languageAlternates } from '../../../lib/metadata';
export const metadata = {
  title: '经典节目 | iSunTV',
  alternates: languageAlternates('programmes', defaultLocale),
};
export default function Page() {
  return <Catalogue locale={defaultLocale} />;
}
