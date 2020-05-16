import React, { Fragment } from 'react';
import { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {withStyles} from '@material-ui/core/styles';
import logo from '../img/logo.png';
import face from '../img/face.png';
import insta from '../img/insta.png';
import twitter from '../img/twitter.png';

const styles = theme => ({
    root: {
        flexGrow: 1,
        width:'100%',
        

        position: 'absolute',
      
        left: 0,
      
        bottom: 0,
      
        width: '100%',
      
        padding: '15px 0',
        marginTop: '-200px'
      
      
      },
      logo: {
        marginTop: '20px',
        marginLeft: '20px',
      },
      paper: {
        marginTop: '30px',
        marginLeft: '40px',
      },
      sns: {
        marginTop : '60px',
        marginLeft: '30px',
      },
      vl: {
        borderLeft: '1px solid black',
        height: '200px',
        opacity: '0.1'
      }
})

class Bottom extends Component {
    render() {
        const {classes} = this.props;
        return(
            <div className={classes.root}>
                <Grid container spacing={1}>
                    <Grid item xs={3} className={classes.logo}>
                        {/* <img src={logo} width="100px" height="100px"></img> */}
                        <p><b>오늘도시락</b></p>
                        <p>42833 대구광역시 달서구 한실로 117</p>
                        <p>Tel: 053.0000.0000</p>
                    </Grid>
                    <div className={classes.vl}></div>
                    <Grid item xs={5} className={classes.paper}>
                    
                        <p>Copyright&copy; 2020 ChangHwan. All rights reserved.</p>
                        <p>For more Information. mail to Administor.</p>
                        
                    </Grid>
                    <div className={classes.vl}></div>
                    <Grid item xs={3} className={classes.sns}>
                    <img src={face} width="50px" height="50px"></img>
                    <img src={insta} width="50px" height="50px"></img>
                    <img src={twitter} width="50px" height="50px"></img>
                    </Grid>
                </Grid>
            </div>
        );
    }
}
export default withStyles(styles)(Bottom);