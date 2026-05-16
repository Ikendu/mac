import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardHeader from "../components/DashboardHeader";
import "./form.css";

const STORAGE_KEY = "userProfileDetails";

export default function EditDetails() {
  const navigate = useNavigate();
  const [account, setAccount] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setAccount(parsed.account || "");
        setName(parsed.name || "");
      } catch (err) {
        console.error("Failed to parse saved profile details", err);
      }
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const details = { account: account.trim(), name: name.trim() };

    if (!details.account || !details.name) {
      setStatus("Please fill in both account number and name.");
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(details));
    setStatus("Saved locally.");

    try {
      const response = await fetch("http://localhost/xampcode/save_account_details.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(details),
      });
      const data = await response.json();
      if (data.success) {
        setStatus("Saved to server successfully.");
      } else {
        setStatus(data.message || "Saved locally. Server response was not successful.");
      }
    } catch (error) {
      console.warn("Server save failed", error);
      setStatus("Saved locally. Server not reachable.");
    }
  };

  return (
    <main className="dashform dashboard">
      <DashboardHeader />
      <form onSubmit={handleSubmit} className="profile-form">
        <h3>Edit Account Details</h3>
        <p className="profile-info">Update the account number and account holder name below.</p>
        <label>
          Account Number
          <input
            type="text"
            placeholder="Enter account number"
            value={account}
            onChange={(e) => setAccount(e.target.value)}
          />
        </label>
        <label>
          Account Name
          <input
            type="text"
            placeholder="Enter account name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <button type="submit" className="p-2 px-10 bg-blue-900 text-white rounded-lg m-5 cursor-pointer">
          Save Details
        </button>
        {status && <p className="form-status">{status}</p>}
        <button type="button" className="p-2 px-10 bg-gray-300 text-black rounded-lg m-5" onClick={() => navigate(-1)}>
          Back
        </button>
      </form>
    </main>
  );
}
