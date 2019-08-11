import React from "react";
import { getIcon, isEmpty } from "../../public/js/utils";
import { Grid, Snackbar } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import trans from "../../public/js/translation";
import Modal from "@material-ui/core/Modal";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { withRouter } from "react-router-dom";
import QRCode from "qrcode.react";
import useCookies from "react-cookie/cjs/useCookies";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Config from "../../public/js/config";
import { exportAccounts } from "../../public/js/blockchain-utils";
import { CopyButton } from "react-copy-button";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles(theme => ({
  headBlock: {
    backgroundColor: "#212733"
  },
  head: {
    width: "100%",
    paddingTop: "40px",
    fontSize: "16px",
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
    paddingTop: "20px"
  },
  introduce: {
    height: "60px",
    textAlign: "Center",
    paddingTop: "30px",
    fontSize: "14px",
    color: "#fff",
    letterSpacing: "1px"
  },
  content: {
    width: "100%",
    height: "50px",
    lineHeight: "50px",
    marginTop: "10px",
    fontSize: "14px",
    backgroundColor: "#212733",
    letterSpacing: "1px"
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
    zIndex: 200

  },
  toolbarIcon: {
    // display: "flex",
    // alignItems: "center",
    // justifyContent: "flex-end",
    padding: "0 2px",
    textAlign: "Center",
    marginTop: "14px",
    ...theme.mixins.toolbar
  },
  close: {
    position: "absolute",
    right: "10px",
    top: "18px"
  },
  logOut: {
    textAlign: "Center",
    position: "absolute",
    bottom: "10%",
    maxWidth: "1100px",
    width: "100%"
  },
  userName: {
    fontSize: "16px",
    fontWeight: "400",
    lineHeight: "1.33",
    letterSpacing: "1px"
  }
}));

