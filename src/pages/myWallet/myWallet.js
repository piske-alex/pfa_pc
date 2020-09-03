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

import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

import {
  etherBalance,
  getHistory,
  readAccountList,
  sendEther,
  web3js,
  ihadAddress,
  yhadAddress,
  pfa20Address,
  tokenBalance,
  sendToken, USDTaddress, listenUSDTdeposit, sendUSDT, getAddressFromMobile
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
import "./myWallet.css";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";

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
    // position: "absolute",
    // width: 360,
    // height: 500,
    // top: "calc(50% - 500px / 2)",
    // left: "calc(50% - 360px / 2)",
    // backgroundColor: theme.palette.background.paper,
    // boxShadow: theme.shadows[5],
    // padding: theme.spacing(1),
    // outline: "none",
    backgroundColor: "#212733",
    boxShadow: theme.shadows[5],
    padding: "14px",
    outline: "none",

    // width: "94%",
    // height: "60%",
    // background: url(box_bg.png) no-repeat;
    // background-size: cover;
    position: "fixed",
    top: "50%",
    left: "50%",

    transform: "translate(-50%, -50%)",
    zIndex: 200,
  },
  close: {
    position: "absolute",
    right: "10px",
    top: "18px",
  },
  extractRow: {
    width: '100%',
    textAlign: 'center',
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
  // isEmpty(accName) ? accName = cookies.username : accName = "error";
  // const accAddr = account.address;
  const classes = useStyles();

  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };
  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const [seePrivateKey, setSeePrivateKey] = React.useState(false);
  const [scanModalOpen, setScanModalOpen] = React.useState(false);
  const handleScan = (x)=>{
    if(x!=null){
      setSendToAddress(x.slice(4));
      handleScanModalClose();
    }

  };
  const handleScanError=(err)=>{
    alert(t.qrTips[Config.lang]);
    console.error(err)
    handleScanModalClose();
  };
  const handleScanModalClose = ()=>{
    setScanModalOpen(false);
  };
  const [sendInfoModalOpen, setSendInfoModalOpen] = React.useState(false);
  const handleSendInfoModalClose = ()=>{
    setSendInfoModalOpen(false);
  };

  const [modalOpen, setModalOpen] = React.useState(false);
  const [tradeModalOpen, setTradeModalOpen] = React.useState(false);
  const handleTradeModalClose = ()=>{
    setTradeModalOpen(false);
  }
  const [noinfoSnackbarOpen, setnoinfoSnackbarOpen] = React.useState(false);
  const handlenoinfoSnackbarClose = ()=>{
    setnoinfoSnackbarOpen(false);
  }
  const [tradeDetails,setTradeDetails] = React.useState({});
  const handleTradeModalOpen = (entry)=>{
    // let dt = localStorage.getItem('hist-'+hash)
    // console.log(dt)
    if(entry == null){
      setnoinfoSnackbarOpen(true);
    }else{
      setTradeDetails(entry)
      setTradeModalOpen(true)
    }
  }

  const [mobile, setMobile] = React.useState("");
  const onMobileChange = data => {
    // little hack for re-formatting the mobile number
    const values = data.split(' ');
    if (values.length === 1) {
      setMobile("");
    }
    else {
      setMobile(data);
    }
  }

  const [longText, setLongText] = React.useState("undefinede");
  const [modalTitle, setModalTitle] = React.useState("undefinede");
  const handleModalOpen = () => {
    setModalOpen(true);
  };
  const handleModalClose = () => {
    setModalOpen(false);
  };
  const [openChooser, setOpenChooser] = React.useState(false);
  const handleChooseModalClose = ()=>{
    setOpenChooser(false)
  }
  const [sendModalOpen, setSendModalOpen] = React.useState(false);
  const handleSendModalOpen = () => {
    setSendModalOpen(true);
  };

  const changeTZ = (time) =>{
    let format = 'YYYY-MM-DD HH:mm:ss';
    //console.log(moment(time, format).tz("America/Toronto").format(format))
    return moment(time, format).add(8, 'hours').format(format);
  }

  const handleSendAsset = () => {
    setTransactionCount(transactionCount + 1);
    const sendAsset = async () => {
      try {
        if (sendCurrency === "pfa") {
          if(sendAmount<=pfaBalance){
            await sendEther(account, sendToAddress, sendAmount,memo);
          }else{
            setTransactionFailedSnackbarOpen(true);
          }

        } else if (sendCurrency === "ihad") {

          if(sendAmount > ihadBalance){
            setTransactionFailedSnackbarOpen(true);
            return;
          }

          try {
            // Seperate Region Code + Mobile
/*            const values = mobile.trim().split(' ');
            if (values.length !== 2) {
              throw new Error('invalid phone formatting');
            }

            const regionCode = values[0].replace('+', '');
            const phone = values[1];
*/
            // use mobile here
            const res = await getAddressFromMobile(sendToAddress);
            if (!res) throw new Error('empty resolve address response');
            else if (!res.address) {
              setTransactionFailedSnackbarOpen(true);
              throw new Error('invalid resolve address response');
            }

            // send coin
            await sendToken(ihadAddress, account, res.address, sendAmount,memo);
          } catch (e) {
            console.log(e);
          }
        } else if(sendCurrency === "usdt"){
          const res = await getAddressFromMobile(sendToAddress);
          if (!res) throw new Error('empty resolve address response');
          else if (!res.address) {
            if(sendAmount<=USDTbalance  && sendAmount>=15){
              // eslint-disable-next-line no-restricted-globals
              if(!confirm(`你即將發送 ${sendAmount}USDT 到外部地址 ${sendToAddress}，將收取 2USDT 手續費`)) return
              await sendUSDT(sendToAddress,sendAmount,{...account, username: cookies.username},memo)
            }else{
              alert('最少發送 15USDT 及發送數量必須大於餘額')
              setTransactionFailedSnackbarOpen(true);
            }
          }else{
            if(sendAmount<=USDTbalance && sendAmount>=0){
              // eslint-disable-next-line no-restricted-globals
              if(!confirm(`你即將發送 ${sendAmount}USDT 到內部地址 ${res.address}，將不收取手續費`)) return
              await sendToken(USDTaddress, account, res.address, sendAmount,memo);
            }else{
              alert('最少發送 >0USDT 及發送數量必須大於餘額')
              setTransactionFailedSnackbarOpen(true);
            }

          }


        } else if(sendCurrency === "usdti"){
          if(sendAmount<=USDTbalance){

          }else{
            setTransactionFailedSnackbarOpen(true);
          }

        }else {
          throw new Error("ValueError: No currency type selected");
        }
        setTransactionFinishedSnackbarOpen(true);
        handleSendModalClose();
        setTransactionCount(transactionCount + 3);
      } catch (err) {
        console.log(err);
        console.log(err);
        if(err.message === "pool lack balance"){
          if(sendAmount<1500){
            alert('系統出幣安全維護中，請稍等3小時再試')

          }else{
            alert('由於打出USDT金額超過安全值，請聯絡客服進一步');
          }
        }
        setTransactionFailedSnackbarOpen(true);
      }
    };
    sendAsset();
  };

  const handleSendModalClose = () => {
    setSendModalOpen(false);
  };
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

  const detailsButton = async () => {//ldx
    props.history.push("/details");
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

  const changefile = async (e) => {
    /*let data = new FormData();
    data.append('smfile', e.target.files[0]);
    let response = await fetch(`https://sm.ms/api/upload`, {
      method: "POST",
      body: params,
    });
    let ret = await response.json();
    ret.data.url*/
    console.log(e.target.files[0])
    try{
      createImageBitmap(e.target.files[0])
        .then(async bmp => {
          const canvas = await document.createElement('canvas');

          const width = bmp.width;
          const height = bmp.height;
          canvas.width = bmp.width;
          canvas.height = bmp.height;

          const ctx = await canvas.getContext('2d');

          await ctx.drawImage(bmp, 0, 0);
          const qrCodeImageFormat = await ctx.getImageData(0, 0, bmp.width, bmp.height);
          const qrDecoded = await jsQR(qrCodeImageFormat.data, qrCodeImageFormat.width, qrCodeImageFormat.height);
          if(qrDecoded==null){
            alert(t.qrTips[Config.lang])
          }else{
            setSendToAddress(qrDecoded.data.slice(4));
          }

        });
    }catch (e) {
      console.log(e.toString())
    }
  };

  const handleTransactionFinishedSnackbarClose = () => {
    setTransactionFinishedSnackbarOpen(false);
  };
  const handleTransactionFailedSnackbarClose = () => {
    setTransactionFailedSnackbarOpen(false);
  };

  const [transactionCount, setTransactionCount] = React.useState(0);

  const [pfaBalance, setPfaBalance] = React.useState("");

  const [yhadBalance, setYhadBalance] = React.useState("");

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
        const pfa20Bal = await tokenBalance(account, pfa20Address)
        setPfaBalance(pfa20Bal!=null?pfa20Bal:0);
        const tkBal = await tokenBalance(account, ihadAddress);
        const yhadBal = await tokenBalance(account, yhadAddress);
        const USDTBal = await tokenBalance(account, USDTaddress);
        console.log(tkBal + "sdfs")
        setIhadBalance(tkBal != null ? tkBal: 0);
        setYhadBalance(yhadBal!=null?yhadBal:0)
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
          <Grid className="backgrad">
            <Grid className={classes.head} >
              {t.title[Config.lang]}
            </Grid>
            <Grid container direction={"column"} className="titleMagin" >
              <Grid item style={{ marginBottom: "10px" }}>
                <Grid
                  container
                  spacing={0}
                  direction="row"
                  alignItems="center"
                  justify="center"
                  className="backgrad"
                >
                  <Grid item>
                    <Typography variant={"body2"} className={classes.container1}>
                      {t.valuation[Config.lang]}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item>
                <HorizontalCenter>
                  <Grid className="usdtVulesClass">
                    {pfaBalance*1.5+ihadBalance +USDTbalance}
                  </Grid>
                  <Grid className="usdtVulesClassCode">
                    {t.UsdtCode[Config.lang]}
                  </Grid>
                </HorizontalCenter>
              </Grid>

              <Grid item style={{ height: "10px" }} />
              <Grid item style={{ width: '100%', paddingLeft: 'calc(50% - 261px / 2)' }}>
                <div className = "myWalletTwoBtn">
                  <Button
                    variant="outlined"
                    onClick={setBuyModalOpen}
                    style={{ width: "130px", color: '#C0C0C0', padding:'5px 0px', marginRight: 1 }}
                  >
                    <img src={'after.png'} className="donateClass" />
                    <Grid className="rechargeClass">
                      {t.Recharge[Config.lang]}
                    </Grid>
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={setSendModalOpen}
                    style={{ width: "130px", color: '#C0C0C0', padding:'5px 0px' }}
                  >
                    <img src='https://i.loli.net/2019/06/28/5d15641e8e59187387.png' className="donateClass" />
                    <Grid className="rechargeClass">
                      {t.withdrawal[Config.lang]}
                    </Grid>
                  </Button>
                </div>
              </Grid>
            </Grid>
            <Grid container direction={"column"} >
              <Grid style={{ height: '10px', width: '100%', background: 'black', marginTop: '30px' }} />

              <Grid style={{ width: '100%' }}>
                <Typography variant={"body2"} style={{ marginTop: "10px", color: "#FFB601", height: '6px' }} className="paddingle">
                  <Icon className='msgIcon'>assessment</Icon>
                  <Grid className='msgIconText'>
                    {t.assets[Config.lang]}
                  </Grid>
                  <Grid className='msgIconTextrg'>
                    <Icon className='msgIcon'>sort_by_alpha</Icon>
                  </Grid>
                </Typography>

                <Grid style={{ height: '10px', width: '100%', background: 'black', marginTop: '30px' }} />
                <Grid className="paddingle">
                  <List>
                    <ListItem alignItems="flex-start">

                      <Grid className="usdt">
                        <Avatar src='https://i.loli.net/2019/06/26/5d12cd78a53e047314.png' />
                      </Grid>
                      <Grid className="binance">
                        {`PFA`}
                      </Grid>
                      <Grid className="binanceCoin">
                        {'(Price Fitch Asset)'}
                      </Grid>
                      <Grid className="binanceCoinNumber">
                        {parseFloat(pfaBalance).toFixed(2)}
                      </Grid>
                    </ListItem>

                    <Divider className='myWalletline' />

                    <ListItem alignItems="flex-start">
                    {/* <Grid className="myWalletTab"> */}
                      <Grid className="usdt">
                        <Avatar src='https://i.loli.net/2019/06/26/5d12bffaf379385695.png' />
                      </Grid>
                      <Grid className="binance">
                        {`USDT`}
                      </Grid>
                      <Grid className="binanceCoin">
                        {'(TetherUSD)'}
                      </Grid>
                      <Grid className="binanceCoinNumber">
                        {parseFloat(USDTbalance).toFixed(2)
                          }
                      </Grid>
                      {/* </Grid> */}
                    </ListItem>

                    <Divider className='myWalletline' />

                    <ListItem alignItems="flex-start">
                      {/* <Grid className="myWalletTab"> */}
                      <Grid className="usdt">
                        <Avatar src='https://i.loli.net/2019/06/27/5d1422b33e7ff68920.png' />
                      </Grid>
                      <Grid className="binance">
                        {`HAD`}
                      </Grid>
                      <Grid className="binanceCoin">
                        {'(Health Aqua Digital)'}
                      </Grid>
                      <Grid className="binanceCoinNumber">
                        {parseFloat(ihadBalance).toFixed(2)
                          }
                      </Grid>
                      {/* </Grid> */}
                    </ListItem>

                    {/*<ListItem alignItems="flex-start">
                      {/* <Grid className="myWalletTab"> }
                      <Grid className="usdt">
                        <Avatar src='https://i.loli.net/2019/12/25/TjarbWdt8QZmRev.png' />
                      </Grid>
                      <Grid className="binance">
                        {`YHAD`}
                      </Grid>
                      <Grid className="binanceCoin">
                        {'(Yuan HAD)'}
                      </Grid>
                      <Grid className="binanceCoinNumber">
                        {//parseFloat(ihadBalance).toFixed(2)
                        yhadBalance}
                      </Grid>
                      {/* </Grid> }
                    </ListItem>*/}
                  </List>
                </Grid>

                <Grid className="paddingle" item style={{ maxHeight: "40vh", overflow: "auto", paddingBottom: 5 }}>
                  {/* <Typography variant={"body2"} style={{ marginBottom: "5px" }}>
                    {t.transactionRecord[Config.lang]}
                  </Typography> */}

                  <Grid className="transactionRecordClass">
                      <Grid className ="transactionRecordClassLeft">
                        {t.transactionRecord[Config.lang]}
                      </Grid>

                      <Grid className ="transactionRecordClassRight">
                          <Button
                            variant="outlined"
                            onClick={detailsButton}
                            style={{ width: "100px", color: '#C0C0C0', padding:'2px 0px', float:'right'}} >
                            <Grid className="rechargeClass">
                              {t.details[Config.lang]}
                            </Grid>
                          </Button>
                      </Grid>
                  </Grid>



                  <Divider />
                  {accHistory.length === 0 ? (
                    <Typography variant={"body2"} style={{ marginTop: "5px" }}>
                      {t.noTransactionInfo[Config.lang]}
                    </Typography>
                  ) : (
                    <List>
                      {accHistory
                      /*.filter(
                        entry =>
                          entry.currency.toLowerCase() === currencyDropdownValue,
                      )*/
                        .map(entry => (
                          <ListItem alignItems="flex-start" style={{paddingTop:"0px",paddingBottom:"0px"}} onClick={()=>{
                            console.log("fmkesomfkoseaf");
                            console.log(entry);
                            handleTradeModalOpen(entry)
                          }}>
                            {entry.type === "in" ? (
                              <ListItemIcon>
                                <ReceiveIcon />
                              </ListItemIcon>
                            ) : null}
                            {entry.type === "out" ? (
                              <ListItemIcon>
                                <SendIcon />
                              </ListItemIcon>
                            ) : null}
                            <ListItemText
                              primary={`${
                                entry.type === "in"
                                  ? t.receive[Config.lang]
                                  : entry.type === "out"
                                  ? t.send[Config.lang]
                                  : entry.type
                                } ${entry.absvalue} ${entry.currency}`}
                              secondary={
                                <React.Fragment>
                                  <Typography variant={"body2"} className="codeWidth">
                                    {`${decodeURIComponent(entry.counterparty)}`}
                                  </Typography>
                                  <Typography variant={"body2"}>
                                    {`${decodeURIComponent(entry.memo).slice(0,30)}`}
                                  </Typography>
                                  <Typography variant={"body2"}>{changeTZ(`${(entry.time).slice(0,10)} ${(entry.time.slice(11,19))}`)} ({t.myWallet.timeZone[Config.lang]}：GMT+8)</Typography>
                                </React.Fragment>
                              }
                            />
                          </ListItem>
                        ))}
                    </List>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </main>
        <Grid className="pageFoot" />
      </Grid>

      <Modal open={buyModalOpen} onBackdropClick={handleBuyModalClose}>
        <div className={classes.modalPaper + " modalWidthTwo modelHeight"}>
          <Grid container direction={"column"} style={{ height: '100%' }}>
            <Grid item>
              <div className={classes.toolbarIcon}>
                <Typography variant={"h5"} style={{ }}>
                  {`${t.buy[Config.lang]} ${t.UsdtCode[Config.lang]}`}
                </Typography>
                <IconButton className={classes.close} onClick={handleBuyModalClose}>
                  <CloseIcon />
                </IconButton>
              </div>
            </Grid>
            <Grid item style={{ overflow: "auto", height: "calc(100% - 78px)" }}>
              <Typography variant={"p"}>
                {`${t.purchaseAddress[Config.lang]}`}
              </Typography>
              <br></br>
              <Typography variant={"p"}>
                此為以太坊 ERC-20 USDT 地址，請勿將其他資產轉賬至此地址
              </Typography>
              <Paper style={{border:"8px solid white",height:"106px",width:"106px"}}>
                <QRCode value={`pfa:${account.USDTaddress}`} style={{ height: "90px", width: "90px" }} renderAs={"svg"} />
              </Paper><br />
              <span className="lineFeed">{account.USDTaddress}</span><br /><br />
              <LinearProgress variant="query" /><br />
              <Typography variant={"p"} style={{ }}>{`${t.completeRecharge[Config.lang]}`}</Typography>
              <List >
                {usdtProvider.map(p => (
                  Config.lang == "ch" && p.ch == "true" ? 
                    <ListItem
                      component={MaterialLink}
                      key={p.url}
                      href={p.url}
                      target="_blank"
                      style={{
                        border: "1px solid white",
                        textDecoration: "none",
                        marginTop: "5px",
                        marginBottom: "5px",
                        borderRadius: "5px",
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar
                          src={p.logoUrl}
                          style={{
                            backgroundColor: "white",
                          }}
                          imgProps={{
                            style: {
                              transform: `scale(${p.logoScale}, ${p.logoScale})`,
                              height: "auto",
                            },
                          }}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={p.name[Config.lang]}
                        primaryTypographyProps={{ color: "textPrimary" }}
                        secondary={p.description[Config.lang]}
                      />
                    </ListItem>
                  : Config.lang == "en" && p.en == "true" ? 
                      <ListItem
                        component={MaterialLink}
                        key={p.url}
                        href={p.url}
                        target="_blank"
                        style={{
                          border: "1px solid white",
                          textDecoration: "none",
                          marginTop: "5px",
                          marginBottom: "5px",
                          borderRadius: "5px",
                        }}
                      >
                        <ListItemAvatar>
                          <Avatar
                            src={p.logoUrl}
                            style={{
                              backgroundColor: "white",
                            }}
                            imgProps={{
                              style: {
                                transform: `scale(${p.logoScale}, ${p.logoScale})`,
                                height: "auto",
                              },
                            }}
                          />
                        </ListItemAvatar>
                        <ListItemText
                          primary={p.name[Config.lang]}
                          primaryTypographyProps={{ color: "textPrimary" }}
                          secondary={p.description[Config.lang]}
                        />
                      </ListItem>
                      :""
                ))}
              </List>

            </Grid>

          </Grid>
        </div>
      </Modal>

      <Modal open={sendModalOpen} onBackdropClick={handleSendModalClose}>
        <div className={classes.modalPaper + " modalWidthTwo modelHeight"}>
          <div className={classes.toolbarIcon}>
            <Typography variant={"h5"} style={{ }}>{`${t.withdrawal[Config.lang]}`}</Typography>
            <IconButton className={classes.close} onClick={handleSendModalClose}>
              <CloseIcon />
            </IconButton>
          </div>
          <Grid
            container
            alignItems={"flex-start"}
            justify={"space-evenly"}
            spacing={2}
            style={{ height: 'calc(100% - 70px)',overflow: 'auto', width: '100%', margin: 0 }}
          >
            <Grid item className={classes.extractRow}>
              <TextField
                label={t.from[Config.lang]}
                value={`${account.address}`}
                disabled
                style={{ width: "280px" }}
              />
            </Grid>

              <div>
              <Grid item className={classes.extractRow}>
                <TextField
                  label={t.to[Config.lang]}
                  value={sendToAddress}
                  onChange={handleSendToAddressChange}
                  style={{ width: "280px" }}
                />
              </Grid>
              <br />
              <Grid item className={classes.extractRow}>
                <div style={{ width: 280, marginLeft: 'calc(50% - 140px)' }}>
                  <div className="upload-btn-wrapper" style={{
                    position: "relative",
                    overflow: "hidden",
                    display: "inline-block",
                  }}>
                    <button className="CommonButtonStyle" style={{
                      width:140,
                      height:'41px',
                      borderRadius: "8px",
                    }}>{t.uploadQRCode[Config.lang]}</button>
                    <input type="file" name="myfile" style={{
                      fontSize: "100px",
                      position: "absolute",
                      left: 0,
                      top: 0,
                      opacity: 0
                    }} onChange={changefile}/>
                  </div>
                  <div className="upload-btn-wrapper" style={{
                    position: "relative",
                    overflow: "hidden",
                    display: "inline-block",
                  }}>
                    <button className="CommonButtonStyle" style={{
                      width:140,
                      height:'41px',
                      borderRadius: "8px",
                    }} onClick={handleScanModalOpen}>{t.recognitionQRcode[Config.lang]}</button>
                  </div>
                </div>
              </Grid>
                <Grid item className={classes.extractRow}>
                  <button className="CommonButtonStyle" style={{
                    width:'100%',
                    height:'41px',
                    borderRadius: "8px",
                  }} onClick={()=>setSendInfoModalOpen(true)}>{`查看出售渠道`}</button>
                </Grid>
            </div>

      
            <Grid item className={classes.extractRow}>
              <FormControl style={{ width: "280px" }}>
                <InputLabel>{t.asset[Config.lang]}</InputLabel>
                <Select
                  value={sendCurrency}
                  onChange={event => {
                    setSendCurrency(event.target.value);
                  }}
                >
                  <MenuItem value="ihad">{t.ihad[Config.lang]}</MenuItem>
                  <MenuItem value="usdt">{t.usdt[Config.lang]}</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item className={classes.extractRow}>
              <TextField
                label={t.amount[Config.lang]}
                helperText={t.transactionDelayInfo[Config.lang]}
                value={sendAmount}
                onChange={handleSendAmountChange}
                style={{ width: "280px" }}
              />

            </Grid>
            <Grid item className={classes.extractRow}>
              <TextField
                label={t.note[Config.lang]}
                helperText={t.fillInFormat[Config.lang]}
                value={memo}
                onChange={handleMemoChange}
                style={{ width: "280px" }}
              />

            </Grid>
            <Grid item className={classes.extractRow}>
              <FormControl style={{ width: "280px" }}>
                <Button
                  className="CommonButtonStyle"
                  variant="contained"
                  color="primary"
                  onClick={handleSendAsset}
                  style={{ letterSpacing: "1px", }}
                >
                  {t.send[Config.lang]}
                </Button>
              </FormControl>
            </Grid>
          </Grid>
        </div>
      </Modal>

      <Modal open={buyModalOpen} onBackdropClick={handleBuyModalClose}>
        <div className={classes.modalPaper + " modalWidthTwo modelHeight"}>
          <Grid container direction={"column"} style={{ height: '100%' }}>
            <Grid item>
              <div className={classes.toolbarIcon}>
                <Typography variant={"h5"} style={{ }}>
                  {`${t.buy[Config.lang]} ${t.UsdtCode[Config.lang]}`}
                </Typography>
                <IconButton className={classes.close} onClick={handleBuyModalClose}>
                  <CloseIcon />
                </IconButton>
              </div>
            </Grid>
            <Grid item style={{ overflow: "auto", height: "calc(100% - 78px)" }}>
              <Typography variant={"p"}>
                {`${t.purchaseAddress[Config.lang]}`}
              </Typography>
              <br></br>
              <Typography variant={"p"}>
                此為以太坊 ERC-20 USDT 地址，請勿將其他資產轉賬至此地址
              </Typography>
              <Paper style={{border:"8px solid white",height:"106px",width:"106px"}}>
                <QRCode value={`pfa:${account.USDTaddress}`} style={{ height: "90px", width: "90px" }} renderAs={"svg"} />
              </Paper><br />
              <span className="lineFeed">{account.USDTaddress}</span><br /><br />
              <LinearProgress variant="query" /><br />
              <Typography variant={"p"} style={{ }}>{`${t.completeRecharge[Config.lang]}`}</Typography>
              <List >
                {usdtProvider.map(p => (
                  Config.lang == "ch" && p.ch == "true" ?
                    <ListItem
                      component={MaterialLink}
                      key={p.url}
                      href={p.url}
                      target="_blank"
                      style={{
                        border: "1px solid white",
                        textDecoration: "none",
                        marginTop: "5px",
                        marginBottom: "5px",
                        borderRadius: "5px",
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar
                          src={p.logoUrl}
                          style={{
                            backgroundColor: "white",
                          }}
                          imgProps={{
                            style: {
                              transform: `scale(${p.logoScale}, ${p.logoScale})`,
                              height: "auto",
                            },
                          }}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={p.name[Config.lang]}
                        primaryTypographyProps={{ color: "textPrimary" }}
                        secondary={p.description[Config.lang]}
                      />
                    </ListItem>
                    : Config.lang == "en" && p.en == "true" ?
                    <ListItem
                      component={MaterialLink}
                      key={p.url}
                      href={p.url}
                      target="_blank"
                      style={{
                        border: "1px solid white",
                        textDecoration: "none",
                        marginTop: "5px",
                        marginBottom: "5px",
                        borderRadius: "5px",
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar
                          src={p.logoUrl}
                          style={{
                            backgroundColor: "white",
                          }}
                          imgProps={{
                            style: {
                              transform: `scale(${p.logoScale}, ${p.logoScale})`,
                              height: "auto",
                            },
                          }}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={p.name[Config.lang]}
                        primaryTypographyProps={{ color: "textPrimary" }}
                        secondary={p.description[Config.lang]}
                      />
                    </ListItem>
                    :""
                ))}
              </List>

            </Grid>

          </Grid>
        </div>
      </Modal>

      <Modal open={sendInfoModalOpen} onBackdropClick={handleSendInfoModalClose}>
        <div className={classes.modalPaper + " modalWidthTwo modelHeight"}>
          <div className={classes.toolbarIcon}>
            <Typography variant={"h5"} style={{ }}>{`${t.withdrawal[Config.lang]}`}</Typography>
            <IconButton className={classes.close} onClick={handleSendInfoModalClose}>
              <CloseIcon />
            </IconButton>
          </div>
          <Grid
            container
            alignItems={"flex-start"}
            justify={"space-evenly"}
            spacing={2}
            style={{ height: 'calc(100% - 70px)',overflow: 'auto', width: '100%', margin: 0 }}
          >
            <List >
              {usdtProvider.map(p => (
                Config.lang == "ch" && p.ch == "true" ?
                  <ListItem
                    component={MaterialLink}
                    key={p.url}
                    href={p.url}
                    target="_blank"
                    style={{
                      border: "1px solid white",
                      textDecoration: "none",
                      marginTop: "5px",
                      marginBottom: "5px",
                      borderRadius: "5px",
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar
                        src={p.logoUrl}
                        style={{
                          backgroundColor: "white",
                        }}
                        imgProps={{
                          style: {
                            transform: `scale(${p.logoScale}, ${p.logoScale})`,
                            height: "auto",
                          },
                        }}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={p.name[Config.lang]}
                      primaryTypographyProps={{ color: "textPrimary" }}
                      secondary={p.description[Config.lang]}
                    />
                  </ListItem>
                  : Config.lang == "en" && p.en == "true" ?
                  <ListItem
                    component={MaterialLink}
                    key={p.url}
                    href={p.url}
                    target="_blank"
                    style={{
                      border: "1px solid white",
                      textDecoration: "none",
                      marginTop: "5px",
                      marginBottom: "5px",
                      borderRadius: "5px",
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar
                        src={p.logoUrl}
                        style={{
                          backgroundColor: "white",
                        }}
                        imgProps={{
                          style: {
                            transform: `scale(${p.logoScale}, ${p.logoScale})`,
                            height: "auto",
                          },
                        }}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={p.name[Config.lang]}
                      primaryTypographyProps={{ color: "textPrimary" }}
                      secondary={p.description[Config.lang]}
                    />
                  </ListItem>
                  :""
              ))}
            </List>
          </Grid>
        </div>
      </Modal>
      <Modal open={scanModalOpen} onBackdropClick={handleScanModalClose}>
        <div className={classes.modalPaper + " modalWidth"}>
          <div className={classes.toolbarIcon}>
            <Typography variant={"h5"} style={{ }}>{t.recognitionQRcode[Config.lang]}</Typography>
            <IconButton className={classes.close} onClick={handleScanModalClose}>
              <CloseIcon />
            </IconButton>
          </div>
          <Grid
            container
            direction={"column"}
            alignItems={"flex-start"}
            justify={"space-evenly"}
            spacing={2}
            style={{ marginLeft: "10px", marginRight: "10px" }}
          >
            <QrReader
              delay={100}
              style={{height: 240,
                width: 320,}}
              onError={handleScanError}
              onScan={handleScan}
              facingMode={"rear"}
            />
          </Grid>
        </div>
      </Modal>

      <Modal open={tradeModalOpen} onBackdropClick={handleTradeModalClose} >
        <div className={classes.modalPaper + " modalWidthTwo modelHeight"}>
          <div className={classes.toolbarIcon}>
            <Typography variant={"h5"} style={{ }}>{t.transactionVC[Config.lang]}</Typography>
            <IconButton className={classes.close} onClick={handleTradeModalClose}>
              <CloseIcon />
            </IconButton>
          </div>
          <Grid
            container
            direction={"column"}
            alignItems={"flex-start"}
            justify={"space-evenly"}
            spacing={2}
            style={{ marginLeft: "10px", marginRight: "10px" }}
          >
            <p>{t.sendAddress[Config.lang]}: {tradeDetails.type === 'in' ? tradeDetails.counterparty : account.USDTaddress}</p>
            <p>{t.designationAddress[Config.lang]}:	{tradeDetails.type === 'in' ? account.USDTaddress : tradeDetails.counterparty}</p>
            <p>{t.type[Config.lang]}: {tradeDetails.type === '' ? t.in[Config.lang] : t.out[Config.lang]}</p>
            <p>{t.quantity[Config.lang]}: {tradeDetails.absvalue}</p>
            <p dangerouslySetInnerHTML={{ __html: (t.remark[Config.lang] + ' : ' + decodeURIComponent(tradeDetails.memo))}}></p>
            <p>{t.time[Config.lang]}: {tradeDetails.time}</p>
          </Grid>
        </div>
      </Modal>

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

      <Dialog onClose={handleChooseModalClose} aria-labelledby="simple-dialog-title" open={openChooser}>
        <DialogTitle id="simple-dialog-title">請選擇</DialogTitle>
        <List>


          <ListItem button onClick={() => history.push("/aboutUs")}>
            <ListItemAvatar>
              <Avatar src='https://i.loli.net/2019/06/26/5d12cd78a53e047314.png' />
            </ListItemAvatar>
            <ListItemText primary="HAD 或內部 USDT" />
          </ListItem>

          <ListItem button onClick={handleBuyModalOpen}>
            <ListItemAvatar>
              <Avatar src='https://i.loli.net/2019/06/26/5d12bffaf379385695.png' />
            </ListItemAvatar>
            <ListItemText primary="外部 ERC-20 USDT" />
          </ListItem>
        </List>
      </Dialog>
    </React.Fragment>
  );
}

export default withRouter(Dashboard);
