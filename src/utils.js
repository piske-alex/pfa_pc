import React from "react";
import { Grid } from "@material-ui/core";

export function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

export function VerticalCenter(props) {
  return (
    <Grid
      container
      direction={"column"}
      alignItems={"center"}
      justify={"center"}
      spacing={props.spacing ? props.spacing : 0}
      style={props.gridStyle ? props.gridStyle : {}}
    >
      <Grid item>{props.children}</Grid>
    </Grid>
  );
}
export function HorizontalCenter(props) {
  return (
    <Grid
      container
      direction={"row"}
      alignItems={"center"}
      justify={"center"}
      spacing={props.spacing ? props.spacing : 0}
      style={props.gridStyle ? props.gridStyle : {}}
    >
      <Grid item>{props.children}</Grid>
    </Grid>
  );
}
