import Modal from "react-bootstrap/Modal";

const ModalComponent = ({ children, show, handleClose, handleShow, title }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title className="text-center">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">{children}</Modal.Body>
    </Modal>
  );
};

export default ModalComponent;
