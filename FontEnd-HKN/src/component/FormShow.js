import React,{useState,useEffect} from 'react'
import { Typography,Button } from 'antd';
import axios from 'axios';

const getDataAPI = () =>{    
    const url = "http://localhost:5000/apidanhsachtsv";
    return axios.get(url);
}  


function FormShow() {
    const {Title} = Typography;
    const [listCustomer, setListCustomer] = useState([]);
    async function getCustomers() {
        try {
            const result = await getDataAPI();
          if (result.status === 200) {
            const datas = result.data.map((item) => ({
              ...item,
              key: item.mssv,
            }));
            setListCustomer(datas);
          }
        } catch (e) {
          console.log("REQUEST CUSTOMERS ERROR: ", e);
        }
      }
      useEffect(() => {
        getCustomers();
        
      }, []);
     
    return (
         
        <div>
            
        <div style={{boder:"3vh-solid-green",padding:"2px",height:"10vh",marginTop:"5vh"}}>
            <Title level={2} style={{marginLeft:"20vh"}}>DANH SÁCH THẺ SINH VIÊN</Title>
            </div>
    
        <div style={{height:"170px" ,width:"600px",border:"1px solid",marginLeft:"10vh" ,display:"flex"}}>
            <div style={{height:"170px" ,width:"148px",border:"1px solid",display:"grid",gridTemplateRows:"148px auto"}}>
               IMAGE
              
                <div style={{height:"18px" ,width:"145px",border:"1px solid",textAlign:"center",fontWeight:"bold"}}>
                            1851220057
            </div>
            </div>
            <div style={{height:"170px" ,width:"452px",border:"1px solid",padding:"3px",position:"relative"}}>
                <div style={{marginLeft:"2px",fontWeight:"bold"}}>
                <p style={{textAlign:"center",fontWeight:"bold",}}>THẺ SINH VIÊN</p>
                <p>Tên: Trịnh Phúc Hiếu <span style={{marginLeft:"15vh"}}>Lớp: 18CT1</span></p>
                <p>Ngành: Công Nghệ thông tin</p>
                <p>Khoa: Công Nghệ </p>
                <p>Khoá: 2018 - 2023 </p>
                <Button type="primary" style={{position:"absolute",right:"0",bottom:"0"}}>Đọc Thêm</Button>
                </div>
            </div>
            </div>
        </div>
    )
}

export default FormShow
