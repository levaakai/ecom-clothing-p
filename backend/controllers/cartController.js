// import Cart from '../models/Cart.js';
// import Product from '../models/Product.js';
// import '../models/associations.js';
// import { applyAssociations } from '../models/associations.js';
import { requestUserToken } from '../utils/utils.js';
import { Cart, Product} from '../config/db.js';



export const getCart = async (req, res) => {
    try {
        // const { userId } = requestUserToken

        // get id from request user instead of req.body since GET requests do not have a request body
        const requestUser = requestUserToken(req,res)
        const userId = requestUser.userid


        if (!userId) {
            return res.status(400).json({ error: "User needs to be logged in" });
        }

        const cartItems = await Cart.findAll({
            where: { userId },
            include: [Product], // include product details
        });

        if (cartItems.length === 0) {
            return res.status(404).json({ message: "Cart is empty." });
        }

        res.status(200).json({ message: "Cart retrieved!", cart: cartItems });
    } catch (err) {
        console.error("Error getting cart:", err);
        res.status(500).json({ error: "Something went wrong!", err });
    }
};



export const addToCart = async (req, res) => {
    try {
        const { userId, productId, quantity = 1 } = req.body;

        // Check if the product exists
        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        // Check if the item is already in the user's cart
        const existingCartItem = await Cart.findOne({
            where: { userId, productId }
        });

        if (existingCartItem) {
            // If already in cart, update quantity

            existingCartItem.quantity += quantity;
            await existingCartItem.save();
            return res.status(200).json({ message: "Cart updated!", cart: existingCartItem });
        }

        // If not in cart, create new cart entry
        const newCartItem = await Cart.create({ userId, productId, quantity });
        res.status(201).json({ message: "Item added to cart!", cart: newCartItem });

    } catch (err) {
        console.error("Add to cart error:", err);
        res.status(500).json({ error: "Failed to add to cart" });
    }
};



export const updateCart = async (req, res) => {
    try {
        
        const { userId, productId, quantity } = req.body;
        console.log("Incoming updateCart request body:", req.body);

        // Check if the cart item exists
        const cartItem = await Cart.findOne({ where: { userId, productId } });
        console.log("Cart item found:", cartItem);

        if (!cartItem) {
            return res.status(404).json({ error: "Cart item not found!" });
        }

        // Update the quantity
        if (quantity < 1) {
            return res.status(400).json({ error: "Quantity must be at least 1." });
          }
          
        cartItem.quantity = quantity;
        await cartItem.save();

        res.status(200).json({ message: "Cart updated!", cartItem });
    } catch (err) {
        console.error("Error updating cart:", err);
        res.status(500).json({ 
          error: "Something went wrong!", 
          details: err.message || err 
        });
    }
};



export const removeCart = async (req, res) => {
    try {
        const { userId, productId } = req.body;

        const deleted = await Cart.destroy({
            where: {
                userId,
                productId
            }
        });

        if (!deleted) {
            return res.status(404).json({ error: "Cart item not found or already removed!" });
        }

        res.status(200).json({ message: "Cart item removed!" });
    } catch (err) {
        console.error("Error removing cart:", err);
        res.status(500).json({ error: "Something went wrong!", err });
    }
};
