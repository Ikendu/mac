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
  function formatDateTime(d) {
    const day = String(d.getDate()).padStart(2, "0");
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month = months[d.getMonth()];
    const year = String(d.getFullYear()).slice(-2);
    let hours = d.getHours();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    if (hours === 0) hours = 12;
    const minutes = String(d.getMinutes()).padStart(2, "0");
    return `${day}-${month}-${year} ${hours}:${minutes} ${ampm}`;
  }

  const dateStr = formatDateTime(new Date());
  const [submitting, setSubmitting] = React.useState(false);

  async function handleConfirm(e) {
    e.preventDefault();
    setSubmitting(true);

    try {
      // fetch latest balance
      const balRes = await fetch(
        "https://macdon.morelinks.com.ng/get_last_balance.php",
      );
      const balData = await balRes.json();
      const currentBal =
        balData && balData.balance ? Number(balData.balance) : 0;

      const amountNum = Number(data.amount || 0) || 0;
      const newBalance = currentBal - amountNum;

      const accountNumber =
        data.fromAccount && data.fromAccount !== "acc1"
          ? data.fromAccount
          : "3230350703";

      const formData = {
        date: dateStr,
        account: accountNumber,
        type: "Withdrawal",
        amount: amountNum,
        description: data.description || "",
        balance: newBalance,
      };

      const res = await fetch(
        "https://macdon.morelinks.com.ng/submit_transaction.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        },
      );

      const result = await res.json();
      if (res.ok) {
        const payload = {
          ...data,
          fee,
          date: dateStr,
          amount: amountNum,
        };
        navigate("/transfer/success", { state: payload });
      } else {
        alert(result.message || "Failed to submit transaction");
      }
    } catch (err) {
      console.error("Error submitting transaction:", err);
      alert("Network or server error while submitting transaction");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="confirm-page">
      <header className="other-header">
        <button className="back" onClick={() => navigate(-1)} aria-label="back">
          <i class="fa fa-arrow-left" aria-hidden="true"></i>
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
              {data.destAccount || "Tijani Barakat Olayinka 8061632276"}
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
            <div className="value " style={{ fontSize: "16px" }}>
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
