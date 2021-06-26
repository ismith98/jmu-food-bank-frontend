import React, { useState, useEffect } from "react";
import SystemAlert from "./general/SystemAlert";
import NewItemButton from "./newItem/NewItemButton";
import { getItems, getOrders, getDeliveredOrders } from "../hooks/useFirebase";
import { Tabs, Tab } from "react-bootstrap";
import LoadingIndicator from "./general/LoadingIndicator";
import InventoryList from "./inventory/InventoryList";
import OrdersList from "./orders/OrdersList";
import DeliveredOrdersList from "./deliveredOrders/DeliveredOrdersList";
import Calendar from "./calendar/Calendar";

export default function List() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [deliveredOrders, setDeliveredOrders] = useState([]);
  const [tabKey, setTabKey] = useState("inventory");

  useEffect(() => {
    getItems(setLoading, setItems);
    // Without the timeout, the inventory doesn't load the first time someone visits the site
    setTimeout(() => {
      getItems(setLoading, setItems);
      getOrders(setOrders);
      getDeliveredOrders(setDeliveredOrders);
    }, 1000);
    return () => {};
  }, []);

  return (
    <div>
      {/* Component for System Messages */}
      <SystemAlert />

      {/* New Item Button inside of header */}
      <NewItemButton />

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
            <InventoryList items={items} />
          </Tab>
          <Tab eventKey="orders" title={`Orders (${orders.length})`}>
            <OrdersList orders={orders} />
          </Tab>
          <Tab eventKey="deliveredOrders" title="Delivered Orders">
            <DeliveredOrdersList orders={deliveredOrders} />
          </Tab>
          <Tab eventKey="calendar" title="Calendar">
            {/* Calendar does not display properly inside tab */}
          </Tab>
        </Tabs>
      )}
      {tabKey === "calendar" ? <Calendar orders={orders} /> : null}
      
    </div>
  );
}
