import React from "react";
import { FiBox, FiUsers, FiShoppingCart, FiTrendingUp } from "react-icons/fi";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Products",
      value: 128,
      icon: <FiBox size={26} />,
    },
    {
      title: "Total Customers",
      value: 542,
      icon: <FiUsers size={26} />,
    },
    {
      title: "Total Orders",
      value: 89,
      icon: <FiShoppingCart size={26} />,
    },
    {
      title: "Monthly Revenue",
      value: "₹4,25,000",
      icon: <FiTrendingUp size={26} />,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h2 className="text-3xl font-bold">Dashboard</h2>
        <p className="text-gray-500 mt-1">Overview of your mining store performance</p>
      </div>

      {/* WRAPPER CARD */}
      <div className="bg-white rounded-xl shadow-md p-6">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm hover:shadow-lg transition p-6 flex items-center justify-between"
            >
              <div>
                <h3 className="text-sm text-gray-500">{item.title}</h3>
                <p className="text-3xl font-bold mt-1" style={{ color: "var(--primary-color)" }}>
                  {item.value}
                </p>
              </div>

              <div
                className="p-3 rounded-full text-white"
                style={{ backgroundColor: "var(--primary-color)" }}
              >
                {item.icon}
              </div>
            </div>
          ))}
        </div>

        {/* Dummy Content */}
        {/* <div className="mt-8 bg-gray-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-2">System Summary</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            This dashboard gives you a quick overview of your mining products, customers, and
            orders. Future updates can include analytics charts, performance tracking, and real-time
            system insights.
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default Dashboard;
