import React, { useEffect, useState } from "react";
import api from "../../api/api";
import { Link } from "react-router-dom";

const statusColor = (status) => {
  switch (status) {
    case "completed":
      return "text-green-600 bg-green-100";
    case "pending":
      return "text-yellow-600 bg-yellow-100";
    case "cancelled":
      return "text-red-600 bg-red-100";
    default:
      return "text-gray-600 bg-gray-100";
  }
};

const RecentOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get("orders/").then((res) => setOrders(res.data.slice(0, 4)));
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 max-w-xl">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-base font-semibold">Recent Orders</h3>
        <Link to="/orders" className="text-xs text-gray-500 hover:text-green-600">
          View all
        </Link>
      </div>

      {/* TABLE HEADINGS */}
      <div className="grid grid-cols-5 text-xs text-gray-400 font-medium px-3 mb-2">
        <span>Order</span>
        <span>User</span>
        <span>Items</span>
        <span>Amount</span>
        <span>Status</span>
      </div>

      {/* ORDERS */}
      <div className="space-y-2">
        {orders.map((o) => (
          <div key={o.id} className="grid grid-cols-5 items-center  rounded-lg px-3 py-2 text-xs">
            {/* ORDER ID */}
            <span className="font-medium">#{o.id}</span>

            {/* USER */}
            <span className="truncate text-gray-600">{o.user_email}</span>

            {/* TOTAL ITEMS */}
            <span className="text-center font-medium">
              {o.items?.reduce((sum, i) => sum + i.quantity, 0) || 0}
            </span>

            {/* AMOUNT */}
            <span className="font-semibold">₹{o.total_amount}</span>

            {/* STATUS */}
            <span
              className={`text-center px-2 py-1 rounded-full font-medium ${statusColor(o.status)}`}
            >
              {o.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentOrders;
