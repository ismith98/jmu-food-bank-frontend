import React from "react";
import { Modal } from "react-bootstrap";
import EditItemForm from "./EditItemForm";
import EditOrderForm from "./EditOrderForm";

export default function EditModal({ closeModal, tabKey, item, order }) {
  return (
    <>
      <Modal.Header closeButton>
        {tabKey === "inventory" ? "Edit an item" : "Edit an Order"}
      </Modal.Header>
      <Modal.Body>
        {tabKey === "inventory" ? (
          <EditItemForm closeModal={closeModal} item={item} />
        ) : (
          <EditOrderForm closeModal={closeModal} order={order} />
        )}
      </Modal.Body>
    </>
  );
}
