export type ValueOf<T> = T[keyof T];

export type GetRequired<T> = Pick<
  T,
  {
    [I in keyof T]-?: T extends Record<I, T[I]> ? I : never;
  }[keyof T]
>;
