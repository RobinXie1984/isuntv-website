import { defaultLocale } from '../lib/site-profile';
/* oxlint-disable next/no-html-link-for-pages -- Error recovery uses native document navigation without loading the client router link shim. */
export default function NotFound() {
  return (
    <main style={{ padding: '5rem 6%', fontFamily: 'sans-serif' }}>
      <h1>{defaultLocale === 'zh-Hant' ? '找不到頁面' : '找不到页面'} · Page not found</h1>
      <p>{defaultLocale === 'zh-Hant' ? '請返回節目目錄。' : '请返回节目目录。'}Return to the programme collection.</p>
      <a href="/">{defaultLocale === 'zh-Hant' ? '陽光衛視' : '阳光卫视'} iSunTV →</a>
    </main>
  );
}
