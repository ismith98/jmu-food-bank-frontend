import React, { useState } from "react";
import { ListGroup, Modal } from "react-bootstrap";
import { EditOutlined } from "@ant-design/icons";
//import { useAlert } from "../../contexts/AlertContext";
import FAQInfo from "./FAQInfo";
import EditFAQModal from "./EditFAQModal";

export default function FAQCard({ currentFAQ }) {
  //const { setErrorAlert, setSuccessAlert } = useAlert();
  const [editModalOpen, setEditModalOpen] = useState(false);

  function closeModal() {
    setEditModalOpen(false);
  }

  return (
    <>
      <ListGroup.Item>
        <div className="d-flex flex-row justify-content-center capitalize">
          <div className="mr-2 ml-2 align-self-center">
            <FAQInfo currentFAQ={currentFAQ} />
          </div>
          <div
            className="d-flex align-items-center edit-button"
            onClick={() => setEditModalOpen(true)}
          >
            <EditOutlined style={{ fontSize: "50px" }} />
          </div>
        </div>
      </ListGroup.Item>
      <Modal show={editModalOpen} onHide={closeModal}>
        <EditFAQModal closeModal={closeModal} currentFAQ={currentFAQ} />
      </Modal>
    </>
  );
}
