import React, { useState, useEffect } from 'react'
import { Typography, Button } from 'antd';
import { Pagination } from 'antd';
import axios from 'axios';
import { List, Avatar, Space } from 'antd';
import{Link} from 'react-router-dom';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
const getDataAPI = () => {
  const url = "http://localhost:5000/api/danhsachtsv";
  return axios.get(url);
}

function onChange(pageNumber) {
  console.log('Page: ', pageNumber);
}

function FormShow() {
  const { Title } = Typography;
  const [listSV, setListSV] = useState([]);
  async function getSV() {
    try {
      const result = await getDataAPI();
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
  console.log(listSV);
  



  const HienTHi = () => {

    return listSV.map((key,value)=>(
        <div style={{marginLeft:"20vh"}}>
          <div style={{height: "100px", width: "900px", border: "2px solid #120338", padding: "3px", position: "relative" }}>
            <div style={{ marginLeft: "2px", fontWeight: "bold" }}>
              <div style={{borderBottom:"1px solid"}}><p style={{ fontWeight: "bold",fontSize: "12pt" }}>THẺ SINH VIÊN  -  ID :{key.id}</p></div>
              <p style={{ fontSize: "12pt" }}><span>Mã Sinh Viên : {key.mssv} </span><span style={{ marginLeft: "5vh" }}>Họ Tên : {key.ten} </span><span style={{ marginLeft: "5vh" }}>Lớp : {key.lop}</span><span style={{ marginLeft: "5vh" }}>Khoa : {key.khoa}</span></p>

              <Button type="primary" style={{ position: "absolute", right: "0", bottom: "0" }}><Link to ={"/trangchu/xemtsv/"+key.id}> Xem Thêm</Link></Button>
            </div>
           
        </div>
        <div style={{ width: "500px",height:"2px",margin: "10px"}}></div>
        </div>

        )
        )
  }
      return (

        <div>
          <div style={{ boder: "3vh-solid-green", padding: "2px", height: "10vh", marginTop: "5vh",marginLeft:"15vh" }}>
            <Title level={2} style={{ marginLeft: "32vh" }}>DANH SÁCH THẺ SINH VIÊN</Title>
          </div>
          {HienTHi()}

        
          <br />

        </div>
        )
}

        export default FormShow
