import React from "react";
import { Form, Row, Col, ListGroup } from "react-bootstrap";

export default function OrderItems({ item, setItems }) {
  function updateItemAmount(e) {
    setItems((Items) =>
      Items.map((currentItem) =>
        item.name === currentItem.name
          ? replaceAmount(currentItem, e)
          : currentItem
      )
    );
  }

  function updateItemId(e) {
    setItems((Items) =>
      Items.map((currentItem) =>
        item.id === currentItem.id ? replaceId(currentItem, e) : currentItem
      )
    );
  }

  function replaceAmount(currentItem, e) {
    currentItem.amount = Number(e.target.value);
    return currentItem;
  }

  function replaceId(currentItem, e) {
    currentItem.id = e.target.value;
    return currentItem;
  }

  return (
    <ListGroup.Item className="capitalize">
      <Form.Group key={`${item.name}-amount`} as={Row} controlId={item.name}>
        <Form.Label column sm="4">
          <b>{item.name} Amount</b>
        </Form.Label>
        <Col sm="8">
          <Form.Control
            value={item.amount}
            type="number"
            onChange={updateItemAmount}
          />
        </Col>
      </Form.Group>
      <Form.Group key={`${item.name}-Id`} as={Row} controlId={`${item.name}-Id`}>
        <Form.Label column sm="4">
          {item.name} Id
        </Form.Label>
        <Col sm="8">
          <Form.Control value={item.id} onChange={updateItemId} />
        </Col>
      </Form.Group>
    </ListGroup.Item>
  );
}
