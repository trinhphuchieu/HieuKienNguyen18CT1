import React, { useState, useEffect,setState} from "react";
import { Table, Button,Input, Space, Row, Col } from "antd";
import axios from "axios";
import {Link,Route,Switch} from 'react-router-dom';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
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

   
     
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');

  
  
  function getColumnSearchProps(dataIndex) {
    return {
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
           
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              Search
            </Button>
            <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
              Reset
            </Button>
          </Space>
        </div>
      ),
      filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
      onFilter: (value, record) =>
        record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
      onFilterDropdownVisibleChange: visible => {
        if (visible) {
          // setTimeout(() => this.searchInput.select());
        }
      },
      render: text =>
        searchedColumn === dataIndex ? (
          <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text.toString()}
          />
        ) : (
          text
        ),
    }
  };

  function handleSearch(selectedKeys, confirm, dataIndex) {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  function handleReset(clearFilters) {
    clearFilters();
    setSearchText('');
  };

const columns = [
    {
      title: "Mã Sinh Viên",
      width:"13%",
      dataIndex: "mssv",
      key: "mssv",
      ...getColumnSearchProps('mssv'),
    },
    {
      title: "Họ Tên",
      dataIndex: "ten",
      key: "ten",
      width:"16%",
      ...getColumnSearchProps('ten'),
    },
    {
      title: "Giới Tính",
      dataIndex: "gioitinh",
      width:"10%",
      key: "gioitinh",
      ...getColumnSearchProps('gioitinh'),
    },
    {
        title: "Ngày Sinh",
        dataIndex: "ngaysinh",
        key: "ngaysinh",
        width:"11%",
      },
    {
      title: "Lớp",
      dataIndex: "lop",
      key: "lop",
      width:"8%",
      ...getColumnSearchProps('lop'),
    }, 
    {
      title: "Ngành",
      dataIndex: "nganh",
      key: "nganh",
      width:"16%",
      ...getColumnSearchProps('nganh'),
    },
    {
        title: "Khoa",
        dataIndex: "khoa",
        key: "khoa",
        width:"11%",
        ...getColumnSearchProps('khoa'),
      },
    {
        title: "Khóa",
        dataIndex: "khoahoc",
        key: "khoahoc",
        width:"10%",
        ...getColumnSearchProps('khoahoc'),
    },
    {
        title: "Hình Ảnh",
        dataIndex: "hinhanh",
        key: "hinhanh",
        width:"10%",
    },
    {
      title: "",
      key: "UpdateAction",
      render: (text, record) => (
       
        <Button
          
          type="primary"
          
        >
         <Link to ={"/trangchu/capnhattsv/"+record.id} >Cập Nhật</Link>
        </Button>
      ),
    },
    
];
//onUpdate(record.mssv)


    return (
        <div>
        
            <Table dataSource={listSV} columns={columns} scroll={{ y:700}} pagination={false}/>
          
      </div>
    )
}

export default FormUp
