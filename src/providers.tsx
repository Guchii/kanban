import { PropsWithChildren } from "react";
import { AppContext } from "./context";

export const AppContextProvider = ({ children }: PropsWithChildren) => {
  return <AppContext.Provider value={{}}>{children}</AppContext.Provider>;
};
