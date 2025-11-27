import React from "react";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      {/* Card */}
      <div className="bg-white shadow-lg p-8 rounded-xl w-full max-w-md border">

        {/* Title */}
        <h2 className="text-3xl font-bold text-center mb-6">Admin Login</h2>

        {/* Form */}
        <form className="space-y-5">

          {/* Email */}
          <div className="space-y-2">
            <label className="text-gray-600 font-medium">Email</label>
            <input
              type="email"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter email"
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="text-gray-600 font-medium">Password</label>
            <input
              type="password"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter password"
            />
          </div>

          {/* Submit */}
          <button
            className="w-full bg-(--primary-color) text-white py-3 rounded-lg text-lg hover:bg-gray-900 transition"
            type="submit"
          >
            Login
          </button>
        </form>

       

      </div>
    </div>
  );
};

export default LoginPage;
