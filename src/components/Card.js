import React, { useState } from "react";
import { ListGroup, Modal } from "react-bootstrap";
import { EditOutlined, CheckOutlined } from "@ant-design/icons";
import EditModal from "./EditModal";
import ItemInfo from "./ItemInfo";
import OrderInfo from "./OrderInfo";
import ItemImage from "./ItemImage";
import ConfirmDeliveredModal from "./ConfirmDeliveredModal";

export default function Card({ tabKey, currentItem, order }) {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);

  function closeModal() {
    setEditModalOpen(false);
    setConfirmModalOpen(false);
  }

  return (
    <>
      <ListGroup.Item>
        <div className="d-flex flex-row capitalize">
          {tabKey === "inventory" ? (
            <ItemImage currentItem={currentItem} />
          ) : null}

          <div className="mr-2 ml-2">
            {tabKey === "inventory" ? (
              <ItemInfo currentItem={currentItem} />
            ) : (
              <OrderInfo order={order} />
            )}
          </div>
          <div
            className="d-flex align-items-center edit-button"
            onClick={() => setEditModalOpen(true)}
          >
            <EditOutlined style={{ fontSize: "50px" }} />
          </div>
          {tabKey !== "inventory" ? (
            <div
              className="d-flex align-items-center checkmark-button"
              onClick={() => setConfirmModalOpen(true)}
            >
              <CheckOutlined style={{ fontSize: "50px" }} />
            </div>
          ) : null}
        </div>
      </ListGroup.Item>
      <Modal show={editModalOpen} onHide={closeModal}>
        <EditModal
          closeModal={closeModal}
          tabKey={tabKey}
          item={currentItem}
          order={order}
        />
      </Modal>
      <Modal show={confirmModalOpen} onHide={closeModal}>
        <ConfirmDeliveredModal closeModal={closeModal} order={order} />
      </Modal>
    </>
  );
}
