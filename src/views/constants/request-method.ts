export const HTTP_METHODS = {
  GET: "get",
  POST: "post",
  PUT: "put",
  PATCH: "patch",
  DELETE: "delete",
  HEAD: "head",
  OPTIONS: "options",
} as const;

type ValueOf<T> = T[keyof T];

export type HTTP_METHODS_VALUES = ValueOf<typeof HTTP_METHODS>;
