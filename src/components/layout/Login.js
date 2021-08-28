import React from "react";
import "antd/dist/antd.css";
import "./../../index.css";
import axios from "axios";
import { Form, Input, Button, Checkbox , message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useHistory } from "react-router";


function Login() {

    const history = useHistory();

    const onFinish = (values) => {
      
        axios
          .post("http://localhost:8084/authenticate", {
            username: values.username,
            password: values.password,
          })
          .then(function (response) {
            var authen = response.data;
            console.log(authen);
            if(authen.jwt !== undefined){
              message.success("Đăng nhập thành công");
      
              localStorage.setItem("idUser", authen.id);
              localStorage.setItem("email" , authen.email);
              localStorage.setItem("tokenAuthen" , "Bearer "+authen.jwt);
              history.push("/product");
            }else {
              message.error("Đăng nhập thất bại")
            }
            
            
          })
          .catch(function (error) {
            console.log(error);
            message.error("Đăng nhập thất bại");
          });
      };

  return (
    <div
      style={{
        paddingLeft: 500,
        paddingTop: 100,
        paddingBottom: 230,
        backgroundColor: "#84fc03",
      }}
    >
      <h1>Đăng nhập</h1>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        style={{ width: 400 }}
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Hãy nhập email",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
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
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Mật khẩu"
          />
        </Form.Item>

        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Nhớ đăng nhập</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="/forgot-password">
            Quên mật khẩu
          </a>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Đăng nhập
          </Button>
          {/* <Link to="/registration">
                   </Link> */}
          Or <a href="/registration">Đăng kí</a>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Login;
