import User from './User.js';
import Product from './Product.js';
import Cart from './Cart.js';
import Order from './Order.js';
import OrderItem from './OrderItem.js';
import Payment from './Payment.js';

const applyAssociations = ( User, Product, Cart, Order, OrderItem, Payment) => {
  // User and Orders
  User.hasMany(Order, { foreignKey: 'userId' });
  Order.belongsTo(User, { foreignKey: 'userId' });

  // Order and OrderItems
  Order.hasMany(OrderItem, { foreignKey: 'orderId' });
  OrderItem.belongsTo(Order, { foreignKey: 'orderId' });

  // Product and OrderItem
  Product.hasMany(OrderItem, { foreignKey: 'productId' });
  OrderItem.belongsTo(Product, { foreignKey: 'productId' });

  // Cart relationships (if not already set)
  User.hasMany(Cart, { foreignKey: 'userId' });
  Cart.belongsTo(User, { foreignKey: 'userId' });

  Product.hasMany(Cart, { foreignKey: 'productId' });
  Cart.belongsTo(Product, { foreignKey: 'productId' });
  
  // Payment relationshipss
 // One Order has one Payment
Order.hasOne(Payment, { foreignKey: 'orderId' });
Payment.belongsTo(Order, { foreignKey: 'orderId' });

// One User can have many Payments
User.hasMany(Payment, { foreignKey: 'userId' });
Payment.belongsTo(User, { foreignKey: 'userId' });

};

export { applyAssociations };











// import User from './User.js';
// import Product from './Product.js';
// import Cart from './Cart.js';

// // Associations
// User.hasMany(Cart, { foreignKey: 'userId' });           // One user can have many cart items
// Product.hasMany(Cart, { foreignKey: 'productId' });     // One product can appear in many carts

// Cart.belongsTo(User, { foreignKey: 'userId' });         // Each cart item belongs to one user
// Cart.belongsTo(Product, { foreignKey: 'productId' });   // Each cart item corresponds to one product


