import * as React from "react";
import ProductListTable from "./product.list.table.component";
import ListPageLayout from "../../layout/list-page-layout/list.page.layout";
import { useMutation } from "@apollo/react-hooks";
import { Input, Form, Button, Modal } from "antd";
import Product from "src/models/product";
import ProductMutationViewModel from "src/models/product.mutation.viewmodel";
import ProductIdentityViewModel from "src/models/product.identity.viewmodel";
import FormDialog from "../../components/form.dialog";
import ProductEntryForm from "./form/product.entry.form";
import gql from "graphql-tag";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const { Search } = Input;

interface ComponentState {
  searchText: string;
  withTotalCount: boolean;
  loading: boolean;
  showEditDialog: boolean;
  saveLoading: boolean;
  selectedRecord?: Product;
  reload: boolean;
  pageNum: any;
}

const createProductMutation = gql`
  mutation($input: ProductMutationViewModel!) {
    createProduct(input: $input) {
      Id
      SearchName
      ProductName
      Category
      CategoryDTO {
        Id
        Name
      }
    }
  }
`;

const updateProductMutation = gql`
  mutation($id: ProductIdentityViewModel!, $input: ProductMutationViewModel!) {
    updateProduct(id: $id, input: $input) {
      Id
      SearchName
      ProductName
      Category
      CategoryDTO {
        Id
        Name
      }
    }
  }
`;

const deleteProductMutation = gql`
  mutation($id: ProductIdentityViewModel!) {
    deleteProduct(id: $id)
  }
`;

const ProductListContainerComponent = () => {
  const [form] = Form.useForm();

  const [state, setSate] = React.useState<ComponentState>({
    searchText: "",
    withTotalCount: true,
    loading: true,
    showEditDialog: false,
    saveLoading: false,
    reload: false,
    selectedRecord: Object.assign({}),
    pageNum: 1
  });

  const [createProduct] = useMutation<
    {
      createProduct: Product;
    },
    {
      input: ProductMutationViewModel;
    }
  >(createProductMutation);

  const [updateProduct] = useMutation<
    {
      updateProduct: Product;
    },
    {
      id: ProductIdentityViewModel;
      input: ProductMutationViewModel;
    }
  >(updateProductMutation);

  const [deleteProduct] = useMutation<
    {
      deleteProduct: Product;
    },
    {
      id: ProductIdentityViewModel;
    }
  >(deleteProductMutation);

  const onSearch = (searchText: string) => {
    setSate({
      ...state,
      withTotalCount: true,
      searchText: searchText,
      pageNum: 1,
      loading: state.searchText != searchText
    });
  };

  const handleLoadComplete = (pageNum: any) => {
    setSate({
      ...state,
      loading: false,
      reload: false,
      pageNum: pageNum
    });
  };

  const handleLoading = (pageNum: any) => {
    setSate({
      ...state,
      loading: true,
      reload: false,
      pageNum: pageNum,
      withTotalCount: true
    });
  };

  const handleEdit = (record: Product) => {
    form.setFields([
      {
        name: ["ProductName"],
        value: record.ProductName
      },
      {
        name: ["SearchName"],
        value: record.SearchName
      },
      {
        name: ["Category"],
        value: record.Category
      }
    ]);
    setSate({
      ...state,
      showEditDialog: true,
      selectedRecord: { ...record }
    });
  };

  const handleDelete = (record: Product) => {
    const { confirm } = Modal;
    confirm({
      title: `Do you want to delete data?`,
      icon: <ExclamationCircleOutlined />,
      content: `${record.ProductName}`,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      async onOk() {
        await deleteProduct({
          variables: {
            id: { Id: record.Id }
          }
        });

        setSate({
          ...state,
          saveLoading: false,
          showEditDialog: false,
          selectedRecord: undefined,
          reload: true,
          withTotalCount: true
        });
      },
      onCancel() {
        console.log("Cancel");
      }
    });
  };

  const handleSubmitForm = async () => {
    let withTotalCount = false;
    try {
      const validateResult = await form.validateFields();
      const values = form.getFieldsValue();
      console.log("Success:", values);
      setSate({
        ...state,
        saveLoading: true
      });

      if (state.selectedRecord && state.selectedRecord.Id) {
        await updateProduct({
          variables: {
            id: { Id: state.selectedRecord.Id },
            input: { ProductName: values.ProductName, SearchName: values.SearchName, Category: values.Category }
          }
        });
      } else {
        await createProduct({
          variables: { input: { ProductName: values.ProductName, SearchName: values.SearchName, Category: values.Category } }
        });
        withTotalCount = true;
      }
      setSate({
        ...state,
        saveLoading: false,
        showEditDialog: false,
        selectedRecord: undefined,
        reload: true,
        withTotalCount: withTotalCount
      });
      form.resetFields();
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

  const handleAddRow = () => {
    setSate({
      ...state,
      showEditDialog: true,
      selectedRecord: undefined
    });
  };

  return (
    <React.Fragment>
      <ListPageLayout
        commandToolBar={
          <Button
            onClick={handleAddRow}
            type="primary"
            style={{
              marginBottom: 16
            }}
          >
            Add a row
          </Button>
        }
        searchTextBox={<Search onSearch={value => onSearch(value)} placeholder="input search text" style={{ width: "100%" }} loading={state.loading} />}
        listContent={
          <ProductListTable
            reload={state.reload}
            searchText={state.searchText}
            withTotalCount={state.withTotalCount}
            handleLoadComplete={handleLoadComplete}
            handleLoading={handleLoading}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            pageNum={state.pageNum}
          />
        }
      ></ListPageLayout>
      {state.showEditDialog && (
        <FormDialog form={form} title="Product entry" visible={state.showEditDialog} onSubmit={handleSubmitForm} confirmLoading={state.saveLoading} onCancel={handleDialogEditClose}>
          <ProductEntryForm selectedRecord={state.selectedRecord} form={form}></ProductEntryForm>
        </FormDialog>
      )}
    </React.Fragment>
  );
};

export default ProductListContainerComponent;
