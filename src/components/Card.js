import React, { useState } from "react";
import { ListGroup, Modal } from "react-bootstrap";
import { EditOutlined } from "@ant-design/icons";
import EditModal from "./EditModal";

export default function Card({ tabKey, currentItem, order }) {
  const [modalOpen, setModalOpen] = useState(false);

  function closeModal() {
    setModalOpen(false);
  }

  function showItemInfo() {
    return (
      <>
        <b>{currentItem.name}</b>
        <div> Amount Reserved: {currentItem.amountReserved} </div>
        <div> Total Inventory: {currentItem.totalInventory} </div>
        <div> Max Reservable: {currentItem.maxReservable} </div>
      </>
    );
  }

  function showOrderInfo() {
    return (
      <>
        <div>
          Order Id: <b>{order.orderId}</b>
        </div>
        <div>
          Items:{" "}
          {order.itemsInCart.map((item, index) => {
            return index === order.itemsInCart.length - 1
              ? `${item.amount} ${item.name}`
              : `${item.amount} ${item.name}, `;
          })}
        </div>
        <div> Pick-up Time: {order.pickupTime}</div>
        <div> Time Ordered: {order.timeOrdered}</div>
      </>
    );
  }

  function showItemImage() {
    return (
      <div className="d-flex align-items-center">
        <img
          src={currentItem.imageUrl}
          alt={currentItem.name}
          style={{ width: "100px", height: "100px" }}
        />
      </div>
    );
  }

  function showOrderImage() {
    return null;
  }

  return (
    <>
      <ListGroup.Item>
        <div className="d-flex flex-row capitalize">
          {tabKey === "inventory" ? showItemImage() : showOrderImage()}

          <div className="mr-2 ml-2">
            {tabKey === "inventory" ? showItemInfo() : showOrderInfo()}
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
