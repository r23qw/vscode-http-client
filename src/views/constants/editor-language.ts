export const LANGUAGE = {
  PLAIN_TEXT: "plaintext",
  JSON: "json",
  HTML: "html",
} as const;

const PLAIN_TEXT = { name: "Plain Text", value: LANGUAGE.PLAIN_TEXT } as const;
const JSON = { name: "JSON", value: LANGUAGE.JSON } as const;
const HTML = { name: "HTML", value: LANGUAGE.HTML } as const;

export const RequestLanguageList = [PLAIN_TEXT, JSON];

export const ResponseLanguageList = [PLAIN_TEXT, JSON, HTML];
