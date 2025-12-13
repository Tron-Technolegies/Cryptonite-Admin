import React, { useState } from "react";
import { toast } from "react-toastify";
import api from "../../api/api";

const AddProduct = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    model_name: "",
    minable_coins: "",
    hashrate: "",
    power: "",
    algorithm: "",
    price: "",
    stock: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!Object.values(formData).every(Boolean) || !image) {
      return toast.error("All fields are required");
    }

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));
    data.append("image", image);

    try {
      setLoading(true);
      await api.post("/products/add/", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Product added successfully");
      onSuccess?.();
    } catch (error) {
      toast.error("Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl border space-y-5">
      <h2 className="text-2xl font-bold">Add Mining Product</h2>

      <input
        name="model_name"
        placeholder="Model Name"
        onChange={handleChange}
        className="w-full p-3 border rounded-lg"
      />

      <input
        name="minable_coins"
        placeholder="Minable Coins (BTC, ETH)"
        onChange={handleChange}
        className="w-full p-3 border rounded-lg"
      />

      <input
        name="hashrate"
        placeholder="Hashrate (e.g. 110 TH/s)"
        onChange={handleChange}
        className="w-full p-3 border rounded-lg"
      />

      <input
        name="power"
        placeholder="Power Consumption (W)"
        onChange={handleChange}
        className="w-full p-3 border rounded-lg"
      />

      <input
        name="algorithm"
        placeholder="Algorithm (SHA-256)"
        onChange={handleChange}
        className="w-full p-3 border rounded-lg"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          name="price"
          type="number"
          placeholder="Price (₹)"
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
        />
        <input
          name="stock"
          type="number"
          placeholder="Stock"
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
        />
      </div>

      {/* Image Upload */}
      <input type="file" onChange={handleImage} />

      {/* Preview */}
      {preview && (
        <img src={preview} alt="Preview" className="h-32 w-32 object-cover rounded border" />
      )}

      <button
        disabled={loading}
        className="px-6 py-3 text-black rounded-lg"
        style={{ backgroundColor: "var(--primary-color)" }}
      >
        {loading ? "Saving..." : "Save Product"}
      </button>
    </form>
  );
};

export default AddProduct;
