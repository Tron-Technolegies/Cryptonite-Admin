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
        setPreview(editData.image); // Cloudinary URL
      }
    }
  }, [editData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImage = (e) => {
    const file = e.target.files?.[0];
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
      if (!formData[field]?.trim()) {
        toast.error("Please fill all required fields");
        return;
      }
    }

    const data = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (value !== "" && value !== null) {
        data.append(key, value);
      }
    });

    if (image) {
      data.append("image", image);
    }

    try {
      setLoading(true);

      const url = isEdit ? `/products/${editData.id}/update/` : `/products/add/`;

      const method = isEdit ? "patch" : "post";

      await api({
        method,
        url,
        data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      });

      toast.success(isEdit ? "Product updated successfully" : "Product added successfully");

      onSuccess?.();
    } catch (error) {
      console.error(error);
      toast.error("Failed to save product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-100 p-6 rounded-xl space-y-6">
      {/* HEADER */}
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

      {/* MODEL NAME */}
      <input
        name="model_name"
        value={formData.model_name}
        onChange={handleChange}
        placeholder="Model Name *"
        className="w-full p-3 bg-white border border-[#56d083] rounded-lg"
      />

      {/* DESCRIPTION */}
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description *"
        className="w-full p-3 bg-white border border-[#56d083] rounded-lg"
      />

      {/* TWO COLUMN */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          name="minable_coins"
          value={formData.minable_coins}
          onChange={handleChange}
          placeholder="Minable Coins *"
          className="p-3 bg-white border border-[#56d083] rounded-lg"
        />

        <input
          name="algorithm"
          value={formData.algorithm}
          onChange={handleChange}
          placeholder="Algorithm *"
          className="p-3 bg-white border border-[#56d083] rounded-lg"
        />

        <input
          name="hashrate"
          value={formData.hashrate}
          onChange={handleChange}
          placeholder="Hashrate (TH/s) *"
          className="p-3 bg-white border border-[#56d083] rounded-lg"
        />

        <input
          name="power"
          value={formData.power}
          onChange={handleChange}
          placeholder="Power (W) *"
          className="p-3 bg-white border border-[#56d083] rounded-lg"
        />
      </div>

      {/* OPTIONAL DETAILS */}
      <textarea
        name="product_details"
        value={formData.product_details}
        onChange={handleChange}
        placeholder="Product Details (optional)"
        className="w-full p-3 bg-white border border-[#56d083] rounded-lg"
      />

      {/* PRICE */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          className="p-3 bg-white border border-[#56d083] rounded-lg"
        />

        <input
          type="number"
          name="hosting_fee_per_kw"
          value={formData.hosting_fee_per_kw}
          onChange={handleChange}
          placeholder="Hosting Fee / kW"
          className="p-3 bg-white border border-[#56d083] rounded-lg"
        />
      </div>

      {/* IMAGE */}
      <label className="inline-flex items-center gap-6 cursor-pointer">
        <div className="px-4 py-2 bg-white border border-[#56d083] rounded-lg text-sm font-medium">
          Upload Image
        </div>
        <input type="file" accept="image/*" onChange={handleImage} hidden />
      </label>

      {preview && (
        <img src={preview} alt="Preview" className="h-32 w-32 object-cover rounded-lg border" />
      )}

      <button
        type="submit"
        disabled={loading}
        className="px-6 py-3 text-white rounded-lg"
        style={{ backgroundColor: "var(--primary-color)" }}
      >
        {loading ? "Saving..." : isEdit ? "Update Product" : "Save Product"}
      </button>
    </form>
  );
};

export default AddProduct;
