import mongoose from 'mongoose';

const {ObjectId}= mongoose.Schema.Types;

const cartSchema= new mongoose.Schema({
  userId:{
    type:ObjectId,
    ref:"user",
    require:true
  },

  items:[{
    productId:{
      type:ObjectId,
      ref:"product",
      require:true
    },
    quantity:{
      type:Number,
      default:1
    }
  }]
})

export default mongoose.model('Cart', cartSchema)