import type { PropsWithChildren } from "react";
import { useEffect, useState } from "react";
import { AppContext, AppContextType } from "@/context";

export const AppContextProvider = ({ children }: PropsWithChildren) => {
  const [ticketsData, setTicketsData] = useState<AppContextType>(() => {
    const ticketsData = localStorage.getItem("ticketsData");
    if (!ticketsData || ticketsData === "null") {
      return { grouping: "status", sorting: "priority" };
    }
    const final = JSON.parse(ticketsData) as AppContextType;
    return final;
  });
  useEffect(() => {
    localStorage.setItem("ticketsData", JSON.stringify(ticketsData));
  }, [ticketsData]);
  return (
    <AppContext.Provider value={[ticketsData, setTicketsData]}>
      {children}
    </AppContext.Provider>
  );
};
