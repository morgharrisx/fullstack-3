import React from 'react';
import { Modal } from 'react-bootstrap';
import ReusableButton from '../../ReusableButton/ReusableButton';

function VerticalModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{props.body}</p>
      </Modal.Body>
      <Modal.Footer>
        <ReusableButton color={"pink"} text={"Close"} onClick={props.onHide}></ReusableButton>
      </Modal.Footer>
    </Modal>
  );
}

export default VerticalModal;
