import mongoose from "mongoose";

const connectDB=async()=>{
  try{
    await mongoose.connect(process.env.DBURL);
    console.log("Database is connecting successfully")
  }catch(error){
    console.error("Database is not connected")
  }
}


export default connectDB;