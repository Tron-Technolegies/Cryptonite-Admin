import React, { useEffect, useState } from "react";
import api from "../../api/api";
import { toast } from "react-toastify";
import { FiX } from "react-icons/fi";

export default function HostingRequestModal({ id, onClose, onUpdated }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDetail = async () => {
    const res = await api.get(`hosting/requests/${id}/`);
    setData(res.data);
  };

  useEffect(() => {
    fetchDetail();
  }, [id]);

  const handleSave = async () => {
    try {
      setLoading(true);
      api.patch(`hosting/requests/${id}/update/`, {
        status: data.status,
        admin_notes: data.admin_notes,
        monthly_fee: data.monthly_fee,
      });
      toast.success("Hosting request updated");
      onUpdated();
      onClose();
    } catch {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  if (!data) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-lg overflow-hidden">
        {/* HEADER */}
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h3 className="text-xl font-bold">Hosting Request #{data.id}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-black">
            <FiX size={20} />
          </button>
        </div>

        {/* CONTENT */}
        <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
          {/* BASIC INFO */}
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <b>User:</b> #{data.user}
            </div>
            <div>
              <b>Phone:</b> {data.phone}
            </div>
            <div>
              <b>Location:</b> {data.hosting_location}
            </div>
            <div>
              <b>Payment:</b>{" "}
              <span className={data.is_paid ? "text-green-600" : "text-yellow-600"}>
                {data.is_paid ? "Paid" : "Pending"}
              </span>
            </div>
          </div>

          {/* PRODUCTS */}
          <div>
            <p className="font-semibold mb-2">Products</p>
            <div className="space-y-1">
              {data.items.map((item) => (
                <div key={item.id} className="text-sm">
                  {item.title} × {item.quantity}
                </div>
              ))}
            </div>
          </div>

          {/* BILLING */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Monthly Fee</label>
              <input
                type="number"
                value={data.monthly_fee || ""}
                onChange={(e) => setData({ ...data, monthly_fee: e.target.value })}
                className="mt-1 w-full border rounded-lg p-2"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Status</label>
              <select
                value={data.status}
                onChange={(e) => setData({ ...data, status: e.target.value })}
                className="mt-1 w-full border rounded-lg p-2"
              >
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>

          {/* NOTES */}
          <div>
            <label className="text-sm font-medium">Admin Notes</label>
            <textarea
              rows={3}
              value={data.admin_notes || ""}
              onChange={(e) => setData({ ...data, admin_notes: e.target.value })}
              className="mt-1 w-full border rounded-lg p-2"
            />
          </div>
        </div>

        {/* FOOTER */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t">
          <button onClick={onClose} className="px-4 py-2 border rounded-lg">
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className="px-5 py-2 bg-green-600 text-white rounded-lg"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
