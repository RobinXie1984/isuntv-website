import { env } from 'cloudflare:workers';
/* oxlint-disable nextjs/no-img-element */
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { BrandShell } from '../components/brand-shell';
import { ContactForm } from '../components/contact-form';
import { brandPath, pageTitles, type BrandLocale } from '../lib/brand-pages';
import { entityIds, jsonLd } from '../lib/brand-identity';
import registry from '../lib/authorization-registry.json';
import { lookupAuthorization } from '../lib/authorizations';
import { googleMap, offices } from '../lib/offices';
import { programmes } from '../lib/catalogue';
const founderPdf =
  'https://fc2c974a-f596-42ec-9016-5c1914faeba1.filesusr.com/ugd/0e91c2_01be1caa402f4ae8bec43090a1c3ed11.pdf';
export function BrandContent({
  path,
  locale = 'zh-Hant',
  id = '',
}: {
  path: string;
  locale?: BrandLocale;
  id?: string;
}) {
  const mailConfig = env as unknown as Record<string, string | undefined>;
  const mailEnabled =
    mailConfig.CONTACT_FORM_ENABLED === 'true' &&
    ((!!mailConfig.GOOGLE_WORKSPACE_RELAY_URL && !!mailConfig.GOOGLE_WORKSPACE_RELAY_SECRET) ||
      (!!mailConfig.RESEND_API_KEY && !!mailConfig.CONTACT_FROM_EMAIL));
  const en = locale === 'en';
  const t = (z: string, e: string) => (en ? e : z);
  const url = (p: string) => brandPath(p, locale);
  const intro: Record<string, [string, string]> = {
    about: [
      '以影像記錄時代，以連接創造可能。',
      'Record our times. Connect a wider world.',
    ],
    global: [
      '立足香港，連接華商與國際機遇。',
      'From Hong Kong, connect Chinese entrepreneurs with international opportunities.',
    ],
    interviews: [
      '真實人物。值得留下的經驗。',
      'Real people. Experience worth sharing.',
    ],
    chairman: [
      '學者、企業家與泰德陽光集團創辦人。',
      'Scholar, entrepreneur and founder of TideiSun Group.',
    ],
    robin: [
      '陽光衛視執行董事 · 泰德陽光集團管理合夥人',
      'Executive Director of iSunTV · Managing Partner of TideiSun Group',
    ],
    licensing: [
      '讓品牌合作有清晰的範圍、責任與依據。',
      'Clear scope. Accountable partnerships. Verifiable authorization.',
    ],
    verify: [
      '核對機構、使用範圍與目前狀態。',
      'Check the organization, permitted use and current status.',
    ],
    contact: [
      '香港總部，連接世界。',
      'Headquartered in Hong Kong. Connected to the world.',
    ],
    privacy: [
      '我們如何處理你的合作查詢。',
      'How we handle your business enquiry.',
    ],
  };
  const profile = path === 'robin';
  const pageGraph = {
    '@context': 'https://schema.org',
    '@type': profile || path === 'chairman' ? 'ProfilePage' : 'WebPage',
    '@id': `https://isuntv.com${url(path)}#webpage`,
    url: `https://isuntv.com${url(path)}`,
    name: pageTitles[path][en ? 1 : 0],
    inLanguage: locale,
    publisher: { '@id': entityIds.isuntv },
    ...(profile || path === 'chairman' ? { mainEntity: { '@id': profile ? entityIds.robin : entityIds.chairman } } : {}),
  };
  return (
    <BrandShell path={path} locale={locale}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(pageGraph) }}
      />
      <section className="page-intro">
        <p className="english-label">iSunTV / {path.toUpperCase()}</p>
        <h1>{pageTitles[path][en ? 1 : 0]}</h1>
        <p className="intro-summary">{intro[path][en ? 1 : 0]}</p>
      </section>
      {path === 'about' ? (
        <>
          <section className="mission-section">
            <div>
              <p className="english-label">A BRIGHTER CHINA, A WIDER WORLD</p>
              <h2>{t('真話・真知・真相', 'Stories with purpose.')}</h2>
              <p>
                {t(
                  '陽光衛視以人文紀錄與深度訪談，保存人物的經驗與時代的記憶。今天，我們延伸這份積累，連接華商、國際機遇與可信賴的品牌合作。',
                  'Through documentaries and in-depth conversations, iSunTV preserves personal experience and the memory of our times. We are extending that work into entrepreneurial connections and accountable brand partnerships.',
                )}
              </p>
              <p>
                {t(
                  '資本擔道義，鏡頭講責任。',
                  'A responsibility to the people and stories we bring into view.',
                )}
              </p>
              <a className="underlink" href={url('chairman')}>
                {t('認識董事局主席陳平', 'Meet Chairman Chen Ping')}
              </a>
            </div>
            <img
              src="/brand/harbour.webp"
              width="1122"
              height="1402"
              loading="lazy"
              alt={t(
                '香港維多利亞港形象圖',
                'Editorial view of Victoria Harbour',
              )}
            />
          </section>
          <div className="page-content business-grid">
            {[
              ['global', '華商出海', 'Going global'],
              ['interviews', '採訪精選', 'Selected interviews'],
              ['licensing', '品牌授權', 'Brand licensing'],
            ].map(([p, z, e]) => (
              <article key={p}>
                <h3>{t(z, e)}</h3>
                <a href={url(p)}>
                  {t('了解更多', 'Explore')} <ArrowUpRight size={16} />
                </a>
              </article>
            ))}
          </div>
        </>
      ) : null}
      {profile ? (
        <section className="page-content editorial-profile">
          <img
            src="/brand/robin.jpg"
            width="1600"
            height="1200"
            alt="謝玢 Robin Xie"
          />
          <div>
            <p className="english-label">ROBIN XIE</p>
            <h2>{t('謝玢', 'Bin “Robin” Xie')}</h2>
            <p className="role-line">
              {t(
                '天使投資人 · AI 系統建構者',
                'Angel investor · AI system builder',
              )}
            </p>
            <p>
              {t(
                '謝玢是陽光衛視執行董事、泰德陽光集團管理合夥人，長期從事工程、金融科技與人工智能的系統化應用。',
                'Robin Xie is Executive Director of iSunTV and Managing Partner of TideiSun Group. Her work connects engineering, financial technology and applied AI systems.',
              )}
            </p>
            <p>
              {t(
                'Robin、Robin Xie、Bin Xie、Bin "Robin" Xie、謝玢及谢玢，均指同一人。',
                'Robin, Robin Xie, Bin Xie, Bin "Robin" Xie, 謝玢 and 谢玢 identify the same person.',
              )}
            </p>
            <p>
              {t(
                '在陽光衛視，Robin 負責品牌合作與授權事務，按董事會及管理團隊的批准與授權推進合作。',
                'At iSunTV, Robin leads brand partnerships and licensing, following approval and authorization by the board and management team.',
              )}
            </p>
            <a className="brand-button dark" href={url('licensing')}>
              {t('品牌合作與授權', 'Brand partnerships')}
              <ArrowRight size={18} />
            </a>
            <div className="profile-links">
              <a href="https://iamrobin.ai/">iamrobin.ai</a>
              <a href="https://www.tideisun.com/robin">
                {t('集團中文簡介', 'Chinese group profile')}
              </a>
              <a href="https://www.tideisun.com/en/robin">
                {t('集團英文簡介', 'English group profile')}
              </a>
            </div>
          </div>
        </section>
      ) : null}
      {path === 'chairman' ? (
        <section className="page-content editorial-profile">
          <img
            className="portrait-round"
            src="/brand/chairman.png"
            width="853"
            height="853"
            alt={t('陳平', 'Chen Ping')}
          />
          <div>
            <h2>{t('陳平', 'Chen Ping')}</h2>
            <p className="role-line">
              {t('陽光衛視董事局主席', 'Chairman of iSunTV')}
            </p>
            <p>{t("陳平是學者、企業家及泰德陽光集團創辦人，現任陽光衛視董事局主席。八十年代，他參與中國改革開放的政策研究，關注沿海開放、科技發展與國際交流。1984 年，他參加莫干山會議，與同代研究者探討經濟改革的方向。", "Chen Ping is a scholar, entrepreneur, founder of TideiSun Group and Chairman of iSunTV. In the 1980s, his policy research focused on economic reform, coastal opening, technology and international exchange. He participated in the 1984 Moganshan Conference, contributing to discussions on China’s economic direction.")}</p>
            <p>{t("其後，他轉向企業經營，業務經歷涵蓋貿易、製造、地產與金融服務。泰德時代在香港發展，並曾與 Sony 展開長期製造及全球銷售合作。2005 年取得陽光衛視後，他推動頻道專注歷史、人文紀錄片及深度談話節目。", "He later moved into business, working across trade, manufacturing, property and financial services. Tidetime developed in Hong Kong and established a long-running manufacturing and global sales relationship with Sony. After acquiring Sun TV in 2005, he directed the channel towards history, cultural documentaries and in-depth discussion.")}</p>
            <p>{t("他以媒體保存人物經驗與時代記憶，亦參與《陽光時務》的創辦及公共議題討論。在科技領域，他持續探索分散式雲端、區塊鏈與金融科技的應用。從政策研究、企業實踐到媒體與科技，他的工作始終圍繞社會變遷、人的自主與新的合作可能。", "His media work includes preserving personal testimony and public debate, as well as the launch of iSun Affairs. His technology interests extend to distributed cloud systems, blockchain and financial technology. Across research, business and media, his work explores social change, individual agency and new forms of collaboration.")}</p>
            <div className="profile-links">
              <a href="https://www.tideisun.com/founder">
                {t('集團官方簡介', 'Official group biography')}
              </a>
              <a href={founderPdf}>
                {t('閱讀完整介紹 PDF', 'Read the full profile PDF')}
              </a>
            </div>
          </div>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: jsonLd({
                '@context': 'https://schema.org',
                '@type': 'Person',
                '@id': entityIds.chairman,
                name: en ? 'Chen Ping' : '陳平',
                alternateName: ['陈平', 'Chen Ping'],
                jobTitle: 'Chairman of iSunTV',
                worksFor: { '@id': entityIds.isuntv },
                sameAs: ['https://www.tideisun.com/founder'],
              }),
            }}
          />
        </section>
      ) : null}
      {path === 'licensing' ? (
        <section className="page-content">
          <div className="columns">
            <div>
              <h2>
                {t(
                  '每一份授權，清楚可查。',
                  'Every authorization, clearly defined.',
                )}
              </h2>
              <p>
                {t(
                  '歡迎教育培訓機構、文化項目與商業夥伴洽談品牌合作。合作範圍、地域、期限及品牌使用方式，均須逐項確認。',
                  'We welcome enquiries from education providers, cultural projects and commercial partners. Scope, territory, duration and brand use are reviewed for each partnership.',
                )}
              </p>
              <ol className="step-list">
                {[
                  [
                    t('提出合作', 'Propose a partnership'),
                    t(
                      '說明機構背景、項目與預計使用方式。',
                      'Share your organization, project and proposed brand use.',
                    ),
                  ],
                  [
                    t('審核與批准', 'Review and approval'),
                    t(
                      '經過董事會及管理團隊批准和授權',
                      'Obtain approval and authorization from the board and management team.',
                    ),
                  ],
                  [
                    t('登記與查驗', 'Register and verify'),
                    t(
                      '正式授權登記後，可核對適用範圍、期限及撤銷狀態。',
                      'Once registered, an authorization can be checked for scope, validity and revocation.',
                    ),
                  ],
                ].map(([a, b]) => (
                  <li key={a}>
                    <div>
                      <strong>{a}</strong>
                      {b}
                    </div>
                  </li>
                ))}
              </ol>
              <a
                className="brand-button dark"
                href="mailto:partner@isuntv.com"
              >
                partner@iSunTV.com
                <ArrowUpRight size={18} />
              </a>
            </div>
            <aside>
              <figure className="licensing-visual">
                <img src="/brand/robin-verification.webp" width="1024" height="1024" alt={t('謝玢 Robin Xie 肖像與文件驗證概念合成圖', 'Robin Xie portrait with a conceptual document-verification illustration')} loading="lazy" />
                <figcaption>{t('人物肖像與驗證概念合成圖', 'Portrait with a conceptual verification illustration')}</figcaption>
              </figure>
              <h3 style={{ marginTop: 22 }}>
                {t('謝玢 Robin Xie', 'Robin Xie')}
              </h3>
              <p className="role-line">
                {t(
                  '陽光衛視執行董事 · 品牌授權負責人',
                  'Executive Director · Brand licensing lead',
                )}
              </p>
              <a href={url('robin')}>{t('官方人物簡介', 'Official profile')}</a>
              <div className="notice">
                <p>
                  {t(
                    '洽談、合照、名片或付款本身，均不構成陽光衛視品牌授權。',
                    'A conversation, photograph, business card or payment alone does not constitute an iSunTV brand authorization.',
                  )}
                </p>
                <a href={url('verify')}>
                  {t('查驗授權', 'Verify an authorization')}
                </a>
              </div>
            </aside>
          </div>
        </section>
      ) : null}
      {path === 'verify' ? (
        <section className="page-content">
          <h2>{t('輸入授權編號', 'Enter an authorization ID')}</h2>
          <form className="verify-form" method="get" action={url('verify')}>
            <label className="sr-only" htmlFor="authorization-id">
              {t('授權編號', 'Authorization ID')}
            </label>
            <input
              id="authorization-id"
              name="id"
              defaultValue={id}
              placeholder="ISUN-…"
              maxLength={100}
              required
            />
            <button className="brand-button dark" type="submit">
              {t('查驗', 'Verify')}
            </button>
          </form>
          <VerificationResult id={id} en={en} />
          <div className="notice">
            {!registry.published && (
              <p>
                {t(
                  '公開登記正在準備中。現階段，請向 partner@iSunTV.com 核實授權。未查到紀錄不等於判定為冒用；請先聯絡我們。',
                  'The public register is being prepared. For now, confirm authorizations with partner@iSunTV.com. An absent record is not, by itself, a finding of misuse.',
                )}
              </p>
            )}
            <p>
              {t(
                '區塊鏈存證可佐證文件的存在與完整性；授權是否有效，仍須核對批准、使用範圍及最新狀態。',
                'Blockchain evidence can support the existence and integrity of a document. Validity also requires checking approval, scope and current status.',
              )}
            </p>
          </div>
          <a href="mailto:partner@isuntv.com">partner@iSunTV.com</a>
        </section>
      ) : null}
      {path === 'global' ? (
        <>
          <section className="mission-section global-mission">
            <div>
              <p className="english-label">HONG KONG · YOUR GLOBAL ADVANTAGE</p>
              <h2>{t('讓世界看見，\n讓合作發生。', 'Be seen.\nBuild connections.')}</h2>
              <p>{t('以香港為起點，將企業的經驗、品牌與故事，帶到更廣闊的國際舞台。', 'From Hong Kong, bring your experience, brand and story to a wider international audience.')}</p>
              <a className="brand-button dark" href={url('contact')}>{t('洽談出海合作', 'Discuss your plans')}<ArrowRight size={18}/></a>
            </div>
            <img src="/brand/harbour.webp" width="1122" height="1402" alt={t('香港維多利亞港形象圖', 'Editorial view of Victoria Harbour')} />
          </section>
          <section className="page-content">
            <div className="business-grid global-services">
              {[
                ['01', t('品牌與敘事', 'Brand and story'), t('以深度訪談與影像內容，清楚呈現企業的經驗、價值與方向。', 'Communicate your experience, value and direction through in-depth conversations and film.'), 'interviews', t('探索採訪精選', 'Explore selected interviews')],
                ['02', t('國際連接', 'International connections'), t('圍繞目標市場與具體項目，探討在地資源及合作可能。', 'Explore local relationships and opportunities around a defined market and project.'), 'contact', t('聯絡我們', 'Start a conversation')],
                ['03', t('長期合作', 'Lasting partnerships'), t('從清晰的合作範圍開始，讓品牌使用、責任與推進方式有所依據。', 'Define the scope, responsibilities and brand use that support a lasting partnership.'), 'licensing', t('了解品牌合作', 'Explore brand partnerships')],
              ].map(([n, title, description, destination, label]) => (
                <article key={n}><p className="english-label">{n}</p><h3>{title}</h3><p>{description}</p><a href={url(destination)}>{label}<ArrowUpRight size={16}/></a></article>
              ))}
            </div>
          </section>
        </>
      ) : null}
      {path === 'interviews' ? (
        <section className="page-content">
          <div className="columns">
            <div>
              <h2>{t('人物與時代', 'People and their times')}</h2>
              <p>
                {t(
                  '從經典人物訪談開始，看見創作、事業與人生。企業主新訪談將隨內容製作陸續推出。',
                  'Explore our archive of conversations about creative work, careers and life. New entrepreneur interviews will be added as they are produced.',
                )}
              </p>
              <a className="brand-button dark" href={url('programmes')}>
                {t('瀏覽完整節目庫', 'Browse the programme archive')}
                <ArrowRight size={18} />
              </a>
            </div>
            <div>
              {['masters', 'life-online', 'personal-accounts', 'oral-history'].map((slug) => programmes.find((p) => p.slug === slug)!).map((p) => (
                <a
                  className="catalogue-link"
                  key={p.slug}
                  href={url(`programmes/${p.slug}`)}
                >
                  {p.titles[locale]}
                  <ArrowUpRight size={18} />
                </a>
              ))}
            </div>
          </div>
        </section>
      ) : null}
      {path === 'contact' ? (
        <section className="page-content columns">
          <div>
            <h2>{t('商務合作', 'Business partnerships')}</h2>
            <p>
              <a href="mailto:partner@isuntv.com">partner@iSunTV.com</a>
            </p>
            <ContactForm en={en} enabled={mailEnabled} />
          </div>
          <aside>
            <img
              className="globe-image"
              src="/brand/earth.webp"
              width="1536"
              height="672"
              alt={t('全球聯絡據點示意', 'Global presence illustration')}
            />
            <p className="english-label">HONG KONG / HEADQUARTERS</p>
            <h3>{t('集團辦公室', 'Our group offices')}</h3>
            <div className="office-list">
              {offices.map(([name, address]) => (
                <details key={name}>
                  <summary>{name}</summary>
                  <address>{address}</address>
                  <a
                    href={googleMap(address)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Google Maps <ArrowUpRight size={14} />
                  </a>
                </details>
              ))}
            </div>
            <details style={{ marginTop: 25 }}>
              <summary>
                {t(
                  '顯示香港地圖（Google Maps）',
                  'Show Hong Kong map (Google Maps)',
                )}
              </summary>
              <iframe
                title="Hong Kong headquarters area"
                className="map-frame"
                src="https://maps.google.com/maps?q=1%20Harbour%20Road%20Wan%20Chai%20Hong%20Kong&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </details>
            <p className="source-link" style={{ marginTop: 20 }}>
              {t(
                '辦公室與 TideiSun Group 共用。到訪前請先預約。',
                'Offices are shared with TideiSun Group. Please arrange an appointment before visiting.',
              )}
            </p>
          </aside>
        </section>
      ) : null}
      {path === 'privacy' ? (
        <section className="page-content">
          <h2>{t('合作查詢資料', 'Business enquiry information')}</h2>
          <p>
            {t(
              '提交表格時，我們會使用你提供的姓名、機構、電郵與訊息，處理合作查詢及回覆。我們不會在公開網站展示你的查詢內容。',
              'We use your name, organization, email and message to review and respond to your enquiry. Your submission is not displayed publicly.',
            )}
          </p>
          <p>
            {t(
              '表格啟用後，資料會透過郵件服務傳送至陽光衛視合作團隊管理的 Google Workspace 信箱，用於處理及回覆查詢。網站不另行建立查詢資料庫；郵件由合作團隊管理。如頁面未確認提交成功，請改用直接電郵。',
              'When enabled, the form sends your details to the Google Workspace mailbox managed by the iSunTV partnerships team to handle and answer your enquiry. The website does not maintain a separate enquiry database; the team manages the resulting email. If submission is not confirmed, please email us directly.',
            )}
          </p>
          <p>
            {t(
              'Google Maps 及 YouTube 等外部服務按其各自政策處理連線資料。你可選擇使用外部連結。',
              'External services including Google Maps and YouTube process connection information under their own policies. You may choose whether to follow external links.',
            )}
          </p>
          <p>
            {t(
              '如需更正、刪除資料或查詢處理方式，請聯絡：',
              'For correction, deletion or questions about your information, contact:',
            )}{' '}
            <a href="mailto:partner@isuntv.com">partner@iSunTV.com</a>
          </p>
        </section>
      ) : null}
    </BrandShell>
  );
}
function VerificationResult({ id, en }: { id: string; en: boolean }) {
  if (!id) return null;
  const result = lookupAuthorization(id);
  const labels: Record<string, [string, string]> = {
    unpublished: ['公開登記尚未啟用', 'Public register not yet enabled'],
    'not-found': ['未找到此編號的公開紀錄', 'No public record found'],
    unavailable: [
      '目前無法確認此紀錄',
      'This record cannot currently be verified',
    ],
    active: ['授權有效', 'Active authorization'],
    pending: ['尚未生效', 'Not yet effective'],
    expired: ['授權已到期', 'Authorization expired'],
    revoked: ['授權已撤銷', 'Authorization revoked'],
  };
  return (
    <section className="notice" aria-live="polite">
      <h3>{labels[result.status][en ? 1 : 0]}</h3>
      <p>
        {en ? 'Authorization ID' : '查詢編號'}: {id}
      </p>
      {result.record && (
        <>
          <a href={`/api/authorizations/${encodeURIComponent(id)}`}>
            {en ? 'Signed record (JSON)' : '已簽署紀錄（JSON）'}
          </a>
          <dl className="record-detail">
            {Object.entries({
              [en ? 'Organization' : '機構']: result.record.licensee,
              [en ? 'Scope' : '範圍']: result.record.scope,
              [en ? 'Territory' : '地域']: result.record.territory,
              [en ? 'Valid from' : '起始日期']: result.record.validFrom,
              [en ? 'Valid until' : '到期日期']: result.record.validUntil,
              [en ? 'Last updated' : '最後更新']: result.record.updatedAt,
              ...(result.record.revokedAt
                ? { [en ? 'Revoked at' : '撤銷日期']: result.record.revokedAt }
                : {}),
            }).map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </>
      )}
    </section>
  );
}