function AboutUs({ history, handleLogout, currentUsername, account }) {
  const classes = useStyles();
  const [longText, setLongText] = React.useState("undefinede");
  const [modalTitle, setModalTitle] = React.useState("undefinede");
  const [tosModalOpen, settosModalOpen] = React.useState(false);
  const [footStyle, setFootStyle] = React.useState({});
  const [logOutStyle, setLogOutStyle] = React.useState({
    textAlign: "Center",
    position: "absolute",
    bottom: "10%",
    maxWidth: "1100px",
    width: "100%"
  });
  const [modalOpen, setModalOpen] = React.useState(false);

  window.Clipboard = (function(window, document, navigator) {
    var textArea,
      copy;

    function isOS() {
      return navigator.userAgent.match(/ipad|iphone/i);
    }

    function createTextArea(text) {
      textArea = document.createElement("textArea");
      textArea.value = text;
      document.body.appendChild(textArea);
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
      document.execCommand("copy");
      document.body.removeChild(textArea);
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

  const handleModalOpen = () => {
    setModalOpen(true);
  };
  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handletosModalOpen = (x, y) => {
    setLongText(x);
    setModalTitle(y);
    settosModalOpen(true);
  };
  const handletosModalClose = () => {
    settosModalOpen(false);
  };
  const onSumbit = () => {
    handleLogout();
  };
  const [cookies, setCookie] = useCookies(["pfa"]);
  let something = "";
  console.log(account);
  if (account == null || isEmpty(account)) {
    account = cookies.acctobj;
    console.log(cookies.acctobj + "jj");
    isEmpty(account) ? history.push("/login-account") : something = "continue";
  }
  let accName = currentUsername;
  isEmpty(accName) ? currentUsername = cookies.username : currentUsername = currentUsername;
  const accAddr = account.address;
  setTimeout(() => {
    let foot = document.getElementById("foot").offsetTop;
    let logOut = document.getElementById("logOut").offsetTop;
    if (logOut - foot < 50) {
      setFootStyle({
        width: "100%",
        height: "50px"
      });
      setLogOutStyle({
        textAlign: "Center",
        position: "absolute",
        bottom: "",
        marginBottom: "70px",
        maxWidth: "1100px",
        width: "100%"
      });
    }
  }, 100);

  const [copiedSnackbarOpen, setCopiedSnackbarOpen] = React.useState(
    false
  );
  const handleCopiedSnackbarClose = () => {
    setCopiedSnackbarOpen(false);
  };

  const handleCopiedSnackbarOpen = () => {
    window.Clipboard.copy(accAddr);
    setCopiedSnackbarOpen(true);
  };

  return (
    <React.Fragment>

      <CssBaseline/>
      <Grid style={{ maxWidth: "1100px", margin: "0 auto", backgroundColor: "#000!important", height: "auto" }}>
        <Grid
          container
          direction={"column"}
          alignItems={"center"}
          justify={"space-evenly"}
          spacing={5}
          style={{ margin: "0px 0px", width: "100%" }}
          className={classes.headBlock}
        >
          <Grid style={{ marginTop: "32px" }}>
            <Typography className={classes.userName}>{currentUsername}</Typography>
          </Grid>
          <Grid style={{ border: "8px white", marginTop: "20px" }}>
            <QRCode value={`pfa:${account.address}`} renderAs={"svg"}
                    style={{ border: "8px white solid", height: "200px", width: "200px" }}/>
          </Grid>
          <Grid style={{ marginTop: "32px" }}>
            <Typography className={classes.userName}>HAD 或內部 USDT</Typography>
          </Grid>
          <Grid style={{ margin: "20px 0px" }}>
            <Paper>

              <TextField
                variant={"outlined"}
                readOnly={false}
                contentEditable={true}
                value={account.address}
                disabled
              />
              <CopyButton
                className="CopyButtonStyle"
                onClick={handleCopiedSnackbarOpen}
                text={account.address}
              >
                {trans.copy[Config.lang]}
              </CopyButton>
            </Paper>

          </Grid>
          <Grid style={{marginBottom:'32px',}}>
            <Typography className={classes.userName}>請勿將以太坊 ERC-20 USDT 轉賬至此地址，找回將產生手續費</Typography>
          </Grid>
        </Grid>
        <Grid>
          <Grid className={classes.content}
                onClick={() => handletosModalOpen(trans.aboutusfull[Config.lang], trans.aboutus[Config.lang])}>
            <Grid className={classes.contentIconsLeft}>
              <i class="material-icons">group</i>
            </Grid>
            <Grid className={classes.title}>{trans.aboutus[Config.lang]}</Grid>
            <Grid className={classes.contentIconsRight}>
              <i class="material-icons">keyboard_arrow_right</i>
            </Grid>
          </Grid>

          <Grid className={classes.content}
                onClick={() => handletosModalOpen(trans.privacyfull[Config.lang], trans.privacy[Config.lang])}>
            <Grid className={classes.contentIconsLeft}>
              <i class="material-icons">assignment_ind</i>
            </Grid>
            <Grid className={classes.title}>{trans.privacy[Config.lang]}</Grid>
            <Grid className={classes.contentIconsRight}>
              <i class="material-icons">keyboard_arrow_right</i>
            </Grid>
          </Grid>

          <Grid className={classes.content}
                onClick={() => handletosModalOpen(trans.tosfull[Config.lang], trans.tos[Config.lang])}>
            <Grid className={classes.contentIconsLeft}>
              <i class="material-icons">description</i>
            </Grid>
            <Grid className={classes.title}>{trans.tos[Config.lang]}</Grid>
            <Grid className={classes.contentIconsRight}>
              <i class="material-icons">keyboard_arrow_right</i>
            </Grid>
          </Grid>
          <Grid id="foot" style={footStyle}/>

          {/* <Grid className={classes.logOut} id="logOut"> */}
          <Grid id="logOut" style={logOutStyle}>
            <Button
              className="CommonButtonStyle"
              variant="contained"
              color="primary"
              onClick={onSumbit}
              style={{ width: "70%", letterSpacing: "1px" }}
            >
              {trans.logOut[Config.lang]}
            </Button>
          </Grid>
        </Grid>
        {/* <VerticalCenter gridStyle={{ minHeight: "80vh" }}>
        <HorizontalCenter>
        </HorizontalCenter>
      </VerticalCenter> */}
        <Grid style={{ margin: "0 auto" }}>
          <Modal open={tosModalOpen} style={{ height: "100%" }} onBackdropClick={handletosModalClose}>
            <div className={classes.modalPaper + " modalWidth"}>
              <Grid style={{ height: "100%" }} container direction={"column"}>
                <Grid item style={{ maxHeight: "14%", width: "100%" }}>
                  <div className={classes.toolbarIcon}>
                    <Typography variant={"h5"} style={{}}>{`${modalTitle}`}</Typography>
                    <IconButton className={classes.close} onClick={handletosModalClose}>
                      <CloseIcon/>
                    </IconButton>
                  </div>
                </Grid>
                <Grid item style={{ overflow: "auto", maxHeight: "84%", width: "100%", padding: "6px" }}>
                  <Typography variant={"p"} style={{
                    marginRight: "150px",
                    textAlign: "justify",
                    width: "100%",
                    wordBreak: "break-all"
                  }} dangerouslySetInnerHTML={{ __html: longText }}/>

                </Grid>
              </Grid>
            </div>
          </Modal>
          {/*<Modal open={modalOpen} onBackdropClick={handleModalClose}>
            <div className={classes.modalPaper}>
              <div className={classes.toolbarIcon}>
                <Typography variant={"h5"} style={{ marginRight: "150px" }}>{`備份`}</Typography>
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
                  <FormControlLabel
                    control={
                      <Switch checked={seePrivateKey} onChange={e => setSeePrivateKey(e.target.checked)} />
                    }
                    label="顯示密鑰"
                  />
                </Grid>
                <Grid item>
                  <TextField
                    label={t.privateKey[Config.Config.lang]}
                    className={classes.textField}
                    value={account.privateKey.substr(2)}
                    style={{ visibility: seePrivateKey ? 'visible' : 'hidden' }}
                    disabled
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </div>
          </Modal>*/}
        </Grid>
        <Grid className="pageFoot"/>
      </Grid>
      <Snackbar
        open={copiedSnackbarOpen}
        autoHideDuration={6000}
        onClose={handleCopiedSnackbarClose}
        message={trans.copied[Config.lang]}
      />
    </React.Fragment>
  );
}

export default withRouter(AboutUs);
