import { Catalogue } from '../../catalogue';
export const metadata = {
  title: '經典節目 | iSunTV',
  alternates: { canonical: 'https://isuntv.com/programmes' },
};
export default function Page() {
  return <Catalogue locale="zh-Hant" />;
}
