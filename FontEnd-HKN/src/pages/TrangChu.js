import React, {  } from 'react'
import ReactDOM from 'react-dom';
import { Layout, Menu,createContext,useContext,useState} from 'antd';
import FormLogin from '../component/FormLogin';
import FormAdd from '../component/FormAdd';
import FormRegister from '../component/FormRegister';
import FormShow from '../component/FormShow';
import FormUp from '../component/FormUp';
import FormDel from '../component/FormDel';
import FormUpdate from '../component/FormUpdate';
import FormDetail from '../component/FormDetail';
import ShowStudent from '../componentSV/ShowStudent';
import AddStudent from '../componentSV/AddStudent';
import UpStudent from '../componentSV/UpStudent';
import ShowDetail from '../componentSV/ShowDetail';

import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  
} from '@ant-design/icons';
import{
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useHistory,
  useRouteMatch,
  Redirect

} from "react-router-dom"


function TrangChu() {
  let history = useHistory();
  let { path,url } = useRouteMatch();

  function handleClick() {
    history.push("/trangchu");
  }
 
  let {idpath} = useParams();
  const { Header, Footer, Sider } = Layout;
  const { SubMenu } = Menu;
  return (
    <Router>
     < Switch>
    <div>    
      <Layout style={{ minHeight: '140vh' }}>
        <Sider >
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<PieChartOutlined />}>
            <Link to="/trangchu" > Trang Chủ</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<DesktopOutlined />}>
            <Link to={`${url}/danhsachsv`}>Trang Sinh Viên</Link>
            </Menu.Item>
            <SubMenu key="sub1" icon={<UserOutlined />} title="Đăng Nhập">
              <Menu.Item key="3"><Link to={`${url}/dangnhap`}>Đăng Nhập</Link></Menu.Item>
              <Menu.Item key="5"><Link to={`${url}/dangky`}>Đăng Ký</Link></Menu.Item>
            </SubMenu>
           
          
            
            <SubMenu key="sub2" icon={<FileOutlined />} title="Quản Lí Thẻ">
             <Menu.Item key="6" ><Link to ={`${url}/themtsv`}>Thêm Thẻ</Link> </Menu.Item>
              <Menu.Item key="7"><Link to ={`${url}/suatsv`}>Cập Nhật</Link></Menu.Item>
              <Menu.Item key="8"><Link to ={`${url}/xoatsv`}>Xóa Thẻ</Link></Menu.Item>
            </SubMenu>
            
            <SubMenu key="9" icon={<TeamOutlined />} title="Quản Lí Sinh Viên">
             <Menu.Item key="9" ><Link to ={`${url}/themsv`}>Thêm Sinh Viên</Link> </Menu.Item>
              <Menu.Item key="10"><Link to ={`${url}/suasv`}>Cập Nhật</Link></Menu.Item>
           
            </SubMenu>
           
          </Menu>
        </Sider>
        <Layout className="site-layout">
        <div style ={{
          marginLeft:"3vh",
          padding:"0",
        }}> 
          </div>
          
          <Switch>   
          <Route path={`${url}/capnhatsv/:id`}><ShowDetail/></Route> 
          <Route path={`${url}/capnhattsv/:id`}><FormUpdate/></Route>     
          <Route path={`${url}/dangky`}><FormRegister/></Route> 
          <Route path={`${url}/dangnhap`}><FormLogin/></Route>  
          <Route path={`${url}/xemtsv/:id`}><FormDetail/></Route> 
          <Route path={`${url}/themtsv`}><FormAdd/></Route>     
          <Route path={`${url}/suatsv`}><FormUp/></Route>
          <Route path={`${url}/xoatsv`}><FormDel/></Route>
          <Route path={`${url}/danhsachsv`}><ShowStudent/></Route>  
          <Route path={`${url}/themsv`}><AddStudent/></Route>
          <Route path={`${url}/suasv`}><UpStudent/></Route>
          <Route path={`/trangchu`}><FormShow/></Route>  
           
          </Switch>
         
        
        
    
        </Layout>
        
      </Layout>
    </div>
    </Switch>
    </Router>
  )
}

export default TrangChu;
//      style={{marginLeft:"20vh"}}