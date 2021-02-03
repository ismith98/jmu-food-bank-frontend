import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import NewItemModal from "./NewItemModal";

export default function ListHeader() {
  const [modalOpen, setModalOpen] = useState(false);

  function handleClick() {
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
  }

  return (
    <div>
      <Button onClick={handleClick} className="mb-2">
        Add Item
      </Button>
      <Modal show={modalOpen} onHide={closeModal}>
        <NewItemModal closeModal={closeModal} />
      </Modal>
    </div>
  );
}
