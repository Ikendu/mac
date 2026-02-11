import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./SuccessTransfer.css";

export default function SuccessTransfer() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const amount = state?.amount || 1000;

  return (
    <div className="success-page">
      <div className="success-inner">
        <div className="check">✓</div>
        <h2>Transfer is Successful</h2>

        <div className="actions">
          <button
            className="action-btn"
            onClick={() => {
              // placeholder: in a real app show receipt page
              navigate(-1);
            }}
          >
            VIEW RECEIPT
          </button>

          <button
            className="action-btn"
            onClick={() => {
              navigate("/transfer");
            }}
          >
            CONTINUE
          </button>
        </div>
      </div>
    </div>
  );
}
