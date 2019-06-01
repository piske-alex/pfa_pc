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
import t from "./translation";
import { withRouter } from "react-router-dom";
import { isEmpty } from "./utils";
import {
  etherBalance,
  getHistory,
  readAccountList,
  sendEther,
  web3js,
  ihadAddress,
  tokenBalance,
  sendToken,
} from "./blockchain-utils";
import QRCode from "qrcode.react";
import TextField from "@material-ui/core/TextField";
import CloseIcon from "@material-ui/icons/Close";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import LogoutIcon from "@material-ui/icons/ExitToApp";
import { getLogoUrl } from "./utils";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ReceiveIcon from "@material-ui/icons/CallReceived";
import SendIcon from "@material-ui/icons/CallMade";
import Moment from "react-moment";

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
    padding: "0 8px",
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
    position: "absolute",
    width: 360,
    height: 500,
    top: "calc(50% - 500px / 2)",
    left: "calc(50% - 360px / 2)",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
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
  if (isEmpty(account)) {
    history.push("/login-account");
  }
  const accName = currentUsername;
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

  const [sendToAddress, setSendToAddress] = React.useState("");
  const handleSendToAddressChange = event => {
    setSendToAddress(event.target.value);
  };

  const [sendAmount, setSendAmount] = React.useState("");
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

  const [accHistory, setAccHistory] = React.useState([]);

  const [sendCurrency, setSendCurrency] = React.useState("pfa");

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

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

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(
          classes.appBar /*, drawerOpen && classes.appBarShift */,
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
          <IconButton color="inherit" onClick={handleModalOpen} edge={"end"}>
            <MoreIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

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
        <Grid container spacing={0} direction="column">
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
                  variant="outlined"
                  size="small"
                  color="primary"
                  className={classes.margin}
                  onClick={handleModalOpen}
                >
                  {t.details[lang]}
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <List>
              {accountNames.map(name => (
                <ListItem
                  onClick={() => handleChangeAccount(name.slice(5))}
                  button
                >
                  <ListItemAvatar>
                    <Avatar src={logoUrl} />
                  </ListItemAvatar>
                  <ListItemText primary={name} />
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
      </Drawer>

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
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
                  <Typography variant={"h4"}>{pfaBalance}</Typography>
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
                  <Typography variant={"h4"}>{ihadBalance}</Typography>
                </Grid>
              </Grid>
            </Grid>
            {/*<Grid item>*/}
            {/*  <Grid*/}
            {/*    container*/}
            {/*    spacing={0}*/}
            {/*    direction="row"*/}
            {/*    alignItems="center"*/}
            {/*    justify="center"*/}
            {/*  >*/}
            {/*    <Grid item>*/}
            {/*      <Typography variant={"subtitle1"}>$0.00USD</Typography>*/}
            {/*    </Grid>*/}
            {/*  </Grid>*/}
            {/*</Grid>*/}
            <Grid item>
              <Grid
                container
                direction="row"
                alignItems="center"
                justify="center"
              >
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => window.open("http://h51.lvshandian.com")}
                  >
                    {t.buy[lang]}
                  </Button>
                </Grid>
                <Grid item xs={1} />
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={setSendModalOpen}
                  >
                    {t.send[lang]}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item style={{ maxHeight: "40vh", overflow: "auto" }}>
              <List>
                {accHistory.map(entry => (
                  <ListItem alignItems="flex-start">
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
                          ? t.receive[lang]
                          : entry.type === "out"
                          ? t.send[lang]
                          : entry.type
                      } ${entry.absvalue} ${entry.currency}`}
                      secondary={
                        <React.Fragment>
                          <Typography variant={"body2"}>
                            {`${entry.counterparty.slice(0, 20)}...`}
                          </Typography>
                          <Moment fromNow>{entry.time}</Moment>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>
        </Container>
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
          >
            <Grid item>
              <TextField
                label={t.from[lang]}
                value={`${currentUsername} ${account.address}`}
                disabled
              />
            </Grid>
            <Grid item>
              <TextField
                label={t.to[lang]}
                value={sendToAddress}
                onChange={handleSendToAddressChange}
              />
            </Grid>
            <Grid item>
              <FormControl>
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
              />
            </Grid>
            <Grid item>
              <FormControl>
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

export default withRouter(Dashboard);
