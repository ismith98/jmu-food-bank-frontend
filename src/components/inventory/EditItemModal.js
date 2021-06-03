import React from "react";
import { Modal } from "react-bootstrap";
import EditItemForm from "./EditItemForm";

export default function EditItemModal({ closeModal, item }) {
  return (
    <>
      <Modal.Header closeButton>Edit an item</Modal.Header>
      <Modal.Body>
        <EditItemForm closeModal={closeModal} item={item} />
      </Modal.Body>
    </>
  );
}
