import React from "react";
import { Form, Button } from "react-bootstrap";
import OrderInfo from "./OrderInfo";
import { useAlert } from "../../contexts/AlertContext";
import { orderDelivered } from "../../hooks/useFirebase";

export default function ConfirmDeliveredForm({ closeModal, order, setEditOrder }) {
  const { setErrorAlert, setSuccessAlert } = useAlert();

  function confirmOrderDelivered(e) {
    e.preventDefault();
    orderDelivered(order, setErrorAlert, setSuccessAlert);
    closeModal();
  }

  return (
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
            <Button
              variant="info"
              className="mr-3"
              onClick={() => setEditOrder(true)}
            >
              Edit Order
            </Button>
            <Button
              variant="secondary"
              className="mr-3"
              onClick={closeModal}
            >
              Close
            </Button>
          </div>
        </Form>
  );
}
