import { DataType, Sequelize } from "sequelize-typescript";

import { UserRole } from "#root/models/dtos/UserRole";

export const UserRoleModelConfiguration = (sequelize: Sequelize) => {
  UserRole.init(
    {
      Id: {
        type: DataType.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      RoleName: {
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
      tableName: "user_role",
      createdAt: false,
      updatedAt: false
    }
  );
};
