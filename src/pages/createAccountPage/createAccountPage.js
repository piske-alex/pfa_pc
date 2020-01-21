import React from "react";
import { Grid, Paper, Snackbar } from "@material-ui/core";
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
import IconButton from "@material-ui/core/IconButton";
import Modal from "@material-ui/core/Modal";
import CloseIcon from "@material-ui/icons/Close";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Config from "../../public/js/config";
import { CopyButton } from "react-copy-button";
import Switch from "@material-ui/core/Switch";

import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

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

const useStyles = makeStyles(theme => ({
  headBlock: {
    height: "240px",
    width: "100%",
    backgroundColor: "#212733",
  },
  head: {
    width: "100%",
    paddingTop: "40px",
    fontSize: '16px',
    textAlign: "Center",
    letterSpacing: "1px",
    color: "#fff"
  },
  // headIcons: {
  //   position: "fixed",
  //   top: "18px",
  //   marginLeft: "16px"
  // },
  icon: {
    width: "100%",
    height: "74px",
    textAlign: "Center",
    paddingTop: "20px",
  },
  introduce: {
    height: "60px",
    textAlign: "Center",
    paddingTop: "30px",
    fontSize: "14px",
    color: "#fff",
    letterSpacing: "1px",
  },
  content: {
    width: "100%",
    height: "50px",
    lineHeight: "50px",
    marginTop: "10px",
    fontSize: '14px',
    backgroundColor: "#212733",
    letterSpacing: "1px",
  },
  contentIconsLeft: {
    float: "left",
    marginTop: "7px",
    marginLeft: "16px"
  },
  contentIconsRight: {
    float: "right",
    marginTop: "7px",
    marginRight: "10px"
  },
  title: {
    float: "left",
    marginLeft: "12px",
    color: "#fff",
    width: "50%"
  },
  modalPaper: {
    // position: "absolute",
    // width: "96%",
    // height: "60%",
    // top: "calc(50% - 500px / 2)",
    // left: "calc(50% - 360px / 2)",
    backgroundColor: "#212733",
    boxShadow: theme.shadows[5],
    padding: "14px",
    outline: "none",

    // width: "94%",
    height: "60%",
    // background: url(box_bg.png) no-repeat;
    // background-size: cover;
    position: "fixed",
    top: "50%",
    left: "50%",

    transform: "translate(-50%, -50%)",
    zIndex: 200,

  },
  toolbarIcon: {
    // display: "flex",
    // alignItems: "center",
    // justifyContent: "flex-end",
    padding: "0 2px",
    textAlign: "Center",
    marginTop: "14px",
    ...theme.mixins.toolbar,
  },
  close: {
    position: "absolute",
    right: "10px",
    top: "18px",
  },
  logOut:{
    textAlign:"Center",
    position: "absolute",
    bottom: "10%",
    maxWidth:"1100px",
    width: "100%"
  }
}));

