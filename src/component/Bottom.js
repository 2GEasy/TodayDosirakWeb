import React, { Fragment } from 'react';
import { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {withStyles} from '@material-ui/core/styles';
import { Divider, Typography } from '@material-ui/core';
import logo from '../img/logo.png';

const styles = theme => ({
    root: {
        bottom:0,
        left:0,
        flexGrow: 1,
        width: '100%',
        padding: '15px 0',
        paddingBottom: '100px',
        backgroundColor: '#EFEFEF',
        fontSize: '1rem',
      }
})

class Bottom extends Component {
    render() {
        const {classes} = this.props;
        return(
            <div className={classes.root}>
                  <Grid item xs={12} align="center">
                        <p style={{color: '#bebebe'}}>오늘도시락은 통신판매 중개자로서, 상품/거래정보 및 거래와 관련하여 통신판매 당사자의 고의 또는 과실로 소비자에게 발생하는 손해에 대해 책임을 지지 않습니다. 상품 및 거래에 대한 정확한 정보는 해당 판매자에게 직접 확인 바랍니다.</p>
                        <p style={{color: '#bebebe'}}>Copyright&copy; 2020 ChangHwan. All rights reserved.</p>
                  </Grid>
            </div>
        );
    }
}
export default withStyles(styles)(Bottom);