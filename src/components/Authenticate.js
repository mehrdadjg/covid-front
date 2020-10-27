import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { setCookie } from "../cookies";
import { signIn } from "../actions/signedIn";
import { setBusiness } from "../actions/business";
import { setAuthentication } from "../actions/authentication";
import { showAlert as showAlertAction, hideAlert } from "../actions/alert";

import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";

export default function Authenticate() {
  const dispatcher = useDispatch();

  const [emailAddress, setEmailAddress] = useState({
    value: "",
    hasError: false,
    errorMessage: null,
  });

  const [password, setPassword] = useState({
    value: "",
    hidden: true,
    hasError: false,
    errorMessage: null,
  });

  const [signUpPage, setSignUpPage] = useState(true);
  const [waiting, setWaiting] = useState(false);
  const [info, setInfo] = useState({ exists: false, message: null });

  function showAlert(message, mode, duration = 3000) {
    dispatcher(showAlertAction(message, mode));
    setTimeout(() => {
      dispatcher(hideAlert());
    }, duration);
  }

  const handleTextChange = (value, setter) => {
    setter((old) => ({ ...old, value, hasError: false, errorMessage: null }));
  };

  const handleClickShowPassword = () => {
    setPassword((old) => ({ ...old, hidden: !old.hidden }));
  };

  const inputsAreValid = () => {
    let areValid = true;

    if (emailAddress.value === "") {
      areValid = false;
      setEmailAddress((old) => ({
        ...old,
        hasError: true,
        errorMessage: "Email address cannot be blank.",
      }));
    } else if (
      emailAddress.value.indexOf("@") === -1 ||
      emailAddress.value.indexOf("@") !== emailAddress.value.lastIndexOf("@") ||
      emailAddress.value.indexOf(".") === -1 ||
      emailAddress.value.lastIndexOf(".") < emailAddress.value.indexOf("@")
    ) {
      areValid = false;
      setEmailAddress((old) => ({
        ...old,
        hasError: true,
        errorMessage: "Invalid email address.",
      }));
    }

    if (password.value === "") {
      areValid = false;
      setPassword((old) => ({
        ...old,
        hasError: true,
        errorMessage: "Password cannot be blank.",
      }));
    } else if (password.value.length < 6) {
      areValid = false;
      setPassword((old) => ({
        ...old,
        hasError: true,
        errorMessage: "Password is too short.",
      }));
    } else if (password.value.toLowerCase() === password.value) {
      // does not have an upper case character
      areValid = false;
      setPassword((old) => ({
        ...old,
        hasError: true,
        errorMessage: "Password must contain an UPPER CASE character.",
      }));
    } else if (password.value.toUpperCase() === password.value) {
      // does not have a lower case character
      areValid = false;
      setPassword((old) => ({
        ...old,
        hasError: true,
        errorMessage: "Password must contain a lower case character.",
      }));
    } else if (!/\d/.test(password.value)) {
      // does not have a digit
      areValid = false;
      setPassword((old) => ({
        ...old,
        hasError: true,
        errorMessage: "Password must contain a digit.",
      }));
    }

    setInfo((_) => ({
      exists: false,
      message: null,
    }));

    return areValid;
  };

  const beautifyBusiness = (business) => {
    console.log(business.profile);
    console.log(typeof business.profile);
    console.log(business.profile !== {});
    return {
      email: business.email,
      emailIsVerified: business.emailVerified,
      emailVerificationSentAt: business.emailVerificationSentAt
        ? business.emailVerificationSentAt
        : null,
      profile:
        business.profile && Object.keys(business.profile).length !== 0
          ? business.profile
          : null,
    };
  };

  const handleLogin = (data, wasSignUp) => {
    const business = beautifyBusiness(data.business);

    setCookie("business_logged_in", business);
    setCookie("auth", {
      type: data.authentication.type,
      value: data.authentication.jwt,
    });

    // delete these later
    console.log(business);
    console.log({
      type: data.authentication.type,
      value: data.authentication.jwt,
    });

    dispatcher(signIn());
    dispatcher(setBusiness(business));
    dispatcher(
      setAuthentication(data.authentication.type, data.authentication.jwt)
    );

    showAlert(
      wasSignUp ? "Sign Up Successful." : "Login Successful.",
      "success"
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (inputsAreValid()) {
      setWaiting((old) => !old);

      if (signUpPage) {
        fetch("/business/signup", {
          method: "POST",
          cache: "no-cache",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: emailAddress.value,
            password: password.value,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.code === 0) {
              handleLogin(data, true);
            } else if (data.code === 1) {
              if (data.error.id === 100002) {
                setInfo((_) => ({
                  exists: true,
                  message: "Email address already exists. Try logging in.",
                }));
              } else {
                setInfo((_) => ({
                  exists: true,
                  message: "Error Unknown.",
                }));
              }
            } else {
              setInfo((_) => ({
                exists: true,
                message: "Something went wrong. Try again later.",
              }));
            }
          })
          .catch((_) => {
            setInfo((_) => ({
              exists: true,
              message: "Server down. Contact the administrator.",
            }));
          });
      } else {
        fetch("/business/login", {
          method: "POST",
          cache: "no-cache",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: emailAddress.value,
            password: password.value,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.code === 0) {
              handleLogin(data, false);
            } else if (data.code === 1) {
              if (data.error.id === 100007) {
                setInfo((_) => ({
                  exists: true,
                  message: "Incorrect business email or password.",
                }));
              } else {
                setInfo((_) => ({
                  exists: true,
                  message: "Error Unknown.",
                }));
              }
            } else {
              setInfo((_) => ({
                exists: true,
                message: "Something went wrong. Try again later.",
              }));
            }
          })
          .catch((_) => {
            setInfo((_) => ({
              exists: true,
              message: "Server down. Contact the administrator.",
            }));
          });
      }

      setWaiting((old) => !old);
    }
  };

  const classes = useStyles();

  return (
    <form
      className={classes.container}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <Grid container direction="row" alignItems="flex-start">
        <Grid item xs={1} sm={4} md={7} />
        <Grid item className={classes.textInputContainer} xs={10} sm={7} md={4}>
          <Grid container direction="row">
            <Grid item xs={12}>
              <TextField
                type="email"
                margin="normal"
                required
                variant="outlined"
                label="Email Address"
                fullWidth
                autoFocus
                disabled={waiting}
                error={emailAddress.hasError}
                helperText={emailAddress.errorMessage}
                onChange={(event) =>
                  handleTextChange(event.target.value, setEmailAddress)
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="standard-adornment-password"
                type={password.hidden ? "password" : "text"}
                margin="normal"
                required
                variant="outlined"
                label="Password"
                fullWidth
                disabled={waiting}
                error={password.hasError}
                helperText={password.errorMessage}
                onChange={(event) =>
                  handleTextChange(event.target.value, setPassword)
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={(event) => {
                          event.preventDefault();
                        }}
                      >
                        {password.hidden ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            {info.exists ? (
              <Grid item xs={12}>
                <p>{info.message}</p>
              </Grid>
            ) : null}
            <Grid item xs={12} style={{ textAlign: "center" }}>
              <Button
                component={Link}
                to="/"
                className={classes.button}
                style={{ width: "40%" }}
                variant="contained"
                color="primary"
                disabled={waiting}
              >
                Home
              </Button>
              <Button
                type="submit"
                className={classes.button}
                style={{ width: "40%" }}
                variant="contained"
                color="primary"
                disabled={waiting}
              >
                {signUpPage ? "Sign Up" : "Login"}
              </Button>
            </Grid>
            {signUpPage ? (
              <Grid item xs={12} style={{ textAlign: "center" }}>
                <Button
                  className={classes.button}
                  style={{ width: "calc(80% + 8px)" }}
                  variant="contained"
                  color="primary"
                  disabled={waiting}
                  onClick={() => {
                    setSignUpPage((old) => !old);
                    setEmailAddress((old) => ({
                      ...old,
                      hasError: false,
                      errorMessage: null,
                    }));
                    setPassword((old) => ({
                      ...old,
                      hasError: false,
                      errorMessage: null,
                    }));
                    setInfo((_) => ({
                      exists: false,
                      message: null,
                    }));
                  }}
                >
                  Have an account
                </Button>
              </Grid>
            ) : (
              <Grid item xs={12} style={{ textAlign: "center" }}>
                <Button
                  className={classes.button}
                  style={{ width: "calc(80% + 8px)" }}
                  variant="contained"
                  color="primary"
                  disabled={waiting}
                >
                  Forgotten My Password
                </Button>
                <Button
                  className={classes.button}
                  style={{ width: "calc(80% + 8px)" }}
                  variant="contained"
                  color="primary"
                  disabled={waiting}
                  onClick={() => {
                    setSignUpPage((old) => !old);
                    setEmailAddress((old) => ({
                      ...old,
                      hasError: false,
                      errorMessage: null,
                    }));
                    setPassword((old) => ({
                      ...old,
                      hasError: false,
                      errorMessage: null,
                    }));
                    setInfo((_) => ({
                      exists: false,
                      message: null,
                    }));
                  }}
                >
                  Create An Account
                </Button>
              </Grid>
            )}
          </Grid>
        </Grid>
        <Grid item xs={1} sm={1} md={1} />
      </Grid>
    </form>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
  },
  textInputContainer: {
    padding: theme.spacing(1),
  },
  button: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(1),
  },
}));
