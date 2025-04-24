import express from 'express'
import { verifyUser } from '../middlewares/verifyUser.js'
import { createPayment, updatePayment } from "../controllers/paymentController.js";


const router = express.Router()

router.post('/payment-details', verifyUser, createPayment)
router.put('/update/payment-details', verifyUser, updatePayment)

export { router }