// src/pages/Checkout.jsx

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";

const Checkout = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const userId = user?.id;

  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/cart/view-cart`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();

        if (!response.ok) {
          setError(data.message || 'Failed to fetch cart');
        } else {
          setCartItems(data.cart);
          const totalPrice = data.cart.reduce(
            (acc, item) => acc + item.Product.price * item.quantity,
            0
          );
          setTotal(totalPrice);
        }
      } catch (err) {
        setError('Something went wrong while fetching cart.');
      }
    };

    fetchCart();
  }, []);

  const handlePlaceOrder = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/checkout/place-order`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Order could not be placed');
      } else {
        setMessage(data.message || 'Order placed successfully!');
        setTimeout(() => {
          navigate('/orders'); // or anywhere else
        }, 2000);
      }
    } catch (err) {
      setError('Error placing order. Try again.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-2xl mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">Checkout</h1>

      {error && <p className="text-red-500">{error}</p>}
      {message && <p className="text-green-600">{message}</p>}

      <ul className="mb-6">
        {cartItems.map((item) => (
          <li key={item.id} className="flex justify-between py-2 border-b">
            <div>
              <p className="font-medium">{item.Product.name}</p>
              <p className="text-sm text-gray-600">
                ${item.Product.price} × {item.quantity}
              </p>
            </div>
            <p className="font-semibold text-blue-800">
              ${(item.Product.price * item.quantity).toFixed(2)}
            </p>
          </li>
        ))}
      </ul>

      <div className="flex justify-between items-center mt-4">
        <h2 className="text-xl font-semibold">Total: ${total.toFixed(2)}</h2>
        <Button className="px-6 py-2 text-lg" onClick={handlePlaceOrder}>
          Place Order
        </Button>
      </div>
    </div>
  );
};

export default Checkout;
