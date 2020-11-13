import React from "react";
import { useMediaQuery } from "react-responsive";

import { Button, Typography } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import { makeStyles } from "@material-ui/core/styles";

export default function Visits() {
  const isSmallScreen = useMediaQuery({ maxWidth: 1000 });

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "firstName", headerName: "First name", width: 130 },
    { field: "lastName", headerName: "Last name", width: 130 },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 90,
    },
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 200,
      valueGetter: (params) =>
        `${params.getValue("firstName") || ""} ${
          params.getValue("lastName") || ""
        }`,
    },
  ];

  const rows = [
    { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
    { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
    { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
    { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
    { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
    { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  ];

  const classes = useClasses();

  const controls = (
    <div
      className={classes.sideControls}
      style={isSmallScreen ? { borderRight: "none" } : {}}
    >
      <div className={classes.row}>
        <Typography style={{ flexGrow: 1 }} variant="body1">
          From: unspecified
        </Typography>
        <Button variant="text" color="primary" size="small">
          Change
        </Button>
      </div>
      <div className={classes.row}>
        <Typography style={{ flexGrow: 1 }} variant="body1">
          To: unspecified
        </Typography>
        <Button variant="text" color="primary" size="small">
          Change
        </Button>
      </div>
      <div className={classes.sideControlsButtons}>
        <Button variant="contained" color="primary">
          Refresh
        </Button>
      </div>
    </div>
  );

  const data = (
    <div className={classes.data}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[5, 10, 20]}
        checkboxSelection
        pagination
      />
    </div>
  );

  if (isSmallScreen) {
    return (
      <div className={classes.root} style={{ flexDirection: "column" }}>
        {controls}
        {data}
      </div>
    );
  } else {
    return (
      <div className={classes.root}>
        {controls}
        {data}
      </div>
    );
  }
}

const useClasses = makeStyles((theme) => ({
  root: { display: "flex", flexDirection: "row" },
  sideControls: {
    position: "relative",
    padding: theme.spacing(1),
    minWidth: "max(300px, 30%)",
    minHeight: 100,
    borderRight: `1px solid ${theme.palette.divider}`,
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  sideControlsButtons: {
    position: "absolute",
    bottom: theme.spacing(1),
    right: theme.spacing(1),
    flexGrow: 1,
  },
  data: {
    padding: theme.spacing(1),
    width: "100%",
    minHeight: 400,
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  row: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  },
}));
