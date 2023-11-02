import { createContext, type Dispatch, type SetStateAction } from "react";

export type AppContextType = {
  grouping: "status" | "user" | "priority";
  sorting: "priority" | "title";
};

export const AppContext = createContext<
  [AppContextType, Dispatch<SetStateAction<AppContextType>>]
>([{ grouping: "status", sorting: "priority" }, () => {}]);
