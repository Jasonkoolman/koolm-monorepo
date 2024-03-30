import { StepsContextValue } from "./types";

export type DeepPartial<T> = T extends any[]
  ? T
  : { [P in keyof T]?: DeepPartial<T[P]> };

export type MockContextValue = DeepPartial<StepsContextValue>;
