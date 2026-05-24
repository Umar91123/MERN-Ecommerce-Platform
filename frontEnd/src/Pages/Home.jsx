import { useState, useEffect } from "react";
import api from "../api/axios.js"
import { Link } from "react-router";
import { use } from "react";

export default function Home(){
  const[products,setProducts]=useState([]);
  const[search,setSearch]=useState("");
  const [category,setCategory]=useState("");

  // load product k chalne se sari products show jo jayen ge 
 const loadProducts=async()=>{
  try {
    const response= await api.get(`/admin/get/?search=${search}&category=${category}`);
    
    setProducts(response.data.products)
  } catch (error) {
    console.log("Unable to Search Product")
  }

 }

 useEffect(()=>{
  loadProducts()
 },[search,category]);

 const addToCart= async(productId)=>{
  const userId= localStorage.getItem("userId");
  if(!userId){
    alert("Plz Login To Your Account")
    return;
  }
    try {
      const res = await api.post(`/cart/add`, { userId, productId });

      // Sir ka original logic yahan bilkul theek chalega
    const cartItems = res.data?.cart?.items || [];
      
      const total = cartItems.reduce(
        (sum, item) => sum + item.quantity,
        0
      );

      localStorage.setItem("cartCount", total);
      window.dispatchEvent(new Event("cartUpdated"));
      
    } catch (error) {
      console.log("Error adding to cart", error);
    }
  };

 

 return(
  <div className="p-6">
    {/* search  */}
    <div className="mb-4 flex gap-4">
      <input type="text" 
      type="text"
      placeholder="Search Product"
      value={search}
      onChange={(e)=>setSearch(e.target.value)}
      className="border border-gray-300  flex-1 md:w-1/4 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-700"

      />

      {/* category  */}

      <select 
      value={category}
      onChange={(e)=>setCategory(e.target.value)}
      className="w-full md:w-1/4 border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" >
        <option value="">All Categories</option>
        <option value="Laptop">Laptop</option>
        <option value="mobile">Mobile</option>
        <option value="Tablet">Tablet</option>
      </select>
    </div>

    {/* product Grid  */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
      {products.map((product)=>(
        <div key={product._id} className="border p-3 rounded shadow hover:shadow-lg transition">
        <Link to={`/ProductDetail/${product._id}`}>
        <img src={product.image}
        alt={product.name}
        className="w-full h-40 object-contain bg-white rounded" />
        <h2 className="mt-2 font-semibold text-lg">{product.name}</h2>

        </Link>

          <div className="mt-2 flex items-center justify-between">
              <p className="text-gray-700 font-semibold">${product.price}</p>

              <button
                onClick={() => addToCart(product._id)}
                className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition cursor-pointer "
              >
                Add to Cart
              </button>
            </div>
          
        </div>

      ))}
    

    </div>
  </div>


 )
}