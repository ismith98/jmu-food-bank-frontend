import React from "react";
import { ListGroup } from "react-bootstrap";
import OrderInfo from "../orders/OrderInfo";

export default function DeliveredOrderCard({ order }) {
  return (
    <ListGroup.Item>
      <div className="d-flex flex-row capitalize">
        <div className="mr-2 ml-2">
          <OrderInfo order={order} />
        </div>
      </div>
    </ListGroup.Item>
  );
}
