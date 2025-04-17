/**
 *Get all cart items for the user — we need to know what they’re buying.
 Create a new Order record — this holds userId, status, total, etc.
 Create OrderItem records for each cart item: So we know: this order contains Product X (qty 2, price $10)
 Freeze the price at the time of checkout — prices can change later, but orders shouldn't.
 Clear the cart once the order is placed.
 Add total amount to the Order, or send a confirmation email, etc. - Optional
 */

import { User, Product, Cart, Order, OrderItem } from '../config/db.js';
import { checkoutConfirmationMail } from '../config/mailer.js';

 import { sendMailjetEmail } from '../config/mailer.js';

 import { requestUserToken } from "../utils/utils.js"

 export const placeOrder = async (req, res) => {
    try {
        const status = 'pending'
        let totalAmount = 0;
        const orderItemsData = [];

            // get user
        const user = requestUserToken(req, res)
        const { userid } = user

        if (!userid) {
            return res.status(400).json({ error: "User needs to be logged in" });
        }

        // get cart items
        const cartItems = await Cart.findAll({
            where: { userid },
        });

        if (cartItems.length === 0){
            return res.status(400).json({message: "Cart is empty!"})
        }

        // Fetch product details and calculate total
        for (const cartItem of cartItems) {
            const { productId, quantity } = cartItem

            const product = await Product.findByPk(productId)

            if ( !product ) {
                return res.status(400).json({error: "Product not found!"})
            }

            const priceAtTime = product.price
            const itemTotal = quantity * priceAtTime
            totalAmount += itemTotal
            
            orderItemsData.push({ productId, quantity,priceAtTime })
        }
        totalAmount = parseFloat(totalAmount.toFixed(2));   // to decimal place
       
        //  Create a new Order record — this holds userId, status, total, etc.
        const newOrder = await Order.create({ userId:userid, totalAmount, status })
        if ( !newOrder ){
            res.status(400).json({error: "Order could not be created at this time. Please try again!"})
        }

        // Create OrderItem records for each cart item: So we know: this order contains Product X (qty 2, price $10)
        // OrderItem takes orderId, productId, quantity, priceAtTime
        // Create OrderItem records for each cart item
        for (const item of orderItemsData) {
            await OrderItem.create({
                orderId: newOrder.id,
                productId: item.productId,
                quantity: item.quantity,
                priceAtTime: item.priceAtTime
            });
        }

        // Add total amount to the Order, or send a confirmation email, etc. - Optiona
        await checkoutConfirmationMail("levaakai@gmail.com", newOrder.id, totalAmount)
        
        await sendMailjetEmail(
            "levaakai@gmail.com",
            "Your Ecom Clothing Order Confirmation",
            "Thank you for shopping with us!",
            "<h3>Thanks for your order!</h3><p>We'll update you when it ships.</p>"
          );
          
        await Cart.destroy({ where: { userid }})
        
        return res.status(200).json({ message: "Checkout", totalAmount, newOrder})
    } catch (error) {
        return res.status(500).json({error: "Something went wrong.", error, })
    }
 }