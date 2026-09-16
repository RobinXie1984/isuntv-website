import programmeData from './generated/programmes.json';
import { defaultLocale } from './site-profile';
export const locales = ['zh-Hans', 'zh-Hant', 'en', 'fr', 'es', 'ja', 'hi', 'he'] as const;
export type Locale = (typeof locales)[number];
export const copy = {
"fr": {"title": "iSunTV", "nav": "Programmes", "about": "À propos", "channel": "Chaîne YouTube", "kicker": "DOCUMENTAIRES · HONG KONG", "headline": "Des vies en mémoire.\nL’histoire en images.", "intro": "Des artistes, des souvenirs et un regard sur le monde. Découvrez les voix et les récits des documentaires iSunTV.", "explore": "Explorer les programmes", "watch": "Voir sur YouTube", "series": "La collection", "all": "Des histoires qui nous accompagnent.", "aboutText": "iSunTV est une chaîne de télévision satellitaire de Hong Kong consacrée aux personnes, à l’histoire et à la culture.", "skip": "Aller au contenu", "playlist": "Voir la playlist", "footer": "陽光衛視 · iSunTV", "source": "Playlist originale", "featured": "ENTRETIENS", "featureTitle": "Parcours de vie", "featureDesc": "Le chef d’orchestre Li Delun · Épisode 1", "lang": "Langue"},
"es": {"title": "iSunTV", "nav": "Programas", "about": "Nosotros", "channel": "Canal de YouTube", "kicker": "DOCUMENTALES · HONG KONG", "headline": "Vidas que perduran.\nLa historia en imágenes.", "intro": "Artistas, recuerdos personales y una mirada al mundo. Descubra las personas y los relatos de la colección documental de iSunTV.", "explore": "Explorar programas", "watch": "Ver en YouTube", "series": "La colección", "all": "Historias que nos acompañan.", "aboutText": "iSunTV es un canal de televisión por satélite de Hong Kong dedicado a las personas, la historia y la cultura.", "skip": "Ir al contenido", "playlist": "Ver la lista de reproducción", "footer": "陽光衛視 · iSunTV", "source": "Lista original", "featured": "ENTREVISTAS", "featureTitle": "Trayectorias de vida", "featureDesc": "El director de orquesta Li Delun · Episodio 1", "lang": "Idioma"},
"hi": {"title": "iSunTV", "nav": "कार्यक्रम", "about": "हमारे बारे में", "channel": "YouTube चैनल", "kicker": "हांगकांग · वृत्तचित्र", "headline": "ज़िंदगी की यादें।\nइतिहास की झलकियाँ।", "intro": "कलाकारों की रचनाओं से लेकर निजी यादों तक—iSunTV के वृत्तचित्र संग्रह में लोगों और उनके समय की कहानियाँ जानें।", "explore": "कार्यक्रम देखें", "watch": "YouTube पर देखें", "series": "हमारा संग्रह", "all": "कुछ कहानियाँ हमेशा साथ रहती हैं।", "aboutText": "iSunTV हांगकांग का एक सैटेलाइट टेलीविज़न चैनल है, जो लोगों, इतिहास और संस्कृति की कहानियाँ प्रस्तुत करता है।", "skip": "मुख्य सामग्री पर जाएँ", "playlist": "प्लेलिस्ट देखें", "footer": "陽光衛視 · iSunTV", "source": "मूल प्लेलिस्ट", "featured": "खास बातचीत", "featureTitle": "जीवन की कहानियाँ", "featureDesc": "ऑर्केस्ट्रा संचालक ली देलुन · भाग 1", "lang": "भाषा"},

 he: {"title": "iSunTV", "nav": "ארכיון התוכניות", "about": "על iSunTV", "channel": "ערוץ YouTube", "kicker": "הונג קונג · סרטי תעודה", "headline": "סיפורי חיים.\nהיסטוריה מקרוב.", "intro": "מיצירתם של אמנים ועד לזיכרונות אישיים — גלו את האנשים והסיפורים באוסף התיעודי של iSunTV.", "explore": "לגלות את התוכניות", "watch": "לצפייה ב־YouTube", "series": "אוסף התוכניות", "all": "סיפורים שנשארים איתנו.", "aboutText": "iSunTV הוא ערוץ טלוויזיה לווייני מהונג קונג, המביא סיפורים על אנשים, היסטוריה ותרבות.", "skip": "דילוג לתוכן", "playlist": "לרשימת הצפייה", "footer": "陽光衛視 · iSunTV", "source": "רשימת הצפייה המקורית", "featured": "ראיונות אישיים", "featureTitle": "חיים בשיחה", "featureDesc": "המנצח לי דלון · פרק 1", "lang": "שפה"},
  'zh-Hant': {
    title: '陽光衛視',
    nav: '節目目錄',
    about: '關於陽光',
    channel: 'YouTube 頻道',
    kicker: '香港 · 人文紀錄',
    headline: '在影像裡，\n看見時代與人生。',
    intro: '從巨匠的創作，到平凡人的記憶。走進陽光衛視的人文、歷史與紀錄節目。',
    explore: '瀏覽節目',
    watch: '前往 YouTube',
    series: '經典節目',
    all: '每一段故事，都值得被看見。',
    aboutText:
      '陽光衛視是香港衛星電視頻道，以人文、歷史及紀錄節目，記錄人物與時代。',
    skip: '跳至主要內容',
    playlist: '觀看播放清單',
    footer: '陽光衛視 · iSunTV',
    source: '原播放清單',
    featured: '人物訪談',
    featureTitle: '人生在線',
    featureDesc: '指揮家李德倫 · 第 1 集',
    lang: '語言',
  },
  'zh-Hans': {
    title: '阳光卫视',
    nav: '节目目录',
    about: '关于阳光',
    channel: 'YouTube 频道',
    kicker: '香港 · 人文纪录',
    headline: '在影像里，\n看见时代与人生。',
    intro: '从巨匠的创作，到平凡人的记忆。走进阳光卫视的人文、历史与纪录节目。',
    explore: '浏览节目',
    watch: '前往 YouTube',
    series: '经典节目',
    all: '每一段故事，都值得被看见。',
    aboutText:
      '阳光卫视是香港卫星电视频道，以人文、历史及纪录节目，记录人物与时代。',
    skip: '跳至主要内容',
    playlist: '观看播放列表',
    footer: '阳光卫视 · iSunTV',
    source: '原播放列表',
    featured: '人物访谈',
    featureTitle: '人生在线',
    featureDesc: '指挥家李德伦 · 第 1 集',
    lang: '语言',
  },
  en: {
    title: 'iSunTV',
    nav: 'Programmes',
    about: 'About',
    channel: 'YouTube channel',
    kicker: 'HONG KONG · DOCUMENTARIES',
    headline: 'Lives remembered.\nHistory in focus.',
    intro:
      'Artists, personal memories and the world around us. Explore the people and stories in the iSunTV documentary collection.',
    explore: 'Explore programmes',
    watch: 'Watch on YouTube',
    series: 'The collection',
    all: 'A place for stories that stay with us.',
    aboutText:
      'iSunTV is a satellite television channel from Hong Kong, sharing programmes about people, history and culture.',
    skip: 'Skip to main content',
    playlist: 'Watch the playlist',
    footer: '陽光衛視 · iSunTV',
    source: 'Original playlist',
    featured: 'IN CONVERSATION',
    featureTitle: 'Life Online',
    featureDesc: 'Conductor Li Delun · Episode 1',
    lang: 'Language',
  },
  ja: {
    title: '陽光衛視',
    nav: '番組一覧',
    about: '陽光衛視について',
    channel: 'YouTube チャンネル',
    kicker: '香港 · ドキュメンタリー',
    headline: '映像を通して、\n時代と人生を見つめる。',
    intro:
      '芸術家の創作から、一人ひとりの記憶まで。陽光衛視の人物、歴史、文化の番組をご覧ください。',
    explore: '番組を見る',
    watch: 'YouTube で見る',
    series: '番組コレクション',
    all: '語り継ぎたい物語が、ここに。',
    aboutText:
      '陽光衛視は香港の衛星テレビチャンネルです。人物、歴史、文化をテーマにした番組を届けています。',
    skip: '本文へスキップ',
    playlist: '再生リストを見る',
    footer: '陽光衛視 · iSunTV',
    source: '元の再生リスト',
    featured: '人物インタビュー',
    featureTitle: '人生在線',
    featureDesc: '指揮者・李徳倫 · 第1話',
    lang: '言語',
  },
};
export const programmes = programmeData;

export const localeNames: Record<Locale, string> = {
  he: 'עברית',
  'zh-Hant': '繁體中文',
  'zh-Hans': '简体中文',
  en: 'English', fr: 'Français', es: 'Español', hi: 'हिन्दी',
  ja: '日本語',
};
export function sitePath(locale: Locale, path = '') {
  const joined = `${locale === defaultLocale ? '' : `/${locale}`}/${path}`;
  const boundary = joined.search(/[?#]/);
  const pathname = boundary < 0 ? joined : joined.slice(0, boundary);
  const suffix = boundary < 0 ? '' : joined.slice(boundary);
  const normalized = pathname.replace(/\/+$/, '') || '/';
  return normalized + (process.env.ISUN_STATIC_EXPORT === '1' && normalized !== '/' ? '/' : '') + suffix;
}
export const homePath = (locale: Locale) => sitePath(locale);
