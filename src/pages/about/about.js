import React, { useState } from "react";
import { Button, CssBaseline, Grid, Snackbar, TextField, Typography } from "@material-ui/core";
import { CopyButton } from "react-copy-button";
import { withRouter } from "react-router-dom";
import QRCode from "qrcode.react";
import useCookies from "react-cookie/cjs/useCookies";
import trans from "../../public/js/translation";
import config from "../../public/js/config";
import { auth } from "../../public/js/utils";
import '../../public/js/clipboard';

import aboutStyles from './style.js';
import InfoModal from '../../components/modals/information-modal';

function About({ account, history, onLogout }) {
  const classes = aboutStyles();
  const [cookies]                       = useCookies(["pfa"]);
  const [modalContent, setModalContent] = useState('...');          // tos modal content state
  const [modalTitle, setModalTitle]     = useState('...');          // tos modal title state 
  const [tosModal, setTosModal]         = useState(false);          // tos modal state
  const [copiedSB, setCopiedSB]         = useState(false);          // copied snackbar state

  /* check logged in function, if no return login page */
  account = auth(account, cookies, history);

  /* tos modal handle */
  const tosModalOpen = (content, title) => {
    setModalTitle(title);
    setModalContent(content);
    setTosModal(true);
  };
  const tosModalClose = () => setTosModal(false);

  /* copied snackbar handle */
  const copiedSBOpen  = () => {
    window.Clipboard.copy(account.USDTaddress);
    setCopiedSB(true);
  };
  const copiedSBClose = () => setCopiedSB(false);

  /* logout handle */
  const logout = () => onLogout();

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
            <Typography className={classes.userName}>{cookies.username}</Typography>
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
        </Grid>
        <Grid>
          <Grid className={classes.content} onClick={() => tosModalOpen(trans.aboutusfull[config.lang], trans.aboutus[config.lang])}>
            <Grid className={classes.contentIconsLeft}>
              <i className={"material-icons"}>group</i>
            </Grid>
            <Grid className={classes.title}>{trans.aboutus[config.lang]}</Grid>
            <Grid className={classes.contentIconsRight}>
              <i className={"material-icons"}>keyboard_arrow_right</i>
            </Grid>
          </Grid>

          <Grid className={classes.content} onClick={() => tosModalOpen(trans.privacyfull[config.lang], trans.privacy[config.lang])}>
            <Grid className={classes.contentIconsLeft}>
              <i className={"material-icons"}>assignment_ind</i>
            </Grid>
            <Grid className={classes.title}>{trans.privacy[config.lang]}</Grid>
            <Grid className={classes.contentIconsRight}>
              <i className={"material-icons"}>keyboard_arrow_right</i>
            </Grid>
          </Grid>

          <Grid className={classes.content} onClick={() => tosModalOpen(trans.tosfull[config.lang], trans.tos[config.lang])}>
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
              onClick={logout}
              style={{ width: "70%", letterSpacing: "1px" }}
            >{trans.logOut[config.lang]}
            </Button>
          </Grid>
        </Grid>
        <Grid className="pageFoot"/>
      </Grid>
      
      <InfoModal
        open = {tosModal}
        close = {tosModalClose}
        title = {modalTitle}
        content = {modalContent}></InfoModal>

      <Snackbar
        open={copiedSB}
        autoHideDuration={6000}
        onClose={copiedSBClose}
        message={trans.copied[config.lang]}
      />
    </React.Fragment>
  );
}

export default withRouter(About);
