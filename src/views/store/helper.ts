import { RootState } from "@/store";
import { isVscodeWebview } from "@/utils/env";
import { GetRequired } from "@/utils/type";

const previouseState = isVscodeWebview
  ? JSON.parse(decodeURI(window.HTTP_CLIENT?.previouseState || "null"))
  : undefined;

export const getPreviouseState = (module: keyof GetRequired<RootState>) => {
  if (!previouseState) return undefined;
  return (previouseState as RootState)[module];
};
