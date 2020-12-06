import React from "react";
import Alert from "react-bootstrap/Alert";
import { useSelector } from "react-redux";

function MyAlerts() {
  const { alertType, msg } = useSelector((state) => {
    return state.alert;
  });

  return <Alert variant={alertType}>{msg}</Alert>;
}

export default MyAlerts;
