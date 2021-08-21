import React from "react";
import { Menu, Button, Row, Col } from "antd";
import { UserOutlined } from "@ant-design/icons";
import Notification from "../modals/Notification";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";

function Header(props) {
  const history = useHistory();

  function logoutHandle() {
    history.push("/login");
    localStorage.clear();
  }
  console.log(props.index);
  const index = props.index;

  const redirect = (e) => {
    console.log(e);
    switch (e.key) {
      case "2":
        history.push("/product");
        break;
      case "3":
        history.push("/user");
        break;
      case "4":
        history.push("/");
        break;
      default:
        break;
    }
  };

  return (
    <div className="header">
      <Row>
        <Col span={2}>
          <div className="logo" />
        </Col>
        <Col span={14}>
          <div className="title">
            Trang web quản lý nguyên liệu sản xuất nông sản{" "}
          </div>
        </Col>
        <Col span={8}>
          <div
            style={{
              marginTop: 30,
              marginLeft: 70,
            }}
          >
            {localStorage.getItem("tokenAuthen") !== null ? (
              <>
                <Notification />

                <Link to="/user" style={{ marginLeft: 15 }}>
                  <Button>
                    <UserOutlined />
                    Cá nhân
                  </Button>
                </Link>
                <Button style={{ marginLeft: 15 }} onClick={logoutHandle}>
                  Đăng xuất
                </Button>
              </>
            ) : (
              <Link to="/login">
                <Button style={{ marginLeft: 15 }}>Đăng nhập</Button>
              </Link>
            )}
          </div>
        </Col>
      </Row>

      <Menu
        className="menu1"
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={[index]}
        onClick={redirect}
      >
        <Menu.Item key="2">
          Quản lý
        </Menu.Item>
        <Menu.Item key="3">Cá nhân</Menu.Item>
        <Menu.Item key="4">Liên hệ</Menu.Item>
        <Menu.Item key="5">Hướng dẫn</Menu.Item>
      </Menu>
    </div>
  );
}

export default Header;
