import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

import Lottie from "lottie-web";

import { AddVisitRequest } from "../api/Request";

import { Button, Grid, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

/**
 * A component used for adding new visits to a business.
 *
 * @component
 */
export default function CheckIn(props) {
  const auth = useSelector((state) => state.auth);

  const { dummy } = props;

  const { businessLink } = useParams();

  const [status, setStatus] = useState({
    email: "",
    fname: "",
    lname: "",
    birthday: null,

    errorMessage: "",

    waiting: false,
    successful: false,
    submissionMessage: "",
  });

  const successfulContainer = useRef(null);

  /**
   * Given a string, determines whether it's a valid email address or not.
   *
   * @param   {String} email
   * @returns {Boolean}
   */
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

  useEffect(() => {
    if (auth.type) {
      fetch("/business/visits/getcount", {
        method: "POST",
        cache: "no-cache",
        headers: {
          Authorization: `${auth.type} ${auth.value}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: new Date("2020-11-07T04:24:07.901+00:00"),
          to: new Date(),
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.code === 0) {
            console.log(data.count);
          } else {
            console.log({ data });
          }
        })
        .catch((error) => {
          console.log({ error });
        });
    }
  }, [auth.type, auth.value]);

  /**
   * Handles changing the status.
   *
   * @param {Object} event The event that fired this method.
   * @param {String} field The field to be changed.
   */
  const handleChange = (event, field) => {
    event.persist();
    if (field === "birthday") {
      const [year, month, day] = event.target.value.split("-");

      // Date constructor expects month to be 0-indexed
      const birthday = new Date(year, month - 1, day);

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

  /**
   * Handles submitting a new visit.
   */
  const handleSubmit = () => {
    const { isValid, message } = isValidEmail(status.email);

    if (!isValid) {
      setStatus((old) => ({
        ...old,
        errorMessage: message,
      }));

      return;
    }

    setStatus((old) => ({
      ...old,
      waiting: true,
    }));

    const newVisitor = {
      email: status.email,
      link: businessLink,
      dummy: dummy,
    };
    status.fname && (newVisitor.fname = status.fname);
    status.lname && (newVisitor.lname = status.lname);
    status.birthday && (newVisitor.birthday = status.birthday);

    const request = new AddVisitRequest()
      .setParam("email", status.email)
      .setParam("link", businessLink)
      .setParam("dummy", dummy)
      .setParamConditional("fname", status.fname)
      .setParamConditional("lname", status.lname)
      .setParamConditional("birthday", status.birthday);

    console.log(request);

    fetch("/business/visits/add", {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newVisitor),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.code === 0) {
          setStatus((old) => ({
            ...old,
            successful: true,
            submissionMessage: data.submissionMessage
              ? data.submissionMessage
              : "Your visit was recorded successfully.",
            errorMessage: "",
          }));

          const success = require("../animations/successful.json");
          Lottie.loadAnimation({
            container: successfulContainer.current,
            renderer: "svg",
            loop: false,
            autoplay: true,
            animationData: success,
          });
        } else {
          if (data.error.id === 100032) {
            setStatus((old) => ({
              ...old,
              errorMessage: data.error.message,
            }));
          } else {
            setStatus((old) => ({
              ...old,
              errorMessage: "Something went wrong. Try again shortly.",
            }));
          }
        }
      })
      .catch(() => {
        setStatus((old) => ({
          ...old,
          errorMessage: "Something went wrong. Contact the administrator.",
        }));
      })
      .finally(() => {
        setStatus((old) => ({
          ...old,
          waiting: false,
        }));
      });
  };

  const classes = useClasses();
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Grid
          container
          direction="row"
          spacing={2}
          justify="center"
          style={{ visibility: status.successful ? "hidden" : "visible" }}
        >
          <Grid item xs={12}>
            <Typography variant="body2">
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
              disabled={status.waiting}
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
              disabled={status.waiting}
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
              disabled={status.waiting}
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
              disabled={status.waiting}
            />
          </Grid>
          <Grid item xs={12}>
            <div className={classes.buttonContainer}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                disabled={status.waiting}
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
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          style={{
            position: "absolute",
            top: 0,
            height: "100%",
            width: "calc(100% - 16px)",
            visibility: status.successful ? "visible" : "collapse",
          }}
        >
          <Grid item xs={12}>
            <div
              style={{
                width: "100%",
                height: 200,
                overflow: "hidden",
              }}
              ref={successfulContainer}
            ></div>
          </Grid>
          <Grid item style={{ textAlign: "center" }}>
            <Typography variant="body2">{status.submissionMessage}</Typography>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

CheckIn.propTypes = { dummy: PropTypes.bool };
CheckIn.defaultProps = { dummy: false };

const useClasses = makeStyles((theme) => ({
  root: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  container: {
    position: "relative",
    maxWidth: 450,
    margin: theme.spacing(2),
    padding: theme.spacing(1),
    backgroundColor: "rgba(255,255,255,0.85)",
    borderRadius: 15,
    border: "1px solid black",
    boxShadow: "5px 20px 20px rgba(0,0,0,0.2), 0px 0px 20px rgba(0,0,0,0.5)",
    transition: "all 1s ease",
  },
  buttonContainer: {
    width: "100%",
    textAlign: "center",
  },
  asterisk: {
    color: "red",
  },
}));
