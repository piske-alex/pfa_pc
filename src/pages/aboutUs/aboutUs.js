import React, { useState } from "react";
import { Button, CssBaseline, Grid, Snackbar, TextField, Typography } from "@material-ui/core";
import { CopyButton } from "react-copy-button";
import { withRouter } from "react-router-dom";
import QRCode from "qrcode.react";
import useCookies from "react-cookie/cjs/useCookies";
import trans from "../../public/js/translation";
import config from "../../public/js/config";
import { isEmpty } from "../../public/js/utils";

import aboutUsStyles from './style.js';
import InfoModal from '../../components/information-modal';

function AboutUs({ history, handleLogout, currentUsername, account }) {
  const classes = aboutUsStyles();
  const [longText, setLongText]         = useState("undefinede");
  const [modalTitle, setModalTitle]     = useState("undefinede");
  const [tosModalOpen, setTosModalOpen] = useState(false);
  const [cookies, setCookie]            = useCookies(["pfa"]);
  const [copiedSB, setCopiedSB]         = useState(false);

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

  const handleTosModalOpen = (x, y) => {
    setLongText(x);
    setModalTitle(y);
    setTosModalOpen(true);
  };
  const handleTosModalClose = () => setTosModalOpen(false);
  const submit = () => handleLogout();

  if (account == null || isEmpty(account)) {
    account = cookies.acctobj;
    if(isEmpty(account)) 
      history.push("/login-account");
  }
  if(isEmpty(currentUsername)) 
    currentUsername = cookies.username;

  const copiedSBClose = () => setCopiedSB(false);
  const copiedSBOpen  = () => {
    window.Clipboard.copy(account.USDTaddress);
    setCopiedSB(true);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Grid style={{ maxWidth: "1100px", margin: "0 auto", backgroundColor: "#000!important", height: "auto" }}>
        <Grid
          container
          direction={"column"}
          alignItems={"center"}
          justify={"space-evenly"}
          spacing={5}
          style={{ margin: "0", width: "100%" }}
          className={classes.headBlock}
        >
          <Grid style={{ marginTop: "32px" }}>
            <Typography className={classes.userName}>{currentUsername}</Typography>
          </Grid>
          <Grid style={{ border: "8px white", marginTop: "20px" }}>
            <QRCode value={`${account.USDTaddress}`} renderAs={"svg"} style={{ border: "8px white solid", height: "200px", width: "200px" }}/>
          </Grid>
          <Grid style={{ marginTop: "32px" }}>
            <Typography className={classes.userName}>USDT 充值地址</Typography>
          </Grid>
          <Grid style={{ margin: "20px 0px", height: '48px' }}>
              <TextField
                variant={"outlined"}
                readOnly={true}
                // contentEditable={true}
                value={account.USDTaddress}
                disabled
                InputProps={{
                    style: { fontSize: "11px" }
                }}
                className={classes.addressField}
              />
              <CopyButton
                className="CopyButtonStyle"
                onClick={copiedSBOpen}
                text={account.USDTaddress}
              >{trans.copy[config.lang]}
              </CopyButton>
          </Grid>
          <Grid style={{marginBottom:'32px',marginLeft:'5px',marginRight:'5px'}}>
            {/* <Typography className={classes.userName}>請勿將以太坊 ERC-20 USDT 轉賬至此地址，找回將產生手續費</Typography> */}
          </Grid>
        </Grid>
        <Grid>
          <Grid className={classes.content} onClick={() => handleTosModalOpen(trans.aboutusfull[config.lang], trans.aboutus[config.lang])}>
            <Grid className={classes.contentIconsLeft}>
              <i className={"material-icons"}>group</i>
            </Grid>
            <Grid className={classes.title}>{trans.aboutus[config.lang]}</Grid>
            <Grid className={classes.contentIconsRight}>
              <i className={"material-icons"}>keyboard_arrow_right</i>
            </Grid>
          </Grid>

          <Grid className={classes.content} onClick={() => handleTosModalOpen(trans.privacyfull[config.lang], trans.privacy[config.lang])}>
            <Grid className={classes.contentIconsLeft}>
              <i className={"material-icons"}>assignment_ind</i>
            </Grid>
            <Grid className={classes.title}>{trans.privacy[config.lang]}</Grid>
            <Grid className={classes.contentIconsRight}>
              <i className={"material-icons"}>keyboard_arrow_right</i>
            </Grid>
          </Grid>

          <Grid className={classes.content} onClick={() => handleTosModalOpen(trans.tosfull[config.lang], trans.tos[config.lang])}>
            <Grid className={classes.contentIconsLeft}>
              <i className={"material-icons"}>description</i>
            </Grid>
            <Grid className={classes.title}>{trans.tos[config.lang]}</Grid>
            <Grid className={classes.contentIconsRight}>
              <i className={"material-icons"}>keyboard_arrow_right</i>
            </Grid>
          </Grid>
          <Grid id="logOut" style={{marginTop: '12px', width: '100%', textAlign: 'center'}}>
            <Button
              className="CommonButtonStyle"
              variant="contained"
              color="primary"
              onClick={submit}
              style={{ width: "70%", letterSpacing: "1px" }}
            >{trans.logOut[config.lang]}
            </Button>
          </Grid>
        </Grid>
        <Grid style={{ margin: "0 auto" }}>
          <InfoModal
            open = {tosModalOpen}
            close = {handleTosModalClose}
            title = {modalTitle}
            content = {longText}></InfoModal>
        </Grid>
        <Grid className="pageFoot"/>
      </Grid>
      <Snackbar
        open={copiedSB}
        autoHideDuration={6000}
        onClose={copiedSBClose}
        message={trans.copied[config.lang]}
      />
    </React.Fragment>
  );
}

export default withRouter(AboutUs);
