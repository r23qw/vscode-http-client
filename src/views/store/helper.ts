const previouseState = window.HTTP_CLIENT.previouseState;

export const getPreviouseState = (module?: string) => {
  if (!module) return previouseState;
  return previouseState?.[module];
};
