import { ProductCategory } from "./../models/dtos/ProductCategory";
import { UserRole } from "./../models/dtos/UserRole";
import { gql } from "apollo-server";
import { ProductMutationViewModel } from "#root/models/view.models/ProductMutationViewModel";
import { Product } from "#root/models/dtos";
import paginate from "#root/helpers/paginate";
import { Op } from "sequelize";
import { ProductIdentityVIewModel } from "#root/models/view.models/ProductIdentityVIewModel";
export const typeDef = gql`
  type Product {
    Id: Int!
    ProductName: String!
    SearchName: String!
    Category: Int!
    CategoryDTO: ProductCategory!
  }

  type ProductQueryViewModel {
    Data: [Product]!
    TotalCount: Int!
  }

  input ProductMutationViewModel {
    ProductName: String!
    SearchName: String!
    Category: Int!
  }

  input ProductIdentityViewModel {
    Id: Int!
  }

  extend type Query {
    products(pageNum: Int!, searchText: String!, withTotalCount: Boolean!): ProductQueryViewModel!
  }

  extend type Mutation {
    createProduct(input: ProductMutationViewModel): Product!
    updateProduct(id: ProductIdentityViewModel, input: ProductMutationViewModel): Product!
    deleteProduct(id: ProductIdentityViewModel): Int!
  }
`;

const create = async (context: any, { input }: { input: ProductMutationViewModel }) => {
  let product: Product = await Product.create({ ...input });
  return Product.findOne({
    where: { Id: product.Id },
    include: [
      {
        model: ProductCategory,
        as: "CategoryDTO"
      }
    ]
  });
};

const update = async (context: any, { id, input }: { id: ProductIdentityVIewModel; input: ProductMutationViewModel }) => {
  await Product.update({ ...input }, { where: { Id: id.Id } });

  return Product.findOne({
    where: { Id: 1 },
    include: [
      {
        model: ProductCategory,
        as: "CategoryDTO"
      }
    ]
  });
};

const deleteData = async (context: any, { id }: { id: ProductIdentityVIewModel }) => {
  return Product.destroy({ where: { Id: id.Id } });
};

const getList = async (context: any, { pageNum, searchText, withTotalCount }: { pageNum: any; searchText: any; withTotalCount: boolean }) => {
  let totalCount = -1;
  let queryResult;
  queryResult = await Product.findAll({
    ...paginate((pageNum || 1) - 1, 20),
    where: { ProductName: { [Op.like]: `%${searchText}%` } },
    include: [
      {
        model: ProductCategory,
        as: "CategoryDTO"
      }
    ]
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
    products: getList
  },
  Mutation: {
    createProduct: create,
    updateProduct: update,
    deleteProduct: deleteData
  }
};
