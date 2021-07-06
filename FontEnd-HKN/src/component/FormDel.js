import React, { useState, useEffect, setState } from "react";
import { Table, Button, Input, Space, Modal } from "antd";
import axios from "axios";
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';

import { withAlert } from 'react-alert'
const apiURL = "http://localhost:5000"

axios
  .get(apiURL)
  .then((response) => {
    setState(response.message);
  })
  .catch((error) => {
    console.log(error);
  });
const getTheSVAPI = () => {
  const url = "http://localhost:5000/api/danhsachtsv";
  return axios.get(url);
};



function FormDel() {

  const [listSV, setListSV] = useState([]);
  const [listSV1, setListSV1] = useState([]);
  async function getSV() {
    try {
      const result = await getTheSVAPI();
      if (result.status === 200) {
        const datas = result.data.map((item) => ({
          ...item,
          key: item.mssv,
        }));
        setListSV(datas);
      }
    } catch (e) {
      console.log("Request lỗi: ", e);
    }
  }
  async function getSV1() {
    try {
      const result = await getTheSVAPI();
      if (result.status === 200) {
        const datas = result.data.map((item) => ({
          ...item,
          key: item.mssv,
        }));
        setListSV1(datas);
      }
    } catch (e) {
      console.log("Request lỗi: ", e);
    }
  }




  function onDelete(id) {

    const url = "http://localhost:5000/api/xoathesv/";
    axios.delete(url + id);
    let temp = listSV;
    temp = temp.filter((listSV) => listSV.id !== id);
    setListSV([...temp]);
  }

  useEffect(() => {
    getSV();

  }, []);


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


  /*
  <Button
        
        onClick={() => onDelete(record.id)}
        
          type="primary"
          danger
        >
          Xóa
        </Button>
  */
  //onDelete(record.id)
  const columns = [
    {
      title: "Mã Sinh Viên",
      width: "13%",
      dataIndex: "mssv",
      key: "mssv",
      ...getColumnSearchProps('mssv'),
    },
    {
      title: "Họ Tên",
      dataIndex: "ten",
      key: "ten",
      width: "16%",
      ...getColumnSearchProps('ten'),
    },
    {
      title: "Giới Tính",
      dataIndex: "gioitinh",
      width: "10%",
      key: "gioitinh",
      ...getColumnSearchProps('gioitinh'),
    },
    {
      title: "Ngày Sinh",
      dataIndex: "ngaysinh",
      key: "ngaysinh",
      width: "11%",
    },
    {
      title: "Lớp",
      dataIndex: "lop",
      key: "lop",
      width: "8%",
      ...getColumnSearchProps('lop'),
    },
    {
      title: "Ngành",
      dataIndex: "nganh",
      key: "nganh",
      width: "16%",
      ...getColumnSearchProps('nganh'),
    },
    {
      title: "Khoa",
      dataIndex: "khoa",
      key: "khoa",
      width: "11%",
      ...getColumnSearchProps('khoa'),
    },
    {
      title: "Khóa",
      dataIndex: "khoahoc",
      key: "khoahoc",
      width: "10%",
      ...getColumnSearchProps('khoahoc'),
    },
    {
      title: "Hình Ảnh",
      dataIndex: "hinhanh",
      key: "hinhanh",
      width: "10%",
    },
    {
      title: "",
      key: "UpdateAction",
      render: (text, record) => (

        App(record.id, record.mssv, record.ten, record.lop, record.khoa)




      ),
    },

  ];
  function countDown(id) {
    let secondsToGo = 4;
    const modal = Modal.success({
      title: 'Vui Lòng Chờ trong giây Lát!',
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
      onDelete(id);
    }, secondsToGo * 1000);
  }



  const App = (id, mssv, ten, lop, khoa) => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
      setIsModalVisible(true);
    };

    const handleOk = () => {
      countDown(id);
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
        <Modal title="Bạn có muốn xóa Thẻ Sinh Viên có thông tin như sau ?" cancelText="Hủy" okText="Đồng ý"visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
          <div style={{ fontSize: "13pt", fontWeight: "Bold" }}>
            <p>Mã Sinh Viên  <span style={{ color: "Red", marginLeft: "24px" }}>: {mssv}</span></p>
            <p>Tên<span style={{ color: "Red", marginLeft: "110px" }}>:  {ten} </span></p>
            <p>Lớp <span style={{ color: "Red", marginLeft: "105px" }}>: {lop}</span></p>
            <p>Khoa<span style={{ color: "Red", marginLeft: "100px" }}>: {khoa}</span></p>
          </div>
        </Modal>
      </>
    );
  };
  return (
    <div>

      <Table dataSource={listSV} columns={columns} scroll={{ y: 700 }} pagination={false} />

    </div>
  )
}


export default FormDel
