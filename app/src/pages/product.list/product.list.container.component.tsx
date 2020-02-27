import * as React from "react";
import ProductListTable from "./product.list.table.component";
import ListContentLayout from "../../layout/list.content.layout";
import { useQuery } from "@apollo/react-hooks";
import { Input } from "antd";
import gql from "graphql-tag";
const { Search } = Input;

interface Product {
  ProductName: string;
  SearchName: string;
}

interface QueryData {
  products: Product[];
}

const query = gql`
  query Product($pageNum: Int!) {
    products(pageNum: $pageNum,filter : ) {
      Id
      ProductName
      SearchName
    }
  }
`;

const ProductListContainerComponent = () => {
  const { data, loading, fetchMore } = useQuery<QueryData>(query, {
    variables: { pageNum: 1 },
    notifyOnNetworkStatusChange: true
  });

  const [searchText, setSetSearchText] = React.useState("");

  return (
    <ListContentLayout
      searchTextBox={<Search onSearch={value => setSetSearchText(value)} placeholder="input search text" style={{ width: "100%" }} loading={loading} />}
      listContent={
        <ProductListTable
          searchText={searchText}
          data={data}
          loading={loading}
          handlePageChange={(pageNum: number) =>
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
            })
          }
        />
      }
    ></ListContentLayout>
  );
};

export default ProductListContainerComponent;
