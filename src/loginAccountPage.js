import React from "react";
import { Grid, Container } from "@material-ui/core";
import { HorizontalCenter, VerticalCenter, onChangeGenerator } from "./utils";
import trans from "./translation";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const lang = "ch";

export default function LoginAccountPage({ onAccountLogin }) {
  const [username, setUsername] = React.useState("");
  const onUsernameChange = onChangeGenerator(setUsername);
  const [password, setPassword] = React.useState("");
  const onPasswordChange = onChangeGenerator(setPassword);
  const [passwordAgain, setPasswordAgain] = React.useState("");
  const onPasswordAgainChange = onChangeGenerator(setPasswordAgain);
  const onSumbit = () => onAccountLogin(username, password);

  return (
    <VerticalCenter gridStyle={{ minHeight: "80vh" }}>
      <HorizontalCenter>
        <Grid container alignItems={"center"} direction={"column"} spacing={2}>
          <Grid item>
            <TextField
              variant={"standard"}
              label={trans.username[lang]}
              value={username}
              onChange={onUsernameChange}
              helperText={
                username.length > 0
                  ? undefined
                  : trans.usernameEmptyWarning[lang]
              }
            />
          </Grid>
          <Grid item>
            <TextField
              variant={"standard"}
              label={trans.password[lang]}
              value={password}
              onChange={onPasswordChange}
              type={"password"}
              helperText={
                password.length >= 8
                  ? undefined
                  : trans.passwordLengthWarning[lang]
              }
            />
          </Grid>

          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={onAccountLogin}
            >
              {trans.register[lang]}
            </Button>
          </Grid>
        </Grid>
      </HorizontalCenter>
    </VerticalCenter>
  );
}
