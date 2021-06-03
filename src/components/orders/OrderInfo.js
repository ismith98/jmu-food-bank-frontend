import React from "react";

export default function OrderInfo({ order }) {
  return (
    <>
      <div>
        Order Id: <b>{order.orderId}</b>
      </div>
      <div className="capitalize">
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
