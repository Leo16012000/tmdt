import { React, useState, useEffect, Suspense } from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import "antd/dist/antd.css";
import "../styles/Admin.css";
import { Layout, Menu, Breadcrumb } from "antd";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import Axios from "axios";
import { Table, Tag, Space } from "antd";
import Collections from "./Collections";
const { Column, ColumnGroup } = Table;

const { SubMenu } = Menu;
const { Content, Sider } = Layout;

function Admin() {
  return (
    <div className="Admin">
      <Router>
        <Layout>
          <Layout>
            <Sider width={300} className="site-layout-background">
              <Menu
                mode="inline"
                defaultSelectedKeys={["1"]}
                defaultOpenKeys={["sub1"]}
                style={{ height: "100%", borderRight: 0 }}
              >
                <SubMenu
                  key="sub1"
                  icon={<UserOutlined />}
                  title="Tài khoản khách hàng"
                >
                  <Menu.Item key="1">
                    <Link to="/admin/users">
                      Danh sách thông tin khách hàng
                    </Link>
                  </Menu.Item>
                </SubMenu>
                <SubMenu
                  key="sub2"
                  icon={<LaptopOutlined />}
                  title="Thông tin sản phẩm"
                >
                  <Menu.Item key="5">
                    <Link to="/admin/collections">
                      Danh sách thông tin sản phẩm
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="6">Thêm sản phẩm mới</Menu.Item>
                </SubMenu>
                <SubMenu
                  key="sub3"
                  icon={<NotificationOutlined />}
                  title="Đơn hàng"
                >
                  <Menu.Item key="7">
                    <Link to="/admin/orders">Quản lý đơn hàng</Link>
                  </Menu.Item>
                </SubMenu>
              </Menu>
            </Sider>
            <Layout style={{ padding: "0 24px 24px" }}>
              <Breadcrumb style={{ margin: "16px 0" }}></Breadcrumb>

              <Content
                className="site-layout-background"
                style={{
                  padding: 24,
                  margin: 0,
                  minHeight: 280,
                }}
              >
                Danh sách sản phẩm
                <Suspense fallback={<h1>....</h1>}>
                  <Switch>
                    <Route exact path="/admin/users">
                      <UserData />
                    </Route>

                    <Route exact path="/admin/collections">
                      <CollectionData />
                    </Route>

                    <Route exact path="/admin/orders">
                      <OrdersData />
                    </Route>
                  </Switch>
                </Suspense>
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </Router>
    </div>
  );
}

function OrdersData() {
  const [item, setItem] = useState([]);

  useEffect(() => {
    Axios.get(`http://localhost:3001/getAllOrders`).then((response) => {
      setItem(response.data);
    });
  });

  return (
    <Table dataSource={item}>
      <Column title="Mã đơn hàng" dataIndex="ID" key="ID" />
      <Column title="Email" dataIndex="UserEmail" key="UserEmail" />
      <Column title="Địa chỉ" dataIndex="Address" key="Address" />
      <Column title="Tổng tiền" dataIndex="TotalPrice" key="TotalPrice" />
    </Table>
  );
}

function CollectionData() {
  const [item, setItem] = useState([]);

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  useEffect(() => {
    Axios.get(`http://localhost:3001/collections`).then((response) => {
      setItem(response.data);
    });
  });

  return (
    <Table dataSource={item}>
      <Column title="ID" dataIndex="ID" key="ID" />
      <Column title="Name" dataIndex="Fullname" key="Fullname" />
      <Column
        title="Price"
        dataIndex="Price"
        key="Price"
        render={(Price) => numberWithCommas(Price)}
      />
      <Column title="State" dataIndex="State" key="State" />
    </Table>
  );
}

function UserData() {
  const [item, setItem] = useState([]);

  useEffect(() => {
    Axios.get(`http://localhost:3001/users`).then((response) => {
      setItem(response.data);
    });
  });

  return (
    <Table dataSource={item}>
      <Column title="ID" dataIndex="ID" key="ID" />
      <Column title="Name" dataIndex="Fullname" key="Fullname" />
      <Column title="Phone Number" dataIndex="PhoneNum" key="PhoneNum" />
      <Column title="Email" dataIndex="Email" key="Email" />
      <Column title="Address" dataIndex="Address" key="Address" />
    </Table>
  );
}

export default Admin;
