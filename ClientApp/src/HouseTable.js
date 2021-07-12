import { React, useState, useEffect, Fragment } from 'react';
import { Table } from 'antd';
import { EditModal } from './EditModal';
import PropTypes from 'prop-types';

import 'antd/dist/antd.css';
import './HouseTable.css';

export function HouseTable({ houses, mode, refresh, loading, setLoading }) {
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
    let trashCol = { key: 'trash', title: '丟棄', render: renderTrash };
    let rankingCol = { dataIndex: 'favoriteRanking', key: 'favoriteRanking', title: '喜愛程度', render: renderRanking };
    let addFavoriteCol = { key: 'addFavorite', title: '', render: renderAddFavorite };
    let replyCol = { key: 'recover', title: '', render: renderReply };

    switch (mode) {
      case 'searched':
        columns.splice(0, 0, addFavoriteCol);
        columns.splice(columns.length, 0, trashCol);
        break;
      case 'favorite':
        columns.splice(0, 0, rankingCol);
        columns.splice(columns.length, 0, trashCol);
        break;
      case 'trash':
        columns.splice(0, 0, replyCol);
        break;
      default:
        break;
    }
  }

  function renderReply(item, row, index) {
    return (
      <a href="#" className="text-success link-success" onClick={() => Reply2Searched(row.id)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-reply-fill" viewBox="0 0 16 16">
          <path d="M5.921 11.9 1.353 8.62a.719.719 0 0 1 0-1.238L5.921 4.1A.716.716 0 0 1 7 4.719V6c1.5 0 6 0 7 8-2.5-4.5-7-4-7-4v1.281c0 .56-.606.898-1.079.62z"/>
        </svg>
      </a>
    )
  }

  function Reply2Searched(id) {
    setLoading(true);
    fetch(`/api/House/reply/${id}`, {
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
    .finally(() => {
      setLoading(false);
    })
  }

  function renderAddFavorite(item, row, index) {
    return (
      <a href="#" className="text-danger link-danger" onClick={() => addFavoriteList(row.id)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-heart-fill" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
        </svg>
      </a>
    )
  }

  function addFavoriteList(id) {
    setLoading(true);
    fetch(`/api/House/addFavoriteList/${id}`, {
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
    .finally(() => {
      setLoading(false);
    })
  }

  function renderTrash(item, row, index) {
    return (
      <a href="#" className="text-secondary link-secondary" onClick={() => discardHouse(row.id)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
          <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
        </svg>
      </a>
    )
  }

  function discardHouse(id) {
    setLoading(true);
    fetch(`/api/House/discard/${id}`, {
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
    .finally(() => {
      setLoading(false);
    })
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
    setLoading(true);
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
    .finally(() => {
      setLoading(false);
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
        loading={loading}
      />
      {editedHouse && <EditModal show={showModal} house={editedHouse} onHide={()=>(setShowModal(false))} onAfterSubmit={() => (refresh())} />}
    </Fragment>
  );
}

HouseTable.propTypes = {
  houses: PropTypes.array.isRequired,
  mode: PropTypes.string.isRequired, 
  refresh: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  setLoading: PropTypes.func.isRequired
}