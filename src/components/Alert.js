import React from "react";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

export default function Alert(props) {
  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={props.open}
      key={props.message}
    >
      <MuiAlert variant="filled" severity={props.mode}>
        {props.message}
      </MuiAlert>
    </Snackbar>
  );
}
