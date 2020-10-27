import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setLastVerificationEmailTime, verifyEmail } from "../actions/business";

import {
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

export default function EmailVerifier() {
  const dispatcher = useDispatch();
  const business = useSelector((state) => state.business);
  const auth = useSelector((state) => state.auth);

  const [verificationCode, setVerificationCode] = useState("");
  const [requestVisible, setRequestVisibility] = useState(false);
  const [status, setStatus] = useState("Wait for it...");
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState({ has: false, message: "" });
  const [done, setDone] = useState(false);

  const updateStatusAndRequestVisibility = () => {
    if (!done) {
      if (business.emailVerificationSentAt) {
        const sinceVerificationSent =
          new Date() - Date.parse(business.emailVerificationSentAt);

        if (sinceVerificationSent < 300000) {
          setRequestVisibility(() => false);
          setStatus(
            () =>
              "Verification email was sent. You can request a new code in 5 minutes."
          );
        } else {
          setRequestVisibility(() => true);
          setStatus(() => "Verification email was sent.");
        }
      } else {
        setStatus(() => "You must verify your email address.");
      }
    } else {
      setStatus(() => "Thank you for verifying your email.");
    }
  };

  useEffect(() => {
    updateStatusAndRequestVisibility();

    const id = setInterval(() => {
      updateStatusAndRequestVisibility();
    }, 5000);
    return () => {
      clearInterval(id);
    };
  });

  const handleTextChange = (value) => {
    setVerificationCode(() => value);
  };

  const handleRequest = () => {
    setDisabled(() => true);
    fetch("/business/verify/get", {
      headers: {
        Authorization: `${auth.type} ${auth.value}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.code === 0) {
          let emailVerificationSentAt = data.verificationSentAt;

          dispatcher(setLastVerificationEmailTime(emailVerificationSentAt));
          setError((old) => ({ ...old, has: false }));
        } else {
          setError(() => ({
            has: true,
            message: "Could not send email. Try again later.",
          }));
        }
      })
      .catch(() => {
        setError(() => ({
          has: true,
          message: "Something went wrong. Contact the administrator.",
        }));
      })
      .finally(() => {
        setDisabled(() => false);
      });
  };

  const handleSubmit = () => {
    if (verificationCode.length !== 6) {
      setError(() => ({
        has: true,
        message: "Verification code is too short.",
      }));
      return;
    }
    setDisabled(() => true);
    fetch("/business/verify/submit", {
      method: "POST",
      cache: "no-cache",
      headers: {
        Authorization: `${auth.type} ${auth.value}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        verificationCode: verificationCode,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.code === 0) {
          setDone(() => true);

          setTimeout(() => {
            dispatcher(verifyEmail());
          }, 3000);
        } else {
          setError(() => ({
            has: true,
            message: "Verification code is incorrect. Try again.",
          }));
          setDisabled(() => false);
        }
      })
      .catch(() => {
        setError(() => ({
          has: true,
          message: "Something went wrong. Contact the administrator.",
        }));
        setDisabled(() => false);
      });
  };

  const classes = useClasses();
  return (
    <div className={classes.root}>
      <Typography variant="caption">Status: {status}</Typography>
      {disabled ? (
        <div className={classes.progressContainer}>
          <CircularProgress color="secondary" />
        </div>
      ) : null}
      <div style={disabled ? { pointerEvents: "none", opacity: 0.4 } : {}}>
        <Grid container direction="row">
          <Grid item xs={12}>
            <TextField
              type="text"
              margin="normal"
              variant="outlined"
              label="Verification Code"
              fullWidth
              onChange={(event) => handleTextChange(event.target.value)}
              inputProps={{ maxLength: 6, style: { textAlign: "center" } }}
            />
          </Grid>
          <Grid item xs={12} className={classes.buttonsContainer}>
            {requestVisible ? (
              <Button
                className={classes.requestButton}
                variant="contained"
                color="primary"
                onClick={handleRequest}
              >
                Request New Code
              </Button>
            ) : null}

            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </Grid>
          {error.has ? (
            <Grid item xs={12}>
              <Typography variant="caption">Error: {error.message}</Typography>
            </Grid>
          ) : null}
        </Grid>
      </div>
    </div>
  );
}

const useClasses = makeStyles((theme) => ({
  root: { position: "relative", padding: theme.spacing(1) },
  progressContainer: {
    position: "absolute",
    width: "calc(100% - 16px)",
    textAlign: "center",
    height: "calc(100% - 16px)",
    top: "calc(50% - 20px)",
  },
  disabledContainer: { pointerEvents: "none", opacity: 0.4 },
  buttonsContainer: { textAlign: "end" },
  requestButton: { marginRight: theme.spacing(1) },
}));
