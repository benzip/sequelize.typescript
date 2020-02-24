import { useMutation, useQuery, useLazyQuery } from "@apollo/react-hooks";
import { useState, useEffect } from "react";
import gql from "graphql-tag";
import * as React from "react";
import { Table } from "antd";
import styled from "styled-components";
import { Pagination } from "antd";

interface Product {
  ProductName: string;
  SearchName: string;
}

interface QueryData {
  products: Product[];
}

const query = gql`
  query Product($pageNum: Int!) {
    products(pageNum: $pageNum) {
      Id
      ProductName
      SearchName
    }
  }
`;

const columns = [
  {
    title: "Role id",
    dataIndex: "ProductName",
    key: "ProductName",
    render: (text: any) => <a>{text}</a>
  },
  {
    title: "Role name",
    dataIndex: "SearchName",
    key: "SearchName"
  }
];

const UserRoleListTableComponent = () => {
  const { data, loading, fetchMore } = useQuery<QueryData>(query, {
    variables: { pageNum: 1 },
    notifyOnNetworkStatusChange: true
  });

  return (
    <React.Fragment>
      <Table
        columns={columns}
        dataSource={data?.products}
        rowKey="Id"
        loading={loading}
        pagination={{
          defaultCurrent: 1,
          total: 200,
          onChange: (pageNum: number) => {
            fetchMore({
              variables: {
                pageNum: pageNum
              },
              updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prev;
                return Object.assign({}, prev, {
                  products: [...prev.products, ...fetchMoreResult.products]
                });
              }
            });
          }
        }}
      />
    </React.Fragment>
  );
};

export default UserRoleListTableComponent;
