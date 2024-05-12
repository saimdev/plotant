import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../../App.css";

const SharedNotificationModal = ({
  show,
  onClose,
  onAccept,
  onReject,
  projectName,
  sharedPerson,
  sharedDate,
  sharedEmail,
  sharedAccessType,
  acceptanceStatus,
  previous
}) => {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Shared Project Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          <strong>Project Name:</strong> {projectName}
        </p>
        <p>
          <strong>Project AccessType:</strong> {sharedAccessType}
        </p>
        <p>
         {acceptanceStatus==="3"?previous==="1"?<strong>Accepted By Name:</strong>:<strong>Rejected By Name:</strong>:<strong>Shared By Name:</strong>} {sharedPerson}
        </p>
        <p>
        {acceptanceStatus==="3"?previous==="1"?<strong>Accepted By Email:</strong>:<strong>Rejected By Name:</strong>:<strong>Shared By Email:</strong>} {sharedEmail}
        </p>
        <p>
          <strong>Shared Date:</strong> {sharedDate}
        </p>
      </Modal.Body>
      <Modal.Footer>
        {acceptanceStatus === "2" && (
          <p style={{ fontSize: "0.9rem" }} className="text-danger mx-2">
            You rejected this Project
          </p>
        )}

        {acceptanceStatus === "1" && (
          <p style={{ fontSize: "0.9rem" }} className="text-success mx-2">
            You accepted this Project
          </p>
        )}
        {acceptanceStatus === "0" ||
          (acceptanceStatus === null && (
            <div>
              <Button variant="danger" onClick={onReject}>
                Reject
              </Button>
              <Button variant="success" className="mx-2" onClick={onAccept}>
                Accept
              </Button>
            </div>
          ))}
      </Modal.Footer>
    </Modal>
  );
};

export default SharedNotificationModal;
