import * as React from "react";
import ProductListTable from "./product.list.table.component";
import ListContentLayout from "../../layout/list.content.layout";
import { useQuery } from "@apollo/react-hooks";
import { Input } from "antd";
const { Search } = Input;

const ProductListContainerComponent = () => {
  const [state, setSate] = React.useState({
    searchText: "",
    withTotalCount: true,
    loading: true
  });

  const onSearch = (searchText: string) => {
    setSate({
      withTotalCount: true,
      searchText: searchText,
      loading: state.searchText != searchText
    });
  };

  const handleLoadComplete = () => {
    setSate({
      ...state,
      loading: false
    });
  };

  const handleLoadind = () => {
    setSate({
      ...state,
      loading: true
    });
  };

  return (
    <ListContentLayout
      searchTextBox={<Search onSearch={value => onSearch(value)} placeholder="input search text" style={{ width: "100%" }} loading={state.loading} />}
      listContent={<ProductListTable searchText={state.searchText} withTotalCount={state.withTotalCount} handleLoadComplete={handleLoadComplete} handleLoadind={handleLoadind} />}
    ></ListContentLayout>
  );
};

export default ProductListContainerComponent;
