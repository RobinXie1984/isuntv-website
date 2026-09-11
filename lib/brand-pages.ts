import { globalContent } from './global-content';
import type { Metadata } from 'next';
import { translator } from './brand-i18n';
export const brandLocales = ['zh-Hant', 'zh-Hans', 'en', 'ja', 'he'] as const;
export type BrandLocale = (typeof brandLocales)[number];
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
    '谢玢｜陽光衛視執行董事',
    'Robin Xie | Executive Director of iSunTV',
  ],
  licensing: ['品牌授權', 'Brand licensing'],
  verify: ['授權查驗', 'Verify an authorization'],
  contact: ['聯絡我們', 'Contact'],
  privacy: ['私隱說明', 'Privacy notice'],
};
export const pageDescriptions: Record<string, [string, string]> = {
  "": [
    "陽光衛視是香港衛星電視頻道，連接華商與國際機遇，提供人文紀錄、採訪精選及品牌合作資訊。",
    "iSunTV is a Hong Kong satellite television channel connecting Chinese entrepreneurs with international opportunities, documentaries, interviews and brand partnerships."
  ],
  "about": [
    "了解陽光衛視的媒體使命、人文紀錄傳承及泰德陽光集團關係：以影像記錄時代，以連接創造可能。",
    "Explore iSunTV’s media mission, documentary heritage and relationship with TideiSun Group: recording our times and connecting a wider world."
  ],
  "global": [
    "陽光衛視以香港為起點，透過品牌敘事、深度訪談與國際連接，與華商探討出海合作。",
    "Explore international collaboration with iSunTV through brand storytelling, in-depth interviews and connections from Hong Kong."
  ],
  "interviews": [
    "觀看陽光衛視採訪精選：百年巨匠、人生在線、名人自述及口述歷史，走進人物的創作、事業與時代記憶。",
    "Explore Masters of a Century, Life Online, Personal Accounts and Oral History: iSunTV stories about creative work, careers and lived history."
  ],
  "chairman": [
    "陳平，陽光衛視董事局主席、泰德陽光集團創辦人。閱讀其政策研究、企業經營、媒體及科技實踐的精簡介紹。",
    "Meet Chen Ping, Chairman of iSunTV and founder of TideiSun Group, through his work in policy research, entrepreneurship, media and technology."
  ],
  "robin": [
    "謝玢 Robin Xie，陽光衛視執行董事、泰德陽光集團管理合夥人，負責陽光衛視品牌合作與授權事務。",
    "Robin Xie, Executive Director of iSunTV and Managing Partner of TideiSun Group, leads iSunTV brand partnerships and licensing."
  ],
  "licensing": [
    "了解陽光衛視品牌合作範圍、申請及查驗流程。正式授權須經董事會及管理團隊批准；謝玢 Robin Xie 為品牌授權負責人。",
    "Review iSunTV’s brand partnership and licensing process. Authorization requires board and management approval; Robin Xie leads licensing."
  ],
  "verify": [
    "查詢陽光衛視授權的機構、範圍及期限。公開登記尚在準備中，現階段請聯絡授權信箱核實。",
    "Check iSunTV authorization scope, organization and dates. While the public register is being prepared, contact the licensing team for confirmation."
  ],
  "contact": [
    "聯絡陽光衛視洽談華商出海、採訪及品牌合作。香港總部與集團全球辦公室；商務信箱 partner@isuntv.com。",
    "Contact iSunTV for international collaboration, interviews and brand partnerships. Hong Kong headquarters and group offices; partner@isuntv.com."
  ],
  "privacy": [
    "了解陽光衛視如何使用合作查詢資料，以及更正、刪除資料和聯絡方式。",
    "Learn how iSunTV handles business enquiry information and how to request correction or deletion."
  ]
};
export function brandPath(path: string, locale: BrandLocale) {
  return `${locale === 'zh-Hant' ? '' : '/' + locale}/${path}`.replace(/\/$/, '') || '/';
}
export function brandMetadata(
  path: string,
  locale: BrandLocale = 'zh-Hant',
): Metadata {
  const t = translator(locale);
  const title = path === 'robin' ? `${t('謝玢 Robin Xie', 'Robin Xie')} | ${t('陽光衛視執行董事 · 泰德陽光集團管理合夥人', 'Executive Director of iSunTV · Managing Partner of TideiSun Group')}` : t(...pageTitles[path]);
  const description = path === 'global' ? globalContent[locale].mission : t(...pageDescriptions[path]);
  return {
    title,
    description,
    robots: { index: true, follow: true },
    alternates: {
      canonical: `https://isuntv.com${brandPath(path, locale)}`,
      languages: Object.fromEntries([...brandLocales.map(l => [l, `https://isuntv.com${brandPath(path, l)}`]), ['x-default', `https://isuntv.com${brandPath(path, 'zh-Hant')}`]]),
    },
    openGraph: {
      title,
      description,
      type: 'website',
      siteName: 'iSunTV 陽光衛視',
      locale: { 'zh-Hant': 'zh_TW', 'zh-Hans': 'zh_CN', en: 'en_US', ja: 'ja_JP', he: 'he_IL' }[locale],
      alternateLocale: brandLocales.filter(l => l !== locale).map(l => ({ 'zh-Hant': 'zh_TW', 'zh-Hans': 'zh_CN', en: 'en_US', ja: 'ja_JP', he: 'he_IL' })[l]),
      url: `https://isuntv.com${brandPath(path, locale)}`,
    },
    twitter: { card: 'summary', title, description },
  };
}
