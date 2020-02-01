import React from "react";
import clsx from "clsx";
import { withRouter } from "react-router-dom";
import QRCode from "qrcode.react";

import { Carousel, WingBlank } from 'antd-mobile';

import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import { ClickAwayListener, Snackbar, Paper } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import Modal from "@material-ui/core/Modal";
import t from "../../public/js/translation";
import TextField from "@material-ui/core/TextField";
import CloseIcon from "@material-ui/icons/Close";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MaterialLink from "@material-ui/core/Link";
import Divider from "@material-ui/core/Divider";
import useCookies from "react-cookie/cjs/useCookies";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import LinearProgress from "@material-ui/core/LinearProgress";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Icon from '@material-ui/core/Icon';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { CopyButton } from "react-copy-button";
import Moment from "react-moment";
import DialogTitle from '@material-ui/core/DialogTitle';
import {
  etherBalance,
  getHistory,
  readAccountList,
  sendEther,
  ihadAddress,
  tokenBalance,
  sendToken, USDTaddress, listenUSDTdeposit, exportAccounts, sendUSDT, createUSDTWallet
} from "../../public/js/blockchain-utils";
import {
  getLogoUrl,
  HorizontalCenter,
  isEmpty
} from "../../public/js/utils";
import { usdtProvider } from "../../public/js/data";
import Config from "../../public/js/config";
import './dashboard.css';
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import HistoryPage from "../../historyPage";
import  jsQR  from "jsqr";
import QrReader from 'react-qr-scanner'
import moment from "moment";
import config from "../../public/js/config";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";


const accountInfoRefreshTime = 20;
const drawerWidth = 300;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    // display: "flex",
    // alignItems: "center",
    // justifyContent: "flex-end",
    // padding: "0 2px",
    // ...theme.mixins.toolbar,

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
    height: "100vh",
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

