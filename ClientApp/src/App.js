import { React, useState, useEffect, useMemo } from 'react';
import { Navbar, Container, Row, Col } from 'react-bootstrap';
import { Table } from 'antd';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css'
import './App.css';

function App() {
  const [houses, setHouses] = useState([])
  const columns = [
    { dataIndex: 'type', key: 'type', title: '類型' },
    { dataIndex: 'shape', key: 'shape', title: '型態' },
    { dataIndex: 'section', key: 'section', title: '區域' },
    { dataIndex: 'title', key: 'title', title: '標題' },
    { dataIndex: 'carport', key: 'carport', title: '車位' },
    { dataIndex: 'room', key: 'room', title: '格局' },
    { dataIndex: 'floor', key: 'floor', title: '樓層' },
    { dataIndex: 'area', key: 'area', title: '坪數' },
    { dataIndex: 'houseAge', key: 'houseAge', title: '屋齡' },
    { dataIndex: 'unitPrice', key: 'unitPrice', title: '單價(萬/坪)' },
    { dataIndex: 'price', key: 'price', title: '總價(萬)' },
    { dataIndex: 'link', key: 'link', title: '連結' },
    { dataIndex: 'dataFrom', key: 'dataFrom', title: '資料來源' },
    { dataIndex: 'recordTime', key: 'recordTime', title: '紀錄時間' },
    { dataIndex: 'comment', key: 'comment', title: '備註' }
  ];

  useEffect(() => {
    fetchHouseData();
  }, []);

  async function fetchHouseData() {
      let response = await fetch("api/House");
      let jsonData = await response.json();
      setHouses(jsonData);
  }

  return (
    <div className="App">
      <div className="header">
        <Navbar bg="dark" variant="dark">
          <Container fluid>
            <Navbar.Brand href="#home">House Viewer</Navbar.Brand>
          </Container>
        </Navbar>
      </div>
      <div className="content p-1">
        <Container fluid>
          <Row>
            <Col>
              <Table columns={columns} dataSource={houses} rowKey={house => house.id} scroll={{ x: 'max-content' }} />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default App;
