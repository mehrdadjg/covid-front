import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { useDispatch, useSelector } from "react-redux";

import { setLastVerificationEmailTime, verifyEmail } from "../actions/business";

import {
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  TextField,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

export default function EmailVerifier() {
  const dispatcher = useDispatch();
  const business = useSelector((state) => state.business);
  const auth = useSelector((state) => state.auth);

  const [verificationCode, setVerificationCode] = useState("");
  const [requestDisabled, setRequestDisabled] = useState(true);
  const [status, setStatus] = useState({
    error: false,
    errorMessage: "",
    message: "",
  });
  const [disabled, setDisabled] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!done) {
      if (business.emailVerificationSentAt) {
        const sinceVerificationSent =
          new Date() - Date.parse(business.emailVerificationSentAt);

        if (sinceVerificationSent < 300000) {
          setRequestDisabled(() => true);
        } else {
          setRequestDisabled(() => false);
        }
        setStatus((old) => ({
          ...old,
          message: "Verification email was sent.",
        }));
      } else {
        setRequestDisabled(() => false);
        setStatus((old) => ({
          ...old,
          message: "You must verify your email address.",
        }));
      }
    } else {
      setStatus((old) => ({
        ...old,
        error: false,
        message: "Thank you for verifying your email.",
      }));
    }
  }, [business.emailVerificationSentAt, done]);

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
          setStatus((old) => ({
            ...old,
            error: false,
          }));
        } else {
          setStatus((old) => ({
            ...old,
            error: true,
            errorMessage: "Could not send email. Try again later.",
          }));
        }
      })
      .catch(() => {
        setStatus((old) => ({
          ...old,
          error: true,
          errorMessage: "Something went wrong. Contact the administrator.",
        }));
      })
      .finally(() => {
        setDisabled(() => false);
      });
  };

  const handleSubmit = () => {
    if (verificationCode.length !== 6) {
      setStatus((old) => ({
        ...old,
        error: true,
        errorMessage: "Verification code is too short.",
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
          setStatus((old) => ({
            ...old,
            error: true,
            errorMessage: "Verification code is incorrect. Try again.",
          }));
          setDisabled(() => false);
        }
      })
      .catch(() => {
        setStatus((old) => ({
          ...old,
          error: true,
          errorMessage: "Something went wrong. Contact the administrator.",
        }));
        setDisabled(() => false);
      });
  };

  const isTinyScreen = useMediaQuery({ maxWidth: 600 });

  const classes = useClasses();
  return (
    <Card
      className={classes.root}
      style={
        isTinyScreen
          ? {
              width: "90vw",
              minWidth: "auto",
              boxSizing: "border-box",
              right: "50%",
              marginRight: "-45vw",
            }
          : {}
      }
      raised={true}
    >
      <CardContent style={{ padding: "16px 16px 0px 16px" }}>
        <Typography
          variant="caption"
          color={status.error ? "error" : "textPrimary"}
        >
          {status.error ? status.errorMessage : status.message}
        </Typography>
        {disabled ? (
          <div className={classes.progressContainer}>
            <CircularProgress color="secondary" />
          </div>
        ) : null}
        <TextField
          type="text"
          margin="normal"
          variant="outlined"
          label="Verification Code"
          fullWidth
          onChange={(event) => handleTextChange(event.target.value)}
          inputProps={{ maxLength: 6, style: { textAlign: "center" } }}
        />
      </CardContent>
      <CardActions style={{ justifyContent: "flex-end" }}>
        <Button
          className={classes.requestButton}
          size="small"
          color="primary"
          disabled={requestDisabled}
          onClick={handleRequest}
        >
          Request Code
        </Button>
        <Button size="small" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </CardActions>
    </Card>
  );
}

const useClasses = makeStyles((theme) => ({
  root: {
    position: "absolute",
    margin: theme.spacing(2),
    width: "30vw",
    minWidth: 350,
    right: 0,
    borderRadius: 15,
  },
  progressContainer: {
    position: "absolute",
    width: "calc(100% - 16px)",
    textAlign: "center",
    height: "calc(100% - 16px)",
    top: "calc(50% - 20px)",
  },
  disabledContainer: { pointerEvents: "none", opacity: 0.4 },
  requestButton: { marginRight: theme.spacing(1) },
}));
