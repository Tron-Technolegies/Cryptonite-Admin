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

export default function HostingTable() {
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
    <div className="bg-[#F5F5F5] rounded-lg p-4 mt-6 max-w-[90vw]">
      <h2 className="text-3xl font-bold mb-2">Hosting Requests</h2>
      <p className="text-sm text-gray-600 mb-4">User machine hosting requests</p>

      <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
        <Table sx={{ minWidth: 900 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#F9FAFB" }}>
              <TableCell align="center">
                <b>ID</b>
              </TableCell>
              <TableCell align="center">
                <b>User</b>
              </TableCell>
              <TableCell align="center">
                <b>Product</b>
              </TableCell>
              <TableCell align="center">
                <b>Location</b>
              </TableCell>
              <TableCell align="center">
                <b>Status</b>
              </TableCell>
              <TableCell align="center">
                <b>Requested On</b>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody sx={{ background: "#eff6ff" }}>
            {requests.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No hosting requests found
                </TableCell>
              </TableRow>
            ) : (
              requests.map((req) => (
                <TableRow key={req.id} hover>
                  <TableCell align="center">{req.id}</TableCell>
                  <TableCell align="center">{req.user?.email}</TableCell>
                  <TableCell align="center">{req.product?.model_name || "—"}</TableCell>
                  <TableCell align="center">{req.location || "—"}</TableCell>
                  <TableCell align="center">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        req.status === "approved"
                          ? "bg-green-100 text-green-700"
                          : req.status === "rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {req.status}
                    </span>
                  </TableCell>
                  <TableCell align="center">
                    {new Date(req.created_at).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
