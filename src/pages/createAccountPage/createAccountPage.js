import React from "react";
import { Grid } from "@material-ui/core";
import { HorizontalCenter, VerticalCenter } from "../../public/js/utils";
import trans from "../../public/js/translation";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { fade, withStyles, makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from '@material-ui/core/FormHelperText';

const lang = "ch";

const BootstrapInput = withStyles(theme => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(2.5),
    },
  },
  input: {
    position: 'relative',
    width:'100%',
    backgroundColor: '#222834',
    border: '1px solid #222834',
    fontSize: 16,
    padding: '5.5px 5.5px',
    color:'#FFB601',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: '#BEB689',
    },
  },
}))(InputBase);

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
            <FormControl style={{ width: 300 }}>
              <InputLabel shrink className="inputLabel">{trans.username[lang]}</InputLabel>
              <BootstrapInput value={username} onChange={onUsernameChange} />
              <FormHelperText className="formHelperText">{username.length > 0? undefined: trans.usernameEmptyWarning[lang]}</FormHelperText>
            </FormControl>

          </Grid>
          <Grid item>
            <FormControl style={{ width: 300 }}>
              <InputLabel shrink className="inputLabel">{trans.password[lang]}</InputLabel>
              <BootstrapInput value={password} onChange={onPasswordChange} type='password'/>
              <FormHelperText className="formHelperText">{password.length >= 8? undefined: trans.passwordLengthWarning[lang]}</FormHelperText>
            </FormControl>

          </Grid>
          <Grid item>
            <FormControl style={{ width: 300 }}>
              <InputLabel shrink className="inputLabel">{trans.passwordAgain[lang]}</InputLabel>
              <BootstrapInput value={passwordAgain} onChange={onPasswordAgainChange} type='password'/>
              <FormHelperText className="formHelperText">{password === passwordAgain? undefined: trans.passwordAgainNotMatchWarning[lang]}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl style={{ width: 300 }}>
              <InputLabel shrink className="inputLabel">{trans.optionalExistingPrivateKey[lang]}</InputLabel>
              <BootstrapInput value={existingPvKey} onChange={onExistingPvKeyChange} type='password'/>
            </FormControl>
          </Grid>
          <Grid item>
            <Typography variant={"body2"} className="textInfo" style={{ width: 300 , textAlign: "justify" }}>
              {trans.accountCreationWarning1[lang]}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant={"body2"} className="textInfo" style={{ width: 300 , textAlign: "justify"}}>
              {trans.accountCreationWarning2[lang]}
            </Typography>
          </Grid>
          <Grid item>
            <Button className="CommonButtonStyle" style={{ width: 300 }} variant="contained" color="primary" onClick={onSumbit}>
              {trans.register[lang]}
            </Button>
          </Grid>
        </Grid>
      </HorizontalCenter>
    </VerticalCenter>
  );
}
