import React from 'react'
import { Modal, Button, Input, message } from "antd";
import { Form} from "antd";
import { useState } from "react";
import axios from "axios";
import {
  EditOutlined,
} from "@ant-design/icons";


function EditSupplier(props) {
    const [editData, setEditData] = useState(props.rowData);

    const [option, setOption] = useState([]);
  
    const [isModalVisible, setIsModalVisible] = useState(false);
  
    const showModal = () => {
      setIsModalVisible(true);
    };
  
    const handleOk = () => {
      message.success("Sửa nhà cung cấp thành công");
      setIsModalVisible(false);
    };
  
    const handleCancel = () => {
      setIsModalVisible(false);
    };
    const onFinish = (values) => {
        console.log(values);
      
      var bodyFormData = new FormData();
      bodyFormData.append("id", parseInt(editData.id));
      bodyFormData.append("name", values.name);
      bodyFormData.append("address", values.address);
      bodyFormData.append("phone", values.phone);
      bodyFormData.append("email", values.email);
      bodyFormData.append("status", values.status);
  
      // if (values.image !== undefined) {
      //   bodyFormData.append("file", values.image.file.originFileObj);
      // }
      
      const token = localStorage.getItem("tokenAuthen");
      
      axios({
        method: "put",
        url: "http://localhost:8084/v1/supplier",
        data: bodyFormData,
        headers: {'Authorization': token,
        'userId' : localStorage.getItem("idUser")
      },
      })
        .then((response) => {
          console.log(response.data);
          
          handleOk();
          
        })
        .catch((error) => {
          message.error(error.message);
        });
    };
  
    function handleChange(event) {
      console.log(event);
    }
  
    return (
      <div>
        <Button style={{ color: "orange" }} onClick={showModal}>
          <EditOutlined style={{ fontSize: 20 }} />
        </Button>
  
        <Modal
          title="Sửa nhà cung cấp"
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
            initialValue={editData.name}
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
                required: false,
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
            initialValue={editData.address}
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
            initialValue={editData.phone}
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
            initialValue={editData.email}
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

          <Form.Item
            name="status"
            label="Trạng thái"
            initialValue={editData.status}
            rules={[
              {
                required: true,
                message: "Nhập trạng thái",
              }
            ]}
          >
            <Input
              className="input-add"
              placeholder="Trạng thái"
              
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
              Sửa
            </Button>
          </Form.Item>
        </Form>
        </Modal>
      </div>
    );
}

export default EditSupplier
