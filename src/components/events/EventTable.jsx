import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../api/api";
import Loading from "../Loading";
import ConfirmModal from "../ConfirmModal";
import { FiEdit2, FiTrash2, FiPlus } from "react-icons/fi";

// MUI
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function EventTable() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await api.get("admin/events/");
      setEvents(res.data);
    } catch {
      toast.error("Failed to load events");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const confirmDelete = async () => {
    try {
      setDeleting(true);
      await api.delete(`admin/events/${deleteId}/delete/`);
      toast.success("Event deleted");
      setDeleteId(null);
      fetchEvents();
    } catch {
      toast.error("Delete failed");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-green-800">Events Management</h2>
        {/* <button
          onClick={() => navigate("/admin/events/add")}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
        >
          <FiPlus /> Add Event
        </button> */}
      </div>

      <TableContainer
        component={Paper}
        elevation={0}
        className="border border-green-100 rounded-xl overflow-hidden"
      >
        <Table sx={{ minWidth: 900 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f0fdf4" }}>
              <TableCell align="left">
                <b>Event Title</b>
              </TableCell>
              <TableCell align="center">
                <b>Status</b>
              </TableCell>
              <TableCell align="center">
                <b>Created Date</b>
              </TableCell>
              <TableCell align="center">
                <b>Actions</b>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {events.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center" className="py-10 text-gray-500">
                  No events found. Start by adding one!
                </TableCell>
              </TableRow>
            ) : (
              events.map((event) => (
                <TableRow key={event.id} className="hover:bg-green-50/30 transition-colors">
                  <TableCell align="left" className="font-medium text-gray-700">
                    {event.title}
                  </TableCell>

                  <TableCell align="center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        event.is_published
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {event.is_published ? "Published" : "Draft"}
                    </span>
                  </TableCell>

                  <TableCell align="center" className="text-gray-600">
                    {new Date(event.created_at).toLocaleDateString()}
                  </TableCell>

                  <TableCell align="center">
                    <div className="flex justify-center gap-4">
                      <FiEdit2
                        className="cursor-pointer text-green-600 hover:text-green-800 transition-colors"
                        size={18}
                        onClick={() => navigate(`/admin/events/${event.id}/update`)}
                      />
                      <FiTrash2
                        className="cursor-pointer text-red-400 hover:text-red-600 transition-colors"
                        size={18}
                        onClick={() => setDeleteId(event.id)}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {deleteId && (
        <ConfirmModal
          title="Delete Event"
          message="Are you sure? This event and all its associated images will be removed."
          confirmText="Delete"
          loading={deleting}
          onCancel={() => setDeleteId(null)}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
}
