import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useDispatch } from "react-redux";

import { removeCookie } from "../cookies";
import { signOut } from "../actions/signedIn";
import { resetBusiness } from "../actions/business";
import { resetAuthentication } from "../actions/authentication";
import { showAlert as showAlertAction, hideAlert } from "../actions/alert";

import BusinessOverview from "./BusinessOverview";
import Customize from "./Customize";
import Profile from "./Profile";
import Visits from "./Visits";

import {
  Button,
  FormControl,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  MenuItem,
  Select,
  Tab,
  Tabs,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

export default function Dashboard() {
  const dispatcher = useDispatch();

  function showAlert(message, mode, duration = 3000) {
    dispatcher(showAlertAction(message, mode));
    setTimeout(() => {
      dispatcher(hideAlert());
    }, duration);
  }

  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const handleDialogClose = () => {
    setLogoutDialogOpen(false);
  };
  const handleDialogYes = () => {
    removeCookie("business_logged_in");
    removeCookie("auth");

    dispatcher(resetBusiness());
    dispatcher(resetAuthentication());
    dispatcher(signOut());

    showAlert("Logout Successful.", "error");
  };

  const [tabIndex, setTabIndex] = useState(0);
  const handleTabChange = (event, newValue) => {
    if (newValue < menuItems.length) {
      setTabIndex(newValue);
    } else if (newValue === menuItems.length) {
      setLogoutDialogOpen(() => true);
    }
  };
  const handleSelectChange = (event) => {
    console.log(event.target.value);
    if (event.target.value < menuItems.length) {
      setTabIndex(event.target.value);
    } else if (event.target.value === menuItems.length) {
      setLogoutDialogOpen(() => true);
    }
  };

  const menuItems = [
    { name: "Overview", index: 0 },
    { name: "Profile", index: 1 },
    { name: "Customization", index: 2 },
    { name: "View Visits", index: 3 },
    { name: "Item Five", index: 4 },
    { name: "Item Six", index: 5 },
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
              <MenuItem
                classes={{ root: classes.menuItems }}
                key={item.index}
                value={item.index}
              >
                {item.name}
              </MenuItem>
            ))}
            <MenuItem
              classes={{ root: classes.logout }}
              value={menuItems.length}
            >
              Logout
            </MenuItem>
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
          <Tab classes={{ textColorInherit: classes.logout }} label="Logout" />
        </Tabs>
      )}
      <TabPanel
        currentTab={tabIndex}
        index={0}
        persist={true}
        isSmallScreen={isSmallScreen}
      >
        <BusinessOverview />
      </TabPanel>
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
        <Customize />
      </TabPanel>
      <TabPanel
        currentTab={tabIndex}
        index={3}
        persist={true}
        isSmallScreen={isSmallScreen}
      >
        <Visits />
      </TabPanel>

      <Dialog open={logoutDialogOpen} onClose={handleDialogClose}>
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

function TabPanel(props) {
  const {
    children,
    currentTab,
    index,
    persist,
    isSmallScreen,
    ...other
  } = props;

  const classes = useStyles();
  return (
    <div
      role="tabpanel"
      className={classes.panel}
      hidden={currentTab !== index}
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
    minWidth: "200px",
    borderRight: `1px solid ${theme.palette.divider}`,
    position: "sticky",
    top: "10vh",
  },
  formControl: {
    margin: theme.spacing(1),
    width: 200,
    textAlign: "center",
    alignSelf: "center",
  },
  panel: {
    position: "relative",
    maxWidth: "1300px",
    width: "100%",
  },
  logout: {
    color: theme.palette.error.main,
    justifyContent: "center",
  },
  menuItems: {
    justifyContent: "center",
  },
}));
