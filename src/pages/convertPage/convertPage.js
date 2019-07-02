import React from "react";
import clsx from "clsx";
import { fade, withStyles, makeStyles } from "@material-ui/core/styles";
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
  sendToken,
  USDTToIHAD, IHADToUSDT
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
import InputBase from '@material-ui/core/InputBase';
import Config from "../../public/js/config";
import './convertPage.css';

const lang = "ch";

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
  // appBarSpacer: {
  //   minHeight:50,
  // },
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

  /**mobile start*/
  topMarginHeight: {
    minHeight:"8vh",
  },
  fLeft:{
    float:'left',
    margin:"0 8px",
  },
  fRight:{
    float:'right'
  },
  bottombuttonStyle:{
    width:"100%",
    backgroundColor:"#13161b!important",
    color:"#FFB601!important",
    border:"1px solid #BEB689!important"
  },
  inputSize:{
    width:120,
    marginTop:2,
    float: "right",
  },
  itemHeight:{
    height:50,
    marginTop:10,
  },
  selectZiFontSize:{
    width: 50,
    fontSize:16,
    lineHeight: 0.8,
    textAlign: "left",
  },
  selectPadRight:{
    paddingRight:0,
  },
  bottomButtonMargin:{
    height: 40,
    marginTop:30,
  },
  linkImgLeft:{
    width:35,
    height:35,
    float:'left',
    borderRadius:50,
  },
  linkImgContrary:{
    width:30,
    height:30,
  },
  notesFontSize:{
    fontSize: 12,
    lineHeight: "12px",
    fontFamily: "FZZhongDengXian-Z07S",
  },
  /**mobile end*/
  /**iPad start*/
  topMarginHeightIPad: {
    minHeight:110,
  },
  itemHeightIpad:{
    height:50,
    marginTop:30,
  },
  inputSizeIpad:{
    width:160,
    marginTop:3,
    float: "right",
  },
  linkImgContraryIpad:{
    width:30,
    height:30,
  },
  bottomButtonMarginIpad:{
    height: 40,
    marginTop:60,
  },
  /**iPad end*/
  /**PC start*/
  
  /**PC end*/
  


}));

