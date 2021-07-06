import React, { useState, useEffect, setState } from 'react'
import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  Typography,
  DatePicker,
  Modal
} from 'antd';
import axios from "axios";
import '../StyleForm.css';
import moment from 'moment';
import {
  BrowserRouter as Router,
  useParams
} from "react-router-dom";
const apiURL = "http://localhost:5000"

axios
  .get(apiURL)
  .then((response) => {
    setState(response.message);
  })
  .catch((error) => {
    console.log(error);
  });


function AddStudent() {
  const [listSV, setListSV] = useState([]);
  const payload = new FormData();
  const [form] = Form.useForm();

  const { id } = useParams()
  const getSVAPI = () => {
    const url = "http://localhost:5000/api/capnhatsv/" + id;
    return axios.get(url);
  };
  const putSVAPI = (data) => {
    const url = "http://localhost:5000/api/capnhatsv/" + id;
    return axios.put(url, data);
  };



  const { Title } = Typography;
  async function getSV() {
    try {
      const result = await getSVAPI();
      if (result.status === 200) {
        const datas = result.data.map((item) => ({
          ...item,
          key: item.id,

        }));

        setListSV(datas);

      }
    } catch (e) {
      console.log("Request lỗi: ", e);
    }
  }
  useEffect(() => {
    getSV();
  }, []);
  //------------------------------------END
  let keyform = JSON.stringify(listSV.map(list => list.mssv));
  keyform = keyform.slice(1, -1)

  let diachi = JSON.stringify(listSV.map(list => list.diachi));
  diachi = diachi.slice(2, -2)
  let ten = JSON.stringify(listSV.map(list => list.ten));
  ten = ten.slice(2, -2)
  let noisinh = JSON.stringify(listSV.map(list => list.noisinh));
  noisinh = noisinh.slice(2, -2)
  let sdt = JSON.stringify(listSV.map(list => list.sodienthoai));
  sdt = sdt.slice(1, -1)
  form.setFieldsValue({ ten: ten });
  form.setFieldsValue({ diachi: diachi });
  form.setFieldsValue({ noisinh: noisinh });
  form.setFieldsValue({ mssv: keyform });
  form.setFieldsValue({ sodienthoai: sdt });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const ThemSinhVien = () => {

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

    const handleCancel = () => {
      setIsModalVisible(false);
    };

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
      putSVAPI(payload);
    };




    return (
      <Form
        key={keyform}
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 10 }}
        layout="horizontal"
        onFinish={onFinish}
      >

        <Form.Item label="* Mã số Sinh Viên :" name="mssv" wrapperCol={{
          sm: { span: 5, offset: 0 },
        }}>
          <Input type="text" disabled />
        </Form.Item>

        <Form.Item label="Họ Tên :" name="ten" wrapperCol={{
          sm: { span: 8, offset: 0 },
        }}>
          <Input />
        </Form.Item>


        <Form.Item label="Điạ Chỉ:" name="diachi"
          wrapperCol={{
            sm: { span: 11, offset: 0 },
          }}>

          <Input.TextArea />
        </Form.Item>

        <Form.Item label="Số Điện Thoại:" name="sodienthoai" wrapperCol={{
          sm: { span: 4, offset: 0 },
        }}>
          <Input type="text" />
        </Form.Item>

        <Form.Item label="Nơi:" name="noisinh"
          wrapperCol={{
            sm: { span: 11, offset: 0 },
          }}>

          <Input.TextArea />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            xs: { span: 20, offset: 0 },
            sm: { span: 10, offset: 4 },
          }}
        >
          <Button type="primary" htmlType="submit">
            Cập Nhật
          </Button>

        </Form.Item>
        <Form.Item>
          <Modal title="Bạn có muốn Cập Nhật Thẻ Sinh Viên?" cancelText="Hủy" okText="Đồng ý" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            <p></p>
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
