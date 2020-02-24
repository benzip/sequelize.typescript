import { Layout, Menu, Icon } from "antd";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect, useHistory } from "react-router-dom";
import ProductListContainer from "../pages/product.list/product.list.container.component";
import UserListContainer from "../pages/user.list/user.list.container.component";
import UserRoleListContainer from "../pages/user.role.list/user.role.list.container.component";
import { withRouter } from "react-router-dom";
const { Header, Sider, Content } = Layout;

const Layout1 = (props: any) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const history = useHistory();
  const toggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  const routes = [
    {
      path: "/products",
      title: "Products",
      icon: "inbox"
    },
    {
      path: "/users",
      title: "Users",
      icon: "user"
    },
    {
      path: "/userroles",
      title: "User roles",
      icon: "audit"
    }
  ];

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={isCollapsed}>
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={[window.location.pathname]}>
          {routes.map((route: any) => (
            <Menu.Item key={route.path} onClick={() => history.push(route.path)}>
              <Icon type={route.icon} />
              <span>{route.title}</span>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: "#fff", padding: 0 }}>
          <Icon className="trigger" type={isCollapsed ? "menu-unfold" : "menu-fold"} onClick={() => toggle()} />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            background: "#fff",
            minHeight: 280
          }}
        >
          <Switch>
            <Route exact path="/products" component={() => <ProductListContainer />}></Route>
            <Route exact path="/users" component={() => <UserListContainer />}></Route>
            <Route exact path="/userroles" component={() => <UserRoleListContainer />}></Route>
          </Switch>
        </Content>
      </Layout>
    </Layout>
  );
};

export default withRouter(Layout1);
