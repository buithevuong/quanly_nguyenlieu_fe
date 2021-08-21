import React from 'react'
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

function ForgotPassword() {
    return (
        <div style={{ paddingLeft: 500, paddingTop: 100 ,paddingBottom:230 , backgroundColor:'#84fc03'}}>

            <h1>Quên mật khẩu</h1>
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                    remember: true,
                }}

                style={{ width: 400 }}
            >


                <Form.Item>
                <Input placeholder="Nhập email" />

                <Button type='primary'> Lấy mã đặt lại mật khẩu</Button>
                </Form.Item>

                <Form.Item>
                <Input placeholder="Nhập mã đặt lại mật khẩu" />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Hãy nhập mật khẩu',
                        },
                    ]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Mật khẩu"
                    />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Hãy nhập mật khẩu',
                        },
                    ]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Nhập lại mật khẩu"
                    />
                </Form.Item>

                <Button type='primary'> Đặt lại mật khẩu</Button>
            </Form>
        </div>
    )
}

export default ForgotPassword
