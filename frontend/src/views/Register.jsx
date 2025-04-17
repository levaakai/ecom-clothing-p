import { useState } from 'react';
import { data, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import loginImage from '@/assets/images/img1.jpg'
// import { useAuth } from "@/context/AuthContext";


const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ firstName:'', lastName:'', email:'', telephone:'', password:''});
  const [error, setError] = useState('');
  const [message, setMessage] = useState('')
//   const { setUser, fetchUser } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        credentials: "include",
        body: JSON.stringify(form)
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.message || "Registration Failed!")
        return
      }

      setMessage(data.message || "Registration successful!")


      await new Promise(resolve => setTimeout(resolve, 2000));
      navigate('/shop')

    } catch (err) {
      setError('An unexpected error occurred.');
    }
  };

  return (
    <div className="h-screen overflow-y-auto grid grid-cols-1 md:grid-cols-2 bg-blue-50">
      {/* Form section */}
      <motion.div
        className="flex flex-col justify-center px-8 md:px-16 py-12 bg-white shadow-xl md:rounded-r-3xl"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-h-screen overflow-y-auto w-full">

          <h2 className="text-4xl font-bold text-blue-800 mb-6 text-center">Welcome </h2>
          <p className="text-center text-gray-600 mb-8">Register to shop with us!</p>

          <form onSubmit={handleSubmit} className="space-y-5 w-full max-w-md mx-auto">
          {message && (
            <div className="text-green-600 bg-green-100 border border-green-300 p-3 rounded mb-4 text-center">
                {message}
            </div>
            )}

            {error && (
              <div className="text-red-600 text-sm bg-red-100 p-2 rounded">
                {error}
              </div>
            )}

            <div>
              <label className="block text-blue-700 font-medium mb-1">First Name</label>
              <input
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-blue-700 font-medium mb-1">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-blue-700 font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-blue-700 font-medium mb-1">Telephone</label>
              <input
                type="text"
                name="telephone"
                value={form.telephone}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-blue-700 font-medium mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <Button type="submit" className="w-full py-2 text-lg rounded-xl">
              Register
            </Button>
          </form>
        </div>
      </motion.div>

      {/* Image section */}
      <motion.div
        className="hidden md:flex items-centers justify-centers bg-blue-100 overflow-hidden"
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <img
          src={loginImage}
          alt="Login Illustration"
          className="w-full h-auto object-contain max-h-screen"
        />
      </motion.div>
    </div>
  );
};

export default Register;
