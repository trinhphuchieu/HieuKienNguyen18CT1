import React, { useState, useEffect } from 'react'
import { Table, Input, Button, Space, Modal } from 'antd';
import { Link } from "react-router-dom"
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import axios from 'axios';
const getDataAPI = () => {
  const url = "http://localhost:5000/api/danhsachsv";
  return axios.get(url);
}


function UpStudent() {
  const [listSV, setListSV] = useState([]);

  async function getSV() {
    try {
      const result = await getDataAPI();
      if (result.status === 200) {
        const datas = result.data.map((item) => ({
          ...item,
          key: item.mssv,

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

  //--------------- HANDLE DELETE-----------------------------
  const App = (mssv, ten) => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
      setIsModalVisible(true);
    };

    const handleOk = () => {
      countDown(mssv);
      setIsModalVisible(false);
    };

    const handleCancel = () => {
      setIsModalVisible(false);
    };

    return (
      <>
        <Button type="primary" onClick={showModal} danger>
          Xóa
        </Button>
        <Modal title="Bạn có muốn xóa Thẻ Sinh Viên có thông tin như sau ?" cancelText="Hủy" okText="Đồng ý" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
          <div style={{ fontSize: "13pt", fontWeight: "Bold" }}>
            <p>Mã Sinh Viên  <span style={{ color: "Red", marginLeft: "24px" }}>: {mssv}</span></p>
            <p>Tên<span style={{ color: "Red", marginLeft: "110px" }}>:  {ten} </span></p>

          </div>
        </Modal>
      </>
    );
  };


  function countDown(mssv) {
    let secondsToGo = 5;
    const modal = Modal.success({
      title: 'Đang Xử Lý xin chờ trong giây Lát!',
      content: `Đang Xử Lý......`,
    });
    const timer = setInterval(() => {
      secondsToGo -= 1;
      modal.update({
        content: `Vui Lòng Chờ  ${secondsToGo} giây.`,
        okText: `Hủy`,
      });
    }, 1000);
    setTimeout(() => {
      clearInterval(timer);
      modal.destroy();
      onDelete(mssv);
    }, secondsToGo * 1000);
  }
  function onDelete(mssv) {

    const url = "http://localhost:5000/api/xoasv/";
    axios.delete(url + mssv);
    let temp = listSV;
    temp = temp.filter((listSV) => listSV.mssv !== mssv);
    setListSV([...temp]);
  }


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
              Tìm Kiếm
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

      ...getColumnSearchProps('ten'),
    },
    {
      title: 'Địa Chỉ',
      dataIndex: 'diachi',
      width: "20%",
      key: 'diachi',

      ...getColumnSearchProps('diachi'),
    },
    {
      title: 'Số Điện Thoại',
      dataIndex: 'sodienthoai',
      key: 'sodienthoai',

      ...getColumnSearchProps('sodienthoai'),
    },
    {
      title: 'Nơi Sinh',
      dataIndex: 'noisinh',
      key: 'noisinh',
      ...getColumnSearchProps('noisinh'),
    },
    {
      title: "Cập Nhật",
      key: "capnhat",
      width: "108px",
      render: (text, record) => (
        <Button

          type="primary"

        >
          <Link to={"/trangchu/capnhatsv/" + record.mssv} >Cập Nhật</Link>
        </Button>

      ),
    },
    {
      title: "Xóa",
      key: "xoa",
      width: "100px",
      render: (text, record) => (
        App(record.mssv, record.ten)

      ),
    },
  ];

  return (
    <div>
      <Table columns={columns} dataSource={listSV} scroll={{ y: 600 }} pagination={false} />
    </div>
  )
}

export default UpStudent
