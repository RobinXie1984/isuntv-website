/* oxlint-disable nextjs/no-img-element -- Fixed-size source thumbnails and the small official logo use direct images; no image proxy or optimizer is needed. */
import { notFound } from 'next/navigation';
import { ArrowUpRight, ArrowLeft, UserRound, Play } from 'lucide-react';
import { SiteHeader } from '../components/site-header';
import { detailCopy, drafts } from '../lib/editorial';
import { programmes, type Locale } from '../lib/catalogue';
import {
  findVideo,
  programmePath,
  selectedPlaylistIds,
} from '../lib/collection';
export function Video({ locale, id }: { locale: Locale; id: string }) {
  const v = findVideo(id);
  if (!v) notFound();
  const t = detailCopy[locale];
  const programme = programmes.find((p) =>
    selectedPlaylistIds(p.slug).includes(v.playlistId),
  );
  const draft = id === 'anL-lcfB2y0' ? drafts['anL-lcfB2y0'] : undefined;
  return (
    <>
      <SiteHeader locale={locale} path={`videos/${id}/`} />
      <main id="main" className="detail video-detail">
        {programme ? (
          <a className="back-link" href={programmePath(locale, programme.slug)}>
            <ArrowLeft size={16} />
            {t.videoBack}
          </a>
        ) : null}
        <p className="eyebrow">{t.original}</p>
        <h1>{v.title ?? t.missingTitle}</h1>
        <a
          className="video-cover"
          href={`https://www.youtube.com/watch?v=${v.id}&list=${v.playlistId}`}
          aria-label={t.watch}
        >
          <img
            src={v.thumbnail ?? undefined}
            width="640"
            height="360"
            alt={v.title ?? t.missingTitle}
          />
          <span className="cover-play">
            <Play size={22} />
            {t.watch}
            <ArrowUpRight size={18} />
          </span>
        </a>
        {draft ? (
          <section className="six-w">
            <h2>{t.summary}</h2>
            <dl>
              {(['who', 'what', 'when', 'where', 'why', 'how'] as const).map(
                (key) => (
                  <div key={key}>
                    <dt>
                      {key === 'who' ? <UserRound size={17} /> : null}
                      {t[key]}
                    </dt>
                    <dd>
                      {draft.fields[locale][key]}
                      {key === 'who' ? (
                        <a
                          href={draft.reference}
                          className="person-reference"
                          aria-label={t.person}
                        >
                          <ArrowUpRight size={17} />
                        </a>
                      ) : null}
                    </dd>
                  </div>
                ),
              )}
            </dl>
            <p className="source-note">
              {t.note} <a href={draft.source}>{t.watch} ↗</a>
            </p>
          </section>
        ) : (
          <p className="source-note pending-note">{t.pending}</p>
        )}
      </main>
    </>
  );
}
