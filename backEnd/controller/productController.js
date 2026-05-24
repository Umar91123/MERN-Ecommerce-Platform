
import product from "../models/product.js"


//Create Product
export const createProduct= async(req,res)=>{
  try {
    const newProduct= await product.create(req.body);
    res.json({
      message:"Product Created Successfully",newProduct
    })
  } catch (error) {
    res.status(500).json({message:"Server Error", error:error.message})
  }
}

//Show All Products

export const getProducts= async (req,res)=>{

  try {

      const {search, category}= req.query;
    let filter={};

    if(search){
      filter.name={$regex:search, $options:'i'}
    }
    if (category){
      filter.category=category;
    }
    
    const products= await product.find(filter).sort({createdAt:-1})
    res.json({
      message:"Product Find Successfully", products
    })
    
  } catch (error) {
    res.status(500).json({message:"Server Error", error:error.message})
  }
}

//Update Product

export const updateProduct= async(req,res)=>{
  try {
    const update= await product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {new:true}
    );
    res.json({message:"Product Updated Successfully",update})
    
  } catch (error) {
    res.status(500).json({message:"Server Error",error:error.message})
  }
}

//Delete Product

export const deleteProduct= async(req,res)=>{
  try {
    const deleteProduct= await product.findByIdAndDelete(
      req.param.id
    );
    res.json({message:"Product Deleted Successfully",deleteProduct})
  } catch (error) {
    res.status(500).json({message:"Server Error", error:error.message})
  }
}