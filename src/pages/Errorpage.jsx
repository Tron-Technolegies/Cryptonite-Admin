import React from "react";

const Errorpage = () => {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-[100px] font-extrabold" style={{ color: "var(--primary-color)" }}>
        404
      </h1>

      <p className="text-white text-xl mt-2">Page Not Found</p>

      <p className="text-gray-400 mt-1">The page you’re looking for doesn’t exist.</p>
    </div>
  );
};

export default Errorpage;
