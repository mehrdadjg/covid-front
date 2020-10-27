import React from "react";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

export default function Header() {
  const styles = useStyles();

  return (
    <AppBar position="sticky">
      <Toolbar className={styles.titleContainer} variant="dense">
        <Typography variant="h6" noWrap>
          COVID-19 Alert
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

const useStyles = makeStyles((theme) => ({
  titleContainer: {
    justifyContent: "center",
    minHeight: "10vh",
  },
}));
