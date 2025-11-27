import React from "react";
import cryptonitelogo from "/cryptonitelogo.png"

const Header = () => {
  return (
    <header className="w-full bg-black p-4 shadow flex justify-between items-center relative">
      <h1 className="text-lg font-semibold text-white"></h1>

      <div className="absolute left-1/2 -translate-x-1/2">
        <img
          src={cryptonitelogo}
          alt="Logo"
          className="h-96 object-contain"
        />
      </div>

      <button className="bg-(--primary-color) text-black px-4 py-2 rounded hover:text-black ">
       Visit Website
      </button>
    </header>
  );
};

export default Header;
