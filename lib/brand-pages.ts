import type { Metadata } from 'next';
export type BrandLocale = 'zh-Hant' | 'en';
export const brandPaths = [
  'about',
  'global',
  'interviews',
  'chairman',
  'robin',
  'licensing',
  'verify',
  'contact',
  'privacy',
] as const;
export const pageTitles: Record<string, [string, string]> = {
  '': [
    '陽光衛視｜連接華商，影響世界',
    'iSunTV | A brighter China, a wider world',
  ],
  about: ['關於陽光｜媒體使命', 'About | Our mission'],
  global: ['華商出海', 'Chinese entrepreneurs going global'],
  interviews: ['採訪精選', 'Selected interviews'],
  chairman: ['陳平｜陽光衛視董事局主席', 'Chen Ping | Chairman of iSunTV'],
  robin: [
    '謝玢 Robin Xie｜陽光衛視執行董事',
    'Robin Xie | Executive Director of iSunTV',
  ],
  licensing: ['品牌授權', 'Brand licensing'],
  verify: ['授權查驗', 'Verify an authorization'],
  contact: ['聯絡我們', 'Contact'],
  privacy: ['私隱說明', 'Privacy notice'],
};
export function brandPath(path: string, locale: BrandLocale) {
  return `${locale === 'en' ? '/en' : ''}/${path}`.replace(/\/$/, '') || '/';
}
export function brandMetadata(
  path: string,
  locale: BrandLocale = 'zh-Hant',
): Metadata {
  const title = pageTitles[path][locale === 'en' ? 1 : 0];
  const description =
    locale === 'en'
      ? 'iSunTV: Chinese entrepreneurs, selected interviews and verifiable brand partnerships. Meet Executive Director Robin Xie.'
      : '陽光衛視：華商出海、採訪精選與品牌授權。認識執行董事謝玢 Robin Xie，查驗官方授權。';
  return {
    title,
    description,
    robots: { index: false, follow: true },
    alternates: {
      canonical: `https://isuntv.com${brandPath(path, locale)}`,
      languages: {
        'zh-Hant': `https://isuntv.com${brandPath(path, 'zh-Hant')}`,
        en: `https://isuntv.com${brandPath(path, 'en')}`,
        'x-default': `https://isuntv.com${brandPath(path, 'zh-Hant')}`,
      },
    },
    openGraph: {
      title,
      description,
      type: 'website',
      siteName: 'iSunTV 陽光衛視',
      url: `https://isuntv.com${brandPath(path, locale)}`,
    },
    twitter: { card: 'summary', title, description },
  };
}
