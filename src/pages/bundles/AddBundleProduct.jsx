import React from "react";

const AddBundleProduct = () => {
  return (
    <div className="max-w-4xl">
      <h2 className="text-3xl font-bold mb-8">Add Bundle Product</h2>

      <div className="bg-white shadow-md p-8 rounded-xl border space-y-7">
        <div className="space-y-2">
          <label className="text-gray-600 font-medium">Bundle Title</label>
          <input
            type="text"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Enter bundle title"
          />
        </div>

        <div className="space-y-2">
          <label className="text-gray-600 font-medium">Bundle Price (₹)</label>
          <input
            type="number"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Enter bundle price"
          />
        </div>

        <div className="space-y-2">
          <label className="text-gray-600 font-medium">Description</label>
          <textarea
            rows="4"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Write a short description"
          ></textarea>
        </div>

        <div className="space-y-2">
          <label className="text-gray-600 font-medium">Select Products</label>

          <select
            multiple
            className="w-full p-3 border rounded-lg h-40 focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option>ASIC Miner A1</option>
            <option>ASIC Miner A2</option>
            <option>GPU Rig 8-Card</option>
            <option>Cooling Fan Pro</option>
            <option>Mining PSU 3000W</option>
          </select>

          <p className="text-gray-500 text-sm">
            Hold <span className="font-semibold">CTRL</span> to select multiple.
          </p>
        </div>

        <div className="space-y-2">
          <label className="text-gray-600 font-medium">Bundle Image</label>
          <input
            type="file"
            className="w-full p-3 border rounded-lg bg-gray-50 focus:outline-none"
          />
        </div>

        <div className="h-40 w-40 border rounded-lg bg-gray-100 flex items-center justify-center text-gray-400">
          Image Preview
        </div>

        <div>
          <button className="bg-(--primary-color) text-white px-7 py-3 rounded-lg text-lg hover:bg-gray-900 transition">
            Create Bundle
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddBundleProduct;
