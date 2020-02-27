import { Sequelize } from "sequelize-typescript";
import { ProductModelConfiguration } from "./ProductModelConfiguration";
import { UserModelConfiguration } from "./UserModelConfiguration";
import { UserRoleModelConfiguration } from "./UserRoleModelConfiguration";
import configureModelAssociation from "./configureModelAssociation";

export const configureModel = (sequelize: Sequelize) => {
  ProductModelConfiguration(sequelize);
  UserRoleModelConfiguration(sequelize);
  UserModelConfiguration(sequelize);
  configureModelAssociation();
};
