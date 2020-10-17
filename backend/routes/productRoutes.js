const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');//sirve para manejo de errores
const PREFIX_FOR_LOGGING = "[Backend]";

const Product = require('../models/productModel');

//@desc Fetch all products in database
//@route /api/products
//@access Public
router.get("/", asyncHandler(async (req,res) => {
    const products = await Product.find({});
    console.log(PREFIX_FOR_LOGGING, "products", products);
    //throw new Error("Guarda que se cayó todo")
    res.status(200).json(products);
}));

//@desc Fetch a product by id
//@route /api/products/:id
//@access Public
router.get("/:id", asyncHandler(async (req,res) => {
    const product = await Product.findById(req.params.id);
    if(product)
    res.status(200).json(product);
    else
    res.status(404).json({message: "Product not found."});
}));

module.exports = router;