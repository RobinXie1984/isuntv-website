'use client';
import type { BrandLocale } from '../lib/brand-pages';
import { useState, useSyncExternalStore } from 'react';
const subscribeToHydration = () => () => {};
const hydrated = () => true;
const serverRendered = () => false;
export function ContactForm({
  locale = 'zh-Hant',
  labels,
  enabled = false,
}: {
  locale?: BrandLocale;
  labels: Record<string, string>;
  enabled?: boolean;
}) {
  const t = (_zh: string, en: string) => labels[en] ?? en;
  const [state, setState] = useState<'idle' | 'sending' | 'success' | 'error'>(
    'idle',
  );
  const [message, setMessage] = useState('');
  const ready = useSyncExternalStore(subscribeToHydration, hydrated, serverRendered);
  return (
    <form
      className="brand-form"
      method="post"
      action="/api/contact"
      onSubmit={async (e) => {
        e.preventDefault();
        if (!enabled || !ready || state === 'sending') return;
        setState('sending');
        const form = e.currentTarget;
        const fields = Object.fromEntries(new FormData(form));
        try {
          const response = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(fields),
          });
          if (!response.ok) throw new Error('delivery');
          setState('success');
          setMessage(
            t('查詢已獲郵件服務接收，我們會透過電郵回覆。', 'Your enquiry has been accepted for delivery. We will reply by email.'),
          );
          form.reset();
        } catch {
          setState('error');
          setMessage(
            t('目前無法確認寄送結果。請直接寄信至 partner@iSunTV.com。', 'Delivery could not be confirmed. Please email partner@iSunTV.com directly.'),
          );
        }
      }}
    >
      {enabled && !ready && <p className="status-message">{t('正在載入表單，亦可直接寄信至 partner@isuntv.com。', 'Loading the form. You can also email partner@isuntv.com.')}</p>}
      {!enabled && (
        <p className="status-message">
          {t('請直接寄信至 partner@iSunTV.com 洽談合作。網上提交尚未開放。', 'For enquiries, please email partner@iSunTV.com directly. Online submission is not yet available.')}
        </p>
      )}
      <fieldset
        disabled={!enabled || !ready}
        style={{ border: 0, padding: 0, margin: 0, display: 'contents' }}
      >
        <div className="form-pair">
          <label>
            {t('姓名', 'Full name')}
            <input name="name" autoComplete="name" required maxLength={100} />
          </label>
          <label>
            {t('機構名稱', 'Organization')}
            <input
              name="organization"
              autoComplete="organization"
              required
              maxLength={150}
            />
          </label>
        </div>
        <label>
          {t('聯絡電郵', 'Business email')}
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={254}
          />
        </label>
        <label>
          {t('合作方向', 'Enquiry')}
          <select name="interest">
            <option value="global">{t('華商出海', 'Going global')}</option>
            <option value="interviews">{t('採訪合作', 'Interviews')}</option>
            <option value="licensing">
              {t('品牌授權', 'Brand licensing')}
            </option>
            <option value="other">{t('其他查詢', 'Other enquiry')}</option>
          </select>
        </label>
        <label>
          {t('合作構想', 'How can we help?')}
          <textarea name="message" required minLength={10} maxLength={4000} />
        </label>
        <label className="hp-field" aria-hidden="true">
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
        <label className="checkbox-label">
          <input type="checkbox" name="consent" value="yes" required />
          <span>
            {t('我同意使用上述資料處理本次查詢。', 'I agree to the use of my details to handle this enquiry.')}{' '}
            <a href={`${locale === 'zh-Hant' ? '' : '/' + locale}/privacy`}>
              {t('私隱說明', 'Privacy notice')}
            </a>
          </span>
        </label>
        <button
          type="submit"
          className="brand-button dark"
          disabled={!enabled || !ready || state === 'sending'}
        >
          {state === 'sending'
            ? t('傳送中…', 'Sending…')
            : t('提交查詢', 'Submit enquiry')}
        </button>
      </fieldset>
      {message && (
        <div
          className="status-message"
          role={state === 'error' ? 'alert' : 'status'}
        >
          {message}
          {state === 'error' && (
            <>
              {' '}
              <a href="mailto:partner@isuntv.com">partner@iSunTV.com</a>
            </>
          )}
        </div>
      )}
    </form>
  );
}
