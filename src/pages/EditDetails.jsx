import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardHeader from "../components/DashboardHeader";
import "./form.css";

const PROFILE_STORAGE_KEY = "userProfileDetails";
const LOGIN_STORAGE_KEY = "userLoginDetails";

export default function EditDetails() {
  const navigate = useNavigate();
  
  // Login Details State
  const [loginAccount, setLoginAccount] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");

  // Account Details State
  const [account, setAccount] = useState("");
  const [name, setName] = useState("");
  const [accountStatus, setAccountStatus] = useState("");

  useEffect(() => {
    // Load profile details
    const storedProfile = window.localStorage.getItem(PROFILE_STORAGE_KEY);
    if (storedProfile) {
      try {
        const parsed = JSON.parse(storedProfile);
        setAccount(parsed.account || "");
        setName(parsed.name || "");
      } catch (err) {
        console.error("Failed to parse saved profile details", err);
      }
    }

    // Load login details
    const storedLogin = window.localStorage.getItem(LOGIN_STORAGE_KEY);
    if (storedLogin) {
      try {
        const parsed = JSON.parse(storedLogin);
        setLoginAccount(parsed.account || "");
        setLoginPassword(parsed.password || "");
      } catch (err) {
        console.error("Failed to parse saved login details", err);
      }
    }
  }, []);

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    const loginDetails = { account: loginAccount.trim(), password: loginPassword.trim() };

    if (!loginDetails.account || !loginDetails.password) {
      setLoginStatus("Please fill in both account and password.");
      return;
    }

    window.localStorage.setItem(LOGIN_STORAGE_KEY, JSON.stringify(loginDetails));
    setLoginStatus("Login details saved locally.");

    try {
      const response = await fetch("https://macdon.morelinks.com.ng/login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginDetails),
      });
      const data = await response.json();
      if (data.success) {
        setLoginStatus("Login details updated successfully.");
      } else {
        setLoginStatus(data.message || "Saved locally. Server response was not successful.");
      }
    } catch (error) {
      console.warn("Server save failed", error);
      setLoginStatus("Saved locally. Server not reachable.");
    }
  };

  const handleAccountSubmit = async (event) => {
    event.preventDefault();
    const details = { account: account.trim(), name: name.trim() };

    if (!details.account || !details.name) {
      setAccountStatus("Please fill in both account number and name.");
      return;
    }

    window.localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(details));
    setAccountStatus("Account details saved locally.");

    try {
      const response = await fetch("https://macdon.morelinks.com.ng/save_account_details.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(details),
      });
      const data = await response.json();
      if (data.success) {
        setAccountStatus("Account details saved to server successfully.");
      } else {
        setAccountStatus(data.message || "Saved locally. Server response was not successful.");
      }
    } catch (error) {
      console.warn("Server save failed", error);
      setAccountStatus("Saved locally. Server not reachable.");
    }
  };

  return (
    <main className="dashform dashboard">
      <DashboardHeader />
      
      <div className="edit-details-container">
        {/* Login Details Section */}
        <form onSubmit={handleLoginSubmit} className="profile-form">
          <h3>Edit Login Details</h3>
          <p className="profile-info">Update your account number and password.</p>
          <label>
            Account Number (Login)
            <input
              type="text"
              placeholder="Enter account number"
              value={loginAccount}
              onChange={(e) => setLoginAccount(e.target.value)}
            />
          </label>
          <label>
            Password
            <input
              type="password"
              placeholder="Enter password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />
          </label>
          <button type="submit" className="p-2 px-10 bg-blue-900 text-white rounded-lg m-5 cursor-pointer">
            Save Login Details
          </button>
          {loginStatus && <p className="form-status">{loginStatus}</p>}
        </form>

        {/* Account Details Section */}
        <form onSubmit={handleAccountSubmit} className="profile-form">
          <h3>Edit Account Details</h3>
          <p className="profile-info">Update the account number and account holder name.</p>
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
            Save Account Details
          </button>
          {accountStatus && <p className="form-status">{accountStatus}</p>}
        </form>
      </div>

      <div className="edit-details-footer">
        <button type="button" className="p-2 px-10 bg-gray-300 text-black rounded-lg m-5" onClick={() => navigate(-1)}>
          Back
        </button>
      </div>
    </main>
  );
}
