import React from "react";
import { Button, Badge, Card } from "antd";
import { NotificationOutlined } from "@ant-design/icons";
import axios from "axios";
import { useState, useEffect } from "react";
import { red } from "@material-ui/core/colors";

function Notification() {
  const [isDisplay, setIsDisplay] = useState("none");

  const [noti, setNoti] = useState([]);

  const [isChecked, setIsChecked] = useState(0);

  const [pageCurrent, setPageCurrent] = useState(0);

  const [numberData, setNumberData] = useState(5);

  const show = () => {
    if (isDisplay === "none") {
      setIsDisplay("block");
    } else {
      setIsDisplay("none");
    }
  };

  const previousHandle = () => {
    var value = pageCurrent;
    console.log(pageCurrent);
    if (value > 0) {
    setPageCurrent(value-1);
}
  };

  const nextHandle = () => {
    var value = pageCurrent;
    console.log(pageCurrent);
    
      setPageCurrent(value+1);
    
  };

  function clickCheckedNoti() {
      console.log("checked")
  }

  useEffect(() => {
    const token = localStorage.getItem("tokenAuthen");
    axios
      .get(`http://localhost:8084/v1/alert`, {
        params: {
          page: pageCurrent,
          size: numberData,
        },
        headers: {'Authorization': token},
      })
      .then((res) => {
        setIsChecked(res.data.totalNotCheck);
        setNoti(res.data.alerts);
      })
      .catch((error) => console.log(error));
  }, [numberData, pageCurrent, isDisplay]);

  return (
    <>
      <Badge count={isChecked} overflowCount={5}>
        <Button style={{ borderColor: "red" }} onClick={show}>
          <NotificationOutlined />
          Thông báo
        </Button>
      </Badge>

      <Card
        title="THÔNG BÁO"
        style={{
          width: 320,
          display: isDisplay,
          position: "absolute",
          marginTop: 20,
          backgroundColor: "#f7d38f",
          borderColor: "brown",
        }}
      >
        {noti.map((i) => {
          return (
            <div style={{ backgroundColor: i.isChecked===1?"#f5be58":"#f7d38f" }} onClick={clickCheckedNoti}>
              <h4 style={{ color: "black" }}>{i.title}</h4>
              <p style={{ color: i.color }}>
                [{i.materialName}] : {i.content}
              </p>
              <p style={{ color: "black" }}>
               Tại lúc : {new Date(i.createdAt).toLocaleString()}
              </p>
            </div>
          );
        })}
        <Button
          type="primary"
          onClick={previousHandle}
          style={{ float: "left" }}
        >
          Previous
        </Button>
        <Button type="primary" onClick={nextHandle} style={{ float: "right" }}>
          Next
        </Button>
      </Card>
    </>
  );
}

export default Notification;
