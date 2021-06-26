import React, {useState, useEffect} from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import dayjs from "dayjs";
import { Modal } from "react-bootstrap";
import ConfirmDeliveredModal from "../orders/ConfirmDeliveredModal";


export default function Calendar({orders}) {
  const [events, setEvents] = useState([])
  const [chosenEvent, setChosenEvent] = useState({});
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  useEffect(() => setEvents(formatEvents(orders)), [orders])
  useEffect(() => console.log(chosenEvent), [chosenEvent])


  function formatEvents(orders) {
    return orders.map((order) => {
      return {title: `(${dayjs(order.pickupTime).format("h:mm a")}) ${order.orderId}`, 
        start: dayjs(order.pickupTime).format("YYYY-MM-DD"), 
        extendedProps: order }
  })
  }

  function closeModal() {
    setConfirmModalOpen(false)
  }

  function openModal(event) {
    let eventDeepClone = JSON.parse(JSON.stringify(event));
    setChosenEvent(eventDeepClone)
    setConfirmModalOpen(true)
  }

  return (
    <div style={{ backgroundColor: "white", color: "black", width: "95vw" }}>
      <FullCalendar
        headerToolbar={{
          left: "prev,next",
          center: "title",
          right: "dayGridDay,dayGridWeek",
        }}
        plugins={[dayGridPlugin]}
        initialView="dayGridWeek"
        eventClick={(info) => openModal(info.event.extendedProps)}  
        events={events}
      />
      <Modal show={confirmModalOpen} onHide={closeModal}>
        <ConfirmDeliveredModal closeModal={closeModal} order={chosenEvent} />
      </Modal>
    </div>
  );
}
