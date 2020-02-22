import { Sequelize } from "sequelize-typescript";
import { ProductModelConfiguration } from "./ProductModelConfiguration";
import { UserModelConfiguration } from "./UserModelConfiguration";
import { UserRoleModelConfiguration } from "./UserRoleModelConfiguration";

export const configureModel = (sequelize: Sequelize) => {
  ProductModelConfiguration(sequelize);
  UserModelConfiguration(sequelize);
  UserRoleModelConfiguration(sequelize);
};
