import { UserRole } from "./../models/dtos/UserRole";
import { gql } from "apollo-server";
import { ProductCreateViewModel } from "#root/models/view.models/ProductCreateViewModel";
import { Product } from "#root/models/dtos";
import paginate from "#root/helpers/paginate";
import { Op } from "sequelize";
export const typeDef = gql`
  type Product {
    Id: ID!
    ProductName: String!
    SearchName: String!
    UserRoleDTO: [UserRole!]!
  }

  type ProductQueryViewModel {
    Data: [Product]!
    TotalCount: Int!
  }

  input ProductCreateViewModel {
    ProductName: String!
    SearchName: String!
  }

  extend type Query {
    products(pageNum: Int!, searchText: String!, withTotalCount: Boolean!): ProductQueryViewModel!
  }

  extend type Mutation {
    createProduct(input: ProductCreateViewModel): Product!
  }
`;

const createProduct = (context: any, { input }: { input: ProductCreateViewModel }) => {
  return Product.create(input);
};
const getProductList = async (context: any, { pageNum, searchText, withTotalCount }: { pageNum: any; searchText: any; withTotalCount: boolean }) => {
  let totalCount = -1;
  let queryResult;
  queryResult = await Product.findAll({
    ...paginate((pageNum || 1) - 1, 20),
    where: { ProductName: { [Op.like]: `%${searchText}%` } }
  });

  if (withTotalCount) {
    totalCount = await Product.count({
      where: { ProductName: { [Op.like]: `%${searchText}%` } }
    });
  }

  return {
    Data: queryResult,
    TotalCount: totalCount
  };
};

export const resolvers = {
  Query: {
    products: getProductList
  },
  Mutation: {
    createProduct: createProduct
  }
};
