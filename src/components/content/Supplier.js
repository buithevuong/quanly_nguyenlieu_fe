import React from "react";
import "antd/dist/antd.css";
import { Table, Menu, Dropdown, Input, Pagination, Button ,Popconfirm , message} from "antd";
import { Row, Col } from "antd";
import AddSupplier from "./../modals/AddSupplier";
import { useState, useEffect } from "react";
import axios from "axios";
import { DeleteOutlined ,ReloadOutlined } from "@ant-design/icons";
import EditSupplier from "../modals/edits/EditSupplier";

const { Search } = Input;

function confirm(e) {
  const token = localStorage.getItem("tokenAuthen");
    
  axios
    .put("http://localhost:8084/v1/supplier/remove?id=" + e ,
    {
      headers: {'Authorization': token},

    })
    .then(function (response) {
      console.log(response.data);
      if (response.data.status === 0) {
        message.success("Xóa nhà cung cấp thành công");
      }
    })
    .catch(function (error) {
      message.error(error.message);
    });
}

function cancel(e) {
  console.log(e);
}

const columns = [
  {
    title: "Id",
    width: 20,
    dataIndex: "id",
    key: "11",
    sorter: {
      compare: (a, b) => a.id - b.id,
      multiple: 2,
    },
  },
  {
    title: "Tên",
    width: 35,
    dataIndex: "name",
    key: "1",
    sorter: {
      compare: (a, b) => a.name.localeCompare(b.name),
      multiple: 2,
    },
  },
  {
    title: "Địa chỉ",
    width: 50,
    dataIndex: "address",
    key: "2",
    sorter: {
      compare: (a, b) => a.address.localeCompare(b.address),
      multiple: 2,
    },
  },
  // {
  //   title: "Hình ảnh",
  //   dataIndex: "imageUrl",
  //   key: "3",
  //   width: 40,
  //   render: (record) => {
  //     return (
  //       <img
  //         src={"http://localhost:8084/images/"+record}
  //         alt="hinh anh"
  //         style={{ width: "50px", height: "50px" }}
  //       />
  //     );
  //   },
  // },
  {
    title: "Số điện thoại",
    dataIndex: "phone",
    key: "4",
    width: 36,
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "5",
    width: 50,
    sorter: {
      compare: (a, b) => a.email.localeCompare(b.email),
      multiple: 2,
    },
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    key: "5",
    width: 30,
    render: (record) => {
      if(record===1){
        return <p style={{ color: "green" }}>{"Đang hoạt động"}</p>;
      }else if(record ===2){
        return <p style={{ color: "orange" }}>{"Tạm dừng"}</p>;
      }else {
        return <p style={{ color: "green" }}>{"Ngưng hoạt động"}</p>;
      }
    },
  },
  {
    title: "Thời gian tạo",
    dataIndex: "created_at",
    key: "6",
    width: 30,
    render: (record) => {
      return (
        <p style={{ color: "brown" }}>{new Date(record).toLocaleString()}</p>
      );
    },
  },
  {
    title: "Thời gian sửa",
    dataIndex: "updated_at",
    key: "7",
    width: 30,
    render: (record) => {
      return (
        <p style={{ color: "brown" }}>{new Date(record).toLocaleString()}</p>
      );
    },
  },
  {
    title: "Sửa",
    key: "operation",
    width: 20,
    render: (row) => (
      <EditSupplier  rowData={row}/>
    ),
  },
  {
    title: "Xóa",
    key: "operation",
    width: 25,
    render: (row) => (
      <Popconfirm
        title="Đồng ý xóa?"
        onConfirm={() => confirm(row.id)}
        onCancel={cancel}
        okText="Có"
        cancelText="Không"
      >
        <Button id="delete_product">
          <DeleteOutlined style={{ fontSize: 20 }} />
        </Button>
      </Popconfirm>
    ),
  },
];



const list_sort = (
  <Menu>
    <Menu.Item key="0">
      <a href="/supplier">Theo tên</a>
    </Menu.Item>
    <Menu.Item key="1">
      <a href="/supplier">Theo số lượng</a>
    </Menu.Item>
  </Menu>
);


