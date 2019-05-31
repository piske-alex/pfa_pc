import React from "react";
import { Grid } from "@material-ui/core";
import { HorizontalCenter, VerticalCenter } from "./utils";
import trans from "./translation";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { readAccountList } from "./blockchain-utils";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";

const lang = "ch";

export default function LoginAccountPage({ onAccountLogin, prefillUsername }) {
  const [username, setUsername] = React.useState(
    prefillUsername ? prefillUsername : "",
  );
  const onUsernameChange = event => {
    setUsername(event.target.value);
  };
  const [password, setPassword] = React.useState("");
  const onPasswordChange = event => {
    setPassword(event.target.value);
  };

  const onSumbit = () => {
    onAccountLogin(username, password);
  };

  const [accountNames, setAccountNames] = React.useState([]);

  React.useEffect(() => setAccountNames(readAccountList()), []);

  return (
    <VerticalCenter gridStyle={{ minHeight: "80vh" }}>
      <HorizontalCenter>
        <Grid container alignItems={"center"} direction={"column"} spacing={2}>
          <Grid item>
            <FormControl style={{ width: 200 }}>
              <InputLabel>{trans.username[lang]}</InputLabel>
              <Select value={username} onChange={onUsernameChange}>
                {accountNames.map(name => (
                  <MenuItem value={name.slice(5)}>{name.slice(5)}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <TextField
              style={{ width: 200 }}
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
            <Button variant="contained" color="primary" onClick={onSumbit}>
              {trans.login[lang]}
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to={"/create-account"}
            >
              {trans.register[lang]}
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to={"/account-manager"}
            >
              {trans.accountImportExport[lang]}
            </Button>
          </Grid>
        </Grid>
      </HorizontalCenter>
    </VerticalCenter>
  );
}
