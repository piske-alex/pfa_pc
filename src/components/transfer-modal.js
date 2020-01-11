import React, { Component } from 'react';
import { Avatar, Button, FormControl, Grid, IconButton, InputLabel, List, ListItem, 
        ListItemAvatar,  ListItemText, MenuItem, Modal, Select, TextField, Typography, Snackbar } from "@material-ui/core";
import MaterialLink from "@material-ui/core/Link";
import CloseIcon from "@material-ui/icons/Close";
import QrReader from 'react-qr-scanner';
import jsQR from "jsqr";
import { usdtProvider } from "../public/js/data";
import { sendEther, sendUSDT,
         sendToken, getAddressFromMobile } from "../public/js/blockchain-utils";

class XferModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trans: props.trans, config: props.config,
            open: props.open, close: props.close,

            account: props.account,     // account object
            balances: props.balances,   // balances objects
            addresses: props.addresses, // wallet addresses objects

            address: '',                // address
            currency: '',                // currency
            amount: '',                 // amount
            memo: '',                   // memo state

            xchModal: false,            // exchange modal state
            scanModal: false,           // scan modal state
            txSuccSB: false,            // transaction success snackbar state
            txFaildSB: false            // transaction failed snackbar state
        };
    }

    /* address handling */
    setAddress = (address)   => this.setState({ address: address });
    addrChange = (event)     => this.setAddress(event.target.value);

    /* memo handling */
    memoChange = (event)     => this.setState({ memo: event.target.value });

    /* amount handling */
    amountChange = (event)   => this.setState({ amount: event.target.value });

    /* currency handling */
    currencyChange = (event) => this.setState({ currency: event.target.value });

    /* transcation success snackbar handling */
    txSuccSBOpen    = ()     => this.setState({ txSuccSB: true });
    txSuccSBClose   = ()     => this.setState({ txSuccSB: false });

    /* transcation failed snackbar handling */
    txFailedSBOpen  = ()     => this.setState({ txFaildSB: true });
    txFailedSBClose = ()     => this.setState({ txFaildSB: false });

    /* exchange info modal handling */
    xchInfoModalOpen  = ()   => this.setState({ xchModal: true });
    xchInfoModalClose = ()   => this.setState({ xchModal: false });
    
    /* scan modal handling */
    scanModalOpen   = ()     => this.setState({ scanModal: true });
    scanModalClose  = ()     => this.setState({ scanModal: false });


    /* upload qrcode handling */
    onUpload = async (event) => {
        console.log(event.target.files[0])
        try{
          createImageBitmap(event.target.files[0])
            .then(async bmp => {
              const canvas = await document.createElement('canvas');
    
              const width = bmp.width;
              const height = bmp.height;
              canvas.width = width;
              canvas.height = height;
    
              const ctx = await canvas.getContext('2d');
    
              await ctx.drawImage(bmp, 0, 0);
              const qrCodeImageFormat = await ctx.getImageData(0, 0, width, height);
              const qrDecoded = await jsQR(qrCodeImageFormat.data, qrCodeImageFormat.width, qrCodeImageFormat.height);
              if(qrDecoded == null){
                alert(this.state.trans.qrTips[this.state.config.lang])
              }else{
                this.setAddress(qrDecoded.data.slice(4));
              }
            });
        }catch (error) {
          console.log(error)
        }
    }
    
    /* scan qrcode handling */
    scan = (x) => {
        if(x != null){
            this.setAddress(x.slice(4));
            this.scanModalClose();
        }
    };

    /* scan qrcode error handling */
    scanError = (err) => {
      alert(this.state.trans.qrTips[this.state.config.lang]);
      console.error(err);
      this.scanModalClose();
    };

    /* process transaction */
    send = async () => {
        try {
            if (this.state.currency === "pfa") {
                if(this.state.amount <= this.state.balances.pfa)
                    await sendEther(this.state.account, this.state.address, this.state.amount, this.state.memo);
                else
                    this.txFailedSBOpen(true);
            } else if (this.state.currency === "ihad") {
                if(this.state.amount > this.state.balances.ihad){
                    this.txFailedSBOpen(true);
                    return;
                }
                try {
                    // use mobile here
                    const res = await getAddressFromMobile(this.state.address);
                    if (!res) throw new Error('empty resolve address response');
                    else if (!res.address) {
                        this.txFailedSBOpen(true);
                        throw new Error('invalid resolve address response');
                    }
                    await sendToken(this.state.addresses.ihad, this.state.account, res.address, this.state.amount, this.state.memo); // send coin
                } catch (error) {
                    console.log(error);
                }
            } else if(this.state.currency === "usdt"){
                if(this.state.amount <= this.state.balances.usdt)
                    await sendUSDT(this.state.address, this.state.amount, this.state.account, this.state.memo);
                else
                    this.txFailedSBOpen(true);
            } else if(this.state.currency === "usdti"){
                if(this.state.amount <= this.state.balances.usdt)
                    await sendToken(this.state.addresses.usdt, this.state.account, this.state.address, this.state.amount, this.state.memo);
                else
                    this.txFailedSBOpen(true);
            }else {
                throw new Error("ValueError: No currency type selected");
            }
            this.txSuccSBOpen(true);
            this.props.close();
        } catch (err) {
            console.log(err);
            if(err.message === "pool lack balance"){
                if(this.state.amount < 1500)
                    alert('系統出幣安全維護中，請稍等3小時再試')
                else
                    alert('由於打出USDT金額超過安全值，請聯絡客服進一步');
            }
            this.txFailedSBOpen(true);
        }
    }

    componentDidUpdate = (prevProps) => {
        if(prevProps !== this.props) this.setState(this.props);
    }
    
    render() {
        const modalPaper = { 
          backgroundColor: "#212733",
          padding: "14px",
          outline: "none",
          height: "60%",
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 200
        }
        const toolbarIcon = {
          padding: "0 2px",
          textAlign: "Center",
          marginTop: "14px"
        }
        const closeBtn = {
          position: "absolute",
          right: "10px",
          top: "18px"
        }
        const extractRow = {
            width: '100%',
            textAlign: 'center',
        }

        return (            
            <div>
                <Modal open={this.state.open} onBackdropClick={this.state.close}>
                    <div className={"modalWidthTwo modelHeight"} style={modalPaper}>
                        <div style={toolbarIcon}>
                            <Typography variant={"h5"}>{this.state.trans.withdrawal[this.state.config.lang]}</Typography>
                            <IconButton style={closeBtn} onClick={this.state.close}>
                                <CloseIcon />
                            </IconButton>
                        </div>
                        <Grid
                            container
                            alignItems={"flex-start"}
                            justify={"space-evenly"}
                            spacing={2}
                            style={{ height: 'calc(100% - 70px)',overflow: 'auto', width: '100%', margin: 0 }}
                        >
                        <Grid item style={extractRow}>
                            <TextField
                                label={this.state.trans.from[this.state.config.lang]}
                                value={`${this.state.account.address}`}
                                disabled
                                style={{ width: "280px" }}
                            />
                        </Grid>
        
                        <div>
                            <Grid item style={extractRow}>
                                <TextField
                                label={this.state.trans.to[this.state.config.lang]}
                                value={this.state.address}
                                onChange={this.addrChange}
                                style={{ width: "280px" }}
                                />
                            </Grid>
                            <br />
                            <Grid item style={extractRow}>
                                <div style={{ width: 280, marginLeft: 'calc(50% - 140px)' }}>
                                    <div className="upload-btn-wrapper" style={{
                                        position: "relative",
                                        overflow: "hidden",
                                        display: "inline-block",
                                    }}>
                                        <button className="CommonButtonStyle" style={{
                                        width:140,
                                        height:'41px',
                                        borderRadius: "8px",
                                        }}>{this.state.trans.uploadQRCode[this.state.config.lang]}</button>
                                        <input type="file" name="myfile" style={{
                                        fontSize: "100px",
                                        position: "absolute",
                                        left: 0,
                                        top: 0,
                                        opacity: 0
                                        }} onChange={this.onUpload}/>
                                    </div>
                                    <div className="upload-btn-wrapper" style={{
                                        position: "relative",
                                        overflow: "hidden",
                                        display: "inline-block",
                                    }}>
                                        <button className="CommonButtonStyle" style={{
                                        width:140,
                                        height:'41px',
                                        borderRadius: "8px",
                                        }} onClick={this.scanModalOpen}>{this.state.trans.recognitionQRcode[this.state.config.lang]}</button>
                                    </div>
                                </div>
                            </Grid>
                            <Grid item style={extractRow}>
                                <button className="CommonButtonStyle" style={{
                                    width:'100%',
                                    height:'41px',
                                    borderRadius: "8px",
                                }} onClick={this.xchInfoModalOpen}>{`查看出售渠道`}</button>
                            </Grid>
                        </div>
        
                        <Grid item style={extractRow}>
                        <FormControl style={{ width: "280px" }}>
                            <InputLabel>{this.state.trans.asset[this.state.config.lang]}</InputLabel>
                            <Select
                                value={this.state.currency}
                                onChange={this.currencyChange}
                            >
                                <MenuItem value="ihad">{this.state.trans.ihad[this.state.config.lang]}</MenuItem>
                                <MenuItem value="usdt">{this.state.trans.usdt[this.state.config.lang]}</MenuItem>
                            </Select>
                        </FormControl>
                        </Grid>
        
                        <Grid item style={extractRow}>
                            <TextField
                                label={this.state.trans.amount[this.state.config.lang]}
                                helperText={this.state.trans.transactionDelayInfo[this.state.config.lang]}
                                value={this.state.amount}
                                onChange={this.amountChange}
                                style={{ width: "280px" }}
                            />
                        </Grid>

                        <Grid item style={extractRow}>
                            <TextField
                                label={this.state.trans.note[this.state.config.lang]}
                                helperText={this.state.trans.fillInFormat[this.state.config.lang]}
                                value={this.state.memo}
                                onChange={this.state.memoChange}
                                style={{ width: "280px" }}
                            />
                        </Grid>

                        <Grid item style={extractRow}>
                            <FormControl style={{ width: "280px" }}>
                                <Button
                                    className="CommonButtonStyle"
                                    variant="contained"
                                    color="primary"
                                    onClick={this.send}
                                    style={{ letterSpacing: "1px", }}
                                >
                                {this.state.trans.send[this.state.config.lang]}
                                </Button>
                            </FormControl>
                        </Grid>
                </Grid>
                </div>
                
            </Modal>

            <Modal open={this.state.xchModal} onBackdropClick={this.xchInfoModalClose}>
                    <div className={" modalWidthTwo modelHeight"} style={modalPaper}>
                        <div style={toolbarIcon}>
                        <Typography variant={"h5"}>{this.state.trans.withdrawal[this.state.config.lang]}</Typography>
                        <IconButton style={closeBtn} onClick={this.xchInfoModalClose}>
                            <CloseIcon />
                        </IconButton>
                        </div>
                        <Grid
                        container
                        alignItems={"flex-start"}
                        justify={"space-evenly"}
                        spacing={2}
                        style={{ height: 'calc(100% - 70px)',overflow: 'auto', width: '100%', margin: 0 }}
                        >
                        <List >
                            {usdtProvider.map(p => (
                            this.state.config.lang === "ch" && p.ch === "true" ?
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
                                    primary={p.name[this.state.config.lang]}
                                    primaryTypographyProps={{ color: "textPrimary" }}
                                    secondary={p.description[this.state.config.lang]}
                                />
                                </ListItem>
                                : this.state.config.lang === "en" && p.en === "true" ?
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
                                    primary={p.name[this.state.config.lang]}
                                    primaryTypographyProps={{ color: "textPrimary" }}
                                    secondary={p.description[this.state.config.lang]}
                                />
                                </ListItem>
                                :""
                            ))}
                        </List>
                        </Grid>
                    </div>
                </Modal>

                <Modal open={this.state.scanModal} onBackdropClick={this.scanModalClose}>
                    <div className={"modalWidth"} style={modalPaper}>
                    <div style={toolbarIcon}>
                        <Typography variant={"h5"}>{this.state.trans.recognitionQRcode[this.state.config.lang]}</Typography>
                        <IconButton style={closeBtn} onClick={this.scanModalClose}>
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
                        onError={this.scanError}
                        onScan={this.scan}
                        facingMode={"rear"}
                        />
                    </Grid>
                    </div>
                </Modal>

                <Snackbar
                    open={this.state.txSuccSB}
                    autoHideDuration={6000}
                    onClose={this.txSuccSBClose}
                    message={this.state.trans.transactionFinishedInfo[this.state.config.lang]}
                />

                <Snackbar
                    open={this.state.txFailedSB}
                    autoHideDuration={6000}
                    onClose={this.txFailedSBClose}
                    message={this.state.trans.transactionFailedWarning[this.state.config.lang]}
                />
            </div>
        )
    }
}

export default XferModal;