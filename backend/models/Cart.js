import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
// import User from '../models/User.js/'; 
// import Product from '../models/Product.js'; 
import { User, Product } from '../config/db.js';

export default (sequelize, DataTypes) => {    
    const Cart = sequelize.define('Cart', {
        id: { 
            type: DataTypes.INTEGER, 
            primaryKey: true, 
            autoIncrement: true 
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User, // reference the User model
                key: 'id',  // reference the id field of the User model
            },
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Product, // reference the Product model
                key: 'id',  // reference the id field of the Product model
            },
        },
        quantity: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
            allowNull: false,
        },
    }, {
        timestamps: true,  // to store `createdAt` and `updatedAt`
    });
    return Cart;
}
// export default CartModel;
