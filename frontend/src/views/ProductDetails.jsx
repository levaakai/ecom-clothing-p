import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';


const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [quantity, setQuantity] = useState(1)
  const { user } = useAuth()
  const userId = user?.id
  const [showSuccess, setShowSuccess] = useState(false)


  const addItemToCart = async (productId) => {
    const cartParams = {userId, productId, quantity}

    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/cart/add-cart`, {
          method: "POST",
          headers: {'Content-Type':'application/json'},
          credentials: "include",
          body: JSON.stringify(cartParams)
        })
        const data = await response.json()
    
        if ( !response.ok ) {
          setError(data.error || "Couldn't add to cart. Please try again.")
        } else {
          console.log("Added oo", data.message);
          setMessage(data.message || "Item added to cart")
          setShowSuccess(true)
          setTimeout(()=>{
            setShowSuccess(false)
          }, 2000)
        }
    } catch (err) {
      setError("Something went wrong", error)
    }
  }


  useEffect(() => {
    const getProduct = async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/product/view/product/${id}`);
      const data = await response.json();
      console.log(data.product);
      setProduct(data.product);
    };

    getProduct();
  }, [id]);

  if (!product) {
    return <div className="p-8 text-center text-gray-500">Loading product details...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 p-6">
      {showSuccess && <motion.div
        className="fixed top-5 right-5 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
> 
      { message }      
      </motion.div> }

      <motion.div
        className="bg-white rounded-2xl shadow-lg max-w-3xl w-full p-8 flex flex-col md:flex-row gap-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full md:w-1/2 h-64 object-cover rounded-xl"
          onClick={()=>setShowImageModal(true)}
        />

        <div className="flex flex-col justify-between w-full text-left">
          <div>
            <h1 className="text-3xl font-bold text-blue-900 mb-2">{product.name}</h1>
            <p className="text-xl text-blue-700 font-semibold mb-4">${product.price}</p>
            <p className="text-gray-600 mb-4">
              <span className="font-medium text-blue-800">Description:</span>{' '}
              {product.description || 'No description provided.'}
            </p>
            <p className="text-gray-600">
              <span className="font-medium text-blue-800">Category:</span>{' '}
              {product.category || 'Uncategorized'}
            </p>
          </div>

          <Button className="mt-6 w-full md:w-auto self-start"
            onClick={()=>addItemToCart(product.id)}>Add to Cart</Button>

           {/* Image Modal */}
      {showImageModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={() => setShowImageModal(false)}
        >
          <img
            src={product.imageUrl}
            alt={product.name}
            className="max-w-full max-h-full rounded-xl shadow-lg"
          />
        </div>
      )}
        </div>
      </motion.div>
    </div>
  );
};

export default ProductDetails;
