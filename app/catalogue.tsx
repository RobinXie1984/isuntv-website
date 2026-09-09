import { SiteHeader } from '../components/site-header';
/* oxlint-disable nextjs/no-img-element -- Fixed-size source thumbnails and the small official logo use direct images; no image proxy or optimizer is needed. */
import {
  programmePath,
  programmeVideos,
  selectedPlaylistIds,
} from '../lib/collection';
import { detailCopy } from '../lib/editorial';
import { ArrowUpRight, Play, ArrowDown } from 'lucide-react';
import { copy, programmes, type Locale } from '../lib/catalogue';
export function Catalogue({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return (
    <div lang={locale}>
      <SiteHeader locale={locale} />
      <main id="main">
        <section className="intro">
          <div className="intro-text">
            <p className="eyebrow">{t.kicker}</p>
            <h1>
              {t.headline.split('\n').map((l, i) => (
                <span key={i}>{l}</span>
              ))}
            </h1>
            <p className="lede">{t.intro}</p>
            <a className="text-action" href="#programmes">
              {t.explore}
              <ArrowDown size={18} />
            </a>
          </div>
          <a
            className="feature"
            href="https://www.youtube.com/watch?v=anL-lcfB2y0&list=PL1Flk3ukUUwZr2_mKVQCiHW7gUcTVGnAC"
            aria-label={`${t.featureTitle} · ${t.featureDesc} · ${t.watch}`}
          >
            <div className="feature-media">
              <img
                src="https://i.ytimg.com/vi/anL-lcfB2y0/hqdefault.jpg?sqp=-oaymwEiCNACELwBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLCbMy7FbPjYvbTDB0VzZV5m1MV0rA"
                width="336"
                height="188"
                fetchPriority="high"
                alt={t.featureDesc}
              />
              <span className="play">
                <Play size={22} fill="currentColor" />
              </span>
            </div>
            <div className="feature-caption">
              <div>
                <p className="eyebrow">{t.featured}</p>
                <h2>{t.featureTitle}</h2>
                <p>{t.featureDesc}</p>
              </div>
              <ArrowUpRight size={26} />
            </div>
          </a>
        </section>
        <section id="programmes" className="collection">
          <div className="section-heading">
            <h2>{t.series}</h2>
            <p>{t.all}</p>
          </div>
          <div className="programme-grid">
            {programmes.map((p, i) => (
              <article className="programme" key={p.slug}>
                <div className="programme-top">
                  <span className="number">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="topic">{p.topics[locale]}</span>
                </div>
                <h3>
                  <a href={programmePath(locale, p.slug)}>{p.titles[locale]}</a>
                </h3>
                <a
                  className="browse-episodes"
                  href={programmePath(locale, p.slug)}
                >
                  {detailCopy[locale].browse} · {programmeVideos(p.slug).length}
                  <ArrowUpRight size={16} />
                </a>
                <div className="playlist-links">
                  {selectedPlaylistIds(p.slug).map((id, j) => (
                    <a
                      key={id}
                      href={`https://www.youtube.com/playlist?list=${id}`}
                    >
                      {t.playlist}
                      {p.playlistIds.length > 1 ? ` ${j + 1}` : ''}
                      <ArrowUpRight size={18} />
                    </a>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>
        <section id="about" className="about">
          <p className="eyebrow">iSunTV · HONG KONG</p>
          <h2>{t.about}</h2>
          <p>{t.aboutText}</p>
          <a className="text-action" href="https://www.youtube.com/@isuntvhk">
            {t.channel}
            <ArrowUpRight size={18} />
          </a>
        </section>
      </main>
      <footer>
        <span>{t.footer}</span>
        <span>© 2026 iSunTV</span>
      </footer>
    </div>
  );
}
