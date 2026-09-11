'use client';
import { useEffect, useRef } from 'react';
import type { BrandLocale } from '../lib/brand-pages';
const languages = [['zh-Hant', '繁體中文'], ['zh-Hans', '简体中文'], ['en', 'English'], ['ja', '日本語'], ['he', 'עברית']] as const;
export function LanguageMenu({locale, path = ''}: {locale: BrandLocale; path?: string}) {
  const root = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    const node = root.current;
    if (!node) return;
    for (const link of node.querySelectorAll<HTMLAnchorElement>('a')) {
      const target = new URL(link.href); target.search = window.location.search; target.hash = window.location.hash; link.href = target.href;
    }
    const escape = (event: KeyboardEvent) => { if (event.key === 'Escape') { node.open = false; node.querySelector('summary')?.focus(); } };
    const outside = (event: PointerEvent) => { if (!node.contains(event.target as Node)) node.open = false; };
    node.addEventListener('keydown', escape); document.addEventListener('pointerdown', outside);
    return () => { node.removeEventListener('keydown', escape); document.removeEventListener('pointerdown', outside); };
  }, [path]);
  const label = {'zh-Hant':'選擇語言', 'zh-Hans':'选择语言', en:'Choose language', ja:'言語を選択', he:'בחירת שפה'}[locale];
  const cleanPath = path.replace(/^\/+|\/+$/g, '');
  return <details ref={root} className="language-menu"><summary aria-label={label}><span aria-hidden="true">🌐</span><span className="language-current">{languages.find(([code]) => code === locale)?.[1]}</span><span aria-hidden="true">⌄</span></summary><nav className="language-options" aria-label={label}>{languages.map(([code, name]) => <a key={code} href={`${code === 'zh-Hant' ? '' : '/' + code}/${cleanPath}`.replace(/\/$/, '') || '/'} hrefLang={code} lang={code} dir={code === 'he' ? 'rtl' : 'ltr'} aria-current={code === locale ? 'page' : undefined}>{name}{code === locale ? ' ✓' : ''}</a>)}</nav></details>;
}
