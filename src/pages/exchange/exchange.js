import React, { useState, useEffect } from "react";
import { Avatar, Button, CssBaseline, Container, FormControl,
         Grid, MenuItem, Select, Snackbar, Typography } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import useCookies from "react-cookie/cjs/useCookies";
import trans from "../../public/js/translation";
import {
  getHistory, tokenBalance,
  ihadAddress, USDTaddress,
  USDTToIHAD, IHADToUSDT
} from "../../public/js/blockchain-utils";
import { auth } from "../../public/js/utils";
import config from "../../public/js/config";
import './exchange.css';

import BootstrapInput from '../../components/inputs/bootstrap-input';
import exchangeStyles from './style.js';

function ExchangePage({ account, history }) {
  const classes = exchangeStyles();
  const [cookies]                         = useCookies(['pfa']);  // cookies state
  const [txSuccSB, setTxSuccSB]           = useState(false);      // transaction finished snackbar state
  const [txFailedSB, setTxFailedSB]       = useState(false);      // transaction failed snackbar state
  const [ccyFromVal, setCcyFromVal]       = useState("usdt");     // currency exchange from value
  const [ccyToVal, setCcyToVal]           = useState("ihad");     // currency exchange to value state
  const [base, setBase]                   = useState("0");
  const [txCount, setTxCount]             = useState(0);
  const [IHADBal, setIHADBal]             = useState("");
  const [USDTBal, setUSDTBal]             = useState("");

  /* check logged in function, if no return login page */
  account = auth(account, cookies, history);

  const txSuccSBClose = () => setTxSuccSB(false);
  const txFailedSBClose = () => setTxFailedSB(false);

  const exchange = async() => {
    try {
      const cdv = ccyFromVal + "TO" + ccyToVal;
      if (cdv === "usdtTOihad") {
        if(base <= USDTBal)
          await USDTToIHAD(account, base);
        else
          setTxFailedSB(true);
      } else if (cdv === "ihadTOusdt"){
        if(base <= IHADBal) 
          await IHADToUSDT(account, base);
        else
          setTxFailedSB(true);
      } else 
          throw new Error("ValueError: No currency type selected");
      setTxSuccSB(true);
      setTxCount(txCount + 1);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const tkBal = await tokenBalance(account, ihadAddress);
        const USDTBal = await tokenBalance(account, USDTaddress);
        // console.log(`Token: ${tkBal} USDT: ${USDTBal}`);
        setIHADBal(tkBal !== null ? tkBal: 0);
        setUSDTBal(USDTBal !== null ? USDTBal : 0);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchAccHistory = async () => {
      try {
        const h = await getHistory(account.address);
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
      <main className={classes.content}>
        <Grid className={config.equipmentType === "mobile" ? classes.topMarginHeight : classes.topMarginHeightIPad} ></Grid>
        <Container maxWidth="lg" className ={classes.container} >
          <Grid container direction={"column"}>
            <Grid item style={{ marginBottom: "10px" }}>
              <Grid container spacing={0} direction="row" alignItems="center" justify="center">
                <Grid item>
                  <Avatar style={{ width: 60, height: 60,borderRadius:0 }} src="https://i.loli.net/2019/06/26/5d12cd78a53e047314.png" />
                </Grid>
              </Grid>
            </Grid>
            <Grid item style={{marginTop:"20px"}}>
              <Container>
                <Grid item className={config.equipmentType === "mobile" ? classes.itemHeight : classes.itemHeightIpad}>
                  
                  <img className ={classes.linkImgLeft} alt="USDT" src = {"https://i.loli.net/" 
                    + (ccyFromVal === "usdt" ? "2019/06/26/5d12bffaf379385695.png" : (ccyFromVal === "ihad" ? "2019/06/27/5d1422b33e7ff68920.png" : (ccyFromVal == 'pfa'? "2019/06/26/5d12cd78a53e047314.png": (ccyFromVal==='yhad'?'2019/12/25/TjarbWdt8QZmRev.png':'') ) ))}/>
                  <Grid className ={classes.fLeft} >
                    <Grid className={classes.notesFontSize}>{trans.exchange.pay[config.lang]}</Grid>
                    <Select
                      value={ccyFromVal}
                      onChange={e => setCcyFromVal(e.target.value)}
                      disableUnderline={true}
                      className={classes.selectPadRight}
                      >
                      <MenuItem value={"usdt"}>
                        <Typography className={classes.selectZiFontSize} align={"center"}>USDT</Typography>
                      </MenuItem>
                      <MenuItem value={"ihad"}>
                        <Typography className={classes.selectZiFontSize} align={"center"}>HAD</Typography>
                      </MenuItem>
                      <MenuItem value={"pfa"}>
                        <Typography className={classes.selectZiFontSize} align={"center"}>PFA</Typography>
                      </MenuItem>
                    </Select>
                  </Grid>
                  <FormControl className={config.equipmentType==="mobile"?classes.inputSize:classes.inputSizeIpad}>
                    <BootstrapInput id="outlined-name" placeholder="Enter Amount" maxLength={11} 
                    value={base} onChange={e => setBase(e.target.value)} variant="outlined"/>
                  </FormControl>
                </Grid>

                <Grid item>
                  <Grid style={{textAlign:"center"}} >
                    <img className ={config.equipmentType==="mobile"?classes.linkImgContrary:classes.linkImgContraryIpad} alt="jiantou" src = "https://i.loli.net/2019/06/26/5d1354a288c3d99991.png"/>
                  </Grid>
                </Grid>

                <Grid item className={config.equipmentType==="mobile"||"PC"?classes.itemHeight:classes.itemHeightIpad}>
                  <img className ={classes.linkImgLeft} src = {"https://i.loli.net/" 
                    + (ccyToVal == "ihad" ? "2019/06/27/5d1422b33e7ff68920.png" : (ccyToVal == "usdt" ? "2019/06/26/5d12bffaf379385695.png" :  (ccyToVal === 'pfa'? "2019/06/26/5d12cd78a53e047314.png": (ccyToVal==='yhad'?'2019/12/25/TjarbWdt8QZmRev.png':'') )))}/>
                  <Grid className ={classes.fLeft}  >
                    <Grid className={classes.notesFontSize}>{trans.exchange.receive[config.lang]}</Grid>
                    <Select
                      value={ccyToVal}
                      onChange={e => setCcyToVal(e.target.value)}
                      disableUnderline={true}
                      className={classes.selectPadRight}
                      >
                      <MenuItem value={"ihad"}>
                        <Typography className={classes.selectZiFontSize} align={"center"}>HAD</Typography>
                      </MenuItem>
                      <MenuItem value={"usdt"}>
                        <Typography className={classes.selectZiFontSize} align={"center"}>USDT</Typography>
                      </MenuItem>
                      <MenuItem value={"pfa"}>
                        <Typography className={classes.selectZiFontSize} align={"center"}>PFA</Typography>
                      </MenuItem>
                    </Select>
                  </Grid>
                  <FormControl className={config.equipmentType==="mobile"?classes.inputSize:classes.inputSizeIpad}>
                    <BootstrapInput id="outlined-name" placeholder="Enter Amount" maxLength={11} value={base * config.rates[ccyFromVal][ccyToVal]} variant="outlined"/>
                  </FormControl>
                </Grid>

                <Grid item className={config.equipmentType==="mobile"?classes.bottomButtonMargin:classes.bottomButtonMarginIpad}>
                  <Button
                    className={classes.bottombuttonStyle}
                    onClick={exchange}
                    >
                    {`${trans.convert[config.lang]}`}
                  </Button>
                </Grid>
              </Container>
            </Grid>
          </Grid>
        </Container>
        <Grid className="pageFoot"/>
      </main>

      <Snackbar
        open={txSuccSB}
        autoHideDuration={6000}
        onClose={txSuccSBClose}
        message={trans.transactionFinishedInfo[config.lang]}
      />

      <Snackbar
        open={txFailedSB}
        autoHideDuration={6000}
        onClose={txFailedSBClose}
        message={trans.transactionFailedWarning[config.lang]}
      />
    </React.Fragment>
  );
}

export default withRouter(ExchangePage);