export default function CreateAccountPage({ onAccountCreate, popMobileWarning }) {
  const classes = useStyles();
  const [
    accountNotCreatedSnackbarOpen,
    setAccountNotCreatedSnackbarOpen,

  ] = React.useState(false);

  const handleAccountNotCreatedSnackbarClose = () => {
    setAccountNotCreatedSnackbarOpen(false);
  };

  const [username, setUsername] = React.useState("");
  const onUsernameChange = data => {
    // little hack for re-formatting the mobile number
    const values = data.split(' ');
    if (values.length === 1) {
      setUsername("");
    }
    else {
      setUsername(data);
      onMobileChange(data);
    }
  };

  const [mobile, setMobile] = React.useState({regionCode: '', phone: ''});
  const onMobileChange = data => {
    const values = data.trim().split(' ');
    if (values.length === 2) {
      const regionCode = values[0].replace('+', '');
      const phone = values[1];
      console.log('region: ', regionCode, ' ; mobile: ', phone);
      setMobile({ regionCode, phone });
      console.log(mobile);
    } else {
      setMobile({regionCode: '', phone: ''});
    }
  };


  const [isGot, setIsGot] = React.useState(false);

  const [accessCode, setAccessCode] = React.useState("");
  const onAccessCodeChange = event => {
    setAccessCode(event.target.value);
  };

  const [pw, setPw] = React.useState("");
  const onPw = event => {
    setPw(event.target.value);
  };

  const [counter, setCounter] = React.useState(0);
  const timer = () => setCounter(counter - 1);
  React.useEffect(() => {
    if (counter <= 0) return;
    const id = setInterval(timer, 1000);
    return () => clearInterval(id);
  });

  const [seePrivateKey, setSeePrivateKey] = React.useState(false);

  //const [sendAmount, setSendAmount] = React.useState("");
  const [existingPvKey, setExistingPvKey] = React.useState("");
  const onExistingPvKeyChange = event => {
    setExistingPvKey(event.target.value);
  };

  const [tosModalOpen, settosModalOpen] = React.useState(false);
  const handletosModalOpen = () => {
    settosModalOpen(true);
  };
  const handletosModalClose = () => {
    onSumbit()
    settosModalOpen(false);
  };

  const handleGetCode = async () => {
    try {
      
      onMobileChange(username);
      if (mobile.regionCode === '' || mobile.phone === '') {
        throw new Error('invalid phone number');
      }

      // fetch
      await fetch(`https://api.quorum.mex.gold/sms/${mobile.regionCode}/${mobile.phone}`);

      // Disable this button until 60 seconds
      setCounter(60);
      setIsGot(true);
    } catch (e) {
      popMobileWarning();
    }
  }

  const onSumbit = () => {
    try {
      onMobileChange(username);
      if (mobile.regionCode === '' || mobile.phone === '') {
        throw new Error('invalid phone number');
      }
      console.log(mobile);
      onAccountCreate(mobile.regionCode, mobile.phone, accessCode, existingPvKey, pw);
    } catch (e) {
      console.error(e);
      setAccountNotCreatedSnackbarOpen(true);
    }
  };

  return (
    <VerticalCenter gridStyle={{ minHeight: "80vh" }}>
      <HorizontalCenter>
        <Grid container alignItems={"center"} direction={"column"} spacing={2}>
          <Grid item>
            <FormControl style={{ width: 300 }}>
              <InputLabel shrink className="inputLabel">{trans.mobile[Config.lang]}</InputLabel>
              <PhoneInput
                disabled={isGot}
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

          <Grid item>
            <Button className="CommonButtonStyle" disabled={counter > 0} style={{ width: 300 }} variant="contained" color="primary" onClick={handleGetCode}>
              {trans.getCode[Config.lang]}{counter > 0 ? ' (' + counter + ')' : ''}
            </Button>
          </Grid>

          <Grid item>
            <FormControl style={{ width: 300 }}>
              <InputLabel shrink className="inputLabel">{trans.accessToken[Config.lang]}</InputLabel>
              <BootstrapInput
  value={accessCode}
  onChange={onAccessCodeChange}
  />
              <FormHelperText className="formHelperText">{accessCode.length >= 4? undefined: trans.accessTokenLengthWarning[Config.lang]}</FormHelperText>
            </FormControl>
          </Grid>

          <Grid item>
            <FormControl style={{ width: 300 }}>
              <InputLabel shrink className="inputLabel">{trans.accessToken[Config.lang]}</InputLabel>
              <BootstrapInput
                value={accessCode}
                onChange={onAccessCodeChange}
              />
              <FormHelperText className="formHelperText">{accessCode.length >= 4? undefined: trans.accessTokenLengthWarning[Config.lang]}</FormHelperText>
            </FormControl>
          </Grid>

          <Grid item>
            <FormControl style={{ width: 300 }}>
              <InputLabel shrink className="inputLabel">{trans.password[Config.lang]}</InputLabel>
              <BootstrapInput
                value={pw}
                onChange={setPw}
              />
            </FormControl>
          </Grid>

          {/*<Grid item>
            <FormControlLabel
              control={
                <Switch checked={seePrivateKey} onChange={e => setSeePrivateKey(e.target.checked)} />
              }
              style={{color:'#fff'}}
              label={trans.createAccountPage.ERC20[Config.lang]}
            />
          </Grid>
          <Grid item>
            <FormControl style={{ visibility: seePrivateKey ? 'visible' : 'hidden' ,width: 300 }}>
              <InputLabel shrink className="inputLabel">{trans.optionalExistingPrivateKey[Config.lang]}</InputLabel>
              <BootstrapInput value={existingPvKey} onChange={onExistingPvKeyChange} type='password'/>
            </FormControl>
          </Grid>*/}

          <Grid item>
            <Button className="CommonButtonStyle" style={{ width: 300 }} variant="contained" color="primary" onClick={handletosModalOpen}>
              {trans.register[Config.lang]}
            </Button>
          </Grid>
        </Grid>

      </HorizontalCenter>
      <Modal open={tosModalOpen} style={{ height: "100%" }} onBackdropClick={handletosModalClose}>
        <div className={classes.modalPaper + " modalWidth"}>
          <Grid style={{ height: "100%" }} container direction={"column"}>
            <Grid item style={{ maxHeight: "16%", width: "100%" }}>
              <div className={classes.toolbarIcon}>
                <Typography variant={"h5"} style={{color:"white",width: '87%',margin:'0 auto'}}>{trans.createAccountPage.remember[Config.lang]}</Typography>
                <IconButton className={classes.close} onClick={handletosModalClose}>
                  <CloseIcon />
                </IconButton>
              </div>
            </Grid>
            <Grid item style={{ overflow: "auto", maxHeight: "84%", width: "100%", padding: "6px" }}>
              <Typography style={{ marginRight: "150px", textAlign: "justify", width: "100%", wordBreak: "break-all",color:"white" }} dangerouslySetInnerHTML={{ __html: trans.createAccountPage.rememberfull[Config.lang] }} />

            </Grid>
          </Grid>
        </div>
      </Modal>
      <Snackbar
        open={accountNotCreatedSnackbarOpen}
        autoHideDuration={6000}
        onClose={handleAccountNotCreatedSnackbarClose}
        message={trans.createAccountPage.onlyEn[Config.lang]}
      />
    </VerticalCenter>

  );
}
