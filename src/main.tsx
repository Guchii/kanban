import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/App";
import "@/index.css";
import { AppContextProvider } from "@/providers";
import Header from "@/components/header";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppContextProvider>
      <Header />
      <App />
    </AppContextProvider>
  </React.StrictMode>
);
