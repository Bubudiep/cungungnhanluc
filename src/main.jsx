import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/css/all.scss";
import "./assets/css/animation.scss";
import App from "./components/App";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
