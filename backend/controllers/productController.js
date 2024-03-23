import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';


// @desc    Fetches all products
// @route   GET /api/products
//@access   Public 
const getProducts = asyncHandler(async(req, res)=>{
    const products = await Product.find({});
    res.json(products);
});

// @desc    Fetches a products
// @route   GET /api/products/:id
//@access   Public 
const getProductByID = asyncHandler( async(req,res)=>{
    const product = await Product.findById(req.params.id);
    // const product = products.find((p)=>p._id===req.params.id)

    if (product) {
      return res.json(product);
    }else{
      res.staus(404);
      throw new Error('Product Not Found')
    }
})

export {getProducts, getProductByID}