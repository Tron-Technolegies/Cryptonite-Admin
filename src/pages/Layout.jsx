import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";

const Layout = () => {
  const [open, setOpen] = useState(false);

  return (
    // 1. Change min-h-screen to h-screen and add overflow-hidden
    // to prevent the whole page from scrolling.
    <div className="h-screen flex overflow-hidden bg-gray-50">
      {/* SIDEBAR */}
      {/* Ensure Sidebar has h-full or h-screen internally */}
      <Sidebar open={open} setOpen={setOpen} />

      {/* MAIN CONTENT AREA */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* HEADER - Remains fixed at the top because its parent doesn't scroll */}
        <Header setOpen={setOpen} />

        {/* OUTLET / PAGE CONTENT */}
        {/* 2. Add overflow-y-auto here. This makes ONLY this section scrollable. */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 custom-scrollbar">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
