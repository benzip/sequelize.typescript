import * as React from "react";
import ProductListTable from "./product.list.table.component";
import ListContentLayout from "../../layout/list.content.layout";
import { useQuery } from "@apollo/react-hooks";
import { Input } from "antd";
import gql from "graphql-tag";
const { Search } = Input;

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

const ProductListContainerComponent = () => {
  const [state, setSate] = React.useState({
    searchText: "",
    withTotalCount: true,
    currentPage: 1
  });

  const { data, loading, fetchMore } = useQuery<QueryData>(query, {
    variables: { pageNum: 1, searchText: state.searchText, withTotalCount: state.withTotalCount },
    notifyOnNetworkStatusChange: true
  });

  const onSearch = (searchText: string) => {
    setSate({
      withTotalCount: true,
      searchText: searchText,
      currentPage: 1
    });
  };

  const handlePageChange = (pageNum: any) => {
    fetchMore({
      variables: {
        pageNum: pageNum,
        searchText: state.searchText,
        withTotalCount: false
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        let ret = Object.assign({}, prev, {
          products: {
            Data: [...prev?.products.Data, ...fetchMoreResult?.products.Data],
            TotalCount: prev.products.TotalCount,
            __typename: "ProductQueryViewModel"
          }
        });
        return ret;
      }
    });
  };

  return (
    <ListContentLayout
      searchTextBox={<Search onSearch={value => onSearch(value)} placeholder="input search text" style={{ width: "100%" }} loading={loading} />}
      listContent={
        <ProductListTable
          searchText={state.searchText}
          data={data?.products.Data}
          totalCount={data?.products.TotalCount}
          loading={loading}
          currentPage={state.currentPage}
          handlePageChange={(pageNum: number) => handlePageChange(pageNum)}
        />
      }
    ></ListContentLayout>
  );
};

export default ProductListContainerComponent;
