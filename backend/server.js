import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import cookieParser from 'cookie-parser';
import cors from 'cors'

// Models
// import User from './models/User.js'
// import Product from './models/Product.js';
// import Cart from './models/Cart.js';
// import Order from './models/Order.js';
// import OrderItem from './models/OrderItem.js';
import { User, Product, Cart, Order, OrderItem, Payment} from './config/db.js';


// App Routes
import { router as authRoutes } from './routes/authRoutes.js'
import { router as userRoutes } from './routes/userRoutes.js'
import { router as productRoutes } from './routes/productRoutes.js'
import { router as cartRoutes } from './routes/cartRoutes.js'
import { router as orderRoutes } from './routes/orderRoutes.js'
import { router as paymentRoutes } from './routes/paymentRoutes.js'

dotenv.config()

//connect database
const syncDatabase = async () => {
   try {
    await connectDB()
    await User.sync({ alter: false })                     // create Users database
    await Product.sync({ force: false })                 // create Products db
    await Cart.sync()                                    // create Carts db
    await Order.sync()
    await OrderItem.sync()
    await Payment.sync()
     console.log("Database succesfully synced!");
   } catch (error) {
    console.log("Error establishing database connection!", error);
   }
}

// await User.sync({ force: true });  // Forces the creation of the table, drops it first if it already exists


syncDatabase()

const app = express()

// middlewares init
app.use(express.json())     // parse json
app.use(express.urlencoded({extended: true}))     // handle url-encoding
app.use(cookieParser())

// app.use(cors({
//   origin: process.env.FRONTEND_PROD_URL, 
//   credentials: true,
// }))

app.use(cors({
  origin: 'https://chipper-gaufre-a0ffdc.netlify.app',
  credentials: true
}));



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

//  PAYMENT ROUTES
app.use('/api/payment', paymentRoutes )

app.listen(process.env.PORT, ()=> {
    console.log(`Server running on port ${process.env.PORT}`)
})
