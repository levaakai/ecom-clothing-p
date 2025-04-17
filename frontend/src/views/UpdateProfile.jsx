import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const UpdateProfile = () => {
  const [user, setUser] = useState('null');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('')
  const [form, setForm] = useState({ firstName:'', lastName:'', email:'', telephone:'', password:''});

  const navigate = useNavigate();


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/user/profile`, {
          method: 'GET',
          credentials: 'include',
        });
        const data = await response.json();
  
        if (response.ok) {
          setUser(data.user);
          setForm(data.user); // prefill the form
        } else {
          setError('Could not fetch user. Redirecting...');
          setTimeout(() => navigate('/'), 2000);
        }
      } catch (err) {
        setError('Error fetching user. Redirecting...');
        setTimeout(() => navigate('/'), 2000);
      }
    };
  
    fetchUser();
  }, [navigate]);
  

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault()

        try {
          const response = await fetch(`${import.meta.env.VITE_API_URL}/user/profile/update`, {
            method: "PUT",
            headers: {'Content-Type':'application/json'},
            credentials: "include",
            body: JSON.stringify(form)
          });
          const data = await response.json();
  
          if (!response.ok) {
            setError(data.message || 'Something went wrong');
          } else {
            setMessage('Profile updated successfully!');
            setError('');
            setTimeout(()=> navigate("/profile"), 2000)
          }
  
        } catch (error) {
          setError("Could not update profile");
          setTimeout(() => navigate("/"), 2000);
        }
      };

      
  


  if (!user) {
    return <div className="text-center py-10 text-gray-600">{error || "Loading profile..."}</div>;
  }

  
    return (
      // <div className="h-screen overflow-y-auto grid grid-cols-1 md:grid-cols-2 bg-blue-50 items-center justify-center">
      <div className="min-h-screen  flex items-center justify-center bg-blue-50 px-4">

        {/* Form section */}
        <motion.div
          className="flex flex-col justify-center px-8 md:px-16 py-12 bg-white shadow-xl md:rounded-r-3xl"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-h-screen overflow-y-auto w-full items-center justify-center">
  
            <h2 className="text-4xl font-bold text-blue-800 mb-6 text-center">Update Profile </h2>
            <p className="text-center text-gray-600 mb-8">Update your account details</p>
  
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
  
              <Button type="submit" className="w-full py-2 text-lg rounded-xl">
                Save
              </Button>
            </form>
          </div>
        </motion.div>
      </div>

    );

};

export default UpdateProfile;
