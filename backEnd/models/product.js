import mongoose from 'mongoose'

const productSchema= new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  description:{
    type:String
  },
  category:{
    type:String
  },
  image:{
    type:String,
    
  },
  price:{
    type:Number,
    required:true
  },
  stock:{
    type:Number,
    default:0
  }
},{
  timestamps:true
})

export default mongoose.model ("product", productSchema)