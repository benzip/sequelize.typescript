import React from "react";
import { Form, Input, DatePicker, TimePicker, Select, Cascader, InputNumber } from "antd";
import SearchComboBox from "../../../components/search.combobox";
import gql from "graphql-tag";
import ProductCategoryQueryViewModel from "src/models/product.category.query.viewmodel";
import ComboBoxOption from "src/models/combobox.option";
import ReactDOM from "react-dom";

interface QueryData {
  productCategories: ProductCategoryQueryViewModel;
}

const query = gql`
  query ProductCategories($pageNum: Int!, $searchText: String!, $withTotalCount: Boolean!) {
    productCategories(pageNum: $pageNum, searchText: $searchText, withTotalCount: $withTotalCount) {
      Data {
        Id
        Name
      }
      TotalCount
    }
  }
`;

interface ComponentState {
  productCategoriesComboBoxOptions: ComboBoxOption[];
}

const ProductEntryForm = (props: any) => {
  const [state, setState] = React.useState<ComponentState>({
    productCategoriesComboBoxOptions: []
  });

  const handleProductCategoryChange = (value: any) => {
    props.form.setFields([{ name: ["Category"], value: parseInt(value) }]);
  };

  const EntryForm = () => {
    return (
      <React.Fragment>
        <Form.Item label="Product name" rules={[{ required: true, message: "Please input product name!" }]} name="ProductName">
          <Input placeholder="T-shirt" />
        </Form.Item>
        <Form.Item label="Search name" rules={[{ required: true, message: "Please input search name!" }]} name="SearchName">
          <Input placeholder="T shirt" />
        </Form.Item>
        <Form.Item label="Category" name="Category" rules={[{ required: true, message: "Please input category!" }]}>
          {query && <SearchComboBox query={query} searchText={props.selectedRecord?.CategoryDTO.Name} handleChange={handleProductCategoryChange}></SearchComboBox>}
        </Form.Item>
      </React.Fragment>
    );
  };

  return <React.Fragment>{<EntryForm></EntryForm>}</React.Fragment>;
};

export default ProductEntryForm;
