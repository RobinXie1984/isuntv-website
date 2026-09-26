import profile from './generated/site.json';
export type SiteLocale = 'zh-Hant' | 'zh-Hans' | 'en' | 'fr' | 'es' | 'ja' | 'hi' | 'he';
export const defaultLocale = profile.defaultLocale as SiteLocale;
export const publicOrigin = profile.publicOrigin;
export const siteId = profile.siteId as 'isuntv' | 'isun1' | 'isunmedia';
export const interviewProgrammeIds = profile.interviews;
