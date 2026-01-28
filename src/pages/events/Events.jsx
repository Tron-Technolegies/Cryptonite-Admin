import React from "react";
import { useNavigate } from "react-router-dom";
import { IoAddCircleOutline } from "react-icons/io5";
import EventTable from "../../components/events/EventTable";

export default function Events() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-10">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* HEADER */}
        <div className="flex justify-between items-center b py-4">
          <div>
            <h1 className="text-2xl font-bold text-black">Events Dashboard</h1>
            <p className="text-sm text-gray-600">Manage your event announcements and gallery</p>
          </div>

          <button
            onClick={() => navigate("/events/add")}
            className="px-6 py-2.5 rounded-lg text-white flex items-center gap-2 bg-green-600 hover:bg-green-700 transition-all shadow-md shadow-green-100 font-medium"
          >
            <IoAddCircleOutline size={20} />
            Add Event
          </button>
        </div>

        {/* TABLE WRAPPER */}
        <div className="bg-white rounded-xl shadow-sm border border-green-50 overflow-hidden">
          <EventTable />
        </div>
      </div>
    </div>
  );
}
