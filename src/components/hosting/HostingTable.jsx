import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../api/api";
import Loading from "../../components/Loading";

// MUI
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { FiEye, FiTrash2 } from "react-icons/fi";
import HostingRequestModal from "./HostingRequestModal";

export default function HostingTable() {
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [selectedId, setSelectedId] = useState(null);

  const deleteRequest = async (id) => {
    if (!window.confirm("Delete this hosting request?")) return;

    try {
      await api.delete(`hosting/requests/${id}/delete/`);
      toast.success("Hosting request deleted");
      fetchRequests();
    } catch {
      toast.error("Failed to delete request");
    }
  };

  const fetchRequests = async () => {
    try {
      setIsLoading(true);
      const res = await api.get("hosting/requests/");
      setRequests(res.data);
    } catch {
      toast.error("Failed to load hosting requests");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (isLoading) return <Loading />;

  return (
    <div className="bg-[#F5F5F5] rounded-lg p-4 mt-6">
      <h2 className="text-3xl font-bold mb-2">Hosting Requests</h2>
      <p className="text-sm text-gray-600 mb-4">User machine hosting & infrastructure requests</p>

      {/* RESPONSIVE WRAPPER */}
      <TableContainer
        component={Paper}
        sx={{
          overflowX: "auto",
          borderRadius: "12px",
        }}
      >
        <Table sx={{ minWidth: 1200 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#F9FAFB" }}>
              <TableCell>
                <b>ID</b>
              </TableCell>
              <TableCell>
                <b>User</b>
              </TableCell>
              <TableCell>
                <b>Phone</b>
              </TableCell>
              <TableCell>
                <b>Products</b>
              </TableCell>
              <TableCell>
                <b>Location</b>
              </TableCell>
              <TableCell>
                <b>Amount</b>
              </TableCell>
              <TableCell>
                <b>Payment</b>
              </TableCell>
              <TableCell>
                <b>Requested On</b>
              </TableCell>
              <TableCell>
                <b>Actions</b>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {requests.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  No hosting requests found
                </TableCell>
              </TableRow>
            ) : (
              requests.map((req) => (
                <TableRow key={req.id} hover>
                  {/* ID */}
                  <TableCell>#{req.id}</TableCell>

                  {/* USER */}
                  <TableCell>User #{req.user}</TableCell>

                  {/* PHONE */}
                  <TableCell>{req.phone || "—"}</TableCell>

                  {/* PRODUCTS */}
                  <TableCell>
                    {req.items?.length ? (
                      <div className="flex flex-col gap-1">
                        {req.items.map((item) => (
                          <div key={item.id} className="text-sm">
                            <span className="font-medium">{item.title}</span>
                            <span className="text-gray-500"> × {item.quantity}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      "—"
                    )}
                  </TableCell>

                  {/* LOCATION */}
                  <TableCell>{req.hosting_location || "—"}</TableCell>

                  {/* AMOUNT */}
                  <TableCell>
                    <div className="text-sm">
                      <div>
                        Total: <b>${req.total_amount}</b>
                      </div>
                      <div className="text-gray-500">Setup: ${req.setup_fee}</div>
                    </div>
                  </TableCell>

                  {/* PAYMENT */}
                  <TableCell>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        req.is_paid
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {req.is_paid ? "Paid" : "Pending"}
                    </span>
                  </TableCell>

                  {/* DATE */}
                  <TableCell>{new Date(req.created_at).toLocaleDateString()}</TableCell>
                  {/* ACTIONS */}
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {/* VIEW */}
                      <button
                        onClick={() => setSelectedId(req.id)}
                        className="text-blue-600 hover:text-blue-800"
                        title="View details"
                      >
                        <FiEye size={18} />
                      </button>

                      {/* DELETE */}
                      <button
                        onClick={() => deleteRequest(req.id)}
                        className="text-red-600 hover:text-red-800"
                        title="Delete request"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {selectedId && (
        <HostingRequestModal
          id={selectedId}
          onClose={() => setSelectedId(null)}
          onUpdated={fetchRequests}
        />
      )}
    </div>
  );
}
