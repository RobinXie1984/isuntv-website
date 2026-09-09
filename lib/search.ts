import {
  playlists,
  getProgramme,
  selectedPlaylistIds,
  type ListedVideo,
} from './collection';
import { programmes } from './catalogue';
import { drafts } from './editorial';
import { displayTitles } from './titles';
export const cleanQuery = (q: string | string[] | undefined) =>
  ((Array.isArray(q) ? q[0] : q) ?? '').trim().slice(0, 80);
const index = playlists.flatMap((p) => {
  const programme = programmes.find((g) =>
    selectedPlaylistIds(g.slug).includes(p.id),
  );
  const category = programme ? getProgramme(programme.slug) : undefined;
  return p.entries.map((v) => ({
    video: { ...v, playlistId: p.id },
    text: [
      v.id,
      v.title,
      ...Object.values(displayTitles[v.id] ?? {}),
      p.title,
      ...Object.values(category?.titles ?? {}),
      ...Object.values(drafts[v.id]?.fields ?? {}).flatMap((f) =>
        Object.values(f),
      ),
    ]
      .filter(Boolean)
      .join(' ')
      .normalize('NFKC')
      .toLocaleLowerCase(),
  }));
});
export function searchVideos(raw: string | undefined): ListedVideo[] {
  const query = cleanQuery(raw).normalize('NFKC').toLocaleLowerCase();
  if (!query) return [];
  const terms = query.split(/\s+/);
  const matches = index.filter((r) =>
    terms.every((term) => r.text.includes(term)),
  );
  return [...new Map(matches.map((r) => [r.video.id, r.video])).values()];
}
