import { brandPaths, brandPath, brandLocales } from '../lib/brand-pages';
import type { MetadataRoute } from 'next';
import { locales, programmes, sitePath } from '../lib/catalogue';
import { programmeVideos, findVideo } from '../lib/collection';
import { drafts } from '../lib/editorial';
import { languageAlternates } from '../lib/metadata';
import { publicOrigin } from '../lib/site-config.json';
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ['programmes'];
  for (const programme of programmes) {
    const pages = Math.max(
      1,
      Math.ceil(programmeVideos(programme.slug).length / 24),
    );
    for (let page = 1; page <= pages; page++) {
      paths.push(
        `programmes/${programme.slug}${page > 1 ? `?page=${page}` : ''}`,
      );
    }
  }
  for (const id of Object.keys(drafts).sort()) {
    if (findVideo(id)) paths.push(`videos/${id}`);
  }
  return [
    ...['', ...brandPaths].flatMap(path => brandLocales.map(locale => ({
      url: `${publicOrigin}${brandPath(path, locale)}`,
      alternates: { languages: Object.fromEntries([...brandLocales.map(l => [l, `${publicOrigin}${brandPath(path, l)}`]), ['x-default', `${publicOrigin}${brandPath(path, 'zh-Hant')}`]]) },
    }))),
    ...paths.flatMap((path) =>
      locales.filter(locale => locale !== 'he' || !path.startsWith('videos/')).map((locale) => ({
        url: new URL(sitePath(locale, path), publicOrigin).href,
        alternates: languageAlternates(path),
      })),
    ),
  ];
}
