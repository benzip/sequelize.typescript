import { User, UserRole } from "#root/models/dtos";
const configureModelAssociation = () => {
  configureUserUserRoleAssociation();
};

const configureUserUserRoleAssociation = () => {
  User.hasOne(UserRole, {
    sourceKey: "UserRole",
    foreignKey: "Id",
    as: "UserRoleDTO"
  });
};

export default configureModelAssociation;
