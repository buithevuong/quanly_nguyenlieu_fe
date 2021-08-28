import React from 'react'
import 'antd/dist/antd.css';
import './../../index.css';
import { Form, Input, Select, Button , message ,DatePicker } from 'antd';
import { useHistory } from "react-router";
import axios from "axios";

const { Option } = Select;



const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 16,
        },
    },
};

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};


function Registration() {

    const history = useHistory();


    const back = () => {
        history.push("/login");
      }
    const onFinish = (values) => {
        var localDate = values.birth._d;
        console.log(localDate);
        console.log(values);
        axios
          .post("http://localhost:8084/registration", {
              name : values.nickname,
              gender : values.gender,
              birth : values.birth.localDate,
              email : values.email,
              phone : values.phone,
            password: values.password,
          })
          .then(function (response) {
              console.log(response.data)
              if(response.data.code === 200 ){
                message.success("Đăng kí thành công");
              }else {
                message.error("Đăng kí thất bại");
              }
          })
          .catch(function (error) {
            console.log(error);
            message.error("Đăng kí thất bại");
          });
      };


    return (
        <div style={{ paddingLeft: 300, paddingTop: 50 ,paddingBottom:230 , backgroundColor:'#84fc03'}}>
            <h1>Đăng kí</h1>
            <Form
                {...formItemLayout}
                name="register"
                onFinish={onFinish}
                scrollToFirstError
                style={{ width: 600 }}
            >
                <Form.Item
                    name="email"
                    label="E-mail"
                    rules={[
                        {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                        },
                        {
                            required: true,
                            message: 'Please input your E-mail!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Mật khẩu"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="confirm"
                    label="Nhập lại mật khẩu"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }

                                return Promise.reject(new Error('The two passwords that you entered do not match!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="nickname"
                    label="Tên tài khoản"
                    tooltip="What do you want others to call you?"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your nickname!',
                            whitespace: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="phone"
                    label="Số điện thoại"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your phone number!',
                        },
                    ]}
                >
                    <Input
                        style={{
                            width: '100%',
                        }}
                    />
                </Form.Item>



                <Form.Item
                    name="gender"
                    label="Giới tính"
                    rules={[
                        {
                            required: true,
                            message: 'Please select gender!',
                        },
                    ]}
                >
                    <Select placeholder="Chọn giới tính">
                        <Option value="male">Nam</Option>
                        <Option value="female">Nữ</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    name="birth"
                    label="Ngày sinh"
                    rules={[
                        {
                            required: true,
                            message: 'Please select birth!',
                        },
                    ]}
                >
                    <DatePicker/>
                </Form.Item>
                

                <Form.Item {...tailFormItemLayout}>
                <Button style={{marginRight:50}} onClick={back}>Back</Button>
                    <Button type="primary" htmlType="submit">
                        Đăng kí
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Registration
