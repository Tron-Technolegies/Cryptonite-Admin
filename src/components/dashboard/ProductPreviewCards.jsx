import React, { useEffect, useState } from "react";
import api from "../../api/api";
import { Link } from "react-router-dom";
const ProductPreviewCards = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("products/");
        setProducts(res.data.slice(0, 3));
      } catch (err) {
        console.error("Failed to fetch products");
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="bg-gray-50 rounded-xl shadow-md p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold"> Products</h3>
        <Link to="/products">
          <span className="text-sm text-gray-500">Show all</span>
        </Link>
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="border-green-400 border rounded-xl overflow-hidden hover:shadow-lg transition"
          >
            {/* IMAGE */}
            <div className="h-40 bg-gray-100 flex items-center justify-center">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.model_name}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "https://via.placeholder.com/300x200?text=No+Image";
                  }}
                />
              ) : (
                <span className="text-gray-400 text-sm">No Image</span>
              )}
            </div>

            {/* INFO */}
            <div className="p-4">
              <h4 className="font-semibold text-lg truncate">{product.model_name}</h4>
              <p className="text-gray-600 mt-1">₹{product.price || "—"}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPreviewCards;
