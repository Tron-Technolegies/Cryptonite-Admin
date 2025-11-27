import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-56 bg-black text-white h-screen p-5 fixed left-0 top-0">
      <h2 className="text-xl font-bold mb-8">Admin Panel</h2>

      <nav className="flex flex-col gap-4 text-gray-200">
        <Link to="" className="hover:text-white">
          Dashboard
        </Link>

        <Link to="/add-product" className="hover:text-white">
          Add Product
        </Link>

        <Link to="/add-bundle-products" className="hover:text-white">
          Add Bundle Product
        </Link>

        <Link to="/users" className="hover:text-white">
          Customers
        </Link>

        <Link to="/admin/orders" className="hover:text-white">
          Orders
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
