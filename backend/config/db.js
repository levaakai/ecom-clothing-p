import Sequelize from 'sequelize';
import { applyAssociations } from '../models/associations.js';

import UserModel from '../models/User.js';
import ProductModel from '../models/Product.js';
import CartModel from '../models/Cart.js';
import OrderModel from '../models/Order.js';
import OrderItemModel from '../models/OrderItem.js';

// console.log(process.env.DB_NAME);
// const sequelize = new Sequelize('postgresql://ecom_clothing_user:u4l6HJLZUiQPYH8XFzMaHkgCFpN05Iku@dpg-d00fhqpr0fns73e7t81g-a.virginia-postgres.render.com/ecom_clothing')

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 5432,
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,  
      rejectUnauthorized: false  
    }
  }
});


// 💡 Initialize models with sequelize + DataTypes
const User = UserModel(sequelize, Sequelize.DataTypes);
const Product = ProductModel(sequelize, Sequelize.DataTypes);
const Cart = CartModel(sequelize, Sequelize.DataTypes);
const Order = OrderModel(sequelize, Sequelize.DataTypes);
const OrderItem = OrderItemModel(sequelize, Sequelize.DataTypes);

// Apply associations
applyAssociations(User, Product, Cart, Order, OrderItem);

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}

// applyAssociations(sequelize);

export default connectDB;
export { sequelize, User, Product, Cart, Order, OrderItem };