import React from "react";
import { Form, Input, Button, message } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { useHistory } from "react-router";
import { useState } from "react";
import axios from "axios";

function ForgotPassword() {
  const history = useHistory();

  const [email, setEmail] = useState("");

  const onFinish1 = (values) => {
    setEmail(values.email);
    axios
      .post("http://localhost:8084/reset-password", null, {
        params: { email: values.email },
      })
      .then(function (response) {
        if (response.data.data === true) {
          message.success(
            "Gửi yêu cầu thành công , vui lòng kiểm tra email để lấy mã"
          );
        }
      })
      .catch(function (error) {
        console.log(error);
        message.error("Gửi thất bại");
      });
  };

  const onFinish2 = (values) => {
    axios
      .put("http://localhost:8084/change-password", null, {
        params: {
          email: email,
          password: values.fpassword,
          token: values.tokenReset,
        },
      })
      .then(function (response) {
        message.success("Đổi mật khẩu thành công");
      })
      .catch(function (error) {
        console.log(error);
        message.error("Không tành công");
      });
  };

  const back = () => {
    history.push("/login");
  }

  return (
    <div
      style={{
        paddingLeft: "30%",
        paddingTop: "8%",
        paddingBottom: "8%",
        backgroundColor: "#84fc03",
      }}
    >
      <h1>Quên mật khẩu</h1>
      <Form
        onFinish={onFinish1}
        name="get-token"
        className="get-token-form"
        style={{ width: "50%" }}
      >
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              required: true,
              message: "Nhập email",
            },
          ]}
        >
          <Input type="text" placeholder="Nhập email" 
            style={{marginLeft:85}}/>
        </Form.Item>

        <Form.Item
        label="Lấy mã đặt lại ">
          <Button type="primary" htmlType="submit"
            style={{marginLeft:45}}>
            Lấy mã
          </Button>
        </Form.Item>
      </Form>

      <Form
        onFinish={onFinish2}
        name="change-password"
        className="change-pass-form"
        style={{ width: "50%" }}
      >
        <Form.Item
          name="tokenReset"
          label="Mã đặt lại mật khẩu"
          rules={[
            {
              required: true,
              message: "Hãy nhập mã mật khẩu",
            },
          ]}
        >
          <Input placeholder="Nhập mã đặt lại mật khẩu" />
        </Form.Item>

        <Form.Item
          name="fpassword"
          label="Mật khẩu"
          rules={[
            {
              required: true,
              message: "Hãy nhập mật khẩu",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Mật khẩu"
            style={{marginLeft:65}}
          />
        </Form.Item>

        <Form.Item
          name="frepassword"
          label="Nhập lại mật khẩu"
          rules={[
            {
              required: true,
              message: "Hãy nhập lại mật khẩu",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Nhập lại mật khẩu"
            
            style={{marginLeft:10}}
          />
        </Form.Item>

        <Form.Item>
          <Button style={{marginRight:50}} onClick={back}>Back</Button>
          <Button type="primary" htmlType="submit" 
            style={{marginLeft:35}}>
            Đặt lại mật khẩu
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default ForgotPassword;
