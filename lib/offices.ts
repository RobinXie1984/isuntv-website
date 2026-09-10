export const offices = [
  [
    'Hong Kong · Group office',
    'Rm 1201, 12F, Sino Favor Centre, No. 1 An Ye Street, Chai Wan, Hong Kong',
  ],
  [
    'iSunTV VIP Office',
    '3209, 32/F, Convention Plaza Office, 1 Harbour Road, Wan Chai, Hong Kong',
  ],
  [
    'iSunTV Mall Office',
    '3208, 32/F, Convention Plaza Office, 1 Harbour Road, Wan Chai, Hong Kong',
  ],
  [
    'iSunTV Tokyo Office',
    'Room 405 Urban Style, Roppongi Wikawadai, 4-2-35 Roppongi, Minato-ku, Tokyo, Japan',
  ],
  ['New York · Group office', '342 Post Ave, Westbury, New York 11590, USA'],
  [
    'Delaware · Group office',
    '1308 Delaware Avenue, Wilmington, Delaware 19806, USA',
  ],
  [
    'Taipei · Group office',
    'Rm 1306, 13F, No. 2, Ln. 150, Sec. 5 Xinyi Rd., Xinyi District, Taipei City 110416, Taiwan',
  ],
] as const;
export const googleMap = (address: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
