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

const STATUS_OPTIONS = ["completed", "shipped", "cancelled"];

export default function OrderTable() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      const res = await api.get("orders/");
      setOrders(res.data);
    } catch {
      toast.error("Failed to load orders");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      setUpdatingId(id);
      await api.patch(`orders/${id}/status/`, { status });
      toast.success("Order status updated");
      fetchOrders();
    } catch {
      toast.error("Failed to update status");
    } finally {
      setUpdatingId(null);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="bg-[#F5F5F5] rounded-lg p-4 mt-6 max-w-[90vw]">
      <h2 className="text-3xl font-bold mb-2">Orders</h2>
      <p className="text-sm text-gray-600 mb-4">Customer purchase orders</p>

      <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
        <Table sx={{ minWidth: 1000 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#F9FAFB" }}>
              <TableCell align="center">
                <b>Order ID</b>
              </TableCell>
              <TableCell align="center">
                <b>User Email</b>
              </TableCell>
              <TableCell align="center">
                <b>Items</b>
              </TableCell>
              <TableCell align="center">
                <b>Total Amount </b>
              </TableCell>
              <TableCell align="center">
                <b>Payment</b>
              </TableCell>
              <TableCell align="center">
                <b>Status</b>
              </TableCell>
              <TableCell align="center">
                <b>Date</b>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody sx={{ background: "#eff6ff" }}>
            {orders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No orders found
                </TableCell>
              </TableRow>
            ) : (
              orders.map((order) => (
                <TableRow key={order.id} hover>
                  <TableCell align="center">#{order.id}</TableCell>

                  <TableCell align="center">{order.user_email}</TableCell>

                  <TableCell align="center">
                    {order.items && order.items.length > 0 ? (
                      <div className="flex flex-col gap-1">
                        {order.items.map((item) => (
                          <div key={item.id} className="text-sm">
                            <span className="font-medium">{item.product_name}</span>
                            <span className="text-gray-500"> × {item.quantity}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <span className="text-gray-400">No items</span>
                    )}
                  </TableCell>

                  <TableCell align="center" className="font-semibold">
                    {order.total_amount}
                  </TableCell>

                  <TableCell align="center">{order.stripe_payment_intent}</TableCell>

                  {/* STATUS (ADMIN CONTROL) */}
                  <TableCell align="center">
                    <select
                      value={order.status}
                      disabled={updatingId === order.id}
                      onChange={(e) => updateStatus(order.id, e.target.value)}
                      className={`px-3 py-1 rounded-lg text-sm font-medium border focus:outline-none `}
                    >
                      {STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </TableCell>

                  <TableCell align="center">
                    {new Date(order.created_at).toLocaleDateString()}
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
