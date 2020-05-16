import React, { Fragment } from 'react';
import { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Nav from '../component/Nav';
import Bottom from '../component/Bottom';

const styles = theme => ({
    
    
    label : {
        fontSize: '30px',
        color: '#000000',
    },
})

class Produce extends Component {
    
    render() {
        const {classes} = this.props;
        
        return(
            <Fragment>
                
                <div className={classes.contents}>
                    <Typography className={classes.label}><b>소개</b></Typography>
                    <p></p>
                </div>

                <hr/>
            </Fragment>
        );
    }
}
export default withStyles(styles)(Produce);