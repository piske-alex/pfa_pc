import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
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
import {
  etherBalance,
  getHistory,
  readAccountList,
  sendEther,
  web3js,
  ihadAddress,
  tokenBalance,
  sendToken, USDTaddress, listenUSDTdeposit, sendUSDT
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
import "./myWallet.css";
import Config from "../../public/js/config";

const lang = "ch";

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
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 2px",
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
    position: "absolute",
    width: 360,
    height: 500,
    top: "calc(50% - 500px / 2)",
    left: "calc(50% - 360px / 2)",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(1),
    outline: "none",
  },
}));

function Dashboard({
  account,
  history,
  currentUsername,
  handleLogout,
  handleChangeAccount,

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

  const [modalOpen, setModalOpen] = React.useState(false);
  const [longText, setLongText] = React.useState("undefinede");
  const [modalTitle, setModalTitle] = React.useState("undefinede");
  const handleModalOpen = () => {
    setModalOpen(true);
  };
  const handleModalClose = () => {
    setModalOpen(false);
  };

  const [sendModalOpen, setSendModalOpen] = React.useState(false);
  const handleSendModalOpen = () => {
    setSendModalOpen(true);
  };

  const handleSendAsset = () => {
    setTransactionCount(transactionCount + 1);
    const sendAsset = async () => {
      try {
        if (sendCurrency === "pfa") {
          await sendEther(account, sendToAddress, sendAmount);
        } else if (sendCurrency === "ihad") {
          await sendToken(ihadAddress, account, sendToAddress, sendAmount);
        } else if(sendCurrency === "usdt"){
          await sendToken("0xfbd0f2a657633c15637c6c21d45d1d5f78860e27", account, sendToAddress, sendAmount);
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

  const [accHistory, setAccHistory] = React.useState([]);

  const [sendCurrency, setSendCurrency] = React.useState("pfa");

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

  return (
    <React.Fragment>
      <CssBaseline />
      <Grid style={{ maxWidth: "1100px", margin: "0 auto", backgroundColor: "#212733!important", height: "auto" }}>
        <main className={classes.content}>
          <Grid className="backgrad">
            <Grid className={classes.head} >
              {t.title[lang]}
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
                      {t.valuation[lang]}
                      {/* <IconButton onClick={handleClickShowPassword} className="iconBtn">
                        {values.showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton> */}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item>
                <HorizontalCenter>
                  <Grid className="usdtVulesClass">
                    {pfaBalance*6+ihadBalance *6+USDTbalance}
                  </Grid>
                  <Grid className="usdtVulesClassCode">
                    {t.UsdtCode[lang]}
                  </Grid>
                </HorizontalCenter>
              </Grid>

              {/*<Grid item>
                <HorizontalCenter>
                  <Typography className={classes.container1}>
                    {t.conversion[lang]}
                  </Typography>
                </HorizontalCenter>
              </Grid>*/}


              <Grid item style={{ height: "10px" }} />
              <Grid item>
                <Grid
                  container
                  direction="row"
                  alignItems="center"
                  justify="center"
                >
                  <Grid item>
                    <Button
                      variant="outlined"
                      onClick={handleBuyModalOpen}
                      style={{ width: "120px", color: '#C0C0C0' }}
                    >
                      <img src={'/after.png'} className="donateClass" />
                      <Grid className="rechargeClass">
                        {t.Recharge[lang]}
                      </Grid>
                    </Button>
                  </Grid>
                  {/* <Grid item xs={1} /> */}
                  <Grid item>
                    <Button
                      variant="outlined"
                      onClick={setSendModalOpen}
                      style={{ width: "120px", color: '#C0C0C0' }}
                    >
                      <img src='https://i.loli.net/2019/06/28/5d15641e8e59187387.png' className="donateClass" />
                      <Grid className="rechargeClass">
                        {t.withdrawal[lang]}
                      </Grid>
                    </Button>
                  </Grid>
                </Grid>
              </Grid>

              <Grid style={{ height: '10px', width: '100%', background: 'black', marginTop: '30px' }} />

              <Grid>
                <Typography variant={"body2"} style={{ marginTop: "10px", color: "#FFB601", height: '6px' }} className="paddingle">
                  <Icon className='msgIcon'>assessment</Icon>
                  <Grid className='msgIconText'>
                    {t.assets[lang]}
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
                        {pfaBalance}
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
                        {USDTbalance}
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
                        {ihadBalance}
                      </Grid>
                      {/* </Grid> */}
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </main>
        <Grid className="pageFoot" />
      </Grid>

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
                }的 USDT 傳入以下地址：`}</Typography><QRCode value={`${account.USDTWallet}`} style={{ height: "50px", width: "50px" }} renderAs={"svg"} /><br /><span>{account.USDTWallet}</span><br /><br />
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
                  <MenuItem value="ihad">IHAD</MenuItem>
                  <MenuItem value="usdt">USDT</MenuItem>
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


      <Snackbar
        open={transactionFinishedSnackbarOpen}
        autoHideDuration={6000}
        onClose={handleTransactionFinishedSnackbarClose}
        message={t.transactionFinishedInfo[lang]}
      />
      <Snackbar
        open={transactionFailedSnackbarOpen}
        autoHideDuration={6000}
        onClose={handleTransactionFailedSnackbarClose}
        message={t.transactionFailedWarning[lang]}
      />
      <Snackbar
        open={depositfinishedSnackbarOpen}
        autoHideDuration={6000}
        onClose={handleDepositfinishedSnackbarClose}
        message={"收到 " + depositAmount + " USDT。你可以繼續充值。"}
      />
    </React.Fragment>
  );
}

export default withRouter(Dashboard);