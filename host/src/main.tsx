import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ModalsContextProvider } from "@mf/context";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ModalsContextProvider>
      <App />
    </ModalsContextProvider>
  </StrictMode>,
);
