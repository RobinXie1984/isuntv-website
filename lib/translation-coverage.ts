import { drafts } from './editorial';
import { playlists } from './collection';
import type { Locale } from './catalogue';
export const coverageCopy: Record<Locale, [string, string]> = {
  'zh-Hant': ['本語言摘要', '九種界面語言；僅部分影片提供翻譯摘要。原片音軌及字幕不因界面語言改變。'],
  'zh-Hans': ['本语言摘要', '九种界面语言；仅部分影片提供翻译摘要。原片音轨及字幕不因界面语言改变。'],
  en: ['Summaries in this language', 'Nine interface languages; translated summaries are available for selected videos. Interface language does not change original audio or subtitles.'],
  fr: ['Résumés dans cette langue', 'Neuf langues d’interface ; seuls certains épisodes disposent d’un résumé traduit. La langue de l’interface ne modifie ni l’audio ni les sous-titres d’origine.'],
  es: ['Resúmenes en este idioma', 'Nueve idiomas de interfaz; solo algunos vídeos tienen resúmenes traducidos. El idioma de la interfaz no cambia el audio ni los subtítulos originales.'],
  ja: ['この言語の要約', '画面は9言語に対応しています。翻訳要約は一部の動画のみです。画面の言語を変えても原動画の音声や字幕は変わりません。'],
  ko: ['이 언어로 제공되는 요약', '화면은 9개 언어를 지원하며, 일부 영상에만 번역 요약이 있습니다. 화면 언어를 바꿔도 원본 음성이나 자막은 바뀌지 않습니다.'],
  hi: ['इस भाषा में सार', 'इंटरफ़ेस नौ भाषाओं में है; अनुवादित सार केवल चुनिंदा वीडियो के लिए उपलब्ध हैं। इंटरफ़ेस की भाषा बदलने से मूल ऑडियो या उपशीर्षक नहीं बदलते।'],
  he: ['תקצירים בשפה זו', 'הממשק זמין בתשע שפות; תקצירים מתורגמים זמינים רק לחלק מהסרטונים. שינוי שפת הממשק אינו משנה את פס הקול או את הכתוביות המקוריים.'],
};
export function translationCoverage(locale: Locale) {
  const ids = new Set(playlists.flatMap(p => p.entries.map(v => v.id)));
  return { total: ids.size, translated: [...ids].filter(id => Boolean(drafts[id]?.fields[locale])).length };
}
