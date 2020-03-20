import * as React from "react";
import { Modal } from "antd";

const FormDialog = (props: any) => {
  return (
    <Modal title={props.title} visible={props.visible} onOk={props.onOk} confirmLoading={props.confirmLoading} onCancel={props.onCancel} width={props.width}>
      {props.children}
    </Modal>
  );
};

export default FormDialog;
