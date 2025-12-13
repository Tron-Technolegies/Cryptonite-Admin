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

export default function ProductTable() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Pagination (same style as AgreementTable)
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const sampleProducts = [
    {
      id: 1,
      name: "ASIC Miner S19 Pro",
      price: 125000,
      stock: 10,
      category: "Mining Hardware",
    },
    {
      id: 2,
      name: "WhatsMiner M30S++",
      price: 138000,
      stock: 7,
      category: "Mining Hardware",
    },
    {
      id: 3,
      name: "Mining Power Supply 3200W",
      price: 18000,
      stock: 25,
      category: "Accessories",
    },
    {
      id: 4,
      name: "Immersion Cooling Tank",
      price: 85000,
      stock: 3,
      category: "Cooling",
    },
    {
      id: 5,
      name: "Antminer Control Board",
      price: 9500,
      stock: 40,
      category: "Spare Parts",
    },
  ];

  // Fetch products
  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const res = await api.get("products/");

      // ✅ Use API data if available, else fallback to samples
      if (res.data && res.data.length > 0) {
        setProducts(res.data);
      } else {
        setProducts(sampleProducts);
      }
    } catch (error) {
      // ✅ On error also show samples
      setProducts(sampleProducts);
      toast.error("Failed to load products (showing sample data)");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (isLoading) return <Loading />;

  const paginatedProducts = products.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <div className="bg-[#F5F5F5] rounded-lg p-4 mt-6 max-w-[90vw]">
      <h2 className="text-lg font-semibold mb-2">Products</h2>
      <p className="text-sm text-gray-600 mb-3">Manage all available products and their details.</p>

      {/* TABLE */}
      <TableContainer
        component={Paper}
        sx={{
          marginTop: 3,
          overflowX: "auto",
        }}
      >
        <Table sx={{ minWidth: 750 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#F9FAFB" }}>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Name
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Price
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Stock
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Category
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody sx={{ background: "#eff6ff" }}>
            {paginatedProducts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No products found
                </TableCell>
              </TableRow>
            ) : (
              paginatedProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell align="center">{product.name}</TableCell>
                  <TableCell align="center">₹{product.price}</TableCell>
                  <TableCell align="center">{product.stock}</TableCell>
                  <TableCell align="center">{product.category}</TableCell>
                  <TableCell align="center">
                    <div className="flex justify-center gap-3">
                      <FiEdit2 className="cursor-pointer hover:text-blue-500" size={18} />
                      <FiTrash2 className="cursor-pointer hover:text-red-500" size={18} />
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
    </div>
  );
}
