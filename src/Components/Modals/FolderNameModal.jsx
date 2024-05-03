import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const FolderNameModal = ({ show, onClose, onSubmit }) => {
  const [folderName, setFolderName] = useState("");

  const handleChange = (e) => {
    setFolderName(e.target.value);
  };

  const handleSubmit = () => {
    onSubmit(folderName);
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Enter Folder Name</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Control
          type="text"
          value={folderName}
          onChange={handleChange}
          placeholder="Enter Folder name"
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" className="mx-2" onClick={handleSubmit}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FolderNameModal;
