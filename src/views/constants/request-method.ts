import type { ValueOf } from "@/utils/type";

export const HTTP_METHODS = {
  GET: "get",
  POST: "post",
  PUT: "put",
  PATCH: "patch",
  DELETE: "delete",
  HEAD: "head",
  OPTIONS: "options",
} as const;

export type HTTP_METHODS_VALUES = ValueOf<typeof HTTP_METHODS>;
