import React, { useState, useEffect,setState} from "react";
import { Table, Button, Row, Col } from "antd";
import axios from "axios";
import {Link,Route,Switch} from 'react-router-dom';

const getTheSVAPI = () => {
    const url = "http://localhost:5000/api/danhsachtsv";
    return axios.get(url);
  };


function FormUp() {
    
    const [listSV, setListSV] = useState([]);
    
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
  useEffect(() => {
    getSV();
  },[]);
const columns = [
    {
      title: "Mã Sinh Viên",
      dataIndex: "mssv",
      key: "mssv",
    },
    {
      title: "Họ Tên",
      dataIndex: "ten",
      key: "ten",
    },
    {
      title: "Giới Tính",
      dataIndex: "gioitinh",
      key: "gioitinh",
    },
    {
        title: "Ngày Sinh",
        dataIndex: "ngaysinh",
        key: "ngaysinh",
      },
    {
      title: "Lớp",
      dataIndex: "lop",
      key: "lop",
    }, 
    {
      title: "Ngành",
      dataIndex: "nganh",
      key: "nganh",
    },
    {
        title: "Khoa",
        dataIndex: "khoa",
        key: "khoa",
      },
    {
        title: "Khóa",
        dataIndex: "khoahoc",
        key: "khoahoc",
    },
    {
        title: "Hình Ảnh",
        dataIndex: "hinhanh",
        key: "hinhanh",
    },
    {
      title: "",
      key: "UpdateAction",
      render: (text, record) => (
       
        <Button
          onClick={() => onUpdate(record.id)}
          type="primary"
          
        >
         <Link to ={"/trangchu/capnhattsv/"+record.id} >Cập Nhật</Link>
        </Button>
      ),
    },
    
];
//onUpdate(record.mssv)
function onUpdate(id){
  return 
}

    return (
        <div style={{ marginTop:"20px"}}>
        <Row>
          <Col span={30}>
            <Table dataSource={listSV} columns={columns} pagination={false}/>
          </Col>
        </Row>
      </div>
    )
}

export default FormUp
