import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import { slugify } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cartItem, setCartItem] = useState([])
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [quantity, setQuantity] = useState(1)
    const { user } = useAuth();
    const userId = user?.id;
    const [showSuccess, setShowSuccess] = useState(false);

    
    


const addItemToCart = async (productId) => {
      const cartParams = ({userId, productId, quantity})
      
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/cart/add-cart`, {
      method: "POST", 
      headers: {'Content-Type': 'application/json'},
      credentials: "include",
      body: JSON.stringify(cartParams)
    })

    const data = await response.json()
    console.log('inside data is ', response);

    if (!response.ok) {
      setError(data.error || "Couldn't add this item to your cart. Please try again")
    } else {
      setMessage(data.message || "Item added to cart!")
      setShowSuccess(true)
      setTimeout(()=>{
        setShowSuccess(false)
      }, 3000)

    }

     console.log(data);
  } catch (err) {
    setError("Something went wrong!")
  }
}

    useEffect(() => {
      const getProducts = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/product/view/products`)
            const data = await response.json()
            setProducts(data.products)
        } catch (err) {
            console.log("Failed to fetch products: ", err);
        }
      }
      console.log(user);
      getProducts()
    }, [])
    
  return (
    <div className="min-h-screen bg-white p-8">
      <motion.h1
        className="text-4xl font-bold text-center text-blue-800 mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Shop Our Collection
      </motion.h1>

      {showSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-5 right-5 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50"
        >
          {message}
        </motion.div>
      )}

      {error && (
              <div className="text-red-600 text-sm bg-red-100 p-2 rounded">
                {error}
              </div>
            )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        { products.map((product) => (
          <motion.div
            key={product.id}
            className="bg-blue-50 rounded-2xl shadow-md p-4 flex flex-col items-center text-center"
            whileHover={{ scale: 1.03 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: product.id * 0.1 }}
          >
            <Link to={`/product/${product.id}/${slugify(product.name)}`}>
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-48 object-cover rounded-xl mb-4"
              />
              <h2 className="text-lg font-semibold text-blue-900 mb-1">{product.name}</h2>
              <p className="text-blue-700 mb-3">{product.price}</p>
            </Link>
            <Button className="px-4 py-2 text-sm" 
            onClick={() => addItemToCart(product.id)}>Add to Cart</Button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}


export default Shop;