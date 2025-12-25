import React, { useEffect, useState } from "react";
import api from "../../api/api";
import { Link } from "react-router-dom";

const BundlePreviewCards = () => {
  const [bundles, setBundles] = useState([]);

  useEffect(() => {
    api.get("bundles/").then((res) => setBundles(res.data.slice(0, 3)));
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-base font-semibold">Bundles</h3>
        <Link to="/bundles" className="text-xs text-gray-500 hover:text-green-600">
          View all
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {bundles.map((b) => (
          <div
            key={b.id}
            className="rounded-lg p-3flex gap-3 items-center border border-gray-200 hover:bg-green-50 transition"
          >
            <div>
              {" "}
              <img
                src={b.image}
                alt={b.name}
                className="h-14 w-full object-cover rounded-md mb-2"
              />
            </div>
            <div>
              <p className="text-sm font-medium truncate">{b.name}</p>
              <p className="text-xs text-gray-600">{b.items?.length || 0} items</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BundlePreviewCards;
