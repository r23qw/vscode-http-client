export type ValueOf<T> = T[keyof T];

export type GetRequired<T> = Pick<
  T,
  {
    [I in keyof T]-?: T extends Record<I, T[I]> ? I : never;
  }[keyof T]
>;

export type ValueOfSelectList<L extends { name: string; value: string }[]> = {
  [K in keyof L]: K extends number ? L[K]["value"] : never;
}[number];
