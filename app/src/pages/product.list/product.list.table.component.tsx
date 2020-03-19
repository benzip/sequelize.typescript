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
  const handleTableChange = (pagination: any, filters: any, sorter: any) => {
    // const pager = { ...this.state.pagination };
    // pager.current = pagination.current;
    // this.setState({
    //   pagination: pager
    // });
    // this.fetch({
    //   results: pagination.pageSize,
    //   page: pagination.current,
    //   sortField: sorter.field,
    //   sortOrder: sorter.order,
    //   ...filters
    // });
    props.handlePageChange(pagination.current);
  };

  return (
    <Table
      scroll={{ y: "67vh" }}
      columns={columns}
      dataSource={props.data}
      rowKey="Id"
      loading={props.loading}
      pagination={{
        total: props.totalCount,
        pageSize: 20
      }}
      onChange={handleTableChange}
    />
  );
};

export default ProductListTableComponent;
