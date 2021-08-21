import React from "react";
import { Modal, Button, Input, message } from "antd";
import { Form, Space, Upload, Select } from "antd";
import { useState } from "react";
import axios from "axios";

import {
  MinusCircleOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";




function AddMaterial() {
  const [option, setOption] = useState([]);

  const [optionTH, setOptionTH] = useState([]);


  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
    const token = localStorage.getItem("tokenAuthen");

    axios
      .get(`http://localhost:8084/v1/supplier`, {
        params: {
          page: 0,
          size: 50,
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

      axios
      .get(`http://localhost:8084/v1/wth`, {
        headers: {'Authorization': token},
      })
      .then((res) => {
        const getName = [];

        res.data.map((i) => {
          const value = i.threshold;
          getName.push({ value });
        });

        setOptionTH(getName);
      })
      .catch((error) => console.log(error));
  };

  const handleOk = () => {
    message.success("Thêm nguyên liệu thành công");
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = async (values) => {
    let totalAmount = 0;
    values.suppliers.map((item) => {
      totalAmount += parseInt(item.amountMaterial);
    });

    console.log(values);

    var bodyFormData = new FormData();
    bodyFormData.append("name", values.name);
    //bodyFormData.append("file", values.image.file.originFileObj);
    bodyFormData.append("type", values.type);
    bodyFormData.append("total", totalAmount);
    bodyFormData.append("wthsJSON", JSON.stringify(values.thresholds));
    bodyFormData.append("suppliersJSON", JSON.stringify(values.suppliers));

    const token = localStorage.getItem("tokenAuthen");
    
    await axios({
      method: "post",
      url: "http://localhost:8084/v1/material",
      data: bodyFormData,
      headers: {'Authorization': token},
    })
      .then((response) => {
        console.log(response.data)
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
      <Button type="primary" onClick={showModal}>
        Thêm nguyên liệu mới
      </Button>
      <Modal
        title="Thêm nguyên liệu"
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
            rules={[
              {
                required: true,
                message: "Nhập tên nguyên liệu!",
              },
            ]}
          >
            <Input placeholder="Tên nguyên liệu" />
          </Form.Item>
{/* 
          <Form.Item
            name="image"
            type="file"
            rules={[
              {
                required: true,
                message: "Nhập ảnh nguyên liệu!",
              },
            ]}
          >
            
            <Upload >
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
            
          </Form.Item> */}


          <Form.Item
            name="type"
            rules={[
              {
                required: true,
                message: "Nhập loại nguyên liệu!",
              },
            ]}
          >
            <Input placeholder="Loại nguyên liệu" />
          </Form.Item>


          <Form.List name="thresholds">
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
                      name={[name, "threshold"]}
                      label="Chọn mức cảnh báo"
                      fieldKey={[fieldKey, "threshold"]}
                      rules={[{ required: true, message: "Chọn mức cảnh báo" }]}
                    >
                      <Select
                        options={optionTH}
                        style={{ width: 250 }}
                        onChange={handleChange}
                        showSearch
                      ></Select>
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
                    Thêm mức cảnh báo ( % )
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>


          <Form.List name="suppliers">
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
                      fieldKey={[fieldKey, "nameSupplier"]}
                      rules={[{ required: true, message: "Nhập tên NCC" }]}
                    >
                      <Select
                        options={option}
                        style={{ width: 250 }}
                        onChange={handleChange}
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
                    Thêm nhà cung cấp và số lượng
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
              Thêm
            </Button>
          </Form.Item>
        </Form>

        {/* <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="file" name='file' onChange={handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form> */}
      </Modal>
    </div>
  );
}

export default AddMaterial;
