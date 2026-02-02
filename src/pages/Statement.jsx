import React, { useState } from "react";
import "./statement.css";
// import html2pdf from "html2pdf.js"; // Lazy loaded
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Statement() {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({});
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [period, setPeriod] = useState("");
  const [email, setEmail] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [hasFetched, setHasFetched] = useState(false); // 🔹 Control visibility
  const navigate = useNavigate();

  // 🔹 Fetch Transactions + Summary (only after clicking button)
  const fetchData = () => {
    if (!startDate || !endDate) {
      alert("Please select both start and end dates before fetching.");
      return;
    }

    let txUrl = `https://macdon.morelinks.com.ng/get_transactions.php?start=${startDate}&end=${endDate}`;
    let summaryUrl = `https://macdon.morelinks.com.ng/transaction_summary.php?start=${startDate}&end=${endDate}`;

    setPeriod(`${startDate} to ${endDate}`);

    axios
      .get(txUrl)
      .then((res) => {
        setTransactions(res.data.data || []);
        setHasFetched(true);
      })
      .catch((err) => console.error("Transactions error:", err));

    axios
      .get(summaryUrl)
      .then((res) => setSummary(res.data))
      .catch((err) => console.error("Summary error:", err));
  };

  // 🔹 Generate and Upload PDF (Send Email)
  const generateAndUploadPDF = async () => {
    if (!email) {
      alert("Please enter a recipient email before sending.");
      return;
    }

    if (!hasFetched) {
      alert("Please generate a statement first before sending.");
      return;
    }

    setIsSending(true);

    const element = document.getElementById("pdf-content");
    const opt = {
      margin: 0.1,
      filename: "transactions.pdf",
      image: { type: "jpeg", quality: 1 },
      html2canvas: { scale: 3 },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };

    try {
      const html2pdf = (await import("html2pdf.js")).default;
      const pdfBlob = await html2pdf().set(opt).from(element).output("blob");
      const formData = new FormData();
      formData.append("pdf", pdfBlob, "transactions.pdf");
      formData.append("email", email);

      const res = await axios.post(
        "https://macdon.morelinks.com.ng/upload_pdf.php",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } },
      );

      alert(res.data.message || "Email sent successfully!");
      console.log("Upload success:", res.data);
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Failed to send statement.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <main>
      {/* 🔹 Date Filter */}
      <div className=" cursor-pointer p-5 text-xl" onClick={() => navigate(-1)}>
        <i class="fa fa-arrow-left" aria-hidden="true"></i>
      </div>
      <div className="date-filter">
        <label>
          Start Date:{" "}
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="date-input"
          />
        </label>
        <br></br>
        <label>
          End Date:{" "}
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="date-input"
          />
        </label>
        <button onClick={fetchData} className="date-btn">
          Get Statement
        </button>
      </div>

      {/* 🔹 Conditional rendering */}
      {hasFetched ? (
        <>
          {/* 🔹 PDF Content */}
          <div className="pdfcontainer" id="pdf-content">
            <img src="image/firstbank.jpg" alt="Bank Logo" width={100} />
            <p className="caution">
              CAUTION: Please ensure you do not reveal your online banking
              password(s), token number(s), or ATM PIN(s) to a third party.
            </p>

            <div className="accountdetails">
              <div className="account-info">
                <p>
                  <span>Account No:</span> 3229166953
                </p>
                <p>
                  <span>Account Type:</span> SAVINGS A/C-PERSONAL
                </p>
                <p>
                  <span>For the Period of:</span> {period}
                </p>
                <p>
                  <span>Account Name:</span> Mohammed Abana Wakir
                </p>
                <p>
                  <span>Address:</span> LIFE'S COMPOUND, AKPO STREET, ACHARA,
                  Lagos
                </p>
              </div>

              <div className="account-info">
                <p>
                  <span>Currency:</span> NGN
                </p>
                <p>
                  <span>Opening Balance:</span>{" "}
                  {summary?.opening_balance || "0.00"}
                </p>
                <p>
                  <span>Closing Balance:</span>{" "}
                  {summary?.closing_balance || "0.00"}
                </p>
                <p>
                  <span>Total Deposit:</span> {summary?.total_deposit || "0.00"}
                </p>
                <p>
                  <span>Total Withdrawal:</span>{" "}
                  {summary?.total_withdrawal || "0.00"}
                </p>
              </div>
            </div>

            <table cellSpacing="0">
              <thead>
                <tr>
                  <th>TransDate</th>
                  <th>Reference</th>
                  <th>Transaction Details</th>
                  <th>ValueDate</th>
                  <th>Deposit</th>
                  <th>Withdrawal</th>
                  <th>Balance</th>
                </tr>
              </thead>
              <tbody>
                {transactions?.length > 0 ? (
                  transactions.map((tx, idx) => (
                    <tr key={idx}>
                      <td>{tx.date}</td>
                      <td>{tx.reference}</td>
                      <td>{tx.description}</td>
                      <td>{tx.date}</td>
                      <td>
                        {tx.type === "Deposit"
                          ? "₦" +
                            Number(tx.amount).toLocaleString("en-NG", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })
                          : ""}
                      </td>
                      <td>
                        {tx.type === "Withdrawal"
                          ? "₦" +
                            Number(tx.amount).toLocaleString("en-NG", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })
                          : ""}
                      </td>
                      <td>
                        ₦
                        {Number(tx.balance).toLocaleString("en-NG", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" style={{ textAlign: "center" }}>
                      No transactions found for this period.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* 🔹 Email Input */}
          <div style={{ margin: "20px 0 0 20px" }}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="email-input"
              style={{
                padding: "12px",
                width: "300px",
                marginRight: "10px",
                borderRadius: "6px",
                border: "1px solid #ccc",
              }}
            />
          </div>

          {/* 🔹 Action Buttons */}
          {/* <button className="printbtn" onClick={() => print()}>
            Print Statement
          </button> */}

          <button
            className="printbtn"
            onClick={generateAndUploadPDF}
            disabled={isSending}
            style={{
              opacity: isSending ? 0.6 : 1,
              cursor: isSending ? "not-allowed" : "pointer",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            {isSending ? (
              <>
                <span
                  className="spinner"
                  style={{
                    width: "18px",
                    height: "18px",
                    border: "3px solid #f3f3f3",
                    borderTop: "3px solid #333",
                    borderRadius: "50%",
                    animation: "spin 1s linear infinite",
                  }}
                ></span>
                Sending...
              </>
            ) : (
              "Send Statement via Email"
            )}
          </button>
        </>
      ) : (
        <p style={{ marginTop: "40px", textAlign: "center" }}>
          Please select a start and end date to view your statement.
        </p>
      )}

      {/* 🔹 Spinner CSS */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </main>
  );
}
