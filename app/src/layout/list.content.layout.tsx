import React from "react";
import { Row, Col } from "antd";

const ListContentLayout = (props: any) => {
  const { searchTextBox, listContent } = props;
  return (
    <React.Fragment>
      <Row type="flex" justify="end" gutter={[16, 16]}>
        <Col span={6}>{searchTextBox}</Col>
      </Row>
      <Row>
        <Col span={24}> {listContent}</Col>
      </Row>
    </React.Fragment>
  );
};

export default ListContentLayout;
