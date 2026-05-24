import express from "express";

import { addToCart,removeFromCart,updateQuantity,getCart } from "../controller/cartController.js";

const router= express.Router();

// for add to cart 
router.post("/add",addToCart)

// for remove from cart 

router.post("/remove",removeFromCart)

//for Update quantity

router.post("/update", updateQuantity)

//for get cart

router.get("/:userId",getCart)

export default router;

