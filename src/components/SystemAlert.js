import React from "react";
import { useAlert } from "../contexts/AlertContext";
import { Alert } from "react-bootstrap";

export default function SystemAlert() {
  const { showAlert, setShowAlert, message, variant, heading } = useAlert();
  if (showAlert) {
    if (variant === "danger") {
      return (
        <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
          <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
          <p>{message}</p>
        </Alert>
      );
    }
    if (variant === "success") {
      return (
        <Alert
          variant="success"
          onClose={() => setShowAlert(false)}
          dismissible
        >
          <Alert.Heading>{heading}</Alert.Heading>
        </Alert>
      );
    }
  }
  return <></>;
}
