import React from "react";
import { useSelector } from "react-redux";

import Authenticate from "../components/Authenticate";
import Dashboard from "../components/Dashboard";
import Alert from "../components/Alert";

export default function BusinessScreen() {
  const isSignedIn = useSelector((state) => state.isSignedIn);

  const alert = useSelector((state) => state.alert);

  return (
    <div style={{ width: "100%" }}>
      {isSignedIn ? <Dashboard /> : <Authenticate />}
      <Alert open={alert.visible} message={alert.message} mode={alert.mode} />
    </div>
  );
}
