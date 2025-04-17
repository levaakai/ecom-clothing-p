
import HomePage from "./views/Homepage.jsx"
import { Routes, Route } from "react-router-dom";
import Shop from "./views/Shop.jsx";
import Navbar from "./screenComponents/Navbar.jsx";
import ProductDetails from "./views/ProductDetails.jsx"
import Login from "./views/Login.jsx";
import Register from "./views/Register.jsx";
import About from "./views/About.jsx";
import Contact from "./views/Contact.jsx";
import Profile from './views/Profile.jsx'
import UpdateProfile from './views/UpdateProfile.jsx'
import ForgotPassword from './views/ForgotPassword.jsx'
import Cart from "./views/Cart.jsx";
import Checkout from "./views/Checkout.jsx";

function App() {

  return (
    <>
     <Navbar/>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/product/:id/:slug" element={<ProductDetails/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register"  element={<Register/>}/>
      <Route path="/about" element={<About />}/>
      <Route path="/contact" element={<Contact />}/>
      <Route path="/profile" element={<Profile />}/>
      <Route path="/update-profile" element={<UpdateProfile />}/>
      <Route path="/forgot-password" element={<ForgotPassword />}/>
      <Route path="/cart" element={<Cart />}/>
      <Route path="/checkout" element={<Checkout />}/>
    </Routes>
    </>
     
  )
}

export default App
