import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const ShareModal = ({ show, onClose, onSubmit }) => {
  const [userEmail, setUserEmail] = useState("");
  const [accessType, setAccessType] = useState("");

  const handleChange = (e) => {
    setUserEmail(e.target.value);
  };

  const handleAccessTypeChange = (e) => {
    setAccessType(e.target.value);
  };

  const handleSubmit = () => {
    onSubmit({ userEmail, accessType });
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Share Project</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Control
          type="email"
          value={userEmail}
          onChange={handleChange}
          placeholder="Enter user email"
        />
        <Form.Select
          value={accessType}
          onChange={handleAccessTypeChange}
          className="mt-3"
        >
          <option value="">Select Access Type</option>
          <option value="read">Read Access</option>
          <option value="write">Write Access</option>
        </Form.Select>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" className="mx-2" onClick={handleSubmit}>
          Share
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ShareModal;
