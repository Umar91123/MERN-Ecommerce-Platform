import { useEffect, useState } from "react";
import api from "../api/axios.js";
import { Link } from "react-router";


export default function productList() {
  const [products, setProducts] = useState([]);

  const loadProducts= async()=>{
    const response= await api.get("/admin/get")
    setProducts(response.data.products)
  }

  const deletedProduct= async(_id)=>{
    try {
      await api.delete(`/admin/delete/${_id}`);
      alert("Product Deleted Successfully");
      loadProducts();
      
    } catch (error) {
      console.error("Server Error:",error)
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Product List</h2>
        <Link
          to="/admin/AddProduct"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {" "}
          Add New Product
        </Link>
      </div>
      <table className="w-full table-auto border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-300 ...">Title</th>
            <th className="border border-gray-300 ...">Price</th>
            <th className="border border-gray-300 ...">Stock</th>
            <th className="border border-gray-300 ...">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id} className="text-center">


              <td className="border border-gray-200 px-4 px-2">
                {product.name}
              </td>


              <td className="border border-gray-200 px-4 px-2">
                {product.price}
              </td>


              <td className="border border-gray-200 px-4 px-2">
                {product.stock}
              </td>



              <td className="border border-gray-200 px-4 px-2">
                <Link
                  to={`/admin/editProduct/${product._id}`}
                  className="text-blue-500 hover:underline mr-4"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deletedProduct(product._id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
