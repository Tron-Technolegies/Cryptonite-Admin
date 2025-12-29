import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../api/api";
import Loading from "../Loading";

// MUI
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

// Icons
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import ConfirmModal from "../ConfirmModal";

export default function BundleTable() {
  const [bundles, setBundles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const itemsPerPage = 5;
  const navigate = useNavigate();
  const totalPages = Math.ceil(bundles.length / itemsPerPage);

  // ===== FETCH BUNDLES =====
  const fetchBundles = async () => {
    try {
      setIsLoading(true);
      const res = await api.get("bundles/");
      setBundles(res.data);
    } catch {
      toast.error("Failed to load bundles");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBundles();
  }, []);

  // ===== DELETE =====
  const confirmDelete = async () => {
    try {
      setDeleting(true);
      await api.delete(`bundles/${deleteId}/delete/`);
      toast.success("Bundle deleted");
      setDeleteId(null);
      fetchBundles();
    } catch {
      toast.error("Failed to delete bundle");
    } finally {
      setDeleting(false);
    }
  };

  const sortedBundles = [...bundles].sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );

  const paginated = sortedBundles.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  if (isLoading) return <Loading />;

  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
        <Table sx={{ minWidth: 1000 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#F9FAFB" }}>
              <TableCell>
                <b>Bundle</b>
              </TableCell>
              <TableCell align="center">
                <b>Price</b>
              </TableCell>
              <TableCell align="center">
                <b>Products</b>
              </TableCell>
              <TableCell align="center">
                <b>Hosting / kW</b>
              </TableCell>
              <TableCell align="center">
                <b>Hashrate</b>
              </TableCell>
              <TableCell align="center">
                <b>Power</b>
              </TableCell>
              <TableCell align="center">
                <b>Actions</b>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {paginated.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No bundles found
                </TableCell>
              </TableRow>
            ) : (
              paginated.map((bundle) => (
                <TableRow key={bundle.id} hover>
                  {/* IMAGE + NAME */}
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img
                        src={bundle.image}
                        alt={bundle.name}
                        className="h-10 w-10 rounded-md object-cover border"
                      />
                      <div>
                        <p className="font-medium">{bundle.name}</p>
                        <p className="text-xs text-gray-500">{bundle.description || "—"}</p>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell align="center">${bundle.price}</TableCell>

                  <TableCell align="left">
                    {bundle.items?.length ? (
                      <div className="flex flex-col text-sm gap-1">
                        {bundle.items.map((item) => (
                          <div key={item.product_id}>
                            <span className="font-medium">{item.product_name}</span>
                            <span className="text-gray-500"> × {item.quantity}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      "—"
                    )}
                  </TableCell>

                  <TableCell align="center">{bundle.hosting_fee_per_kw}</TableCell>
                  <TableCell align="center">{bundle.total_hashrate}</TableCell>
                  <TableCell align="center">{bundle.total_power}</TableCell>

                  <TableCell align="center">
                    <div className="flex justify-center gap-4">
                      <FiEdit2
                        size={18}
                        className="cursor-pointer hover:text-blue-600"
                        onClick={() => navigate(`/bundles/edit/${bundle.id}`)}
                      />
                      <FiTrash2
                        size={18}
                        className="cursor-pointer hover:text-red-600"
                        onClick={() => setDeleteId(bundle.id)}
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
          title="Delete Bundle"
          message="This bundle and all its product mappings will be permanently deleted. This action cannot be undone."
          confirmText="Delete"
          loading={deleting}
          onCancel={() => setDeleteId(null)}
          onConfirm={confirmDelete}
        />
      )}

      {/* PAGINATION */}
      <div className="flex justify-center gap-4 mt-4">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-4 py-2 border rounded disabled:opacity-40"
        >
          Prev
        </button>

        <span className="py-2">
          Page {page} / {totalPages || 1}
        </span>

        <button
          disabled={page === totalPages || totalPages === 0}
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 border rounded disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}
