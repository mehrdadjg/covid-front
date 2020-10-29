import React from "react";
import { useSelector } from "react-redux";

import EmailVerifier from "./EmailVerifier";
import QRCode from "./QRCode";

import { makeStyles } from "@material-ui/core/styles";

export default function BusinessOverview() {
  const business = useSelector((state) => state.business);
  const emailIsVerified = business.emailIsVerified;

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div>
        <QRCode />
      </div>
      {!emailIsVerified && <EmailVerifier />}
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: { display: "flex", width: "100%" },
}));
