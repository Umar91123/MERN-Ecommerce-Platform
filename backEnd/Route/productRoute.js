import express from "express"
import {createProduct,getProducts,updateProduct,deleteProduct} from "../controller/productController.js"

const router= express.Router();

// router for create

router.post("/create",createProduct);

//router for findProduct

router.get("/get", getProducts);

//router for updateProduct

router.put("/update", updateProduct);

//router for deleteProduct

router.delete("/delete",deleteProduct)

export default router;
