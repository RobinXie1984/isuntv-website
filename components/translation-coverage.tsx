import { coverageCopy, translationCoverage } from '../lib/translation-coverage';
import type { Locale } from '../lib/catalogue';
export function TranslationCoverage({ locale }: { locale: Locale }) {
  const { total, translated } = translationCoverage(locale);
  const text = coverageCopy[locale];
  return <aside className="source-note translation-coverage"><p>{text[1]}</p><p>{text[0]}: <bdi>{translated} / {total}</bdi></p></aside>;
}
