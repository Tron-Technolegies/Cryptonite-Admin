import React from "react";

const AddProduct = () => {
  return (
    <div className="max-w-4xl">

      {/* Page Title */}
      <h2 className="text-3xl font-bold mb-8">Add New Product</h2>

      {/* Card */}
      <div className="bg-white shadow-md p-8 rounded-xl border space-y-7">

        {/* Product Name */}
        <div className="space-y-2">
          <label className="text-gray-600 font-medium">Product Name</label>
          <input
            type="text"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Enter product name"
          />
        </div>

        {/* Price & Stock */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="space-y-2">
            <label className="text-gray-600 font-medium">Price (₹)</label>
            <input
              type="number"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter price"
            />
          </div>

          <div className="space-y-2">
            <label className="text-gray-600 font-medium">Stock</label>
            <input
              type="number"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter quantity"
            />
          </div>

        </div>

        {/* Category */}
        <div className="space-y-2">
          <label className="text-gray-600 font-medium">Category</label>
          <select className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black">
            <option>Select a category</option>
            <option>Mining Machine</option>
            <option>GPU</option>
            <option>Accessories</option>
            <option>Bundle</option>
          </select>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label className="text-gray-600 font-medium">Description</label>
          <textarea
            rows="5"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Enter product description"
          ></textarea>
        </div>

        {/* Image Upload */}
        <div className="space-y-2">
          <label className="text-gray-600 font-medium">Product Image</label>
          
          <div className="border rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition cursor-pointer">
            <input
              type="file"
              className="w-full text-gray-600"
            />
          </div>

          {/* Optional Preview Box */}
          <div className="h-40 w-40 border rounded-lg bg-gray-100 flex items-center justify-center text-gray-400">
            Image Preview
          </div>
        </div>

        {/* Submit Button */}
        <div>
          <button className="bg-(--primary-color) text-white px-7 py-3 rounded-lg text-lg hover:bg-gray-900 transition">
            Add Product
          </button>
        </div>

      </div>
    </div>
  );
};

export default AddProduct;
