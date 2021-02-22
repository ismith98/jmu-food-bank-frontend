import React, { useState, useEffect } from "react";
import SystemAlert from "./SystemAlert";
import ListHeader from "./ListHeader";
import { getItems, getOrders } from "../hooks/useFirebase";
import { Tabs, Tab } from "react-bootstrap";
import LoadingIndicator from "./LoadingIndicator";
import ListMapper from "./ListMapper";

export default function List() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [tabKey, setTabKey] = useState("inventory");

  useEffect(() => {
    getItems(setLoading, setItems);
    // Without the timeout, the inventory doesn't load the first time someone visits the site
    setTimeout(() => {
      getItems(setLoading, setItems);
      getOrders(setOrders);
    }, 1000);
    return () => {};
  }, []);

  return (
    <div>
      {/* Context providers for error messages */}
      <SystemAlert />

      {/* New Item Button inside of header */}
      <ListHeader />

      {loading ? (
        <LoadingIndicator />
      ) : (
        <Tabs
          defaultActiveKey="inventory"
          activeKey={tabKey}
          onSelect={(key) => setTabKey(key)}
          id="ModeSelector"
          style={{ justifyContent: "center" }}
        >
          <Tab eventKey="inventory" title="Inventory">
            <ListMapper items={items} tabKey={tabKey} />
          </Tab>
          <Tab eventKey="orders" title={`Orders (${orders.length})`}>
            <ListMapper orders={orders} tabKey={tabKey} />
          </Tab>
        </Tabs>
      )}
    </div>
  );
}
