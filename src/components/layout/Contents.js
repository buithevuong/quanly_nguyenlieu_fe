import React from "react";
import Product from "./../content/Product";
import Material from "./../content/Material";
import Supplier from "../content/Supplier.js";
import { Layout, Menu } from "antd";
import {
  AppleOutlined,
  UserDeleteOutlined,
  UpSquareOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
const { SubMenu } = Menu;
const { Sider, Content } = Layout;

function Contents() {
  const [selectedMenuItem, setSelectedMenuItem] = useState("1");


  const routes = [
    {
      path: "/product",
      exact: true,
      slider: () =>   <Sider className="site-layout-background" width={170}>
      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        style={{ height: "100%" }}
        selectedKeys={selectedMenuItem}
        onClick={(e) => setSelectedMenuItem(e.key)}
      >
        <SubMenu key="sub1" icon={<AppleOutlined />} title="Sản phẩm">
          <Menu.Item key="1"><Link to="/product">Toàn Bộ</Link></Menu.Item>
          <Menu.Item key="2"><Link to="/product">Đang sản xuất</Link></Menu.Item>
          <Menu.Item key="3"><Link to="/product">Đã hoàn thành</Link></Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" icon={<UpSquareOutlined />} title="Nguyên liệu">
          <Menu.Item key="4"><Link to="/material">Toàn Bộ</Link></Menu.Item>
          <Menu.Item key="5"><Link to="/material">Còn hàng</Link></Menu.Item>
          <Menu.Item key="6"><Link to="/material">Đã hết</Link></Menu.Item>
        </SubMenu>
        <SubMenu
          key="sub3"
          icon={<UserDeleteOutlined />}
          title="Nhà cung cấp"
        >
          <Menu.Item key="7"><Link to="/supplier">Toàn Bộ</Link></Menu.Item>
          <Menu.Item key="8"><Link to="/supplier">Đang hoạt động</Link></Menu.Item>
          <Menu.Item key="9"><Link to="/supplier">Dừng hoạt động</Link></Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>,
      main: () => <Product  select={selectedMenuItem}/>
    },
    {
      path: "/material",
      exact: true,
      slider: () =>   <Sider className="site-layout-background" width={170}>
      <Menu
        mode="inline"
        defaultSelectedKeys={["4"]}
        defaultOpenKeys={["sub2"]}
        style={{ height: "100%" }}
        selectedKeys={selectedMenuItem}
        onClick={(e) => setSelectedMenuItem(e.key)}
      >
        <SubMenu key="sub1" icon={<AppleOutlined />} title="Sản phẩm">
          <Menu.Item key="1"><Link to="/product">Toàn Bộ</Link></Menu.Item>
          <Menu.Item key="2"><Link to="/product">Đang sản xuất</Link></Menu.Item>
          <Menu.Item key="3"><Link to="/product">Đã hoàn thành</Link></Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" icon={<UpSquareOutlined />} title="Nguyên liệu">
          <Menu.Item key="4"><Link to="/material">Toàn Bộ</Link></Menu.Item>
          <Menu.Item key="5"><Link to="/material">Còn hàng</Link></Menu.Item>
          <Menu.Item key="6"><Link to="/material">Đã hết</Link></Menu.Item>
        </SubMenu>
        <SubMenu
          key="sub3"
          icon={<UserDeleteOutlined />}
          title="Nhà cung cấp"
        >
          <Menu.Item key="7"><Link to="/supplier">Toàn Bộ</Link></Menu.Item>
          <Menu.Item key="8"><Link to="/supplier">Đang hoạt động</Link></Menu.Item>
          <Menu.Item key="9"><Link to="/supplier">Dừng hoạt động</Link></Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>,
      main: () => <Material  select={selectedMenuItem}/>
    },
    {
      path: "/supplier",
      exact: true,
      slider: () =>   <Sider className="site-layout-background" width={170}>
      <Menu
        mode="inline"
        defaultSelectedKeys={["7"]}
        defaultOpenKeys={["sub3"]}
        style={{ height: "100%" }}
        selectedKeys={selectedMenuItem}
        onClick={(e) => setSelectedMenuItem(e.key)}
      >
        <SubMenu key="sub1" icon={<AppleOutlined />} title="Sản phẩm">
          <Menu.Item key="1"><Link to="/product">Toàn Bộ</Link></Menu.Item>
          <Menu.Item key="2"><Link to="/product?done=0">Đang sản xuất</Link></Menu.Item>
          <Menu.Item key="3"><Link to="/product?done=1">Đã hoàn thành</Link></Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" icon={<UpSquareOutlined />} title="Nguyên liệu">
          <Menu.Item key="4"><Link to="/material">Toàn Bộ</Link></Menu.Item>
          <Menu.Item key="5"><Link to="/material?conhang=1">Còn hàng</Link></Menu.Item>
          <Menu.Item key="6"><Link to="/material?conhang=0">Đã hết</Link></Menu.Item>
        </SubMenu>
        <SubMenu
          key="sub3"
          icon={<UserDeleteOutlined />}
          title="Nhà cung cấp"
        >
          <Menu.Item key="7"><Link to="/supplier">Toàn Bộ</Link></Menu.Item>
          <Menu.Item key="8"><Link to="/supplier?hoatdong=1">Đang hoạt động</Link></Menu.Item>
          <Menu.Item key="9"><Link to="/supplier?hoatdong=0">Dừng hoạt động</Link></Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>,
      main: () => <Supplier select={selectedMenuItem}/>
    }
  ];

  return (
    <>
      <Layout className="site-layout-background" style={{ padding: "24px 0" , backgroundColor:"#e0ffc2" }}>
        
      <Switch>
            {routes.map((route, index) => (
              // Render more <Route>s with the same paths as
              // above, but different components this time.
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                children={<route.slider />}
              />
            ))}
          </Switch>
        <Content style={{ padding: "0 24px", minHeight: 280 }}>
          {/* {componentsSwtich(selectedMenuItem)} */}
          <Switch>
            {routes.map((route, index) => (
              // Render more <Route>s with the same paths as
              // above, but different components this time.
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                children={<route.main />}
              />
            ))}
          </Switch>
        </Content>
      </Layout>
    </>
  );
}

export default Contents;
