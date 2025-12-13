import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return toast.error("Email and password are required");
    }

    try {
      setLoading(true);

      const res = await axios.post("https://cryptonite-gbcg.onrender.com/api/user/auth/login/", {
        email,
        password,
      });

      // assuming backend returns access token
      const { access } = res.data;

      localStorage.setItem("access_token", access);

      toast.success("Login successful");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.detail || "Invalid login credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {/* Card */}
      <div className="bg-white shadow-lg p-8 rounded-xl w-full max-w-md border">
        {/* Title */}
        <h2 className="text-3xl font-bold text-center mb-6">Admin Login</h2>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleLogin}>
          {/* Email */}
          <div className="space-y-2">
            <label className="text-gray-600 font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter email"
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="text-gray-600 font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter password"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg text-black font-medium transition"
            style={{ backgroundColor: "var(--primary-color)" }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
