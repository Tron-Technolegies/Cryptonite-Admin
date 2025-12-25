import React, { useEffect, useState } from "react";
import { FiBox, FiLayers, FiShoppingCart, FiServer } from "react-icons/fi";
import api from "../../api/api";
import StatCard from "./StatCard";

const StatsGrid = () => {
  const [stats, setStats] = useState({
    products: 0,
    bundles: 0,
    orders: 0,
    hosting: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [products, bundles, orders, hosting] = await Promise.all([
          api.get("products/"),
          api.get("bundles/"),
          api.get("orders/"),
          api.get("hosting/requests/"),
        ]);

        setStats({
          products: products.data.length,
          bundles: bundles.data.length,
          orders: orders.data.length,
          hosting: hosting.data.length,
        });
      } catch {
        console.error("Failed to load stats");
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard title="Total Products" value={stats.products} icon={<FiBox size={24} />} />
      <StatCard title="Bundles" value={stats.bundles} icon={<FiLayers size={24} />} />
      <StatCard title="Orders" value={stats.orders} icon={<FiShoppingCart size={24} />} />
      <StatCard title="Hosting Requests" value={stats.hosting} icon={<FiServer size={24} />} />
    </div>
  );
};

export default StatsGrid;
