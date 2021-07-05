import { React, useState, useEffect, Fragment } from 'react';
import { Table } from 'antd';
import { EditModal } from './EditModal'

import 'antd/dist/antd.css';

export function HouseTable() {
  const [houses, setHouses] = useState([]);
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
    { dataIndex: 'comment', key: 'comment', title: '備註', render: renderComment },
    { dataIndex: 'link', key: 'link', title: '連結', render: renderLink },
    { dataIndex: 'dataFrom', key: 'dataFrom', title: '資料來源' },
    { dataIndex: 'recordTime', key: 'recordTime', title: '紀錄時間' }
  ];
  const [showModal, setShowModal] = useState(false);
  const [editedHouse, setEditedHouse] = useState(null);

  useEffect(() => {
    fetchHouseData();
  }, []);
  
  async function fetchHouseData() {
    let response = await fetch("api/House");
    let jsonData = await response.json();
    setHouses(jsonData);
  }

  function renderLink(text) {
    return (
        <a href={text} target="_blank" rel="noopener noreferrer">
          <i className="bi bi-link-45deg"></i>
        </a>
    )
  }

  function renderComment(text, row, index) {
    return (
      <button type="button" className="btn btn-outline-primary" onClick={() => editComment(row)} >
        {text ? text : "新增"}
      </button>
    );
  }

  function editComment(house) {
    setEditedHouse(house);
    setShowModal(true);
  }

  return (
    <Fragment>
      <Table columns={columns} dataSource={houses} rowKey={house => house.id} scroll={{ x: 'max-content' }} />
      {editedHouse && <EditModal show={showModal} house={editedHouse} onHide={()=>(setShowModal(false))} />}
    </Fragment>
  );
}