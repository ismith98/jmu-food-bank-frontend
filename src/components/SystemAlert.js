import React from "react";
import { useAlert } from "../contexts/AlertContext";
import { Modal } from "react-bootstrap";
import useUpdateLogger from "../hooks/useUpdateLogger";

export default function SystemAlert() {
  const { showAlert, setShowAlert, message } = useAlert();
  useUpdateLogger(showAlert);
  return (
    <Modal show={showAlert} onHide={() => setShowAlert(false)}>
      <Modal.Header closeButton>
        <Modal.Title>{message}</Modal.Title>
      </Modal.Header>
    </Modal>
  );
}
