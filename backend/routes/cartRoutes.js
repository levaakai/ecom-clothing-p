import express from 'express'
import { getCart, addToCart, updateCart, removeCart } from "../controllers/cartController.js";
import { verifyUser } from '../middlewares/verifyUser.js';

const router = express.Router()

router.get('/view-cart', verifyUser, getCart)
router.post('/add-cart', verifyUser, addToCart)
router.put('/update-cart', verifyUser, updateCart)
router.delete('/remove-cart', verifyUser, removeCart)

export { router }