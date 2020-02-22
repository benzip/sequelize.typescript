import { gql } from "apollo-server";
import { ProductCreateViewModel } from "#root/models/view.models/ProductCreateViewModel";
import { Product } from "#root/models/dtos";

export const typeDef = gql`
  type Product {
    Id: ID!
    ProductName: String!
    SearchName: String!
  }

  input ProductCreateViewModel {
    ProductName: String!
    SearchName: String!
  }

  extend type Query {
    products: [Product!]!
  }

  extend type Mutation {
    createProduct(input: ProductCreateViewModel): Product!
  }
`;

const createProduct = (context: any, { input }: { input: ProductCreateViewModel }) => {
  return Product.create(input);
};

const getProductList = () => {
  return Product.findAll();
};

export const resolvers = {
  Query: {
    products: getProductList
  },
  Mutation: {
    createProduct: createProduct
  }
};
