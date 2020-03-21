import * as React from "react";
import ProductListTable from "./product.list.table.component";
import ListPageLayout from "../../layout/list-page-layout/list.page.layout";
import { useQuery } from "@apollo/react-hooks";
import { Input, Form, DatePicker, TimePicker, Select, Cascader, InputNumber } from "antd";
import Product from "src/models/product";
import FormDialog from "../../components/form.dialog";
import ProductEntryForm from "./form/product.entry.form";
import { FormInstance } from "antd/lib/form/util";

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
  const [form] = Form.useForm();
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

  const handleSubmitForm = async () => {
    try {
      const validateResult = await form.validateFields();
      const values = form.getFieldsValue();
      console.log("Success:", values);
      setSate({
        ...state,
        saveLoading: false
      });
    } catch (errorInfo) {
      console.log("Failed:", errorInfo);
    }
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
        <FormDialog form={form} title="Product entry" visible={state.showEditDialog} onSubmit={handleSubmitForm} confirmLoading={state.saveLoading} onCancel={handleDialogEditClose}>
          <ProductEntryForm form={form}></ProductEntryForm>
        </FormDialog>
      )}
    </React.Fragment>
  );
};

export default ProductListContainerComponent;
