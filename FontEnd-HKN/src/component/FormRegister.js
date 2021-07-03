import React from 'react'
import { Form, Input, Button, Checkbox,Typography } from 'antd';
function FormRegister() {
    const {Title} = Typography;
    const onFinish = (values) => {
      console.log('Success:', values);
    };
  
    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };
return (
    <div style={{marginLeft:"30vh"}}>
      <div style={{boder:"3vh-solid-green",padding:"3px",height:"10vh",marginTop:"10vh"}}>
        <Title level={2} style={{marginLeft:"40vh"}}>ĐĂNG KÝ</Title>
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
        name="email"
        label="E-mail"
        rules={[
          {
            type: 'email',
            message: 'Email không hợp lệ!',
          },
          {
            required: true,
            message: 'Nhập E-mail nha bạn!',
          },
        ]}
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

  <Form.Item
        name="confirm"
        label="Nhập lại Mật Khẩu"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Nhập lại mật khẩu nhé bạn!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
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
      Đăng Nhập
    </Button>
  </Form.Item>
</Form>
    </div>
)
}

export default FormRegister
