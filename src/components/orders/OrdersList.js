import React from "react";
import { ListGroup } from "react-bootstrap";
import OrderCard from "./OrderCard";

export default function OrdersList({ orders }) {
  return (
    <ListGroup>
      {orders.map((order, index) => (
        <OrderCard order={order} key={index} />
      ))}
    </ListGroup>
  );
}
