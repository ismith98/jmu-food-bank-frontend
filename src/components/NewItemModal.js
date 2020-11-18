import React from "react";
import { Modal, Button } from "react-bootstrap";
import NewItemForm from "./NewItemForm";

export default function NewItemModal({ closeModal }) {
  return (
    <>
      <Modal.Header closeButton>Add a Food Item</Modal.Header>
      <Modal.Body>
        <NewItemForm closeModal={closeModal} />
      </Modal.Body>
    </>
  );
}
