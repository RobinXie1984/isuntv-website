/* oxlint-disable nextjs/no-img-element -- Fixed-size source thumbnails and the small official logo use direct images; no image proxy or optimizer is needed. */
import { notFound } from 'next/navigation';
import { ArrowUpRight, ArrowLeft, UserRound, Play } from 'lucide-react';
import { SiteHeader } from '../components/site-header';
import { detailCopy, drafts } from '../lib/editorial';
import { people } from '../lib/people';
import { displayTitles, videoTitle } from '../lib/titles';
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
  const draft = drafts[id];
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
        <p className="eyebrow">{programme?.titles[locale]}</p>
        <h1>{videoTitle(v, locale)}</h1>
        {displayTitles[id] ? (
          <details className="original-title">
            <summary>{t.original}</summary>
            <p>{v.title ?? t.missingTitle}</p>
          </details>
        ) : null}
        <a
          className="video-cover"
          href={`https://www.youtube.com/watch?v=${v.id}&list=${v.playlistId}`}
          aria-label={t.watch}
        >
          <img
            src={v.thumbnail ?? undefined}
            width="640"
            height="360"
            alt={videoTitle(v, locale)}
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
                      {draft.fields[locale][key] ?? t.unknown}
                      {key === 'who' && draft.people?.length ? (
                        <ul className="person-references" aria-label={t.person}>
                          {draft.people.map((personId) => {
                            const person = people[personId];
                            return person ? (
                              <li key={personId}>
                                <a
                                  href={person.url}
                                  hrefLang={person.sourceLanguage}
                                  className="person-reference"
                                  aria-label={`${t.person}: ${person.name[locale]}`}
                                >
                                  {person.name[locale]}
                                  <ArrowUpRight size={17} aria-hidden="true" />
                                </a>
                              </li>
                            ) : null;
                          })}
                        </ul>
                      ) : null}
                    </dd>
                  </div>
                ),
              )}
            </dl>
            <p className="source-note">
              {t.note}{' '}
              {draft.editorial_scope === 'SHARED_DESCRIPTION_DRAFT' ? t.shared : null}{' '}
              <a href={draft.source}>{t.watch} ↗</a>
            </p>
          </section>
        ) : (
          <p className="source-note pending-note">{t.pending}</p>
        )}
      </main>
    </>
  );
}
