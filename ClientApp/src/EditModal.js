import { React, useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

export function EditModal({ show, house, onHide, onAfterSubmit }) {
  const [comment, setComment] = useState("");
  
  useEffect(() => {
    setComment(house.comment);
  }, [house]);

  const handleCommentChange = (e) => {
    setComment(e.currentTarget.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`api/House/${house.id}`, {
      method: "PUT", 
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        comment: comment
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`${response.status}, ${response.statusText}`);
      }
      onAfterSubmit();
    })
    .catch(error => {
      alert(`更新失敗:${error.message}`);
    })
  }

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{((house && house.comment) ? "修改" : "新增") + "備註"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div className="mb-3 row">
          <label htmlFor="modal-title-input" className="col-2 col-form-label">標題</label>
          <div className="col-10">
              <input type="text" className="form-control-plaintext text-break" id="modal-title-input" value={house.title} readOnly />
          </div>
          </div>
          <div className="mb-3 row">
          <label htmlFor="modal-type-input" className="col-2 col-form-label">類型</label>
          <div className="col-4">
              <input type="text" className="form-control-plaintext" id="modal-type-input" value={house.type} readOnly />
          </div>
          <label htmlFor="modal-shape-input" className="col-2 col-form-label">型態</label>
          <div className="col-4">
              <input type="text" className="form-control-plaintext" id="modal-shape-input" value={house.shape} readOnly />
          </div>
          </div>
          <div className="mb-3 row">
          <label htmlFor="modal-section-input" className="col-2 col-form-label">區域</label>
          <div className="col-4">
              <input type="text" className="form-control-plaintext" id="modal-section-input" value={house.section} readOnly />
          </div>
          <label htmlFor="modal-carport-input" className="col-2 col-form-label">車位</label>
          <div className="col-4">
              <input type="text" className="form-control-plaintext" id="modal-carport-input" value={house.carport} readOnly />
          </div>
          </div>
          <div className="mb-3 row">
          <label htmlFor="modal-room-input" className="col-2 col-form-label">格局</label>
          <div className="col-4">
              <input type="text" className="form-control-plaintext" id="modal-room-input" value={house.room} readOnly />
          </div>
          <label htmlFor="modal-floor-input" className="col-2 col-form-label">樓層</label>
          <div className="col-4">
              <input type="text" className="form-control-plaintext" id="modal-floor-input" value={house.floor} readOnly />
          </div>
          </div>
          <div className="mb-3 row">
          <label htmlFor="modal-area-input" className="col-2 col-form-label">坪數</label>
          <div className="col-4">
              <input type="text" className="form-control-plaintext" id="modal-area-input" value={house.area} readOnly />
          </div>
          <label htmlFor="modal-age-input" className="col-2 col-form-label">屋齡</label>
          <div className="col-4">
              <input type="text" className="form-control-plaintext" id="modal-age-input" value={house.houseAge} readOnly />
          </div>
          </div>
          <div className="mb-3 row">
          <label htmlFor="modal-unit-input" className="col-2 col-form-label">單價</label>
          <div className="col-4">
              <input type="text" className="form-control-plaintext" id="modal-unit-input" value={house.unitPrice} readOnly />
          </div>
          <label htmlFor="modal-price-input" className="col-2 col-form-label">總價</label>
          <div className="col-4">
              <input type="text" className="form-control-plaintext" id="modal-price-input" value={house.price} readOnly />
          </div>
          </div>
          <div className="mb-3">
          <label htmlFor="modal-comment-textarea" className="form-label">備註</label>
          <textarea className="form-control" id="modal-comment-textarea" rows={3} value={comment} onChange={handleCommentChange} />
          </div>
          <Modal.Footer>
            <Button variant="secondary" onClick={onHide}>
            關閉
            </Button>
            <Button type="submit" variant="primary" onClick={onHide}>
            儲存
            </Button>
          </Modal.Footer>
        </form>
      </Modal.Body>
    </Modal>
  );
}

EditModal.propTypes = {
  show: PropTypes.bool.isRequired, 
  house: PropTypes.object.isRequired,
  onHide: PropTypes.func.isRequired,
  onAfterSubmit: PropTypes.func.isRequired
}