import React from "react";

export default function ItemImage({ currentItem }) {
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
