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

// import LogoutIcon from "@material-ui/icons/ExitToApp";
// import ListItemIcon from "@material-ui/core/ListItemIcon";
// import ReceiveIcon from "@material-ui/icons/CallReceived";
// import SendIcon from "@material-ui/icons/CallMade";
// import Moment from "react-moment";
// import { ArrowDownwardSharp, ArrowUpwardSharp } from "@material-ui/icons";
// import Drawer from "@material-ui/core/Drawer";
// import AppBar from "@material-ui/core/AppBar";
// import Toolbar from "@material-ui/core/Toolbar";
// import Container from "@material-ui/core/Container";
// import MenuIcon from "@material-ui/icons/Menu";
// import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
// import MoreIcon from "@material-ui/icons/MoreHoriz";

import {
  etherBalance,
  getHistory,
  readAccountList,
  sendEther,
  ihadAddress,
  tokenBalance,
  sendToken, USDTaddress, listenUSDTdeposit, exportAccounts, sendUSDT
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

    width: "94%",
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
  }
}));

function Dashboard({
  account,
  history,
  currentUsername,
  handleLogout,
  handleChangeAccount,

}) {
  const logoUrl = getLogoUrl();
  const [cookies, setCookie] = useCookies(['pfa']);
  let something = ""
  console.log(account);
  if (account == null || isEmpty(account)) {
    account = cookies.acctobj;
    console.log(cookies.acctobj + "jj");
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
    alert('未能識別二維碼');
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

  const handleCopiedSnackbarOpen =()=> {
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
  const [list,setList] = React.useState([{ key: "PFA", price: 1.000, qty: (Math.random()*800+8000).toFixed(2), color: '' },
    { key: "HAD", price: 1.500, qty: (Math.random()*800+6000).toFixed(2), color: 'green' },
    { key: "BTC", price: 0, qty: 0, color: 'red' },
    { key: "XRP", price: 0, qty: 0, color: 'green' },
    { key: "ETH", price: 0, qty: 0, color: 'red' },])

  const [accHistory, setAccHistory] = React.useState([]);

  const [sendCurrency, setSendCurrency] = React.useState("pfa");

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

  React.useEffect(() => {
    const fetchPrice = async () => {
      try {
        const h = await fetch("https://rtprice.rubbity.io/");
        let price = await h.json();
        console.log(price)
        setPrices(price);
        setList([{ key: "PFA", price: 1.00005, qty: (Math.random()*800+8000).toFixed(2), color: 'green' },
          { key: "HAD", price: 1.500031, qty: (Math.random()*800+6000).toFixed(2), color: 'green' },
          { key: "BTC", price: (price.data.BTC.quote.USD.price).toFixed(3), qty: (price.data.BTC.quote.USD.volume_24h).toFixed(2), color: price.data.BTC.quote.USD.percent_change_24h>0?"green":"red" },
          { key: "XRP", price: (price.data.XRP.quote.USD.price).toFixed(3), qty: (price.data.XRP.quote.USD.volume_24h).toFixed(2), color: price.data.XRP.quote.USD.percent_change_24h>0?"green":"red" },
          { key: "ETH", price: (price.data.ETH.quote.USD.price).toFixed(3), qty: (price.data.ETH.quote.USD.volume_24h).toFixed(2), color: price.data.ETH.quote.USD.percent_change_24h>0?"green":"red" },]);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPrice();
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
            alert('未能識別二維碼')
          }else{
            setSendToAddress(qrDecoded.data);
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
        setTransactionFailedSnackbarOpen(true);
      }
    };
    sendAsset();
  };



  const carouselList = [ '2019/06/26/5d12c2c5cf98e50653' + ".png", '2019/06/26/5d12c2c61668934580' + ".png",'2019/07/03/5d1c3296bd17e13109' + ".jpeg"];
  const icons = [
    {icon:'photo_library',text:'備份'},
    {icon:'email',text:'消息'},
    {icon:'import_contacts',text:'說明'},
    {icon:'add_circle',text:'充值'},
    {icon:'monetization_on',text:'提取'},
  ];
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
                <Grid className='sum'>1.000</Grid>
                <Grid className='gain red'>+0.001%</Grid>
              </Grid>
              <Grid item xs={4} className='center'>
                <Grid className='title'>HAD/USDT</Grid>
                <Grid className='sum'>1.500</Grid>
                <Grid className='gain green'>+0.001%</Grid>
              </Grid>
              <Grid item xs={4}>
                <Grid className='title'>BTC/USDT</Grid>
                <Grid className={'sum '+prices.data.BTC.quote.USD.percent_change_24h>0?"green":"red"}>{(prices.data.BTC.quote.USD.price).toFixed(3)}</Grid>
                <Grid className={`gain `+prices.data.BTC.quote.USD.percent_change_24h>0?"green":"red"}>{(prices.data.BTC.quote.USD.percent_change_24h).toFixed(2)}%</Grid>
              </Grid>
            </Grid>
            <Divider component="li" className='line' />
            <Grid className='msg'>
              <Icon className='msgIcon'>volume_up</Icon>
              <Grid>HAD上線</Grid>
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
                    handletosModalOpen(t.usemethodfull.ch, t.usemethod.ch);
                    break;
                  case "add_circle" :
                    handleBuyModalOpen();
                    break;
                  case "monetization_on":
                    handleSendModalOpen();
                    break;
                  case "email":
                    handletosModalOpen("普惠資產已完成主網升級，應用了摩根大通的GoQuorum，沿用ERC20制式，持舊PFA的用戶只要將私鑰導入即可在未來獲得鏈改後的PFA","PFA消息")
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
            <Grid item xs={4} className='listLeft'>市場</Grid>
            <Grid item xs={4} className='listLeft'>最新價</Grid>
            <Grid item xs={4} className='listRight'>成交量(USDT)</Grid>
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
          <div className={classes.modalPaper}>
            <div className={classes.toolbarIcon}>
              <Typography variant={"h5"} style={{ marginRight: "150px" }}>{`備份`}</Typography>
              <IconButton onClick={handleModalClose}>
                <CloseIcon />
              </IconButton>
            </div>

              <ExpansionPanel>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className={classes.heading}>單一錢包備份</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>

                  <Grid item>
                    <Typography>
                      您備份的是這個錢包，當你注冊錢包時可以導入這個錢包帳戶，亦和以太坊HEX制式互聯互通，唯一不同的是這個PFA錢包只適用PFA公有區塊鏈上的通證，若你將以太坊區塊鏈的通證發到你這個錢包，請導出私鑰到以太坊公有鏈錢包，便可找回你的代幣。
                    </Typography>
                    <FormControlLabel
                      control={
                        <Switch checked={seePrivateKey} onChange={e => setSeePrivateKey(e.target.checked)} />
                      }
                      label="顯示密鑰"
                    />
                    <Grid item>
                      <Paper>
                        <TextField
                          label={t.privateKey[Config.lang]}
                          className={classes.textField}
                          value={account.privateKey.substr(2)}
                          style={{ visibility: seePrivateKey ? 'visible' : 'hidden' }}
                          disabled
                          variant="outlined"
                        />
                        <CopyButton onClick={handleCopiedSnackbarOpen} text={account.privateKey.substr(2)}>複製</CopyButton>
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
                  <Typography className={classes.heading}>整個錢包備份</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>

                  <Grid item>
                    <Typography>
                      將你所有錢包備份一次，這包括了本程式上的所有錢包帳戶。請在登入頁面「導入PFA錢包使用」。
                    </Typography>
                    <Paper>
                      <TextField
                        style={{ width: 300 }}
                        disabled
                        variant={"outlined"}
                        value={exportAccounts()}
                        multiline
                        rowsMax={4}
                        label={t.copyHere[Config.lang]}
                      />
                      <CopyButton onClick={handleCopiedSnackbarOpen} text={exportAccounts()}>複製</CopyButton>
                    </Paper>

                  </Grid>
                </ExpansionPanelDetails>
              </ExpansionPanel>





          </div>
        </Modal>
        <Modal open={sendModalOpen} onBackdropClick={handleSendModalClose}>
          <div className={classes.modalPaper}>
            <div className={classes.toolbarIcon}>
              <Typography variant={"h5"} style={{ marginRight: "150px" }}>{`提取`}</Typography>
              <IconButton onClick={handleSendModalClose}>
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
              <Grid item>
                <TextField
                  label={t.from[Config.lang]}
                  value={`${currentUsername} ${account.address}`}
                  disabled
                  style={{ width: "280px" }}
                />
              </Grid>
              <Grid item>
                <TextField
                  label={t.to[Config.lang]}
                  value={sendToAddress}
                  onChange={handleSendToAddressChange}
                  style={{ width: "280px" }}
                />
                <div className="upload-btn-wrapper" style={{
                  position: "relative",
                  overflow: "hidden",
                  display: "inline-block",
                }}>
                  <button className="btn" style={{
                    border: "2px solid gray",
                    color: "gray",
                    backgroundColor: "white",
                    padding: "8px 20px",
                    borderRadius: "8px",
                    fontSize: "20px",
                    fontWeight: "bold",
                  }}>上傳二維碼</button>
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
                  <button className="btn" style={{
                    border: "2px solid gray",
                    color: "gray",
                    backgroundColor: "white",
                    padding: "8px 20px",
                    borderRadius: "8px",
                    fontSize: "20px",
                    fontWeight: "bold",
                  }} onClick={handleScanModalOpen}>識別二維碼</button>

                </div>
              </Grid>
              <Grid item>
                <FormControl style={{ width: "280px" }}>
                  <InputLabel>{t.asset[Config.lang]}</InputLabel>
                  <Select
                    value={sendCurrency}
                    onChange={event => {
                      setSendCurrency(event.target.value);
                    }}
                  >
                    <MenuItem value="pfa">PFA</MenuItem>
                    <MenuItem value="ihad">HAD</MenuItem>
                    <MenuItem value="usdt">USDT（需要支付 1 USDT 外部網路費）</MenuItem>
                    <MenuItem value="usdti">USDT（PFA 網路內轉帳）</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item>
                <TextField
                  label={t.amount[Config.lang]}
                  helperText={t.transactionDelayInfo[Config.lang]}
                  value={sendAmount}
                  onChange={handleSendAmountChange}
                  style={{ width: "280px" }}
                />
              </Grid>
              <Grid item>
                <TextField
                  label={`備註`}
                  helperText={`備註`}
                  value={memo}
                  onChange={handleMemoChange}
                  style={{ width: "280px" }}
                />

              </Grid>
              <Grid item>
                <FormControl style={{ width: "280px" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSendAsset}
                  >
                    {t.send[Config.lang]}
                  </Button>
                </FormControl>
              </Grid>
            </Grid>
          </div>
        </Modal>

        <Modal open={buyModalOpen} onBackdropClick={handleBuyModalClose}>
          <div className={classes.modalPaper}>
            <Grid container direction={"column"}>
              <Grid item>
                <div className={classes.toolbarIcon}>
                  <Typography variant={"h5"} style={{ marginRight: "150px" }}>{`${
                    t.buy[Config.lang]
                    } USDT`}</Typography>
                  <IconButton onClick={handleBuyModalClose}>
                    <CloseIcon />
                  </IconButton>
                </div>
              </Grid>
              <Grid item style={{ overflow: "auto", height: "400px" }}>
                <Typography variant={"p"}>{`請把外部${
                  t.buy[Config.lang]
                  }的 USDT 傳入以下地址：`}</Typography><Paper style={{border:"8px solid white ",height:"106px",width:"106px"}}><QRCode value={`pfa:${account.USDTWallet}`} style={{ height: "90px", width: "90px" }} renderAs={"svg"} /></Paper><br /><span>{account.USDTWallet}</span><br /><br />
                <LinearProgress variant="query" /><br />
                <Typography variant={"p"} style={{ marginRight: "150px" }}>{`完成充值前請勿關閉此頁面。完成充值後你會收到通知。`}</Typography>
                <List >
                  {usdtProvider.map(p => (
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
                  ))}
                </List>

              </Grid>
            </Grid>
          </div>
        </Modal>
        <Modal open={tosModalOpen} onBackdropClick={handletosModalClose}>
          <div className={classes.modalPaper}>
            <Grid container direction={"column"}>
              <Grid item>
                <div className={classes.toolbarIcon}>
                  <Typography variant={"h5"} style={{ marginRight: "150px" }}>{`${modalTitle}`}</Typography>
                  <IconButton onClick={handletosModalClose}>
                    <CloseIcon />
                  </IconButton>
                </div>
              </Grid>
              <Grid item style={{ overflow: "scroll", maxHeight: "400px" }}>
                <Typography variant={"p"} style={{ marginRight: "150px" }}>{`${longText}`}</Typography>

              </Grid>
            </Grid>
          </div>
        </Modal>
        <Modal open={tosModalOpen} style={{ height: "100%" }} onBackdropClick={handletosModalClose}>
          <div className={classes.modalPaper}>
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
                <Typography variant={"p"} style={{ marginRight: "150px", textAlign: "justify", width: "100%", wordBreak: "break-all" }} dangerouslySetInnerHTML={{ __html: longText }} />

              </Grid>
            </Grid>
          </div>
        </Modal>
        <Modal open={scanModalOpen} onBackdropClick={handleScanModalClose}>
          <div className={classes.modalPaper}>
            <div className={classes.toolbarIcon}>
              <Typography variant={"h5"} style={{ marginRight: "150px" }}>{`識別二維碼`}</Typography>
              <IconButton onClick={handleScanModalClose}>
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
        message={'已複製'}
      />
    </React.Fragment>
  );
}

export default withRouter(Dashboard);

// {/* <AppBar
//         position="absolute"
//         className={clsx(
//           classes.appBar /*, drawerOpen && classes.appBarShift */,
//         )}
//       >
//         <Toolbar className={classes.toolbar}>
//           <IconButton
//             edge="start"
//             color="inherit"
//             aria-label="Open drawer"
//             onClick={handleDrawerOpen}
//             className={clsx(
//               classes.menuButton,
//               drawerOpen && classes.menuButtonHidden,
//             )}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography
//             component="h1"
//             variant="h6"
//             color="inherit"
//             noWrap
//             className={classes.title}
//           >
//             {accName}
//           </Typography>
//           <IconButton color={"inherit"} onClick={handleLogout} edge={"end"}>
//             <LogoutIcon />
//           </IconButton>
//           {/*<IconButton color="inherit" onClick={handleModalOpen} edge={"end"}>*/}
//           {/*  <MoreIcon />*/}
//           {/*</IconButton>*/}
//         </Toolbar>
//       </AppBar> */}

//       <Drawer
//         variant="temporary"
//         classes={{
//           paper: clsx(
//             classes.drawerPaper,
//             !drawerOpen && classes.drawerPaperClose,
//           ),
//         }}
//         open={drawerOpen}
//         onBackdropClick={handleDrawerClose}
//       >
//         <div className={classes.toolbarIcon}>
//           <IconButton onClick={handleDrawerClose}>
//             <ChevronLeftIcon />
//           </IconButton>
//         </div>
//         <Grid container spacing={2} direction="column">
//           <Grid item>
//             <Grid
//               container
//               spacing={0}
//               direction="row"
//               alignItems="center"
//               justify="center"
//             >
//               <Grid item>
//                 <Avatar style={{ width: 60, height: 60 }} src={logoUrl} />
//               </Grid>
//             </Grid>
//           </Grid>
//           <Grid item>
//             <Grid
//               container
//               spacing={0}
//               direction="row"
//               alignItems="center"
//               justify="center"
//             >
//               <Grid item>
//                 <Typography variant="h5">{accName}</Typography>
//               </Grid>
//             </Grid>
//           </Grid>
//           <Grid item>
//             <Grid
//               container
//               spacing={0}
//               direction="row"
//               alignItems="center"
//               justify="center"
//             >
//               <Grid item>
//                 <Button
//                   variant="contained"
//                   size="small"
//                   color="secondary"
//                   className={classes.margin}
//                   onClick={handleModalOpen}
//                   style={{ width: "150px" }}
//                 >
//                   {t.details[lang]}
//                 </Button>
//               </Grid>
//             </Grid>
//           </Grid>
//           <Grid item>
//             <List>
//               {/*{accountNames.map(name => (*/}
//               {/*  <ListItem*/}
//               {/*    onClick={() => handleChangeAccount(name.slice(5))}*/}
//               {/*    button*/}
//               {/*  >*/}
//               {/*    <ListItemAvatar>*/}
//               {/*      <Avatar src={logoUrl} />*/}
//               {/*    </ListItemAvatar>*/}
//               {/*    <ListItemText primary={name} />*/}
//               {/*  </ListItem>*/}
//               {/*))}*/}
//               {/*<ListItem>
//                 <ListItemAvatar>
//                   <Avatar src={logoUrl} />
//                 </ListItemAvatar>
//                 <ListItemText
//                   primary={<Typography variant={"h5"}>{pfaBalance}</Typography>}
//                 />
//               </ListItem>
//               <ListItem>
//                 <ListItemAvatar>
//                   <Avatar src={logoUrl} />
//                 </ListItemAvatar>
//                 <ListItemText
//                   primary={
//                     <Typography variant={"h5"}>{ihadBalance}</Typography>
//                   }
//                 />
//               </ListItem>*/}
//               <ListItem>
//                 {/*<ListItemAvatar>
//                   <Avatar src={logoUrl} />
//                 </ListItemAvatar>*/}
//                 <ListItemText
//                   primary={
//                     <Typography variant={"h5"}>{t.dashboard[lang]}</Typography>
//                   }
//                 />
//               </ListItem>
//               <ListItem
//                 onClick = {()=> history.push("/convert-page")}
//                 button>
//                 {/*<ListItemAvatar>
//                   <Avatar src={logoUrl} />
//                 </ListItemAvatar>*/}
//                 <ListItemText
//                   primary={
//                     <Typography variant={"h5"}>{t.convert[lang]}</Typography>
//                   }
//                 />
//               </ListItem>
//               <ListItem
//                 onClick = {()=> history.push("/history-page")}
//               button>
//                 {/*<ListItemAvatar>
//                   <Avatar src={logoUrl} />
//                 </ListItemAvatar>*/}
//                 <ListItemText
//                   primary={
//                     <Typography variant={"h5"}>{t.history[lang]}</Typography>
//                   }
//                 />
//               </ListItem>
//               <ListItem
//                 onClick =  {()=> handletosModalOpen(t.aboutusfull[lang],t.aboutus[lang])}
//                 button>
//                 {/*<ListItemAvatar>
//                   <Avatar src={logoUrl} />
//                 </ListItemAvatar>*/}
//                 <ListItemText
//                   primary={
//                     <Typography variant={"subtitle2"} >{t.aboutus[lang]}</Typography>
//                   }
//                 />
//               </ListItem>
//               <ListItem
//                 onClick = {()=> history.push("/history-page")}
//                 button

//                 >
//                 {/*<ListItemAvatar>
//                   <Avatar src={logoUrl} />
//                 </ListItemAvatar>*/}

//                 <ListItemText
//                   primary={
//                     <Typography variant={"subtitle2"} >{t.usemethod[lang]}</Typography>
//                   }
//                 />
//               </ListItem>
//               <ListItem
//                 onClick = {()=> handletosModalOpen(t.privacyfull[lang],t.privacy[lang])}
//                 button

//               >
//                 {/*<ListItemAvatar>
//                   <Avatar src={logoUrl} />
//                 </ListItemAvatar>*/}

//                 <ListItemText
//                   primary={
//                     <Typography variant={"subtitle2"} >{t.privacy[lang]}</Typography>
//                   }
//                 />
//               </ListItem>
//               <ListItem
//                 onClick = {()=> handletosModalOpen(t.tosfull[lang],t.tos[lang])}
//                 button

//               >
//                 {/*<ListItemAvatar>
//                   <Avatar src={logoUrl} />
//                 </ListItemAvatar>*/}

//                 <ListItemText
//                   primary={
//                     <Typography variant={"subtitle2"} >{t.tos[lang]}</Typography>
//                   }
//                 />
//               </ListItem>
//             </List>
//           </Grid>
//         </Grid>
//       </Drawer>

//       <main className={classes.content}>
//         <div className={classes.appBarSpacer} />
//         <Container maxWidth="lg" className={classes.container}>
//           <Grid container direction={"column"}>
//             <Grid item style={{ marginBottom: "10px" }}>
//               <Grid
//                 container
//                 spacing={0}
//                 direction="row"
//                 alignItems="center"
//                 justify="center"
//               >
//                 <Grid item>
//                   <Avatar style={{ width: 60, height: 60 }} src={logoUrl} />
//                 </Grid>
//               </Grid>
//             </Grid>
//             <Grid item>
//               <HorizontalCenter>
//                 <Select
//                   value={currencyDropdownValue}
//                   onChange={e => setCurrencyDropdownValue(e.target.value)}
//                   style={{ width: "300px" }}
//                   // MenuProps={{ style: { borderStyle: "none" } }}
//                   disableUnderline={true}
//                 >
//                   <MenuItem value={"pfa"}>
//                     <Typography variant={"h4"} align={"center"}>
//                       {pfaBalance}
//                     </Typography>
//                   </MenuItem>
//                   <MenuItem value={"ihad"}>
//                     <Typography variant={"h4"} align={"center"}>
//                       {ihadBalance}
//                     </Typography>
//                   </MenuItem>
//                   <MenuItem value={"usdt"}>
//                     <Typography variant={"h4"} align={"center"}>
//                       {USDTbalance}
//                     </Typography>
//                   </MenuItem>
//                 </Select>
//               </HorizontalCenter>
//             </Grid>
//             <Grid item style={{ height: "10px" }} />
//             <Grid item>
//               <Grid
//                 container
//                 direction="row"
//                 alignItems="center"
//                 justify="center"
//               >
//                 <Grid item>
//                   <Button
//                     variant="contained"
//                     color="primary"
//                     onClick={handleBuyModalOpen}
//                     style={{ width: "150px" }}
//                   >
//                     {`${t.buy[lang]} USDT`}
//                   </Button>
//                 </Grid>
//                 <Grid item xs={1} />
//                 <Grid item>
//                   <Button
//                     variant="contained"
//                     color="primary"
//                     onClick={setSendModalOpen}
//                     style={{ width: "150px" }}
//                   >
//                     {t.send[lang]}
//                   </Button>
//                 </Grid>
//               </Grid>
//             </Grid>
//             <Grid item style={{ maxHeight: "40vh", overflow: "auto" }}>
//               <Typography variant={"body2"} style={{ marginBottom: "5px" }}>
//                 {t.hangqing[lang]}
//               </Typography>
//               <Divider />

//                 <List>

//                       <ListItem alignItems="flex-start">

//                           <ListItemIcon>
//                             <ArrowUpwardSharp />
//                           </ListItemIcon>
//                         <ListItemIcon>
//                           <Avatar  src={logoUrl} />
//                         </ListItemIcon>
//                         <ListItemText
//                           primary={`PFA/USDT 6.02`}
//                           secondary={
//                             <React.Fragment>
//                               <Typography variant={"body2"}>
//                                 {`較昨日上升 2%`}
//                               </Typography>

//                             </React.Fragment>
//                           }
//                         />
//                       </ListItem>

//                   <ListItem alignItems="flex-start">

//                     <ListItemIcon>
//                       <ArrowDownwardSharp />
//                     </ListItemIcon>
//                     <ListItemIcon>
//                       <Avatar  src={'/hadloho.png'} />
//                     </ListItemIcon>

//                     <ListItemText
//                       primary={`HAD/USDT 6.1235`}
//                       secondary={
//                         <React.Fragment>
//                           <Typography variant={"body2"}>
//                             {`較昨日下跌 0.2%`}
//                           </Typography>

//                         </React.Fragment>
//                       }
//                     />
//                   </ListItem>

//                 </List>

//             </Grid>
//           </Grid>
//         </Container>
//       </main>
