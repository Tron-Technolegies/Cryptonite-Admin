import React from "react";
import StatsGrid from "../../components/dashboard/StatsGrid";
import ProductPreviewCards from "../../components/dashboard/ProductPreviewCards";
import BundlePreviewCards from "../../components/dashboard/BundlePreviewCards";
import RecentOrders from "../../components/dashboard/RecentOrders";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Dashboard</h2>
        <p className="text-gray-500">Overview of your mining store</p>
      </div>

      <StatsGrid />

      <ProductPreviewCards />

      <BundlePreviewCards />

      <RecentOrders />
    </div>
  );
};

export default Dashboard;
