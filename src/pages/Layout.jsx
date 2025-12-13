import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
const Layout = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen flex">
      {/* SIDEBAR */}
      <Sidebar open={open} setOpen={setOpen} />

      {/* MAIN CONTENT */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* HEADER */}
        <Header setOpen={setOpen} />

        {/* OUTLET/PAGE CONTENT */}
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
