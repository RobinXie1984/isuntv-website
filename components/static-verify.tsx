'use client';
import { useEffect, useState } from 'react';
import { translator } from '../lib/brand-i18n';
import type { BrandLocale } from '../lib/brand-pages';

// The static release is deliberately gated to the unpublished, empty registry.
// Published records require the signed-record verification service before launch.
export function StaticVerify({ locale }: { locale: BrandLocale }) {
  const t = translator(locale);
  const [id, setId] = useState('');
  const [submitted, setSubmitted] = useState('');
  useEffect(() => {
    const initial = (new URLSearchParams(window.location.search).get('id') ?? '').slice(0, 100);
    setId(initial);
    setSubmitted(initial);
  }, []);
  return <>
    <form className="verify-form" onSubmit={event => {
      event.preventDefault();
      const value = id.trim().slice(0, 100);
      setSubmitted(value);
      const url = new URL(window.location.href);
      url.searchParams.set('id', value);
      window.history.replaceState(null, '', url);
    }}>
      <label className="sr-only" htmlFor="authorization-id">{t('授權編號', 'Authorization ID')}</label>
      <input id="authorization-id" name="id" value={id} onChange={event => setId(event.target.value)} placeholder="ISUN-…" maxLength={100} required />
      <button className="brand-button dark" type="submit">{t('查驗', 'Verify')}</button>
    </form>
    {submitted && <section className="notice" aria-live="polite">
      <h3>{t('公開登記尚未啟用', 'Public register not yet enabled')}</h3>
      <p>{t('查詢編號', 'Authorization ID')}: {submitted}</p>
    </section>}
  </>;
}
