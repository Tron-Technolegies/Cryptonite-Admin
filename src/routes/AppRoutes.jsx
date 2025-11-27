import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Errorpage from "../pages/Errorpage";
import Layout from "../pages/Layout";
import Dashboard from "../pages/dashboard/Dashboard";
import AddProducts from "../pages/products/AddProducts";
import AddBundleProduct from "../pages/bundles/AddBundleProduct";
import LoginPage from "../pages/login/LoginPage";
import Users from "../pages/users/Users";

const AppRoutes = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      errorElement: <Errorpage />,
      element: <Layout />,

      children: [
        {index: true, element: <Dashboard/>},

        {path: "add-product", element: <AddProducts/>},

        {path: "add-bundle-products", element: <AddBundleProduct/>},

        {path: "users", element: <Users/>},


        {path: "login", element:<LoginPage/>}


    
      ]
    },

  ]);

  return <RouterProvider router={router} />;
};

export default AppRoutes;
