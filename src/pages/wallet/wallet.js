import React, { useState, useEffect } from "react";
import { Avatar, Button, CssBaseline, Divider, Dialog, DialogTitle, Grid, Icon, 
         List, ListItem, ListItemAvatar, ListItemIcon, ListItemText, Snackbar, Typography } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import ReceiveIcon from "@material-ui/icons/CallReceived";
import SendIcon from "@material-ui/icons/CallMade";
import 'react-phone-input-2/lib/style.css';
import { getHistory, tokenBalance,
         ihadAddress, yhadAddress, pfa20Address, USDTaddress,
         listenUSDTdeposit } from "../../public/js/blockchain-utils";
import { HorizontalCenter, isEmpty } from "../../public/js/utils";
import useCookies from "react-cookie/cjs/useCookies";
import moment from "moment";
import "moment-timezone";

import trans from "../../public/js/translation";
import config from "../../public/js/config";
import "./wallet.css";

import walletStyles from './style.js';
import XferModal from '../../components/transfer-modal';
import RechargeModal from '../../components/recharge-modal';
import TxModal from '../../components/transcation-modal';

function Wallet({account, history, currentUsername, handleLogout, handleChangeAccount, props}) {
  const classes = walletStyles();
  const [cookies]                         = useCookies(['pfa']);
  const [txModal, setTxModal]             = useState(false);            // transcation modal state
  const [rechargeModal, setRechargeModal] = useState(false);
  const [sendModal, setSendModal]         = useState(false);
  const [txDetails,setTxDetails]          = useState({});               // transcation details state
  const [openChooser, setOpenChooser]     = useState(false);
  const [noInfoSB, setNoInfoSB]           = useState(false);            // no infomation snackbar state
  const [depSuccSB, setDepSuccSB]         = useState(false);            // deposit snackbar state
  const [depositAmount, setDepositAmount] = useState("");               // deposit amount state
  const [txCount, setTxCount]             = useState(0);
  const [pfaBal, setPfaBal]               = useState("");               // PFA Balance state
  const [yhadBal, setYhadBal]             = useState("");               // YHAD Balance state
  const [ihadBal, setIhadBal]             = useState("");               // IHAD Balance state
  const [USDTbal, setUSDTBal]             = useState("");               // USDT Balance state
  const [txHistory, setTxHistory]         = useState([]);               // account transaction history state 

  if (account === null || account === undefined || isEmpty(account)) {
    account = cookies.acctobj;
    if(isEmpty(account))
      history.push("/login-account");
  }
  if(isEmpty(currentUsername)) 
    currentUsername = cookies.username;
    
  const tradeModalOpen      = (entry) => {
    if(entry == null)
      setNoInfoSB(true);
    else{
      setTxDetails(entry);
      setTxModal(true);
    }
  }
  const txModalClose        = () => setTxModal(false);

  const buyModalOpen        = async () => {
    setRechargeModal(true);
    listenUSDTdeposit(account.USDTWallet, account, (x) => {
      if (x > 0) setDepositAmount(x);
      setDepositAmount(x);
      setDepSuccSB(true)
    })
  };
  const rechargeModalClose  = () => setRechargeModal(false);

  const sendModalOpen       = () => setSendModal(true);
  const sendModalClose      = () => { setSendModal(false); setTxCount(txCount + 1) };

  const noInfoSBClose       = () => setNoInfoSB(false);
  const chooseModalClose    = () => setOpenChooser(false);
  const depSuccSBClose      = () => setDepSuccSB(false);
  const detailsButton       = () => props.history.push("/details");

  const changeTZ = (time) =>{
    let format = 'YYYY-MM-DD HH:mm:ss';
    return moment(time, format).add(8, 'hours').format(format);
  }

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const pfa20Bal = await tokenBalance(account, pfa20Address)
        setPfaBal(pfa20Bal != null ? pfa20Bal : 0);
        const tkBal   = await tokenBalance(account, ihadAddress);
        const yhadBal = await tokenBalance(account, yhadAddress);
        const USDTBal = await tokenBalance(account, USDTaddress);
        // console.log(`Token: ${tkBal} YHAD: ${yhadBal} USDT: ${USDTBal}`);
        setIhadBal(tkBal    != null ? tkBal   : 0);
        setYhadBal(yhadBal  != null ? yhadBal : 0);
        setUSDTBal(USDTBal  != null ? USDTBal : 0);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchAccHistory = async () => {
      try {
        const h = await getHistory(account.address);
        setTxHistory(h);
      } catch (err) {
        console.log(err);
      }
    };

    fetchBalance();
    fetchAccHistory();
  }, [txCount]);

  return (
    <React.Fragment>
      <CssBaseline />
      <Grid style={{ maxWidth: "1100px", margin: "0 auto", backgroundColor: "#212733!important", height: "100vh" }}>
        <main className={classes.content}>
          <Grid className="backgrad">
            <Grid className={classes.head} >
              {trans.title[config.lang]}
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
                      {trans.valuation[config.lang]}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item>
                <HorizontalCenter>
                  <Grid className="usdtVulesClass">
                    {pfaBal*1+ihadBal +USDTbal}
                  </Grid>
                  <Grid className="usdtVulesClassCode">
                    {trans.UsdtCode[config.lang]}
                  </Grid>
                </HorizontalCenter>
              </Grid>

              <Grid item style={{ height: "10px" }} />
              <Grid item style={{ width: '100%', paddingLeft: 'calc(50% - 261px / 2)' }}>
                <div className = "myWalletTwoBtn">
                  <Button
                    variant="outlined"
                    onClick={setRechargeModal}
                    style={{ width: "130px", color: '#C0C0C0', padding:'5px 0px', marginRight: 1 }}
                  >
                    <img src={'after.png'} className="donateClass" />
                    <Grid className="rechargeClass">
                      {trans.recharge[config.lang]}
                    </Grid>
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={sendModalOpen}
                    style={{ width: "130px", color: '#C0C0C0', padding:'5px 0px' }}
                  >
                    <img src='https://i.loli.net/2019/06/28/5d15641e8e59187387.png' className="donateClass" />
                    <Grid className="rechargeClass">
                      {trans.withdrawal[config.lang]}
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
                  <span className='msgIconText'>
                    {trans.assets[config.lang]}
                  </span>
                  <span className='msgIconTextrg'>
                    <Icon className='msgIcon'>sort_by_alpha</Icon>
                  </span>
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
                        { pfaBal }
                      </Grid>
                    </ListItem>

                    <Divider className='myWalletline' />

                    <ListItem alignItems="flex-start">
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
                        { USDTbal }
                      </Grid>
                    </ListItem>

                    <Divider className='myWalletline' />

                    <ListItem alignItems="flex-start">
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
                        { ihadBal }
                      </Grid>
                    </ListItem>
                  </List>
                </Grid>

                <Grid className="paddingle" item style={{ maxHeight: "40vh", overflow: "auto", paddingBottom: 5 }}>
                  <Grid className="transactionRecordClass">
                      <Grid className ="transactionRecordClassLeft">
                        {trans.transactionRecord[config.lang]}
                      </Grid>

                      <Grid className ="transactionRecordClassRight">
                          <Button
                            variant="outlined"
                            onClick={detailsButton}
                            style={{ width: "100px", color: '#C0C0C0', padding:'2px 0px', float:'right'}} >
                            <Grid className="rechargeClass">
                              {trans.details[config.lang]}
                            </Grid>
                          </Button>
                      </Grid>
                  </Grid>

                  <Divider />
                  {txHistory.length === 0 ? (
                    <Typography variant={"body2"} style={{ marginTop: "5px" }}>
                      {trans.noTransactionInfo[config.lang]}
                    </Typography>
                  ) : (
                    <List>
                      {txHistory
                        .map(entry => (
                          <ListItem key={entry.time + entry.type + entry.hash + entry.counterparty + entry.currency} // temp key for each list, remove later
                            alignItems="flex-start" style={{paddingTop:"0px",paddingBottom:"0px"}} 
                            onClick={()=>{ tradeModalOpen(entry) }}
                            >
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
                                  ? trans.receive[config.lang]
                                  : entry.type === "out"
                                  ? trans.send[config.lang]
                                  : entry.type
                                } ${entry.absvalue} ${entry.currency}`}
                              secondary = {
                                <span>
                                  <span className="codeWidth">{decodeURIComponent(entry.counterparty)}</span><br />
                                  <span>{decodeURIComponent(entry.memo).slice(0,30)}</span><br />
                                  <span>{changeTZ(`${(entry.time).slice(0,10)} ${(entry.time.slice(11,19))}`)} ({trans.myWallet.timeZone[config.lang]}：GMT+8)</span><br />
                                </span>
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

      <RechargeModal 
        open={rechargeModal} close={rechargeModalClose}
        trans={trans} config={config} 
        account={account}
        ></RechargeModal>
      
      <XferModal
        open={sendModal} close={sendModalClose}
        trans={trans} config={config} 
        account={account} 
        balances={{pfa: pfaBal, usdt: USDTbal}}
        addresses={{ihad: ihadAddress, usdt: USDTaddress}}
      ></XferModal>

      <TxModal
        open={txModal} close={txModalClose}
        trans={trans} config={config}
        account={account} details={txDetails}
        ></TxModal>

      <Snackbar
        open={depSuccSB}
        autoHideDuration={6000}
        onClose={depSuccSBClose}
        message={trans.received[config.lang] + depositAmount + trans.continue[config.lang]}
      />

      <Snackbar
        open={noInfoSB}
        autoHideDuration={6000}
        onClose={noInfoSBClose}
        message={trans.noInformation[config.lang]}
      />

      <Dialog onClose={chooseModalClose} aria-labelledby="simple-dialog-title" open={openChooser}>
        <DialogTitle id="simple-dialog-title">請選擇</DialogTitle>
        <List>


          <ListItem button onClick={() => history.push("/about")}>
            <ListItemAvatar>
              <Avatar src='https://i.loli.net/2019/06/26/5d12cd78a53e047314.png' />
            </ListItemAvatar>
            <ListItemText primary="HAD 或內部 USDT" />
          </ListItem>

          <ListItem button onClick={buyModalOpen}>
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

export default withRouter(Wallet);
