import React, { useState } from "react";
import { FiMenu, FiLogOut } from "react-icons/fi";
import { RiArrowDropDownLine } from "react-icons/ri";

const Header = ({ setOpen }) => {
  const [openProfile, setOpenProfile] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <header className="w-full bg-black p-8 shadow flex justify-between items-center relative">
      {/* LEFT – Menu Icon */}
      <button className="md:hidden text-white text-2xl" onClick={() => setOpen(true)}>
        <FiMenu />
      </button>

      {/* RIGHT – PROFILE */}
      <div className="relative ml-auto">
        <button
          onClick={() => setOpenProfile(!openProfile)}
          className="flex items-center gap-3 text-white"
        >
          {/* Avatar */}
          <div className="w-9 h-9 rounded-full bg-[var(--primary-color)] text-black font-bold flex items-center justify-center">
            A
          </div>

          {/* Name */}
          <span className="hidden sm:block font-medium">Admin</span>
          <RiArrowDropDownLine />
        </button>

        {/* DROPDOWN */}
        {openProfile && (
          <div className="absolute right-0 mt-3 w-40 bg-black border border-gray-800 rounded-lg shadow-lg z-50">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-4 py-3 text-sm text-white hover:bg-[var(--primary-color-soft)]"
            >
              <FiLogOut />
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
