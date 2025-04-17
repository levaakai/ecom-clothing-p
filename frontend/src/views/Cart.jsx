import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MinusIcon, PlusIcon, Trash2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";


const Cart = () => {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const { user } = useAuth()
  const userId = user?.id
  const [showSuccess, setShowSuccess] = useState(false)

  // GET cart
  const fetchCart = async ()=> {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/cart/view-cart`, {
            method: 'GET',
            credentials: "include",
            headers: {"Content-Type":"application/json"}
        })
        const data = await response.json()
        
        if (!response.ok){
            setError(data.message || "Couldn't retrieve cart at this time. Please try again!")
        } else {
            setCartItems(data.cart)

            // show success message for 2 seconds
            setShowSuccess(true)  
            setTimeout(()=>{
              setShowSuccess(false)
            }, 2000)
        }
    } catch (error) {
        setError("Error: Couldnt retrieve cart. Something went wrong. ", error)
    }
} 


const updateCart = async (userId, productId, quantity) => {
  try {
    const cartParams = {userId, productId, quantity}
    console.log("Sending updateCart with:", cartParams);


    const response = await fetch(`${import.meta.env.VITE_API_URL}/cart/update-cart`, {
      method: 'PUT',
      headers: {'Content-Type':'application/json'},
      credentials: "include",
      body: JSON.stringify(cartParams)
    })

    const data = await response.json()

    if ( !response.ok ) {
      setError(data.error || "Couldn't update cart. Please try again")
    } else {
      setMessage(data.message || "Your cart has been updated!")

      // show success message for 2 seconds
      setShowSuccess(true)  
      setTimeout(()=>{
        setShowSuccess(false)
      }, 2000)
    }
    
  } catch (error) {
    setError("Something wnet wrong!")
  }
}


const removeFromCart = async (productId) => {
  const cartParams = { userId, productId}
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/cart/remove-cart`, {
      method: "DELETE",
      credentials: "include",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(cartParams)
    })

    const data = await response.json()

    if ( !response.ok ) {
      setError(data.error || "Couldn't remove item at this time. Please try again.")
    } else {
      setMessage(data.message || "Item removed from cart!")
      
      // show success message for 2 seconds
      setShowSuccess(true)  
      setTimeout(()=>{
        setShowSuccess(false)
      }, 2000)
    }
  } catch (err) {
    setError("Something went wrong. Please try again!", err)
  }
}


  useEffect(() => {
   fetchCart()
  }, [])

  if (!cartItems){
    <p>Retrieving items...</p>
  }

  const handleRemove = (id, prodId) => {
    removeFromCart(prodId)
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };


  const handleDecrement = async (userId, prodId, qty) => {
    let newQty = qty - 1

    // console.log('newQty ', newQty);
    await updateCart(userId, prodId, newQty)
    fetchCart();
  }
  const handleIncrement = async (userId, prodId, qty) => {
    const newQty = qty + 1
    // console.log('newQty ', newQty);

    await updateCart(userId, prodId, newQty)
    fetchCart();

  }

  let total = cartItems.reduce(
    (acc, item) => acc + item.Product.price * item.quantity,
    0
  );
  
  total = parseFloat(total.toFixed(2))

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
          Your Cart
        </h1>

        {showSuccess && <motion.div
          initial={{ opacity: 0, y: -20}}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-5 right-5 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50"
        >
          { message }
          </motion.div>}
          {error && (
              <div className="text-red-600 text-sm bg-red-100 p-2 rounded">
                {error}
              </div>
            )}
        {cartItems.length === 0 ? (
          <div className="text-center text-gray-500">Your cart is empty.</div>
        ) : (
          <div className="space-y-6">
            {cartItems.map((item, index) => {

                const { id, quantity, Product } = item;
                // console.log("Product id is ", Product.id);
                // console.log('item is ', item);
                // console.log('userID ', userId);
            
              return (<div key={id} className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center gap-4">
                <div>
                    <p className="text-sm text-gray-600">#{index+1}</p>
                  </div>
                  <img
                    src={Product.imageUrl}
                    alt={Product.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div>
                    <h2 className="text-lg font-semibold">{Product.name} </h2>
                    <p className="text-sm text-gray-600">
                      ${Product.price} × {quantity}
                      
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 minus">
                    <MinusIcon
                      id={'minusIcon'}
                      name={'minusIcon'}
                      className="text-gray-500 hover:text-red-700" 
                      onClick={()=>{
                        handleDecrement(userId, Product.id, quantity)
                        console.log(quantity);
                      }}
                    />
                  <span className="text-md font-bold text-blue-700">
                    {quantity}
                  </span>
                    <PlusIcon 
                      className="text-gray-500 hover:text-red-700" 
                      onClick={()=>handleIncrement(userId, Product.id, quantity)}
                    />
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-md font-bold text-blue-700">
                    ${(Product.price * quantity).toFixed(2)}
                  </span>
                  <button onClick={() => handleRemove(id, Product.id)}>
                    <Trash2 className="text-red-500 hover:text-red-700" />
                  </button>
                </div>
              </div>)
            })
            }

            <div className="text-right mt-6">
              <p className="text-xl font-semibold text-blue-800">
                Total: ${total}
              </p>
              <Button
                className="mt-4 px-6 py-2 text-lg"
                onClick={() => navigate("/checkout")}
              >
                Proceed to Checkout
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
