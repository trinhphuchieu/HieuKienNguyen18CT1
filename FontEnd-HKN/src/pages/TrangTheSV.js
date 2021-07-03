import React, {  } from 'react'
import { Layout, Menu} from 'antd';
import FormLogin from '../component/FormLogin';
import FormAdd from '../component/FormAdd';
import FormRegister from '../component/FormRegister';
import FormShow from '../component/FormShow';
import FormUp from '../component/FormUp';
import FormDel from '../component/FormDel';
import FormUpdate from '../component/FormUpdate';
import FormDetail from '../component/FormDetail';
import ShowStudent from '../componentSV/ShowStudent';
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


function TrangTheSV() {

  let { path,url } = useRouteMatch();

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
            <Link to="/trangchu"> Trang Chủ</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<DesktopOutlined />}>
            <Link to={`${url}/danhsachtsv`}>Thẻ Sinh Viên</Link>
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
             <Menu.Item key="9" ><Link to ={`${url}/themsinhvien`}>Thêm Sinh Viên</Link> </Menu.Item>
              <Menu.Item key="10"><Link to ={`${url}/suasinhvien`}>Cập Nhật</Link></Menu.Item>
              <Menu.Item key="11"><Link to ={`${url}/capnhatsinhvien`}>Xóa Sinh Viên</Link></Menu.Item>
            </SubMenu>
           
          </Menu>
        </Sider>
        <Layout className="site-layout">
        <div style ={{
          marginLeft:"3vh",
          padding:"0",
        }}> 
        <Switch>
        <Route path={`${url}/suatsv`}><FormUp/></Route>
        <Route path={`${url}/xoatsv`}><FormDel/></Route>
      
          </Switch> 
          </div>
          <div style ={{
          marginLeft:"30vh",
          padding:"0",
        }}> 
          <Switch>
          <Route path={`${url}/capnhattsv/:id`}><FormUpdate/></Route> 
          <Route path={`${url}/dangky`}><FormRegister/></Route> 
          <Route path={`${url}/dangnhap`}><FormLogin/></Route>  
          <Route path={`${url}/xemtsv/:id`}><FormDetail/></Route> 
          <Route path={`${url}/themtsv`}><FormAdd/></Route>
          <Route exact path="/trangchu"><FormAdd/></Route>
          </Switch>
          </div>
          <div style ={{
          marginLeft:"20vh",
          padding:"0",
        }}> 
        <Switch>
        <Route path={`${url}/danhsachtsv`}><FormShow/></Route> 
        </Switch>
         </div>
        </Layout>
        
      </Layout>
    </div>
    </Switch>
    </Router>
  )
}

export default TrangTheSV;