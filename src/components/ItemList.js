import React, { useState, useEffect } from "react";
import { AlertProvider } from "../contexts/AlertContext";
import SystemAlert from "./SystemAlert";
import ListHeader from "./ListHeader";
import { ListGroup } from "react-bootstrap";
import ItemCard from "./ItemCard";
import { getItems } from "../hooks/useFirebase";

export default function ItemList() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);

  useEffect(() => {
    console.log("use effect");
    getItems(setLoading, setItems);
    return () => {};
  }, []);

  return (
    <div>
      <AlertProvider>
        <SystemAlert />
        <ListHeader />
        {loading ? (
          <>
            <div class="spinner-border" role="status">
              <span class="sr-only">Loading...</span>
            </div>
            <span style={{ display: "block" }}>
              If this takes too long, reload the page
            </span>
          </>
        ) : (
          <ListGroup>
            {items.map((item, index) => (
              <ItemCard currentItem={item} key={index} />
            ))}
          </ListGroup>
        )}
      </AlertProvider>
    </div>
  );
}
