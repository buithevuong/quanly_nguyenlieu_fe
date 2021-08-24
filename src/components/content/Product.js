import React from "react";
import "antd/dist/antd.css";
import {
  Table,
  Menu,
  Dropdown,
  Input,
  Pagination,
  Button,
  Popconfirm,
  message,
} from "antd";
import { Row, Col } from "antd";
import {
  DeleteOutlined,
  PauseCircleOutlined,
  ReloadOutlined,
  PlayCircleOutlined,
} from "@ant-design/icons";
import AddProduct from "../modals/AddProduct";
import axios from "axios";
import { useState, useEffect } from "react";
import EditProduct from "../modals/edits/EditProduct";
const { Search } = Input;

axios.defaults.headers.common['Authorization'] = localStorage.getItem("tokenAuthen");
axios.defaults.headers.common['userId'] = localStorage.getItem("idUser");

function confirm(e) {
  
  const param = { id: parseInt(e) };
  axios({
    method: "put",
    url: "http://localhost:8084/v1/product/remove",
    params: param,
  })
    .then((response) => {
      if(response.data.status === 0){
        message.success("Xóa thành công")
      }
      
      
    })
    .catch((error) => {
      message.error(error.message);
    });
}

function confirmPause(e) {
  
  const param = { id: parseInt(e) };
  
  axios({
    method: "put",
    url: "http://localhost:8084/v1/product/pause",
    params : param
  })
    .then((response) => {
      if(response.data.status === 2){
        message.success("Tạm dừng thành công");
      }else if(response.data.status === 1){
        message.success("khởi động thành công")
      }
      
      
    })
    .catch((error) => {
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
  {
    title: "Số lượng sản phẩm",
    width: 35,
    dataIndex: "amount",
    key: "2",
    sorter: {
      compare: (a, b) => a.amount - b.amount,
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
  //         src={"http://localhost:8084/images/" + record}
  //         alt="hinh anh"
  //         style={{ width: "50px", height: "50px" }}
  //       />
  //     );
  //   },
  // },
  {
    title: "Loại nguyên liệu / Số lượng nguyên liệu (gam)",
    dataIndex: "material",
    key: "4",
    width: 55,
    render: (record) => {
      return record.map((item) => {
        return (
          <p style={{ color: "blue" }}>
            {item.name} : <span style={{ color: "brown" }}>{item.amountMaterial}</span>
          </p>
        );
      });
    },
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    key: "5",
    width: 30,
    render: (record) => {
      if (record === 1) {
        return <p style={{ color: "green" }}>{"Đang sản xuất"}</p>;
      } else if (record === 2) {
        return <p style={{ color: "orange" }}>{"Tạm dừng"}</p>;
      } else {
        return <p style={{ color: "red" }}>{"Đã xong"}</p>;
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
    title: "Tạm dừng",
    key: "operation",
    width: 20,
    render: (row) => (
      <Popconfirm
        title={row.status ===2 ?"Đồng ý chạy ?" : "Đồng ý tạm dừng ?"}
        onConfirm={() => confirmPause(row.id)}
        onCancel={cancel}
        okText="Có"
        cancelText="Không"
      >
        {row.status === 2 ? (
          <Button style={{ color: "orange" }}>
            <PauseCircleOutlined style={{ fontSize: 20 }} />
          </Button>
        ) : (
          <Button style={{ color: "green" }}>
            <PlayCircleOutlined style={{ fontSize: 20 }} />
          </Button>
        )}
      </Popconfirm>
    ),
  },
  {
    title: "Sửa",
    key: "operation",
    width: 20,
    render: (row) => <EditProduct rowData={row} />,
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

const list_sort = (
  <Menu>
    <Menu.Item key="0">
      <a href="/product">Theo tên</a>
    </Menu.Item>
    <Menu.Item key="1">
      <a href="/product">Theo số lượng</a>
    </Menu.Item>
  </Menu>
);


function Product(props) {

  axios.defaults.headers.common['Authorization'] = localStorage.getItem("tokenAuthen");


  const [dataTable, setDataTable] = useState([]);

  const [dataLoaded, setDataLoaded] = useState(false);

  const [pageCurrent, setPageCurrent] = useState(1);

  const [numberData, setNumberData] = useState(10);

  const [nameProduct, setNameProduct] = useState("");

  function onchangePage(page) {
    setPageCurrent(page);
    console.log(pageCurrent);
  }

  const onSearch = (e) => {
    setNameProduct(e);
    setPageCurrent(1);
  };
  

  useEffect(() => {
    var status;
    if(props.select === "2"){
      status = 1;
    }else if(props.select === "3"){
      status = 0;
    }
    axios
      .get(`http://localhost:8084/v1/product/search`, {
        params: {
          page: pageCurrent - 1,
          size: numberData,
          name: nameProduct,
          status : status,
        },
      })
      .then((res) => {
        setDataTable(
          res.data.map((row) => ({
            id: row.id,
            name: row.name,
            amount: row.amount,
            //imageUrl: row.image,
            material: row.materials,
            status: row.status,
            created_at: row.createdAt,
            updated_at: row.updatedAt,
          }))
        );
        setDataLoaded(true);
      })
      .catch((error) => console.log(error));
  }, [pageCurrent, numberData, nameProduct, props.select]);

  const resetAllChange = () => {
    setNameProduct("");

    if (numberData === 10) {
      setNumberData(11);
    } else {
      setNumberData(10);
    }
    setPageCurrent(1);
  };

  return (
    <div>
      <Row gutter={16}>
        <Col className="gutter-row" span={6}>
          <AddProduct />
        </Col>
        <Col className="gutter-row" span={12}>
          <Search
            placeholder="nhập tên sản phẩm ..."
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
        title={() => "Danh sách sản phẩm"}
        dataSource={dataTable}
        scroll={{ x: 1000, y: 1600 }}
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

export default Product;
