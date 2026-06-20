import React, { useEffect, useState } from "react";
import { useBalance } from "../context/BalanceContext";
import { useNavigate } from "react-router-dom";
import "./form.css";
import "./styles.css";
import "./manager.css";
import DashboardHeader from "../components/DashboardHeader";
import RoadingIcon from "../components/RoadingIcon";

export default function Manager() {
  const [transactions, setTransactions] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch all transactions
  useEffect(() => {
    fetchTransactions();
  }, []);

  // Listen for global transactions updates
  useEffect(() => {
    const handler = () => fetchTransactions();
    window.addEventListener("transactionsUpdated", handler);
    return () => window.removeEventListener("transactionsUpdated", handler);
  }, []);

  const { refresh } = useBalance();

  const fetchTransactions = () => {
    setLoading(true);
    fetch("https://macdon.morelinks.com.ng/get_transactions.php")
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setTransactions(data.data);
          setError("");
        } else {
          setError(data.message || "Failed to fetch transactions");
        }
        setLoading(false);
      })
      .catch((err) => {
        setError("Error fetching transactions");
        console.error(err);
        setLoading(false);
      });
  };

  // Start editing a transaction
  const startEdit = (transaction) => {
    setEditingId(transaction.id);
    setEditData({
      id: transaction.id,
      date: transaction.date,
      dates: transaction.dates || "",
      //   time: transaction.time || "",
      account_number: transaction.account_number,
      type: transaction.type,
      amount: transaction.amount,
      description: transaction.description,
      balance: transaction.balance,
    });
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingId(null);
    setEditData({});
  };

  // Update transaction
  const updateTransaction = async () => {
    if (!editData.date || !editData.amount) {
      setError("Date and Amount are required");
      return;
    }

    try {
      const response = await fetch(
        "https://macdon.morelinks.com.ng/update_transaction.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editData),
        },
      );

      const data = await response.json();
      if (data.status === "success") {
        setError("");
        setEditingId(null);
        fetchTransactions();
        try {
          refresh();
        } catch (e) {}
        window.dispatchEvent(new Event("transactionsUpdated"));
      } else {
        setError(data.message || "Failed to update transaction");
      }
    } catch (err) {
      setError("Error updating transaction");
      console.error(err);
    }
  };

  // Delete transaction
  const deleteTransaction = (id) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      fetch("https://macdon.morelinks.com.ng/delete_transaction.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "success") {
            setError("");
            fetchTransactions();
            try {
              refresh();
            } catch (e) {}
            window.dispatchEvent(new Event("transactionsUpdated"));
          } else {
            setError(data.message || "Failed to delete transaction");
          }
        })
        .catch((err) => {
          setError("Error deleting transaction");
          console.error(err);
        });
    }
  };

  return (
    <div className="dashboard">
      <DashboardHeader />

      <section className="manager-section">
        <header className="manager-header">
          <button className="back-btn text-xl" onClick={() => navigate(-1)}>
            ←
          </button>
          <h2>Transaction Manager</h2>
        </header>

        {error && <div className="error-message">{error}</div>}
        {loading && <RoadingIcon />}

        {!loading && transactions.length === 0 && (
          <div className="no-transactions">No transactions found</div>
        )}

        {!loading && transactions.length > 0 && (
          <div className="manager-table-container">
            <table className="manager-table">
              <thead>
                <tr>
                  <th className="w-24">Date</th>
                  {/* <th>Time</th> */}
                  <th>Account</th>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Description</th>
                  <th>Balance</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => (
                  <tr
                    key={tx.id}
                    className={`tx-row ${editingId === tx.id ? "editing" : ""}`}
                  >
                    {editingId === tx.id ? (
                      <>
                        <td>
                          <input
                            value={editData.date}
                            onChange={(e) =>
                              setEditData({ ...editData, date: e.target.value })
                            }
                            className="w-20 edit-input"
                          />
                          <div style={{ marginTop: 6 }}>
                            <input
                              type="date"
                              value={editData.dates}
                              onChange={(e) =>
                                setEditData({ ...editData, dates: e.target.value })
                              }
                              className="edit-input"
                              title="Query date (YYYY-MM-DD)"
                            />
                          </div>
                        </td>
                        {/* <td>
                          <input
                            type="time"
                            value={editData.time}
                            onChange={(e) =>
                              setEditData({ ...editData, time: e.target.value })
                            }
                            className="edit-input"
                          />
                        </td> */}
                        <td>
                          <input
                            type="text"
                            value={editData.account_number}
                            onChange={(e) =>
                              setEditData({
                                ...editData,
                                account_number: e.target.value,
                              })
                            }
                            className="edit-input"
                          />
                        </td>
                        <td>
                          <select
                            value={editData.type}
                            onChange={(e) =>
                              setEditData({ ...editData, type: e.target.value })
                            }
                            className="edit-input"
                          >
                            <option value="Deposit">Deposit</option>
                            <option value="Withdrawal">Withdrawal</option>
                            {/* <option value="Transfer">Transfer</option> */}
                          </select>
                        </td>
                        <td>
                          <input
                            type="number"
                            value={editData.amount}
                            onChange={(e) =>
                              setEditData({
                                ...editData,
                                amount: e.target.value,
                              })
                            }
                            className="edit-input"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            value={editData.description}
                            onChange={(e) =>
                              setEditData({
                                ...editData,
                                description: e.target.value,
                              })
                            }
                            className="edit-input"
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            value={editData.balance}
                            onChange={(e) =>
                              setEditData({
                                ...editData,
                                balance: e.target.value,
                              })
                            }
                            className="edit-input"
                          />
                        </td>
                        <td className="action-cell">
                          <button
                            className="btn-save"
                            onClick={updateTransaction}
                          >
                            Save
                          </button>
                          <button className="btn-cancel" onClick={cancelEdit}>
                            Cancel
                          </button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="min-w-32">{tx.date}</td>
                        {/* <td>{tx.time || "-"}</td> */}
                        <td>{tx.account_number}</td>
                        <td>
                          <span
                            className={`type-badge ${tx.type.toLowerCase()}`}
                          >
                            {tx.type}
                          </span>
                        </td>
                        <td>₦{Number(tx.amount).toLocaleString()}</td>
                        <td>{tx.description}</td>
                        <td>₦{Number(tx.balance).toLocaleString()}</td>
                        <td className="action-cell">
                          <button
                            className="btn-edit"
                            onClick={() => startEdit(tx)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn-delete"
                            onClick={() => deleteTransaction(tx.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
