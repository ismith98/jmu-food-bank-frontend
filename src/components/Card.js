import React from "react";
import { ListGroup } from "react-bootstrap";
//import { AntDesign } from "@expo/vector-icons";
import { EditOutlined } from "@ant-design/icons";

export default function Card({ showInventory, currentItem }) {
  function itemInfo() {
    return (
      <>
        <div>{currentItem.name}</div>
        <div> Amount Reserved: {currentItem.amountReserved} </div>
        <div> Total Inventory: {currentItem.totalInventory} </div>
      </>
    );
  }

  return (
    <ListGroup.Item style={{ color: "black", textTransform: "capitalize" }}>
      <div className="d-flex flex-row">
        <img
          src={currentItem.imageUrl}
          alt={currentItem.name}
          style={{ width: "100px", height: "100px" }}
        />
        <div className="mr-2 ml-2">{itemInfo()}</div>
        <div
          className="d-flex align-items-center edit-button"
          onClick={() => console.log("edit")}
        >
          <EditOutlined style={{ fontSize: "55px" }} />
        </div>
      </div>
    </ListGroup.Item>
  );
}
