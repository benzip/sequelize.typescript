import * as React from "react";
import { Table } from "antd";

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

const ProductListTableComponent = (props: any) => {
  return (
    <Table
      columns={columns}
      dataSource={props.data?.products}
      rowKey="Id"
      loading={props.loading}
      pagination={{
        defaultCurrent: 1,
        total: 200,
        onChange: (pageNum: number) => props.handlePageChange(pageNum)
      }}
    />
  );
};

export default ProductListTableComponent;
