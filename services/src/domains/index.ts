import { merge } from "lodash";
import { typeDef as product, resolvers as productResolvers } from "./product.typedef";
import { typeDef as user, resolvers as userResolvers } from "./user.typedef";
import { typeDef as userrole, resolvers as userroleResolvers } from "./userrole.typedef";
import { makeExecutableSchema } from "apollo-server";
// If you had Query fields not associated with a
// specific type you could put them here
const defaultTypeDefs = `
  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
`;

const resolvers = {};

const domains = makeExecutableSchema({
  typeDefs: [defaultTypeDefs, product, user, userrole],
  resolvers: merge(resolvers, productResolvers, userResolvers, userroleResolvers)
});

export default domains;
