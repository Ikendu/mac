import React from "react";
import { useNavigate } from "react-router-dom";
import icon1 from "../assets/icons/i1.jpg";
import icon2 from "../assets/icons/i2.jpg";
import icon3 from "../assets/icons/i3.jpg";
import icon4 from "../assets/icons/i4.jpg";
import icon5 from "../assets/icons/i5.jpg";

import "./TransferPage.css";

const transferItems = [
  { id: 1, title: "Between my Accounts", icon: icon1 },
  { id: 2, title: "To FirstBank Account", icon: icon2 },
  { id: 3, title: "To FirstMonie Wallet", icon: icon3 },
  { id: 4, title: "To Other Bank Account", icon: icon4 },
  { id: 5, title: "Send To Saved Beneficiary", icon: icon5 },
];

function TransferPage() {
  const navigate = useNavigate();
  return (
    <div className="transfer-page">
      <header className="transfer-header">
        <button className="hamburger" aria-label="menu">
          ☰
        </button>
        <h2>Transfer</h2>
        <div className="header-spacer" />
      </header>

      <main className="transfer-main">
        <section className="favorites">
          <h3>MY FAVORITES</h3>
          <div className="fav-grid">
            <div className="fav-card add">
              <div className="plus">+</div>
              <div className="fav-label">Add</div>
            </div>
          </div>
        </section>

        <section className="local-transfers">
          <h3>LOCAL CURRENCY TRANSFERS</h3>
          <div className="list">
            {transferItems.map((it) => (
              <button
                className="list-item"
                key={it.id}
                onClick={() => {
                  if (it.id === 4) navigate("/transfer/other-bank");
                }}
              >
                <div className="left">
                  {/* <div className="icon-circle">{it.icon}</div> */}
                  <img src={it.icon} alt={it.title} />
                </div>
                <div className="mid">{it.title}</div>
                <div className="right">›</div>
              </button>
            ))}
          </div>
        </section>
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

export default TransferPage;
