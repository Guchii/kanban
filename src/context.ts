import { createContext, useContext } from "react";

type AppContextType = object;

export const AppContext = createContext<AppContextType>({});

export const useAppContext = () => useContext(AppContext);
