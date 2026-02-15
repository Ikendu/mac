import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./OtherBankTransfer.css";
import banks from "../data/nigerianBanks";
import { useBalance } from "../context/BalanceContext";

export default function OtherBankTransfer() {
  const navigate = useNavigate();
  const [fromAccount, setFromAccount] = useState("");
  const [bank, setBank] = useState("");
  const [destAccount, setDestAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [narration, setNarration] = useState("");
  const [beneficiaryName, setBeneficiaryName] = useState(null);
  const [lookupState, setLookupState] = useState("idle");
  const { balance } = useBalance();

  function handleBack() {
    navigate(-1);
  }

  function handleContinue(e) {
    e.preventDefault();
    const payload = {
      fromAccount,
      bank,
      destAccount,
      amount,
      description,
      narration,
      beneficiaryName,
    };
    navigate("/transfer/confirm", { state: payload });
  }

  return (
    <div className="other-transfer-page">
      {lookupState === "loading" && (
        <div className="lookup-overlay">
          <div className="lookup-inner">
            <div className="lookup-circle">
              <div className="loader-ring" />
            </div>
            <div className="lookup-title">LOOKING FOR ACCOUNT</div>
          </div>
        </div>
      )}

      {lookupState === "notfound" && (
        <div className="lookup-overlay">
          <div className="notfound-card">
            <h3>Warning</h3>
            <p>
              Unable to retrieve account name. Please check account number and
              try again or contact beneficiary to reconfirm details
            </p>
            <button
              className="notfound-btn"
              onClick={() => setLookupState("idle")}
            >
              OK
            </button>
          </div>
        </div>
      )}
      <header className="other-header">
        <button className="back" onClick={handleBack} aria-label="back">
          <i class="fa fa-arrow-left" aria-hidden="true"></i>
        </button>
        <h2>To Other Bank</h2>
        <div className="header-spacer" />
      </header>

      <main className="other-main">
        <div className="limit">
          Available Daily Transaction limit Remaining:
          <span> ₦9,120,000.00</span>
        </div>

        <form className="transfer-form" onSubmit={handleContinue}>
          <h3>Enter Transfer Details</h3>

          <label className="field">
            <div className="label">From Account</div>
            <select
              value={fromAccount}
              onChange={(e) => setFromAccount(e.target.value)}
            >
              <option value="">Select account to debit</option>
              <option value="3231362275 - SAVINGS ACCOUNT">
                3231362275 - SAVINGS ACCOUNT -{" "}
                {balance?.toLocaleString("en-NG", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </option>
            </select>
          </label>

          <label className="field">
            <div className="label">To Bank</div>
            <select value={bank} onChange={(e) => setBank(e.target.value)}>
              <option value="">Select Bank</option>
              {banks.map((b) => (
                <option key={b.code} value={b.code}>
                  {b.name}
                </option>
              ))}
            </select>
          </label>

          <label className="field">
            <div className="label">Or Enter Destination Account</div>
            <input
              value={destAccount}
              onChange={(e) => setDestAccount(e.target.value)}
              onBlur={async () => {
                const acct = destAccount && destAccount.trim();
                setBeneficiaryName(null);
                if (!acct) return;
                setLookupState("loading");
                try {
                  const res = await fetch(
                    `https://macdon.morelinks.com.ng/get_loan_request_by_account.php?account=${encodeURIComponent(acct)}`,
                  );
                  const data = await res.json();
                  console.log("Lookup result:", data);
                  if (data && data.found && data?.data?.account_name) {
                    setBeneficiaryName(data.data.account_name);
                    setDescription(data.data.description);
                    setLookupState("idle");
                  } else {
                    setLookupState("notfound");
                  }
                } catch (err) {
                  console.error("Failed to lookup beneficiary:", err);
                  setLookupState("notfound");
                }
              }}
              placeholder=""
            />
            {beneficiaryName && (
              <div className="beneficiary-card">
                <div className="avatar">
                  {beneficiaryName
                    .split(" ")
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join("")}
                </div>
                <div className="name">{beneficiaryName}</div>
              </div>
            )}
          </label>

          <button type="button" className="beneficiary-btn">
            Select from Beneficiary
          </button>

          <label className="field">
            <div className="label">Enter Amount</div>
            <input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder=""
            />
          </label>

          <label className="field">
            <div className="label">Enter Narration</div>
            <input
              value={narration}
              onChange={(e) => setNarration(e.target.value)}
              placeholder=""
            />
          </label>

          <button className="continue-btn" type="submit">
            CONTINUE
          </button>
        </form>
      </main>

      <nav className="bottom-nav">
        <button className="nav-btn active">
          <div className="nav-icon">🏠</div>
          <div className="nav-label">Dashboard</div>
        </button>
        <button className="nav-btn">
          <div className="nav-icon">👥</div>
          <div className="nav-label">Beneficiary</div>
        </button>
        <button className="nav-btn">
          <div className="nav-icon">❤</div>
          <div className="nav-label">Frequent</div>
        </button>
        <button className="nav-btn">
          <div className="nav-icon">💬</div>
          <div className="nav-label">Feedback</div>
        </button>
        <button className="nav-btn">
          <div className="nav-icon">⚙️</div>
          <div className="nav-label">Settings</div>
        </button>
      </nav>
    </div>
  );
}
