import express from "express";
// import products from '../data/products.js';
import { getProducts, getProductByID } from "../controllers/productController.js";

const router = express.Router();

router.route('/').get(getProducts);

router.route('/:id').get(getProductByID )
export default router;
