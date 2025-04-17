// import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import fashionImage from '@/assets/images/fashion.png'


export const HomePage =()=> {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col items-center justify-center text-center p-6">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl"
      >
        <h1 className="text-5xl font-bold text-blue-800 mb-4">Welcome to EcomClothing</h1>
        <p className="text-lg text-blue-700 mb-6">
          Discover your style. Shop the trendiest outfits, accessories, and more — all in one place.
        </p>
        <div className="flex gap-4 justify-center">
          <Link to="/shop">
            <Button className="text-lg px-6 py-2 rounded-2xl shadow-md hover:bg-blue-700 hover:text-white transition">
              Shop Now
            </Button>
          </Link>
          <Link to="/about">
            <Button variant="outline" className="text-lg px-6 py-2 rounded-2xl border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
              Learn More
            </Button>
          </Link>
        </div>
      </motion.div>

      <motion.img
        src={fashionImage}
        alt="Fashion Illustration"
        className="w-96 mt-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.7 }}
      />
    </div>
  );
}

export default HomePage