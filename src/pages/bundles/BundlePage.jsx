import React from "react";
import { useNavigate } from "react-router-dom";
import BundleTable from "../../components/bundles/BundleTable";

export default function BundlePage() {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Bundle Products</h1>

          <button
            onClick={() => navigate("/bundles/add")}
            className="text-white px-6 py-2 rounded-lg"
            style={{ backgroundColor: "var(--primary-color)" }}
          >
            Add Bundle
          </button>
        </div>

        <BundleTable />
      </div>
    </div>
  );
}
