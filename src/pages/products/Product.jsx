import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductTable from "../../components/product/ProductTable";
import { IoAddCircleOutline } from "react-icons/io5";
import BulkUploadModal from "./BulkUploadProducts";

export default function Product() {
  const navigate = useNavigate();
  const [openBulk, setOpenBulk] = useState(false);

  return (
    <div className="w-full min-h-screen bg-gray-50 p-4 md:p-10">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* PAGE HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-2xl md:text-3xl font-bold text-black">Products</h1>

          <div className="flex flex-col sm:flex-row gap-3">
            {/* BULK UPLOAD */}
            <button
              onClick={() => setOpenBulk(true)}
              className="px-5 py-2 rounded-lg border border-[#56d083] text-[#56d083] font-medium hover:bg-[#56d083] hover:text-white transition"
            >
              Bulk Upload
            </button>

            {/* ADD PRODUCT */}
            <button
              onClick={() => navigate("/products-add")}
              className="px-5 py-2 text-white rounded-lg font-medium flex items-center gap-2 justify-center"
              style={{ backgroundColor: "var(--primary-color)" }}
            >
              <IoAddCircleOutline />
              Add New Product
            </button>
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-xl shadow-sm p-4">
          <ProductTable />
        </div>
      </div>

      {/* BULK UPLOAD MODAL */}
      {openBulk && <BulkUploadModal onClose={() => setOpenBulk(false)} />}
    </div>
  );
}
