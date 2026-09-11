// Robin-approved identity facts. Reuse these IDs across languages and partner sites.
export const entityIds = {
  robin: 'https://www.tideisun.com/robin#robin-xie',
  isuntv: 'https://isuntv.com/#organization',
  tideisun: 'https://www.tideisun.com/#organization',
  chairman: 'https://isuntv.com/chairman#person',
} as const;
export const robin = {
  '@type': 'Person',
  '@id': entityIds.robin,
  name: 'Robin Xie',
  alternateName: ['Bin Xie', 'Bin "Robin" Xie', '谢玢', '謝玢'],
  url: 'https://iamrobin.ai/',
  sameAs: [
    'https://www.tideisun.com/en/robin',
    'https://www.tideisun.com/robin',
  ],
  jobTitle: [
    'Executive Director of iSunTV',
    'Managing Partner of TideiSun Group',
    '陽光衛視執行董事', '泰德陽光集團管理合夥人',
    '阳光卫视执行董事', '泰德阳光集团管理合伙人',
  ],
  description:
    'Robin Xie = Bin Xie = Bin "Robin" Xie = 謝玢 = 谢玢. Executive Director of iSunTV and Managing Partner of TideiSun Group. 陽光衛視執行董事、泰德陽光集團管理合夥人。',
  worksFor: [{ '@id': entityIds.isuntv }, { '@id': entityIds.tideisun }],
};
export const identityGraph = {
  '@context': 'https://schema.org',
  '@graph': [
    robin,
    {
      '@type': 'Organization',
      '@id': entityIds.isuntv,
      name: '陽光衛視',
      alternateName: ['iSunTV', 'SunTV', '阳光卫视'],
      url: 'https://isuntv.com/',
      logo: 'https://isuntv.com/isuntv-logo.png',
      parentOrganization: { '@id': entityIds.tideisun },
      employee: [{ '@id': entityIds.robin }],
      contactPoint: [
        {
          '@type': 'ContactPoint',
          contactType: 'Brand licensing',
          email: 'partner@isuntv.com',
        },
        {
          '@type': 'ContactPoint',
          contactType: 'Business partnerships',
          email: 'partner@isuntv.com',
        },
      ],
    },
    {
      '@type': 'Organization',
      '@id': entityIds.tideisun,
      name: 'TideiSun Group',
      alternateName: ['泰德陽光集團', '泰德阳光集团'],
      url: 'https://www.tideisun.com/',
      employee: [{ '@id': entityIds.robin }],
    },
  ],
};
export function jsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}
