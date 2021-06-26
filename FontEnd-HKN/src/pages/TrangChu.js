import React, { useState } from 'react'
import { Layout, Menu} from 'antd';
import FormLogin from '../component/FormLogin';
import FormAdd from '../component/FormAdd';
import FormRegister from '../component/FormRegister';
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
  useRouteMatch
} from "react-router-dom"


function TrangChu() {

  let { path,url } = useRouteMatch();
  let {idpath} = useParams();
  const { Header, Footer, Sider } = Layout;
  const { SubMenu } = Menu;
  return (
    <Router>
     < Switch>
    <div>    
      <Layout style={{ minHeight: '100vh' }}>
        <Sider >
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<PieChartOutlined />}>
            Đăng Nhập
            </Menu.Item>
            <Menu.Item key="2" icon={<DesktopOutlined />}>
              Option 2
            </Menu.Item>
            <SubMenu key="sub1" icon={<UserOutlined />} title="Đăng Nhập">
              <Menu.Item key="3"><Link to={`${url}/dangnhap`}>Đăng Nhập</Link></Menu.Item>
              <Menu.Item key="5"><Link to={`${url}/dangky`}>Đăng Ký</Link></Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<FileOutlined />} title="Quản Lí Thẻ">
             <Menu.Item key="6" ><Link to ={`${url}/themtsv`}>Thêm</Link> </Menu.Item>
              <Menu.Item key="7"><Link to ={`${url}/suatsv`}>Sửa</Link></Menu.Item>
              <Menu.Item key="8"><Link to ={`${url}/xoatsv`}>Xóa</Link></Menu.Item>
            </SubMenu>
            <Menu.Item key="9" icon={<TeamOutlined />}>
              Files
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
      
          <div style ={{
          marginLeft:"30vh",
          paddig:"0",
        }}>
          <Switch>
          <Route path={`${url}/dangky`}><FormRegister/></Route> 
          <Route path={`${url}/dangnhap`}><FormLogin/></Route>  
               
          <Route path={`${url}/themtsv`}><FormAdd/></Route>
          </Switch>
          </div>
          
        </Layout>
      </Layout>
    </div>
    </Switch>
    </Router>
  )
}

export default TrangChu;
