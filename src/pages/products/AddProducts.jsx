import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../api/api";

const AddProduct = ({ onSuccess, onClose, editData }) => {
  const isEdit = Boolean(editData);

  const [formData, setFormData] = useState({
    model_name: "",
    description: "",
    product_details: "",
    minable_coins: "",
    hashrate: "",
    power: "",
    algorithm: "",
    price: "",
    hosting_fee_per_kw: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ Prefill data on edit
  useEffect(() => {
    if (editData) {
      setFormData({
        model_name: editData.model_name || "",
        description: editData.description || "",
        product_details: editData.product_details || "",
        minable_coins: editData.minable_coins || "",
        hashrate: editData.hashrate || "",
        power: editData.power || "",
        algorithm: editData.algorithm || "",
        price: editData.price || "",
        hosting_fee_per_kw: editData.hosting_fee_per_kw || "",
      });

      if (editData.image) {
        setPreview(editData.image);
      }
    }
  }, [editData]);

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

    const requiredFields = [
      "model_name",
      "description",
      "minable_coins",
      "hashrate",
      "power",
      "algorithm",
    ];

    for (let field of requiredFields) {
      if (!formData[field]) {
        return toast.error("Please fill all required fields");
      }
    }

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== "") data.append(key, value);
    });

    if (image) data.append("image", image);

    try {
      setLoading(true);

      const url = isEdit ? `/products/${editData.id}/update/` : "/products/add/";

      const method = isEdit ? "patch" : "post";

      await api({
        method,
        url,
        data,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      });

      toast.success(isEdit ? "Product updated successfully" : "Product added successfully");
      onSuccess?.();
    } catch (error) {
      toast.error("Failed to save product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl border space-y-5">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">
          {isEdit ? "Edit Mining Product" : "Add Mining Product"}
        </h2>
        {onClose && (
          <button type="button" onClick={onClose} className="text-gray-500">
            ✕
          </button>
        )}
      </div>

      {/* REQUIRED */}
      <input
        name="model_name"
        value={formData.model_name}
        onChange={handleChange}
        placeholder="Model Name *"
        className="w-full p-3 border rounded-lg"
      />

      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description *"
        className="w-full p-3 border rounded-lg"
      />

      <input
        name="minable_coins"
        value={formData.minable_coins}
        onChange={handleChange}
        placeholder="Minable Coins (BTC, BCH) *"
        className="w-full p-3 border rounded-lg"
      />

      <input
        name="hashrate"
        value={formData.hashrate}
        onChange={handleChange}
        placeholder="Hashrate (e.g. 110 TH/s) *"
        className="w-full p-3 border rounded-lg"
      />

      <input
        name="power"
        value={formData.power}
        onChange={handleChange}
        placeholder="Power Consumption (W) *"
        className="w-full p-3 border rounded-lg"
      />

      <input
        name="algorithm"
        value={formData.algorithm}
        onChange={handleChange}
        placeholder="Algorithm (SHA-256) *"
        className="w-full p-3 border rounded-lg"
      />

      {/* OPTIONAL */}
      <textarea
        name="product_details"
        value={formData.product_details}
        onChange={handleChange}
        placeholder="Product Details (optional)"
        className="w-full p-3 border rounded-lg"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price (optional)"
          className="w-full p-3 border rounded-lg"
        />

        <input
          name="hosting_fee_per_kw"
          type="number"
          value={formData.hosting_fee_per_kw}
          onChange={handleChange}
          placeholder="Hosting Fee per kW (optional)"
          className="w-full p-3 border rounded-lg"
        />
      </div>

      {/* IMAGE */}
      <input type="file" accept="image/*" onChange={handleImage} />

      {preview && (
        <img src={preview} alt="Preview" className="h-32 w-32 object-cover rounded border" />
      )}

      <button
        disabled={loading}
        className="px-6 py-3 text-black rounded-lg"
        style={{ backgroundColor: "var(--primary-color)" }}
      >
        {loading ? "Saving..." : isEdit ? "Update Product" : "Save Product"}
      </button>
    </form>
  );
};

export default AddProduct;
