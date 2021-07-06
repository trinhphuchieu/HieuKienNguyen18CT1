import React, { useState, setState } from 'react'
import { Form, Input, Button, Checkbox, Typography } from 'antd';
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
const postLoginAPI = (data) => {
  const url = "http://localhost:5000/api/dangky";
  return axios.post(url, data);
};
function FormRegister() {
  const { Title } = Typography;
  const onFinish = (values) => {
    const payload = new FormData();
    console.log('Success:', values);
    Object.keys(values).forEach((key) => {
      payload.append(key, values[key]);
    });
    postLoginAPI(payload);
    window.location.href = 'http://localhost:3000/trangchu/'
    for (var value of payload.entries()) {
      console.log(value);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div style={{ marginLeft: "30vh" }}>
      <div style={{ boder: "3vh-solid-green", padding: "3px", height: "10vh", marginTop: "10vh" }}>
        <Title level={2} style={{ marginLeft: "40vh" }}>ĐĂNG KÝ</Title>
      </div>
      <Form
        name="basic1"
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 9 }}
        
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
    
      >
        <Form.Item
          label="Tài Khoản"
          name="taikhoan"
          rules={[{ required: true, message: 'Nhập tài khoản nhé bạn!' }]}
        >
          <Input autoComplete="off"/>
        </Form.Item>
      
        <Form.Item
          label="Mật Khẩu"
          name="matkhau"
          rules={[{ required: true, message: 'Nhập mậu khẩu nhé bạn!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Nhập lại Mật Khẩu"
          dependencies={['matkhau']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Nhập lại mật khẩu nhé bạn!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('matkhau') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Mật khẩu không giống nhau!'));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 7, span: 14 }}>
          <Button type="primary" htmlType="submit">
            Đăng Ký
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default FormRegister
