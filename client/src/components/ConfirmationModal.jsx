import React from "react";
import { Modal, Button } from "react-bootstrap";

export default function ConfirmationModal({ show, title, message, onConfirm, onCancel, confirmLabel, confirmVariant }){
  return (
    <Modal show={show} onHide={onCancel} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{message}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant={confirmVariant || "danger"} onClick={onConfirm}>
          {confirmLabel || "Confirm"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
