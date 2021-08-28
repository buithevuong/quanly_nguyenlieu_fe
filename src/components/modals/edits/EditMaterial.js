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

function EditMaterial(props) {
  const [editData, setEditData] = useState(props.rowData);

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
          const value = i;
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
    message.success("Sửa nguyên liệu thành công");
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const onFinish = (values) => {
      console.log(values)
    let totalAmount = 0;
    values.suppliers.map((item) => {
      totalAmount += parseInt(item.amountMaterial);
    });


    var bodyFormData = new FormData();
    bodyFormData.append("id", parseInt(editData.id));
    bodyFormData.append("name", values.name);

    // if (values.image !== undefined) {
    //   bodyFormData.append("file", values.image.file.originFileObj);
    // }

    bodyFormData.append("threshold", parseFloat(values.threshold));
    bodyFormData.append("type", values.type);
    bodyFormData.append("total", parseFloat(totalAmount));

    bodyFormData.append("wthsJSON", JSON.stringify(values.thresholds));
    bodyFormData.append("suppliersJSON", JSON.stringify(values.suppliers));

    const token = localStorage.getItem("tokenAuthen");

    axios({
      method: "put",
      url: "http://localhost:8084/v1/material",
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
  }

  return (
    <div>
      <Button style={{ color: "orange" }} onClick={showModal}>
        <EditOutlined style={{ fontSize: 20 }} />
      </Button>

      <Modal
        title="Sửa nguyên liệu"
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
          defaultValue={editData}
        >
          <Form.Item
            name="name"
            initialValue={editData.name}
            value={editData.name}
            label="Tên nguyên liệu"
            rules={[
              {
                required: false,
                message: "Nhập tên nguyên liệu!",
              },
            ]}
          >
            <Input placeholder={editData.name} />
          </Form.Item>

          {/* <Form.Item
            name="image"
            type="file"
            label="File"
            rules={[
              {
                required: false,
                message: "Nhập ảnh nguyên liệu!",
              },
            ]}
          >
           
            <Upload>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item> */}


          <Form.Item
            initialValue={editData.type}
            name="type"
            label="Loại nguyên liệu"
            rules={[
              {
                required: false,
                message: "Nhập loại nguyên liệu!",
              },
            ]}
          >
            <Input
              placeholder="Loại nguyên liệu"
              
            />
          </Form.Item>


          <Form.List name="thresholds" initialValue={editData.threshold}>
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


          <Form.List name="suppliers" initialValue={editData.supplier}>
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
                      label="NCC"
                      rules={[{ required: true, message: "Nhập tên NCC" }]}
                    >
                      <Select
                        options={option}
                        style={{ width: 200 }}
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
                    Thêm nhà cung cấp
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

export default EditMaterial;
