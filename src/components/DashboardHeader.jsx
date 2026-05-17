import React from "react";
import { useState, useEffect } from "react";
import "./compstyle.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useBalance } from "../context/BalanceContext";
import { fetchAccountDetails } from "../utils/accountUtils";

export default function DashboardHeader() {
  const navigate = useNavigate();
  const { balance } = useBalance();
  const [copy, setCopy] = useState(false);
  const [accountNumber, setAccountNumber] = useState("3230350703");
  const [accountName, setAccountName] = useState("Tijani Barakat Olayinka");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load account details from database
    const loadDetails = async () => {
      const details = await fetchAccountDetails();
      if (details) {
        setAccountNumber(details.account_number);
        setAccountName(details.account_name);
      }
      setLoading(false);
    };
    loadDetails();

    // Listen for account details updates
    const handleUpdate = () => {
      loadDetails();
    };
    window.addEventListener("accountDetailsUpdated", handleUpdate);
    return () => window.removeEventListener("accountDetailsUpdated", handleUpdate);
  }, []);

  function handleCopy() {
    navigator.clipboard.writeText(accountNumber).then(() => {
      setCopy(true);
      setTimeout(() => {
        setCopy(false);
      }, 2000).catch((err) => console.log("Failed to copy: ", err));
    });
  }

  const logout = async () => {
    // const response = await axios.post(
    //   "https://macdon.morelinks.com.ng/logout.php",
    //   {},
    //   { withCredentials: true },
    // );

    // console.log(response.data);
    navigate("/");
  };

  return (
    <div className="dashheader">
      <section className="upper">
        <div className="text-sm user different ">
          <img src="icons/camera.png" alt="User Image" />
          <div>
            <p className="pt-5 font-bold">
              <span className="text-blue-900">Welcome</span> {loading ? "Loading..." : accountName}
            </p>
            <p
              onClick={handleCopy}
              className="text-lg account-num text-blue-700 font-bold mb-1 underline cursor-pointer"
            >
              Account: {copy ? "copied" : accountNumber}
            </p>
          </div>
          <p className="balance">
            <span>Balance:</span> ₦
            {Number(balance).toLocaleString("en-NG", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        </div>

        <section className="user-account text-sm">
          <p
            onClick={handleCopy}
            className="account-number text-blue-700 font-bold mb-1 underline cursor-pointer"
          >
            Account: {copy ? "copied" : accountNumber}
          </p>
          <button className="logoutbtn" onClick={logout}>
            Logout
          </button>
        </section>
      </section>
      <div className="nav-container">
        <nav>
          <div onClick={() => navigate("/dashboard")}>
            <img src="icons/homesub.png" alt="" />
            <span>Home</span>
          </div>
          <div onClick={() => navigate("/transfer")}>
            <img src="icons/transfer.png" alt="" />
            <span>Transfer</span>
          </div>
          <div onClick={() => navigate("/dashboardform")}>
            <img src="icons/card.png" alt="" />
            <span>Cards</span>
          </div>
          <div
            onClick={() => navigate("/loan-request")}
            style={{ cursor: "pointer" }}
          >
            <img src="icons/loan.png" alt="" />
            <span>Loans</span>
          </div>
          <div onClick={()=>navigate("/edit-details")}>
            <img src="icons/airtime.png" alt="" />
            <span>Airtime</span>
          </div>
          {/* <div>
          <img src='/public/icons/code.png' alt='' />
          <span>QR</span>
        </div> */}
          <div
            onClick={() => navigate("/all-transactions")}
            className="different"
          >
            <img src="icons/history.png" alt="" />
            <span>History</span>
          </div>
        </nav>
      </div>
    </div>
  );
}
