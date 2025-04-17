import { Link, NavLink , useNavigate} from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from 'react';
import { useAuth } from "@/context/AuthContext";
import { ShoppingCart } from 'lucide-react';




const Navbar = () => {
  const { user, setUser, isLoading, setIsLoading } = useAuth();


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/user/profile`, {
          method: 'GET',
          credentials: 'include', // Include cookies for authentication
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data.user);  // Assuming the user data is returned
        } else {
          setUser(null);  // In case of error (invalid token or no user)
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setUser(null); // Handle errors gracefully
      } 
      finally {
        setIsLoading(false)
      }
    };

    fetchUserData();
  }, []); 

  // Handle Logout
  const handleLogout = async () => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/auth/logout`), {
        method: "POST",
        credentials: "include"
      }

      setUser(null)
    } catch (error) {
      console.log("Something unexpected happened!");
    }
  }


  return (
    <nav className="bg-blue-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl">Ecom Colthing</div>
        {/* Navigation links */}
      <ul className="flex space-x-6">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => isActive ? "text-yellow-300 font-medium" : "text-white hover:text-red-300"}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/shop"
            className={({ isActive }) => isActive ? "text-yellow-300 font-medium" : "text-white hover:text-red-300"}>
            Shop
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) => isActive ? "text-yellow-300 font-medium" : "text-white hover:text-red-300"}>
            About
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/contact"
            className={({ isActive }) => isActive ? "text-yellow-300 font-medium" : "text-white hover:text-red-300"}>
            Contact
          </NavLink>
        </li>
      </ul>
        <div>
          {isLoading ? (
            <span>Loading...</span>
          ) : user ? (
            <div>
                <Button asChild>
                  <Link to="/cart" className="flex items-center gap-2 ml-5 mr-5 text-white hover:text-red-300">
                    <ShoppingCart size={20} />
                    Cart
                  </Link>
              </Button>

              <Link className="text-yellow-300 underline hover:text-yellow-300" to="/profile">Profile</Link>
              {/* <span className="text-white">{user.firstName.toUpperCase()}</span>  */}
              <button className="ml-4 bg-red-500 text-white px-4 py-2 rounded" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <div>
              <Link to="/login" className="ml-4 text-white">Login</Link>
              <Link to="/register" className="ml-4 text-white">Register</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
