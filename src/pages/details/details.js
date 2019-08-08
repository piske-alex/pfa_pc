import React from "react";
import clsx from "clsx";
import { fade, makeStyles, withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import MoreIcon from "@material-ui/icons/MoreHoriz";
import { ClickAwayListener, Snackbar } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import Modal from "@material-ui/core/Modal";
import t from "../../public/js/translation";
import { withRouter } from "react-router-dom";
import { HorizontalCenter, isEmpty } from "../../public/js/utils";
import jsQR from "jsqr";
import QrReader from 'react-qr-scanner'

import {
  etherBalance,
  getHistory,
  readAccountList,
  sendEther,
  web3js,
  ihadAddress,
  tokenBalance,
  sendToken, USDTaddress, listenUSDTdeposit, sendUSDT, USDTToIHAD
} from "../../public/js/blockchain-utils";
import QRCode from "qrcode.react";
import TextField from "@material-ui/core/TextField";
import CloseIcon from "@material-ui/icons/Close";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import LogoutIcon from "@material-ui/icons/ExitToApp";
import { getLogoUrl } from "../../public/js/utils";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ReceiveIcon from "@material-ui/icons/CallReceived";
import SendIcon from "@material-ui/icons/CallMade";
import Moment from "react-moment";
import { usdtProvider } from "../../public/js/data";
import MaterialLink from "@material-ui/core/Link";
import Divider from "@material-ui/core/Divider";
import useCookies from "react-cookie/cjs/useCookies";
import { ArrowDownwardSharp, ArrowUpwardSharp } from "@material-ui/icons";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import LinearProgress from "@material-ui/core/LinearProgress";
import { fontSize } from "@material-ui/system";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Icon from '@material-ui/core/Icon';
import InputBase from "@material-ui/core/InputBase";
import Paper from "@material-ui/core/Paper";
import moment from "moment";
import "moment-timezone";

import trans from "../../public/js/translation";
import Config from "../../public/js/config";
import "./details.css";

const accountInfoRefreshTime = 20;

const drawerWidth = 300;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
  },
  container1: {
    fontSize: '10pt',
    color: '#C0C0C0',
  },

  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
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
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  head: {
    width: "100%",
    paddingTop: "32px",
    fontSize: '16pX',
    textAlign: "Center",
    letterSpacing: "1px",
    color: "#fff"
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    // height: "100vh",
    overflow: "auto",

  },

  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
  modalPaper: {
    backgroundColor: "#212733",
    boxShadow: theme.shadows[5],
    padding: "14px",
    outline: "none",
    height: "60%",
    position: "fixed",
    top: "50%",
    left: "50%",

    transform: "translate(-50%, -50%)",
    zIndex: 200,
  },
  close: {
    position: "absolute",
    right: "10px",
    top: "10px",
  },
  extractRow: {
    width: '100%',
    textAlign: 'center',
  },
  detailsTop: {
    position: 'fixed',
    width: '100%',
    top: 0,
    left: 0,
    backgroundColor: '#212733',
  }
}));
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

