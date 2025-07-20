import { Modal, Button } from "react-bootstrap";
import { ExclamationTriangleFill } from "react-bootstrap-icons";
// import "../" // for animation

export default function ErrorModal({
  show,
  title = "Error",
  message,
  onClose,
}) {
  return (
    <Modal
      show={show}
      onHide={onClose}
      centered
      dialogClassName="error-modal"
      animation={true}
    >
      <Modal.Header closeButton className="bg-danger text-white">
        <Modal.Title className="d-flex align-items-center gap-2">
          <ExclamationTriangleFill size={20} />
          {title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="text-center fade-in">
          <ExclamationTriangleFill size={48} className="text-danger mb-3" />
          <p className="text-danger fs-5">{message}</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
