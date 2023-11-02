import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "@/index.css";
import { AppContextProvider } from "@/providers.tsx";
import Header from "@/components/header.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppContextProvider>
      <Header />
      <App />
    </AppContextProvider>
  </React.StrictMode>
);
