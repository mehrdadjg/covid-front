import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";

import EmailVerifier from "./EmailVerifier";
import Profile from "./Profile";
import QRCode from "./QRCode";
import StatusBar from "./StatusBar";

import {
  FormControl,
  Grid,
  MenuItem,
  Select,
  Tab,
  Tabs,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

export default function Dashboard() {
  const business = useSelector((state) => state.business);
  const emailIsVerified = business.emailIsVerified;

  const [tabIndex, setTabIndex] = useState(0);
  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };
  const handleSelectChange = (event) => {
    setTabIndex(event.target.value);
  };

  const menuItems = [
    { name: "Overview", index: 0 },
    { name: "Profile", index: 1 },
    { name: "Customization", index: 2 },
    { name: "Item Four", index: 3 },
    { name: "Item Five", index: 4 },
    { name: "Item Six", index: 5 },
    { name: "Item Seven", index: 6 },
  ];

  const isSmallScreen = useMediaQuery({ maxWidth: 850 });

  const classes = useStyles();

  return (
    <div
      className={classes.root}
      style={{ flexDirection: isSmallScreen ? "column" : "row" }}
    >
      {isSmallScreen ? (
        <FormControl variant="outlined" className={classes.formControl}>
          <Select value={tabIndex} onChange={handleSelectChange}>
            {menuItems.map((item) => (
              <MenuItem value={item.index}>{item.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      ) : (
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={tabIndex}
          onChange={handleTabChange}
          className={classes.tabs}
        >
          {menuItems.map((item) => (
            <Tab key={item.index} label={item.name} />
          ))}
        </Tabs>
      )}
      <TabPanel
        currentTab={tabIndex}
        index={1}
        persist={true}
        isSmallScreen={isSmallScreen}
      >
        <Profile />
      </TabPanel>
      <TabPanel
        currentTab={tabIndex}
        index={2}
        persist={true}
        isSmallScreen={isSmallScreen}
      >
        <QRCode />
      </TabPanel>
    </div>
  );

  return (
    <div className={classes.root}>
      <Grid container direction="row">
        <Grid item xs={12}>
          <StatusBar />
        </Grid>
        <Grid item xs={12} md={3}>
          <Grid container direction="row">
            {emailIsVerified ? null : (
              <Grid item xs={12}>
                <EmailVerifier />
              </Grid>
            )}
            <Grid item xs={12}>
              <div style={{ minHeight: 300, background: "#FF000050" }} />
            </Grid>
            <Grid item xs={12}>
              <div style={{ minHeight: 300, background: "#FFFF0050" }} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={9}>
          <Grid container direction="row">
            <Grid item xs={12}>
              <Profile />
            </Grid>
            <Grid item xs={12}>
              <QRCode />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

function TabPanel(props) {
  const {
    children,
    currentTab,
    index,
    persist,
    isSmallScreen,
    ...other
  } = props;

  return (
    <div
      role="tabpanel"
      hidden={currentTab !== index}
      style={isSmallScreen ? {} : { marginLeft: "20vw" }}
      {...other}
    >
      {persist ? children : currentTab === index && children}
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
  },
  tabs: {
    height: "90vh",
    minWidth: "20vw",
    borderRight: `1px solid ${theme.palette.divider}`,
    position: "fixed",
    left: 0,
    top: "10vh",
  },
  formControl: {
    margin: theme.spacing(1),
    width: 200,
    textAlign: "center",
    alignSelf: "center",
  },
}));
