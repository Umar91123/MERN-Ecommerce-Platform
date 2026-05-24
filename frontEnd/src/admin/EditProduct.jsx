import { useEffect,useState } from "react";
import api from "../api/axios.js";
import {useNavigate, useParams} from "react-router";

export default function EditProduct(){
  const {id}= useParams();
  const navigation= useNavigate();
  const [form,setForm]=useState({
    name:"",
    description:"",
    category:"",
    image:"",
    price:"",
    stock:""
  })

  const allowFields=["name","description","category","image","price","stock"]

  const loadProducts=async()=>{
    const res= await api.get("/admin/get");
    console.log("Backend se ye aaya hai:", res.data);
    const product=res.data.products.find((p)=>p._id===id);
    setForm(product)
  }

  useEffect(()=>{
    loadProducts();
  },[])

const handleChange=(e)=>{
  setForm({
    ...form,
    [e.target.name]:e.target.value
  })
}

const handleSubmit=async(e)=>{
  e.preventDefault();
  await api.put(`/admin/update/${id}`,form)
  alert("Product Updated Successfully")
  navigation("/admin/productsList")
}

return(
  <div className="max-w-lg mx-auto mt-10 bg-white p-6 shadow rounded">
    <h2 className="text-xl font-bold mb-4">Edit Product</h2>
    <form className="space-y-3" onSubmit={handleSubmit}>
        {allowFields.map((key) => (
          <input
            key={key}
            name={key}
            value={form[key]}
            onChange={handleChange}
            placeholder={key}
            className="w-full border px-3 py-2 rounded"
          />
        ))}

        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition cursor-pointer">
          Update Product
        </button>
      </form>
  </div>
  
)
}