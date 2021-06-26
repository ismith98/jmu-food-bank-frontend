import React, {useState} from "react";
import { Modal } from "react-bootstrap";
import EditOrderForm from "./EditOrderForm";
import ConfirmDeliveredForm from "./ConfirmDeliveredForm";

export default function EditOrderModal({ closeModal, order }) {
  const [editOrder, setEditOrder] = useState(false)
  return (
    <>
      <Modal.Header closeButton>{editOrder ? "Edit an Order" : "Order Delivered?"}</Modal.Header>
      <Modal.Body>
        {editOrder ? 
        <EditOrderForm closeModal={closeModal} order={order} setEditOrder={setEditOrder} /> 
        :
        <ConfirmDeliveredForm closeModal={closeModal} order={order} setEditOrder={setEditOrder} />
        }
      </Modal.Body>
    </>
  );
}
