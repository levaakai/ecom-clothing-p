/**
 * Flow{
    User checks out
    Frontend: redirects to /payment-details/:orderId
    User selects payment method
    POST to /api/payment with orderId, method, and other optional info
    Backend: stores it in the Payments table
    Optionally update the Orders table with a paymentStatus field like 'pending', 'paid', etc. }
 */

    //Pass orderId, userId, amount, method[cash on delivery, momo],status['pending', 'paid', 'failed'] transactionRef[momo].
//On mobile money, wait for confirmation before setting status to paid

// Create the Order first (no paymentId).
// Create the Payment, which generates a UUID.
// Update the Order with the paymentId after creation.

import { where } from 'sequelize'
import { User, Order, Payment, OrderItem, Product } from '../config/db.js'
import { paymentDetailsMail } from '../utils/mailer.js'
import { requestUserToken } from '../utils/utils.js'

export const createPayment = async (req, res) => {
   try {
     const user = requestUserToken(req, res);
 
     if (!user) {
       return res.status(400).json({ error: "User not found!" });
     }
 
     const { userid } = user;
 
     // Find the user's most recent order
     const order = await Order.findOne({
       where: { userId: userid },
       order: [["createdAt", "DESC"]],
     });
 
     if (!order) {
       return res.status(400).json({ error: "Order not found!" });
     }
 
     if (order.paymentId) {
       return res.status(400).json({ error: "Payment already exists for this order." });
     }
 
     // Create Payment
     const payment = await Payment.create({
       orderId: order.id,
       userId: userid,
       amount: order.totalAmount,
       method: "cash_on_delivery",
       status: "pending",
     });
 
     // Link payment to order
     order.paymentId = payment.id;
     await order.save();
 
     // Get user data
     const fullUser = await User.findOne({ where: { id: userid } });
 
     // Get all order items
     const orderItems = await OrderItem.findAll({ where: { orderId: order.id } });
 
     // Get all products for the items in parallel
     const productPromises = orderItems.map((item) =>
       Product.findOne({ where: { id: item.productId } })
     );
 
     const productResults = await Promise.all(productPromises);
 
     // Merge product info with order items
     const orderedProducts = orderItems.map((item, index) => ({
       name: productResults[index]?.name,
       price: productResults[index]?.price,
       quantity: item.quantity,
       total: item.quantity * productResults[index]?.price,
     }));
 
     // Send the payment details/invoice mail
     await paymentDetailsMail(fullUser, order, payment, orderedProducts);
 
     return res.status(200).json({ message: "Payment initiated", payment, order });
   } catch (error) {
     console.log(error);
     return res.status(500).json({ error: "Something went wrong", error });
   }
 };
 


export const updatePayment = async (req, res) => {
   try {
      const { getPaymentStatus } = req.body

      // get user
      const user = requestUserToken(req, res)

      if ( !user ) {
         return res.status(404).json({error: "User not found"})
      }

      const userId = user.userid

      // get order
      const order = await Order.findOne({ 
         where: { userId },
         order: [['createdAt', 'DESC']]
      })

      if ( !order ) {
         return res.status(404).json({ error: "Order not found!"})
      }

      // get payment 
      const payment = await Payment.findOne({ 
         where: {userId} ,
         orderId: order.id
      })
      
      if ( !payment ) {
         return res.status(404).json({error: "Error: Payment not found"})
      }

      const validStatuses = ['pending', 'paid', 'failed']      // enum-like validation for getPaymentStatus

      if (!validStatuses.includes(getPaymentStatus)) {
         return res.status(400).json({ error: "Invalid payment status" });
      }

      // update payment status 
      payment.status = getPaymentStatus
      await payment.save()

      // update order paymentStatus
      order.paymentStatus = getPaymentStatus
      await order.save()


      res.status(200).json({message:'Payment status updated', payment, order })
   } catch (error) {
      return res.status(500).json({error:"Something went wrong!", error})
   }
}
