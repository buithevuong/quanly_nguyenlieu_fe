import React from "react";
import { Modal, Button, Input, message, Upload } from "antd";
import { Select, Form, Space } from "antd";
import { useState } from "react";
import axios from "axios";
import {
  EditOutlined,
  MinusCircleOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";


function EditProduct(props) {
    const [editData, setEditData] = useState(props.rowData);

  const [option, setOption] = useState([]);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
    const token = localStorage.getItem("tokenAuthen");
    axios
      .get(`http://localhost:8084/v1/material`, {
        params: {
          page: 0,
          size: 9999,
        },
        headers: {'Authorization': token},
      })
      .then((res) => {
        const getName = [];

        res.data.map((i) => {
          const value = i.name;
          getName.push({ value });
        });

        setOption(getName);
      })
      .catch((error) => console.log(error));
  };

  const handleOk = () => {
    message.success("Sửa nguyên liệu thành công");
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const onFinish = (values) => {
      console.log(values)
    let amount = 0;
    values.materials.map((item) => {
      amount += parseInt(item.amountMaterial);
    });


    var bodyFormData = new FormData();
    bodyFormData.append("id", parseInt(editData.id));
    bodyFormData.append("name", values.name);
    bodyFormData.append("amount", amount);
    bodyFormData.append("status", values.status);

    // if (values.image !== undefined) {
    //   bodyFormData.append("file", values.image.file.originFileObj);
    // }
    bodyFormData.append("materialsJSON", JSON.stringify(values.materials));

    const token = localStorage.getItem("tokenAuthen");

    axios({
      method: "put",
      url: "http://localhost:8084/v1/product",
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
        title="Sửa sản phẩm"
        visible={isModalVisible}
        // okText='Thêm'
        // cancelText='Hủy'
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
            initialValue={editData.name}
            rules={[
              {
                required: true,
                message: "Nhập tên sản phẩm!",
              },
            ]}
          >
            <Input placeholder="Tên sản phẩm" />
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
            name="status"
            label="Trạng thái"
            initialValue={editData.status}
            rules={[
              {
                required: true,
                message: "Nhập trạng thái!",
              },
            ]}
          >
            <Input placeholder="Trạng thái" />
          </Form.Item>

          <Form.List name="materials" initialValue={editData.material}>
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, fieldKey, ...restField }) => (
                  <Space
                    key={key}
                    style={{ display: "flex", marginBottom: 8 }}
                    align="baseline"
                  >
                    <Form.Item
                      {...restField}
                      name={[name, "name"]}
                      fieldKey={[fieldKey, "nameMaterial"]}
                      rules={[{ required: true, message: "Nhập tên nguyên liệu" }]}
                    >
                      <Select
                        options={option}
                        style={{ width: 250 }}
                        onChange={handleChange}
                        placeholder="Chọn nguyên liệu"
                        showSearch
                      ></Select>
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "amountMaterial"]}
                      fieldKey={[fieldKey, "amountMaterial"]}
                      rules={[{ required: true, message: "Nhập số lượng" }]}
                    >
                      <Input placeholder="Số lượng nguyên liệu" />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Thêm nguyên liệu
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
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

export default EditProduct
