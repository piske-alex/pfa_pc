import React, { Component }  from 'react';
import { Grid } from "@material-ui/core";

class Center extends Component {    
    render() {
        return (
            <Grid
                container
                direction={this.props.direction}
                alignItems={"center"}
                justify={"center"}
                spacing={this.props.spacing | 0}
                style={{height: '100vh', margin: 'auto'}}
            ><Grid item>{this.props.children}</Grid>
            </Grid>
        );
    }
}
export default Center;
