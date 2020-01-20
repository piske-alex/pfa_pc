import React, { Component } from 'react';
import { ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, 
         FormControlLabel, Grid, IconButton, Modal, TextField, 
         Typography, Paper, Switch, Snackbar } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { CopyButton } from "react-copy-button";
import CloseIcon from "@material-ui/icons/Close";
import { exportAccounts } from "../../public/js/blockchain-utils";
import './modal.css';

class BackupModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trans: props.trans, config: props.config,
            open: props.open, close: props.closes,

            account: props.account || {},
            showPk: false,
            copiedSB: false
        };
    }

    /* show / hidden private key handling */
    showPkSwitch    = (event) => this.setState({showPk: event.target.checked});

    /* copied to clipboard snackbar handling */
    copiedSBOpen    = () => this.setState({copiedSB: true});
    copiedSBClose   = () => this.setState({copiedSB: false});

    /* click private key to clipboard handling */
    copyPkClick     = () => {
        window.Clipboard.copy(this.state.account.privateKey);
        this.copiedSBOpen();
    }

    /* copied private key to clipboard handling */
    copyExportClick = () => {
        window.Clipboard.copy(exportAccounts());
        this.copiedSBOpen();
    }

    componentDidUpdate = (prevProps) => {
        if(prevProps !== this.props) this.setState(this.props);
    }
    
    render() {
        return (
            <div>
                <Modal open={this.state.open} onBackdropClick={this.state.close} className={"modal"}>
                    <div>
                        <div className={'toolbar'}>
                            <Typography variant={"h5"}>{this.state.trans.dashboards.backUp[this.state.config.lang]}</Typography>
                            <IconButton className={'close'} onClick={this.state.close}>
                                <CloseIcon />
                            </IconButton>
                        </div>
                        <div className="backupBottom" id={"copiable"}>
                            <ExpansionPanel>
                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header" >
                                    <Typography>{this.state.trans.dashboards.single[this.state.config.lang]}</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <Grid item>
                                        <Typography style={{ textAlign:'justify', fontSize: 14 }}>
                                            {this.state.trans.dashboards.singlefull[this.state.config.lang]}
                                        </Typography>
                                        <FormControlLabel
                                            control={<Switch checked={this.state.showPk} onChange={this.showPkSwitch} />}
                                            label={this.state.trans.dashboards.showPrivateKey[this.state.config.lang]}
                                        />
                                        <Grid item>
                                            <Paper>
                                                <TextField
                                                    label={this.state.trans.privateKey[this.state.config.lang]}
                                                    value={this.state.account.privateKey ? this.state.account.privateKey.substr(2) : ''}
                                                    readOnly={false}
                                                    style={{ visibility: this.state.showPk ? 'visible' : 'hidden',width: '85%', fontSize: 14 }}
                                                    disabled
                                                    variant="outlined"
                                                />
                                                <CopyButton
                                                    className="CopyButtonStyle CopyBtnStyle"
                                                    onClick={this.copyPkClick}
                                                    text={this.state.account.privateKey ? this.state.account.privateKey.substr(2) : ''}
                                                >
                                                    {this.state.trans.copy[this.state.config.lang]}
                                                </CopyButton>
                                            </Paper>
                                        </Grid>
                                    </Grid>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                            <ExpansionPanel>
                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content" id="panel2a-header">
                                    <Typography>{this.state.trans.dashboards.entire[this.state.config.lang]}</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <Grid item style={{ width: '100%' }}>
                                        <Typography style={{ textAlign:'justify', fontSize: 14 }}>
                                            {this.state.trans.dashboards.entirefull[this.state.config.lang]}
                                        </Typography>
                                        <Paper style={{ marginTop: 15 }}>
                                            <TextField
                                                style={{ width: '85%', fontSize: 14 }}
                                                disabled
                                                variant={"outlined"}
                                                value={exportAccounts()}
                                                multiline
                                                rowsMax={4}
                                                readOnly={false}
                                                label={this.state.trans.copyHere[this.state.config.lang]}
                                            />
                                            <CopyButton
                                                className="CopyButtonStyle CopyBtnStyleTwo"
                                                onClick={this.copyExportClick}
                                                text={exportAccounts()}
                                            >
                                                {this.state.trans.copy[this.state.config.lang]}
                                            </CopyButton>
                                        </Paper>
                                    </Grid>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        </div>
                    </div>
                </Modal>
          
                <Snackbar
                    open={this.state.copiedSB}
                    autoHideDuration={6000}
                    onClose={this.copiedSBClose}
                    message={this.state.trans.copied[this.state.config.lang]}
                />
            </div>
        )
    }
}

export default BackupModal;