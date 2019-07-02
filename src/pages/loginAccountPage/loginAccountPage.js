import React from "react";
import { Grid } from "@material-ui/core";
import { fade, withStyles, makeStyles } from '@material-ui/core/styles';
import { getLogoUrl, HorizontalCenter, VerticalCenter } from "../../public/js/utils";
import trans from "../../public/js/translation";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { readAccountList } from "../../public/js/blockchain-utils";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Icon from '@material-ui/core/Icon';
import FormHelperText from '@material-ui/core/FormHelperText';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Typography from "@material-ui/core/Typography";
import Config from "../../public/js/config";

const lang = "ch";

const BootstrapInput = withStyles(theme => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(2.5),
    },
    width:'100%',
    backgroundColor: '#222834',
    border: '1px solid #222834',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus-within': {
      boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: '#BEB689',
    },
  },
  input: {
    width:'100%',
    padding: '5.5px 5.5px',
    fontSize: 16,
    color:'#FFB601',
  },
}))(InputBase);

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

export default function LoginAccountPage({ onAccountLogin, prefillUsername }) {
  const logoUrl = getLogoUrl();

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

  const classes = useStyles();
  const [values, setValues] = React.useState({
    showPassword: false,
  });
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  React.useEffect(() => setAccountNames(readAccountList()), []);

  return (
    <VerticalCenter gridStyle={{ minHeight: "80vh"}}>
      <HorizontalCenter>
        <Grid container alignItems={"center"} direction={"column"} spacing={2}>
          <Grid item>
            {/* <img style={{ width: 60, height: 60 }} src={logoUrl} /> */}
            <img style={{ width: 60, height: 60 }} src={Config.imgPath +'2019/06/26/5d12c0d24414092290.png'} />
          </Grid>
          <Grid item>
            <FormControl style={{ width: 300 }}>
              <InputLabel shrink className="inputLabel">{trans.username[lang]}</InputLabel>
              <Select value={username} onChange={onUsernameChange}>
                {accountNames.map(name => (
                  <MenuItem value={name.slice(5)}>{name.slice(5)}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl style={{ width: 300 }}>
              <InputLabel shrink className="inputLabel">{trans.password[lang]}</InputLabel>
              <BootstrapInput
                type={values.showPassword ? 'text' : 'password'}
                value={password}
                onChange={onPasswordChange}
                endAdornment={
                  <Icon onClick={handleClickShowPassword} className="iconBtn">
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </Icon>
                }
              ></BootstrapInput>
              <FormHelperText className="formHelperText">{password.length >= 8? undefined: trans.passwordLengthWarning[lang]}</FormHelperText>
            </FormControl>
          </Grid>

          <Grid item>
            <Grid container alignItems={"center"} direction={"row"} spacing={2}>
              <Grid item>
                <Button
                  className="CommonButtonStyle"
                  variant="contained"
                  color="primary"
                  onClick={onSumbit}
                  style={{ width: "142px" }}
                >
                  {trans.login[lang]}
                </Button>
              </Grid>
              <Grid item>
                <Button
                  className="CommonButtonStyle"
                  variant="contained"
                  color="primary"
                  component={Link}
                  to={"/create-account"}
                  style={{ width: "142px" }}
                >
                  {trans.register[lang]}
                </Button>
              </Grid>
            </Grid>
          </Grid>

          <Grid item >
            <Typography variant={"body2"} className="textWallet">
              {trans.walletImportExport[lang]}
            </Typography>
            <Typography variant={"body2"} className="textImport" component={Link} to={"/account-manager"}>
              {trans.importExport[lang]}
            </Typography>
          </Grid>

          {/* <Grid item>
            <Button
              className="CommonButtonStyle"
              variant="contained"
              color="primary"
              component={Link}
              to={"/account-manager"}
            >
              {trans.accountImportExport[lang]}
            </Button>
          </Grid> */}
        </Grid>
      </HorizontalCenter>
    </VerticalCenter>
  );
}