import { DataType, Sequelize } from "sequelize-typescript";
import { User } from "#root/models/dtos/User";
import { UserRole } from "#root/models/dtos/UserRole";
export const UserModelConfiguration = (sequelize: Sequelize) => {
  User.init(
    {
      UserId: {
        type: new DataType.STRING(100),
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        validate: {
          notNull: {
            msg: "User id must be filled in."
          },
          notEmpty: {
            msg: "User id must be filled in."
          }
        }
      },
      Password: {
        type: new DataType.STRING(200),
        allowNull: false,
        validate: {
          notNull: {
            msg: "Password id must be filled in."
          },
          notEmpty: {
            msg: "Password id must be filled in."
          }
        }
      },
      Email: {
        type: new DataType.STRING(200),
        allowNull: false,
        validate: {
          notNull: {
            msg: "Email must be filled in."
          },
          notEmpty: {
            msg: "Email must be filled in."
          }
        }
      },
      UserRole: {
        type: new DataType.STRING(45),
        allowNull: false,
        validate: {
          notNull: {
            msg: "Password id must be filled in."
          },
          notEmpty: {
            msg: "Password id must be filled in."
          }
        }
      }
    },
    {
      sequelize,
      tableName: "user",
      createdAt: false,
      updatedAt: false
    }
  );
};
