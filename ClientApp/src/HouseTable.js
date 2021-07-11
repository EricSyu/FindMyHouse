import { React, useState, useEffect, Fragment } from 'react';
import { Table } from 'antd';
import { EditModal } from './EditModal';
import PropTypes from 'prop-types';

import 'antd/dist/antd.css';
import './HouseTable.css';

export function HouseTable({ houses, mode, refresh }) {
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

  if (mode) {
    switch (mode) {
      case 'searched':
        
        break;
      case 'favorite':
        let rankingCol = { dataIndex: 'favoriteRanking', key: 'favoriteRanking', title: '喜愛程度', render: renderRanking };
        columns.splice(0, 0, rankingCol);
        break;
      case 'trash':
        break;
      default:
        break;
    }
  }

  function renderRanking(item, row, index) {
    let isUpDisabled = index === 0;
    let isDownDisabled = index === houses.length - 1;

    return (
      <div>
        <button type="button" className="btn btn-outline-success btn-sm mr-1" disabled={isUpDisabled} onClick={() => (modifyFavoriteRanking(row.id, true))}>
          <i className="bi bi-arrow-up"></i>
        </button>
        <button type="button" className="btn btn-outline-success btn-sm" disabled={isDownDisabled} onClick={() => (modifyFavoriteRanking(row.id, false))}>
          <i className="bi bi-arrow-down"></i>
        </button>
        <strong className="ml-3">{item}</strong>
      </div>
    );
  }

  function renderLink(item) {
    return (
        <a href={item} target="_blank" rel="noopener noreferrer">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-link-45deg" viewBox="0 0 16 16">
            <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z"/>
            <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z"/>
          </svg>
        </a>
    );
  }

  function renderComment(item, row, index) {
    let addBtn = (
      <button type="button" className="btn btn-outline-primary btn-sm" onClick={() => editComment(row)}>新增</button>
    );
    let textField = (
      <div className="comment-text-cell" onClick={() => editComment(row)} >
        {item}
      </div>
    );

    return (
      item ? textField : addBtn
    );
  }

  function editComment(house) {
    setEditedHouse(house);
    setShowModal(true);
  }

  function modifyFavoriteRanking(id, isUp) {
    fetch(`/api/House/ranking/${id}/${isUp}`, {
      method: "PATCH"
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`${response.status}, ${response.statusText}`);
      }
      refresh();
    })
    .catch(error => {
      alert(`更新失敗:${error.message}`);
    })
  }

  function rowClassName(record, index) {
    const rowCloseCss = "table-row-close";
    let rowClass = "";
    if(record.status === "Close") {
      rowClass += rowCloseCss;
    }
    return rowClass;
  }

  return (
    <Fragment>
      <Table 
        columns={columns} 
        dataSource={houses} 
        rowKey={house => house.id} 
        scroll={{ x: 'max-content' }}
        rowClassName={rowClassName}
        pagination={{position: ['none']}}
      />
      {editedHouse && <EditModal show={showModal} house={editedHouse} onHide={()=>(setShowModal(false))} onAfterSubmit={() => (refresh())} />}
    </Fragment>
  );
}

HouseTable.propTypes = {
  houses: PropTypes.array.isRequired,
  mode: PropTypes.string.isRequired, 
  refresh: PropTypes.func.isRequired
}