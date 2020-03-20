import * as React from "react";
import ProductListTable from "./product.list.table.component";
import ListPageLayout from "../../layout/list-page-layout/list.page.layout";
import { useQuery } from "@apollo/react-hooks";
import { Input, Form, DatePicker, TimePicker, Select, Cascader, InputNumber } from "antd";
import Product from "src/models/product";
import FormDialog from "../../components/form.dialog";
import ProductEntryForm from "./form/product-entry-form";

const { Search } = Input;

interface ComponentState {
  searchText: string;
  withTotalCount: boolean;
  loading: boolean;
  showEditDialog: boolean;
  saveLoading: boolean;
  selectedRecord: Product;
}

const ProductListContainerComponent = () => {
  const [state, setSate] = React.useState<ComponentState>({
    searchText: "",
    withTotalCount: true,
    loading: true,
    showEditDialog: false,
    saveLoading: false,
    selectedRecord: Object.assign({})
  });

  const onSearch = (searchText: string) => {
    setSate({
      ...state,
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

  const handleEdit = (record: Product) => {
    setSate({
      ...state,
      showEditDialog: true,
      selectedRecord: { ...record }
    });
  };

  const handleDialogEditOk = (record: Product) => {
    setSate({
      ...state,
      // showEditDialog: false,
      saveLoading: true
    });
  };
  const handleDialogEditClose = () => {
    setSate({
      ...state,
      showEditDialog: false
    });
  };

  return (
    <React.Fragment>
      <ListPageLayout
        searchTextBox={<Search onSearch={value => onSearch(value)} placeholder="input search text" style={{ width: "100%" }} loading={state.loading} />}
        listContent={
          <ProductListTable searchText={state.searchText} withTotalCount={state.withTotalCount} handleLoadComplete={handleLoadComplete} handleLoadind={handleLoadind} handleEdit={handleEdit} />
        }
      ></ListPageLayout>
      {state.showEditDialog && (
        <FormDialog title="Product entry" visible={state.showEditDialog} onOk={handleDialogEditOk} confirmLoading={state.saveLoading} onCancel={handleDialogEditClose}  >
          <ProductEntryForm></ProductEntryForm>
        </FormDialog>
      )}
    </React.Fragment>
  );
};

export default ProductListContainerComponent;
