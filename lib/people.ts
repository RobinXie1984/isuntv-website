import data from './people.json';
import type { Locale } from './catalogue';
export type Person = {
  name: Record<Locale, string>;
  url: string;
  sourceLanguage: string;
  publisher: string;
};
export const people: Partial<Record<string, Person>> = data;
