import React, { useState } from "react";
import { ListGroup, Modal } from "react-bootstrap";
import { EditOutlined } from "@ant-design/icons";
import ItemInfo from "./ItemInfo";
import ItemImage from "./ItemImage";
import EditItemModal from "./EditItemModal";

export default function InventoryCard({ currentItem }) {
  const [editModalOpen, setEditModalOpen] = useState(false);

  function closeModal() {
    setEditModalOpen(false);
  }

  return (
    <>
      <ListGroup.Item>
        <div className="d-flex flex-row capitalize">
          <ItemImage currentItem={currentItem} />

          <div className="mr-2 ml-2 flex-grow-1">
            <ItemInfo currentItem={currentItem} />
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
        <EditItemModal closeModal={closeModal} item={currentItem} />
      </Modal>
    </>
  );
}
