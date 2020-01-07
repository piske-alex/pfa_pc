import React, { useState } from "react";
import { Button, FormControl, FormHelperText, Grid, Icon, InputLabel, Typography  } from "@material-ui/core";
import { Visibility, VisibilityOff } from '@material-ui/icons';

import { getLogoUrl, HorizontalCenter, VerticalCenter } from "../../public/js/utils";
import trans from "../../public/js/translation";
import config from "../../public/js/config";
import { Link } from "react-router-dom";

import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

import BootstrapInput from '../../components/bootstrap-input';

export default function LoginPage({ onLogin }) {
  // const logoUrl = getLogoUrl();
  const logoUrl = config.imgPath +'2019/06/26/5d12c0d24414092290.png';

  const [username, setUsername] = useState("");     // username state
  const [acCode, setAcCode]     = useState("");     // access code state
  const [showPwd, setShowPwd]   = useState(false);  // password visibility state
  const [lang, setConfig]       = useState({});     // language state

  const swipeLang = () => {
    config.lang = (config.lang == "ch") ? "en" : "ch";
    localStorage.setItem("lang", config.lang);
    setConfig(config.lang);
  };

  const usernameChange = (data) => setUsername((data.split(' ').length === 1) ? '' : data); // little hack for re-formatting the mobile number
  const acCodeChange  = (event) => setAcCode(event.target.value);
  const showPwdToggle = () => setShowPwd(showPwd => !showPwd);
  const submit = () => onLogin(username, acCode);

  return (
    <VerticalCenter gridStyle={{ minHeight: "80vh"}}>
      <div className="lang" onClick={swipeLang}>
        <span className="on">{config.lang == "ch" ? "中" : "EN"}</span>/<span className="notOn">{config.lang == "ch" ? "EN" : "中"}</span>
      </div>
      <HorizontalCenter>
        <Grid container alignItems={"center"} direction={"column"} spacing={2}>

          <Grid item>
            <img style={{ width: 60, height: 60 }} src={logoUrl} />
          </Grid>

          <Grid item>
            <FormControl style={{ width: 300 }}>
              <InputLabel shrink className="inputLabel">{trans.mobile[config.lang]}</InputLabel>
              <PhoneInput
                inputProps={{
                  name: 'phone',
                  required: true,
                  autoFocus: true,
                }}
                localization = {trans.phoneLocalization[config.lang]}
                country = {'hk'}
                onlyCountries = {['cn', 'hk', 'id', 'jp', 'kr', 'my', 'th', 'tw']}
                value = {username}
                onChange = {usernameChange}
                masks = {{
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

          <Grid item>
            <FormControl style={{ width: 300 }}>
              <InputLabel shrink className="inputLabel">{trans.accessToken[config.lang]}</InputLabel>
              <BootstrapInput
                type={showPwd ? 'text' : 'password'}
                value={acCode}
                onChange={acCodeChange}
                endAdornment={
                  <Icon onClick={showPwdToggle} className="iconBtn">
                    {showPwd ? <Visibility /> : <VisibilityOff />}
                  </Icon>
                }
              ></BootstrapInput>
              <FormHelperText className="formHelperText">{acCode.length >= 4? undefined: trans.accessTokenLengthWarning[config.lang]}</FormHelperText>
              <FormHelperText className="formHelperText">{acCode.length >= 4? undefined: trans.accessTokenLost[config.lang]}</FormHelperText>
            </FormControl>
          </Grid>

          <Grid item>
            <Grid container alignItems={"center"} direction={"row"} spacing={2}>
              <Grid item>
                <Button
                  className="CommonButtonStyle"
                  variant="contained"
                  color="primary"
                  onClick={submit}
                  style={{ width: "142px" }}
                >
                  {trans.login[config.lang]}
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
                  {trans.register[config.lang]}
                </Button>
              </Grid>
            </Grid>
          </Grid>

          <Grid item >
            {config.lang == "en" ?
              <Typography variant={"body2"} className="textImport" component={Link} to={"/account-manager"}>
                {trans.importExport[config.lang]}&nbsp;
              </Typography>
            : null}
            <Typography variant={"body2"} className="textWallet">
              {trans.walletImportExport[config.lang]}
            </Typography>
            {config.lang == "ch" ? 
              <Typography variant={"body2"} className="textImport" component={Link} to={"/account-manager"}>
                {trans.importExport[config.lang]}
              </Typography>
            : null}
          </Grid>
        </Grid>
      </HorizontalCenter>
    </VerticalCenter>
  );
}
