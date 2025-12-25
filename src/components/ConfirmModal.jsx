import { FiAlertTriangle } from "react-icons/fi";

export default function ConfirmModal({
  title = "Confirm Action",
  message = "Are you sure?",
  confirmText = "Delete",
  cancelText = "Cancel",
  loading = false,
  onConfirm,
  onCancel,
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 animate-fade-in">
        {/* HEADER */}
        <div className="flex items-center gap-3 mb-4">
          <FiAlertTriangle className="text-red-500" size={22} />
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>

        {/* MESSAGE */}
        <p className="text-gray-600 mb-6">{message}</p>

        {/* ACTIONS */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            disabled={loading}
            className="px-4 py-2 border rounded-lg hover:bg-gray-100"
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="px-5 py-2 rounded-lg text-white bg-red-600 hover:bg-red-700 disabled:opacity-50"
          >
            {loading ? "Deleting..." : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
