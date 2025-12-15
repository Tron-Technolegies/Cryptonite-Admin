import React from "react";

const StatCard = ({ title, value, icon }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition p-6 flex items-center justify-between">
      <div>
        <h3 className="text-sm text-gray-500">{title}</h3>
        <p className="text-3xl font-bold mt-1 text-black">{value}</p>
      </div>

      <div className="p-3 rounded-full bg-[#ecfff3] text-[var(--primary-color)]">{icon}</div>
    </div>
  );
};

export default StatCard;
