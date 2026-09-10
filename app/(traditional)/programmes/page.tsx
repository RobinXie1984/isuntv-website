import { Catalogue } from '../../catalogue';
import { languageAlternates } from '../../../lib/metadata';
export const metadata = {
  title: '經典節目 | iSunTV',
  alternates: languageAlternates('programmes', 'zh-Hant'),
};
export default function Page() {
  return <Catalogue locale="zh-Hant" />;
}
