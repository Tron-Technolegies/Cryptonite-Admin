import React, { useEffect, useState } from "react";
import api from "../../api/api";
import { toast } from "react-toastify";
import { FiX, FiCheckCircle, FiGlobe } from "react-icons/fi";
import ConfirmModal from "../../components/ConfirmModal";

export default function HostingRequestModal({ id, onClose, onUpdated }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [monitoringType, setMonitoringType] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

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
      await api.patch(`hosting/requests/${id}/update/`, {
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

  const handleActivate = async () => {
    try {
      setActionLoading(true);
      await api.post(`hosting-requests/${id}/activate-monitoring/`, {
        monitoring_type: monitoringType,
      });
      toast.success("Monitoring activated");
      setConfirmOpen(false);
      fetchDetail();
      onUpdated();
    } catch (err) {
      toast.error(err?.response?.data?.detail || "Activation failed");
    } finally {
      setActionLoading(false);
    }
  };

  if (!data) return null;

  const formatUSD = (value) => `$${Number(value || 0).toLocaleString()}`;

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
        <div className="bg-white w-full max-w-3xl rounded-xl shadow-lg overflow-hidden">
          {/* HEADER */}
          <div className="flex justify-between items-center px-6 py-4 border-b">
            <h3 className="text-xl font-bold">Hosting Request #{data.id}</h3>
            <button onClick={onClose}>
              <FiX size={20} />
            </button>
          </div>

          {/* BODY */}
          <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
            {/* BASIC INFO */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm bg-gray-50 p-4 rounded-lg">
              <div>
                <b>User ID:</b> {data.user}
              </div>
              <div>
                <b>Email:</b> {data.user_email}
              </div>
              <div>
                <b>Phone:</b> {data.phone}
              </div>
              <div>
                <b>Location:</b> {data.hosting_location_display}
              </div>
              <div>
                <b>Payment:</b>{" "}
                <span className={data.is_paid ? "text-green-600" : "text-yellow-600"}>
                  {data.is_paid ? "Paid" : "Pending"}
                </span>
              </div>
              <div>
                <b>Created:</b> {new Date(data.created_at).toLocaleString()}
              </div>
            </div>

            {/* PRODUCTS */}
            <div>
              <p className="font-semibold mb-2">Products</p>
              <div className="border rounded-lg divide-y">
                {data.items.map((item) => (
                  <div key={item.id} className="flex justify-between p-3 text-sm">
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <div className="font-medium">{formatUSD(item.total_price)}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* BILLING */}
            <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
              <div>
                <p className="text-sm text-gray-500">Setup Fee</p>
                <p className="font-semibold">{formatUSD(data.setup_fee)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Amount</p>
                <p className="font-semibold">{formatUSD(data.total_amount)}</p>
              </div>
            </div>

            {/* ADMIN NOTES */}
            <div>
              <label className="text-sm font-medium">Admin Notes</label>
              <textarea
                rows={3}
                value={data.admin_notes || ""}
                onChange={(e) => setData({ ...data, admin_notes: e.target.value })}
                className="mt-1 w-full border rounded-lg p-2"
              />
            </div>

            {/* MONITORING */}
            <div className="border-t pt-4">
              <p className="font-semibold mb-2">Monitoring</p>

              {data.monitoring_activated ? (
                <div className="flex items-center gap-3 bg-green-50 border border-green-300 p-3 rounded-lg">
                  <FiCheckCircle className="text-green-600" />
                  <div>
                    <p className="font-semibold text-green-700">Activated</p>
                    <p className="text-sm">Type: {data.monitoring_type}</p>
                  </div>
                </div>
              ) : (
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setMonitoringType("internal");
                      setConfirmOpen(true);
                    }}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg"
                  >
                    Activate Internal
                  </button>
                  <button
                    onClick={() => {
                      setMonitoringType("external");
                      setConfirmOpen(true);
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                  >
                    Activate External
                  </button>
                </div>
              )}
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

      {confirmOpen && (
        <ConfirmModal
          title="Activate Monitoring"
          message={`Are you sure you want to activate ${monitoringType} monitoring?`}
          confirmText="Activate"
          onCancel={() => setConfirmOpen(false)}
          onConfirm={handleActivate}
          loading={actionLoading}
        />
      )}
    </>
  );
}
