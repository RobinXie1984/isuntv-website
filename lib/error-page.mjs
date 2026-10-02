// Shared by the server adapter and the static host's single 404 document.
export const errorCopy = {
  'zh-Hans': ['找不到页面', '此页面不存在或已迁移。', '返回节目目录'],
  'zh-Hant': ['找不到頁面', '此頁面不存在或已遷移。', '返回節目目錄'],
  en: ['Page not found', 'This page does not exist or has moved.', 'Return to programmes'],
  fr: ['Page introuvable', 'Cette page n’existe pas ou a été déplacée.', 'Retour aux programmes'],
  es: ['Página no encontrada', 'Esta página no existe o se ha trasladado.', 'Volver a los programas'],
  ja: ['ページが見つかりません', 'このページは存在しないか、移動されました。', '番組一覧に戻る'],
  ko: ['페이지를 찾을 수 없습니다', '페이지가 없거나 다른 위치로 이동했습니다.', '프로그램 목록으로 돌아가기'],
  hi: ['पृष्ठ नहीं मिला', 'यह पृष्ठ मौजूद नहीं है या इसका पता बदल गया है।', 'कार्यक्रमों पर लौटें'],
  he: ['הדף לא נמצא', 'הדף אינו קיים או הועבר לכתובת אחרת.', 'בחזרה לתוכניות'],
};
export function errorLocale(pathname, fallback) {
  const first = pathname.split('/')[1];
  return Object.hasOwn(errorCopy, first) ? first : fallback;
}
export function recoveryPath(locale, fallback, trailing = false) {
  return `${locale === fallback ? '' : '/' + locale}/programmes${trailing ? '/' : ''}`;
}
export function errorDocument(pathname, fallback, staticHost = false) {
  const locale = errorLocale(pathname, fallback);
  const copy = errorCopy[locale];
  const blocks = Object.entries(errorCopy).map(([code, text]) => `<section lang="${code}" dir="${code === 'he' ? 'rtl' : 'ltr'}"><h2>${text[0]}</h2><a href="${recoveryPath(code, fallback, staticHost)}">${text[2]}</a></section>`).join('');
  // Only trusted dictionary values are interpolated. The requested path is never rendered.
  const script = staticHost ? `<script>(()=>{const copy=${JSON.stringify(errorCopy)};const fallback=${JSON.stringify(fallback)};const first=location.pathname.split('/')[1];const lang=Object.hasOwn(copy,first)?first:fallback;document.documentElement.lang=lang;document.documentElement.dir=lang==='he'?'rtl':'ltr';document.title=copy[lang][0]+' | iSunTV';document.getElementById('error-title').textContent=copy[lang][0];document.getElementById('error-message').textContent=copy[lang][1];const link=document.getElementById('error-recovery');link.textContent=copy[lang][2];link.href=(lang===fallback?'':'/'+lang)+'/programmes/';})();</script>` : '';
  return `<!doctype html><html lang="${locale}" dir="${locale === 'he' ? 'rtl' : 'ltr'}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,follow"><title>${copy[0]} | iSunTV</title><style>body{margin:0;background:#f8f6f0;color:#182b30;font:18px/1.6 system-ui,sans-serif}main{max-width:48rem;padding:clamp(24px,6vw,80px);margin:auto}h1{font-size:clamp(28px,6vw,48px);overflow-wrap:anywhere}a{color:#174d65;display:inline-block;padding:12px 0}section{margin:2rem 0}</style></head><body><main><p>iSunTV · 404</p><h1 id="error-title">${copy[0]}</h1><p id="error-message">${copy[1]}</p><a id="error-recovery" href="${recoveryPath(locale, fallback, staticHost)}">${copy[2]}</a>${staticHost ? '<noscript>'+blocks+'</noscript>' : ''}</main>${script}</body></html>`;
}
