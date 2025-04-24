import { DataTypes } from "sequelize";
import {sequelize} from "../config/db.js";

/**
status: "pending"           // Order placed
status: "shipped"           // In transit
status: "delivered"         // Delivered successfully
status: "cancelled"         // Cancelled before shipping
* */

/**
 * Order.paymentStatus:
    This is a summary field that reflects the current payment state of the order.
    It mirrors or pulls status from the related Payment.
Think of this like:
    “What’s the overall payment state of this order?”
 * 
 */
export default (sequelize, DataTypes) => {
    const Order = sequelize.define("Order", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    totalAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    deliveryStatus: {
      type: DataTypes.STRING,
      defaultValue: "pending",  // This is for delivery status
    },
    paymentStatus: {
      type: DataTypes.STRING,
      defaultValue: "pending"  // 'pending', 'paid', 'failed'
    },
    paymentId: {
      type: DataTypes.STRING,
      allowNull: true
    },

  });
  return Order
}

