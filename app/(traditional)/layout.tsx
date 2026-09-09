import type { Metadata } from 'next';
import '../globals.css';
export const metadata: Metadata = {
  title: '陽光衛視 iSunTV | 人文・歷史・紀錄',
  description: '探索陽光衛視的人文、歷史與紀錄節目。',
  robots: { index: false, follow: false },
  icons: { icon: '/isuntv-logo.png' },
  alternates: {
    languages: {
      'zh-Hant': '/',
      'zh-Hans': '/zh-Hans/',
      en: '/en/',
      ja: '/ja/',
    },
  },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hant">
      <body>{children}</body>
    </html>
  );
}
