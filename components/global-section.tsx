import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { brandPath, type BrandLocale } from '../lib/brand-pages';
import { globalContent, globalImageNames } from '../lib/global-content';
import { GlobalGallery } from './global-gallery';
export function GlobalSection({ locale }: { locale: BrandLocale }) {
  const c = globalContent[locale];
  const url = (path: string) => brandPath(path, locale);
  return <>
    <section className="mission-section global-mission global-feature">
      <div className="global-feature-copy">
        <p className="english-label">CHINESE STORIES · GLOBAL POSSIBILITIES</p>
        <h2>{c.headline}</h2>
        <p>{c.mission}</p>
        <div className="global-position"><span>{c.heritage}</span><strong>{c.audience}</strong></div>
        <a className="brand-button dark" href={url('contact')}>{c.contact}<ArrowRight size={18}/></a>
      </div>
      <GlobalGallery images={globalImageNames} captions={c.captions} labels={{gallery:c.gallery,slide:c.slide,previous:c.previous,next:c.next,pause:c.pause,play:c.play,imageConcept:c.imageConcept}} rtl={locale === 'he'} />
    </section>
    <section className="page-content global-editorial" aria-labelledby="global-pillars">
      <p className="english-label">STORIES & CONNECTIONS</p><h2 id="global-pillars">{c.pillarsTitle}</h2>
      <div className="business-grid global-services">{c.pillars.map(([title,body],i) => <article key={title}><p className="english-label">0{i+1}</p><h3>{title}</h3><p>{body}</p><a href={url(['interviews','contact','licensing'][i])}>{[c.interviews,c.contact,c.pillars[2][0]][i]}<ArrowUpRight size={16}/></a></article>)}</div>
    </section>
    <section className="global-content-band"><div className="page-content global-editorial">
      <p className="english-label">CONTENT BEYOND BORDERS</p><h2>{c.sectorsTitle}</h2><p className="global-section-intro">{c.sectorsIntro}</p>
      <div className="business-grid">{c.sectors.map(([title,body]) => <article key={title}><h3>{title}</h3><p>{body}</p></article>)}</div>
    </div></section>
    <section className="page-content global-editorial"><p className="english-label">THE FIRST PROJECT</p><h2>{c.processTitle}</h2>
      <ol className="global-process">{c.process.map(([title,body],i) => <li key={title}><span className="english-label">0{i+1}</span><h3>{title}</h3><p>{body}</p></li>)}</ol>
      <div className="global-invitation"><div><h2>{c.closing}</h2><p>{c.closingBody}</p></div><a className="brand-button dark" href={url('contact')}>{c.contact}<ArrowRight size={18}/></a></div>
    </section>
  </>;
}
