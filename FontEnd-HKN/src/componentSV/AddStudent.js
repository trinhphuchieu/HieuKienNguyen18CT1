import React, { useState, setState, useEffect } from 'react'
import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  Typography,
  Modal,
  DatePicker
} from 'antd';
import '../StyleForm.css';
import axios from "axios";
const apiURL = "http://localhost:5000"

axios
  .get(apiURL)
  .then((response) => {
    setState(response.message);
  })
  .catch((error) => {
    console.log(error);
  });
const postTheSVAPI = (data) => {
  const url = "http://localhost:5000/api/themsv";
  return axios.post(url, data);
};

function AddStudent() {


  let anh;
  // UPPPLOADIMAGE------------------

  const payload = new FormData();
  // Handles file upload event and updates state

  const [isModalVisible, setIsModalVisible] = useState(false);

  //------------------------------------END


  const { Title } = Typography;

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  function countDown() {
    let secondsToGo = 3;
    const modal = Modal.success({
      title: 'Xử Lý Thành Công!',
      content: `Đang Chuyển Trang......`,
    });

    const timer = setInterval(() => {
      secondsToGo -= 1;
      modal.update({
        content: `Vui Lòng Chờ  ${secondsToGo} giây.`,
        okText: `Hủy`,
      });
    }, 1000);
    setTimeout(() => {
      clearInterval(timer);
      window.location.href = 'http://localhost:3000/trangchu/suasv/'
    }, secondsToGo * 1000);
  }
  const handleOk = () => {
    countDown();
    setIsModalVisible(false);
  };

  const ThemSinhVien = () => {


    const onFinish = (fieldsValue) => {
      setIsModalVisible(true);

      const payload = new FormData();

      Object.keys(fieldsValue).forEach((key) => {
        payload.append(key, fieldsValue[key]);
      });


      console.log(fieldsValue);
      for (var value of payload.entries()) {
        console.log(value);
      }
      postTheSVAPI(payload);
    };




    return (
      <Form

        labelCol={{ span: 4 }}
        wrapperCol={{ span: 10 }}
        layout="horizontal"
        onFinish={onFinish}
      >


        <Form.Item label="* Mã số Sinh Viên :" name="mssv" wrapperCol={{
          sm: { span: 5, offset: 0 },
        }}>
          <Input type="text" autoComplete="off" />
        </Form.Item>

        <Form.Item label="Họ Tên :" name="ten" wrapperCol={{
          sm: { span: 8, offset: 0 },
        }}>
          <Input autoComplete="off" />
        </Form.Item>


        <Form.Item label="Điạ Chỉ:" name="diachi"
          wrapperCol={{
            sm: { span: 11, offset: 0 },
          }}>

          <Input.TextArea autoComplete="off" />
        </Form.Item>

        <Form.Item label="Số Điện Thoại:" name="sodienthoai" wrapperCol={{
          sm: { span: 4, offset: 0 },
        }}>
          <Input type="text" autoComplete="off" />
        </Form.Item>

        <Form.Item label="Nơi:" name="noisinh"
          wrapperCol={{
            sm: { span: 11, offset: 0 },
          }}>

          <Input.TextArea autoComplete="off" />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            xs: { span: 20, offset: 0 },
            sm: { span: 10, offset: 4 },
          }}
        >
          <Button type="primary" htmlType="submit">
            Thêm Sinh Viên
          </Button>
          <Modal title="Thêm Sinh Viên vào Cơ Sở Dữ Liệu?" cancelText="Hủy" okText="Đồng ý" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            <div style={{ fontSize: "11pt", fontWeight: "Bold" }}>
              <p><span style={{ color: "Red", marginLeft: "24px" }}>Bạn có chắc chắn muốn thêm Sinh Viên này ?</span></p>
            </div>
          </Modal>
        </Form.Item>
      </Form>
    )
  }

  return (
    <div style={{ marginLeft: "30vh", marginTop: "2vh" }}>

      <div style={{ boder: "3vh-solid-green", padding: "3px", height: "10vh" }}>
        <Title level={2} style={{ marginLeft: "30vh" }}>THÊM SINH VIÊN</Title>
      </div>
      {ThemSinhVien()}

    </div>
  )
}

export default AddStudent;
