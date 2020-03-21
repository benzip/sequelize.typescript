import { gql } from "apollo-server";
import { ProductCategoryMutationViewModel } from "#root/models/view.models/ProductCategoryMutationViewModel";
import paginate from "#root/helpers/paginate";
import { Op } from "sequelize";
import { ProductCategory } from "#root/models/dtos";
export const typeDef = gql`
  type ProductCategory {
    Id: ID!
    Name: String!
  }

  type ProductCategoryQueryViewModel {
    Data: [ProductCategory]!
    TotalCount: Int!
  }

  input ProductCategoryMutationViewModel {
    Id: ID!
    Name: String!
  }

  extend type Query {
    productCategories(pageNum: Int!, searchText: String!, withTotalCount: Boolean!): ProductCategoryQueryViewModel!
  }

  extend type Mutation {
    createProductCategory(input: ProductCategoryMutationViewModel): ProductCategory!
  }
`;

const create = (context: any, { input }: { input: ProductCategoryMutationViewModel }) => {
  return ProductCategory.create(input);
};

const getList = async (context: any, { pageNum, searchText, withTotalCount }: { pageNum: any; searchText: any; withTotalCount: boolean }) => {
  let totalCount = -1;
  let queryResult;
  queryResult = await ProductCategory.findAll({
    ...paginate((pageNum || 1) - 1, 20),
    where: { Name: { [Op.like]: `%${searchText}%` } }
  });

  if (withTotalCount) {
    totalCount = await ProductCategory.count({
      where: { Name: { [Op.like]: `%${searchText}%` } }
    });
  }

  return {
    Data: queryResult,
    TotalCount: totalCount
  };
};

export const resolvers = {
  Query: {
    productCategories: getList
  },
  Mutation: {
    createProductCategory: create
  }
};