function Supplier(props) {
  
  const [dataTable, setDataTable] = useState([]);

  const [dataLoaded, setDataLoaded] = useState(false);

  const [pageCurrent, setPageCurrent] = useState(1);

  const [numberData, setNumberData] = useState(10);

  const [nameSupplier, setNameSupplier] = useState("");

  const [phoneSupplier, setPhoneSupplier] = useState("");

  const [emailSupplier, setEmailSupplier] = useState("");

  function onchangePage(page) {
    setPageCurrent(page);
    setDataLoaded(false);
  }

  const onSearch = (e) => {
    const validateEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const validatePhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

    setPageCurrent(1);
    if(e!== emailSupplier && validateEmail.test(String(e).toLowerCase())){
      setEmailSupplier(e);
      setDataLoaded(false);
    }else if(e!== phoneSupplier && validatePhone.test(String(e).toLowerCase())){
      setPhoneSupplier(e);
      setDataLoaded(false);
    }else if(e!== nameSupplier){
      setNameSupplier(e);
      setDataLoaded(false);
    }
    
  };

  useEffect(() => {
    const token = localStorage.getItem("tokenAuthen");
    var status;
    if(props.select === "8"){
      status = 1;
    }else if(props.select === "9"){
      status = 2;
    }

    axios
      .get(`http://localhost:8084/v1/supplier/search`, {
        params: {
          page: pageCurrent - 1,
          size: numberData,
          name: nameSupplier,
          phone: phoneSupplier,
          email : emailSupplier,
          status : status
        },
        headers: {'Authorization': token},
      })
      .then((res) => {
        setDataTable(
          res.data.map((row) => ({
            id: row.id,
            name: row.name,
            address : row.address,
            phone : row.phone ,
            email : row.email,
            imageUrl: row.image,
            status: row.status,
            
            created_at: row.createdAt,
            updated_at: row.updatedAt,
          }))
        );

        setDataLoaded(true);
      })
      .catch((error) => console.log(error));
  }, [pageCurrent, numberData, nameSupplier, phoneSupplier, emailSupplier, props.select]);

  const resetAllChange = () => {
    setNameSupplier("");
    setPhoneSupplier("");
    setEmailSupplier("");
    if(numberData === 10){
      setNumberData(11);
    }else {
      setNumberData(10);
    }
    setPageCurrent(1);
    setDataLoaded(false);
  };

  return (
    <div>
      <Row gutter={16}>
        <Col className="gutter-row" span={6}>
          <AddSupplier />
        </Col>
        <Col className="gutter-row" span={12}>
          <Search
            placeholder="nhập tên hoặc số điện thoại hoặc email ..."
            allowClear
            enterButton="Tìm kiếm"
            size="large"
            onSearch={onSearch}
            style={{ width: 500 }}
          />
        </Col>
        <Col className="gutter-row" span={2}>
          <Button onClick={resetAllChange}>
            <ReloadOutlined />
            Reload
          </Button>
        </Col>
        <Col className="gutter-row" span={4}>
          <Dropdown
            className="sort_product_dropdown"
            overlay={list_sort}
            trigger={["click"]}
          >
            {/* <a className="sort_product" onClick={e => e.preventDefault()}>
                    Bộ lọc
                </a> */}
            <Button>Bộ lọc</Button>
          </Dropdown>
        </Col>
      </Row>

      <Table
        rowKey={(record) => record.id}
        columns={columns}
        title={() => "Danh sách nhà cung cấp"}
        dataSource={dataTable}
        scroll={{ x: 1000, y: 1000 }}
        bordered
        pagination={false}
        size="small"
        loading={!dataLoaded}
        style={{
          marginTop: 20,
        }}
      />

      <Pagination
        current={pageCurrent}
        onChange={onchangePage}
        total={50}
        style={{ float: "right", marginTop: 30 }}
      />
    </div>
  );
}

export default Supplier;
