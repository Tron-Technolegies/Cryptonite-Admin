import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../api/api";
import Loading from "../../components/Loading";

// MUI
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function RentalTable() {
  const [rentals, setRentals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchRentals = async () => {
    try {
      setIsLoading(true);
      const res = await api.get("rentals/");
      setRentals(res.data);
    } catch {
      toast.error("Failed to load rentals data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRentals();
  }, []);

  if (isLoading) return <Loading />;

  return (
    <div className="bg-[#F5F5F5] rounded-lg p-4 mt-6 max-w-[90vw]">
      <h2 className="text-3xl font-bold mb-2">Rentals</h2>
      <p className="text-sm text-gray-600 mb-4">Rental machine transactions</p>

      <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
        <Table sx={{ minWidth: 900 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#F9FAFB" }}>
              <TableCell align="center">
                <b>ID</b>
              </TableCell>
              <TableCell align="center">
                <b>User ID</b>
              </TableCell>
              <TableCell align="center">
                <b>Product</b>
              </TableCell>
              <TableCell align="center">
                <b>Duration (Days)</b>
              </TableCell>
              <TableCell align="center">
                <b>Start Date</b>
              </TableCell>
              <TableCell align="center">
                <b>End Date</b>
              </TableCell>
              <TableCell align="center">
                <b>Total Amount ($)</b>
              </TableCell>
              <TableCell align="center">
                <b>Status</b>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody sx={{ background: "#eff6ff" }}>
            {rentals.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  No rentals found
                </TableCell>
              </TableRow>
            ) : (
              rentals.map((rental) => (
                <TableRow key={rental.id} hover>
                  <TableCell align="center">{rental.id}</TableCell>

                  <TableCell align="center">User #{rental.user}</TableCell>

                  <TableCell align="center">{rental.product_name}</TableCell>

                  <TableCell align="center">{rental.duration_days}</TableCell>

                  <TableCell align="center">
                    {new Date(rental.start_date).toLocaleDateString()}
                  </TableCell>

                  <TableCell align="center">
                    {new Date(rental.end_date).toLocaleDateString()}
                  </TableCell>

                  <TableCell align="center" className="font-semibold">
                    ${rental.amount_paid}
                  </TableCell>

                  <TableCell align="center">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        rental.is_active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                      }`}
                    >
                      {rental.is_active ? "Active" : "Completed"}
                    </span>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
