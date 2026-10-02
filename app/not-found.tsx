import { defaultLocale } from '../lib/site-profile';
import { errorCopy, recoveryPath } from '../lib/error-page.mjs';
/* oxlint-disable next/no-html-link-for-pages -- Error recovery uses native document navigation. */
export default function NotFound() {
  const text = errorCopy[defaultLocale];
  return <main style={{ padding: '5rem 6%', fontFamily: 'sans-serif' }}><h1>{text[0]}</h1><p>{text[1]}</p><a href={recoveryPath(defaultLocale, defaultLocale)}>{text[2]}</a></main>;
}
