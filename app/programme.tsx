/* oxlint-disable nextjs/no-img-element -- Fixed-size source thumbnails and the small official logo use direct images; no image proxy or optimizer is needed. */
import { notFound } from 'next/navigation';
import { ArrowUpRight, ArrowLeft, ArrowRight } from 'lucide-react';
import { SiteHeader } from '../components/site-header';
import { detailCopy } from '../lib/editorial';
import { homePath, type Locale } from '../lib/catalogue';
import {
  getProgramme,
  programmeVideos,
  selectedPlaylistIds,
  playlists,
  programmePath,
  videoPath,
} from '../lib/collection';
export function Programme({
  locale,
  slug,
  pageRaw,
}: {
  locale: Locale;
  slug: string;
  pageRaw?: string;
}) {
  const p = getProgramme(slug);
  if (!p) notFound();
  const t = detailCopy[locale];
  const videos = programmeVideos(slug);
  const pages = Math.max(1, Math.ceil(videos.length / 24));
  const parsed = Number(pageRaw ?? 1);
  const page =
    Number.isInteger(parsed) && parsed > 0 && parsed <= pages ? parsed : 1;
  const visible = videos.slice((page - 1) * 24, page * 24);
  return (
    <>
      <SiteHeader locale={locale} path={`programmes/${slug}/`} />
      <main id="main" className="detail">
        <a className="back-link" href={`${homePath(locale)}#programmes`}>
          <ArrowLeft size={16} />
          {t.back}
        </a>
        <div className="detail-heading">
          <p className="eyebrow">{p.topics[locale]}</p>
          <h1>{p.titles[locale]}</h1>
          <p>
            {videos.length} {t.videos}
          </p>
          <div className="playlist-links">
            {selectedPlaylistIds(slug).map((id, i) => (
              <a key={id} href={`https://www.youtube.com/playlist?list=${id}`}>
                {t.source}
                {selectedPlaylistIds(slug).length > 1 ? ` ${i + 1}` : ''}
                <ArrowUpRight size={16} />
              </a>
            ))}
            {p.playlistIds
              .filter((id) => !selectedPlaylistIds(slug).includes(id))
              .map((id) => (
                <a
                  key={id}
                  href={`https://www.youtube.com/playlist?list=${id}`}
                >
                  {t.submitted}
                  <ArrowUpRight size={16} />
                </a>
              ))}
          </div>
          {selectedPlaylistIds(slug).some(
            (id) =>
              playlists.find((p) => p.id === id)?.hidden_unavailable_count,
          ) ? (
            <p className="source-note">{t.unavailable}</p>
          ) : null}
        </div>
        <div className="video-grid">
          {visible.map((v) => (
            <article className="video-card" key={`${v.playlistId}-${v.id}`}>
              <a
                href={videoPath(locale, v.id)}
                className="video-image"
                aria-label={v.title ?? t.missingTitle}
              >
                <img
                  src={v.thumbnail ?? undefined}
                  width="480"
                  height="270"
                  loading="lazy"
                  alt=""
                />
                {v.durationLabel ? (
                  <span className="duration">{v.durationLabel}</span>
                ) : null}
              </a>
              <p className="episode-index">
                {String(v.playlist_index).padStart(2, '0')}
              </p>
              <h2>
                <a href={videoPath(locale, v.id)}>
                  {v.title ?? t.missingTitle}
                </a>
              </h2>
              <a
                className="video-watch"
                href={`https://www.youtube.com/watch?v=${v.id}&list=${v.playlistId}`}
              >
                {t.watch}
                <ArrowUpRight size={15} />
              </a>
            </article>
          ))}
        </div>
        <nav className="pagination" aria-label={t.page}>
          {page > 1 ? (
            <a href={programmePath(locale, slug) + `?page=${page - 1}`}>
              <ArrowLeft size={16} />
              {t.previous}
            </a>
          ) : (
            <span />
          )}
          <span>
            {t.page} {page} / {pages}
          </span>
          {page < pages ? (
            <a href={programmePath(locale, slug) + `?page=${page + 1}`}>
              {t.next}
              <ArrowRight size={16} />
            </a>
          ) : (
            <span />
          )}
        </nav>
      </main>
    </>
  );
}
