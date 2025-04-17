import { Router } from "express";
import { placeOrder } from "../controllers/orderController.js";
import { verifyUser } from "../middlewares/verifyUser.js";

const router = Router()

router.post('/checkout', verifyUser, placeOrder)

export { router }