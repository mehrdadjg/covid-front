import React, { useState } from "react";
import { useParams } from "react-router";

import { Button, Grid, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

export default function CheckIn() {
  let { businessID } = useParams();

  const [status, setStatus] = useState({
    email: "",
    fname: "",
    lname: "",
    birthday: null,

    errorMessage: "",
  });

  const isValidEmail = (email) => {
    if (email === "") {
      return { isValid: false, message: "Email address cannot be empty." };
    } else if (
      email.indexOf("@") === -1 ||
      email.indexOf("@") !== email.lastIndexOf("@") ||
      email.indexOf(".") === -1 ||
      email.lastIndexOf(".") < email.indexOf("@")
    ) {
      return { isValid: false, message: "Email address is invalid." };
    }

    return { isValid: true, message: null };
  };

  const handleChange = (event, field) => {
    event.persist();
    if (field === "birthday") {
      const [year, month, day] = event.target.value.split("-");
      const birthday = new Date(year, month, day);

      setStatus((old) => ({
        ...old,
        birthday: birthday,
      }));
    } else {
      setStatus((old) => {
        const newstatus = { ...old };

        newstatus[field] = event.target.value;
        if (field === "email") newstatus.errorMessage = "";

        return newstatus;
      });
    }
  };

  const handleSubmit = () => {
    const { isValid, message } = isValidEmail(status.email);

    if (!isValid) {
      setStatus((old) => ({
        ...old,
        errorMessage: message,
      }));

      return;
    }
  };

  const classes = useClasses();
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Grid container direction="row" spacing={2} justify="center">
          <Grid item>
            <Typography variant="body2" xs={12}>
              Please fill in the form below and click on submit.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email Address"
              variant="outlined"
              required
              InputLabelProps={{
                classes: {
                  asterisk: classes.asterisk,
                },
              }}
              fullWidth
              onChange={(event) => {
                handleChange(event, "email");
              }}
              error={status.errorMessage.toLowerCase().includes("email")}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="First Name"
              variant="outlined"
              fullWidth
              onChange={(event) => {
                handleChange(event, "fname");
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Last Name"
              variant="outlined"
              fullWidth
              onChange={(event) => {
                handleChange(event, "lname");
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Birthday"
              variant="outlined"
              fullWidth
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(event) => {
                handleChange(event, "birthday");
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <div className={classes.buttonContainer}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </div>
          </Grid>
          {status.errorMessage && (
            <Grid item xs={12}>
              <Typography variant="caption" color="error">
                {status.errorMessage}
              </Typography>
            </Grid>
          )}
        </Grid>
      </div>
    </div>
  );
}

const useClasses = makeStyles((theme) => ({
  root: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  container: {
    maxWidth: 450,
    margin: theme.spacing(2),
    padding: theme.spacing(1),
    backgroundColor: "rgba(255,255,255,0.85)",
    borderRadius: 15,
    border: "1px solid black",
    boxShadow: "5px 20px 20px rgba(0,0,0,0.2), 0px 0px 20px rgba(0,0,0,0.5)",
  },
  buttonContainer: {
    width: "100%",
    textAlign: "center",
  },
  asterisk: {
    color: "red",
  },
}));
