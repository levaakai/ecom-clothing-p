// import Product from "../models/Product.js";
import { Product } from '../config/db.js';

/**
 *  ROUTES TO IMPLEMENT IN FUTURE
*   - filterProducts()   to filter products by category / color / size / min or max price etc
 *  - getFeaturedProducts() to display on homepage banners on special occasions. where product.isFeatured is true
 *  - bulkDeleteProducts() to delete products in bulk [list of ids as an option, maybe??]
 *  - toggleProductAvailability() instead of deleting product completely, just put it as 'inactive' or smth, and versa 
 */

export const getProducts = async (req, res) => {
    try {
        const products = await Product.findAll()
        // console.log(products);
        res.status(200).json({message:"Products retrieved successfully!", products})
    } catch (err) {
        res.status(500).json({error:"Something went wrong. Cannot retrieve products at this time. Please try again!"})
    }
}

export const getProduct = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id)
        if (!product) {
            return res.status(404).json({error:"Product not found!"})
        }

        res.status(200).json({message: "Product retrieved. Here you go!", product})
    } catch (err) {
        res.status(500).json({error:"Something went wrong. Cannot retrieve product at this time. Please try again!"})
    }
}


/**
 * ADMIN ONLY ROUTES
*/


/**
 * Handles a request to create/add products to the database.

 * @param {Object} req - The request object containing details about the HTTP request 
 * @param {Object} res - The response object used to send the HTTP response back to the client.
 */
export const createProduct = async (req, res) => {
    try {
        const response = await fetch('https://fakestoreapi.com/products')
        const items = await response.json()
        console.log("Mapping ////////******************");
        await Promise.all(items.map( async (data) =>{
            await Product.create({
                name:data.title, 
                price:data.price, 
                description:data.description, 
                category:data.category, 
                imageUrl:data.image
            })
        }))
      

        res.status(200).json({message: "Product created!"})
    } catch (err) {
        res.status(500).json({error: "Something went wrong. Cannot create product at this time. Please try again!"})
    }
}


/**
 * Updates an existing product by its ID.
 * 
 * This endpoint is intended for admin use only. It checks if the product exists,
 * then updates any provided fields while preserving existing values if not provided.
 * 
 * @async
 * @function updateProduct
 * @param {Object} req - Express request object
 * @param {Object} req.params - Request parameters
 * @param {string} req.params.id - ID of the product to update
 * @param {Object} req.body - Body data containing fields to update
 * @param {string} [req.body.name] - Updated product name
 * @param {string} [req.body.brand] - Updated brand name
 * @param {string} [req.body.description] - Updated product description
 * @param {number} [req.body.price] - Updated product price
 * @param {string} [req.body.imageUrl] - Updated product image URL
 * @param {string} [req.body.category] - Updated product category
 * @param {number} [req.body.stock] - Updated stock quantity
 * @param {string} [req.body.size] - Updated product size
 * @param {string} [req.body.color] - Updated product color
 * @param {boolean} [req.body.isFeatured] - Whether the product is featured
 * @param {Object} res - Express response object
 * @returns {Object} JSON response containing updated product data or error message
 */

export const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id)
        if (!product){
            return res.status(404).json({error:"Product not found!"})
        }
         let { name, brand, description, price, imageUrl,category, stock, size, color, isFeatured } = req.body
         
        name = name ?? product.name
        brand = brand ?? product.brand
        description ??=product.description
        price ??= product.price
        imageUrl ??= product.imageUrl
        category ??= product.category
        stock ??= product.stock
        size ??= product.size
        color ??= product.color
        isFeatured ?? product.isFeatured

        const updated = await Product.update({name,brand,description,price,imageUrl,category,stock,size,color,isFeatured},
            { where: { id: product.id} })

            if (!updated) {
                return res.status(401).json({message: "Unauthorized...Cannot update proudct!", product:updated })
            }

        res.status(200).json({message: "Product updated!", product:{name,brand,description,price,imageUrl,category,stock,size,color,isFeatured}})
    } catch (err) {
        res.status(500).json({error: "Something went wrong. Cannot update product at this time. Please try again!"})
    }
}



export const removeProduct = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id)

        if ( !product ) {       // is product present?
            return res.status(404).json({error: "Product not found."})
        }

        const removed = await Product.destroy({ where: { id:product.id }})

        if ( !removed ) {
            return res.status(403).json({error: "Forbidden: Cannot remove product at this time. Please try again."})
        }

        res.status(200).json({message: "Product removed!", product:removed})
    } catch (err) {
        res.status(500).json({error: "Something went wrong. Cannot remove product at this time. Please try again!"})
    }
}


