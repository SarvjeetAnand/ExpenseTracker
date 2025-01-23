import React from "react";
import { Modal, Button } from "react-bootstrap";

export default function SuccessMessage ({ show, message, onClose }) {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Success</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p style={{ color: "green" }}>{message}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={onClose}>
          OK
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

