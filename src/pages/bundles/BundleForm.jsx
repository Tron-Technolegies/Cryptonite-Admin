import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../api/api";
import { FiPlus, FiX } from "react-icons/fi";

const BundleForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    products: [],
    hosting_fee_per_kw: "",
    total_hashrate: "",
    total_power: "",
    image: null,
  });

  const [allProducts, setAllProducts] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);

  // ===== FETCH PRODUCTS =====
  useEffect(() => {
    api.get("products/").then((res) => setAllProducts(res.data));
  }, []);

  // ===== FETCH BUNDLE (EDIT) =====
  useEffect(() => {
    if (!id) return;
    api.get(`bundles/${id}/`).then((res) => {
      setFormData({
        ...res.data,
        products: res.data.products,
        image: null,
      });
      setImagePreview(res.data.image);
    });
  }, [id]);

  // ===== INPUT CHANGE =====
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      setFormData((p) => ({ ...p, image: files[0] }));
      setImagePreview(URL.createObjectURL(files[0]));
    } else {
      setFormData((p) => ({ ...p, [name]: value }));
    }
  };

  // ===== PRODUCT ADD / REMOVE =====
  const addProduct = (id) => {
    if (!formData.products.includes(id)) {
      setFormData((p) => ({ ...p, products: [...p.products, id] }));
    }
  };

  const removeProduct = (id) => {
    setFormData((p) => ({
      ...p,
      products: p.products.filter((pid) => pid !== id),
    }));
  };

  // ===== SUBMIT =====
  const handleSubmit = async () => {
    const data = new FormData();

    Object.entries(formData).forEach(([key, val]) => {
      if (Array.isArray(val)) val.forEach((v) => data.append(key, v));
      else if (val !== null && val !== "") data.append(key, val);
    });

    try {
      if (isEdit) {
        await api.put(`bundles/${id}/update/`, data);
        toast.success("Bundle updated successfully");
      } else {
        await api.post("bundles/add/", data);
        toast.success("Bundle created successfully");
      }
      navigate("/bundles");
    } catch {
      toast.error("Failed to save bundle");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-bold">
            {isEdit ? "Edit Bundle Offer" : "Create Bundle Offer"}
          </h1>
          <p className="text-gray-600">Manage bundle products and pricing</p>
        </div>

        {/* FORM */}
        <div className="bg-white rounded-xl shadow-sm p-8 space-y-8">
          {/* BASIC INFO */}
          <div className="grid md:grid-cols-2 gap-6">
            <Input label="Bundle Name" name="name" value={formData.name} onChange={handleChange} />
            <Input
              label="Bundle Price (₹)"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
            />
            <Input
              label="Hosting Fee per kW (₹)"
              name="hosting_fee_per_kw"
              value={formData.hosting_fee_per_kw}
              onChange={handleChange}
            />
            <Input
              label="Total Hashrate"
              name="total_hashrate"
              value={formData.total_hashrate}
              onChange={handleChange}
            />
            <Input
              label="Total Power"
              name="total_power"
              value={formData.total_power}
              onChange={handleChange}
            />
          </div>

          {/* DESCRIPTION */}
          <Textarea
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />

          {/* PRODUCT SELECT */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* AVAILABLE */}
            <div>
              <h3 className="font-semibold mb-2">Available Products</h3>
              <div className="border rounded-lg divide-y max-h-64 overflow-y-auto">
                {allProducts.map((p) => (
                  <div key={p.id} className="flex justify-between items-center p-3">
                    <span>{p.model_name}</span>
                    <button
                      onClick={() => addProduct(p.id)}
                      className="text-green-600 hover:bg-green-50 p-1 rounded"
                    >
                      <FiPlus />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* SELECTED */}
            <div>
              <h3 className="font-semibold mb-2">Selected Products</h3>
              <div className="border rounded-lg p-3 flex flex-wrap gap-2 min-h-[80px]">
                {formData.products.length === 0 && (
                  <p className="text-sm text-gray-400">No products selected</p>
                )}
                {formData.products.map((pid) => {
                  const prod = allProducts.find((p) => p.id === pid);
                  return (
                    <span
                      key={pid}
                      className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full text-sm"
                    >
                      {prod?.model_name}
                      <FiX
                        className="cursor-pointer text-red-500"
                        onClick={() => removeProduct(pid)}
                      />
                    </span>
                  );
                })}
              </div>
            </div>
          </div>

          {/* IMAGE */}
          <div>
            <label className="font-medium">Bundle Image</label>
            <input type="file" name="image" onChange={handleChange} className="mt-2" />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="preview"
                className="mt-4 h-40 rounded-lg border object-cover"
              />
            )}
          </div>

          {/* ACTIONS */}
          <div className="flex gap-4">
            <button
              onClick={handleSubmit}
              className="px-8 py-3 rounded-lg text-white font-medium"
              style={{ backgroundColor: "var(--primary-color)" }}
            >
              {isEdit ? "Update Bundle" : "Create Bundle"}
            </button>
            <button onClick={() => navigate("/bundles")} className="px-8 py-3 rounded-lg border">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ===== REUSABLE INPUTS ===== */
const Input = ({ label, ...props }) => (
  <div className="space-y-2">
    <label className="text-sm font-medium text-gray-700">{label}</label>
    <input
      {...props}
      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
    />
  </div>
);

const Textarea = ({ label, ...props }) => (
  <div className="space-y-2">
    <label className="text-sm font-medium text-gray-700">{label}</label>
    <textarea
      {...props}
      rows="4"
      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
    />
  </div>
);

export default BundleForm;
