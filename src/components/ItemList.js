import React from "react";
import { AlertProvider } from "../contexts/AlertContext";
import SystemAlert from "./SystemAlert";
import ListHeader from "./ListHeader";

export default function ItemList() {
  return (
    <div>
      <AlertProvider>
        <SystemAlert />
        <ListHeader />
      </AlertProvider>
    </div>
  );
}
