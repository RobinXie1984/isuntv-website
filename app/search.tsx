import { ArrowLeft, ArrowRight } from 'lucide-react';
import { SiteHeader } from '../components/site-header';
import { VideoGrid } from '../components/video-grid';
import { homePath, type Locale } from '../lib/catalogue';
import { detailCopy } from '../lib/editorial';
import { cleanQuery, searchVideos } from '../lib/search';
import { searchCopy } from '../lib/search-copy';
export function SearchPage({
  locale,
  query,
  pageRaw,
}: {
  locale: Locale;
  query?: string | string[];
  pageRaw?: string | string[];
}) {
  const t = searchCopy[locale];
  const d = detailCopy[locale];
  const q = cleanQuery(query);
  const videos = searchVideos(q);
  const total = Math.max(1, Math.ceil(videos.length / 24));
  const number = Number(pageRaw ?? 1);
  const page =
    Number.isInteger(number) && number > 0 && number <= total ? number : 1;
  const path = `search/?q=${encodeURIComponent(q)}`;
  return (
    <>
      <SiteHeader locale={locale} path={path} />
      <main id="main" className="detail">
        <h1>{t.title}</h1>
        <form
          className="search-form"
          action={homePath(locale) + 'search/'}
          method="get"
        >
          <label htmlFor="query">{t.label}</label>
          <div className="search-controls">
            <input
              id="query"
              name="q"
              type="search"
              defaultValue={q}
              maxLength={80}
              aria-describedby="search-hint"
            />
            <button type="submit">{t.submit}</button>
          </div>
          <p id="search-hint" className="source-note">
            {t.hint}
          </p>
        </form>
        {!q ? (
          <p className="search-message">{t.empty}</p>
        ) : videos.length === 0 ? (
          <p className="search-message">{t.none}</p>
        ) : (
          <>
            <p className="search-message">
              {videos.length} {t.results}
            </p>
            <VideoGrid
              locale={locale}
              videos={videos.slice((page - 1) * 24, page * 24)}
            />
            <nav className="pagination" aria-label={d.page}>
              {page > 1 ? (
                <a href={homePath(locale) + path + `&page=${page - 1}`}>
                  <ArrowLeft size={16} />
                  {d.previous}
                </a>
              ) : (
                <span />
              )}
              <span>
                {d.page} {page} / {total}
              </span>
              {page < total ? (
                <a href={homePath(locale) + path + `&page=${page + 1}`}>
                  {d.next}
                  <ArrowRight size={16} />
                </a>
              ) : (
                <span />
              )}
            </nav>
          </>
        )}
      </main>
    </>
  );
}
