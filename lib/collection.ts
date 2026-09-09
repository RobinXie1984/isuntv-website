import data from './videos.json';
import { programmes, homePath, type Locale } from './catalogue';
export const playlists = data;
export const getProgramme = (slug: string) =>
  programmes.find((p) => p.slug === slug);
export const selectedPlaylistIds = (slug: string) =>
  slug === 'journeys'
    ? ['PL1Flk3ukUUwYddLkwMfnAUhSkrHazeE6o']
    : (getProgramme(slug)?.playlistIds ?? []);
export const programmeVideos = (slug: string) =>
  selectedPlaylistIds(slug).flatMap(
    (id) =>
      playlists
        .find((p) => p.id === id)
        ?.entries.map((v) => ({ ...v, playlistId: id })) ?? [],
  );
export const findVideo = (id: string) => {
  for (const p of playlists) {
    const v = p.entries.find((e) => e.id === id);
    if (v) return { ...v, playlistId: p.id };
  }
  return undefined;
};
export const programmePath = (l: Locale, slug: string) =>
  homePath(l) + 'programmes/' + slug + '/';
export const videoPath = (l: Locale, id: string) =>
  homePath(l) + 'videos/' + id + '/';

export type ListedVideo = NonNullable<ReturnType<typeof findVideo>>;
