import express from 'express'
import cors from 'cors'
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import authRoute from "./Route/authRoute.js"
import productRoute from "./Route/productRoute.js"
import cart from "./Route/cart.js"

dotenv.config();
const app= express();
app.use(cors())

app.use(express.json())
app.use('/api/auth', authRoute);
app.use('/api/admin', productRoute)
app.use('/api/cart',cart)

app.use("/",(req,res)=>{
  res.send("API is running")
})

connectDB();

app.listen(process.env.PORT,()=>{
  console.log("Server is running on the port 5001");
});