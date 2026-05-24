import { useState,useEffect } from "react";
import api from "../api/axios.js";
import {useParams} from "react-router";

export default function productDetail(){
  const{id}= useParams();
  const[product,setProduct]= useState(null);

  const loadProducts=async()=>{
    const res= await api.get("/admin/get");
    console.log("Data fetch ho gya hai")
    const p= res.data.products.find((item)=>item._id===id)
    setProduct(p);
  }

  useEffect(()=>{
    loadProducts();
  },[]);

  if(!product){
    return <div>loading....</div>
  }

  return(
    <div className="p-6 max-w-3xl mx-auto">
      <img 
      src={product.image} 
      alt={product.name}
      className="w-full h-40 object-contain bg-white rounded"  
      />
      <h1 className="text-2xl font-bold mt-4">{product.name}</h1>
      <p className="text-gray-700 mt-2">{product.description}</p>
      <p className="text-xl font-semibold mt-4">${product.price}</p>

          <button
        
        className="mt-6 w-full md:w-1/2 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
      >
        Add to Cart
      </button>
      
    </div>
  )
}
