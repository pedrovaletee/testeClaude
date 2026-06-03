import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AnunciosProvider } from "./context/AnunciosContext";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AnunciosProvider>
        <App />
      </AnunciosProvider>
    </BrowserRouter>
  </StrictMode>
);
