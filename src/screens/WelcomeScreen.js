import React from "react";

import { Link } from "react-router-dom";

import { Button } from "@material-ui/core";

export default function WelcomeScreen() {
  return (
    <div style={{ minHeight: 900 }}>
      <Button
        component={Link}
        to="/business"
        variant="contained"
        color="primary"
      >
        Start Now
      </Button>
    </div>
  );
}
