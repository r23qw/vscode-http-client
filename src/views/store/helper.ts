import { isVscodeWebview } from "@/utils/env";

const previouseState = isVscodeWebview
  ? window.HTTP_CLIENT.previouseState
  : undefined;

export const getPreviouseState = (module?: string) => {
  if (!module || previouseState === undefined) return undefined;
  return previouseState[module];
};
