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
  const en = locale === 'en';
  const url = (p: string) => brandPath(p, locale);
  return (
    <BrandShell path="" locale={locale}>
      <section className="home-diptych">
        <div className="hero-panel harbour">
          <img
            src="/brand/harbour.webp"
            alt=""
            width="1122"
            height="1402"
            fetchPriority="high"
          />
          <div className="hero-copy">
            <p className="hero-kicker">
              {en ? 'HONG KONG' : '立足香港　連接全球'}
            </p>
            <p className="english-label">
              HONG KONG
              <br />
              YOUR GLOBAL ADVANTAGE
            </p>
            <h1>
              {en ? (
                <>
                  Chinese entrepreneurs.
                  <br />A wider world.
                </>
              ) : (
                <>
                  <span>陽光衛視</span>
                  <span>助力華商出海</span>
                </>
              )}
            </h1>
            <p className="hero-subtitle">
              {en
                ? 'A broader perspective. Closer connections.'
                : '更廣的視野，更近的機遇。'}
            </p>
            <a className="brand-button" href={url('global')}>
              {en ? 'Explore opportunities' : '探索出海機遇'}
              <ArrowRight size={20} />
            </a>
          </div>
          <p className="hero-bottom">
            {en
              ? 'HONG KONG  /  GLOBAL MARKETS  /  REAL CONNECTIONS'
              : '香港優勢　｜　國際市場　｜　華商網絡'}
          </p>
        </div>
        <div className="hero-panel portrait">
          <img
            src="/brand/interview-portrait.webp"
            alt=""
            width="1024"
            height="1152"
          />
          <div className="hero-copy">
            <p className="hero-kicker">
              {en ? 'IN CONVERSATION' : '真實人物　時代見證'}
            </p>
            <p className="english-label">
              REAL PEOPLE.
              <br />
              EXTRAORDINARY JOURNEYS.
            </p>
            <h2>
              {en ? (
                <>
                  Selected
                  <br />
                  interviews.
                </>
              ) : (
                <>
                  採訪
                  <br />
                  精選
                </>
              )}
            </h2>
            <p className="hero-subtitle">
              {en
                ? 'Stories that open new perspectives.'
                : '看見故事，也看見可能。'}
            </p>
            <a className="brand-button outline" href={url('interviews')}>
              {en ? 'Explore interviews' : '觀看採訪精選'}
              <ArrowRight size={20} />
            </a>
          </div>
          <span className="editorial-caption">
            {en ? 'Editorial illustration' : '形象示意'}
          </span>
        </div>
      </section>
      <section className="values-band">
        <h2>
          {en
            ? 'From Hong Kong, to a wider world.'
            : '從香港出發，連接更廣闊的世界'}
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
                <span>{en ? (e as string) : (zh as string)}</span>
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
            {en ? 'A name with accountability.' : '品牌有主張，授權有依據。'}
          </h2>

        </div>
        <a className="brand-button dark" href={url('licensing')}>
          {en ? 'Brand licensing' : '品牌授權'}
          <ArrowRight size={19} />
        </a>
        <a className="underlink" href={url('verify')}>
          {en ? 'Verify authorization' : '查驗授權'}
        </a>
      </section>
    </BrandShell>
  );
}
