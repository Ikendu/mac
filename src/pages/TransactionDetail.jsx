import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./trandetails.css";

export default function TransactionDetail() {
  const { state: tx } = useLocation();
  const navigate = useNavigate();

  if (!tx) return <div>No transaction data</div>;

  return (
    <div className="border-gray-500 transaction-detail-page ">
      <header className="tx-header">
        <button className="back-btn text-xl" onClick={() => navigate(-1)}>
          ←
        </button>
        <h3 className="text-xl">Transaction Details</h3>
      </header>

      <div className="tx-detail-card text-sm">
        <p className="flex justify-between my-3 gap-2">
          <strong>Date:</strong> {tx.date}
        </p>
        <p className="flex justify-between my-3">
          <strong>Account Number:</strong> {tx.account_number}
        </p>
        <p className="flex justify-between my-3">
          <strong>Amount:</strong> ₦{Number(tx.amount).toLocaleString()}
        </p>
        <p className="flex justify-between my-3">
          <strong>Type:</strong> {tx.type}
        </p>
        <p className="flex justify-between my-3 gap-2 ">
          <strong>Description:</strong>{" "}
          <span className="break-all">{tx.description}</span>
        </p>
        <p className="flex justify-between my-3">
          <strong>Balance After:</strong> ₦{Number(tx.balance).toLocaleString()}
        </p>
      </div>
    </div>
  );
}
