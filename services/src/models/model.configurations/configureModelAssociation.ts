import { User, UserRole, Product, ProductCategory } from "#root/models/dtos";
const configureModelAssociation = () => {
  configureUserUserRoleAssociation();
};

const configureUserUserRoleAssociation = () => {
  Product.hasOne(ProductCategory, {
    sourceKey: "Category",
    foreignKey: "Id",
    as: "CategoryDTO"
  });

  User.hasOne(UserRole, {
    sourceKey: "UserRole",
    foreignKey: "Id",
    as: "UserRoleDTO"
  });
};

export default configureModelAssociation;
