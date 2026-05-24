import Cart from "../models/Cart.js";


// add to cart 
export const addToCart= async(req,res)=>{
  try {
    const {userId, productId}= req.body;
    let cart= await Cart.findOne({userId});

    if(!cart){
       cart= new Cart({userId, items:[{productId,quantity:1}]})
    }else{
      const item= cart.items.find((i)=>i.productId.toString()===productId)

      if(item){
      item.quantity +=1;
    }else{
      cart.items.push({productId, quantity:1})
    }
    }
    

    await cart.save();
    res.json({
      message:"Item added to Cart",
      cart
    })
  } catch (error) {
    res.status(500).json({message:"Server Error",error})
  }
}

// remove from cart 

export const removeFromCart= async(req,res)=>{
  try {
    const{userId,productId}= req.body;
  
  const cart= await Cart.findOne({userId})

  if(!cart){
    return res.status(404).json({message:"Cart Not found"})
  }else{
    cart.items= cart.items.filter((i)=>i.productId.toString()!==productId)
  }
  await cart.save();
  res.json({
    message:"Item Remove  from Cart",
    cart
  })
  } catch (error) {

    console.log("Asli Masla Yeh Hai:", error.message);
     res.status(500).json({ message: "Server Error", error:error.message });
  }

}

//update item quantity in cart

export const updateQuantity= async(req,res)=>{
  try {
    
    const {userId,productId,quantity}= req.body;
    const cart= await Cart.findOne({userId});
     if(!cart){
      return res.status(404).json({message:"Cart not found"})
     }else{
      const item= cart.items.find((i)=>i.productId.toString()===productId)
      if(!item){
      return res.status(404).json({message:"Item Not Found"})
     }else{
      item.quantity=quantity;
     }
     }
     

     await cart.save();

     res.json({
      message:"Cart Save Successfully",
      cart
     })

  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
}

// Get cart by user ID
export const getCart = async (req, res) => {
  try {
    const { userId } = req.params;

    const cart = await Cart.findOne({ userId }).populate("items.productId");

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};