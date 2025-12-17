import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";

const inputStyle = "p-3 bg-white border border-[#56d083] rounded-lg w-full";

const AddProduct = ({ onSuccess, onClose, editData }) => {
  const isEdit = Boolean(editData);

  const [formData, setFormData] = useState({
    model_name: "",
    description: "",
    minable_coins: "",
    hashrate: "",
    power: "",
    algorithm: "",
    price: "",
    hosting_fee_per_kw: "",
    category: "air",
    brand: "",
    efficiency: "",
    noise: "",
    delivery_type: "spot",
    delivery_date: "",
    is_available: true,
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  /* ================= EDIT PREFILL ================= */
  useEffect(() => {
    if (editData) {
      setFormData({
        ...formData,
        ...editData,
        delivery_date: editData.delivery_date || "",
      });
      if (editData.image) setPreview(editData.image);
    }
  }, [editData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const required = [
      "model_name",
      "description",
      "minable_coins",
      "hashrate",
      "power",
      "algorithm",
    ];
    for (let f of required) {
      if (!formData[f]) {
        toast.error("Please fill all required fields");
        return;
      }
    }

    const data = new FormData();
    Object.entries(formData).forEach(([k, v]) => {
      if (v !== "" && v !== null) data.append(k, v);
    });
    if (image) data.append("image", image);

    try {
      setLoading(true);
      await api({
        method: isEdit ? "patch" : "post",
        url: isEdit ? `/products/${editData.id}/update/` : `/products/add/`,
        data,
        headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
      });
      toast.success(isEdit ? "Product updated successfully" : "Product added successfully");

      navigate("/products");
    } catch {
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

        <button
          type="button"
          onClick={() => navigate(-1)}
          className="px-4 py-2 text-white rounded-lg"
          style={{ backgroundColor: "var(--primary-color)" }}
        >
          ← Back
        </button>
      </div>

      {/* BASIC */}
      <input
        className={inputStyle}
        name="model_name"
        value={formData.model_name}
        onChange={handleChange}
        placeholder="Model Name *"
      />
      <textarea
        className={inputStyle}
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description *"
      />

      {/* MINING */}
      <div className="grid md:grid-cols-2 gap-4">
        <input
          className={inputStyle}
          name="minable_coins"
          value={formData.minable_coins}
          onChange={handleChange}
          placeholder="Minable Coins *"
        />
        <input
          className={inputStyle}
          name="algorithm"
          value={formData.algorithm}
          onChange={handleChange}
          placeholder="Algorithm *"
        />
        <input
          className={inputStyle}
          name="hashrate"
          value={formData.hashrate}
          onChange={handleChange}
          placeholder="Hashrate *"
        />
        <input
          className={inputStyle}
          name="power"
          value={formData.power}
          onChange={handleChange}
          placeholder="Power *"
        />
      </div>

      {/* PRICING */}
      <div className="grid md:grid-cols-2 gap-4">
        <input
          type="number"
          className={inputStyle}
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
        />
        <input
          type="number"
          className={inputStyle}
          name="hosting_fee_per_kw"
          value={formData.hosting_fee_per_kw}
          onChange={handleChange}
          placeholder="Hosting Fee / kW"
        />
      </div>

      {/* CATEGORY / DELIVERY */}
      <div className="grid md:grid-cols-2 gap-4">
        <select
          className={inputStyle}
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="air">Air</option>
          <option value="immersion">Immersion</option>
          <option value="hydro">Hydro</option>
          <option value="home">Home</option>
        </select>

        <select
          className={inputStyle}
          name="delivery_type"
          value={formData.delivery_type}
          onChange={handleChange}
        >
          <option value="spot">Spot</option>
          <option value="future">Future</option>
        </select>
      </div>

      {formData.delivery_type === "future" && (
        <input
          type="date"
          className={inputStyle}
          name="delivery_date"
          value={formData.delivery_date}
          onChange={handleChange}
        />
      )}

      {/* TECH */}
      <div className="grid md:grid-cols-2 gap-4">
        <input
          className={inputStyle}
          name="brand"
          value={formData.brand}
          onChange={handleChange}
          placeholder="Brand"
        />
        <input
          className={inputStyle}
          name="efficiency"
          value={formData.efficiency}
          onChange={handleChange}
          placeholder="Efficiency"
        />
        <input
          className={inputStyle}
          name="noise"
          value={formData.noise}
          onChange={handleChange}
          placeholder="Noise"
        />
      </div>

      {/* AVAILABILITY */}
      <label className="flex items-center gap-3 text-sm">
        <input
          type="checkbox"
          name="is_available"
          checked={formData.is_available}
          onChange={handleChange}
        />
        Available
      </label>

      {/* IMAGE */}
      <div className="space-y-4">
        <label className="inline-block px-4 py-2 bg-white border border-[#56d083] rounded-lg cursor-pointer">
          Upload Image
          <input type="file" hidden accept="image/*" onChange={handleImage} />
        </label>

        {preview && (
          <img
            src={preview}
            className="h-32 w-32 object-cover rounded-lg border border-[#56d083]"
          />
        )}
      </div>

      {/* SAVE */}
      <div className="pt-6">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 text-white rounded-lg"
          style={{ backgroundColor: "var(--primary-color)" }}
        >
          {loading ? "Saving..." : isEdit ? "Update Product" : "Save Product"}
        </button>
      </div>
    </form>
  );
};

export default AddProduct;
