import React, { useState } from "react";
import { toast } from "react-toastify";
import api from "../../api/api";

export default function BulkUploadModal({ onClose }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select an Excel file");
      return;
    }

    const data = new FormData();
    data.append("file", file);

    try {
      setLoading(true);
      const res = await api.post("/products/bulk-upload/", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      });

      toast.success(`Uploaded ${res.data.success_count} products successfully`);
      onClose();
    } catch (err) {
      toast.error("Bulk upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-xl p-6 space-y-4">
        <h2 className="text-xl font-bold">Bulk Upload Products</h2>

        <input
          type="file"
          accept=".xlsx,.xls"
          onChange={(e) => setFile(e.target.files[0])}
          className="border rounded-lg p-3 w-full"
        />

        <p className="text-sm text-gray-500">Upload Excel file (.xlsx / .xls)</p>

        <div className="flex justify-end gap-3 pt-4">
          <button onClick={onClose} className="px-4 py-2 border rounded-lg">
            Cancel
          </button>

          <button
            onClick={handleUpload}
            disabled={loading}
            className="px-5 py-2 text-white rounded-lg"
            style={{ backgroundColor: "var(--primary-color)" }}
          >
            {loading ? "Uploading..." : "Upload"}
          </button>
        </div>
      </div>
    </div>
  );
}
