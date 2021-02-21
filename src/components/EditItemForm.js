import React, { useState, useEffect } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { updateItem, removeFromDatabase } from "../hooks/useFirebase";
import { useAlert } from "../contexts/AlertContext";

export default function EditItemForm({ item, closeModal }) {
  const [itemName, setItemName] = useState(item.name);
  const [amountReserved, setAmountReserved] = useState(item.amountReserved);
  const [totalInventory, setTotalInventory] = useState(item.totalInventory);
  const [itemId, setItemId] = useState(item.id);
  const { setErrorAlert, setSuccessAlert } = useAlert();

  // Update an item's values when they are changed in the DB
  useEffect(() => {
    setItemName(item.name);
    setAmountReserved(item.amountReserved);
    setTotalInventory(item.totalInventory);
    setItemId(item.id);
  }, [item]);

  function confirmChanges(e) {
    e.preventDefault();
    const itemInfo = { itemName, itemId, totalInventory };
    updateItem(itemInfo, setErrorAlert, setSuccessAlert);
    closeModal();
  }

  function removeItem() {
    let path = "foodItems";
    removeFromDatabase(path, item.id, setErrorAlert, setSuccessAlert);
    closeModal();
  }

  return (
    <Form>
      <Form.Group as={Row} controlId="itemName">
        <Form.Label column sm="4">
          Item Name
        </Form.Label>
        <Col sm="8">
          <Form.Control
            value={itemName}
            required
            onChange={(e) => setItemName(e.target.value)}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} controlId="amountReserved">
        <Form.Label column sm="4">
          Amount Reserved
        </Form.Label>
        <Col sm="8">
          <Form.Control
            value={amountReserved}
            type="number"
            onChange={(e) => setAmountReserved(e.target.value)}
            disabled
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} controlId="totalInventory">
        <Form.Label column sm="4">
          Total Inventory
        </Form.Label>
        <Col sm="8">
          <Form.Control
            value={totalInventory}
            type="number"
            required
            onChange={(e) => setTotalInventory(e.target.value)}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} controlId="itemId">
        <Form.Label column sm="4">
          Item Id
        </Form.Label>
        <Col sm="8">
          <Form.Control
            value={itemId}
            required
            onChange={(e) => setItemId(e.target.value)}
          />
        </Col>
      </Form.Group>

      <div className="d-flex justify-content-center ">
        <Button type="submit" className="mr-3" onClick={confirmChanges}>
          Confirm Changes
        </Button>
        <Button variant="danger" onClick={removeItem}>
          Remove Item
        </Button>
      </div>
    </Form>
  );
}
