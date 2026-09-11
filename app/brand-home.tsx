import { translator } from '../lib/brand-i18n';
/* oxlint-disable nextjs/no-img-element */
import {
  ArrowRight,
  Globe2,
  Clapperboard,
  UsersRound,
  ShieldCheck,
} from 'lucide-react';
import { BrandShell } from '../components/brand-shell';
import { brandPath, type BrandLocale } from '../lib/brand-pages';
export function BrandHome({ locale = 'zh-Hant' }: { locale?: BrandLocale }) {
  const t = translator(locale);
  const en = locale === 'en';
  const url = (p: string) => brandPath(p, locale);
  return (
    <BrandShell path="" locale={locale}>
      <section className="home-diptych">
        <div className="hero-panel harbour">
          <img
            src="/brand/harbour.webp" srcSet="/brand/harbour-480.webp 480w, /brand/harbour-768.webp 768w, /brand/harbour.webp 1122w" sizes="(max-width: 760px) 100vw, 54vw"
            alt=""
            width="1122"
            height="1402"
            fetchPriority="high"
          />
          <div className="hero-copy">
            <p className="hero-kicker">
              {t('立足香港　連接全球', 'HONG KONG')}
            </p>
            <p className="english-label">
              HONG KONG
              <br />
              YOUR GLOBAL ADVANTAGE
            </p>
            <h1>
              {t('陽光衛視\n助力華商出海', 'Chinese entrepreneurs.\nA wider world.').split('\n').map((line) => <span key={line}>{line}</span>)}
            </h1>
            <p className="hero-subtitle">
              {t('更廣的視野，更近的機遇。', 'A broader perspective. Closer connections.')}
            </p>
            <a className="brand-button" href={url('global')}>
              {t('探索出海機遇', 'Explore opportunities')}
              <ArrowRight size={20} />
            </a>
          </div>
          <p className="hero-bottom">
            {t('香港優勢　｜　國際市場　｜　華商網絡', 'HONG KONG  /  GLOBAL MARKETS  /  REAL CONNECTIONS')}
          </p>
        </div>
        <div className="hero-panel portrait">
          <img
            src="/brand/interview-portrait.webp" srcSet="/brand/interview-portrait-480.webp 480w, /brand/interview-portrait-768.webp 768w, /brand/interview-portrait.webp 1024w" sizes="(max-width: 760px) 100vw, 54vw"
            alt=""
            width="1024"
            height="1152"
          />
          <div className="hero-copy">
            <p className="hero-kicker">
              {t('真實人物　時代見證', 'IN CONVERSATION')}
            </p>
            <p className="english-label">
              REAL PEOPLE.
              <br />
              EXTRAORDINARY JOURNEYS.
            </p>
            <h2>
              {t('採訪\n精選', 'Selected\ninterviews.').split('\n').map((line) => <span key={line} style={{display:'block'}}>{line}</span>)}
            </h2>
            <p className="hero-subtitle">
              {t('看見故事，也看見可能。', 'Stories that open new perspectives.')}
            </p>
            <a className="brand-button outline" href={url('interviews')}>
              {t('觀看採訪精選', 'Explore interviews')}
              <ArrowRight size={20} />
            </a>
          </div>
          <span className="editorial-caption">
            {t('形象示意', 'Editorial illustration')}
          </span>
        </div>
      </section>
      <section className="values-band">
        <h2>
          {t('從香港出發，連接更廣闊的世界', 'From Hong Kong, to a wider world.')}
        </h2>
        <p className="english-label">
          CHINESE ENTREPRENEURS　 A BRIGHTER CHINA　 A WIDER WORLD
        </p>
        <div className="value-grid">
          {[
            [Globe2, '國際視野', 'GLOBAL PERSPECTIVE'],
            [Clapperboard, '深度敘事', 'IN-DEPTH STORYTELLING'],
            [UsersRound, '真實人物', 'REAL PEOPLE'],
            [ShieldCheck, '連接機遇', 'LASTING OPPORTUNITIES'],
          ].map(([Icon, zh, e]) => {
            const I = Icon as typeof Globe2;
            return (
              <div key={e as string}>
                <I size={22} />
                <span>{t(zh as string, e as string)}</span>
                {!en && <small>{e as string}</small>}
              </div>
            );
          })}
        </div>
      </section>
      <section className="authority-strip">
        <div>
          <p className="english-label">THE BRAND. THE PEOPLE. THE TRUST.</p>
          <h2>
            {t('品牌有主張，授權有依據。', 'A name with accountability.')}
          </h2>

        </div>
        <a className="brand-button dark" href={url('licensing')}>
          {t('品牌授權', 'Brand licensing')}
          <ArrowRight size={19} />
        </a>
        <a className="underlink" href={url('verify')}>
          {t('查驗授權', 'Verify authorization')}
        </a>
      </section>
    </BrandShell>
  );
}
