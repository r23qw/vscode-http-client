import { ValueOf } from "../utils/type";
export const LANGUAGE = {
  PLAIN_TEXT: "plaintext",
  JSON: "json",
  HTML: "html",
} as const;

export type LANGUAGE_VALUES = ValueOf<typeof LANGUAGE>;

const PLAIN_TEXT = { name: "Plain Text", value: LANGUAGE.PLAIN_TEXT } as const;
const JSON = { name: "JSON", value: LANGUAGE.JSON } as const;
const HTML = { name: "HTML", value: LANGUAGE.HTML } as const;

export type LanguageList = { name: string; value: LANGUAGE_VALUES }[];

export const RequestLanguageList = [PLAIN_TEXT, JSON];

export const ResponseLanguageList = [PLAIN_TEXT, JSON, HTML];
