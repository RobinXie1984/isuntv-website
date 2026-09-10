'use client';
import { useState } from 'react';
export function ContactForm({
  en = false,
  enabled = false,
}: {
  en?: boolean;
  enabled?: boolean;
}) {
  const [state, setState] = useState<'idle' | 'sending' | 'success' | 'error'>(
    'idle',
  );
  const [message, setMessage] = useState('');
  return (
    <form
      className="brand-form"
      onSubmit={async (e) => {
        e.preventDefault();
        if (!enabled || state === 'sending') return;
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
            en
              ? 'Your enquiry has been accepted for delivery. We will reply by email.'
              : '查詢已獲郵件服務接收，我們會透過電郵回覆。',
          );
          form.reset();
        } catch {
          setState('error');
          setMessage(
            en
              ? 'Delivery could not be confirmed. Please email partner@iSunTV.com directly.'
              : '目前無法確認寄送結果。請直接寄信至 partner@iSunTV.com。',
          );
        }
      }}
    >
      {!enabled && (
        <p className="status-message">
          {en
            ? 'For enquiries, please email partner@iSunTV.com directly. Online submission is not yet available.'
            : '請直接寄信至 partner@iSunTV.com 洽談合作。網上提交尚未開放。'}
        </p>
      )}
      <fieldset
        disabled={!enabled}
        style={{ border: 0, padding: 0, margin: 0, display: 'contents' }}
      >
        <div className="form-pair">
          <label>
            {en ? 'Full name' : '姓名'}
            <input name="name" autoComplete="name" required maxLength={100} />
          </label>
          <label>
            {en ? 'Organization' : '機構名稱'}
            <input
              name="organization"
              autoComplete="organization"
              required
              maxLength={150}
            />
          </label>
        </div>
        <label>
          {en ? 'Business email' : '聯絡電郵'}
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={254}
          />
        </label>
        <label>
          {en ? 'Enquiry' : '合作方向'}
          <select name="interest">
            <option value="global">{en ? 'Going global' : '華商出海'}</option>
            <option value="interviews">{en ? 'Interviews' : '採訪合作'}</option>
            <option value="licensing">
              {en ? 'Brand licensing' : '品牌授權'}
            </option>
            <option value="other">{en ? 'Other enquiry' : '其他查詢'}</option>
          </select>
        </label>
        <label>
          {en ? 'How can we help?' : '合作構想'}
          <textarea name="message" required minLength={10} maxLength={4000} />
        </label>
        <label className="hp-field" aria-hidden="true">
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
        <label className="checkbox-label">
          <input type="checkbox" name="consent" value="yes" required />
          <span>
            {en
              ? 'I agree to the use of my details to handle this enquiry.'
              : '我同意使用上述資料處理本次查詢。'}{' '}
            <a href={en ? '/en/privacy' : '/privacy'}>
              {en ? 'Privacy notice' : '私隱說明'}
            </a>
          </span>
        </label>
        <button
          type="submit"
          className="brand-button dark"
          disabled={!enabled || state === 'sending'}
        >
          {state === 'sending'
            ? en
              ? 'Sending…'
              : '傳送中…'
            : en
              ? 'Submit enquiry'
              : '提交查詢'}
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
