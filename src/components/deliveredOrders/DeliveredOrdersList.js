import React from "react";
import { ListGroup } from "react-bootstrap";
import DeliveredOrderCard from "./DeliveredOrderCard";

export default function DeliveredOrdersList({ orders }) {
  return (
    <ListGroup>
      {orders.map((order, index) => (
        <DeliveredOrderCard order={order} key={index} />
      ))}
    </ListGroup>
  );
}
