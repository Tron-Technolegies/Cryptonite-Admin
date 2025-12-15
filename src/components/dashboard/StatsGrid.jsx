import React, { useEffect, useState } from "react";
import { FiBox, FiLayers } from "react-icons/fi";
import api from "../../api/api";
import StatCard from "./StatCard";

const StatsGrid = () => {
  const [productCount, setProductCount] = useState(0);
  const [bundleCount, setBundleCount] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [productsRes, bundlesRes] = await Promise.all([
          api.get("products/"),
          api.get("bundles/"),
        ]);

        setProductCount(productsRes.data.length);
        setBundleCount(bundlesRes.data.length);
      } catch (err) {
        console.error("Failed to fetch dashboard stats");
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard title="Total Products" value={productCount} icon={<FiBox size={26} />} />

      <StatCard title="Bundle Products" value={bundleCount} icon={<FiLayers size={26} />} />
    </div>
  );
};

export default StatsGrid;
