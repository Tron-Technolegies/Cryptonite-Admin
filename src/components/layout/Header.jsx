import React from "react";
import { FiMenu } from "react-icons/fi";
import cryptonitelogo from "/cryptonitelogo.png";

const Header = ({ setOpen }) => {
  return (
    <header className="w-full bg-black p-8 shadow flex justify-between items-center relative">
      {/* LEFT – Menu Icon */}
      <button className="md:hidden text-white text-2xl" onClick={() => setOpen(true)}>
        <FiMenu />
      </button>

      {/* CENTER – Logo */}
      <div className="absolute left-1/2 -translate-x-1/2">
        <img src={cryptonitelogo} alt="Logo" className="h-96 object-contain" />
      </div>

      {/* RIGHT – CTA */}
      {/* <button className="bg-[var(--primary-color)] text-black px-4 py-2 rounded hover:text-black">
        Visit Website
      </button> */}
    </header>
  );
};

export default Header;
