import translations from './brand-translations.json';
import type { BrandLocale } from './brand-pages';
const phrases = translations as Record<string, Record<string, string>>;
// Source pairs remain readable in the components. Published translations are authored
// by paragraph; no translation service, tracking request or client dictionary is loaded.
export function translator(locale: BrandLocale) {
  return (zh: string, en: string): string => {
    if (locale === 'zh-Hant') return zh;
    if (locale === 'en') return en;
    const value = phrases[en]?.[locale];
    if (!value) throw new Error(`Missing ${locale} translation: ${en}`);
    return value;
  };
}
