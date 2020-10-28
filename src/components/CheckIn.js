import { CheckOutlined } from "@material-ui/icons";
import React from "react";
import { useParams } from "react-router";

export default function CheckIn() {
  let { businessID } = useParams();
  return <p>{businessID}</p>;
}
