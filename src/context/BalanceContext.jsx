import React, { createContext, useContext, useEffect, useState } from "react";

const BalanceContext = createContext(null);

export function BalanceProvider({ children }) {
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchBalance() {
    setLoading(true);
    try {
      const res = await fetch(
        "https://macdon.morelinks.com.ng/get_last_balance.php",
      );
      const data = await res.json();
      if (data && data.balance !== undefined) {
        setBalance(Number(data.balance));
      } else {
        setBalance(0);
      }
      setError(null);
    } catch (err) {
      console.error("Failed to fetch balance:", err);
      setError(err);
      setBalance(0);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchBalance();
  }, []);

  return (
    <BalanceContext.Provider
      value={{ balance, setBalance, loading, error, refresh: fetchBalance }}
    >
      {children}
    </BalanceContext.Provider>
  );
}

export function useBalance() {
  const ctx = useContext(BalanceContext);
  if (!ctx) throw new Error("useBalance must be used within a BalanceProvider");
  return ctx;
}

export default BalanceContext;
