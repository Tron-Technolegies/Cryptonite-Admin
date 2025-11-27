import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";

const Layout = () => {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 ml-56 min-h-screen bg-gray-100">
        <Header />

        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
