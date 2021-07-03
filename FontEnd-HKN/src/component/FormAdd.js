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
  const url = "http://localhost:5000/api/themtsv";
  return axios.post(url, data);
};

function FormAdd() {
  let anh;
  // UPPPLOADIMAGE------------------
  const [file, setFile] = React.useState("");
  const [file1, setFile1] = useState({});
  const payload = new FormData();
  // Handles file upload event and updates state


  const ImageThumb = ({ image }) => {
    return <img className="image-upload" src={URL.createObjectURL(image)} alt={image.name} />;
  };
  //------------------------------------END
  const config = {
    rules: [
      {
        type: 'object',
        required: false,
        message: 'Bạn chưa Chọn Ngày sinh!',
      },
    ],
  };
  const rangeConfig = {
    rules: [
      {
        type: 'array',
        required: false,
        message: 'Bạn Chưa Chọn Khóa!',
      },
    ],
  };

  const { Title } = Typography;
  const { RangePicker } = DatePicker;
  let anh1;

  const macdinhform = () => {

    
    function handleUpload(event) {
      setFile1(event.target.files[0]);
      setFile(event.target.files[0]);
      console.log(event.target.files[0])
      // Add code here to upload file to server
      // ...
      const anh = Array.from(event.target.files);
      anh1 = anh;
      
      
    }
    const onFinish = (fieldsValue) => {
      
 
      const rangeValue = fieldsValue['khoahoc'];

      const values = {
         ...fieldsValue,
         'hinhanh': file1,
         'ngaysinh': fieldsValue['ngaysinh'].format('DD/MM/YYYY'),
         'khoahoc': rangeValue[0].format('YYYY') +"-"+ rangeValue[1].format('YYYY')
       };
     
       const payload = new FormData();

       Object.keys(values).forEach((key) => {
         payload.append(key, values[key]);
       });

      
      
      for (var value of payload.entries()) {
        console.log(value);
      }
      postTheSVAPI(payload);
    };




    return (
      <Form
        enctype="multipart/form-data"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 10 }}
        layout="horizontal"
        onFinish={onFinish}
      >

        <Form.Item label="Ảnh đại diện:" name="hinhanh">
          <input type="file" onChange={handleUpload} />
          <div>{file && <ImageThumb image={file} />}</div>
        </Form.Item>
        <Form.Item label="* Mã số Sinh Viên:" name="mssv">
          <Input type="text" />
        </Form.Item>
        <Form.Item label="Họ Tên Sinh Viên:" name="ten">
          <Input />
        </Form.Item>
        <Form.Item label="Giới Tính" name="gioitinh">
          <Radio.Group >
            <Radio value="Nam">Nam</Radio>
            <Radio value="Nữ">Nữ</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item name="ngaysinh" label="Ngày Sinh:" {...config}>
          <DatePicker placeholder="Ngày Sinh" />
        </Form.Item>
        <Form.Item label="Lớp:" name="lop"
          wrapperCol={{
            sm: { span: 2, offset: 0 },
          }}>
          <Input />
        </Form.Item>
        <Form.Item label="Ngành:" name="nganh">
          <Select>
            <Select.Option value="Công Nghệ Thông Tin">Công Nghệ Thông Tin</Select.Option>
            <Select.Option value="Kiến Trúc">Kiến Trúc</Select.Option>
            <Select.Option value="Kế Toán">Kế Toán</Select.Option>
            <Select.Option value="Ngôn ngữ Anh">Ngôn ngữ Anh</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Khoa:" name="khoa" wrapperCol={{
          xs: { span: 5, offset: 0 },
          sm: { span: 3, offset: 0 },
        }}>
          <Select>
            <Select.Option value="Công Nghệ">Công Nghệ</Select.Option>
            <Select.Option value="Kiến Trúc">Kiến Trúc</Select.Option>
            <Select.Option value="Kế Toán">Kế Toán</Select.Option>
            <Select.Option value="Ngoại Ngữ">Ngoại Ngữ</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="khoahoc" label="Khóa:" {...rangeConfig}>
          <RangePicker picker="year" placeholder={["Bắt Đầu", "Kết Thúc"]} />
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
        <Title level={2} style={{ marginLeft: "30vh" }}>THÊM THẺ SINH VIÊN</Title>
      </div>
      {macdinhform()}

    </div>
  )
}

export default FormAdd;
