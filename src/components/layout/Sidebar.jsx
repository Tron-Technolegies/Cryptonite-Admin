import React from "react";
import { NavLink } from "react-router-dom";
import cryptonitelogo from "/cryptonitelogo.png";

const Sidebar = ({ open, setOpen }) => {
  const base = "flex items-center px-4 py-3 rounded-lg transition-all";

  return (
    <>
      {/* Overlay */}
      {open && (
        <div className="fixed inset-0 bg-black/40 z-40 md:hidden" onClick={() => setOpen(false)} />
      )}

      <aside
        className={`fixed md:static top-0 left-0 min-h-screen w-56 bg-black text-white transform
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
          z-50 md:z-auto
          transition-transform`}
      >
        {/* LOGO */}
        <div className="py-8 items-center border-b border-gray-800  flex justify-center">
          <img src={cryptonitelogo} alt="Cryptonite Logo" className="h-12 object-contain" />
        </div>

        {/* NAV */}
        <nav className="px-3 py-6 space-y-2">
          {[
            { to: "/", label: "Dashboard", end: true },
            { to: "/products", label: "Products" },
            { to: "/users", label: "Users" },
            { to: "/bundles", label: "Bundles" },
            { to: "/rentals", label: "Rentals" },
            { to: "/hosting-requests", label: "Hosting Requests" },
            { to: "/orders", label: "Orders" },
            { to: "/blogs", label: "Blogs" },
            { to: "/events", label: "Events" },
          ].map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `${base} ${
                  isActive
                    ? "bg-[var(--primary-color)] text-white font-semibold"
                    : "text-white font-semibold hover:bg-[var(--primary-color-soft)]"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
