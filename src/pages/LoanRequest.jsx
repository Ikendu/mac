import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoanRequest.css";

export default function LoanRequest() {
  const navigate = useNavigate();
  const [account, setAccount] = useState("");
  const [name, setName] = useState("");
  const [bank, setBank] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!account || !name || !bank) {
      setMessage({ type: "error", text: "Please fill in all fields." });
      return;
    }

    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch(
        "https://macdon.morelinks.com.ng/submit_loan.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ account_number: account, name, bank }),
        },
      );
      const data = await res.json();
      if (res.ok) {
        setMessage({
          type: "success",
          text: data.message || "Request submitted.",
        });
        // optionally navigate back after short delay
        setTimeout(() => navigate("/dashboard"), 1200);
      } else {
        setMessage({
          type: "error",
          text: data.message || "Submission failed.",
        });
      }
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Network error" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="loan-page">
      <header className="loan-header">
        <button className="back" onClick={() => navigate(-1)} aria-label="back">
          ◀
        </button>
        <h2>Loan Request</h2>
        <div className="header-spacer" />
      </header>

      <main className="loan-main">
        <form className="loan-form" onSubmit={handleSubmit}>
          <label>
            Account Number
            <input
              value={account}
              onChange={(e) => setAccount(e.target.value)}
              placeholder="e.g. 3230350703"
            />
          </label>

          <label>
            Account Name
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full name"
            />
          </label>

          <label>
            Bank
            <input
              value={bank}
              onChange={(e) => setBank(e.target.value)}
              placeholder="Bank name"
            />
          </label>

          <button className="submit-btn" type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit Request"}
          </button>

          {message && (
            <div className={`msg ${message.type === "error" ? "err" : "ok"}`}>
              {message.text}
            </div>
          )}
        </form>
      </main>
    </div>
  );
}
