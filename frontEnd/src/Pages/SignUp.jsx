import { useState } from "react"
import api from "../api/axios.js"

function SignUp() {
  const [form, setForm]= useState({
    name:"",
    email:"",
    password:""

  })

  const [msg, setmsg]= useState("")

  const handleChange=(e)=>{
    setForm({
      ...form,
      [e.target.name]:e.target.value
    });
  }


  const handleSubmit= async(e)=>{
    console.log("Frontend se data ja raha hai: ", form);
    e.preventDefault();

    try{
      const response=await api.post("/auth/signUp",form);
      setmsg(response.data.message);
    } catch(err){
      setmsg(err.response?.data?.message || "An error occurred" );
    }
  }


  return(
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="mb-4 text-center text-lg text-blue-600 font-medium">Create Account</h2>
        { msg&&(
          <div className="mb-4 text-center text-sm text-blue-600 font-medium">{msg}</div>
        )}

        {/* Creating form */}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name='name'
            placeholder="Enter Name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            name='email'
            type="email"
            placeholder="Enter Email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            name='password'
            type="password"
            placeholder="Enter Password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors  cursor-pointer"
          >
            Sign Up
          </button>
        </form>

      </div>
    </div>
  )
}

export default SignUp
