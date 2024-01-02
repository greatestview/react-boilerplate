import React from "react";
import { createRoot } from "react-dom/client";

import "./focus-style/style.css";
import App from "./components/App.jsx";

const launchApp = () => {
  const containerEl = document.querySelector("#root");
  const root = createRoot(containerEl);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};

launchApp();
