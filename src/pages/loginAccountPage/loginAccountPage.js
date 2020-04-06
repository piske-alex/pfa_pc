import React from "react";
import { Grid } from "@material-ui/core";
import { fade, withStyles, makeStyles } from '@material-ui/core/styles';
import { getLogoUrl, HorizontalCenter, VerticalCenter } from "../../public/js/utils";
import trans from "../../public/js/translation";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Link,BrowserRouter as Router,useLocation } from "react-router-dom";
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

import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

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
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function LoginAccountPage({ onAccountLogin }) {
  const logoUrl = getLogoUrl();

  const [username, setUsername] = React.useState("");
  const onUsernameChange = data => {
    // little hack for re-formatting the mobile number
    const values = data.split(' ');
    if (values.length === 1) {
      setUsername("");
    }
    else {
      setUsername(data);
    }
  };

  const [accessCode, setAccessCode] = React.useState("");
  const onAccessCodeChange = event => {
    setAccessCode(event.target.value);
  };

  const [pw, setPw] = React.useState("");
  const onPwChange = event => {
    setPw(event.target.value);
  };
  const query = useQuery();
  const [pwlogin, setPwlogin] = React.useState(true);


  const onSumbit = () => {
    onAccountLogin(username, accessCode);
  };

  const onSumbitPw = () => {
    onAccountLogin(username, pw,"pw");
  };

  const [accountNames, setAccountNames] = React.useState([]);

  const classes = useStyles();
  const [values, setValues] = React.useState({
    showPassword: false,
  });
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const chage = () => {
    if(Config.lang == "ch") {
      Config.lang = "en";
      localStorage.setItem("lang", "en");
      setConfig("en")
    } else {
      Config.lang = "ch";
      localStorage.setItem("lang", "ch");
      setConfig("ch")
    }
  };

  const [lang, setConfig] = React.useState({})

  React.useEffect(() => setAccountNames(readAccountList()), []);

  return (
    <VerticalCenter gridStyle={{ minHeight: "80vh"}}>
      <div className="lang" onClick={chage}>
        <span className="on">{Config.lang == "ch" ? "中" : "EN"}</span>/<span className="notOn">{Config.lang == "ch" ? "EN" : "中"}</span>
      </div>
      <HorizontalCenter>
        <Grid container alignItems={"center"} direction={"column"} spacing={2}>
          <Grid item>
            {/* <img style={{ width: 60, height: 60 }} src={logoUrl} /> */}
            <img style={{ width: 60, height: 60 }} src={Config.imgPath +'2019/06/26/5d12c0d24414092290.png'} />
          </Grid>
          <Grid item>
            <FormControl style={{ width: 300 }}>
              <InputLabel shrink className="inputLabel">{trans.mobile[Config.lang]}</InputLabel>
              <PhoneInput
                inputProps={{
                  name: 'phone',
                  required: true,
                  autoFocus: true,
                }}
                localization={trans.phoneLocalization[Config.lang]}
                country={'hk'}
                onlyCountries={['cn', 'hk', 'id', 'jp', 'kr', 'my', 'th', 'tw']}
                value={username}
                onChange={onUsernameChange}
                masks={{
                  hk: '+... ........',
                  cn: '+.. ...........',
                  my: '+.. ..........',
                  th: '+.. ..........',
                  id: '+.. .............',
                  jp: '+.. ..........',
                  kr: '+.. ...........',
                  tw: '+... ............',
                }}
              />
            </FormControl>
          </Grid>
          <Grid item style={{display: pwlogin ?  'none' : 'block'}} >

            <FormControl style={{ width: 300 }}>
              <InputLabel shrink className="inputLabel">{trans.accessToken[Config.lang]}</InputLabel>
              <BootstrapInput
                type={values.showPassword ? 'text' : 'password'}
                value={accessCode}
                onChange={onAccessCodeChange}
                endAdornment={
                  <Icon onClick={handleClickShowPassword} className="iconBtn">
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </Icon>
                }
              ></BootstrapInput>

              <FormHelperText className="formHelperText">{accessCode.length >= 4? undefined: trans.accessTokenLengthWarning[Config.lang]}</FormHelperText>
              <FormHelperText className="formHelperText">{accessCode.length >= 4? undefined: trans.accessTokenLost[Config.lang]}</FormHelperText>


            </FormControl>
          </Grid>

          <Grid item style={{display: pwlogin ?  'block' : 'none'}} >
            <FormControl style={{ width: 300 }}>
              <InputLabel shrink className="inputLabel">{trans.password[Config.lang]}</InputLabel>
              <BootstrapInput
                type={values.showPassword ? 'text' : 'password'}
                value={pw}
                onChange={onPwChange}
                endAdornment={
                  <Icon onClick={handleClickShowPassword} className="iconBtn">
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </Icon>
                }
              ></BootstrapInput>

            </FormControl>
          </Grid>

          <Grid item>
            <FormControl style={{ width: 300 }}>
              <div className="radio">
                <label ><input type="radio" value="pw" name="optradio" checked={pwlogin} onChange={(e)=>{e.target.value==="pw"?setPwlogin(true):setPwlogin(false)}}/><span style={{color:'white'}}>密碼登錄</span></label>
              </div>
              <div className="radio">
                <label ><input type="radio" value="acc" name="optradio" checked={!pwlogin} onChange={(e)=>{e.target.value==="pw"?setPwlogin(true):setPwlogin(false)}}/><span style={{color:'white'}}>信息存取碼登錄</span></label>
              </div>
            </FormControl>
          </Grid>

          <Grid item>
            <Grid container alignItems={"center"} direction={"row"} spacing={2}>
              <Grid item style={{display: pwlogin ?  'none' : 'block'}}>
                <Button
                  className="CommonButtonStyle"
                  variant="contained"
                  color="primary"
                  onClick={onSumbit}
                  style={{ width: "142px" }}
                >
                  {trans.login[Config.lang]}
                </Button>
              </Grid>
              <Grid item style={{display: pwlogin ?  'block' : 'none'}}>
                <Button
                  className="CommonButtonStyle"
                  variant="contained"
                  color="primary"
                  onClick={onSumbitPw}
                  style={{ width: "142px" }}
                >
                  {trans.login[Config.lang]}
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
                  {trans.register[Config.lang]}
                </Button>
              </Grid>
            </Grid>
          </Grid>

          <Grid item >
            {Config.lang == "en" ?
              <Typography variant={"body2"} className="textImport" component={Link} to={"/account-manager"}>
                {trans.importExport[Config.lang]}&nbsp;
              </Typography>
              : null}
            <Typography variant={"body2"} className="textWallet">
              {trans.walletImportExport[Config.lang]}
            </Typography>
            {Config.lang == "ch" ?
              <Typography variant={"body2"} className="textImport" component={Link} to={"/account-manager"}>
                {trans.importExport[Config.lang]}
              </Typography>
              : null}
          </Grid>

          <Grid  style={{
            display: query.get("pwa")?'none':'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }} item>
            <a href={"app-release.apk"}><img src={"download_android.png"} style={{width:'40%'}}></img></a>
          </Grid>
        </Grid>
      </HorizontalCenter>
    </VerticalCenter>
  );
}
