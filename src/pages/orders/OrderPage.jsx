import React from "react";
import OrderTable from "../../components/orders/OrderTable";

export default function OrderPage() {
  return (
    <div className="w-full min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Orders</h1>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4">
          <OrderTable />
        </div>
      </div>
    </div>
  );
}
