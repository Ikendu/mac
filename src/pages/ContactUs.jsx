import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, X, Instagram, Linkedin } from "lucide-react";
import "./ContactInfo.css";

export default function ContactInfo() {
  const navigate = useNavigate();

  return (
    <div className="contact-container">
      <div className="contact-header">
        <ArrowLeft className="back-icon" onClick={() => navigate(-1)} />
        <h2>Contact Info</h2>
        <div></div>
      </div>

      <div className="contact-content">
        <div className="contact-section">
          <h3>CALL US:</h3>
          <a href="tel:0700FirstContact" className="contact-card">
            <span className="dot"></span>
            <span>0700 FirstContact</span>
          </a>
          <a href="tel:014485500" className="contact-card">
            <span className="dot"></span>
            <span>01-4485500</span>
          </a>
          <a href="tel:07026836222" className="contact-card">
            <span className="dot"></span>
            <span>07026836222</span>
          </a>
        </div>

        <div className="contact-section">
          <h3>MAIL US:</h3>
          <a
            href="mailto:firstcontact@firstbanknigeria.com"
            className="contact-card"
          >
            <span className="dot"></span>
            <span>firstcontact@firstbanknigeria.com</span>
          </a>
        </div>

        <div className="contact-section">
          <h3>LET'S GET SOCIAL:</h3>
          <div className="social-icons">
            <a href="https://x.com" target="_blank" rel="noreferrer">
              <X className="social-icon" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <Instagram className="social-icon" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">
              <Linkedin className="social-icon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
