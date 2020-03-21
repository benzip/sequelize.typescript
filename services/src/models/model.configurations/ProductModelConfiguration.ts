import { DataType, Sequelize } from "sequelize-typescript";

import { Product } from "#root/models/dtos/Product";

export const ProductModelConfiguration = (sequelize: Sequelize) => {
  Product.init(
    {
      Id: {
        type: DataType.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      ProductName: {
        type: new DataType.STRING(100),
        allowNull: false,
        validate: {
          notNull: {
            msg: "Product name must be filled in."
          },
          notEmpty: {
            msg: "Product name must be filled in."
          }
        }
      },
      SearchName: {
        type: new DataType.STRING(100),
        allowNull: false,
        validate: {
          notNull: {
            msg: "Search name must be filled in."
          },
          notEmpty: {
            msg: "Search must be filled in."
          }
        }
      },
      Category: {
        type: DataType.INTEGER.UNSIGNED,
        allowNull: true
      }
    },
    {
      sequelize,
      tableName: "product",
      createdAt: false,
      updatedAt: false
    }
  );
};
