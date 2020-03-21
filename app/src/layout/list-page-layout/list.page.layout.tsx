import React from "react";
import { Row, Col } from "antd";

const ListPageLayout = (props: any) => {
  const { searchTextBox, listContent, commandToolBar } = props;
  return (
    <React.Fragment>
      <Row justify="end" gutter={[16, 16]}>
        <Col span={16}>{commandToolBar}</Col>
        <Col span={8}>{searchTextBox}</Col>
      </Row>
      <Row>
        <Col span={24}> {listContent}</Col>
      </Row>
    </React.Fragment>
  );
};

export default ListPageLayout;
