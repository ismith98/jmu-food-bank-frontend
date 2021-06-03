import React from "react";
import { Modal } from "react-bootstrap";
import EditOrderForm from "./EditOrderForm";

export default function EditOrderModal({ closeModal, order }) {
  return (
    <>
      <Modal.Header closeButton>Edit an Order</Modal.Header>
      <Modal.Body>
        <EditOrderForm closeModal={closeModal} order={order} />
      </Modal.Body>
    </>
  );
}
