import React, { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";

export default function EditItemForm({ item }) {
  const [itemName, setItemName] = useState(item.name);
  const [amountReserved, setAmountReserved] = useState(item.amountReserved);
  const [totalInventory, setTotalInventory] = useState(item.totalInventory);

  return (
    <Form /*onSubmit={handleSubmit}*/>
      <Form.Group as={Row} controlId="itemName">
        <Form.Label column sm="4">
          Item Name
        </Form.Label>
        <Col sm="8">
          <Form.Control
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} controlId="itemName">
        <Form.Label column sm="4">
          Amount Reserved
        </Form.Label>
        <Col sm="8">
          <Form.Control
            value={amountReserved}
            type="number"
            onChange={(e) => setAmountReserved(e.target.value)}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} controlId="itemName">
        <Form.Label column sm="4">
          Total Inventory
        </Form.Label>
        <Col sm="8">
          <Form.Control
            value={totalInventory}
            type="number"
            onChange={(e) => setTotalInventory(e.target.value)}
          />
        </Col>
      </Form.Group>

      <div className="d-flex justify-content-center ">
        <Button type="submit" className="mr-3">
          Confirm Changes
        </Button>
        <Button variant="danger">Remove Item</Button>
      </div>
    </Form>
  );
}
