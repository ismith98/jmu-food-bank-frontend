import React, { useState } from "react";
import { ListGroup, Modal } from "react-bootstrap";
import { EditOutlined } from "@ant-design/icons";
import EditModal from "./EditModal";
import ItemInfo from "./ItemInfo";
import OrderInfo from "./OrderInfo";
import ItemImage from "./ItemImage";

export default function Card({ tabKey, currentItem, order }) {
  const [modalOpen, setModalOpen] = useState(false);

  function closeModal() {
    setModalOpen(false);
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
            onClick={() => setModalOpen(true)}
          >
            <EditOutlined style={{ fontSize: "50px" }} />
          </div>
        </div>
      </ListGroup.Item>
      <Modal show={modalOpen} onHide={closeModal}>
        <EditModal
          closeModal={closeModal}
          tabKey={tabKey}
          item={currentItem}
          order={order}
        />
      </Modal>
    </>
  );
}
