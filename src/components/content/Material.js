import React from "react";
import "antd/dist/antd.css";
import { Table, Menu, Dropdown, Input, Pagination, Button } from "antd";
import { Row, Col, Popconfirm, message } from "antd";
import AddMaterial from "./../modals/AddMaterial";
import axios from "axios";
import { useState, useEffect } from "react";
import EditMaterial from "../modals/edits/EditMaterial";
import { DeleteOutlined, ReloadOutlined } from "@ant-design/icons";
const { Search } = Input;

axios.defaults.headers.common['Authorization'] = localStorage.getItem("tokenAuthen");
axios.defaults.headers.common['userId'] = localStorage.getItem("idUser");

function confirm(e) {
  axios
    .put("http://localhost:8084/v1/material/remove?id=" + e)
    .then(function (response) {
      console.log(response.data);
      if (response.data.status === 0) {
        message.success("Xóa nguyên liệu thành công");
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
    width: 40,
    dataIndex: "name",
    key: "1",
    sorter: {
      compare: (a, b) => a.name.localeCompare(b.name),
      multiple: 2,
    },
  },
  // {
  //   title: "Hình ảnh",
  //   dataIndex: "image",
  //   key: "2",
  //   width: 40,
  //   render: (record) => {
  //     return (
  //       <img
  //         src={"http://localhost:8084/images/" + record}
  //         alt="hinh anh"
  //         style={{ width: "80px", height: "80px" }}
  //       />
  //     );
      
  //   },
  // },
  {
    title: "Loại",
    dataIndex: "type",
    key: "9",
    width: 20,
    render: (record) => {
      return <p>{record}</p>;
    },
  },
  {
    title: "Số lượng nguyên liệu / Tổng (gam)",
    dataIndex: "currentAmount",
    key: "3",
    width: 40,
    sorter: {
      compare: (a, b) => a.currentAmount.amount - b.currentAmount.amount,
      multiple: 2,
    },
    render: (record) => {
      return (
        <div>
          <p>
            {record.amount}/{record.total} <span style={{color:"red"}}>({((record.amount / record.total) * 100).toFixed(2)}%)</span>
          </p>
        </div>
      );
    },
  },
  {
    title: "Nhà cung cấp : Số lượng cung cấp(gam)",
    dataIndex: "supplier",
    key: "7",
    width: 55,
    render: (record) => {
      return record.map((item) => {
        return (
          <p>
            <span
              style={{
                width: 120,
                color: "blue",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {item.name}
            </span>

            <span style={{ color: "brown" }}>: {item.amountMaterial}</span>
          </p>
        );
      });
    },
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    key: "4",
    width: 25,
    render: (record) => {
      if (record === 1) {
        return <p style={{ color: "green" }}>{"Còn hàng"}</p>;
      }else if(record ===2 ){
        return <p style={{ color: "orange" }}>{"Còn ít"}</p>;
      } else {
        return <p style={{ color: "red" }}>{"Đã hết"}</p>;
      }
    },
  },
  {
    title: "Ngưỡng cảnh báo",
    dataIndex: "threshold",
    width: 22,
    render: (record) => {
      return record.map((item) => {
        return (
<p style={{ color: item.color }}>{item.threshold} %</p>
        )
      });
      
    },
  },
  {
    title: "Thời gian tạo",
    dataIndex: "createdAt",
    key: "5",
    width: 30,
    render: (record) => {
      return (
        <p style={{ color: "brown" }}>{new Date(record).toLocaleString()}</p>
      );
    },
  },
  {
    title: "Thời gian sửa",
    dataIndex: "updatedAt",
    key: "6",
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
    render: (row) => <EditMaterial rowData={row} />,
  },
  {
    title: "Xóa",
    key: "operation",
    width: 20,
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

function Material(props) {
  axios.defaults.headers.common['Authorization'] = localStorage.getItem("tokenAuthen");


  const [dataTable, setDataTable] = useState([]);

  const [dataLoaded, setDataLoaded] = useState(false);

  const [pageCurrent, setPageCurrent] = useState(1);

  const [numberData, setNumberData] = useState(10);

  const [nameMaterial, setNameMaterial] = useState("");

  const [typeMaterial, setTypeMaterial] = useState("");

  const list_sort = (
    <Menu onClick={(e) => setTypeMaterial(e.key)}>
      <Menu.Item key="">Tất cả</Menu.Item>
      <Menu.Item key="Hạt">Hạt</Menu.Item>
      <Menu.Item key="Bột">Bột</Menu.Item>
      <Menu.Item key="Củ">Củ</Menu.Item>
      <Menu.Item key="Hoa quả">Hoa quả</Menu.Item>
    </Menu>
  );

  function onchangePage(page) {
    setPageCurrent(page);
    setDataLoaded(false);
  }

  useEffect(() => {
    var status;
    if(props.select === "5"){
      status = 1;
    }else if(props.select === "6"){
      status = 0;
    }

    axios
      .get(`http://localhost:8084/v1/material/search`, {
        params: {
          page: pageCurrent - 1,
          size: numberData,
          name: nameMaterial,
          type: typeMaterial,
          status : status
        },
      })
      .then((res) => {
        
        setDataTable(
          res.data.map((row) => ({
            id: row.id,
            name: row.name,
            //image: row.image,
            status: row.status,
            type: row.type,
            threshold: row.wtDtos,
            currentAmount: { amount: row.currentAmount, total: row.total },
            createdAt: row.createdAt,
            updatedAt: row.updatedAt,
            supplier: row.suppliers,
          }))
        );
        setDataLoaded(true);
      })
      .catch((error) => console.log(error));
  }, [pageCurrent, numberData, nameMaterial, typeMaterial, props.select]);

  function onChange(pagination, filters, sorter, extra) {
    console.log("params", pagination, filters, sorter, extra);
  }

  const onSearch = (value) => {
    if(value !== nameMaterial){
      setNameMaterial(value);
      setPageCurrent(1);
      setDataLoaded(false);
    }
    
  };

  const resetAllChange = () => {
    setNameMaterial("");
    setTypeMaterial("");
    if (numberData === 10) {
      setNumberData(11);
    } else {
      setNumberData(10);
    }
    setPageCurrent(1);
    setDataLoaded(false);
  };

  return (
    <div>
      <Row gutter={16}>
        <Col className="gutter-row" span={6}>
          <AddMaterial />
        </Col>
        <Col className="gutter-row" span={12}>
          <Search
            placeholder="nhập tên nguyên liệu ..."
            allowClear
            enterButton="Tìm kiếm"
            size="large"
            onSearch={onSearch}
            style={{ width: 450 }}
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
            <Button>{typeMaterial !== "" ? typeMaterial : "Tất cả"}</Button>
          </Dropdown>
        </Col>
      </Row>

      <Table
        rowKey={(record) => record.id}
        columns={columns}
        title={() => "Danh sách nguyên liệu"}
        dataSource={dataTable}
        scroll={{ x: 1000, y: 1600 }}
        bordered
        size="small"
        loading={!dataLoaded}
        pagination={false}
        onChange={onChange}
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

export default Material;
