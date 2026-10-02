import NotFound from './not-found';
import { defaultLocale } from '../lib/site-profile';
import { errorCopy } from '../lib/error-page.mjs';
export const metadata = {title: errorCopy[defaultLocale][0] + ' | iSunTV', robots: { index: false, follow: true }};
export default function GlobalNotFound() {
  return <html lang={defaultLocale} dir={defaultLocale === 'he' ? 'rtl' : 'ltr'}><body><NotFound /></body></html>;
}
