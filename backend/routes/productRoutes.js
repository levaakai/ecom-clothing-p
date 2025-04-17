import express from 'express'
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  removeProduct,
} from "../controllers/productController.js";

import { verifyAdmin } from '../middlewares/verifyAdmin.js';

const router = express.Router()

// GET routes
router.get('/view/products', getProducts)
router.get('/view/product/:id', getProduct)

/** */

// POST routes
router.post('/create/product', verifyAdmin, createProduct)

// PUT routes
router.put('/view/product/:id', verifyAdmin, updateProduct)

// DELETE routes
router.delete('/remove/product/:id', verifyAdmin, removeProduct)

export { router }