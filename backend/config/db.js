import Sequelize from 'sequelize';
import { applyAssociations } from '../models/associations.js';

import UserModel from '../models/User.js';
import ProductModel from '../models/Product.js';
import CartModel from '../models/Cart.js';
import OrderModel from '../models/Order.js';
import OrderItemModel from '../models/OrderItem.js';


const sequelize = new Sequelize('ecom_clothing', 'root', '2456', {
  host: 'localhost',
  dialect: 'mysql'
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