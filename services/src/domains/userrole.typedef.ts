import { gql } from "apollo-server";
import { UserRoleCreateViewModel } from "#root/models/view.models/UserRoleCreateViewModel";
import { UserRole } from "#root/models/dtos";

export const typeDef = gql`
  type UserRole {
    RoleName: String!
  }

  input UserRoleCreateViewModel {
    RoleName: String!
  }

  extend type Query {
    userRoles: [UserRole!]!
  }

  extend type Mutation {
    createUserRole(input: UserRoleCreateViewModel): UserRole!
  }
`;

const createUserRole = (context: any, { input }: { input: UserRoleCreateViewModel }) => {
  return UserRole.create(input);
};

const getUserRoleList = () => {
  return UserRole.findAll();
};

export const resolvers = {
  Query: {
    userRoles: getUserRoleList
  },
  Mutation: {
    createUserRole: createUserRole
  }
};
