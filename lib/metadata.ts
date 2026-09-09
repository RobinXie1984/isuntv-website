import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { homePath, locales, type Locale } from './catalogue';
import { findVideo, getProgramme } from './collection';
import { detailCopy, drafts } from './editorial';

export function checkedLocale(value: string | undefined): Locale {
  if (!locales.includes(value as Locale) || value === 'zh-Hant') notFound();
  return value as Locale;
}
export function languageAlternates(path: string) {
  return {
    languages: Object.fromEntries(locales.map((l) => [l, homePath(l) + path])),
  };
}
export function programmeMetadata(locale: Locale, slug: string): Metadata {
  const programme = getProgramme(slug);
  if (!programme) notFound();
  return {
    title: `${programme.titles[locale]} | iSunTV`,
    description: `${programme.titles[locale]} · ${programme.topics[locale]}`,
    alternates: languageAlternates(`programmes/${slug}/`),
  };
}
export function videoMetadata(locale: Locale, id: string): Metadata {
  const video = findVideo(id);
  if (!video) notFound();
  const title = video.title ?? detailCopy[locale].missingTitle;
  const fields = drafts[id]?.fields[locale];
  const description = fields
    ? Object.values(fields).filter(Boolean).join(' · ')
    : title;
  return {
    title: `${title} | iSunTV`,
    description,
    alternates: languageAlternates(`videos/${id}/`),
  };
}
