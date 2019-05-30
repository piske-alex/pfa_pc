import React from "react";
import { Grid } from "@material-ui/core";

export function VerticalCenter(props) {
  return (
    <Grid
      container
      direction={"column"}
      alignItems={"center"}
      justify={"center"}
      spacing={props.spacing ? props.spacing : 2}
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
      spacing={props.spacing ? props.spacing : 2}
      style={props.gridStyle ? props.gridStyle : {}}
    >
      <Grid item>{props.children}</Grid>
    </Grid>
  );
}

export function onChangeGenerator(fun) {
  return event => fun(event.target.value);
}
