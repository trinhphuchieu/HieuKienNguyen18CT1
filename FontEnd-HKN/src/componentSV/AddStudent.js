import React, { useState,setState, useEffect } from 'react'
import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  Typography,
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


  
  //------------------------------------END
  

  const { Title } = Typography;



  const ThemSinhVien = () => {

   
    const onFinish = (fieldsValue) => {
      
 
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
          <Input type="text" />
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
        
          <Input. TextArea />
        </Form.Item>
       
        <Form.Item label="Số Điện Thoại:" name="sodienthoai" wrapperCol={{
            sm: { span: 4, offset: 0 },
          }}>
            <Input type="text"/>
        </Form.Item>
       
        <Form.Item label="Nơi:" name="noisinh"
          wrapperCol={{
            sm: { span: 11, offset: 0 },
          }}>
        
          <Input. TextArea />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            xs: { span: 20, offset: 0 },
            sm: { span: 10, offset: 4 },
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    )
  }
 
  return (
    <div style={{marginLeft:"30vh" ,marginTop:"2vh"}}>

      <div style={{ boder: "3vh-solid-green", padding: "3px", height: "10vh" }}>
        <Title level={2} style={{ marginLeft: "30vh" }}>THÊM SINH VIÊN</Title>
      </div>
      {ThemSinhVien()}

    </div>
  )
}

export default AddStudent;
