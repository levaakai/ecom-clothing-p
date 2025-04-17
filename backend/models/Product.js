import { DataTypes } from "sequelize";
import {sequelize} from "../config/db.js";

export default (sequelize, DataTypes) => {
  const Product = sequelize.define("Product", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    size: {
      type: DataTypes.STRING, // You could also do ENUM if you have fixed sizes
      allowNull: true,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isFeatured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {
    timestamps: true,
  });

  return Product;
}

// export default ProductModel;

// INSERT INTO products (name,brand,description,price,imageUrl,category,stock,size,color,isFeatured, createdAt, updatedAt) VALUES ('test product 1', 'test brand 1','test desc 1', 20.0, "https://placehold.co/200x200/000000/FFF", "test category", 15, "Large Size", "Black", false, DATE("2025-04-09"), DATE("2025-04-09"));

// INSERT INTO products VALUES ('test product 1', 'test brand 1','test desc 1', 20.0, "https://placehold.co/200x200/000000/FFF", "test category", 15, "Large Size", "Black", false, DATE("2025-04-09"), DATE("2025-04-09");