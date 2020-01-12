import React, { useState, useEffect } from "react";
import { Divider, Grid, IconButton, Snackbar } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import CssBaseline from "@material-ui/core/CssBaseline";
import { withRouter } from "react-router-dom";
import { isEmpty } from "../../public/js/utils";
import { getHistory } from "../../public/js/blockchain-utils";
import useCookies from "react-cookie/cjs/useCookies";
import moment from "moment";
import "moment-timezone";

import trans from "../../public/js/translation";
import config from "../../public/js/config";
import "./details.css";
import detailsStyles from './style.js';

function Details({account, history, currentUsername, props}) {
  const classes = detailsStyles();
  const [cookies]                                   = useCookies(['pfa']);
  const [noinfoSnackbarOpen, setnoinfoSnackbarOpen] = useState(false);
  const [transactionCount, setTransactionCount]     = useState(0);
  const [txHistory, setTxHistory]                   = useState([]);

  if (account == null || isEmpty(account)) {
    account = cookies.acctobj;
    if(account == null || isEmpty(account)) 
      history.push("/login-account");
  }
  if(isEmpty(currentUsername)) 
    currentUsername = cookies.username;

  const handlenoinfoSnackbarClose = () => setnoinfoSnackbarOpen(false);

  const changeTZ = (time) =>{
    let format = 'YYYY-MM-DD HH:mm:ss';
    return moment(time, format).add(8, 'hours').format(format);
  }
  
  useEffect(() => {
    const fetchAccHistory = async () => {
      try {
        const history = await getHistory(account.address);
        setTxHistory(history);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAccHistory();
  }, [account, transactionCount]);

  const back = async () => props.history.push("/wallet");

  return (
    <React.Fragment>
      <CssBaseline />
      <Grid style={{ maxWidth: "1100px", margin: "0 auto", backgroundColor: "#212733!important", height: "100vh" }}>
        <main className={classes.content}>
          <Grid className="detailsBackgrad">
            <div className={classes.detailsTop}>
              <Grid className={classes.head} >
                {trans.detailsTitle[config.lang]}
              </Grid> 
              <IconButton className={classes.close} onClick={back}>
                <CloseIcon />
              </IconButton>

              <Grid className="detailsBackgradnew"></Grid>

              <Grid spacing={0} container justify="center" className='listHeader'>
                <Grid item xs={3} className='detailslistLeft'>{trans.currency[config.lang]}</Grid>
                <Grid item xs={2} className='detailslistLeft'>{trans.amount[config.lang]}</Grid>
                <Grid item xs={3} className='detailslistLeft' style={{paddingLeft: 10}}>{trans.address[config.lang]}</Grid>
                <Grid item xs={2} className='detailslistLeft' >{trans.date[config.lang]}</Grid>
                <Grid item xs={2} className='detailslistRightHead'>{trans.time[config.lang]}</Grid>
              </Grid>
            </div>
            <div style={{ height: 93 }}></div>
            {txHistory
              .map(entry => {return (
                <div>
                <Grid spacing={0} container  justify="center" className='detailslist'>
                  <Grid item xs={3}>{
                    entry.type === "in"
                      ? trans.receive[config.lang]
                      : entry.type === "out"
                      ? trans.send[config.lang]
                      : entry.type
                  }  {entry.currency}</Grid>
                  <Grid item xs={2} >{parseFloat(entry.absvalue).toFixed(3)}</Grid>
                  <Grid item xs={3} >{decodeURIComponent(entry.counterparty).slice(0,6)}</Grid>
                  <Grid item xs={2} style={{paddingLeft:'10px', whiteSpace: 'nowrap'}}>{changeTZ(`${(entry.time).slice(0,10)} ${(entry.time.slice(11,19))}`).slice(5,10)}</Grid>
                  <Grid item xs={2} className='detailslistRight'>{changeTZ(`${(entry.time).slice(0,10)} ${(entry.time.slice(11,19))}`).slice(11,16)} </Grid>
                </Grid>
                <Grid className="remarks">
                  <Grid item xs={12} >({trans.myWallet.timeZone[config.lang]}：GMT+8) 備註{decodeURIComponent(entry.memo)}</Grid>
                </Grid>
                <Divider />
                </div>
              )} )}
          </Grid>
        </main>
        <Grid className="pageFoot" />
      </Grid>

      <Snackbar
        open={noinfoSnackbarOpen}
        autoHideDuration={6000}
        onClose={handlenoinfoSnackbarClose}
        message={trans.noInformation[config.lang]}
      />
    </React.Fragment>
  );
}

export default withRouter(Details);
