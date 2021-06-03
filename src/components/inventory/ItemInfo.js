import React from "react";

export default function ItemInfo({ currentItem }) {
  return (
    <>
      <b>{currentItem.name}</b>
      <div> Total Inventory: {currentItem.totalInventory} </div>
      <div> Amount Reserved: {currentItem.amountReserved} </div>
      <div> Max Reservable: {currentItem.maxReservable} </div>
    </>
  );
}
