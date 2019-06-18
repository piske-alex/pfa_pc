import React from "react";
import { Grid } from "@material-ui/core";
import { HorizontalCenter, VerticalCenter } from "./utils";
import trans from "./translation";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const lang = "ch";

export default function CreateAccountPage({ onAccountCreate }) {
  const [username, setUsername] = React.useState("");
  const onUsernameChange = event => {
    setUsername(event.target.value);
  };
  const [password, setPassword] = React.useState("");
  const onPasswordChange = event => {
    setPassword(event.target.value);
  };
  const [passwordAgain, setPasswordAgain] = React.useState("");
  const onPasswordAgainChange = event => {
    setPasswordAgain(event.target.value);
  };

  const [existingPvKey, setExistingPvKey] = React.useState("");
  const onExistingPvKeyChange = event => {
    setExistingPvKey(event.target.value);
  };

  const onSumbit = () => {
    onAccountCreate(username, password, existingPvKey);
  };

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
              inputProps={{ autoComplete: "new-password" }}
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
              inputProps={{ autoComplete: "new-password" }}
            />
          </Grid>
          <Grid item>
            <TextField
              variant={"standard"}
              label={trans.passwordAgain[lang]}
              value={passwordAgain}
              onChange={onPasswordAgainChange}
              type={"password"}
              helperText={
                password === passwordAgain
                  ? undefined
                  : trans.passwordAgainNotMatchWarning[lang]
              }
              inputProps={{ autoComplete: "new-password" }}
            />
          </Grid>
          <Grid item>
            <TextField
              variant={"standard"}
              label={trans.optionalExistingPrivateKey[lang]}
              value={existingPvKey}
              onChange={onExistingPvKeyChange}
              type={"password"}
              inputProps={{ autoComplete: "new-password" }}
            />
          </Grid>
          <Grid item>
            <Typography variant={"body2"}>
              {trans.accountCreationWarning1[lang]}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant={"body2"}>
              {trans.accountCreationWarning2[lang]}
            </Typography>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" onClick={onSumbit}>
              {trans.register[lang]}
            </Button>
          </Grid>
        </Grid>
      </HorizontalCenter>
    </VerticalCenter>
  );
}
