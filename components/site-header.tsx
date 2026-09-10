import { Search } from 'lucide-react';
import { searchCopy } from '../lib/search-copy';
/* oxlint-disable nextjs/no-img-element -- Fixed-size source thumbnails and the small official logo use direct images; no image proxy or optimizer is needed. */
import {
  copy,
  locales,
  localeNames,
  homePath,
  sitePath,
  type Locale,
} from '../lib/catalogue';
export function SiteHeader({
  locale,
  path = '',
}: {
  locale: Locale;
  path?: string;
}) {
  const t = copy[locale];
  const aboutShort = {
    'zh-Hant': '關於',
    'zh-Hans': '关于',
    en: 'About',
    ja: '紹介',
  }[locale];
  return (
    <>
      <a className="skip" href="#main">
        {t.skip}
      </a>
      <header className="masthead">
        <a href={homePath(locale)} className="brand" aria-label={t.title}>
          <img
            src="/isuntv-logo.png"
            width="200"
            height="100"
            alt="iSunTV 陽光衛視"
          />
        </a>
        <nav className="main-nav" aria-label={t.nav}>
          <a href={sitePath(locale, 'programmes')}>{t.nav}</a>
          <a href={'/about'} aria-label={t.about}>
            {aboutShort}
          </a>
          <a
            className="nav-search"
            href={sitePath(locale, 'search')}
            aria-label={searchCopy[locale].title}
          >
            <Search size={20} />
          </a>
        </nav>
        <nav className="languages" aria-label={t.lang}>
          {locales.map((l) => (
            <a
              key={l}
              href={sitePath(l, path)}
              hrefLang={l}
              aria-current={l === locale ? 'page' : undefined}
            >
              {localeNames[l]}
            </a>
          ))}
        </nav>
      </header>
    </>
  );
}
