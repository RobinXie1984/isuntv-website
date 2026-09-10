import '../brand.css';
import { IdentityGraph } from '../../components/identity-graph';
import type { Metadata } from 'next';
import { languageAlternates } from '../../lib/metadata';
import '../globals.css';
export const metadata: Metadata = {
  title: '陽光衛視 iSunTV | 人文・歷史・紀錄',
  description: '探索陽光衛視的人文、歷史與紀錄節目。',
  robots: { index: false, follow: true },
  icons: { icon: '/isuntv-logo.png' },
  alternates: languageAlternates('', 'zh-Hant'),
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hant">
      <head>
        <link rel="preconnect" href="https://i.ytimg.com" />
      </head>
      <body>
        <IdentityGraph />
        {children}
      </body>
    </html>
  );
}
