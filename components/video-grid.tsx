/* oxlint-disable nextjs/no-img-element -- Dimensioned source thumbnails, no image proxy. */
import { ArrowUpRight } from 'lucide-react';
import { type Locale } from '../lib/catalogue';
import { detailCopy } from '../lib/editorial';
import { videoPath, type ListedVideo } from '../lib/collection';
export function VideoGrid({
  locale,
  videos,
}: {
  locale: Locale;
  videos: ListedVideo[];
}) {
  const t = detailCopy[locale];
  return (
    <div className="video-grid">
      {videos.map((v) => (
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
            <a href={videoPath(locale, v.id)}>{v.title ?? t.missingTitle}</a>
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
  );
}
