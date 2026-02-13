import React from "react";

export default function Header() {
  return (
    <header className="flex justify-between items-center p-2 px-22 bg-[#022e64] w-[100vw]">
      <div className="">
        <a href="/">
          <img src="images/logo-DarkBg.png" alt="Firstbank logo" />
        </a>
      </div>
      <div className="left-title">
        <img src="images/banksnap.jpg" alt="left title" />
      </div>
    </header>
  );
}
