import React from "react";

const Dashboard = () => {
  return (
    <div>

      {/* Title */}
      <h2 className="text-3xl font-bold mb-6">Dashboard</h2>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

        {/* Total Products */}
        <div className="bg-white shadow-sm p-6 rounded-lg border">
          <h3 className="text-gray-600 text-sm font-medium">Total Products</h3>
          <p className="text-4xl font-bold mt-2 text-black">0</p>
        </div>

        {/* Total Customers */}
        <div className="bg-white shadow-sm p-6 rounded-lg border">
          <h3 className="text-gray-600 text-sm font-medium">Total Customers</h3>
          <p className="text-4xl font-bold mt-2 text-black">0</p>
        </div>

        {/* Total Orders */}
        <div className="bg-white shadow-sm p-6 rounded-lg border">
          <h3 className="text-gray-600 text-sm font-medium">Total Orders</h3>
          <p className="text-4xl font-bold mt-2 text-black">0</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white shadow-sm p-6 rounded-lg border">
        <h3 className="text-xl font-semibold mb-4">Recent Activities</h3>

        <ul className="space-y-3">
          <li className="text-gray-700">• New customer registered</li>
          <li className="text-gray-700">• 1 new product added</li>
          <li className="text-gray-700">• Order #1023 placed</li>
          <li className="text-gray-700">• Bundle offer updated</li>
        </ul>
      </div>

    </div>
  );
};

export default Dashboard;
