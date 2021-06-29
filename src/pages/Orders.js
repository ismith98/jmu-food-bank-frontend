import React, { useState, useEffect } from "react";
import { getOrders, getDeliveredOrders } from "../hooks/useFirebase";
import { Tabs, Tab } from "react-bootstrap";
import LoadingIndicator from "../components/general/LoadingIndicator";
import OrdersList from "../components/orders/OrdersList";
import DeliveredOrdersList from "../components/deliveredOrders/DeliveredOrdersList";
import Calendar from "../components/calendar/Calendar";

export default function Orders() {
    const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [deliveredOrders, setDeliveredOrders] = useState([]);
  const [tabKey, setTabKey] = useState("calendar");

  useEffect(() => {
    getOrders(setLoading, setOrders);
    getDeliveredOrders(setDeliveredOrders);
    return () => {};
  }, []);

    return (
        loading ? (
            <LoadingIndicator />
          ) : (
        <>
            <Tabs
              defaultActiveKey="calendar"
              activeKey={tabKey}
              onSelect={(key) => setTabKey(key)}
              id="ModeSelector"
              style={{ justifyContent: "center" }}
            >
                <Tab eventKey="calendar" title="Calendar">
                {/* Calendar does not display properly inside tab */}
              </Tab>
              <Tab eventKey="orders" title={`Orders (${orders.length})`}>
                <OrdersList orders={orders} />
              </Tab>
              <Tab eventKey="deliveredOrders" title="Delivered Orders">
                <DeliveredOrdersList orders={deliveredOrders} />
              </Tab>
            </Tabs>
            {tabKey === "calendar" ? <Calendar orders={orders} /> : null}
          </>
          )
    )
}
