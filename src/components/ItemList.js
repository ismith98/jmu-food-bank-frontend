import React, { useState, useEffect } from "react";
import { AlertProvider } from "../contexts/AlertContext";
import SystemAlert from "./SystemAlert";
import ListHeader from "./ListHeader";
import { ListGroup } from "react-bootstrap";
import Card from "./Card";
import { getItems, getOrders } from "../hooks/useFirebase";
import { Tabs, Tab } from "react-bootstrap";

export default function ItemList() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [tabKey, setTabKey] = useState("inventory");

  useEffect(() => {
    console.log("use effect");
    getItems(setLoading, setItems);
    // Without the timeout, the inventory doesn't load the first time someone visits the site
    setTimeout(() => {
      getItems(setLoading, setItems);
      getOrders(setOrders);
    }, 1000);
    return () => {};
  }, []);

  function showSpinner() {
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

  function listItems(tabKey) {
    return (
      <ListGroup>
        {tabKey === "inventory"
          ? items.map((item, index) => (
              <Card tabKey={tabKey} currentItem={item} key={index} />
            ))
          : orders.map((order, index) => (
              <Card tabKey={tabKey} order={order} key={index} />
            ))}
      </ListGroup>
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
          showSpinner()
        ) : (
          <Tabs
            defaultActiveKey="inventory"
            activeKey={tabKey}
            onSelect={(key) => setTabKey(key)}
            id="ModeSelector"
            style={{ justifyContent: "center" }}
          >
            <Tab eventKey="inventory" title="Inventory">
              {listItems(tabKey)}
            </Tab>
            <Tab eventKey="orders" title={`Orders (${orders.length})`}>
              {listItems(tabKey)}
            </Tab>
          </Tabs>
        )}
      </AlertProvider>
    </div>
  );
}

/* <Tabs defaultActiveKey="inventory" id="ModeSelector" style={{justifyContent: "center"}}>
            <Tab eventKey="inventory" title="Inventory">
                <AddLocalPlayers />
            </Tab>
            <Tab eventKey="orders" title="Orders">
                
            </Tab>
        </Tabs> */
