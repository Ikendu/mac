import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ConfirmTransfer.css";

export default function ConfirmTransfer() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const data = state || {};
  const [pin, setPin] = useState("");
  const [saveBeneficiary, setSaveBeneficiary] = useState(false);

  const fee = 10.75;
  const dateStr = new Date().toLocaleDateString("en-GB");

  function handleConfirm(e) {
    e.preventDefault();
    // Build payload and navigate to success page (would call API in real app)
    const payload = {
      ...data,
      pin: pin ? "***" : "",
      saveBeneficiary,
      fee,
      date: dateStr,
      amount: data.amount || 1000,
    };
    console.log("confirming", payload);
    navigate("/transfer/success", { state: payload });
  }

  return (
    <div className="confirm-page">
      <header className="other-header">
        <button className="back" onClick={() => navigate(-1)} aria-label="back">
          ◀
        </button>
        <h2>To Other Bank</h2>
        <div className="header-spacer" />
      </header>

      <main className="confirm-main">
        <h3 className="title">Confirm Transaction</h3>

        <div className="summary">
          <div className="row">
            <div className="label">From:</div>
            <div className="value">
              {data.fromAccount || "SAVINGS ACCOUNT 3091645703"}
            </div>
          </div>
          <div className="row">
            <div className="label">To:</div>
            <div className="value">
              {data.destAccount || "CHIBUNDU DAVID ANIEDE 8061632276"}
            </div>
          </div>
          <div className="row">
            <div className="label">Bank:</div>
            <div className="value">{data.bank || "OPAY"}</div>
          </div>
          <div className="row">
            <div className="label">Date:</div>
            <div className="value">{dateStr}</div>
          </div>
          <div className="row">
            <div className="label">Fee:</div>
            <div className="value">₦ {fee.toFixed(2)}</div>
          </div>
          <div className="row amount">
            <div className="label">Amount:</div>
            <div className="value highlight">
              ₦{" "}
              {Number(data.amount || 1000).toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
            </div>
          </div>
          <div className="row">
            <div className="label">Narration:</div>
            <div className="value">{data.narration || "Food"}</div>
          </div>
        </div>

        <form className="confirm-form" onSubmit={handleConfirm}>
          <label className="pin-field">
            <div className="pin-label">Enter Transaction PIN</div>
            <input
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              maxLength={6}
            />
          </label>

          <label className="save-beneficiary">
            <span>Save as Beneficiary</span>
            <button
              type="button"
              className={`toggle ${saveBeneficiary ? "on" : ""}`}
              onClick={() => setSaveBeneficiary(!saveBeneficiary)}
              aria-pressed={saveBeneficiary}
            />
          </label>

          <button className="confirm-btn" type="submit">
            CONFIRM
          </button>
        </form>
      </main>
    </div>
  );
}
