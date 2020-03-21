import { DataType, Sequelize } from "sequelize-typescript";

import { ProductCategory } from "#root/models/dtos/ProductCategory";

export const ProductCategoryModelConfiguration = (sequelize: Sequelize) => {
  ProductCategory.init(
    {
      Id: {
        type: DataType.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,

        allowNull: false
      },
      Name: {
        type: new DataType.STRING(100),
        allowNull: false,
        validate: {
          notNull: {
            msg: "Name must be filled in."
          },
          notEmpty: {
            msg: "Name must be filled in."
          }
        }
      }
    },
    {
      sequelize,
      tableName: "product_category",
      createdAt: false,
      updatedAt: false
    }
  );
};
