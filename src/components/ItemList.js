import React, { useState, useEffect } from "react";
import { AlertProvider } from "../contexts/AlertContext";
import SystemAlert from "./SystemAlert";
import ListHeader from "./ListHeader";
import { ListGroup } from "react-bootstrap";
import Card from "./Card";
import { getItems } from "../hooks/useFirebase";

export default function ItemList() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);

  useEffect(() => {
    console.log("use effect");
    getItems(setLoading, setItems);
    // Without the timeout, the inventory doesn't load the first time someone visits the site
    setTimeout(() => getItems(setLoading, setItems), 1000);
    return () => {};
  }, []);

  function spinner() {
    return (
      <>
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        <span style={{ display: "block" }}>
          If inventory doesn't load, refresh the page
        </span>
      </>
    );
  }

  return (
    <div>
      {/* Context providers for error messages */}
      <AlertProvider>
        <SystemAlert />

        {/* New Item Button inside of header */}
        <ListHeader />

        {loading ? (
          spinner()
        ) : (
          <ListGroup>
            {items.map((item, index) => (
              <Card currentItem={item} key={index} />
            ))}
          </ListGroup>
        )}
      </AlertProvider>
    </div>
  );
}
