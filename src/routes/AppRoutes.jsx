import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Errorpage from "../pages/Errorpage";
import Layout from "../pages/Layout";
import Dashboard from "../pages/dashboard/Dashboard";
import AddProducts from "../pages/products/AddProducts";

const AppRoutes = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      errorElement: <Errorpage />,
      element: <Layout />,

      children: [
        {index: true, element: <Dashboard/>},
        {path: "add-product", element: <AddProducts/>}
      ]
    },

  ]);

  return <RouterProvider router={router} />;
};

export default AppRoutes;
