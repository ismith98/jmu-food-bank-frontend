import React from "react";
import { Modal, Form, Button } from "react-bootstrap";
import OrderInfo from "./OrderInfo";
import { useAlert } from "../contexts/AlertContext";
import { orderDelivered } from "../hooks/useFirebase";

export default function ConfirmDeliveredModal({ closeModal, order }) {
  const { setErrorAlert, setSuccessAlert } = useAlert();

  function confirmOrderDelivered(e) {
    e.preventDefault();
    orderDelivered(order, setErrorAlert, setSuccessAlert);
    closeModal();
  }

  return (
    <>
      <Modal.Header closeButton>Order Delivered?</Modal.Header>
      <Modal.Body>
        <Form>
          <OrderInfo order={order} />
          <div className="d-flex justify-content-center mt-2">
            <Button
              type="submit"
              className="mr-3"
              onClick={confirmOrderDelivered}
            >
              Confirm Delivered
            </Button>
            <Button variant="secondary" onClick={closeModal}>
              Close
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </>
  );
}
