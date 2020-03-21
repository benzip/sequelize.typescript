import React from "react";
import { Select } from "antd";
import ProductCategoryQueryViewModel from "src/models/product.category.query.viewmodel";
import { useQuery } from "@apollo/react-hooks";
import ComboBoxOption from "src/models/combobox.option";
import gql from "graphql-tag";
import ProductCategory from "src/models/product.category";

const { Option } = Select;
interface QueryData {
  productCategories: ProductCategoryQueryViewModel;
}
interface ComponentState {
  options: ComboBoxOption[];
  value: any;
}

const SearchComboBox = (props: any) => {
  const [state, setState] = React.useState<ComponentState>({
    options: [],
    value: props.value || ""
  });

  const { data, loading, fetchMore } = useQuery<QueryData>(props.query, {
    variables: { pageNum: -1, searchText: props.searchText || "", withTotalCount: true },
    notifyOnNetworkStatusChange: true,
    onCompleted: data => {}
  });

  const handleSearch = (value: string) => {
    if (value) {
      fetchMore({
        variables: {
          pageNum: -1,
          searchText: value,
          withTotalCount: true
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) {
            return prev;
          }
          let ret = Object.assign({}, prev, {
            productCategories: {
              Data: [...fetchMoreResult?.productCategories.Data],
              TotalCount: prev.productCategories.TotalCount,
              __typename: "ProductQueryViewModel"
            }
          });
          return ret;
        }
      });
    }
  };

  const handleChange = (value: string) => {
    setState({ ...state, value: value });
    props.handleChange && props.handleChange(value);
  };

  const options = data?.productCategories.Data.map((d: ProductCategory) => (
    <Option key={d.Id} value={d.Id.toString()}>
      {d.Name}
    </Option>
  ));

  return (
    <Select
      showSearch
      value={state.value.toString()}
      placeholder={props.placeholder}
      style={props.style}
      defaultActiveFirstOption={false}
      showArrow={false}
      filterOption={false}
      onSearch={handleSearch}
      onChange={handleChange}
      notFoundContent={null}
    >
      {options}
    </Select>
  );
};

export default SearchComboBox;
