import React, { useState } from "react";
import { ListGroup, Modal } from "react-bootstrap";
import { EditOutlined, CheckOutlined } from "@ant-design/icons";
import OrderInfo from "./OrderInfo";
import EditOrderModal from "./EditOrderModal";
import ConfirmDeliveredModal from "./ConfirmDeliveredModal";

export default function OrderCard({ order }) {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);

  function closeModal() {
    setEditModalOpen(false);
    setConfirmModalOpen(false);
  }

  return (
    <>
      <ListGroup.Item>
        <div className="d-flex flex-row justify-content-center capitalize">
          <div className="mr-2 ml-2">
            <OrderInfo order={order} />
          </div>
          <div
            className="d-flex align-items-center edit-button"
            onClick={() => setEditModalOpen(true)}
          >
            <EditOutlined style={{ fontSize: "50px" }} />
          </div>
          <div
            className="d-flex align-items-center checkmark-button"
            onClick={() => setConfirmModalOpen(true)}
          >
            <CheckOutlined style={{ fontSize: "50px" }} />
          </div>
        </div>
      </ListGroup.Item>
      <Modal show={editModalOpen} onHide={closeModal}>
        <EditOrderModal closeModal={closeModal} order={order} />
      </Modal>
      <Modal show={confirmModalOpen} onHide={closeModal}>
        <ConfirmDeliveredModal closeModal={closeModal} order={order} />
      </Modal>
    </>
  );
}
