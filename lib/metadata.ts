import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { sitePath, locales, type Locale } from './catalogue';
import { findVideo, getProgramme, programmeVideos } from './collection';
import { drafts } from './editorial';
import { videoTitle } from './titles';
import { publicOrigin } from './site-config.json';

export function checkedLocale(value: string | undefined): Locale {
  if (!locales.includes(value as Locale) || value === 'zh-Hant') notFound();
  return value as Locale;
}
export function languageAlternates(path: string, locale?: Locale) {
  return {
    ...(locale
      ? { canonical: new URL(sitePath(locale, path), publicOrigin).href }
      : {}),
    languages: Object.fromEntries(
      [...locales.map((l) => [l, new URL(sitePath(l, path), publicOrigin).href]), ['x-default', new URL(sitePath('zh-Hant', path), publicOrigin).href]],
    ),
  };
}
export function programmeMetadata(
  locale: Locale,
  slug: string,
  pageRaw?: string,
): Metadata {
  const programme = getProgramme(slug);
  if (!programme) notFound();
  const pages = Math.max(1, Math.ceil(programmeVideos(slug).length / 24));
  const parsed = Number(pageRaw ?? 1);
  const page =
    Number.isInteger(parsed) && parsed > 0 && parsed <= pages ? parsed : 1;
  const path = `programmes/${slug}${page > 1 ? `?page=${page}` : ''}`;
  return {
    title: `${programme.titles[locale]}${page > 1 ? ` · ${page}` : ''} | iSunTV`,
    description: `${programme.titles[locale]} · ${programme.topics[locale]}`,
    alternates: languageAlternates(path, locale),
  };
}
export function videoMetadata(locale: Locale, id: string): Metadata {
  const video = findVideo(id);
  if (!video) notFound();
  const title = videoTitle(video, locale);
  const fields = drafts[id]?.fields[locale];
  const description = fields
    ? Object.values(fields).filter(Boolean).join(' · ')
    : title;
  return {
    title: `${title} | iSunTV`,
    description,
    robots: { index: false, follow: true },
    alternates: languageAlternates(`videos/${id}/`, locale),
  };
}
