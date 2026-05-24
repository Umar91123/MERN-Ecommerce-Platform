import { useState } from "react";
import api from "../api/axios.js";
import { Navigate, useNavigate } from "react-router";

export default function AddProduct() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "",
    image: "",
    price: "",
    stock: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/admin/create",form)
      alert("Product Added Successfully")
      navigate("/admin/productsList")
      
    } catch (error) {
      console.error("System Error",error)
    }
  };

  return (
    <div className="max-w-lg max-auto mt-10 bg-white p-6 shadow-rounded">
      <h2 className="text-2xl font-bold mb-6">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        {Object.keys(form).map((key) => (
          <input
            key={key}
            name={key}
            value={form[key]}
            onChange={handleChange}
            placeholder={key}
            className="w-full p-2 border border-gray-300 rounded"
          />
        ))}
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 mt-5 cursor-pointer">
                    Add Product
                </button>
      </form>
      
    </div>
  );
}
