import * as React from "react";
import { Modal } from "antd";
import { Form } from "antd";

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24
    },
    sm: {
      span: 9
    }
  },
  wrapperCol: {
    xs: {
      span: 24
    },
    sm: {
      span: 12
    }
  }
};

const FormDialog = (props: any) => {
  const handleOk = () => {
    props.onSubmit();
  };

  return (
    <Modal title={props.title} visible={props.visible} onOk={handleOk} confirmLoading={props.confirmLoading} onCancel={props.onCancel} width={props.width}>
      <Form form={props.form} {...formItemLayout}>
        {props.children}
      </Form>
    </Modal>
  );
};

export default FormDialog;
