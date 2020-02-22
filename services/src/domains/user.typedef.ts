import { gql } from "apollo-server";
import { UserCreateViewModel } from "#root/models/view.models/UserCreateViewModel";
import { User } from "#root/models/dtos";

export const typeDef = gql`
  type User {
    UserId: ID!
    UserRole: String!
    Email: String!
  }

  input UserCreateViewModel {
    UserId: String!
    Password: String!
    Email: String!
    UserRole: String!
  }

  extend type Query {
    users: [User!]!
  }

  extend type Mutation {
    createUser(input: UserCreateViewModel): User!
  }
`;

const createUser = async (context: any, { input }: { input: UserCreateViewModel }) => {
  const exsistingUser = await User.findOne({ where: { UserId: input.UserId } });

  if (exsistingUser) {
    throw new Error("User exists already.");
  }
  return User.create(input);
};

const getUserList = () => {
  return User.findAll();
};

export const resolvers = {
  Query: {
    users: getUserList
  },
  Mutation: {
    createUser: createUser
  }
};
