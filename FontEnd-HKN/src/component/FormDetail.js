import React, { useState, useEffect } from 'react'
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
import moment from 'moment';
import {
  BrowserRouter as Router,
  useParams
} from "react-router-dom";

import axios from "axios";


function FormDetail() {
  const [file, setFile] = React.useState("");
  const [file1, setFile1] = useState({});

  const { id } = useParams()
  const getTheSVAPI = () => {
    const url = "http://localhost:5000/api/capnhattsv/" + id;
    return axios.get(url);
  };

  const getImages = () => {
    const url = "http://localhost:5000/api/anhthe/" +id;
    return axios.get(url);
  };
  const [listSV, setListSV] = useState([]);
  const [form] = Form.useForm();

  //--------- SET VALUE CHO FORM


  // so la []
  // chu la [""]
  let keyform = JSON.stringify(listSV.map(list => list.id));
  keyform = keyform.slice(1, -1)

  let gt = JSON.stringify(listSV.map(list => list.gioitinh));
  gt = gt.slice(2, -2)
  let nganhhoc = JSON.stringify(listSV.map(list => list.nganh));
  nganhhoc = nganhhoc.slice(2, -2)
  let khoa = JSON.stringify(listSV.map(list => list.khoa));
  khoa = khoa.slice(2, -2)
  let ngaysinh = JSON.stringify(listSV.map(list => list.ngaysinh));
  ngaysinh = ngaysinh.slice(2, -2)
  let khoahoc1 = JSON.stringify(listSV.map(list => list.khoahoc));
  khoahoc1 = khoahoc1.slice(2, -2)
  let lop1 = JSON.stringify(listSV.map(list => list.lop));
  lop1 = lop1.slice(2, -2)
  let ten1 = JSON.stringify(listSV.map(list => list.ten));
  ten1 = ten1.slice(2, -2)
  const khoahoc2 = khoahoc1.split("-")
  form.setFieldsValue({ mssv: listSV.map(list => list.mssv) });
  form.setFieldsValue({ ten: ten1 });
  form.setFieldsValue({ lop: lop1 });

  const dateFormat1 = 'YYYY';
  const dateFormat = 'DD/MM/YYYY';
  //-------------------------------mac dinh gia tri

  form.setFieldsValue({
    'gioitinh': "Nam",
    'nganh': nganhhoc,
    'ngaysinh': moment(ngaysinh, dateFormat),
    'khoahoc': [moment(khoahoc2[0], dateFormat1), moment(khoahoc2[1], dateFormat1)]
  })

  //{[moment(khoahoc2[0], dateFormat1), moment(khoahoc2[1], dateFormat1)]}
  //--------------Lấy dữ liệu API-----------------------------
  async function getSV() {
    try {
      const result = await getTheSVAPI();
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
  async function getAnh() {
    try {
      const result = await getImages();
      if (result.status === 200) {
        /*
        const datas = result.data.map((item) => ({
          ...item,
        }));
        
        setFile(datas);
        */
      }
    } catch (e) {
      console.log("Request lỗi: ", e);
    }
  }
  let hinhanh = JSON.stringify(listSV.map(list => list.hinhanh));
  hinhanh = hinhanh.slice(2, -2)
  console.log(getImages()); 
  const [file2, setFile2] = useState();
  const [state, setState] = useState({source: null});
  function componentDidMount(){
    axios
      .get(
        'http://localhost:5000/api/anhthe/'+id,
        { responseType: 'arraybuffer' },
      )
      .then(response => {
        setFile2() 
          
        const base64 = btoa(
          new Uint8Array(response.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            '',
          ),
        );
         
        setState({ source: "data:;base64," + base64 });
      });
  }
  useEffect(() => {
    getSV();
    componentDidMount()
  }, []);
 
  //{listSV.map(list => list.mssv)} lấy giá trị trong list
  // UPPPLOADIMAGE------------------


  // Handles file upload event and updates state
  function handleUpload(event) {
    setFile(event.target.files[0]);

    // Add code here to upload file to server
    // ...
  }

  const ImageThumb = ({ image }) => {
    
    return <img className="image-upload" src={URL.createObjectURL(image)} alt={image.name} />;
  };
  //------------------------------------format form giao diện
  const config = {
    rules: [
      {
        type: 'object',
        required: false,

      },
    ],
  };
  const rangeConfig = {
    rules: [
      {
        type: 'array',
        required: false,
      },
    ],
  };



  const { Title } = Typography;
  const { RangePicker } = DatePicker;

  // form cần key
  const macdinhForm = () => {
    
 
    return (
      <Form
        key={keyform}
        form={form}
        enctype="multipart/form-data"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 10 }}
        layout="horizontal"

       
      >
        <Form.Item label="Ảnh đại diện:" name="hinhanh">
          <div >{file && <ImageThumb image={file} />}
          <img className="image-upload" src={state.source} /></div>
        </Form.Item>
        <Form.Item label="* Mã số Sinh Viên:" name="mssv">
          <Input type="text"  />
        </Form.Item>
        <Form.Item label="Họ Tên Sinh Viên:" name="ten">
          <Input autoComplete="off" />
        </Form.Item>
        <Form.Item label="Giới Tính" name="gioitinh">
          <Radio.Group defaultValue={gt} >
            <Radio value="Nam">Nam</Radio>
            <Radio value="Nữ">Nữ</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item name="ngaysinh" label="Ngày Sinh:" {...config}>
          <DatePicker placeholder="Ngày Sinh" defaultValue={moment(ngaysinh, dateFormat)} format={dateFormat} />
        </Form.Item>
        <Form.Item label="Lớp:" name="lop"
          wrapperCol={{
            sm: { span: 2, offset: 0 },
          }}>
          <Input />
        </Form.Item>
        <Form.Item label="Ngành:" name="nganh">
          <Select defaultValue={nganhhoc}>
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
          <Select defaultValue={khoa}>
            <Select.Option value="Công Nghệ">Công Nghệ</Select.Option>
            <Select.Option value="Kiến Trúc">Kiến Trúc</Select.Option>
            <Select.Option value="Kế Toán">Kế Toán</Select.Option>
            <Select.Option value="Ngoại Ngữ">Ngoại Ngữ</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item name="khoahoc" label="Khóa:" {...rangeConfig}>
          <RangePicker picker="year" />
        </Form.Item>
      </Form>
    )
  }

  return (

    <div style={{ marginTop:"2vh",marginLeft:"30vh"}}>
      <div style={{ boder: "3vh-solid-green", padding: "3px", height: "10vh" }}>
        <Title level={2} style={{ marginLeft: "30vh" }}>Thẻ Sinh Viên</Title>
        {macdinhForm()}

      </div>
    </div>
  )
 
}

export default FormDetail;