function Dashboard({
  account,
  history,
  currentUsername,
  handleLogout,
  handleChangeAccount,
  onAccountCreate
}) {

  window.Clipboard = (function(window, document, navigator) {
    var textArea,
      copy;

    function isOS() {
      return navigator.userAgent.match(/ipad|iphone/i);
    }

    function createTextArea(text) {

      textArea = document.createElement('textArea');
      textArea.value = text;
      document.getElementById("copiable").appendChild(textArea);
    }

    function selectText() {
      var range,
        selection;

      if (isOS()) {
        range = document.createRange();
        range.selectNodeContents(textArea);
        selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        textArea.setSelectionRange(0, 999999);
      } else {
        textArea.select();
      }
    }

    function copyToClipboard() {
      console.log("coppting")
      document.execCommand('copy');
      document.getElementById("copiable").removeChild(textArea);
    }

    copy = function(text) {
      createTextArea(text);
      selectText();
      copyToClipboard();
    };

    return {
      copy: copy
    };
  })(window, document, navigator);

  const logoUrl = getLogoUrl();
  const [openSetPw, setOpenSetPw] = React.useState(false);

  const handleSetPwClose = () => {
    setOpenSetPw(false);
  };

  const [cookies, setCookie] = useCookies(['pfa']);
  let something = ""
  console.log(account);
  if (account == null || isEmpty(account)) {
    account = cookies.acctobj;
    console.log(cookies.acctobj);
    isEmpty(account) ? history.push("/login-account") : something = "continue";
  }
  let accName = currentUsername;
  isEmpty(accName) ? accName = cookies.username : accName = "error";
  const accAddr = account.address;
  const classes = useStyles();

  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };
  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const [memo, setMemo] = React.useState("");
  const handleMemoChange = event => {
    setMemo(event.target.value);
  };
  const [seePrivateKey, setSeePrivateKey] = React.useState(false);
  const [longText, setLongText] = React.useState("undefinede");
  const [modalTitle, setModalTitle] = React.useState("undefinede");
  const [modalOpen, setModalOpen] = React.useState(false);
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
  const handleScanModalOpen = ()=>{
    setScanModalOpen(true);
  }
  const handleModalOpen = () => {
    setModalOpen(true);
  };
  const handleModalClose = () => {
    setModalOpen(false);
  };
  const [copiedSnackbarOpen, setCopiedSnackbarOpen] = React.useState(
    false,
  );
  const handleCopiedSnackbarClose =()=> {
    setCopiedSnackbarOpen(false)
  }

  const handleCopiedSnackbarForPrivOpen =()=> {
    window.Clipboard.copy(account.privateKey)
    setCopiedSnackbarOpen(true)
  }

  const handleCopiedSnackbarExportOpen =()=> {
    window.Clipboard.copy(exportAccounts())
    setCopiedSnackbarOpen(true)
  }

  const [sendModalOpen, setSendModalOpen] = React.useState(false);
  const handleSendModalOpen = () => {
    setSendModalOpen(true);
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
  const handleBuyModalClose = () => {
    setBuyModalOpen(false);
  };
  const [openChooser, setOpenChooser] = React.useState(false);
  const handleChooseModalClose = ()=>{
    setOpenChooser(false)
  }

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

  const [prices,setPrices] = React.useState({data:{
    BTC:{
      quote:{
        USD:{
          price:0,
          percent_change_24h:0
        }
      }
    }
    }})
  const [list,setList] = React.useState([{ key: "PFA", price: 1.500, qty: (Math.random()*800+8000).toFixed(2), color: '' },
    { key: "HAD", price: 1.000, qty: (Math.random()*800+6000).toFixed(2), color: 'green' },
    { key: "BTC", price: 0, qty: 0, color: 'red' },
    { key: "XRP", price: 0, qty: 0, color: 'green' },
    { key: "ETH", price: 0, qty: 0, color: 'red' },])

  const [accHistory, setAccHistory] = React.useState([]);

  const [sendCurrency, setSendCurrency] = React.useState("ihad");

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const [currencyDropdownValue, setCurrencyDropdownValue] = React.useState(
    "pfa",
  );

  React.useEffect(() => {
    const fetchBalance = async () => {
      try {
        setPfaBalance(`${await etherBalance(account)} PFA`);
        const tkBal = await tokenBalance(account, ihadAddress);
        const USDTBal = await tokenBalance(account, USDTaddress);
        console.log(tkBal + "sdfs")
        setIhadBalance(tkBal != null ? `${tkBal} HAD` : "");
        setUSDTBalance(USDTBal != null ? `${USDTBal} USDT` : "");
      } catch (err) {
        console.log(err);
      }
    };
    fetchBalance();
  }, [
      transactionCount,
      Math.floor(new Date().getTime() / (accountInfoRefreshTime * 1000)),
    ]);

  function numberFormat(number) {
    const format = {
      0: '',
      1: 'K',
      2: 'M',
      3: 'B'
    }
    let count = 0;
    while(number > 1000) {
      number /= 1000;
      count++;
    }
    const formatted = Number(number).toFixed(2) + format[count];
    return formatted;
  }

  React.useEffect(() => {
    // const fetchPrice = async () => {
    //   try {
    //     const h = await fetch("https://rtprice.rubbity.io/");
    //     let price = await h.json();
    //     console.log(price)
    //     setPrices(price);
    //     setList([{ key: "PFA", price: 1.000005, qty: (Math.random()*800+8000).toFixed(2), color: 'green' },
    //       { key: "HAD", price: 1.000031, qty: (Math.random()*800+6000).toFixed(2), color: 'green' },
    //       { key: "BTC", price: (price.data.BTC.quote.USD.price).toFixed(3), qty: (price.data.BTC.quote.USD.volume_24h).toFixed(2), color: price.data.BTC.quote.USD.percent_change_24h>0?"green":"red" },
    //       { key: "XRP", price: (price.data.XRP.quote.USD.price).toFixed(3), qty: (price.data.XRP.quote.USD.volume_24h).toFixed(2), color: price.data.XRP.quote.USD.percent_change_24h>0?"green":"red" },
    //       { key: "ETH", price: (price.data.ETH.quote.USD.price).toFixed(3), qty: (price.data.ETH.quote.USD.volume_24h).toFixed(2), color: price.data.ETH.quote.USD.percent_change_24h>0?"green":"red" },]);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };
    // fetchPrice();
    const CORS = 'https://cors-anywhere.herokuapp.com/';
    const burl = 'https://api.coincap.io';
    const query = '/v2/assets';
    const params = '?ids=bitcoin,ethereum,ripple,litecoin,dash';
    const url = burl + query + params;

    const coincap = fetch(CORS + url, { method: 'GET' });
    let BTC = 0;
    let XRP = 0;
    let ETH = 0;
    let LTC = 0;
    let DASH = 0;
    coincap
      .then(res => res.json())
        .then(data => {
          const markets = data.data;
          for(var i = 0; i < markets.length; i++){
            switch(markets[i].symbol){
              case 'ETH': ETH = markets[i]; break;
              case 'BTC': BTC = markets[i]; break;
              case 'XRP': XRP = markets[i]; break;
              case 'LTC': LTC = markets[i]; break;
              case 'DASH': DASH = markets[i]; break;
            }
          }
          setList([
            { key: "PFA", price: 1.500.toFixed(3),  qty: (Math.random()*800+8000).toFixed(2), color: 'white' },
            { key: "HAD", price: 1.000.toFixed(3),  qty: (Math.random()*800+6000).toFixed(2), color: 'white' },
            //{ key: "YHAD", price: 1.000.toFixed(3), qty: (Math.random()*800+6000).toFixed(2), color: 'white' },
            { key: "BTC",   price: Number(BTC.priceUsd).toFixed(3),   qty: numberFormat(BTC.volumeUsd24Hr),   color: BTC.changePercent24Hr  > 0 ? "green":"red" },
            { key: "XRP",   price: Number(XRP.priceUsd).toFixed(3),   qty: numberFormat(XRP.volumeUsd24Hr),   color: XRP.changePercent24Hr  > 0 ? "green":"red" },
            { key: "ETH",   price: Number(ETH.priceUsd).toFixed(3),   qty: numberFormat(ETH.volumeUsd24Hr),   color: ETH.changePercent24Hr  > 0 ? "green":"red" },
            { key: "LTC",   price: Number(LTC.priceUsd).toFixed(3),   qty: numberFormat(LTC.volumeUsd24Hr),   color: LTC.changePercent24Hr  > 0 ? "green":"red" },
            { key: "DASH",  price: Number(DASH.priceUsd).toFixed(3),  qty: numberFormat(DASH.volumeUsd24Hr),  color: DASH.changePercent24Hr > 0 ? "green":"red" }]);
          setPrices({data:{
              BTC:{
                quote:{
                  USD:{
                    price:BTC.priceUsd,
                    percent_change_24h:BTC.changePercent24Hr
                  }
                }
              }
            }})
        }).catch(e => console.log('error:', e));

  }, [
      transactionCount,
      Math.floor(new Date().getTime() / (accountInfoRefreshTime * 1000)),
    ]);

  React.useEffect(() => {
    if(cookies['type']!="pw"){
      setOpenSetPw(true);
    }
  },[])

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
  const changefile = async (e) => {
    /*let data = new FormData();
    data.append('smfile', e.target.files[0]);
    let response = await fetch(`https://sm.ms/api/upload`, {
      method: "POST",
      body: params,
    });
    let ret = await response.json();
    ret.data.url*/
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
            setSendToAddress(qrDecoded.data.slice(5));
          }

        });
    }catch (e) {
      console.log(e.toString())
    }

  };
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
          if(sendAmount<=ihadBalance){
            await sendToken(ihadAddress, account, sendToAddress, sendAmount,memo);
          }else{
            setTransactionFailedSnackbarOpen(true);
          }

        } else if(sendCurrency === "usdt"){
          if(sendAmount<=USDTbalance){
            await sendUSDT(sendToAddress,sendAmount,account,memo)
          }else{
            setTransactionFailedSnackbarOpen(true);
          }

        } else if(sendCurrency === "usdti"){
          if(sendAmount<=USDTbalance){
            await sendToken(USDTaddress, account, sendToAddress, sendAmount,memo);
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

  const carouselList = t.rotaryPlantingMap[config.lang];
  const icons = [
    {icon:'photo_library',text: t.dashboards.backUp[config.lang]},
    {icon:'email',text: t.dashboards.message[config.lang]},
    {icon:'import_contacts',text: t.dashboards.manual[config.lang]},
  ];

  const [pw, setPw] = React.useState("");
  const onPw = event => {
    setPw(event.target.value);
  };

  const [pw2, setPw2] = React.useState("");
  const onPw2 = event => {
    setPw2(event.target.value);
  };

  const onSumbit = () => {
    try {
      const values = cookies['username'].trim().split(' ');
      if (values.length !== 2) {
        throw new Error('invalid phone formatting');
      }

      const regionCode = values[0].replace('+', '');
      const phone = values[1];
      if (regionCode === '' || phone === '') {
        throw new Error('invalid phone number');
      }
      console.log(cookies['username']);
      if(pw==pw2){
        createUSDTWallet(regionCode, phone,cookies['token'],account.privateKey, account.address, pw);
        alert('成功! 請使用密碼重新登入')
        handleLogout();
      }else{
        alert('密碼必須一樣')
        setTimeout(()=>{setOpenSetPw(true)});
      }

    } catch (e) {
      console.error(e);
      alert('無法更新密碼, 請聯繫客服');
    }
  };

  return (

    <React.Fragment>
      <div className="dashboard">
        <CssBaseline />

        <Paper className='maxWidth'>
          {/* <Grid className='wheelPlanting'>
            <ul className='wheelPlantingUl'>
              <li className='wheelPlantingLi'><img className='wheelPlanting' src={Config.imgPath + "2019/06/26/5d12c2c615e6567583.png"} /></li>
              <li className='wheelPlantingLi'><img className='wheelPlanting' src={Config.imgPath + "2019/06/26/5d12c2c5cf98e50653.png"} /></li>
              <li className='wheelPlantingLi'><img className='wheelPlanting' src={Config.imgPath + "2019/06/26/5d12c2c61668934580.png"} /></li>
            </ul>
          </Grid> */}

          {/* 轮播图（Ant Mobile插件） */}
          <WingBlank className='wheelPlanting'>
            <Carousel
              className='wheelPlantingUl'
              autoplay={false}
              autoplay
              infinite
            >
              {carouselList.map(val => (
                <a
                  key={val}
                  style={{ display: 'inline-block', width: '100%', height: 'auto' }}
                >
                  <img
                    className='wheelPlanting'
                    src={Config.imgPath  + val}
                    alt=""
                    style={{ width: '100%', verticalAlign: 'top' }}
                    onLoad={() => {
                      // fire window resize event to change height
                      window.dispatchEvent(new Event('resize'));
                    }}
                  />
                </a>
              ))}
            </Carousel>
          </WingBlank>

          <Grid className='header'>
            <Grid className='top' spacing={0} container justify="center">
              <Grid item xs={4}>
                <Grid className='title'>PFA/USDT</Grid>
                <Grid className='sum'>1.500</Grid>
                <Grid className='gain red'>+0.001%</Grid>
              </Grid>
              <Grid item xs={4} className='center'>
                <Grid className='title'>HAD/USDT</Grid>
                <Grid className='sum'>1.000</Grid>
                <Grid className='gain green'>+0.001%</Grid>
              </Grid>
              <Grid item xs={4}>
                <Grid className='title'>BTC/USDT</Grid>
                <Grid className={'sum '+prices.data.BTC.quote.USD.percent_change_24h>0?"green":"red"}>{Number(prices.data.BTC.quote.USD.price).toFixed(3)}</Grid>
                <Grid className={`gain `+prices.data.BTC.quote.USD.percent_change_24h>0?"green":"red"}>{Number(prices.data.BTC.quote.USD.percent_change_24h).toFixed(2)}%</Grid>
              </Grid>
            </Grid>
            <Divider component="li" className='line' />
            <Grid className='msg'>
              <Icon className='msgIcon'>volume_up</Icon>
              <Grid>{t.dashboards.hadOnline[config.lang]}</Grid>
            </Grid>
          </Grid>
          <Grid className='link' spacing={0} container justify="center">
            {icons.map(item =>
              <Grid item xs={2} onClick={() => {
                switch(item.icon){
                  case "photo_library":
                    handleModalOpen();
                    break;
                  case "import_contacts":
                    handletosModalOpen(t.usemethodfull[config.lang], t.usemethod[config.lang]);
                    break;
                  case "add_circle" :
                    setOpenChooser(true);
                    break;
                  case "monetization_on":
                    handleSendModalOpen();
                    break;
                  case "email":
                    handletosModalOpen(t.pfaMessagefull[config.lang], t.pfaMessage[config.lang])
                }


              }
                } className='linkItem'>
                {/* <img className = 'linkImg' src = "https://i.loli.net/2019/06/27/5d14349d36ae610536.png"/> */}
                <Icon className='linkImg'>{item.icon}</Icon>
                <Grid>{item.text}</Grid>
              </Grid>
            )}
          </Grid>
          {/* <Grid className='Ranking'>
            <Icon className='RankingIcon'>insert_chart</Icon>
            <Grid className='RankingTitle'>BTC市场24小时成交量排行</Grid>
            <ChevronRight className='right' />
          </Grid> */}
          <Grid spacing={0} container justify="center" className='listHeader'>
            <Grid item xs={4} className='listLeft'>{t.dashboards.market[config.lang]}</Grid>
            <Grid item xs={4} className='listLeft'>{t.dashboards.price[config.lang]}</Grid>
            <Grid item xs={4} className='listRight'>{t.dashboards.volume[config.lang]}</Grid>
          </Grid>
          <Grid>
            {list.map((item, index) => (
              <div className={index + 1 === list.length ? '' : 'borderLine'}>
                <Grid spacing={0} container  justify="center" className='list'>
                  <Grid xs={4} >{item.key}<span className="btc"> / USDT</span></Grid>
                  <Grid xs={4} className={item.color}>{item.price}</Grid>
                  <Grid xs={4} className='three'>{`${item.qty}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</Grid>
                </Grid>
              </div>
            ))}
          </Grid>
          <Grid className="pageFoot"/>
        </Paper>


        <Modal open={modalOpen} onBackdropClick={handleModalClose}>
          <div className={classes.modalPaper + " modalWidth"}>
            <div className={classes.toolbarIcon}>
              <Typography variant={"h5"} style={{ }}>{t.dashboards.backUp[config.lang]}</Typography>
              <IconButton className={classes.close} onClick={handleModalClose}>
                <CloseIcon />
              </IconButton>
            </div>
            <div className="backupBottom" id={"copiable"}>
              <ExpansionPanel>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className={classes.heading}>{t.dashboards.single[config.lang]}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>

                  <Grid item>
                    <Typography style={{ textAlign:'justify', fontSize: 14 }}>
                      {t.dashboards.singlefull[config.lang]}
                    </Typography>
                    <FormControlLabel
                      control={
                        <Switch checked={seePrivateKey} onChange={e => setSeePrivateKey(e.target.checked)} />
                      }
                      label={t.dashboards.showPrivateKey[config.lang]}
                    />
                    <Grid item>
                      <Paper>
                        <TextField
                          label={t.privateKey[Config.lang]}
                          className={classes.textField}
                          value={account.privateKey.substr(2)}
                          readOnly={false}
                          contentEditable={true}
                          style={{ visibility: seePrivateKey ? 'visible' : 'hidden',width: '85%', fontSize: 14 }}
                          disabled
                          variant="outlined"
                        />
                        <CopyButton
                          className="CopyButtonStyle CopyBtnStyle"
                          onClick={handleCopiedSnackbarForPrivOpen}
                          text={account.privateKey.substr(2)}
                        >
                          {t.copy[Config.lang]}
                        </CopyButton>
                      </Paper>

                    </Grid>
                  </Grid>
                </ExpansionPanelDetails>
              </ExpansionPanel>
              <ExpansionPanel>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2a-content"
                  id="panel2a-header"
                >
                  <Typography className={classes.heading}>{t.dashboards.entire[config.lang]}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>

                  <Grid item style={{ width: '100%' }}>
                    <Typography style={{ textAlign:'justify', fontSize: 14 }}>
                      {t.dashboards.entirefull[config.lang]}
                    </Typography>
                    <Paper style={{ marginTop: 15 }}>
                      <TextField
                        style={{ width: '85%', fontSize: 14 }}
                        disabled
                        variant={"outlined"}
                        value={exportAccounts()}
                        multiline
                        rowsMax={4}
                        readOnly={false}
                        contentEditable={true}
                        label={t.copyHere[Config.lang]}
                      />
                      <CopyButton
                        className="CopyButtonStyle CopyBtnStyleTwo"
                        onClick={handleCopiedSnackbarExportOpen}
                        text={exportAccounts()}
                      >
                        {t.copy[Config.lang]}
                      </CopyButton>
                    </Paper>

                  </Grid>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            </div>
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
              style={{ height: "calc(100% - 70px)",overflow: 'auto', width: '100%', margin: 0 }}
            >
              <Grid item className={classes.extractRow}>
                <TextField
                  label={t.from[Config.lang]}
                  value={`${account.address}`}
                  disabled
                  style={{ width: "280px" }}
                />
              </Grid>
              <Grid item className={classes.extractRow}>
                <TextField
                  label={t.to[Config.lang]}
                  value={sendToAddress}
                  onChange={handleSendToAddressChange}
                  style={{ width: "280px" }}
                />
              </Grid>
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
                <FormControl style={{ width: "280px" }}>
                  <InputLabel>{t.asset[Config.lang]}</InputLabel>
                  <Select
                    value={sendCurrency}
                    onChange={event => {
                      setSendCurrency(event.target.value);
                    }}
                  >
                    <MenuItem value="ihad">{t.ihad[Config.lang]}</MenuItem>
                    <MenuItem value="pfa">{t.pfa[Config.lang]}</MenuItem>
                    <MenuItem value="usdt">{t.usdt[Config.lang]}</MenuItem>
                    <MenuItem value="usdti">{t.usdti[Config.lang]}</MenuItem>
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
                    style={{ letterSpacing: "1px" }}
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
                  此為以太坊 ERC-20 USDT 地址，請勿將 PFA 資產轉賬至此地址
                </Typography>
                <Paper style={{border:"8px solid white",height:"106px",width:"106px"}}>
                  <QRCode value={`pfa:${account.USDTWallet}`} style={{ height: "90px", width: "90px" }} renderAs={"svg"} />
                </Paper><br />
                <span className="lineFeed">{account.USDTWallet}</span><br /><br />
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
        <Modal open={tosModalOpen} onBackdropClick={handletosModalClose}>
          <div className={classes.modalPaper + " modalWidth"}>
            <Grid container direction={"column"}>
              <Grid item>
                <div className={classes.toolbarIcon}>
                  <Typography variant={"h5"} style={{ }}>{`${modalTitle}`}</Typography>
                  <IconButton className={classes.close} onClick={handletosModalClose}>
                    <CloseIcon />
                  </IconButton>
                </div>
              </Grid>
              <Grid item style={{ overflow: "scroll", maxHeight: "400px" }}>
                <Typography variant={"p"} style={{ }}>{`${longText}`}</Typography>

              </Grid>
            </Grid>
          </div>
        </Modal>
        <Modal open={tosModalOpen} style={{ height: "100%" }} onBackdropClick={handletosModalClose}>
          <div className={classes.modalPaper + " modalWidth"}>
            <Grid style={{ height: "100%" }} container direction={"column"}>
              <Grid item style={{ maxHeight: "14%", width: "100%" }}>
                <div className={classes.toolbarIcon}>
                  <Typography variant={"h5"} style={{}}>{`${modalTitle}`}</Typography>
                  <IconButton className={classes.close} onClick={handletosModalClose}>
                    <CloseIcon />
                  </IconButton>
                </div>
              </Grid>
              <Grid item style={{ overflow: "auto", maxHeight: "84%", width: "100%", padding: "6px" }}>
                <Typography variant={"p"} style={{ textAlign: "justify", width: "100%", wordBreak: "break-all" }} dangerouslySetInnerHTML={{ __html: longText }} />

              </Grid>
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
          message={"收到 " + depositAmount + " USDT。你可以繼續充值。"}
        />
      </div>
      <Snackbar
        open={copiedSnackbarOpen}
        autoHideDuration={6000}
        onClose={handleCopiedSnackbarClose}
        message={t.copied[Config.lang]}
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

      <Dialog open={openSetPw} onClose={handleSetPwClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">設定密碼</DialogTitle>
        <DialogContent>
          <DialogContentText>
            設定密碼後, 你可以使用密碼登入
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="密碼"
            type="password"
            fullWidth
            onChange={onPw}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="確認密碼"
            type="password"
            fullWidth
            onChange={onPw2}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSetPwClose} color="primary">
            取消
          </Button>
          <Button onClick={()=>{
            onSumbit();
            handleSetPwClose()}} color="primary">
            設定
          </Button>
        </DialogActions>
      </Dialog>

    </React.Fragment>
  );
}



export default withRouter(Dashboard);
