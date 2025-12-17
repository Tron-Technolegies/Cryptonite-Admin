import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/api";
import AddProduct from "./AddProducts";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    api.get(`/products/${id}/`).then((res) => setProduct(res.data));
  }, [id]);

  if (!product) return null;

  return <AddProduct editData={product} onSuccess={() => navigate("/products")} />;
}
