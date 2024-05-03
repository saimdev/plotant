import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const FileNameModal = ({ show, onClose, onSubmit }) => {
  const [fileName, setFileName] = useState("");

  const handleChange = (e) => {
    setFileName(e.target.value);
  };

  const handleSubmit = () => {
    onSubmit(fileName);
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Rename File Name</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Control
          type="text"
          value={fileName}
          onChange={handleChange}
          placeholder="Enter file name"
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" className="mx-2" onClick={handleSubmit}>
          Rename
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FileNameModal;
