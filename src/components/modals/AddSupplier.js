import React from "react";
import { Button, Modal, Input , Upload, Form, message } from "antd";
import {
  UserOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import axios from "axios";

function AddSupplier() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
    const token = localStorage.getItem("tokenAuthen");
  };

  const handleOk = () => {
    setIsModalVisible(false);
    message.success("Thêm thành công");
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = (values) => {
    console.log(values);
    
    const token = localStorage.getItem("tokenAuthen");
    var bodyFormData = new FormData();
    
    bodyFormData.append("name", values.name);
    bodyFormData.append("address", values.address);
    bodyFormData.append("phone", values.phone);
    bodyFormData.append("email", values.email);

    // if (values.image !== undefined) {
    //   bodyFormData.append("file", values.image.file.originFileObj);
    // }
      axios({
        method: "post",
        url: "http://localhost:8084/v1/supplier",
        data: bodyFormData,
        headers: {'Authorization': token},
      })
        .then((response) => {
          console.log(response.data);
          
          handleOk();
          
        })
        .catch((error) => {
          message.error(error.message);
        });
  };

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Thêm nhà cung cấp mới
      </Button>
      <Modal
        title="Thêm nhà cung cấp"
        visible={isModalVisible}
        footer={null}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          name="dynamic_form_nest_item"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            name="name"
            label="Tên nhà cung cấp"
            rules={[
              {
                required: true,
                message: "Nhập tên sản phẩm!",
              },
            ]}
          >
            <Input
              className="input-add"
              placeholder="Nhập tên nhà cung cấp"

            />
          </Form.Item>

          {/* <Form.Item
            name="image"
            type="file"
            rules={[
              {
                required: true,
                message: "Nhập ảnh sản phẩm!",
              },
            ]}
          >
            
            <Upload>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
           
          </Form.Item> */}

          <Form.Item
            name="address"
            label="Địa chỉ"
            rules={[
              {
                required: true,
                message: "Nhập địa chỉ nhà cung cấp!",
              },
            ]}
          >
            <Input
              className="input-add"
              placeholder="Nhập địa chỉ nhà cung cấp"
              
            />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Số điện thoại"
            rules={[
              {
                required: true,
                message: "Nhập sdt nhà cung cấp!",
                
              },
              {
                message: "Sdt không đúng!",
                pattern : /((09|03|07|08|05)+([0-9]{8})\b)/g,
              },
            ]}
          >
            <Input
              className="input-add"
              placeholder="Nhập số điện thoại nhà cung cấp"
             
            />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                message: "Nhập email nhà cung cấp!",
              },
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              }
            ]}
          >
            <Input
              className="input-add"
              placeholder="Nhập email nhà cung cấp"
              
            />
          </Form.Item>

          <Form.Item>
            <Button
              onClick={handleCancel}
              style={{ marginLeft: 330, marginRight: 10 }}
            >
              Hủy
            </Button>

            <Button type="primary" htmlType="submit">
              Thêm
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default AddSupplier;
