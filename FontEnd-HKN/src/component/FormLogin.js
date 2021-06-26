import React from 'react'
import { Form, Input, Button, Checkbox,Typography } from 'antd';
function FormLogin() {
         const {Title} = Typography;
        const onFinish = (values) => {
          console.log('Success:', values);
        };
      
        const onFinishFailed = (errorInfo) => {
          console.log('Failed:', errorInfo);
        };
    return (
        <div>
          <div style={{boder:"3vh-solid-green",padding:"3px",height:"10vh",marginTop:"10vh"}}>
            <Title level={2} style={{marginLeft:"40vh"}}>ĐĂNG NHẬP</Title>
            </div>
            <Form
      name="basic"
      labelCol={{ span: 5 }}
      wrapperCol={{ span: 9 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Tài Khoản"
        name="username"
        rules={[{ required: true, message: 'Nhập tài khoản nhé bạn!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Mật Khẩu"
        name="password"
        rules={[{ required: true, message: 'Nhập mậu khẩu nhé bạn!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 5, span: 16 }}>
        <Checkbox>Ghi Nhớ Đăng Nhập</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 7, span: 14 }}>
        <Button type="primary" htmlType="submit">
          Đăng Nhập
        </Button>
      </Form.Item>
    </Form>
        </div>
    )
}

export default FormLogin;
