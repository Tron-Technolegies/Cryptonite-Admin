import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";

const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      {/* Card */}
      <div className="bg-white  p-6 sm:p-8 rounded-xl w-full max-w-md ">
        {/* Title */}
        <h2 className="text-3xl font-bold text-center mb-2">Admin Login</h2>
        <p className="text-center text-gray-500 mb-6 text-sm">
          Sign in to access the admin dashboard
        </p>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleLogin}>
          {/* Email */}
          <div className="space-y-2">
            <label className="text-gray-600 font-medium">Email</label>
            <div className="relative">
              <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3 py-3 border-gray-300 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Enter email"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="text-gray-600 font-medium">Password</label>
            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-3 border-gray-300 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Enter password"
              />

              {/* Show / Hide */}
              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg text-white font-medium transition disabled:opacity-60"
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
