import { useEffect, useState } from "react";
import { motion } from "framer-motion";


const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setMessage('');
      setError('');
  
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/reset-password-request`, {
          method: 'POST', // or GET, depending on your backend setup
          headers: { 'Content-Type': 'application/json' },
          credentials: "include",
          body: JSON.stringify({ email }),
        });
  
        const data = await response.json();
  
        if (!response.ok) {
          setError(data.message || 'Something went wrong');
        } else {
          setMessage(data.message || 'Check your email for reset instructions.');
        }
      } catch (err) {
        setError('Failed to send reset link. Please try again later.');
      }
    };
        
    
    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
          <motion.div
            className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-blue-800 mb-4 text-center">Forgot Password</h2>
            <p className="text-center text-gray-600 mb-6">
              Enter your email and we'll send you instructions to reset your password.
            </p>
    
            <form onSubmit={handleSubmit} className="space-y-5">
              {message && <div className="text-green-600 bg-green-100 border border-green-300 p-3 rounded">{message}</div>}
              {error && <div className="text-red-600 bg-red-100 border border-red-300 p-3 rounded">{error}</div>}
    
              <div>
                <label className="block text-blue-700 font-medium mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="on"
                  className="w-full px-4 py-2 border border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="you@example.com"
                />
              </div>
    
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-xl font-semibold hover:bg-blue-700 transition"
              >
                Send Reset Link
              </button>
            </form>
          </motion.div>
        </div>
      );
}

export default ForgotPassword