import React, { useState, useContext } from "react";

const AlertContext = React.createContext();

export function useAlert() {
  return useContext(AlertContext);
}

export function AlertProvider({ children }) {
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState("");

  function setErrorAlert(msg) {
    setMessage(msg);
    setShowAlert(true);
  }

  function setSuccessAlert(msg) {
    setMessage(msg);
    setShowAlert(true);
    console.log("success", showAlert);
  }

  return (
    <AlertContext.Provider
      value={{
        showAlert,
        setShowAlert,
        message,
        setErrorAlert,
        setSuccessAlert,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
}
