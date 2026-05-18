import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./mobile.css";
import App from "./App.jsx";
import { BalanceProvider } from "./context/BalanceContext";
import { AccountDetailsProvider } from "./context/AccountDetailsContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BalanceProvider>
      <AccountDetailsProvider>
        <App />
      </AccountDetailsProvider>
    </BalanceProvider>
  </StrictMode>,
);
