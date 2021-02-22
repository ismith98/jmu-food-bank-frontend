import React, { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { removeFromDatabase } from "../hooks/useFirebase";
import { useAlert } from "../contexts/AlertContext";

export default function EditOrderForm({ order, closeModal }) {
  const [items, setItems] = useState(order.itemsInCart);
  const { setErrorAlert, setSuccessAlert } = useAlert();

  function replaceAmount(currentItem, e) {
    currentItem.amount = Number(e.target.value);
    return currentItem;
  }

  function replaceId(currentItem, e) {
    currentItem.id = e.target.value;
    return currentItem;
  }

  function removeOrder() {
    let path = "orders";
    removeFromDatabase(path, order.orderId, setErrorAlert, setSuccessAlert);
    closeModal();
  }

  function showFormGroup(item) {
    return (
      <>
        <Form.Group key={item.name} as={Row} controlId={item.name}>
          <Form.Label column sm="4">
            <b>{item.name}</b>
          </Form.Label>
          <Col sm="8">
            <Form.Control
              value={item.amount}
              type="number"
              onChange={(e) => {
                return setItems((Items) =>
                  Items.map((currentItem) =>
                    item.name === currentItem.name
                      ? replaceAmount(currentItem, e)
                      : currentItem
                  )
                );
              }}
            />
          </Col>
        </Form.Group>
        <Form.Group key={item.name} as={Row} controlId={`${item.name}-Id`}>
          <Form.Label column sm="4">
            {item.name} Id
          </Form.Label>
          <Col sm="8">
            <Form.Control
              value={item.id}
              onChange={(e) => {
                return setItems((Items) =>
                  Items.map((currentItem) =>
                    item.id === currentItem.id
                      ? replaceId(currentItem, e)
                      : currentItem
                  )
                );
              }}
            />
          </Col>
        </Form.Group>
      </>
    );
  }

  return (
    <Form /*onSubmit={handleSubmit}*/>
      <Form.Group as={Row}>
        <Form.Label column sm="4">
          Item Name
        </Form.Label>
        <Form.Label column sm="8">
          Amount
        </Form.Label>
      </Form.Group>
      {items.map((item) => showFormGroup(item))}
      <Form.Group controlId="changeLog">
        <Form.Label>How and why did you change this order?</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="What changes did you make?"
          required
        />
      </Form.Group>

      <div className="d-flex justify-content-center ">
        <Button type="submit" className="mr-3">
          Confirm Changes
        </Button>
        <Button variant="danger" onClick={removeOrder}>
          Remove Order
        </Button>
      </div>
    </Form>
  );
}
