import React, { useState } from "react";
import { Form, Button, ListGroup, Modal } from "react-bootstrap";
import { removeFromDatabase } from "../../hooks/useFirebase";
import { useAlert } from "../../contexts/AlertContext";
import OrderItems from "./OrderItems";

export default function EditOrderForm({ order, closeModal, setEditOrder }) {
  const [itemsInOrder, setItemsInOrder] = useState(order.itemsInCart);
  const { setErrorAlert, setSuccessAlert } = useAlert();
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);

  function changeOrder(e) {
    e.preventDefault();
  }

  function removeOrder() {
    let path = "orders";
    removeFromDatabase(path, order.orderId, setErrorAlert, setSuccessAlert);
    setConfirmModalOpen(false)
    closeModal();
  }

  return (
    <Form>
      <ListGroup variant="flush">
        {itemsInOrder.map((item, index) => (
          <OrderItems item={item} key={index} setItems={setItemsInOrder} />
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
          <Button variant="danger" className="mr-3" onClick={() => setConfirmModalOpen(true)}>
            Remove Order
          </Button>
          <Button variant="secondary" onClick={() => setEditOrder(false)}>
            Go Back
          </Button>
        </div>
      </ListGroup>



      <Modal show={confirmModalOpen} onHide={() => setConfirmModalOpen(false)}>
        <Modal.Header closeButton> Are You Sure? </Modal.Header>
        <Modal.Body>
        <div className="d-flex justify-content-center mt-2">
        <Button variant="danger" className="mr-3" onClick={removeOrder}>
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
