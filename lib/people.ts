import data from './generated/people.json';
import type { Locale } from './catalogue';
export type Person = {
  name: Partial<Record<Locale, string>>;
  aliases?: string[];
  url: string;
  sourceLanguage: string;
  publisher: string;
};
export const people: Partial<Record<string, Person>> = data;
