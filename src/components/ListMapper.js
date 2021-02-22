import React from "react";
import { ListGroup } from "react-bootstrap";
import Card from "./Card";

export default function ListMapper({ tabKey, items = [], orders = [] }) {
  return (
    <ListGroup>
      {tabKey === "inventory"
        ? items.map((item, index) => (
            <Card currentItem={item} tabKey={tabKey} key={index} />
          ))
        : orders.map((order, index) => (
            <Card order={order} tabKey={tabKey} key={index} />
          ))}
    </ListGroup>
  );
}
