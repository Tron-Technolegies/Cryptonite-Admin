import React, { useEffect, useState } from "react";
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
import AddProduct from "../../pages/products/AddProducts";

// Modal
export default function ProductTable() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

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

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      await api.delete(`products/${id}/delete/`);
      toast.success("Product deleted");
      fetchProducts();
    } catch {
      toast.error("Failed to delete product");
    }
  };

  const paginatedProducts = products.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  if (isLoading) return <Loading />;

  return (
    <div className="bg-[#F5F5F5] rounded-lg p-4 mt-6 max-w-[90vw]">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold">Products</h2>
          <p className="text-sm text-gray-600">Manage all available products</p>
        </div>
      </div>

      {/* TABLE */}
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
                <b>Actions</b>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody sx={{ background: "#eff6ff" }}>
            {paginatedProducts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No products found
                </TableCell>
              </TableRow>
            ) : (
              paginatedProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell align="center">{product.model_name}</TableCell>
                  <TableCell align="center">₹{product.price || "-"}</TableCell>
                  <TableCell align="center">{product.hashrate}</TableCell>
                  <TableCell align="center">{product.power}</TableCell>
                  <TableCell align="center">{product.algorithm}</TableCell>
                  <TableCell align="center">
                    <div className="flex justify-center gap-3">
                      <FiEdit2
                        size={18}
                        className="cursor-pointer hover:text-blue-500"
                        onClick={() => {
                          setEditProduct(product);
                          setShowForm(true);
                        }}
                      />
                      <FiTrash2
                        size={18}
                        className="cursor-pointer hover:text-red-500"
                        onClick={() => handleDelete(product.id)}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

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

      {/* MODAL */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-xl">
            <AddProduct
              editData={editProduct}
              onSuccess={() => {
                setShowForm(false);
                fetchProducts();
              }}
              onClose={() => setShowForm(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
