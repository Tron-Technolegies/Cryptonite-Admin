import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../api/api";
import Loading from "../Loading";
import { useNavigate } from "react-router-dom";

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

export default function ProductTable() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const [page, setPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const res = await api.get("products/");
      setProducts(res.data);
    } catch {
      toast.error("Failed to load products");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const confirmDelete = async () => {
    try {
      setDeleting(true);
      await api.delete(`products/${deleteId}/delete/`);
      toast.success("Product deleted");
      setDeleteId(null);
      fetchProducts();
    } catch {
      toast.error("Failed to delete product");
    } finally {
      setDeleting(false);
    }
  };

  const paginatedProducts = products.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  if (isLoading) return <Loading />;

  return (
    <div className="bg-[#F5F5F5] rounded-lg p-4 max-w-[90vw]">
      <TableContainer component={Paper} sx={{ marginTop: 3, overflowX: "auto" }}>
        <Table sx={{ minWidth: 900 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#F9FAFB" }}>
              <TableCell align="center">
                <b>Name</b>
              </TableCell>
              <TableCell align="center">
                <b>Price</b>
              </TableCell>
              <TableCell align="center">
                <b>Hashrate</b>
              </TableCell>
              <TableCell align="center">
                <b>Power</b>
              </TableCell>
              <TableCell align="center">
                <b>Algorithm</b>
              </TableCell>
              <TableCell align="center">
                <b>Available</b>
              </TableCell>
              <TableCell align="center">
                <b>Actions</b>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedProducts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No products found
                </TableCell>
              </TableRow>
            ) : (
              paginatedProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell align="center">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.image}
                        alt={product.model_name}
                        className="h-10 w-10 rounded-md object-cover border"
                      />
                      <p className="font-medium">{product.model_name}</p>
                    </div>
                  </TableCell>
                  <TableCell align="center">$ {product.price || "-"}</TableCell>
                  <TableCell align="center">{product.hashrate}</TableCell>
                  <TableCell align="center">{product.power}</TableCell>
                  <TableCell align="center">{product.algorithm}</TableCell>
                  <TableCell align="center">{product.is_available ? "Yes" : "No"}</TableCell>
                  <TableCell align="center">
                    <div className="flex justify-center gap-3">
                      <FiEdit2
                        className="cursor-pointer hover:text-blue-500"
                        onClick={() => navigate(`/products-edit/${product.id}`)}
                      />
                      <FiTrash2
                        className="cursor-pointer hover:text-red-500"
                        onClick={() => setDeleteId(product.id)}
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
          title="Delete Product"
          message="This product will be permanently removed. This action cannot be undone."
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
