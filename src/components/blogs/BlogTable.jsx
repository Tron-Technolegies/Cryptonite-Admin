import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../api/api";
import Loading from "../Loading";
import ConfirmModal from "../ConfirmModal";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

// MUI
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function BlogTable() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await api.get("admin/blogs/");
      setBlogs(res.data);
    } catch {
      toast.error("Failed to load blogs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const confirmDelete = async () => {
    try {
      setDeleting(true);
      await api.delete(`admin/blogs/${deleteId}/delete/`);
      toast.success("Blog deleted");
      setDeleteId(null);
      fetchBlogs();
    } catch {
      toast.error("Delete failed");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <>
      <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
        <Table sx={{ minWidth: 900 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#F9FAFB" }}>
              <TableCell align="center">
                <b>Title</b>
              </TableCell>
              <TableCell align="center">
                <b>Status</b>
              </TableCell>
              <TableCell align="center">
                <b>Created</b>
              </TableCell>
              <TableCell align="center">
                <b>Actions</b>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {blogs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No blogs found
                </TableCell>
              </TableRow>
            ) : (
              blogs.map((blog) => (
                <TableRow key={blog.id}>
                  <TableCell align="center" className="font-medium">
                    {blog.title}
                  </TableCell>

                  <TableCell align="center">{blog.is_published ? "Published" : "Draft"}</TableCell>

                  <TableCell align="center">
                    {new Date(blog.created_at).toLocaleDateString()}
                  </TableCell>

                  <TableCell align="center">
                    <div className="flex justify-center gap-4">
                      <FiEdit2
                        className="cursor-pointer hover:text-blue-500"
                        onClick={() => navigate(`/admin/blogs/${blog.id}/update/`)}
                      />
                      <FiTrash2
                        className="cursor-pointer hover:text-red-500"
                        onClick={() => setDeleteId(blog.id)}
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
          title="Delete Blog"
          message="This blog will be permanently deleted."
          confirmText="Delete"
          loading={deleting}
          onCancel={() => setDeleteId(null)}
          onConfirm={confirmDelete}
        />
      )}
    </>
  );
}