function Dashboard({
  account,
  history,
  currentUsername,
  handleLogout,
  handleChangeAccount,
  props,

}) {
  const logoUrl = getLogoUrl();
  // const img = getImg();
  const [cookies, setCookie] = useCookies(['pfa']);
  let something = ""
  console.log(account);
   if (account == null || isEmpty(account)) {
     account = cookies.acctobj;
     console.log(cookies.acctobj + "jj");
     isEmpty(account) ? history.push("/login-account") : something = "continue";
   }
  let accName = currentUsername;
  const classes = useStyles();

  const [seePrivateKey, setSeePrivateKey] = React.useState(false);
  const [scanModalOpen, setScanModalOpen] = React.useState(false);
  const handleScan = (x)=>{
    if(x!=null){
      setSendToAddress(x.slice(4));
      handleScanModalClose();
    }

  };
  const handleScanError=(err)=>{
    alert('未能識別二維碼');
    console.error(err)
    handleScanModalClose();
  };
  const handleScanModalClose = ()=>{
    setScanModalOpen(false);
  };
  const [tradeModalOpen, setTradeModalOpen] = React.useState(false);
  const handleTradeModalClose = ()=>{
    setTradeModalOpen(false);
  }
  const [noinfoSnackbarOpen, setnoinfoSnackbarOpen] = React.useState(false);
  const handlenoinfoSnackbarClose = ()=>{
    setnoinfoSnackbarOpen(false);
  }
  const [tradeDetails,setTradeDetails] = React.useState({});
  const handleTradeModalOpen = (hash)=>{
    let dt = localStorage.getItem('hist-'+hash)
    console.log(dt)
    if(dt==null){
      setnoinfoSnackbarOpen(true);
    }else{
      setTradeDetails(JSON.parse(dt))
      setTradeModalOpen(true)
    }
  }

  const [longText, setLongText] = React.useState("undefinede");
  const [modalTitle, setModalTitle] = React.useState("undefinede");

  const changeTZ = (time) =>{
    let format = 'YYYY-MM-DD HH:mm:ss';
    return moment(time, format).add(8, 'hours').format(format);
  }
  const handleDepositfinishedSnackbarClose = () => {
    setDepositfinishedSnackbarOpen(false);
  };
  const [depositfinishedSnackbarOpen, setDepositfinishedSnackbarOpen] = React.useState(
    false,
  );
  const [buyModalOpen, setBuyModalOpen] = React.useState(false);
  const handleBuyModalOpen = async () => {
    setBuyModalOpen(true);
    listenUSDTdeposit(account.USDTWallet, account, (x) => {
      if (x > 0) setDepositAmount(x);
      setDepositAmount(x);
      setDepositfinishedSnackbarOpen(true)
    })
  };

  const back = async () => {//ldx
    props.history.push("/myWallet");//跳转页面
  };

  const handleBuyModalClose = () => {
    setBuyModalOpen(false);
  };
  const [tosModalOpen, settosModalOpen] = React.useState(false);
  const handletosModalOpen = (x, y) => {
    setLongText(x);
    setModalTitle(y)
    settosModalOpen(true);
  };
  const handletosModalClose = () => {
    settosModalOpen(false);
  };

  const [sendToAddress, setSendToAddress] = React.useState("");
  const handleSendToAddressChange = event => {
    setSendToAddress(event.target.value);
  };

  const [sendAmount, setSendAmount] = React.useState("");

  const [depositAmount, setDepositAmount] = React.useState("");
  const handleSendAmountChange = event => {
    setSendAmount(event.target.value);
  };
  const [memo, setMemo] = React.useState("");
  const handleMemoChange = event => {
    setMemo(event.target.value);
  };


  const [accountNames, setAccountNames] = React.useState([]);

  React.useEffect(() => setAccountNames(readAccountList()), []);

  const [
    transactionFinishedSnackbarOpen,
    setTransactionFinishedSnackbarOpen,
  ] = React.useState(false);
  const [
    transactionFailedSnackbarOpen,
    setTransactionFailedSnackbarOpen,
  ] = React.useState(false);

  const handleTransactionFinishedSnackbarClose = () => {
    setTransactionFinishedSnackbarOpen(false);
  };
  const handleTransactionFailedSnackbarClose = () => {
    setTransactionFailedSnackbarOpen(false);
  };

  const [transactionCount, setTransactionCount] = React.useState(0);

  const [pfaBalance, setPfaBalance] = React.useState("");

  const [ihadBalance, setIhadBalance] = React.useState("");

  const [USDTbalance, setUSDTBalance] = React.useState("");

  const [accHistory, setAccHistory] = React.useState([]);

  const [sendCurrency, setSendCurrency] = React.useState("ihad");

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const [currencyDropdownValue, setCurrencyDropdownValue] = React.useState(
    "pfa",
  );

  React.useEffect(() => {
    const fetchBalance = async () => {
      try {
        setPfaBalance(await etherBalance(account));
        const tkBal = await tokenBalance(account, ihadAddress);
        const USDTBal = await tokenBalance(account, USDTaddress);
        console.log(tkBal + "sdfs")
        setIhadBalance(tkBal != null ? tkBal: 0);
        setUSDTBalance(USDTBal != null ? USDTBal : 0);
      } catch (err) {
        console.log(err);
      }
    };
    fetchBalance();
  }, [
    transactionCount,
    Math.floor(new Date().getTime() / (accountInfoRefreshTime * 1000)),
  ]);
  React.useEffect(() => {
    const fetchAccHistory = async () => {
      try {
        const h = await getHistory(account.address);
        setAccHistory(h);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAccHistory();
  }, [
    transactionCount,
    Math.floor(new Date().getTime() / (accountInfoRefreshTime * 1000)),
  ]);

  const [values, setValues] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleScanModalOpen=()=> {
    setScanModalOpen(true)
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Grid style={{ maxWidth: "1100px", margin: "0 auto", backgroundColor: "#212733!important", height: "100vh" }}>
        <main className={classes.content}>
          <Grid className="detailsBackgrad">
            <div className={classes.detailsTop}>
              <Grid className={classes.head} >
                {t.detailsTitle[Config.lang]}
              </Grid> 
              <IconButton className={classes.close} onClick={back}>
                <CloseIcon />
              </IconButton>

              <Grid className="detailsBackgradnew"></Grid>

              <Grid spacing={0} container justify="center" className='listHeader'>
                <Grid item xs={3} className='detailslistLeft'>{t.currency[Config.lang]}</Grid>
                <Grid item xs={2} className='detailslistLeft'>{t.amount[Config.lang]}</Grid>
                <Grid item xs={3} className='detailslistLeft' style={{paddingLeft: 10}}>{t.address[Config.lang]}</Grid>
                <Grid item xs={2} className='detailslistLeft' >{t.date[Config.lang]}</Grid>
                <Grid item xs={2} className='detailslistRightHead'>{t.time[Config.lang]}</Grid>
              </Grid>
            </div>
            <div style={{ height: 93 }}></div>

            <Grid spacing={0} container  justify="center" className='detailslist'>
              <Grid item xs={3}>{t.dataCurrency[Config.lang]}</Grid>
              <Grid item xs={2} >{t.dataAmount[Config.lang]}</Grid>
              <Grid item xs={3} >{t.dataAddress[Config.lang]}</Grid>
              <Grid item xs={2} style={{paddingLeft:'10px', whiteSpace: 'nowrap'}}>{t.dataDate[Config.lang]}</Grid>
              <Grid item xs={2} className='detailslistRight'>{t.dataTime[Config.lang]}</Grid>
            </Grid>
            <Grid className="remarks">
              <Grid item xs={12} >{t.dataRamarks[Config.lang]}</Grid>
            </Grid>
            <Divider />

            <Grid spacing={0} container  justify="center" className='detailslist'>
              <Grid item xs={3}>{t.dataCurrencyTwo[Config.lang]}</Grid>
              <Grid item xs={2} >{t.dataAmountTwo[Config.lang]}</Grid>
              <Grid item xs={3} >{t.dataAddressTwo[Config.lang]}</Grid>
              <Grid item xs={2} style={{paddingLeft:'10px', whiteSpace: 'nowrap'}}>{t.dataDateTwo[Config.lang]}</Grid>
              <Grid item xs={2} className='detailslistRight'>{t.dataTimeTwo[Config.lang]}</Grid>
            </Grid>
            <Grid className="remarks">
              <Grid item xs={12} >{t.dataRamarks[Config.lang]}</Grid>
            </Grid>
            <Divider />

            <Grid spacing={0} container  justify="center" className='detailslist'>
              <Grid item xs={3}>{t.dataCurrency[Config.lang]}</Grid>
              <Grid item xs={2} >{t.dataAmount[Config.lang]}</Grid>
              <Grid item xs={3} >{t.dataAddress[Config.lang]}</Grid>
              <Grid item xs={2} style={{paddingLeft:'10px', whiteSpace: 'nowrap'}}>{t.dataDate[Config.lang]}</Grid>
              <Grid item xs={2} className='detailslistRight'>{t.dataTime[Config.lang]}</Grid>
            </Grid>
            <Grid className="remarks">
              <Grid item xs={12} >{t.dataRamarks[Config.lang]}</Grid>
            </Grid>
            <Divider />

            <Grid spacing={0} container  justify="center" className='detailslist'>
              <Grid item xs={3}>{t.dataCurrencyTwo[Config.lang]}</Grid>
              <Grid item xs={2} >{t.dataAmountTwo[Config.lang]}</Grid>
              <Grid item xs={3} >{t.dataAddressTwo[Config.lang]}</Grid>
              <Grid item xs={2} style={{paddingLeft:'10px', whiteSpace: 'nowrap'}}>{t.dataDateTwo[Config.lang]}</Grid>
              <Grid item xs={2} className='detailslistRight'>{t.dataTimeTwo[Config.lang]}</Grid>
            </Grid>
            <Grid className="remarks">
              <Grid item xs={12} >{t.dataRamarks[Config.lang]}</Grid>
            </Grid>
            <Divider />

            <Grid spacing={0} container  justify="center" className='detailslist'>
              <Grid item xs={3}>{t.dataCurrency[Config.lang]}</Grid>
              <Grid item xs={2} >{t.dataAmount[Config.lang]}</Grid>
              <Grid item xs={3} >{t.dataAddress[Config.lang]}</Grid>
              <Grid item xs={2} style={{paddingLeft:'10px', whiteSpace: 'nowrap'}}>{t.dataDate[Config.lang]}</Grid>
              <Grid item xs={2} className='detailslistRight'>{t.dataTime[Config.lang]}</Grid>
            </Grid>
            <Grid className="remarks">
              <Grid item xs={12} >{t.dataRamarks[Config.lang]}</Grid>
            </Grid>
            <Divider />

            <Grid spacing={0} container  justify="center" className='detailslist'>
              <Grid item xs={3}>{t.dataCurrencyTwo[Config.lang]}</Grid>
              <Grid item xs={2} >{t.dataAmountTwo[Config.lang]}</Grid>
              <Grid item xs={3} >{t.dataAddressTwo[Config.lang]}</Grid>
              <Grid item xs={2} style={{paddingLeft:'10px', whiteSpace: 'nowrap'}}>{t.dataDateTwo[Config.lang]}</Grid>
              <Grid item xs={2} className='detailslistRight'>{t.dataTimeTwo[Config.lang]}</Grid>
            </Grid>
            <Grid className="remarks">
              <Grid item xs={12} >{t.dataRamarks[Config.lang]}</Grid>
            </Grid>
            <Divider />

            <Grid spacing={0} container  justify="center" className='detailslist'>
              <Grid item xs={3}>{t.dataCurrency[Config.lang]}</Grid>
              <Grid item xs={2} >{t.dataAmount[Config.lang]}</Grid>
              <Grid item xs={3} >{t.dataAddress[Config.lang]}</Grid>
              <Grid item xs={2} style={{paddingLeft:'10px', whiteSpace: 'nowrap'}} >{t.dataDate[Config.lang]}</Grid>
              <Grid item xs={2} className='detailslistRight'>{t.dataTime[Config.lang]}</Grid>
            </Grid>
            <Grid className="remarks">
              <Grid item xs={12} >{t.dataRamarks[Config.lang]}</Grid>
            </Grid>
            <Divider />

            <Grid spacing={0} container  justify="center" className='detailslist'>
              <Grid item xs={3}>{t.dataCurrencyTwo[Config.lang]}</Grid>
              <Grid item xs={2} >{t.dataAmountTwo[Config.lang]}</Grid>
              <Grid item xs={3} >{t.dataAddressTwo[Config.lang]}</Grid>
              <Grid item xs={2} style={{paddingLeft:'10px', whiteSpace: 'nowrap'}}>{t.dataDateTwo[Config.lang]}</Grid>
              <Grid item xs={2} className='detailslistRight'>{t.dataTimeTwo[Config.lang]}</Grid>
            </Grid>
            <Grid className="remarks">
              <Grid item xs={12} >{t.dataRamarks[Config.lang]}</Grid>
            </Grid>
            <Divider />

            <Grid spacing={0} container  justify="center" className='detailslist'>
              <Grid item xs={3}>{t.dataCurrency[Config.lang]}</Grid>
              <Grid item xs={2} >{t.dataAmount[Config.lang]}</Grid>
              <Grid item xs={3} >{t.dataAddress[Config.lang]}</Grid>
              <Grid item xs={2} style={{paddingLeft:'10px', whiteSpace: 'nowrap'}}>{t.dataDate[Config.lang]}</Grid>
              <Grid item xs={2} className='detailslistRight'>{t.dataTime[Config.lang]}</Grid>
            </Grid>
            <Grid className="remarks">
              <Grid item xs={12} >{t.dataRamarks[Config.lang]}</Grid>
            </Grid>
            <Divider />

            <Grid spacing={0} container  justify="center" className='detailslist'>
              <Grid item xs={3}>{t.dataCurrencyTwo[Config.lang]}</Grid>
              <Grid item xs={2} >{t.dataAmountTwo[Config.lang]}</Grid>
              <Grid item xs={3} >{t.dataAddressTwo[Config.lang]}</Grid>
              <Grid item xs={2} style={{paddingLeft:'10px', whiteSpace: 'nowrap'}}>{t.dataDateTwo[Config.lang]}</Grid>
              <Grid item xs={2} className='detailslistRight'>{t.dataTimeTwo[Config.lang]}</Grid>
            </Grid>
            <Grid className="remarks">
              <Grid item xs={12} >{t.dataRamarks[Config.lang]}</Grid>
            </Grid>
            <Divider />

          </Grid>
        </main>
        <Grid className="pageFoot" />
      </Grid>

      <Snackbar
        open={transactionFinishedSnackbarOpen}
        autoHideDuration={6000}
        onClose={handleTransactionFinishedSnackbarClose}
        message={t.transactionFinishedInfo[Config.lang]}
      />
      <Snackbar
        open={transactionFailedSnackbarOpen}
        autoHideDuration={6000}
        onClose={handleTransactionFailedSnackbarClose}
        message={t.transactionFailedWarning[Config.lang]}
      />
      <Snackbar
        open={depositfinishedSnackbarOpen}
        autoHideDuration={6000}
        onClose={handleDepositfinishedSnackbarClose}
        message={t.received[Config.lang]+ depositAmount +t.continue[Config.lang]}
      />
      <Snackbar
        open={noinfoSnackbarOpen}
        autoHideDuration={6000}
        onClose={handlenoinfoSnackbarClose}
        message={t.noInformation[Config.lang]}
      />
    </React.Fragment>
  );
}

export default withRouter(Dashboard);
