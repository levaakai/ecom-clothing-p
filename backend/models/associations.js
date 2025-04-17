import User from './User.js';
import Product from './Product.js';
import Cart from './Cart.js';
import Order from './Order.js';
import OrderItem from './OrderItem.js';

const applyAssociations = ( User, Product, Cart, Order, OrderItem) => {
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


