import React from "react";
import { ListGroup } from "react-bootstrap";
import InventoryCard from "./InventoryCard";

export default function InventoryList({ items }) {
  return (
    <ListGroup>
      {items.map((item, index) => (
        <InventoryCard currentItem={item} key={index} />
      ))}
    </ListGroup>
  );
}
