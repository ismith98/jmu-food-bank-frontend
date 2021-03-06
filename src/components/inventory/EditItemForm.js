import React, { useState, useEffect } from "react";
import { Form, Row, Col, Button, Modal } from "react-bootstrap";
import { updateItem, removeFromDatabase } from "../../hooks/useFirebase";
import { useAlert } from "../../contexts/AlertContext";

export default function EditItemForm({ item, closeModal }) {
  const [itemName, setItemName] = useState(item.name);
  const [amountReserved, setAmountReserved] = useState(item.amountReserved);
  const [totalInventory, setTotalInventory] = useState(item.totalInventory);
  const [maxReservable, setMaxReservable] = useState(item.maxReservable);
  const [itemId, setItemId] = useState(item.id);
  const { setErrorAlert, setSuccessAlert } = useAlert();
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);

  // Update an item's values when they are changed in the DB
  useEffect(() => {
    setItemName(item.name);
    setAmountReserved(item.amountReserved);
    setTotalInventory(item.totalInventory);
    setMaxReservable(item.maxReservable);
    setItemId(item.id);
  }, [item]);

  function confirmChanges(e) {
    e.preventDefault();
    const itemInfo = {
      name: itemName,
      id: itemId,
      totalInventory: Number(totalInventory),
      maxReservable: Number(maxReservable),
      amountReserved: amountReserved,
      imageUrl: item.imageUrl,
    };
    let oldId = item.id;
    let path = "app/pantryItems";
    updateItem(path, itemInfo, oldId, setErrorAlert, setSuccessAlert);
    closeModal();
  }

  function removeItem() {
    let path = "app/pantryItems";
    removeFromDatabase(path, item.id, setErrorAlert, setSuccessAlert);
    setConfirmModalOpen(false);
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
      <Form.Group as={Row} controlId="maxReservable">
        <Form.Label column sm="4">
          Max Reservable (per person)
        </Form.Label>
        <Col sm="8">
          <Form.Control
            value={maxReservable}
            type="number"
            required
            onChange={(e) => setMaxReservable(e.target.value)}
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
        <Button variant="danger" className="mr-3" onClick={() => setConfirmModalOpen(true)}>
          Remove Item
        </Button>
        <Button variant="secondary" className="mr-3" onClick={closeModal}>
          Close
        </Button>
      </div>


      <Modal show={confirmModalOpen} onHide={() => setConfirmModalOpen(false)}>
        <Modal.Header closeButton> Are You Sure? </Modal.Header>
        <Modal.Body>
        <div className="d-flex justify-content-center mt-2">
        <Button variant="danger" className="mr-3" onClick={removeItem}>
            Remove Order
          </Button>
          <Button variant="secondary" onClick={() => setConfirmModalOpen(false)}>
            Go Back
          </Button>
          </div>
        </Modal.Body>
      </Modal>
    </Form>
  );
}
