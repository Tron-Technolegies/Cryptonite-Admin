import AppRoutes from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify/unstyled";
import React, { useEffect, useState } from "react";
import Loading from "./components/Loading";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  if (loading) return <Loading />;
  return (
    <div>
      <ToastContainer position="top-right" autoClose={2000} theme="colored" />
      <AppRoutes />
    </div>
  );
};

export default App;
