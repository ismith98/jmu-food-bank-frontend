import React, { useState, useContext } from "react";

const AlertContext = React.createContext();

export function useAlert() {
  return useContext(AlertContext);
}

export function AlertProvider({ children }) {
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState("");
  const [heading, setHeading] = useState("");

  function setErrorAlert(msg) {
    setVariant("danger");
    setMessage(msg);
    setShowAlert(true);
  }

  function setSuccessAlert(msg) {
    setVariant("success");
    setHeading(msg);
    setShowAlert(true);
  }

  return (
    <AlertContext.Provider
      value={{
        showAlert,
        setShowAlert,
        message,
        setErrorAlert,
        variant,
        heading,
        setSuccessAlert,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
}
