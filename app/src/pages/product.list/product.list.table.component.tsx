import * as React from "react";
import { Table } from "antd";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const columns = [
  {
    title: "Product name",
    dataIndex: "ProductName",
    key: "ProductName",
    render: (text: any) => <a>{text}</a>
  },
  {
    title: "Search name",
    dataIndex: "SearchName",
    key: "SearchName"
  }
];

interface Product {
  Id: number;
  ProductName: string;
  SearchName: string;
}

interface ProductQueryViewModel {
  Data: Product[];
  TotalCount: number;
}

interface QueryData {
  products: ProductQueryViewModel;
}

const query = gql`
  query Product($pageNum: Int!, $searchText: String!, $withTotalCount: Boolean!) {
    products(pageNum: $pageNum, searchText: $searchText, withTotalCount: $withTotalCount) {
      Data {
        Id
        ProductName
        SearchName
      }
      TotalCount
    }
  }
`;

const ProductListTableComponent = (props: any) => {
  const { data, loading, fetchMore } = useQuery<QueryData>(query, {
    variables: { pageNum: 1, searchText: props.searchText, withTotalCount: props.withTotalCount },
    notifyOnNetworkStatusChange: true,
    onCompleted: data => {
      props.handleLoadComplete();
    }
  });

  const handleTableChange = (pagination: any, filters: any, sorter: any) => {
    props.handleLoadind();
    fetchMore({
      variables: {
        pageNum: pagination.current,
        searchText: props.searchText,
        withTotalCount: false
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          props.handleLoadComplete();
          return prev;
        }
        let ret = Object.assign({}, prev, {
          products: {
            Data: [...fetchMoreResult?.products.Data],
            TotalCount: prev.products.TotalCount,
            __typename: "ProductQueryViewModel"
          }
        });

        props.handleLoadComplete();
        return ret;
      }
    });
  };

  return (
    <Table
      scroll={{ y: "67vh" }}
      style={{ minHeight: "67vh" }}
      columns={columns}
      dataSource={data?.products.Data}
      rowKey="Id"
      loading={loading}
      pagination={{
        defaultCurrent: 1,
        total: data?.products.TotalCount,
        pageSize: 20
      }}
      onChange={handleTableChange}
    />
  );
};

export default ProductListTableComponent;
