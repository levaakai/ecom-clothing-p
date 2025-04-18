import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import cookieParser from 'cookie-parser';
import cors from 'cors'

// Models
import { User, Product, Cart, Order, OrderItem } from './config/db.js';


// App Routes
import { router as authRoutes } from './routes/authRoutes.js'
import { router as userRoutes } from './routes/userRoutes.js'
import { router as productRoutes } from './routes/productRoutes.js'
import { router as cartRoutes } from './routes/cartRoutes.js'
import { router as orderRoutes } from './routes/orderRoutes.js'


dotenv.config()

//connect database
const syncDatabase = async () => {
   try {
    await connectDB()
    await User.sync({ force: false })                     // create Users database
    await Product.sync({ force: false })                 // create Products db
    await Cart.sync()                                    // create Carts db
    await Order.sync()
    await OrderItem.sync()
     console.log("Database succesfully synced!");
   } catch (error) {
    console.log("Error establishing database connection!", error);
   }
}
syncDatabase()

const app = express()

// middlewares init
app.use(express.json())     // parse json
app.use(express.urlencoded({extended: true}))     // handle url-encoding
app.use(cookieParser())
app.use(cors({
  origin: process.env.FRONTEND_URL, 
  credentials: true,
}))


app.use((req, res, next) => {
  console.log("BODY:", req.body);
  next();
});


/**************** APP ROUTES *************** */

// root routes dir
app.get("/api", (req, res) => {
    res.send("In route dir")
})

// AUTH ROUTES
app.use('/api/auth', authRoutes)

// USER ROUTES
app.use('/api/user', userRoutes)

// PRODUCT ROUTES
app.use('/api/product', productRoutes)

// CART ROUTES
app.use('/api/cart', cartRoutes)

// ORDER ROUTES
app.use('/api/order', orderRoutes)


app.listen(process.env.PORT || 5000, ()=> {
    console.log(`Server running on port ${process.env.PORT || 5000}`)
})
