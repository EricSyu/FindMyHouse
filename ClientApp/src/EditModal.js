import { React } from 'react';
import { Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

export function EditModal({ show, house, onHide }) {

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{((house && house.comment) ? "修改" : "新增") + "備註"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-3 row">
        <label htmlFor="modal-title-input" className="col-2 col-form-label">標題</label>
        <div className="col-10">
            <input type="text" className="form-control-plaintext text-break" id="modal-title-input" value={house ? house.title : ""} readOnly />
        </div>
        </div>
        <div className="mb-3 row">
        <label htmlFor="modal-type-input" className="col-2 col-form-label">類型</label>
        <div className="col-4">
            <input type="text" className="form-control-plaintext" id="modal-type-input" value={house ? house.type : ""} readOnly />
        </div>
        <label htmlFor="modal-shape-input" className="col-2 col-form-label">型態</label>
        <div className="col-4">
            <input type="text" className="form-control-plaintext" id="modal-shape-input" value={house ? house.shape : ""} readOnly />
        </div>
        </div>
        <div className="mb-3 row">
        <label htmlFor="modal-section-input" className="col-2 col-form-label">區域</label>
        <div className="col-4">
            <input type="text" className="form-control-plaintext" id="modal-section-input" value={house ? house.section : ""} readOnly />
        </div>
        <label htmlFor="modal-carport-input" className="col-2 col-form-label">車位</label>
        <div className="col-4">
            <input type="text" className="form-control-plaintext" id="modal-carport-input" value={house ? house.carport : ""} readOnly />
        </div>
        </div>
        <div className="mb-3 row">
        <label htmlFor="modal-room-input" className="col-2 col-form-label">格局</label>
        <div className="col-4">
            <input type="text" className="form-control-plaintext" id="modal-room-input" value={house ? house.room : ""} readOnly />
        </div>
        <label htmlFor="modal-floor-input" className="col-2 col-form-label">樓層</label>
        <div className="col-4">
            <input type="text" className="form-control-plaintext" id="modal-floor-input" value={house ? house.floor : ""} readOnly />
        </div>
        </div>
        <div className="mb-3 row">
        <label htmlFor="modal-area-input" className="col-2 col-form-label">坪數</label>
        <div className="col-4">
            <input type="text" className="form-control-plaintext" id="modal-area-input" value={house ? house.area : ""} readOnly />
        </div>
        <label htmlFor="modal-age-input" className="col-2 col-form-label">屋齡</label>
        <div className="col-4">
            <input type="text" className="form-control-plaintext" id="modal-age-input" value={house ? house.houseAge : ""} readOnly />
        </div>
        </div>
        <div className="mb-3 row">
        <label htmlFor="modal-unit-input" className="col-2 col-form-label">單價</label>
        <div className="col-4">
            <input type="text" className="form-control-plaintext" id="modal-unit-input" value={house ? house.unitPrice : ""} readOnly />
        </div>
        <label htmlFor="modal-price-input" className="col-2 col-form-label">總價</label>
        <div className="col-4">
            <input type="text" className="form-control-plaintext" id="modal-price-input" value={house ? house.price : ""} readOnly />
        </div>
        </div>
        <div className="mb-3">
        <label htmlFor="modal-comment-textarea" className="form-label">備註</label>
        <textarea className="form-control" id="modal-comment-textarea" rows={3} defaultValue={house ? house.comment : ""} />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
        關閉
        </Button>
        <Button variant="primary" onClick={onHide}>
        儲存
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

EditModal.propTypes = {
  show: PropTypes.bool.isRequired, 
  house: PropTypes.object,
  onHide: PropTypes.func.isRequired 
}