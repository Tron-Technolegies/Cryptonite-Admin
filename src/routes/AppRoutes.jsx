import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../pages/Layout";
import Dashboard from "../pages/dashboard/Dashboard";
import Product from "../pages/products/Product";
import AddBundleProduct from "../pages/bundles/AddBundleProduct";
import Users from "../pages/users/Users";
import LoginPage from "../pages/login/LoginPage";
import Errorpage from "../pages/Errorpage";
import ProtectedRoute from "./ProtectedRoutes";
import AddProduct from "../pages/products/AddProducts";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      { path: "add-bundle-products", element: <AddBundleProduct /> },
      { path: "users", element: <Users /> },
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
