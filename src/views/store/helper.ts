import { RootState } from "@/store";
import { isVscodeWebview } from "@/utils/env";
import { GetRequired } from "@/utils/type";

const previouseState = isVscodeWebview
  ? window.HTTP_CLIENT.previouseState
  : undefined;

export const getPreviouseState = (module: keyof GetRequired<RootState>) => {
  if (previouseState === undefined) return undefined;
  return (previouseState as RootState)[module];
};
