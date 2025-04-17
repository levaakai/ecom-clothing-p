import { DataTypes } from "sequelize";
import {sequelize} from "../config/db.js";

export default (sequelize, DataTypes) => {
  const OrderItem = sequelize.define("OrderItem", {
    // id: {
    //   type: DataTypes.INTEGER,
    //   autoIncrement: true,
    //   primaryKey: true,
    // },
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    priceAtTime: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  })
return OrderItem
}

// export default OrderItemModel;
