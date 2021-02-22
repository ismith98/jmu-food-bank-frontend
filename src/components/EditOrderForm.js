import React, { useState } from "react";
import { Form, Button, ListGroup } from "react-bootstrap";
import { removeFromDatabase } from "../hooks/useFirebase";
import { useAlert } from "../contexts/AlertContext";
import OrderItems from "./OrderItems";

export default function EditOrderForm({ order, closeModal }) {
  const [items, setItems] = useState(order.itemsInCart);
  const { setErrorAlert, setSuccessAlert } = useAlert();

  function changeOrder(e) {
    e.preventDefault();
  }

  function removeOrder() {
    let path = "orders";
    removeFromDatabase(path, order.orderId, setErrorAlert, setSuccessAlert);
    closeModal();
  }

  return (
    <Form>
      <ListGroup variant="flush">
        {items.map((item) => (
          <OrderItems item={item} setItems={setItems} />
        ))}

        <Form.Group controlId="changeLog" className="mt-3">
          <Form.Label>What changes did you make and why?</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="What changes did you make?"
            required
          />
        </Form.Group>

        <div className="d-flex justify-content-center ">
          <Button type="submit" className="mr-3" onClick={changeOrder}>
            Confirm Changes
          </Button>
          <Button variant="danger" onClick={removeOrder}>
            Remove Order
          </Button>
        </div>
      </ListGroup>
    </Form>
  );
}
