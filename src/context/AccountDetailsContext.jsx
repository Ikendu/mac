import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchAccountDetails } from "../utils/accountUtils";

const AccountDetailsContext = createContext(null);

export function AccountDetailsProvider({ children }) {
  const [accountName, setAccountName] = useState("Tijani Barakat Olayinka");
  const [accountNumber, setAccountNumber] = useState("3230350703");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function loadAccountDetails() {
    setLoading(true);
    try {
      const details = await fetchAccountDetails();
      if (details) {
        setAccountName(details.account_name);
        setAccountNumber(details.account_number);
      }
      setError(null);
    } catch (err) {
      console.error("Failed to fetch account details:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAccountDetails();

    // Listen for account details updates
    const handleUpdate = () => {
      loadAccountDetails();
    };
    window.addEventListener("accountDetailsUpdated", handleUpdate);
    return () => window.removeEventListener("accountDetailsUpdated", handleUpdate);
  }, []);

  return (
    <AccountDetailsContext.Provider
      value={{
        accountName,
        setAccountName,
        accountNumber,
        setAccountNumber,
        loading,
        error,
        refresh: loadAccountDetails,
      }}
    >
      {children}
    </AccountDetailsContext.Provider>
  );
}

export function useAccountDetails() {
  const ctx = useContext(AccountDetailsContext);
  if (!ctx)
    throw new Error("useAccountDetails must be used within an AccountDetailsProvider");
  return ctx;
}
