import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import AddFAQModal from "../components/FAQs/AddFAQModal";
import FAQList from "../components/FAQs/FAQList";

export default function FAQs() {
  const [addModalOpen, setAddModalOpen] = useState(false);

  function closeModal() {
    setAddModalOpen(false);
  }

  function addFAQ() {
    setAddModalOpen(true);
  }

  return (
    <div>
      <h1>List of FAQs</h1>
      <Button type="submit" onClick={addFAQ}>
        Add FAQ
      </Button>
      <br />
      <br />
      <FAQList />
      <Modal show={addModalOpen} onHide={closeModal}>
        <AddFAQModal closeModal={closeModal} />
      </Modal>
    </div>
  );
}
