// The only publication exception. Classification uses immutable playlist/video IDs.
// An ID classified global-only stays excluded even if it also occurs in an allowed playlist.
export function projectContent(source, policy, siteId) {
  if (!['isuntv', 'isun1'].includes(siteId)) throw new Error('Unknown publication target');
  const restrictedPlaylists = new Set(policy.globalOnlyPlaylistIds);
  for (const id of restrictedPlaylists) if (!source.videos.some(p => p.id === id)) throw new Error(`Missing classification playlist ${id}`);
  const globalOnlyIds = new Set(source.videos.filter(p => restrictedPlaylists.has(p.id)).flatMap(p => p.entries.map(v => v.id)));
  const visible = id => siteId === 'isuntv' || !globalOnlyIds.has(id);
  const videos = source.videos.filter(p => siteId === 'isuntv' || !restrictedPlaylists.has(p.id)).map(p => {
    const entries = p.entries.filter(v => visible(v.id));
    return {...p, entries, visible_count: entries.length};
  });
  const ids = new Set(videos.flatMap(p => p.entries.map(v => v.id)));
  const select = object => Object.fromEntries(Object.entries(object).filter(([id]) => ids.has(id)));
  const drafts = select(source.drafts);
  const people = new Set(Object.values(drafts).flatMap(d => d.people ?? []));
  const programmes = source.programmes.filter(p => siteId === 'isuntv' || !p.playlistIds.some(id => restrictedPlaylists.has(id)));
  return {videos, programmes, drafts, 'display-titles': select(source['display-titles']), 'thumbnail-cache': select(source['thumbnail-cache']), people: Object.fromEntries(Object.entries(source.people).filter(([id]) => people.has(id))), visibleIds: ids, globalOnlyIds};
}
