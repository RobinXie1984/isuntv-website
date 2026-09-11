import { translator } from '../lib/brand-i18n';
/* oxlint-disable nextjs/no-img-element */
import { LanguageMenu } from './language-menu';
import { Search, ArrowUpRight } from 'lucide-react';
import { brandPath, type BrandLocale } from '../lib/brand-pages';
export function BrandHeader({
  locale = 'zh-Hant',
  path = '',
}: {
  locale?: BrandLocale;
  path?: string;
}) {
  const t = translator(locale);
  return (
    <>
      <a className="skip" href="#main">
        {t('跳至主要內容', 'Skip to content')}
      </a>
      <header className="brand-header">
        <a href={brandPath('', locale)} aria-label="iSunTV 陽光衛視">
          <img
            src="/isuntv-logo.png"
            width="200"
            height="100"
            alt="iSunTV 陽光衛視"
          />
        </a>
        <div className="brand-motto">
          <span>{t('連接華商　影響世界', 'Connecting entrepreneurs worldwide')}</span>
          <small>A BRIGHTER CHINA, A WIDER WORLD</small>
        </div>
        <nav aria-label={t('主要導覽', 'Main navigation')}>
          {[
            ['about', '關於陽光', 'About'],
            ['global', '華商出海', 'Going global'],
            ['interviews', '採訪精選', 'Interviews'],
            ['licensing', '品牌授權', 'Licensing'],
          ].map(([p, zh, e]) => (
            <a
              key={p}
              href={brandPath(p, locale)}
              aria-current={path === p ? 'page' : undefined}
            >
              {t(zh, e)}
            </a>
          ))}
        </nav>
        <a
          className="brand-search"
          href={brandPath('search', locale)}
          aria-label={t('搜尋', 'Search')}
        >
          <Search size={19} />
        </a>
        <LanguageMenu locale={locale} path={path} />
        <a className="brand-button small" href={brandPath('contact', locale)}>
          {t('聯絡我們', 'Contact')}
        </a>
      </header>
    </>
  );
}
export function BrandFooter({ locale = 'zh-Hant' }: { locale?: BrandLocale }) {
  const t = translator(locale);
  return (
    <footer className="brand-footer">
      <div>
        <strong>陽光衛視 iSunTV</strong>
        <p>A BRIGHTER CHINA, A WIDER WORLD</p>
        <p>© {new Date().getFullYear()} iSunTV · Hong Kong</p>
      </div>
      <div className="footer-links">
        {[
          ['chairman', '董事局主席', 'Chairman'],
          ['robin', '執行董事', 'Executive Director'],
          ['verify', '授權查驗', 'Verify authorization'],
          ['privacy', '私隱說明', 'Privacy'],
          ['contact', '聯絡我們', 'Contact'],
        ].map(([p, z, e]) => (
          <a key={p} href={brandPath(p, locale)}>
            {t(z, e)}
          </a>
        ))}
        <a href="https://www.tideisun.com/">
          TideiSun Group <ArrowUpRight size={14} />
        </a>
      </div>
    </footer>
  );
}
export function BrandShell({
  children,
  path,
  locale = 'zh-Hant',
}: {
  children: React.ReactNode;
  path: string;
  locale?: BrandLocale;
}) {
  return (
    <div className="institutional" lang={locale} dir={locale === 'he' ? 'rtl' : 'ltr'}>
      <BrandHeader path={path} locale={locale} />
      <main id="main">{children}</main>
      <BrandFooter locale={locale} />
    </div>
  );
}
