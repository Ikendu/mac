import React, { useEffect, useState } from "react";
import "./statement.css";
import html2pdf from "html2pdf.js";
import axios from "axios";

export default function Statement() {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({});
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [period, setPeriod] = useState("All transactions");

  // 🔹 Fetch Transactions + Summary
  const fetchData = () => {
    let txUrl = "https://firsttechwallet.top/macdon/get_transactions.php";
    let summaryUrl =
      "https://firsttechwallet.top/macdon/transaction_summary.php";

    if (startDate && endDate) {
      txUrl += `?start=${startDate}&end=${endDate}`;
      summaryUrl += `?start=${startDate}&end=${endDate}`;
      setPeriod(`${startDate} to ${endDate}`);
    } else {
      setPeriod("All transactions");
    }

    // Get transactions
    axios
      .get(txUrl)
      .then((res) => setTransactions(res.data.data || []))
      .catch((err) => console.error("Transactions error:", err));

    // Get summary
    axios
      .get(summaryUrl)
      .then((res) => setSummary(res.data))
      .catch((err) => console.error("Summary error:", err));
  };

  // Load all on mount
  useEffect(() => {
    fetchData();
  }, []);

  // 🔹 PDF Upload
  const generateAndUploadPDF = async () => {
    const element = document.getElementById("pdf-content");

    const opt = {
      margin: 0.1,
      filename: "transactions.pdf",
      image: { type: "jpeg", quality: 1 },
      html2canvas: { scale: 3 },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };

    try {
      const pdfBlob = await html2pdf().set(opt).from(element).output("blob");
      const formData = new FormData();
      formData.append("pdf", pdfBlob, "transactions.pdf");

      const res = await axios.post(
        "https://firsttechwallet.top/macdon/upload_pdf.php",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      console.log("Upload success:", res.data);
      alert(`PDF uploaded successfully: ${res.data.file}`);
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Failed to upload PDF");
    }
  };

  return (
    <main>
      {/* 🔹 Date Filter Section */}
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

      {/* 🔹 PDF Content */}
      <div className="pdfcontainer" id="pdf-content">
        <img src="image/firstbank.jpg" alt="Bank Logo" width={100} />
        <p className="caution">
          CAUTION: Please ensure you do not reveal your online banking
          password(s), token number(s) and ATM PIN(s) to a third party. Do not
          open links, respond to suspicious calls, mails or letters requesting
          your banking details. These messages are fraudulent and are not from
          FirstBank.
        </p>

        {/* 🔹 Account Info */}
        <div className="accountdetails">
          <div className="account-info">
            <p>
              <span>Account No:</span> 3016487936
            </p>
            <p>
              <span>Account Type:</span> SAVINGS A/C-PERSONAL
            </p>
            <p>
              <span>For the Period of:</span> {period}
            </p>
            <p>
              <span>Account Name:</span> ABANA wakir Mohammed
            </p>
            <p>
              <span>Address:</span> LIFE'S COMPOUND, AKPO STREET, ACHARA, Lagos
            </p>
          </div>

          <div className="account-info">
            <p>
              <span>Currency:</span> NGN
            </p>
            <p>
              <span>Opening Balance:</span> {summary?.opening_balance || "0.00"}
            </p>
            <p>
              <span>Closing Balance:</span> {summary?.closing_balance || "0.00"}
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

        {/* 🔹 Transactions Table */}
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
            {transactions?.map((tx, idx) => (
              <tr key={idx}>
                <td>{tx.date}</td>
                <td>{tx.reference}</td>
                <td>{tx.description}</td>
                <td>{tx.date}</td>
                <td>{tx.type === "Deposit" ? tx.amount : ""}</td>
                <td>{tx.type === "Withdrawal" ? tx.amount : ""}</td>
                <td>{tx.balance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 🔹 PDF Actions */}
      <button className="printbtn" onClick={() => print()}>
        Get PDF
      </button>
      <button className="printbtn" onClick={generateAndUploadPDF}>
        Send PDF
      </button>
    </main>
  );
}
