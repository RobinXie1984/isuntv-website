export const locales = ['zh-Hant', 'zh-Hans', 'en', 'ja'] as const;
export type Locale = (typeof locales)[number];
export const copy = {
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
export const programmes = [
  {
    slug: 'masters',
    titles: {
      'zh-Hant': '百年巨匠',
      'zh-Hans': '百年巨匠',
      en: 'Masters of a Century',
      ja: '百年の巨匠',
    },
    topics: {
      'zh-Hant': '藝術與創作',
      'zh-Hans': '艺术与创作',
      en: 'Art & creativity',
      ja: '芸術と創作',
    },
    playlistIds: ['PLbVkuc2XJS-I'],
  },
  {
    slug: 'national-tragedy',
    titles: {
      'zh-Hant': '國殤',
      'zh-Hans': '国殇',
      en: 'National Tragedy',
      ja: '国殤',
    },
    topics: {
      'zh-Hant': '歷史紀錄',
      'zh-Hans': '历史纪录',
      en: 'History',
      ja: '歴史',
    },
    playlistIds: ['PL1Flk3ukUUwaCT5EJmgj-a7apqvgwouw0'],
  },
  {
    slug: 'life-online',
    titles: {
      'zh-Hant': '人生在線',
      'zh-Hans': '人生在线',
      en: 'Life Online',
      ja: '人生在線',
    },
    topics: {
      'zh-Hant': '企業家與藝術家',
      'zh-Hans': '企业家与艺术家',
      en: 'Entrepreneurs & artists',
      ja: '起業家と芸術家',
    },
    playlistIds: ['PL1Flk3ukUUwZr2_mKVQCiHW7gUcTVGnAC'],
  },
  {
    slug: 'love-marriage',
    titles: {
      'zh-Hant': '百年婚戀',
      'zh-Hans': '百年婚恋',
      en: 'A Century of Love',
      ja: '百年の愛と結婚',
    },
    topics: {
      'zh-Hant': '人生與時代',
      'zh-Hans': '人生与时代',
      en: 'Lives & times',
      ja: '人生と時代',
    },
    playlistIds: ['PL1Flk3ukUUwbU1DKENJt-DQ_coS9LOl0z'],
  },
  {
    slug: 'treasures',
    titles: {
      'zh-Hant': '國寶',
      'zh-Hans': '国宝',
      en: 'National Treasures',
      ja: '国宝',
    },
    topics: {
      'zh-Hant': '文物與文化',
      'zh-Hans': '文物与文化',
      en: 'Heritage & culture',
      ja: '文化と遺産',
    },
    playlistIds: ['PL1Flk3ukUUwZ5i6HEl3MVvBqz4U5N4NXg'],
  },
  {
    slug: 'geography',
    titles: {
      'zh-Hant': '人文地理',
      'zh-Hans': '人文地理',
      en: 'People & Places',
      ja: '人文地理',
    },
    topics: {
      'zh-Hant': '山河與人文',
      'zh-Hans': '山河与人文',
      en: 'Landscape & culture',
      ja: '風土と文化',
    },
    playlistIds: ['PL1Flk3ukUUwZWhsu8EOzMib8AHrsKW_JY'],
  },
  {
    slug: 'journeys',
    titles: {
      'zh-Hant': '天下行',
      'zh-Hans': '天下行',
      en: 'Journeys',
      ja: '世界を歩く',
    },
    topics: {
      'zh-Hant': '行走與觀察',
      'zh-Hans': '行走与观察',
      en: 'Travel & observation',
      ja: '旅と観察',
    },
    playlistIds: ['PL1Flk3ukUUwZWhsu8EOzMib8AHrsKW_JY'],
  },
  {
    slug: 'science',
    titles: {
      'zh-Hant': '科普',
      'zh-Hans': '科普',
      en: 'Ideas & Discovery',
      ja: '科学と発見',
    },
    topics: {
      'zh-Hant': '知識與探索',
      'zh-Hans': '知识与探索',
      en: 'Knowledge & discovery',
      ja: '知識と探究',
    },
    playlistIds: ['PL1Flk3ukUUwZqqkadWf_lO63t9YjnmnbQ'],
  },
  {
    slug: 'personal-accounts',
    titles: {
      'zh-Hant': '名人自述',
      'zh-Hans': '名人自述',
      en: 'Personal Accounts',
      ja: '人物の証言',
    },
    topics: {
      'zh-Hant': '我的家人 · 往事歲月',
      'zh-Hans': '我的家人 · 往事岁月',
      en: 'Family & memories',
      ja: '家族と記憶',
    },
    playlistIds: [
      'PL1Flk3ukUUwZhSrljesLtA-xsklSHwWW3',
      'PL1Flk3ukUUwYB7iQ422m5mIkJNRLhejp8',
    ],
  },
  {
    slug: 'oral-history',
    titles: {
      'zh-Hant': '口述歷史',
      'zh-Hans': '口述历史',
      en: 'Oral History',
      ja: 'オーラルヒストリー',
    },
    topics: {
      'zh-Hant': '塵封記憶',
      'zh-Hans': '尘封记忆',
      en: 'Recollections',
      ja: '記憶をたどる',
    },
    playlistIds: ['PL1Flk3ukUUwa7ELqkjc0rcndcrgnSM5Lx'],
  },
];
export const localeNames: Record<Locale, string> = {
  'zh-Hant': '繁體中文',
  'zh-Hans': '简体中文',
  en: 'English',
  ja: '日本語',
};
export function sitePath(locale: Locale, path = '') {
  const joined = `${locale === 'zh-Hant' ? '' : `/${locale}`}/${path}`;
  const boundary = joined.search(/[?#]/);
  const pathname = boundary < 0 ? joined : joined.slice(0, boundary);
  const suffix = boundary < 0 ? '' : joined.slice(boundary);
  return (pathname.replace(/\/+$/, '') || '/') + suffix;
}
export const homePath = (locale: Locale) => sitePath(locale);
