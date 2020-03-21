import { Sequelize } from "sequelize-typescript";
import { ProductModelConfiguration } from "./ProductModelConfiguration";
import { UserModelConfiguration } from "./UserModelConfiguration";
import { UserRoleModelConfiguration } from "./UserRoleModelConfiguration";
import { ProductCategoryModelConfiguration } from "./ProductCategoryModelConfiguration";
import configureModelAssociation from "./configureModelAssociation";

export const configureModel = (sequelize: Sequelize) => {
  ProductModelConfiguration(sequelize);
  UserRoleModelConfiguration(sequelize);
  UserModelConfiguration(sequelize);
  ProductCategoryModelConfiguration(sequelize);

  //-------------------------
  configureModelAssociation();
};
