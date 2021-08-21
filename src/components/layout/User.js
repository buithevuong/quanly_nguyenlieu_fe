import React from "react";
import "antd/dist/antd.css";
import "./../../index.css";
import { Avatar, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useHistory } from "react-router";
import { useState } from "react";
import { Form, Input, Checkbox, message } from "antd";
import axios from "axios";
import Header from "./Header";
import Footer from "./footer";

function User() {
  const history = useHistory();
  const [changePass, setChangePass] = useState(false);

  function logoutHandle() {
    history.push("/login");
    localStorage.clear();
  }

  function changePassHandle() {
    if (changePass === false) {
      setChangePass(true);
    } else {
      setChangePass(false);
    }
  }
  const onFinish = (values) => {
    axios
      .post("http://localhost:8084/authenticate", {
        username: values.username,
        password: values.password,
      })
      .then(function (response) {})
      .catch(function (error) {
        console.log(error);
        message.error("Đăng nhập thất bại");
      });
  };

  return (
    <div>
      <Header index="3" />

      <div style={{paddingLeft:400 , height:'100%' , minHeight:330}}>
        <h3 style={{ marginTop: 50 }}>
          Tài khoản : {localStorage.getItem("email")}
        </h3>
        <Avatar size={100} icon={<UserOutlined />} />
        <br />
        <Button
          type="primary"
          onClick={changePassHandle}
          style={{ marginTop: 50, marginRight: 50 }}
        >
          Đổi mật khẩu
        </Button>

        {changePass === true ? (
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            style={{ width: 400, marginTop: 50 }}
          >
            <Form.Item
              name="repassword"
              rules={[
                {
                  required: true,
                  message: "Hãy nhập mật khẩu",
                },
              ]}
            >
              <Input type="password" placeholder="Nhập mật khẩu hiện tại" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Hãy nhập mật khẩu",
                },
              ]}
            >
              <Input type="password" placeholder="Nhập mật khẩu mới" />
            </Form.Item>

            <Form.Item
              name="repassword"
              rules={[
                {
                  required: true,
                  message: "Hãy nhập lại mật khẩu",
                },
              ]}
            >
              <Input type="password" placeholder="Nhập lại mật khẩu mới" />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Đổi mật khẩu
              </Button>
            </Form.Item>
          </Form>
        ) : null}

        
      </div>

      <Footer />
    </div>
  );
}

export default User;
