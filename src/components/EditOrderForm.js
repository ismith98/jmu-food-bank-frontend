import React, { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";

export default function EditOrderForm({ order }) {
  const [items, setItems] = useState(order.itemsInCart);

  function replaceAmount(currentItem, e) {
    currentItem.amount = Number(e.target.value);
    return currentItem;
  }

  function showFormGroup(item) {
    return (
      <Form.Group key={item.name} as={Row} controlId={item.name}>
        <Form.Label column sm="4">
          {item.name}
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

      <div className="d-flex justify-content-center ">
        <Button type="submit" className="mr-3">
          Confirm Changes
        </Button>
        <Button variant="danger">Remove Order</Button>
      </div>
    </Form>
  );
}
