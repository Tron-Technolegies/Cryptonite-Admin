import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../pages/Layout";
import Dashboard from "../pages/dashboard/Dashboard";
import Product from "../pages/products/Product";
import Users from "../pages/users/Users";
import LoginPage from "../pages/login/LoginPage";
import Errorpage from "../pages/Errorpage";
import ProtectedRoute from "./ProtectedRoutes";
import AddProduct from "../pages/products/AddProducts";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BundlePage from "../pages/bundles/BundlePage";
import RentalPage from "../pages/rentals/RentalPage";
import HostingRequests from "../pages/hosting/HostingRequests";
import OrderPage from "../pages/orders/OrderPage";
import BundleForm from "../pages/bundles/BundleForm";
import EditProduct from "../pages/products/EditProducts";
import BulkUploadProducts from "../pages/products/BulkUploadProducts";
import Blogs from "../pages/blogs/Blogs";
import BlogForm from "../components/blogs/BlogForm";
import Events from "../pages/events/Events";
import EventForm from "../components/events/EventForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    errorElement: <Errorpage />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "products", element: <Product /> },
      { path: "products-add", element: <AddProduct /> },
      { path: "products-edit/:id", element: <EditProduct /> },
      { path: "/products-bulk-upload", element: <BulkUploadProducts /> },
      { path: "users", element: <Users /> },
      { path: "bundles", element: <BundlePage /> },
      { path: "bundles/add", element: <BundleForm /> },
      { path: "bundles/edit/:id", element: <BundleForm /> },
      { path: "rentals", element: <RentalPage /> },
      { path: "hosting-requests", element: <HostingRequests /> },
      { path: "orders", element: <OrderPage /> },
      { path: "blogs", element: <Blogs /> },
      { path: "blogs/add", element: <BlogForm /> },
      { path: "blogs/:id/update", element: <BlogForm /> },
      { path: "events", element: <Events /> },
      { path: "events/add", element: <EventForm /> },
      { path: "events/:id/update", element: <EventForm /> },
    ],
  },
  { path: "/login", element: <LoginPage /> },
]);

export default function AppRoutes() {
  return (
    <div>
      <ToastContainer position="top-right" autoClose={2000} theme="colored" />
      <RouterProvider router={router} />
    </div>
  );
}
