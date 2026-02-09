import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./form.css";
import "./styles.css";

import DashboardHeader from "../components/DashboardHeader";
import RoadingIcon from "../components/RoadingIcon";

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("https://macdon.morelinks.com.ng/get_transactions.php")
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setTransactions(data.data);
        } else console.error(data.message);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching transactions:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <RoadingIcon />;
  }

  return (
    <div className="dashboard">
      <DashboardHeader />

      <section className="transactions-section">
        <h2>Transaction History</h2>

        <div className="transactions-list">
          {transactions.map((tx) => (
            <div
              key={tx.id}
              className={` transaction-card ${
                tx.type === "Withdrawal" ? "debit" : "credit"
              } gap-3 `}
              onClick={() => navigate(`/transaction/${tx.id}`, { state: tx })}
            >
              {tx.type === "Withdrawal" ? (
                <i class="fa-solid fa-arrow-down text-red-500 rounded-full p-2  bg-white"></i>
              ) : (
                <i class="fa-solid fa-arrow-up  text-green-600 rounded-full p-2  bg-white"></i>
              )}
              <div className="tx-left">
                <p className="tx-desc">{tx.description}</p>
                <span className="tx-date">{tx.date}</span>
              </div>

              <div className="tx-right">
                <div className="tx-amount ">
                  <p>
                    {tx.type === "Withdrawal" ? "-" : "+"}&nbsp;₦&nbsp;
                    {Number(tx.amount).toLocaleString("en-NG", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
