import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { removeCookie } from "../cookies";
import { signOut } from "../actions/signedIn";
import { resetBusiness } from "../actions/business";
import { resetAuthentication } from "../actions/authentication";
import { showAlert as showAlertAction, hideAlert } from "../actions/alert";

import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Grid,
  Typography,
} from "@material-ui/core";

export default function StatusBar() {
  const dispatcher = useDispatch();
  const business = useSelector((state) => state.business);

  const [dialogOpen, setDialogOpen] = useState(false);

  function showAlert(message, mode, duration = 3000) {
    dispatcher(showAlertAction(message, mode));
    setTimeout(() => {
      dispatcher(hideAlert());
    }, duration);
  }

  const handleLogout = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleDialogYes = () => {
    removeCookie("business_logged_in");
    removeCookie("auth");

    dispatcher(resetBusiness());
    dispatcher(resetAuthentication());
    dispatcher(signOut());

    showAlert("Logout Successful.", "error");
  };

  const status = business.profile
    ? business.emailIsVerified
      ? "Welcome"
      : "Please verify your email address."
    : business.emailIsVerified
    ? "Please complete your profile."
    : "Please complete your profile and verify your email address.";

  return (
    <div>
      <Grid
        style={{ padding: 8 }}
        container
        direction="row"
        alignItems="center"
      >
        <Grid item xs={12} sm={9}>
          <Typography variant="body2">{status}</Typography>
        </Grid>
        <Grid item style={{ textAlign: "end" }} xs={12} sm={3}>
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<ExitToAppIcon />}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Grid>
      </Grid>

      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to logout?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleDialogClose}
            autoFocus
          >
            No
          </Button>
          <Button variant="outlined" color="primary" onClick={handleDialogYes}>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
