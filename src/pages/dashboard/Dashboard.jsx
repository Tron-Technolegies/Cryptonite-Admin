import React from "react";
import StatsGrid from "../../components/dashboard/StatsGrid";
import ProductPreviewCards from "../../components/dashboard/ProductPreviewCards";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* TITLE */}
      <div>
        <h2 className="text-3xl font-bold">Dashboard</h2>
        <p className="text-gray-500 mt-1">Overview of your mining store performance</p>
      </div>

      {/* STATS */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <StatsGrid />
      </div>

      {/* PRODUCT PREVIEW */}
      <ProductPreviewCards />
    </div>
  );
};

export default Dashboard;
