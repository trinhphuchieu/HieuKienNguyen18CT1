import React, { useState, useEffect } from 'react'
import { Table, Input, Button, Space } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import axios from 'axios';
const getDataAPI = () => {
  const url = "http://localhost:5000/api/danhsachsv";
  return axios.get(url);
}


function ShowStudent() {
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
        console.log(datas);
      }
    } catch (e) {
      console.log("Request lỗi: ", e);
    }
  }

  useEffect(() => {
    getSV();

  }, []);
  //--------------------------- SEARCH-----------------------




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
      title: 'Mã Sinh Viên',
      dataIndex: 'mssv',
      key: 'mssv',
      ...getColumnSearchProps('mssv'),
    },
    {
      title: 'Tên',
      dataIndex: 'ten',
      key: 'ten',
      width: '25%',
      ...getColumnSearchProps('ten'),
    },
    {
      title: 'Địa Chỉ',
      dataIndex: 'diachi',
      key: 'diachi',
      width: '30%',
      ...getColumnSearchProps('diachi'),
    },
    {
      title: 'Số Điện Thoại',
      dataIndex: 'sodienthoai',
      key: 'sodienthoai',
      width: '15%',
      ...getColumnSearchProps('sodienthoai'),
    },
   
    {
      title: 'Nơi Sinh',
      dataIndex: 'noisinh',
      key: 'noisinh',
      ...getColumnSearchProps('noisinh'),
    },

  ];

  return (
    <div>
      <Table columns={columns} dataSource={listSV} scroll={{ y: 800 }} pagination={false} />
    </div>
  )
}

export default ShowStudent