const BootstrapInput = withStyles(theme => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    position: 'relative',
    // width: '50px',
    borderRadius: 5,
    backgroundColor: '#222834',
    border: '1px solid #19242A',
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


function ConvertPage({
                       account,
                       history,
                       currentUsername,
                       handleLogout,
                       handleChangeAccount,
                     }) {
  const logoUrl = getLogoUrl();
  const [cookies, setCookie] = useCookies(['pfa']);
  let something = ""
  if (isEmpty(account)) {
    account = cookies.acctobj;
    console.log(cookies.acctobj+"jj");
    isEmpty(account)?history.push("/login-account"):something = "continue";
  }
  let accName = currentUsername;
  isEmpty(accName)? accName = cookies.username :accName = "error";
  const accAddr = account.address;
  const classes = useStyles();

  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };
  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const [modalOpen, setModalOpen] = React.useState(false);
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
  const handleSendModalClose = () => {
    setSendModalOpen(false);
  };

  const [buyModalOpen, setBuyModalOpen] = React.useState(false);
  const convertUSDTtoIHAD = () => {
    const sendAsset = async () => {
      try {
        let cdv = leftcurrencyDropdownValue + "TO" + rightcurrencyDropdownValue;
        if (cdv === "usdtTOihad") {
          await USDTToIHAD(account,tempBase,)
        } else if (cdv === "ihadTOusdt"){
          await IHADToUSDT(account,tempBase)
        } else {
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
  const handleBuyModalClose = () => {
    setBuyModalOpen(false);
  };

  const [sendToAddress, setSendToAddress] = React.useState("");
  const handleSendToAddressChange = event => {
    setSendToAddress(event.target.value);
  };
  const [longText, setLongText] = React.useState("undefinede");
  const [modalTitle, setModalTitle] = React.useState("undefinede");const [sendAmount, setSendAmount] = React.useState("");
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

  const rates = {
    usdt:{
      ihad:1/1.5
    },
    ihad:{
      usdt:1.5
    }
  };

  const [transactionCount, setTransactionCount] = React.useState(0);

  const [pfaBalance, setPfaBalance] = React.useState("");

  const [ihadBalance, setIhadBalance] = React.useState("");
  const [USDTBalance, setUSDTBalance] = React.useState("");

  const [accHistory, setAccHistory] = React.useState([]);

  const [sendCurrency, setSendCurrency] = React.useState("pfa");

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const [currencyDropdownValue, setCurrencyDropdownValue] = React.useState(
    "usdtTOihad",
  );

  const [leftcurrencyDropdownValue, setleftCurrencyDropdownValue] = React.useState(
    "usdt",
  );

  const [rightcurrencyDropdownValue, setrightCurrencyDropdownValue] = React.useState(
    "ihad",
  );

  const [tempBase, setTempBase] = React.useState(
    "0",
  );

  const [tosModalOpen, settosModalOpen] = React.useState(false);
  const handletosModalOpen = (x,y) => {
    setLongText(x);
    setModalTitle(y)
    settosModalOpen(true);
  };
  const handletosModalClose = () => {
    settosModalOpen(false);
  };

  React.useEffect(() => {
    const fetchBalance = async () => {
      try {
        setPfaBalance(`${await etherBalance(account)} PFA`);
        const tkBal = await tokenBalance(account, ihadAddress);
        setIhadBalance(tkBal ? `${tkBal} IHAD` : "");
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

  const handleSendAsset = () => {
    setTransactionCount(transactionCount + 1);
    const sendAsset = async () => {
      try {
        if (sendCurrency === "pfa") {
          await sendEther(account, sendToAddress, sendAmount);
        } else if (sendCurrency === "ihad") {
          await sendToken(ihadAddress, account, sendToAddress, sendAmount);
        } else {
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

  var tempUSDTValue = 0;
  return (
    <React.Fragment>
      <CssBaseline />
      {/* <AppBar
        position="absolute"
        className={clsx(
          classes.appBar 
        )}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="Open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              drawerOpen && classes.menuButtonHidden,
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            {accName}
          </Typography>
          <IconButton color={"inherit"} onClick={handleLogout} edge={"end"}>
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar> */}

      <Drawer
        variant="temporary"
        classes={{
          paper: clsx(
            classes.drawerPaper,
            !drawerOpen && classes.drawerPaperClose,
          ),
        }}
        open={drawerOpen}
        onBackdropClick={handleDrawerClose}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Grid container spacing={2} direction="column">
          <Grid item>
            <Grid
              container
              spacing={0}
              direction="row"
              alignItems="center"
              justify="center"
            >
              <Grid item>
                <Avatar style={{ width: 60, height: 60 }} src={logoUrl} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid
              container
              spacing={0}
              direction="row"
              alignItems="center"
              justify="center"
            >
              <Grid item>
                <Typography variant="h5">{accName}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid
              container
              spacing={0}
              direction="row"
              alignItems="center"
              justify="center"
            >
              <Grid item>
                <Button
                  variant="contained"
                  size="small"
                  color="secondary"
                  className={classes.margin}
                  onClick={handleModalOpen}
                  style={{ width: "150px" }}
                >
                  {t.details[lang]}
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <List>
              {/*{accountNames.map(name => (*/}
              {/*  <ListItem*/}
              {/*    onClick={() => handleChangeAccount(name.slice(5))}*/}
              {/*    button*/}
              {/*  >*/}
              {/*    <ListItemAvatar>*/}
              {/*      <Avatar src={logoUrl} />*/}
              {/*    </ListItemAvatar>*/}
              {/*    <ListItemText primary={name} />*/}
              {/*  </ListItem>*/}
              {/*))}*/}
              {/*<ListItem>
                <ListItemAvatar>
                  <Avatar src={logoUrl} />
                </ListItemAvatar>
                <ListItemText
                  primary={<Typography variant={"h5"}>{pfaBalance}</Typography>}
                />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar src={logoUrl} />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant={"h5"}>{ihadBalance}</Typography>
                  }
                />
              </ListItem>*/}
              <ListItem
                onClick = {()=> history.push("/app")}
                button>
                {/*<ListItemAvatar>
                  <Avatar src={logoUrl} />
                </ListItemAvatar>*/}
                <ListItemText
                  primary={
                    <Typography variant={"h5"}>{t.dashboard[lang]}</Typography>
                  }
                />
              </ListItem>
              <ListItem
              >
                {/*<ListItemAvatar>
                  <Avatar src={logoUrl} />
                </ListItemAvatar>*/}
                <ListItemText
                  primary={
                    <Typography variant={"h5"}>{t.convert[lang]}</Typography>
                  }
                />
              </ListItem>
              <ListItem
                onClick = {()=> history.push("/history-page")}
                button>
                {/*<ListItemAvatar>
                  <Avatar src={logoUrl} />
                </ListItemAvatar>*/}
                <ListItemText
                  primary={
                    <Typography variant={"h5"}>{t.history[lang]}</Typography>
                  }
                />

              </ListItem>
              <ListItem
                onClick = {()=> handletosModalOpen(t.aboutusfull[lang],t.aboutus[lang])}
                button>
                {/*<ListItemAvatar>
                  <Avatar src={logoUrl} />
                </ListItemAvatar>*/}
                <ListItemText
                  primary={
                    <Typography variant={"subtitle2"} >{t.aboutus[lang]}</Typography>
                  }
                />
              </ListItem>
              <ListItem
                onClick = {()=> history.push("/history-page")}
                button

              >
                {/*<ListItemAvatar>
                  <Avatar src={logoUrl} />
                </ListItemAvatar>*/}

                <ListItemText
                  primary={
                    <Typography variant={"subtitle2"} >{t.usemethod[lang]}</Typography>
                  }
                />
              </ListItem>
              <ListItem
                onClick = {()=> handletosModalOpen(t.privacyfull[lang],t.privacy[lang])}
                button

              >
                {/*<ListItemAvatar>
                  <Avatar src={logoUrl} />
                </ListItemAvatar>*/}

                <ListItemText
                  primary={
                    <Typography variant={"subtitle2"} >{t.privacy[lang]}</Typography>
                  }
                />
              </ListItem>
              <ListItem
                onClick = {()=> handletosModalOpen(t.tosfull[lang],t.tos[lang])}
                button

              >
                {/*<ListItemAvatar>
                  <Avatar src={logoUrl} />
                </ListItemAvatar>*/}

                <ListItemText
                  primary={
                    <Typography variant={"subtitle2"} >{t.tos[lang]}</Typography>
                  }
                />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Drawer>

      <main className={classes.content}>
        <Grid className={Config.equipmentType==="mobile"?classes.topMarginHeight:classes.topMarginHeightIPad} ></Grid>
        <Container maxWidth="lg" className ={classes.container} >
          <Grid container direction={"column"}>
            <Grid item style={{ marginBottom: "10px" }}>
              <Grid
                container
                spacing={0}
                direction="row"
                alignItems="center"
                justify="center"
              >
                <Grid item>
                  <Avatar style={{ width: 60, height: 60,borderRadius:0 }} src="https://i.loli.net/2019/06/26/5d12cd78a53e047314.png" />
                </Grid>
              </Grid>
            </Grid>
            <Grid item style={{marginTop:"20px"}}>
              <HorizontalCenter>

                {/* <Select
                  value={currencyDropdownValue}
                  onChange={e => setCurrencyDropdownValue(e.target.value)}
                  style={{ width: "300px" }}
                  // MenuProps={{ style: { borderStyle: "none" } }}
                  disableUnderline={true}
                >
                  <MenuItem value={"usdtTOihad"}>
                    <Typography variant={"h4"} align={"center"}>
                      HAD/USDT
                    </Typography>
                  </MenuItem>
                </Select>
                <form className={classes.container} style={{float:"left"}} noValidate autoComplete="off">
                  <TextField
                    id="outlined-name"
                    label="USDT"
                    className={classes.textField}
                    value={tempBase}
                    placeholder="Enter Amount"
                    onChange={e => setTempBase(e.target.value)}
                    style={{ width: "140px",marginRight:"20px" }}
                    margin="normal"
                    variant="outlined"
                  />
                  <TextField
                    id="outlined-name"
                    label="HAD"
                    className={classes.textField}
                    value={tempBase*6}
                    style={{ width: "140px" }}
                    margin="normal"
                    variant="outlined"
                  />
                </form>
                <Button
                  variant="contained"
                  color="primary"
                  className="CommonButtonStyle"
                  onClick={convertUSDTtoIHAD}
                  style={{ width: "64px",margin:"35px 0 0 0"}}
                >
                  {`${t.convert[lang]}`}
                </Button> */}

                  <Grid item className={Config.equipmentType==="mobile"?classes.itemHeight:classes.itemHeightIpad}>
                    
                    <img className ={classes.linkImgLeft} alt="USDT" src = "https://i.loli.net/2019/06/26/5d12bffaf379385695.png"/>
                    <Grid className ={classes.fLeft} >
                      <Grid className={classes.notesFontSize}>支 付</Grid>
                      <Select
                        value={leftcurrencyDropdownValue}
                        onChange={e => setleftCurrencyDropdownValue(e.target.value)}
                        disableUnderline={true}
                        className={classes.selectPadRight}
                        >
                        <MenuItem value={"usdt"}>
                          <Typography className={classes.selectZiFontSize} align={"center"}>
                            USDT
                          </Typography>
                        </MenuItem>
                        <MenuItem value={"ihad"}>
                          <Typography className={classes.selectZiFontSize} align={"center"}>
                            HAD
                          </Typography>
                        </MenuItem>
                      </Select>
                    </Grid>
                    <FormControl className={Config.equipmentType==="mobile"?classes.inputSize:classes.inputSizeIpad}>
                      <BootstrapInput id="outlined-name" placeholder="Enter Amount" maxLength={11} 
                      value={tempBase} onChange={e => setTempBase(e.target.value)} margin="normal" variant="outlined"/>
                    </FormControl>
                  </Grid>

                  <Grid item>
                    <Grid style={{/* margin-top: 10px; */textAlign:"center"}} >
                      <img className ={Config.equipmentType==="mobile"?classes.linkImgContrary:classes.linkImgContraryIpad} alt="jiantou" src = "https://i.loli.net/2019/06/26/5d1354a288c3d99991.png"/>
                    </Grid>
                  </Grid>

                  <Grid item className={Config.equipmentType==="mobile"||"PC"?classes.itemHeight:classes.itemHeightIpad}>
                    <img className ={classes.linkImgLeft} alt="HAD" src = "https://i.loli.net/2019/06/27/5d1422b33e7ff68920.png"/>
                    <Grid className ={classes.fLeft}  >
                      <Grid className={classes.notesFontSize}>收 取</Grid>
                      <Select
                        value={rightcurrencyDropdownValue}
                        onChange={e => setrightCurrencyDropdownValue(e.target.value)}
                        disableUnderline={true}
                        className={classes.selectPadRight}
                        >
                        <MenuItem value={"ihad"}>
                          <Typography className={classes.selectZiFontSize} align={"center"}>
                          HAD
                          </Typography>
                        </MenuItem>
                        <MenuItem value={"usdt"}>
                          <Typography className={classes.selectZiFontSize} align={"center"}>
                            USDT
                          </Typography>
                        </MenuItem>
                      </Select>
                    </Grid>
                    <FormControl className={Config.equipmentType==="mobile"?classes.inputSize:classes.inputSizeIpad}>
                      <BootstrapInput id="outlined-name" placeholder="Enter Amount" maxLength={11} value={tempBase*rates[leftcurrencyDropdownValue][rightcurrencyDropdownValue]} margin="normal" variant="outlined"/>
                    </FormControl>
                  </Grid>

                  <Grid item className={Config.equipmentType==="mobile"?classes.bottomButtonMargin:classes.bottomButtonMarginIpad}>
                    <Button
                      className={classes.bottombuttonStyle}
                      onClick={convertUSDTtoIHAD}
                      >
                      {`${t.convert[lang]}`}
                    </Button>
                  </Grid>
                
              </HorizontalCenter>
            </Grid>
          </Grid>
        </Container>
        <Grid className="pageFoot"/>
      </main>

      <Modal open={modalOpen} onBackdropClick={handleModalClose}>
        <div className={classes.modalPaper}>
          <div className={classes.toolbarIcon}>
            <IconButton onClick={handleModalClose}>
              <CloseIcon />
            </IconButton>
          </div>
          <Grid
            container
            direction={"column"}
            alignItems={"center"}
            justify={"space-evenly"}
            spacing={5}
          >
            <Grid item>
              <Typography variant={"h5"}>{currentUsername}</Typography>
            </Grid>
            <Grid item>
              <QRCode value={`pfa:${account.address}`} renderAs={"svg"} />
            </Grid>
            <Grid item>
              <TextField
                variant={"outlined"}
                value={account.address}
                disabled
              />
            </Grid>
          </Grid>
        </div>
      </Modal>
      <Modal open={sendModalOpen} onBackdropClick={handleSendModalClose}>
        <div className={classes.modalPaper}>
          <div className={classes.toolbarIcon}>
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
                label={t.from[lang]}
                value={`${currentUsername} ${account.address}`}
                disabled
                style={{ width: "280px" }}
              />
            </Grid>
            <Grid item>
              <TextField
                label={t.to[lang]}
                value={sendToAddress}
                onChange={handleSendToAddressChange}
                style={{ width: "280px" }}
              />
            </Grid>
            <Grid item>
              <FormControl style={{ width: "280px" }}>
                <InputLabel>{t.asset[lang]}</InputLabel>
                <Select
                  value={sendCurrency}
                  onChange={event => {
                    setSendCurrency(event.target.value);
                  }}
                >
                  <MenuItem value="pfa">PFA</MenuItem>
                  <MenuItem value="ihad">IHAD</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item>
              <TextField
                label={t.amount[lang]}
                helperText={t.transactionDelayInfo[lang]}
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
                  {t.send[lang]}
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
                  t.buy[lang]
                  } USDT`}</Typography>
                <IconButton onClick={handleBuyModalClose}>
                  <CloseIcon />
                </IconButton>
              </div>
            </Grid>
            <Grid item>
              <List style={{ overflow: "auto", height: "400px" }}>
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
                      primary={p.name[lang]}
                      primaryTypographyProps={{ color: "textPrimary" }}
                      secondary={p.description[lang]}
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
                <Typography variant={"h5"} style={{ marginRight: "150px" }}>{`${
                  modalTitle
                  }`}</Typography>
                <IconButton onClick={handletosModalClose}>
                  <CloseIcon />
                </IconButton>
              </div>
            </Grid>
            <Grid item style={{ overflow:"scroll",maxHeight:"400px"}}>
              <Typography variant={"p"} style={{ marginRight: "150px" }}>{`${longText}`}</Typography>

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
    </React.Fragment>
  );
}

export default withRouter(ConvertPage);
