import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";

import { getCookie } from "./cookies";
import { signIn } from "./actions/signedIn";
import { setBusiness } from "./actions/business";
import { setAuthentication } from "./actions/authentication";

import Header from "./components/Header";
import WelcomeScreen from "./screens/WelcomeScreen";
import BusinessScreen from "./screens/BusinessScreen";
import CheckInScreen from "./screens/CheckInScreen";

import { makeStyles } from "@material-ui/core/styles";

export default function App() {
  const dispatcher = useDispatch();

  useEffect(() => {
    const business = getCookie("business_logged_in");
    const auth = getCookie("auth");

    if (business) {
      dispatcher(signIn());
      dispatcher(setBusiness(business));
    }

    if (auth) {
      dispatcher(setAuthentication(auth.type, auth.value));
    }
  });

  const styles = useStyles();
  return (
    <div className={styles.root}>
      <Header />
      <div className={styles.contents}>
        <Switch>
          <Route exact path="/checkin/:businessLink">
            <CheckInScreen />
          </Route>
          <Route exact path="/business">
            <BusinessScreen />
          </Route>
          <Route exact path="/">
            <WelcomeScreen />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flexGrow: 1,
    width: "100%",
    background: theme.palette.primaryBackdrop.main,
    minHeight: "100vh",
  },
  contents: {
    width: "100%",
    maxWidth: "1500px",
  },
}));
