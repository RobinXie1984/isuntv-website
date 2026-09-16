import NotFound from './not-found';

export const metadata = {
  title: '找不到页面 · Page not found | iSunTV',
  robots: { index: false, follow: true },
};

export default function GlobalNotFound() {
  return <html lang="zh-Hans"><body><NotFound /></body></html>;
}
