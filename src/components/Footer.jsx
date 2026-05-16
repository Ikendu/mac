import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#022e64] bottom-0 fixed text-[#f7fff0] text-center text-sm p-2 w-[100vw]">
      <p>
        Copyright © {new Date().getFullYear()}. <Link to="/edit-details" className="hover:text-[#a9d6e5]">First Bank of Nigeria Ltd.</Link>. All
        Rights Reserved
      </p>
    </footer>
  );
}
