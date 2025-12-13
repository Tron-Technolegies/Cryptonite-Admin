import React from "react";
import { useNavigate } from "react-router-dom";
import ProductTable from "../../components/product/ProductTable";

export default function Product() {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* PAGE HEADER */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-black">Products</h1>

          <button
            onClick={() => navigate("/products-add")}
            className="text-black px-6 py-2 rounded-lg font-medium transition"
            style={{ backgroundColor: "var(--primary-color)" }}
          >
            Add New Product
          </button>
        </div>

        {/* PRODUCT TABLE */}
        <div className="bg-white rounded-xl border shadow-sm p-4">
          <ProductTable />
        </div>
      </div>
    </div>
  );
}
