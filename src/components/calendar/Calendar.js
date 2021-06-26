import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

export default function Calendar() {
  return (
    <div style={{ backgroundColor: "white", color: "black" }}>
      <FullCalendar
        headerToolbar={{
          left: "prev,next",
          center: "title",
          right: "dayGridDay,dayGridWeek",
        }}
        plugins={[dayGridPlugin]}
        initialView="dayGridWeek"
        eventClick={() => console.log("hello world")}
      />
    </div>
  );
}
