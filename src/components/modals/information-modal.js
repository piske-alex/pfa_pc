import React, { Component } from 'react';
import { Grid, IconButton, Modal, Typography } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import './modal.css';

class InfoModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: props.open, close: props.close,
            
            title: props.title, 
            content: props.content,
        };
    }

    componentDidUpdate = (prevProps) => {
        if(prevProps !== this.props) this.setState(this.props);
    }
    
    render() {
        return (
          <Modal open={this.state.open} onBackdropClick={this.state.close} className={"modal"}>
            <div>
              <Grid style={{ height: "100%" }} container direction={"column"}>
                <Grid item style={{ maxHeight: "14%", width: "100%" }}>
                  <div className={'toolbar'}>
                    <Typography variant={"h5"} style={{}}>{this.state.title}</Typography>
                    <IconButton className={'close'} onClick={this.state.close}>
                      <CloseIcon/>
                    </IconButton>
                  </div>
                </Grid>
                <Grid item style={{ overflow: "auto", maxHeight: "84%", width: "100%", padding: "6px" }}>
                  <Typography variant={"body1"} style={{
                    marginRight: "150px",
                    textAlign: "justify",
                    width: "100%",
                    wordBreak: "break-all"
                  }} dangerouslySetInnerHTML={{ __html: this.state.content }}/>
                </Grid>
              </Grid>
            </div>
          </Modal>
        )
    }
}

export default InfoModal;