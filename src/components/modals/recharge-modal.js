import React, { Component } from 'react';
import { Avatar, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText, LinearProgress, Modal, Paper, Typography } from "@material-ui/core";
import MaterialLink from "@material-ui/core/Link";
import CloseIcon from "@material-ui/icons/Close";
import { usdtProvider } from "../../public/js/data";
import QRCode from "qrcode.react";
import './modal.css';

class RechargeModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trans: props.trans, config: props.config,
            open: props.open, close: props.close,

            account: props.account
        };
    }

    componentDidUpdate = (prevProps) => {
        if(prevProps !== this.props) this.setState(this.props);
    }
    
    render() {
        return (            
            <Modal open={this.state.open} onBackdropClick={this.state.close} className={"modal"}>
                <div>
                    <Grid container direction={"column"} style={{ height: '100%' }}>
                        <Grid item>
                        <div className={'toolbar'}>
                            <Typography variant={"h5"}>
                                {`${this.state.trans.buy[this.state.config.lang]} ${this.state.trans.UsdtCode[this.state.config.lang]}`}
                            </Typography>
                            <IconButton className={'close'} onClick={this.state.close}>
                            <CloseIcon />
                            </IconButton>
                        </div>
                        </Grid>
                        <Grid item style={{ overflow: "auto", height: "calc(100% - 78px)" }}>
                        <Typography variant={"p"}>
                            {`${this.state.trans.purchaseAddress[this.state.config.lang]}`}
                        </Typography>
                        <br></br>
                        <Typography variant={"p"}>
                            此為以太坊 ERC-20 USDT 地址，請勿將其他資產轉賬至此地址
                        </Typography>
                        <Paper style={{margin: 'auto', border:"8px solid white",height:"106px",width:"106px"}}>
                            <QRCode value={`pfa:${this.state.account.USDTaddress}`} style={{ height: "90px", width: "90px" }} renderAs={"svg"} />
                        </Paper><br />
                        <span className="lineFeed">{this.state.account.USDTaddress}</span><br /><br />
                        <LinearProgress variant="query" /><br />
                        <Typography variant={"p"} style={{ }}>{`${this.state.trans.completeRecharge[this.state.config.lang]}`}</Typography>
                        <List >
                            {usdtProvider.map(p => (
                            this.state.config.lang === "ch" && p.ch == "true" ? 
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
                            : this.state.config.lang === "en" && p.en == "true" ? 
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
                    </Grid>
                </div>
            </Modal>
        )
    }
}

export default RechargeModal;