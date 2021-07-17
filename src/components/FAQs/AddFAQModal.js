import React from "react";
import { Modal } from "react-bootstrap";
import AddFAQForm from "./AddFAQForm";

export default function AddFAQModal({ closeModal }) {
  return (
    <>
      <Modal.Header closeButton>Add FAQ</Modal.Header>
      <Modal.Body>
        <AddFAQForm closeModal={closeModal} />
      </Modal.Body>
    </>
  );
}
