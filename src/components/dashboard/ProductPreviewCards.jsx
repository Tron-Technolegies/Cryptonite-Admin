import React, { useEffect, useState } from "react";
import api from "../../api/api";
import { Link } from "react-router-dom";

const ProductPreviewCards = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get("products/").then((res) => setProducts(res.data.slice(0, 4)));
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-base font-semibold">Products</h3>
        <Link to="/products" className="text-xs text-gray-500 hover:text-green-600">
          View all
        </Link>
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {products.map((p) => (
          <Link
            key={p.id}
            to={`/products-edit/${p.id}`}
            className="rounded-lg p-3 flex gap-3 items-center border border-gray-200 hover:bg-green-50 transition"
          >
            <div>
              {/* SMALL IMAGE */}
              <img
                src={p.image || "https://via.placeholder.com/150"}
                alt={p.model_name}
                className="h-14 w-full object-cover rounded-md mb-2"
              />
            </div>
            <div className="">
              <p className="text-sm font-medium truncate">{p.model_name}</p>
              <p className="text-xs text-gray-600">${p.price || "—"}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductPreviewCards;
