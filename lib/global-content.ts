import type { BrandLocale } from './brand-pages';

export type GlobalCopy = {
  intro: string; headline: string; heritage: string; audience: string; mission: string;
  contact: string; interviews: string; pillarsTitle: string;
  pillars: [string, string][]; sectorsTitle: string; sectorsIntro: string; sectors: [string,string][];
  processTitle: string; process: [string,string][]; closing: string; closingBody: string;
  captions: string[]; imageConcept: string; gallery: string; slide: string;
  previous: string; next: string; pause: string; play: string;
};
export const globalContent: Record<BrandLocale, GlobalCopy> = {
  'zh-Hant': {
    intro: '從華人世界，走向全球市場。', headline: '讓世界看見，\n讓合作發生。',
    heritage: '始於 2000 年的華語人文電視品牌', audience: '面向全球約 6,000 萬海外華人',
    mission: '以人文積澱連接文化與商業。陽光衛視透過深度訪談、影像敘事與跨市場合作，讓世界認識中國品牌，也認識品牌背後的人。',
    contact: '洽談出海合作', interviews: '探索採訪精選', pillarsTitle: '從故事到連接',
    pillars: [['品牌與敘事','以深度訪談與影像內容，呈現企業的經驗、價值與方向。'],['國際連接','圍繞目標市場與具體項目，探討在地資源與專業夥伴。'],['長期合作','商定合作範圍、素材權利與品牌使用方式，讓每一步有清晰的責任與依據。']],
    sectorsTitle: '一起探索內容出海', sectorsIntro: '我們期待與製作、發行及品牌團隊展開對話，從適合的市場與項目開始。',
    sectors: [['短劇與短影音','面向海外受眾，探索選題、內容本地化與品牌合作。'],['直播與串流媒體','圍繞節目或活動，討論聯合內容製作與傳播安排。'],['遊戲與互動娛樂','與製作及發行團隊探討品牌敘事和跨市場合作。']],
    processTitle: '把想法變成第一個項目',
    process: [['確定對象','一個目標市場，一類明確受眾。'],['商定內容','選定訪談、短影音或專題內容的範圍。'],['明確責任','確認素材權利、品牌用法、交付與驗收。'],['復盤結果','觀察實際反饋，再決定後續投入。']],
    closing: '你的品牌，下一站在哪裡？', closingBody: '告訴我們你希望進入的市場、現有內容與團隊，以及第一個想完成的項目。',
    captions: ['從華人世界，走向全球市場','讓市場認識品牌背後的人','以人文積澱，留下值得傳承的故事','跨越語言，讓彼此理解','連接市場，也連接專業夥伴','探索短影音、串流與互動內容','讓項目有清晰的範圍與交付','以對話找到合作的起點','面向世界，開啟下一段旅程'],
    imageConcept: '創意形象圖', gallery: '華商出海影像', slide: '圖片', previous: '上一張', next: '下一張', pause: '暫停輪播', play: '播放輪播',
  },
  'zh-Hans': {
    intro: '从华人世界，走向全球市场。', headline: '让世界看见，\n让合作发生。',
    heritage: '始于 2000 年的华语人文电视品牌', audience: '面向全球约 6,000 万海外华人',
    mission: '以人文积淀连接文化与商业。阳光卫视通过深度访谈、影像叙事与跨市场合作，让世界认识中国品牌，也认识品牌背后的人。',
    contact: '洽谈出海合作', interviews: '探索采访精选', pillarsTitle: '从故事到连接',
    pillars: [['品牌与叙事','以深度访谈与影像内容，呈现企业的经验、价值与方向。'],['国际连接','围绕目标市场与具体项目，探讨当地资源与专业伙伴。'],['长期合作','商定合作范围、素材权利与品牌使用方式，让每一步有清晰的责任与依据。']],
    sectorsTitle: '一起探索内容出海', sectorsIntro: '我们期待与制作、发行及品牌团队展开对话，从适合的市场与项目开始。',
    sectors: [['短剧与短视频','面向海外受众，探索选题、内容本地化与品牌合作。'],['直播与流媒体','围绕节目或活动，讨论联合内容制作与传播安排。'],['游戏与互动娱乐','与制作及发行团队探讨品牌叙事和跨市场合作。']],
    processTitle: '把想法变成第一个项目',
    process: [['确定对象','一个目标市场，一类明确受众。'],['商定内容','选定访谈、短视频或专题内容的范围。'],['明确责任','确认素材权利、品牌用法、交付与验收。'],['复盘结果','观察实际反馈，再决定后续投入。']],
    closing: '你的品牌，下一站在哪里？', closingBody: '告诉我们你希望进入的市场、现有内容与团队，以及第一个想完成的项目。',
    captions: ['从华人世界，走向全球市场','让市场认识品牌背后的人','以人文积淀，留下值得传承的故事','跨越语言，让彼此理解','连接市场，也连接专业伙伴','探索短视频、流媒体与互动内容','让项目有清晰的范围与交付','以对话找到合作的起点','面向世界，开启下一段旅程'],
    imageConcept: '创意形象图', gallery: '华商出海影像', slide: '图片', previous: '上一张', next: '下一张', pause: '暂停轮播', play: '播放轮播',
  },
  en: {
    intro: 'From the Chinese-speaking world to global markets.', headline: 'Be seen.\nBuild connections.',
    heritage: 'A Chinese-language cultural television brand since 2000', audience: 'For a worldwide community of around 60 million overseas Chinese',
    mission: 'Culture gives business a human voice. Through in-depth interviews, film and cross-market collaboration, iSunTV introduces Chinese brands to the world—and the people behind them.',
    contact: 'Discuss your plans', interviews: 'Explore selected interviews', pillarsTitle: 'Stories that open conversations',
    pillars: [['Brand storytelling','Bring your experience, values and direction to life through thoughtful interviews and film.'],['International connections','Explore local expertise and potential partners around a specific market and project.'],['Lasting partnerships','Agree on scope, content rights and brand use, with clear responsibilities from the outset.']],
    sectorsTitle: 'New possibilities for content abroad', sectorsIntro: 'We welcome conversations with production, distribution and brand teams, starting with the right market and a well-defined project.',
    sectors: [['Short dramas and short-form video','Explore editorial ideas, localization and brand collaborations for audiences abroad.'],['Live content and streaming','Discuss co-production and distribution around a programme or event.'],['Gaming and interactive entertainment','Work with creators and publishers to explore brand storytelling across markets.']],
    processTitle: 'Shape the first project',
    process: [['Define the audience','Choose a target market and a clearly defined audience.'],['Agree on the content','Set the scope for an interview, short-form video or editorial feature.'],['Clarify responsibilities','Confirm content rights, brand use, deliverables and acceptance criteria.'],['Learn from the response','Review real audience feedback before deciding on the next investment.']],
    closing: 'Where will your brand go next?', closingBody: 'Tell us about your target market, existing content and team, and the first project you would like to bring to life.',
    captions: ['From the Chinese-speaking world to global markets','Meet the people behind the brand','Preserving stories with lasting cultural value','Across languages, towards understanding','Connecting markets and professional expertise','Exploring short-form, streaming and interactive content','Clear scope. Tangible deliverables.','Good partnerships begin with a conversation','A new chapter, open to the world'],
    imageConcept: 'Concept imagery', gallery: 'Going global in images', slide: 'Image', previous: 'Previous image', next: 'Next image', pause: 'Pause slideshow', play: 'Play slideshow',
  },
  ja: {
    intro: '華人社会から、世界の市場へ。', headline: '世界に伝える。\nつながりを育む。',
    heritage: '2000年から続く、中国語の文化・ドキュメンタリーテレビブランド', audience: '世界約6,000万人の海外華人社会に向けて',
    mission: '文化への深い理解を、ビジネスを伝える力に。iSunTVは、丁寧なインタビューと映像、国境を越えた協業を通じて、中国ブランドと、その背後にいる人々の思いを世界へ届けます。',
    contact: '海外展開のご相談', interviews: 'インタビューを見る', pillarsTitle: '物語から、次のつながりへ',
    pillars: [['ブランドを伝える','インタビューと映像を通じて、企業が培ってきた経験、価値観、目指す方向を伝えます。'],['海外との接点をつくる','対象市場と具体的な案件を起点に、現地の知見や専門パートナーとの連携を探ります。'],['継続できる協業へ','業務範囲、素材の権利、ブランドの使用条件を確認し、役割と責任を明確にします。']],
    sectorsTitle: 'コンテンツの海外展開を、ともに', sectorsIntro: '制作・配信・ブランドの各チームとの対話を歓迎します。相性のよい市場と、具体的な企画から始めましょう。',
    sectors: [['ショートドラマ・短尺動画','海外視聴者に合う企画やローカライズ、ブランドとの協業を検討します。'],['ライブ配信・ストリーミング','番組やイベントを軸に、共同制作と配信の進め方を話し合います。'],['ゲーム・インタラクティブ作品','制作会社やパブリッシャーと、ブランド表現や市場をまたぐ連携を探ります。']],
    processTitle: '最初の企画を、具体的な形に',
    process: [['届ける相手を決める','対象市場と、届けたい視聴者を明確にします。'],['内容をすり合わせる','インタビュー、短尺動画、特集などの制作範囲を決めます。'],['役割を明確にする','素材の権利、ブランド使用、納品物と検収条件を確認します。'],['反応から学ぶ','実際の反応を振り返り、次の取り組みを判断します。']],
    closing: 'ブランドの次の舞台は、どこですか。', closingBody: '目指す市場、現在のコンテンツやチーム、まず実現したい企画をお聞かせください。',
    captions: ['華人社会から、世界の市場へ','ブランドの背後にいる人を伝える','時代を越えて残る物語を','言葉の壁を越え、理解を深める','市場と専門家をつなぐ','短尺動画・配信・インタラクティブの可能性','範囲と成果物を明確に','対話から始まる協業','世界へ開く、次の一歩'],
    imageConcept: 'コンセプトイメージ', gallery: '海外展開のイメージ', slide: '画像', previous: '前の画像', next: '次の画像', pause: '自動再生を停止', play: '自動再生を開始',
  },
  he: {
    intro: 'מהעולם דובר הסינית אל השווקים הגלובליים.', headline: 'לספר לעולם.\nלפתוח דלת לשותפות.',
    heritage: 'מותג טלוויזיה לתרבות ותעודה בשפה הסינית, מאז שנת 2000', audience: 'פונים לקהילה עולמית של כ־60 מיליון בני התפוצה הסינית',
    mission: 'תרבות מעניקה לעסקים קול אנושי. באמצעות ראיונות עומק, תוכן מצולם ושיתופי פעולה בין שווקים, iSunTV מציגה לעולם מותגים סיניים — ואת האנשים שמאחוריהם.',
    contact: 'נדבר על התוכניות שלכם', interviews: 'לראיונות נבחרים', pillarsTitle: 'מסיפור טוב לשיחה משמעותית',
    pillars: [['הסיפור שמאחורי המותג','ראיונות עומק ותוכן מצולם שמביאים לידי ביטוי את הניסיון, הערכים והכיוון של החברה.'],['קשרים בינלאומיים','בוחנים ידע מקומי ושותפים מקצועיים סביב שוק יעד ופרויקט מוגדר.'],['שותפות לאורך זמן','מסכימים מראש על היקף העבודה, זכויות התוכן והשימוש במותג, עם אחריות ברורה לכל צד.']],
    sectorsTitle: 'הזדמנויות חדשות לתוכן מעבר לים', sectorsIntro: 'נשמח לשוחח עם צוותי הפקה, הפצה ומותגים, ולצאת לדרך עם השוק המתאים ופרויקט ממוקד.',
    sectors: [['דרמות קצרות וסרטונים קצרים','בוחנים רעיונות, התאמה לשוק המקומי ושיתופי פעולה עם מותגים לקהלים בחו״ל.'],['שידורים חיים וסטרימינג','דנים בהפקה משותפת ובהפצה סביב תוכנית או אירוע.'],['גיימינג ובידור אינטראקטיבי','בוחנים עם יוצרים ומפיצים דרכים לספר את סיפור המותג ולפעול במספר שווקים.']],
    processTitle: 'מגבשים את הפרויקט הראשון',
    process: [['מגדירים קהל','בוחרים שוק יעד וקהל ברור.'],['מסכימים על התוכן','קובעים את היקף הראיון, הסרטון הקצר או הכתבה.'],['מבהירים אחריות','מאשרים זכויות תוכן, שימוש במותג, תוצרים ותנאי קבלה.'],['לומדים מהתגובה','בוחנים משוב מהשטח לפני שמחליטים על ההשקעה הבאה.']],
    closing: 'מה היעד הבא של המותג שלכם?', closingBody: 'ספרו לנו על שוק היעד, התוכן והצוות הקיימים, ועל הפרויקט הראשון שתרצו להוציא לפועל.',
    captions: ['מהעולם דובר הסינית אל השווקים הגלובליים','מכירים את האנשים שמאחורי המותג','משמרים סיפורים בעלי ערך תרבותי מתמשך','מעבר לשפות, בדרך להבנה','מחברים בין שווקים ואנשי מקצוע','תוכן קצר, סטרימינג וחוויות אינטראקטיביות','היקף ברור ותוצרים מוגדרים','שותפות טובה מתחילה בשיחה','פרק חדש, פתוח לעולם'],
    imageConcept: 'הדמיה רעיונית', gallery: 'יוצאים לעולם בתמונות', slide: 'תמונה', previous: 'לתמונה הקודמת', next: 'לתמונה הבאה', pause: 'השהיית המצגת', play: 'הפעלת המצגת',
  },
};
export const globalImageNames = ['02-global-trade', '03-storytelling', '04-cultural-archive', '05-languages', '06-connections', '07-production', '08-project', '09-partnership', '10-horizon'];
