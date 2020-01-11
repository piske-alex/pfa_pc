import React, { Component } from 'react';
import { Grid, IconButton, Modal, TextField, Typography } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

class TxModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trans: props.trans, config: props.config,
            open: props.open, close: props.close,

            account: props.account,
            details: props.details
        };
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

        return (            
            <Modal open={this.state.open} onBackdropClick={this.state.close} >
                <div className={"modalWidthTwo modelHeight"} style={modalPaper}>
                    <div style={toolbarIcon}>
                        <Typography variant={"h5"}>{this.state.trans.transactionVC[this.state.config.lang]}</Typography>
                        <IconButton style={closeBtn} onClick={this.state.close}>
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
                        <p>{this.state.trans.sendAddress[this.state.config.lang]}: {this.state.details.type === 'in' ? this.state.details.counterparty : this.state.account.USDTaddress}</p>
                        <p>{this.state.trans.designationAddress[this.state.config.lang]}:	{this.state.details.type === 'in' ? this.state.account.USDTaddress : this.state.details.counterparty}</p>
                        <p>{this.state.trans.type[this.state.config.lang]}: {this.state.details.type === '' ? this.state.trans.in[this.state.config.lang] : this.state.trans.out[this.state.config.lang]}</p>
                        <p>{this.state.trans.quantity[this.state.config.lang]}: {this.state.details.absvalue}</p>
                        <p dangerouslySetInnerHTML={{ __html: (this.state.trans.remark[this.state.config.lang] + ' : ' + decodeURIComponent(this.state.details.memo))}}></p>
                        <p>{this.state.trans.time[this.state.config.lang]}: {this.state.details.time}</p>
                    </Grid>
                </div>
            </Modal>
        )
    }
}

export default TxModal;