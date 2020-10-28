import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";

import BusinessOverview from "./BusinessOverview";
import Profile from "./Profile";
import QRCode from "./QRCode";

import { FormControl, MenuItem, Select, Tab, Tabs } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

export default function Dashboard() {
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
              <MenuItem key={item.index} value={item.index}>
                {item.name}
              </MenuItem>
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
        <QRCode />
      </TabPanel>
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
  panel: {
    position: "relative",
    width: "100%",
  },
}));
