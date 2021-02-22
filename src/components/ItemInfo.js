import React from "react";

export default function ItemInfo({ currentItem }) {
  return (
    <>
      <b>{currentItem.name}</b>
      <div> Amount Reserved: {currentItem.amountReserved} </div>
      <div> Total Inventory: {currentItem.totalInventory} </div>
      <div> Max Reservable: {currentItem.maxReservable} </div>
    </>
  );
}
