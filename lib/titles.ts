import data from './display-titles.json';
import type { Locale } from './catalogue';
import { detailCopy } from './editorial';
export const displayTitles: Partial<Record<string, Partial<Record<Locale, string>>>> = data;
export const videoTitle = (video: { id: string; title: string | null }, locale: Locale) =>
  displayTitles[video.id]?.[locale] ?? video.title ?? detailCopy[locale].missingTitle;
