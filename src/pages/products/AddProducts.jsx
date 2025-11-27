import React from "react";

const AddProducts = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Add Product</h2>

      <div className="bg-white shadow-sm p-6 rounded-lg border max-w-3xl">
        <form className="space-y-5">

          {/* Product Name */}
          <div>
            <label className="block font-medium mb-1">Product Name</label>
            <input
              type="text"
              className="w-full p-3 border rounded"
              placeholder="Enter product name"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block font-medium mb-1">Price</label>
            <input
              type="number"
              className="w-full p-3 border rounded"
              placeholder="Enter price"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block font-medium mb-1">Category</label>
            <select className="w-full p-3 border rounded">
              <option>Select category</option>
              <option>Mining Machine</option>
              <option>GPU</option>
              <option>Accessories</option>
              <option>Bundle</option>
            </select>
          </div>

          {/* Stock */}
          <div>
            <label className="block font-medium mb-1">Stock</label>
            <input
              type="number"
              className="w-full p-3 border rounded"
              placeholder="Enter quantity"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-medium mb-1">Description</label>
            <textarea
              rows="5"
              className="w-full p-3 border rounded"
              placeholder="Enter product description"
            ></textarea>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block font-medium mb-1">Product Image</label>
            <input type="file" className="w-full p-3 border rounded" />
          </div>

          {/* Submit Button */}
          <div>
            <button className="bg-black text-white px-6 py-3 rounded hover:bg-gray-900 transition">
              Add Product
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddProducts;
