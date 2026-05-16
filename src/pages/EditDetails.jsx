import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardHeader from "../components/DashboardHeader";
import { fetchAccountDetails, saveAccountDetails } from "../utils/accountUtils";
import "./form.css";

export default function EditDetails() {
  const navigate = useNavigate();
  
  // Login Details State
  const [loginAccount, setLoginAccount] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  const [loadingLogin, setLoadingLogin] = useState(false);

  // Account Details State
  const [account, setAccount] = useState("");
  const [name, setName] = useState("");
  const [accountStatus, setAccountStatus] = useState("");
  const [loadingAccount, setLoadingAccount] = useState(true);

  useEffect(() => {
    // Load account details from database
    const loadAccountDetails = async () => {
      const details = await fetchAccountDetails();
      if (details) {
        setAccount(details.account_number || "");
        setName(details.account_name || "");
      } else {
        setAccountStatus("Failed to load account details from server.");
      }
      setLoadingAccount(false);
    };
    loadAccountDetails();
  }, []);

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    const loginDetails = { account: loginAccount.trim(), password: loginPassword.trim() };

    if (!loginDetails.account || !loginDetails.password) {
      setLoginStatus("Please fill in both account and password.");
      return;
    }

    setLoadingLogin(true);
    try {
      const response = await fetch("https://macdon.morelinks.com.ng/update_login_details.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginDetails),
      });
      const data = await response.json();
      if (data.success) {
        setLoginStatus("Login details updated successfully.");
      } else {
        setLoginStatus(data.message || "Failed to update login details.");
      }
    } catch (error) {
      console.warn("Server save failed", error);
      setLoginStatus("Server not reachable.");
    } finally {
      setLoadingLogin(false);
    }
  };

  const handleAccountSubmit = async (event) => {
    event.preventDefault();
    const details = { account: account.trim(), name: name.trim() };

    if (!details.account || !details.name) {
      setAccountStatus("Please fill in both account number and name.");
      return;
    }

    setLoadingAccount(true);
    const result = await saveAccountDetails(details.account, details.name);
    
    if (result.success) {
      setAccountStatus("Account details saved successfully. Refreshing all pages...");
      // Dispatch event for other components to refresh
      window.dispatchEvent(new Event("accountDetailsUpdated"));
    } else {
      setAccountStatus(result.message || "Failed to save account details.");
    }
    setLoadingAccount(false);
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
