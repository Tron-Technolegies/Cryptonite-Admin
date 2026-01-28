import React from "react";
import { useNavigate } from "react-router-dom";

import { IoAddCircleOutline } from "react-icons/io5";
import BlogTable from "../../components/blogs/BlogTable";

export default function Blogs() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-10">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* HEADER */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Blogs</h1>

          <button
            onClick={() => navigate("/blogs/add")}
            className="px-5 py-2 rounded-lg text-white flex items-center gap-2"
            style={{ backgroundColor: "var(--primary-color)" }}
          >
            <IoAddCircleOutline />
            Add Blog
          </button>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-xl shadow-sm p-4">
          <BlogTable />
        </div>
      </div>
    </div>
  );
}
