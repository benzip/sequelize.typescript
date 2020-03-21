import * as React from "react";
import { Table, Button } from "antd";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Product from "../../models/product";
import ProductQueryViewModel from "../../models/product.query.viewmodel";

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
        Category
        CategoryDTO {
          Id
          Name
        }
      }
      TotalCount
    }
  }
`;

const rowSelection = {
  onChange: (selectedRowKeys: any, selectedRows: any) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, "selectedRows: ", selectedRows);
  },
  getCheckboxProps: (record: any) => ({
    disabled: record.name === "Disabled User",
    // Column configuration not to be checked
    name: record.name
  })
};
const pageSize = 20;

const ProductListTableComponent = (props: any) => {
  const columns = [
    {
      title: "Product name",
      dataIndex: "ProductName",
      key: "ProductName"
    },
    {
      title: "Search name",
      dataIndex: "SearchName",
      key: "SearchName"
    },
    {
      title: "Category",
      dataIndex: "CategoryDTO",
      render: (text: any, row: Product, index: any) => {
        return row.CategoryDTO.Name;
      }
    },
    {
      dataIndex: "operation",
      render: (_: any, record: Product) => {
        return (
          <React.Fragment>
            <Button onClick={() => edit(record)} type="dashed">
              Edit
            </Button>
            {"   "}
            <Button onClick={() => deleteData(record)} type="danger">
              Delete
            </Button>
          </React.Fragment>
        );
      }
    }
  ];

  const { data, loading, fetchMore, refetch } = useQuery<QueryData>(query, {
    variables: { pageNum: 1, searchText: props.searchText, withTotalCount: true },
    notifyOnNetworkStatusChange: true,
    onCompleted: data => {
      props.handleLoadComplete(props.pageNum);
    }
  });

  const edit = (record: Product) => {
    props.handleEdit(record);
  };

  const deleteData = (record: Product) => {
    props.handleDelete(record);
  };

  const reloadData = (pageNum: any) => {
    props.handleLoading(pageNum);
    fetchMore({
      variables: {
        pageNum: pageNum,
        searchText: props.searchText,
        withTotalCount: props.withTotalCount
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          props.handleLoadComplete(pageNum);
          return prev;
        }
        let ret = Object.assign({}, prev, {
          products: {
            Data: [...fetchMoreResult?.products.Data],
            TotalCount: props.withTotalCount ? fetchMoreResult?.products.TotalCount : prev.products.TotalCount,
            __typename: "ProductQueryViewModel"
          }
        });
        props.handleLoadComplete(pageNum);
        return ret;
      }
    });
  };

  const handleTableChange = (pagination: any, filters: any, sorter: any) => {
    reloadData(pagination.current);
  };

  if (props.reload) {
    reloadData(props.pageNum);
  }

  const actualPageNum = Math.ceil((data?.products.TotalCount || 0) / pageSize);
  if (actualPageNum && props.pageNum && actualPageNum < props.pageNum) {
    reloadData(actualPageNum);
  }
  return (
    <React.Fragment>
      <Table
        scroll={{ y: "67vh" }}
        style={{ minHeight: "67vh" }}
        columns={columns}
        dataSource={data?.products.Data}
        rowKey="Id"
        loading={loading}
        pagination={{
          defaultCurrent: 1,
          current: actualPageNum < props.pageNum ? actualPageNum : props.pageNum,
          total: data?.products.TotalCount,
          pageSize: pageSize
        }}
        onChange={handleTableChange}
      />
    </React.Fragment>
  );
};

export default ProductListTableComponent;
